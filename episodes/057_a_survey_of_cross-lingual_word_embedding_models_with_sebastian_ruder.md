---
title: "A Survey Of Cross-lingual Word Embedding Models, with Sebastian Ruder"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Sebastian Ruder"]
number: "057"
tags: []
description: "Upcoming JAIR paper by Sebastian Ruder, Ivan Vulić, and Anders Søgaard. Sebastian comes on to tell us about his survey. He creates a typology of cross-lingual word embedding methods, and we discuss why you might use cross-lingual embeddings (low-resource languages in particular), what information they capture (semantics? syntax? both?), how the methods work (lots of different ways), and how to evaluate the embeddings (best when you have an extrinsic task to evaluate on). https://www.semanticscholar.org/paper/A-survey-of-cross-lingual-embedding-models-Ruder/3dbd28c63a7807280c9531735c715d4598024166"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence. Today our guest is Sebastian Ruder. Sebastian is a third year PhD student
in Natural Language Processing and Deep Learning at the Insight Research Centre for Data Analytics
and a research scientist at Dublin Dublin-based text analytics startup AYLIEN. Am I pronouncing this
correctly?

</turn>


<turn speaker="Sebastian Ruder" timestamp="00:30">

Yeah, yeah. That was actually correct.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:31">

Okay. He's interested in transfer and multitask learning for NLP and democratizing machine learning
and AI. Today he will be talking to us about his paper, A Survey of Cross-lingual Word Embedding
Models posted to archive a few months ago. Welcome to the podcast Sebastian.

</turn>


<turn speaker="Sebastian Ruder" timestamp="00:48">

Cool. Yeah, I'm happy to be here guys and thanks a lot for taking the time to talk to me.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:52">

Thank you for being on the show. So what do you mean by cross-lingual word embeddings and why do you
think they're important?

</turn>


<turn speaker="Sebastian Ruder" timestamp="00:59">

So cross-lingual word embeddings, So I assume most of the listeners of this podcast will be familiar
with word-embeddings, which is basically a way to represent words with tense representations in a
low dimensional space, which can be used as input for neural network models or also can be used just
by themselves to reveal relationships or similarities across different words. And usually the way
people use word embeddings is generally by either learning them with a unsupervised tool like word-
to-vec or just by learning them as part of the model while they're training the model for a
particular task. And, and usually like generally these tasks would be in English or whatever
language so people are using for and for cross-lingual word embeddings are now a way to instead of
having just one space for one language to put these representations that we learned from different
languages into the same space. And basically these different models we talked about in this survey
allow us to given lingual word embeddings in different languages, protect them in your joint space.
And then we can do all kinds of things, different things with this joint space. Either we can use
the relationships between the words or use them again for training our models.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:19">

So could you elaborate on why people care about multilingual or cross lingual embeddings? It's easy
to forget like the importance of doing this. If you're living in the English speaking country I
guess. Or most of the resources are available in English.

</turn>


<turn speaker="Sebastian Ruder" timestamp="02:33">

Right? Right. Yeah. So yeah, most of the research unfortunately almost all or our datasets are in
English, but English is not the only language or by far, not the most. By far not all of the people
we want to be able to use our technology speak English or all of the data's in English. So we really
want to have means to apply our models to other languages. And in most of these cases, really the
difficulty is that for all of the languages we want to apply our models to, we don't have enough
legal data generally in all those cases or generally it is too expensive to really annotate enough
data to get good models in all the languages we would like. And so crossing and embeddings basically
the kind of main, or my personally, my main interest in those is that they provide us a very
intuitive or a very appealing way to scale our models to different languages by essentially allowing
us to create this joint space. And then we only require one model that is trained on this joint
space and that can be then applied to all of the other languages we care about.

</turn>


<turn speaker="Matt Gardner" timestamp="03:46">

So if you're using cross-lingual word embeddings, then you're probably also using standard neural
network kinds of models, which means where we have like an LSTM that encodes inputs. How well does
this actually work when you take into account things like different word order in different
languages? I'm just wondering does this even make sense, because the syntax is different even across
languages, even assuming for a minute that you really can get a consistent vector space across
languages, which I'm not totally ready to buy, but assuming you could do that, what about like this
linear processing that you would think would be pretty syntax dependent?

</turn>


<turn speaker="Sebastian Ruder" timestamp="04:24">

Right? Yeah. So that's all mostly there's the fact like there is a feature that is tasked dependence
also it kind of it, yeah, it depends on which task you're using it for and also how similar the
languages are for which are using the space. But generally it is so this kind of ties in to the
different benchmark tasks that people try to evaluate these different models on. So one particular
task that is commonly used to evaluate these kind of models is across lingual document
classification where you train the space and then you have label data in English and you want to
apply your model to test data on another language. And that generally for just doing like topical
classification, we don't really where word order or compositionalitie isn't that important. That
works quite or reasonably well. And then, yeah. And recently people have applied these kinds of
models to more sophisticated tasks. So one resent evaluation tasks that people from Ivan Vulić's
group in Cambridge has been using is slot filling in dialog models. And also there they observe
improvements using these distrusting limited spaces as features. But it's still, it's still that it
doesn't, for most of his tasks, they probably wouldn't get us all the way, but they provide still a
good baseline.

</turn>


<turn speaker="Matt Gardner" timestamp="05:45">

Interesting. So the, the tasks you mentioned are basically I can learn a representation for each
class, but I'm trying to fail either like a class that I'm trying to lump documents into or a slot
I'm trying to extract things into and then words in each language will get a feature representation
that maps to this class. And so the class is the thing that's really cross-lingual and you're just
learning a mapping from words in every language into this class basically. And it's like you just,
you just have a really big vocabulary in a single language almost because you're not really doing
very much syntax processing. Am I understanding that right?

</turn>


<turn speaker="Sebastian Ruder" timestamp="06:23">

Yeah, exactly. Yeah. So I haven't actually so I haven't personally applied these methods to, for the
tasks, for instance, like cross lingual sentiment classification. I haven't seen seen that. So yeah,
I would imagine that more difficult data sets. Like, maybe the sentiment treebank, which really has
a lot of these very sophisticated negations, and so it might be harder to do well on these kinds of
tasks, but I haven't done actually research myself in that.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:54">

So I think there are a couple like nuances here. One is that we hope that, or embeddings capture
both semantic and syntactic information about words and depending on which tasks you care about, one
of them may be more important than the other so, even in a very syntactic task oriented dependency
parsing I found that word embeddings like capturing the semantics and the word embeddings is pretty
important, not just capturing the syntax and the way in which we train most of these word embeddings
lend themselves to capturing the semantics much more than catching the syntax in the first place. So
I wouldn't, yeah, maybe there are some exceptions like the, well I think Omer Levy's modification of
word for vec which uses part of speech, sorry, dependency, parse connections instead of looking at
the context on the other side of the word. They tend to work better on syntactic tasks.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:53">

But in general, I think the semantic application embedded spaces are what we're really hoping to get
out of them and that should transfer better.

</turn>


<turn speaker="Matt Gardner" timestamp="08:05">

Interesting. Yeah. I guess you Waleed have done some research on this, right? You're included in the
survey that Sebastian published.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:15">

At least I used to work a lot on this, so I find it, I found it pretty compelling. For example, the
cross-lingual dependency parsing to add these embeddings and even though we're adding this on top of
our speeches, so you already have a good idea what synthetic function support is trying to do, and
many of these experiments I was using both. So that was not a problem of course. Perfect. So they
don't give you all the nuances. I think the other point is that even if we think that word
embeddings carry some syntactic information, there are some language fairs was similar enough syntax
that you would hope that this syntax would transfer. It would be hard to make this argument in a
global sense for all languages.

</turn>


<turn speaker="Matt Gardner" timestamp="09:05">

Yeah. I guess I was thinking, particularly a lot of my thinking these days is colored by the ELMo,
these contextualized word representations and language model and embeddings and you'd probably have
a much harder time getting that to be really cross-lingual. But this is getting kind of far afield.
So.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:20">

That's actually a great point, I never thought this of this but. I feel like having a language model
that spans multiple languages, which kind of, that would be closer to what ELMo is doing I think it
would be very interesting. I haven't seen anyone who's trying to have one model that incorporates
multiple languages at the same time as a language model.

</turn>


<turn speaker="Sebastian Ruder" timestamp="09:41">

Yeah. I think I've seen like Yulia Tsvetkov. I think I had a paper on like polyglot language models,
but I think that was more on the phonological level rather than the word level. Yeah. But I think
for like downstream tasks as you mentioned, I think it's always useful because we have I think like
the research is more progressed for like projecting part of speech tags or is kind of very syntactic
annotations across languages. Or at least we have more data with universal dependencies for that. So
maybe we can always try to inject syntactic information by multiple resources as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:15">

Alright. So going back to the paper could you tell us about the taxonomy that you define most for
the methods that you proposed for a multilingual cross-lingual embeddings?

</turn>


<turn speaker="Sebastian Ruder" timestamp="10:27">

Right, yes. So kind of compiling and like recreating this survey, we realize that there's been
really a lot of attention and really like more papers than we thought like yours were in it, I think
you worked on it as well, Matt, that have kind of dealt with inducing this crossing space. And we
really, and all of these have different kind of annotations that they use or different data sources.
And we try to figure out a way how we can, what are like the commonalties and what's the best way
to, to summarize these. And yeah, we essentially followed a bit previous work from Omer Levy. He had
a paper a bit which went in into that direction. Essentially showing that the actual difference
between these models in terms of performance. In the end, it doesn't come down to what particular
objective they are optimizing or if they have different trigger tricks or tweaks in the model, but
actually the the amount of data or the level of supervision they're using.

</turn>


<turn speaker="Sebastian Ruder" timestamp="11:30">

And that's what we basically use as foundation as main differentiating factor for this taxonomy. So
essentially, or like the existing cross-lingual word embedding models that we surveyed have three
kind of levels of supervision that they can use from most extensive supervision to least extensive
supervision basically. So some of these use word level supervision, so basically dictionaries of
translations of words between different languages. Then a class models uses supervision on the
sentence level. There's the translation of sentences like you would have in the Europe parliament
proceedings, which are used for machine translation for learning these cross-lingual embeddings. And
then only a few papers assume supervision on the document level. So where you would have
translations of documents basically,

</turn>


<turn speaker="Waleed Ammar" timestamp="12:27">

Could you help me understand the difference between their resources needed for the word base and the
sentence base? It seems to me that most work on word-based models are actually using sentences or
sentences and automatically using the alliance between the words. So it doesn't seem to me that the
word base methods are more expensive or they don't require more resources per se.

</turn>


<turn speaker="Sebastian Ruder" timestamp="12:53">

I would, I would personally think that having actually the the sentence translations, it's more
maybe the order in which I say to those wasn't entirely correct. I think the sentence translation is
actually having a lot of translational sentences is kind of a more, more expensive solution that you
can because you can have they are publicly available dictionaries, which have translations of words
like Wiktionary, for instance, for a lot of languages. So kind of this is like word level
supervision is quite easy to, to get at least.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:26">

So assuming that you have sentence alignments apparently that, do you have any idea, if it's
possible to compare, like would it be better to use word based methods using automated word alliance
or a sentence based method?

</turn>


<turn speaker="Sebastian Ruder" timestamp="13:43">

Yeah, so it's, I mean, some of these, yeah. I, so some of these word based methods use alignments or
use the translation dictionaries basically that word derived automatically from sentence level data.
But then there are also other resources like other techniques who just use existing dictionaries as
well. I think it really comes down to what level, how, what kind of data you have available,
particularly if you approach a low resource languages. So generally because in those cases you often
would not have sentence level supervision available. In most often just using existing bilingual
dictionary to introduce these embeddings might be cheaper. Yeah. And then so these sort of talked
about right now were mostly parallel resources. And then another dimension we looked at in this
taxonomy was the degree of parallelism or the degree of comparability between the translations.

</turn>


<turn speaker="Sebastian Ruder" timestamp="14:47">

So most of the work looked at exact translations between the languages basically. While for each
level of supervision. There are also few papers that just look at comparable supervisional
comparable translations. And comparable in this sense means that on the sentence level, for
instance, on the document level there would not be an exact translation so you wouldn't need to have
exact translate documents, but documents would rather have to be topically aligned or maybe have
similar topics or similar labels in order to be used for these approaches.

</turn>


<turn speaker="Matt Gardner" timestamp="15:23">

So I think you publish this survey before the recent work on monolingual machine translation and
monolingual, I guess there has been, yeah, cross-lingual alignments without parallel data at all,
even predating the more recent modeling lingual translation work. How does this kind of idea fit
into this survey, this taxonomy that you've created?

</turn>


<turn speaker="Sebastian Ruder" timestamp="15:47">

That's actually one of the directions really I'm most excited about cause the yeah, cause like the,
the main direction or one of the most interesting directions, these kind of works or research groups
have taken this work over the last, over recent years is using less and less supervision and smaller
and smaller dictionaries for infusing these. So I think last year there's been method as well or the
year before that even from Mikel (Artetxe, where they showed good performance for as few as 100 feed
words in this bilingual dictionary. And so now kind of the, the logical next step is actually being
able to do it without any seed words at all. And yeah, I think this is very cool. I'm very
interesting direction and really opens up a lot of possibilities for trying to scale really these
kind of spaces or these word embeddings to where they will be most useful, which is really for
applying NLP methods to very low resource languages.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:52">

So you all mentioned that most of these methods just within the same category, are like word based
methods using exact translation are using a similar objective? Could you give us just like a high
level question of what this objective looks like and what are the different variants you see across
the different methods.

</turn>


<turn speaker="Sebastian Ruder" timestamp="17:12">

Generally what we try to show in the surveys essentially that all of these methods try to basically
optimize and yeah, optimize an objective essentially, which is a combination on, so essentially a
sum of the different monolingual objectives that have been used to create these, the monolingual
embeddings that were initially learned and that should be protected into the joint space as well as
some sort of restriction on these. So some some regularization term that either tries to, yeah. That
induces some, some constraint on these embeddings basically. And yeah. And this regularization term
is usually what is what is the main difference between these different approaches and it's kind of
one of the things that they have been optimized in recent years by for instance, adding an
orthogonality constraint or by as kind of what was done in these integrals methods. Bringing
translations chose together. This would be, for instance, the, the most basic or the kind of one of
the original word embedding based regularization terms

</turn>


<turn speaker="Waleed Ammar" timestamp="18:25">

So the regularization term can be thought of as a very high level way of distinguishing them, like
you said, there are many different strategies for doing this regularization. It seems like this is
not at just like as a technicality that you would like that doesn't matter. My understanding from
your surveys that it doesn't actually matter that much. Did I interpret this correctly or like do
you have any results that show like other people that show that this like the way in which you
define the regularization term doesn't matter that much?

</turn>


<turn speaker="Sebastian Ruder" timestamp="19:01">

It's mainly in like recent work that we are actually, we're kind of building on referring to for
instance, Omer Levy's, recent work and another survey paper from CMU where they compare different
approach as well and come to a similar finding in that the main difference between these approaches
is kind of the level of supervision that you use.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:22">

So another point you mentioned in the paper is about bilingual and multilingual. Is there like a
recipe for converting, or some minor signs that most of the methods were proposed in a bilingual
context? And I'm wondering if there is like a recipe for converting any method from bilingual,
multilingual or are there certain methods that are easier to extend to multi-lingual or others?

</turn>


<turn speaker="Sebastian Ruder" timestamp="19:44">

That's really a good point. So what most of these settings or the most common setting in the
literature is really that separate models separate spaces aren't used for between the languages and
most commonly that is between English and another language. And then this induced space is
evaluated. While in practice we would really like, yeah, ideally to have a joint space between a lot
of languages and not pair-wise spaces between is pair. And so the most preferred way to apply these
methods to the multi-lingual setting is really to use English as a pivot language basically or at
least that's the way it's known in the literature. So essentially to project, to have English, the
English language has kind of the main cross-lingual embedding space and then project all the other
languages into the same space as English. And by that, and if we keep the English language space
fixed we will then basically be able to induce for the other languages, not only the relation to
English but also for the languages among themselves.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:54">

So is that always feasible? So you mentioned some methods, for example, that that represent the
triggerization term as an orthogonality constraint. Would it be possible, for example, who's that
one without, redefining the embedding space in English? It seems like a requiring that the English
embeddings remain in the same space is, there's not always going to be feasible for some of these
methods.

</turn>


<turn speaker="Sebastian Ruder" timestamp="21:24">

Depends a bit on the method. So I like one of the most common class of methods uses basically learns
a transformation matrix. So some matrix with which we can multiply it, one set of embeddings to
project that into the other space. So that essentially keeps one of the embedding spaces fixed and
just tries to project the other one into that space. So for this class of mapping based approaches,
as we call them, having this pivot English embedding space is sort of a way, yeah, quite
straightforward way to do that. Some other approaches like some of these approaches we talk about
create a kind of an artificial synthetic, multilingual corpus. These also have been where you
basically randomly replace each word in language with a translation from another words. And these
kinds of approaches have also in the past been extended to the multi-lingual setting. So for these
it would, it would work generally for wetable supervision models quite well for once you have
supervision on the sentence level, I think it's a bit more involved or more complicated to really
extend these successfully to the multi-lingual setting.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:38">

So you mentioned before using cross lingual document classification as a way of evaluating word
embeddings, what are other methods or other evaluation strategies people use for cross-lingual
embeddings and do you have any thoughts on which ones are better?

</turn>


<turn speaker="Sebastian Ruder" timestamp="22:54">

So the original landscape for evolving, cross-lingual embeddings, cross-lingual word embeddings is
quite similar actually then what people used or how people have done embeddings of monolingual word
embeddings. So what kind of direction is basically to use to intrinsically evaluate these embeddings
on tasks that just look at the embeddings in isolation and try to assess different how well these
embeddings perform different properties. So one kind of like one of the most common tasks for
evaluating monolingual word embeddings is word similarity were different. Yeah, I think most people
are familiar with these analogy datasets that have been introduced. Then we can have it all as well
as different words, similarity datasets, which come, many of them come from psychology where people
our tasks to rate the similarity between two words on a scale from one to from zero to 10.

</turn>


<turn speaker="Sebastian Ruder" timestamp="23:54">

And these kind of word similarity datasets have been used for evaluating cross-lingual as well by
mainly translating to the words that are composed of into the other languages. And then basically,
yeah, yeah, just computing the Spearman's correlation in those languages. So, that's kind of what
one of the tasks and other tasks basically just predicting word alignment. Basically. So just trying
to see if these, if these embeddings are do well at creating alignment in sentence translation data,
used for machine translation or I think you're kind of most interesting intrinsic evaluation task is
probably bilingual dictionary induction, which is essentially you for the tasks. You require a gold
standard dictionary of translations into words and then you just try to assess how well if the close
translations of word in the English language is also its nearest neighbor in the embedding space and
you can just compute accuracy at different levels for that task. And this is a task that has been
like very recently quite frequently used for evaluating these embeddings. Basically these intrinsic
tasks. And then as I mentioned before, there are several other downstream tasks where you can
evaluate extrinsically like undocument classification or cross-lingual dependency parsing, part of
speech tagging so basically any other NLP tasks people would care about and people would be
interested in performing or adapting to different languages. Can or has been used for evaluating
these cross-lingual word embeddings.

</turn>


<turn speaker="Matt Gardner" timestamp="25:34">

So having read a whole bunch of these papers and written this survey, how satisfied are you with
intrinsic evaluations of these methods?

</turn>


<turn speaker="Sebastian Ruder" timestamp="25:42">

My feeling is a bit similar to my opinion of intrinsic evolution for evaluating word embeddings as
well. So I think, or probably it has been in the last few years is reputable workshops as well,
which I think the first one in particular looked at kind of the challenges or the deficiencies in
using similarity for evaluating word embeddings. So I think just, yeah, the notion of having word
similarity be a predictor or indicative of performing a downstream tasks. It's not very, yeah, not
very good. So I think just using solely these tasks isn't really a good proxy for how well your
model is actually doing on something. Like there may be more semantic tasks you would care about,
but I think tasks like yeah, like bilingual dictionary induction really is a good is a good proxy
for these kinds of things. And in general, I'm, I think it's always useful. Yeah. To evaluate on one
intrinsic task like bilingual dictionary induction, but then always have an extra downstream tasks
to really see if you actually get improved performance improvements from using these embeddings.

</turn>


<turn speaker="Matt Gardner" timestamp="26:54">

And do these methods generally have performance improvements on downstream tasks?

</turn>


<turn speaker="Sebastian Ruder" timestamp="26:59">

So following up a bit to what earlier touched on. So for this depends on what your baseline
basically is or how much believable data you actually have available. So in most of these settings
they are evaluated where you don't actually have any label tag data. So in those cases you really
get good performance from these kinds of models. And yeah, I'm actually not entirely sure how many
label tag examples you would need for each of those tasks to really match the performance you get
from the cross-lingual embeddings. But I would say like in most of these cases that you actually
get, yeah. You actually get to performance improvements as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:43">

I can remember one of the experiments I didn't TACL 2016 paper was, 3000 sentences annotated for a
dependency parsing, you'd still see improvements significant improvements because you're adding
first labled word embedding.

</turn>


<turn speaker="Matt Gardner" timestamp="28:03">

Interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:04">

Yeah. I don't know what point. It doesn't matter the fact before English it did not. So I guess my
last question is what directions do you see for this area of research? So let's say I'm a first year
grad student and I'm interested in this space, but it seems like there's quite a bit of work already
done on it. Is there any unanswered questions there?

</turn>


<turn speaker="Sebastian Ruder" timestamp="28:28">

Yeah, so that's really good questions. So in writing the survey one thing we noticed was that
learning embeddings with comparable copra so where you don't actually have this really strict
requirement on having actual translations, but where you just have some level of similarity. Yeah.
We noticed that like not a lot of work has focused on that and that would be really interesting and
useful direction. Since writing this survey, I've ran, I've done a couple of experiments in that and
I found that it's harder to get to work on like only some, like if copra only somewhat or maybe only
topically related. So I found that a bit unreliable in just my personal experience, but I'm sure
there's still a lot of potential to explore different measures of links between languages that can
be just used like in a distant supervision kind of way.

</turn>


<turn speaker="Sebastian Ruder" timestamp="29:24">

So besides that, yeah, have basically what we touched upon, I think really the most interesting
direction is essentially unsupervised learning, these embeddings, unsupervised basically or with as
little data as possible. And I think that's the direction. It's really interesting. As you said,
there have been kind of two, one, one method by the Facebook that used an SSL approach to learn
these embeddings basically in a very unsupervised way. And then also last year from Mikel a paper
which basically uses as like a self-learning kind of approach starting from a very small dictionary,
which also achieves good performance. And so I think really looking at where these kind of
particular, because there's like, recently there's been lots of tension for these approaches. So
really looking at in what kind of circumstances these approaches actually work well are interesting
in particular because most of these inflation so far we're really, we're only considering datasets
that is very topically related, so like the Europol proceedings or Wikipedia. So just really looking
at the, how robust these kind of models are, how far we can get with these kind of accessory
approaches or if we can really if we can get similar performance by using smarter ways to use these
seeds, like identical words in different languages that we can use as straightforward seeds for,
introducing these dictionaries. So,

</turn>


<turn speaker="Waleed Ammar" timestamp="30:54">

Interesting. Do you know if the did any extrinsic evaluation or was it entrance?

</turn>


<turn speaker="Sebastian Ruder" timestamp="30:59">

So they evaluated I think as far as I remember on bilingual dictionary induction and got really good
results. Some us like very, I mean the results show that the approach works, but it's just not very,
not clear yet. Under what conditions? It really, it works or for what languages as well because like
I said, if there's a strong connection or a strong similarity between these languages it might be
easier to induce these kinds of unsupervised embeddings than having very dissimilar languages like
English and Finnish, for instance.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:31">

Yeah. That's pretty exciting. All right. Thank you for taking the time to talk to us and yeah, I
hope if the audience find this interesting, we should go and look for the survey. Thank you again.

</turn>


<turn speaker="Sebastian Ruder" timestamp="31:43">

Cool. Again, thanks for inviting me.

</turn>
