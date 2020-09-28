---
title: "NLP for Truly Low Resource Languages, with Anders Søgaard"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Anders Søgaard"]
number: "044"
tags: []
description: "Anders talks with us about his line of work on doing NLP in languages where you have no linguistic resources other than a Bible translation or other religious works. He and his students have developed methods for annotation projection for both part of speech tagging and dependency parsing, aggregating information from many languages to predict annotations for languages where you have no training data. We talk about low-resource NLP generally, then dive into the specifics of the annotation projection method that Anders used, also touching on a related paper on learning cross-lingual word embeddings. https://www.semanticscholar.org/paper/If-all-you-have-is-a-bit-of-the-Bible-Learning-POS-Agic-Hovy/812965ddce635174b33621aaaa551e5f6199b6c0 https://www.semanticscholar.org/paper/Multilingual-Projection-for-Parsing-Truly-Low-Reso-Agic-Johannsen/1414e3041f4cc3366b6ab49d1dbe9216632b9c78 https://www.semanticscholar.org/paper/Cross-Lingual-Dependency-Parsing-with-Late-Decodin-Schlichtkrull-S%C3%B8gaard/eda636e3abae829cf7ad8e0519fbaec3f29d1e82 https://www.semanticscholar.org/paper/A-Strong-Baseline-for-Learning-Cross-Lingual-Word-S%C3%B8gaard-Goldberg/55ca53050fcd29e43d6dcfb7dfc6a602ec5e6878"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F366461276&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:11">

Today our guest is Anders Søgaard. Anders is currently a professor in the computer science
department at the University of Copenhagen. He's done a lot of interesting work in natural language
processing and machine learning in particular today we would like to talk to him about some of his
recent work in multi-lingual and cross-lingual NLP. Welcome to the podcast.

</turn>


<turn speaker="Anders Søgaard" timestamp="00:33">

Well thanks. Thanks.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:35">

So you've been publishing a lot of papers recently on low resource languages and how to do NLP for
these languages. Would you like to give us a brief overview on why this direction is interesting and
what you've been doing in this area?

</turn>


<turn speaker="Anders Søgaard" timestamp="00:50">

Yeah, sure. So we've been doing cross-lingual learning for a lot of different tasks, including a lot
of low level tasks and I mean a lot of NLP today is sort of intent learning of things that we're
actually interested in, sort of throwing out a lot of things like part of speech tagging and
parsing. And you can do that if you have a lot of data, but part of what you can use things like
part of speech taggers and parsers for getting inductive bias which is really important with low
resource languages where you typically have less data and more variants. The problem is that for
those languages, we typically don't have part of speech taggers and we don't have parsers. So we've
been interested in whether we can transfer, you know some of the models that we have for more
dominant and languages to these low resource languages.

</turn>


<turn speaker="Anders Søgaard" timestamp="01:45">

Our particular line of work sort of grew out of maybe not a frustration that an observation that a
lot of people working on cross-lingual learning, we're assuming access to resources that didn't seem
to scale, didn't seem to be available for low resource languages. So specifically in part of speech
tagging and parsing, a lot of people were looking at languages and this sort of intersection of
languages where you have treebanks as well as something like Europarl. So large volumes of parallel
data or they would be assuming having access to maybe big dictionaries or Google translate quality
machine translation models, none of which you would have for say a language like, you know, Tiv is
spoken in Nigeria, 10 million speakers plenty of sort of AI ready users, there but basically no
linguistic resources and definitely not sort the Europarl style parallel corpora dictionaries, et
cetera.

</turn>


<turn speaker="Anders Søgaard" timestamp="02:49">

So we asked here, what kind of assumptions can we really make about these truly low resource
languages? What kind of data is available? And obviously the answer is that that really depends on
the language. So for some languages, we do have decent dictionaries. For some we might have a lot of
translations into a particular language. It might not be English. For some languages it might be
French or for Greenland it might be Danish. But for other languages we might not have that kind of
data. And so we decided to sort of start out with some very conservative assumptions specifically in
the first paper that I suggested we talk about today. We, we only rely on the Bible. The paper is
called If all you have is a bit of the Bible: Learning POS taggers for truly low-resource languages,
because the Bible is definitely available for a lot of languages.

</turn>


<turn speaker="Anders Søgaard" timestamp="03:46">

That's a terrible resource, right. Some of the Bibles that we're looking at are maybe 300 years old
written with a different spelling convention compared to what people use today. And it's a very
specific domain. But really, you know let's see what we can do with the Bible. And then sort of, you
know along the way we started looking at other resources, like the Watchtower turns out to be a
little better than the Bible. Jehovah's witnesses monthly publication.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:23">

Do you mind explaining what the Watchtower is about? I think some of the audience would not know
that.

</turn>


<turn speaker="Anders Søgaard" timestamp="04:28">

Yeah. So Jehovah's witnesses have this monthly publication called the Watchtower and it's translated
with relatively good quality into some hundred languages every month. And the advantage of
Watchtower over the Bible is that it's a sort of a mixture of very religious stuff and very
practical stuff sort of, how to live your life in you know how to live a modern life, you know what
to think about sending your kids to elementary school, what to think about coming to the doctor, et
cetera. So it's a sort of, it's more general domain than the Bible.

</turn>


<turn speaker="Matt Gardner" timestamp="05:11">

Are there other, is that it? Like, if we want to do NLP in some really remote language, is this
really all that we have, the Bible and the Watchtower?

</turn>


<turn speaker="Anders Søgaard" timestamp="05:22">

For any given language, there's a lot of stuff that we have, right? I'd love to talk about some of
the work that we've done using resources like keystroke logs or you know, gaze data or speech data,
stuff that might be available for, we're just thinking like what do we know is available for pretty
much all the languages that we can think of and and sort of the Bible came to mind.

</turn>


<turn speaker="Anders Søgaard" timestamp="05:48">

So the next step was to say like, okay, so if we want to use the Bible, right, we're going to be,
we're going to be having really bad word alignments if we want to do things like annotation
projections. So this was sort of the first approach to cross-lingual learning going back to David
Yarowsky work in 2001, I think if we do something like that, we're going to have bad over-
alignments. With parsing we're going to have bad parses on the source side of the parallel texts
that we want to use to transfer our models. So we need, we need regularization and we need to
whenever possible sort of hedge our bets and not necessarily commit to hard decisions because
there's going to be a lot of uncertainty. in the pipeline.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:37">

So it might be helpful to the audience to give just a very brief overview on what annotation
projection is all about before we talk about how to improve it.

</turn>


<turn speaker="Anders Søgaard" timestamp="06:48">

Sorry about that. Yeah, sure. So annotations projection of the idea that if you have a model for a
language, like English, that you have a part of speech tagger you can transfer that by part of
speech tagging the source side a parallel corpus. So you take a translation a human translation, say
some parliamentary debate. You tag the English side and then you use word alignments that you can
get from say GIZA++, and you basically do labele propagation over the word alignments. So you send
over the part of speech labels from the English sentence to the corresponding French or German or
Tiv or whatever sentence. And then you basically, you train on that. There's a couple of problems
you might get. You might not have word alignments to all words on the target side.

</turn>


<turn speaker="Anders Søgaard" timestamp="07:47">

You might have multiple alignments into the same word, et cetera, but in our case because we wanted
to regularize as much as possible because we knew that these alignments would be very noisy. We use
multiple source languages. So the nice thing about the Bible is that it's multi parallel. So all the
1,600 Bibles or whatever we have a lineup, right. So there are verse numbers. So everything is
parallel, so we can have multiple source languages, we can align from multiple languages at the same
time. And what we do in this paper is very simple. We just have all the source languages vote on the
tag of any given word on the target side. And that kind of that means that with very high
probability we get tags for all words and it's not a problem that you have multiple tags projected
into the same word cause in the end we're going to be voting anyway. And that's sort of our approach
to annotation projection going back to David Yarowsky's work in 2001.

</turn>


<turn speaker="Matt Gardner" timestamp="09:07">

So, doesn't this assume that languages express the same concepts using the same linguistic
realizations? Like something that we in English might use a noun to describe might show up as a verb
or an adjective or some other, like these categories might not even be totally well-defined in some
languages. So it's like you're assuming that there's a rough correspondence between the structure of
each of these languages. Does this assumption hold and like very distant language pairs?

</turn>


<turn speaker="Anders Søgaard" timestamp="09:36">

Well, no. And that's a really good point, right? I have a bachelor's degree in linguistics. I did
typology. And I do remember all these discussions, whether Thai has adjectives, et cetera, assuming
that Thai doesn't have adjectives. I'm sure that there's a lot of languages voting on Thai verbs and
nouns to be adjectives and that might not be motivated. And that might be a problem for whatever
downstream a application you have in mind. But I would still argue that it's potentially a better
inducted bias than not having one. I like to think of these models as giving us bias for the tasks
that we're interested in. And I think, you know, even a noisy signal might be better than not having
one.

</turn>


<turn speaker="Matt Gardner" timestamp="10:44">

Can you or has anyone characterized exactly how bad this problem is?

</turn>


<turn speaker="Anders Søgaard" timestamp="10:51">

I don't, I dunno. I would assume that there's not really enough consensus among linguistic
typologists to actually estimate that.

</turn>


<turn speaker="Matt Gardner" timestamp="11:04">

Oh, I guess not even like the outstanding issues on like what categories are language in fuzzy
cases. I mean like when I actually have distant languages where nouns just show up as verbs. And
even in, even in close languages like Spanish, there'll be idiomatic expressions where I just use a
different construction to say a particular phrase and my word alignments will align a noun with a
verb because of just how the idioms align. So like how bad does this actually make it as you get
farther away. Do you have any sense of that?

</turn>


<turn speaker="Anders Søgaard" timestamp="11:42">

I don't, but it's a good question. Yeah, maybe somebody would.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:47">

There has been some work on using the typological properties of a language when you're doing this
multi-lingual learning in order to leverage the idea that closer languages will tend to have similar
representations.

</turn>


<turn speaker="Anders Søgaard" timestamp="12:03">

I was about to mention that. And I think a lot of that work, so there's Oscar Täckström's work and
there is there is more recent work on using genealogy or typological databases in different ways for
weeding a different source languages, but also for having special feature sub spaces for different
language families. A lot of that work is about parsing and I think their performance and distance do
not, or there's no perfect correlation here because there's another factor which is the annotation
guidelines also become messing up the picture of it. But yeah, that's that.

</turn>


<turn speaker="Matt Gardner" timestamp="12:51">

Okay. I guess your approach of going from lots of languages at the same time hopefully mitigates
this at least a little bit. And, well, unless you're biased for all of your source languages being
Indo-European or something, but, at least you might have a little better hope in the approach that
you're taking to annotation production.

</turn>


<turn speaker="Anders Søgaard" timestamp="13:10">

Well, I mean, that's the vast majority of the source languages in our case are definitely Indo-
European. And you know, the question is whether sampling in better ways. I mean, that's in part what
the whole like waiting to source languages based on psychological distance say would be about, It's
not really clear to me whether, cause there are other things right here, there's domain biases,
there's the fact that typologically or at least genealogically distant languages maybe type of
typologically similar in some respects and not in others, et cetera. So our approach has been very
simple and just like the more evidence we have for something, the better. And we've looked at very
simple approaches so far it's just a waiting step.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:59">

Yeah. But I think there's this idea that Matt mentioned probably motivated why we in multilingual
learning, we care much more about tasks like course parsers tagging and dependency parsing instead
of CFG parsing or the representations that you will transfer are very specific.

</turn>


<turn speaker="Anders Søgaard" timestamp="14:16">

True. So,one thing that I can mention is that if language is a very incommandtrable or chop up the
space in very different ways word alignment algorithms will suffer and we've used the confidence of
the word alignments to weigh our projections, and that typically leads to better performance. And I
guess that's sort of data-driven way of modeling that problem.

</turn>


<turn speaker="Matt Gardner" timestamp="14:49">

Yeah, that makes a lot of sense.

</turn>


<turn speaker="Anders Søgaard" timestamp="14:54">

But yeah, so, basically that's sort of the first thing we did. And you know, just showing that, even
if all you have is the Bible, you can do slightly better than just, you know, doing part of speech
induction for part of speech tagging even across language families. So it might not be perfect and
there might be all sorts of problematic linguistic assumptions doing this, but it's still like a
reasonable signal. And that part of speech tagger we used for parsing in the next paper, which is a
TACL paper. And again, we wanted to, so in dependency parsing projection is a little harder, right.
So in part of speech tagging you can look at the individual word, you can count up votes and you can
take the majority vote to be your predicted part of speech.

</turn>


<turn speaker="Anders Søgaard" timestamp="15:51">

Annotation projection for dependency parsing goes back to I think 2005. Rebecca Hwa's work where she
would project dependencies if a head word had an alignment and a dependent word had an alignment.
And then she would use heuristics to get a tree on the target side. Cause the problem is that if you
just project edges across word alignments equally you have no guarantee that you get a tree on the
target side. And so she would have these heuristics for turning whatever graph you would get on the
target set into a tree. And her set up was sort of a bilingual set up with only one source language.
And we kind of knew that at least with the Bible, we would need more source languages. But also we
wanted to hedge our bet.

</turn>


<turn speaker="Anders Søgaard" timestamp="16:40">

So we wanted to commit to hard decisions as little as possible. And so running a parser, even an
English parser on the English Bible, you're not going to get terribly good performance. So sort of
trusting a one best tree seemed dangerous. So what we decided to do instead was to basically project
scores edge scores instead of edges. So not necessarily, so not doing the coding on the source side,
not actually you know, trusting that we could find the one best tree, but instead just projecting
everything from a weight matrix from the graph based dependency parser.

</turn>


<turn speaker="Anders Søgaard" timestamp="17:28">

And doing that, it became very easy to have multiple source languages cause we didn't have to we
didn't get these individual edges. We just basically projected everything in the weight matrix
across these word alignments. And on the target side we could just count up those weights. And then
we could do the decoding on the target side, on the resulting weight matrix. So this kind of does
two things. So multiple source languages giving us this regularization effect but also enabling us
to sort of pass on the uncertainties and not have to commit until we were actually on the target
side and figuring out then what is the minimum spanning tree in the weights that we got from the
source languages.

</turn>


<turn speaker="Matt Gardner" timestamp="18:26">

So I get how you take a sentence on the source side, you run a dependency parser? You get marginals
essentially and you project those, you also run some alignment model like IBM model one and you
align from lots of languages, words from source to target and you project these labels. What I'm not
clear on still is how you use that on the target side. Do you learn a model or do you just run
decoding from these projected scores?

</turn>


<turn speaker="Anders Søgaard" timestamp="18:57">

We just apply a minimum spanning tree algorithm to the weights that we get.

</turn>


<turn speaker="Matt Gardner" timestamp="19:01">

Why not learn a model?

</turn>


<turn speaker="Anders Søgaard" timestamp="19:03">

So that's kind of the next paper.

</turn>


<turn speaker="Matt Gardner" timestamp="19:06">

Okay.

</turn>


<turn speaker="Anders Søgaard" timestamp="19:08">

The EASL paper, which was a followup to this. So it's an the TACL paper. We just have the simple
decoding algorithm.

</turn>


<turn speaker="Matt Gardner" timestamp="19:15">

So, real quick before we get to that other paper, what about for part of speech tagging? I don't, I
don't think we answered this question for the part of speech tagging work either.

</turn>


<turn speaker="Anders Søgaard" timestamp="19:22">

For part of speech tagging, we just use the model from the 2015 paper.

</turn>


<turn speaker="Matt Gardner" timestamp="19:29">

Sorry, I don't remember what, so like, do you learn a model from the target alignments or do you
just use the projections?

</turn>


<turn speaker="Anders Søgaard" timestamp="19:38">

We just use the projections, we just do the voteings in the ACL paper.

</turn>


<turn speaker="Matt Gardner" timestamp="19:43">

Okay.

</turn>


<turn speaker="Anders Søgaard" timestamp="19:43">

And again, this is a very simple paper. The new thing was just to sort of be able to do this multi-
source transfer as well as like projecting scores rather than edges. And then there was this
interesting observation that, especially for a distant language occurs, IBM-1 alignments were much
better than, than fancier word alignment models which seemed too sensitive to what order
differences. At least that one sort of our gut feeling. And that's also what we used for part of
speech tagging.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:19">

So how many source languages were you able to use for this experiment? I guess the question is like
how many languages can you rely on for this kind of transfer?

</turn>


<turn speaker="Anders Søgaard" timestamp="20:29">

So I can't remember the number 20 something, I think. So in the part of speech tagging paper we did
these two rounds where we would learn. So we had a hundred languages in the part of speech tagging
experiments and initially we only had models for 20 something of those but then did an additional
round. It didn't really give us much better performance, but you know, theoretically you can sort of
bootstrap and you can learn, you can take the learn models and you can use those as additional
sources for working in target languages. And so we ended up in some experiments having like 99
source languages. We didn't look in very sophisticated ways of doing bootstrapping and I'm sure that
there's ways of getting better performance that way.

</turn>


<turn speaker="Waleed Ammar" timestamp="21:15">

Yeah. When I read this paper, where you transfer multiple parse trees and add up the weights? It
seemed like a very intuitive approach and it was kind of, it's the sort of thing you think, Oh, why
didn't people do this for a long time?

</turn>


<turn speaker="Anders Søgaard" timestamp="21:29">

Yeah, no, it definitely makes transfer a lot easier and you don't need heuristics weight, which are
also, you know, sensitive to annotation guidelines and linguistic differences between languages. So
yeah there's sort of a very simple paper and were very happy that [we were able to] come up with
this approach. But so one thing, you already mentioned, Matt, so we do, we run this decoder on the
target side and in a way I'm not sure though if that's what you're after but, you know, we want to
hedge our bets as much as possible. But you know, we're not interested in these Bible trees on the
target side. And you know, if the Bible is, you know, a 300 years old Bible you know, maybe that
tree's not going to be worth a lot anyway. So, in this followup paper, we decided to basically not
do the decoding on the target side Bible sentences, but just learn directly from the weight matrix
and then only do decoding test time on the data that we're actually interested in. So what we do is
basically we use an LSTM that runs over the weight matrices, running over the rows and columns of
that to produce weight matrices for new sentences with a mean square error loss. So basically
replicating weight matrices for sentences instead of building up trees. And then we do decoding at
test time only. And that turns out to be a lot better.

</turn>


<turn speaker="Matt Gardner" timestamp="23:23">

Can you give some more detail on exactly how this LSTM works? I didn't quite follow from that
description.

</turn>


<turn speaker="Anders Søgaard" timestamp="23:30">

Right. So the parser can work on any kind of matrix. So we also have experiments where we do like
standard supervised parsing on a binary matrix. And so we have a matrix, which is the number of
words in a sentence by the number of words in a sentence, and you can cut up a tree that way you can
also just use the raw that's for us as supervision. And the LSTM basically just it's kinda like this
quadratic feature teacher. So we run over the rows and the columns of this matrix. And then we
combine them in the end to come up with predictions that are that are column wise. And then we
compute a loss using the means to the gold standard score matrix.

</turn>


<turn speaker="Matt Gardner" timestamp="24:44">

I see. Yeah. You look looking at your paper, this is where you have a tensor LSTM. Right. So it's
actually more complicated than, than just a linear chain LSTM. Okay. Interesting. So cool.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:58">

It's still not clear to me. How do you do a like given a matrix for one of the source languages for
one of the sentences in the Bible or maybe for all the sentences in the Bible. How do you go from
there to then you matrix for a new, for a new sentence.

</turn>


<turn speaker="Anders Søgaard" timestamp="25:16">

So, for training on the Bible, so like say our target language is Slovenian. We just like in the
TACL paper, we project all the the scores over the alignments. We get a weight matrix, which has to
sum up all the protected scores. And then we train a model to reproduce that. And at test time we
get a new sentence, which is Slovenia Newswire and we just apply that model. And then we do
decoding, minimum spanning tree decoding for that. And we get a tree that we can evaluate against,
say, a test weight from a treebank.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:54">

I see. And the baseline I suppose would be to just get the spanning tree, the best spanning tree
from each sentence and the Bible and then train a model on it. How does that compare?

</turn>


<turn speaker="Anders Søgaard" timestamp="26:08">

It's a lot better. So basically there is in the paper we have a delexicalized baseline, which on
average over the languages that we're looking at has an attachment score of about 40. And our model
is at about 50, (48.5%), whereas the sort of TACL style like lets decode on the Bible and train on
that gets a about 46%. So like an average of 2.5 Improvement.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:45">

That's interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="26:48">

So one common criticism that I hear about any kind of like, this isn't quite unsupervised, but it's
in that same thing where you don't have any supervised annotations in your target language. A
criticism is how many examples do I have to label to get the same performance? Like, is that
actually easier than doing all of this work?

</turn>


<turn speaker="Anders Søgaard" timestamp="27:12">

Well I mean that's a really interesting discussion. So it really depends on the language, right? So
in general, I think the standard reply to that question is, sure once you have a set of trained
annotators you can annotate relatively fast. But the first 100 sentences are way more difficult to
get them than you know, the following. But also for a lot of languages it's also really hard to find
good annotators. Right. And one of the reasons that we're also looking into finding linguistic
signals in gaze data and keystroke logs and hyperlinks, etc. Is because, you know, for a lot of
languages, like whatever Assami or something, finding people that are willing to annotate at least
for a research group in a university is just really hard. It might be possible to find people who
are willing to put on or to have like a little eye tracker on their laptop and read some stuff, or
it might be possible to collect, you know, hyperlinks from online texts, but it's really hard to
find annotators. So that's sort of another problem

</turn>


<turn speaker="Matt Gardner" timestamp="28:26">

Right, but if the number is just like a hundred examples and then I get the same performance,
that's, a different scenario than if I need a thousand, 10,000. Like maybe I could find a linguist,
like, especially if I like a scenario where someone might actually do this as like I know DARPA
funded military style things where like, I might need to go do some aid or do something in some new
country. And so I need to bootstrap some services. They would have the resources to hire one
linguist who could do a hundred annotations. And so the question is, does that get you enough or do
you need more? Or is this better than that?

</turn>


<turn speaker="Anders Søgaard" timestamp="29:04">

I mean, it's you can use a hundred sentences in a lot of different ways, right? And so that's one
dimension. The other dimension is that a lot of those experiments in the literature evaluate on, in
sample data. So maybe a hundred sentences from wall street journal gets you good performance on
section 23, but that's not the same as saying that it gets you good performance on, you know Amazon
reviews or emails. And you know, the more, the smaller your training set, the higher the chances of
over fitting. So the more sensitive your model is going to be to any kind of shift. You know you can
use a hundred sentences in a lot of different ways and for a lot of languages, I wish I had a
hundred sentences.

</turn>


<turn speaker="Anders Søgaard" timestamp="29:59">

It's an open question, whether it's sometimes better to have say dictionaries or other knowledge
like other resources like knowledge bases or linguistic descriptions or entries and these
typological databases, etc. My, sort of take on it is, you know, as much data as possible. And we
know that things like cross-lingual transfer occasionally help even in, you know, building fully
supervised models for English. So like, you know, if you do multitask learning using a German part
of speech data [inaudible] data for inducing an English part of speech tagger that often helps.
Right? So this cross-lingual transfer signal is, you know it's interesting to see how well you can
do with not just the Bible but for any, in any real setup. I would, you know, use all the data
that's available, whether it's keystroke logs or a tiny amount of a labeled data, a dictionary a
knowledge base or whatever signal I can get from a neighboring languages.

</turn>


<turn speaker="Matt Gardner" timestamp="31:12">

Yeah, that's a really good point.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:14">

So, going back to that paper, that ESL paper where do the late decoding I'm curious to know if we
can use this approach to also train languages, train for other, like maybe high resource languages
where you have multiple parsers and you kind of do a, some sort of co-training or you have multiple
trees predicted for the same sentences and use the same model to predict,to learn a better model.

</turn>


<turn speaker="Anders Søgaard" timestamp="31:43">

Right. That's a, that's an interesting thought. So one of the things that we worked on earlier is
learning from multiple annotations which is kind of related. So the idea here being that in NLP
we're often a little straitjacketed by adjudicated annotations. You know, in order to adjudicate
between linguistically trained annotators, you sometimes have to make relatively arbitrary
decisions. So linguist disagree about how to analyze a lot of things. You know, is "social" in
social media and adjective or a noun linguists might disagree. And in a way it seems kind of
arbitrary to stick to one analysis here. And we've done work on showing that passing some of this
disagreement onto our models is sometimes beneficial. So specifically you can have sort of a cost
sensitive learning where we say like, let's penalize her models for saying something that no
linguist would ever say, but less for something were linguists are likely to disagree.

</turn>


<turn speaker="Anders Søgaard" timestamp="33:03">

And so one thing that you can do with this particular parser is that you can have a lot of people
annotate a lot of sentences and they don't even have to produce trees if they don't like trees,
right. In this particular model. And then you can learn from, you know, just the sum of the
annotation sums, just summing up the grafts. And then you can always do decoding if you want a tree
in the end. And the same way. Yes, you could do that. So I haven't thought about parsing syntactic
parsing, but for semantic parsing where this model would also apply you could potentially learn from
sort of the sum of different semantic formulas.

</turn>


<turn speaker="Waleed Ammar" timestamp="33:45">

Yeah. Makes sense. All right. So there was one other paper that's kind of not exactly in the same
line as low resource languages, but is kind of related to multi-lingual parsing or multi-lingual
learning. That title was; A Strong Baseline for Learning Cross-Lingual Word Embeddings from Sentence
Alignments. Would you like to give us an overview on this paper?

</turn>


<turn speaker="Anders Søgaard" timestamp="34:09">

Yeah, no, it's definitely true that it's not you know, the three others are kind of a it's kinda
like a Lord of the Rings. So there's like three volumes lining up here, and then there's a fourth
one, which is the little orthogonal. It's so, so what we do here, but it's very similar in spirit.
So, what we do here is we look into cross-lingual embeddings bilingual dictionary induction if you
like, but again you know, you have sort of similar concerns with a lot of the stuff that happens in
cross-lingual, in learning cross-lingual word embeddings again assumes access to big dictionaries,
Google translate or large volumes of parallel data. So again, we thought like, how far can we get
with the Bible and what we do in this paper is evaluate a lot of different algorithms by applying
them to the Bible and using the Bible for inducing embeddings. And then sort of the main take home
is that there's this really simple algorithm that works really well and a lot better than a lot of
things that work really well on europarl or if you have access to more data.

</turn>


<turn speaker="Anders Søgaard" timestamp="35:43">

A particularly interesting thing about the paper is so we started with this sort of observation that
if you want to learn, Cross-lingual embeddings, right. So, typically when you learn embeddings, you
sort of, you try to pick the word based on words in its context. So the assumption is the words, the
meaning of the word is given by the company it keeps and so you can try to predict the event from
left and right context in the cross-lingual case. You can try to predict it from the monolingual
context as well as the cross-lingual context. So if you have sentence-aligned data, which is what we
assume in the paper, you can try to predict a word from its neighboring words in the same language,
but you can also try to predict it from the other words in the other language. And that's sort of
the core of a lot of these algorithms.

</turn>


<turn speaker="Anders Søgaard" timestamp="36:44">

And those are two different features basis. But there's actually a third space, which is the
sentence ID in this aligned corpus. And some of the algorithms that have been proposed have sort of
implicit access to this third space. And what we show is that those algorithms perform a lot better
than the others, at least in this Bible set up. So we have this very simple algorithm that only uses
that feature space and we show that that actually performs really well and as well as any of the
other algorithms. So it's a very similar algorithm. Basically it works like this. So, You have a
Bible, you want to have cross-lingual embeddings what'd you do is you build a word by verse ID
matrix. So you basically just record, where in the Bible, do you see a word? Now the verse ID space
is cross-lingual that's defined for both languages. So by just having these vectors saying where in
the Bible, do I see a word you get a cross-lingual space.

</turn>


<turn speaker="Anders Søgaard" timestamp="37:50">

And it turns out that just doing SVD or something on those vectors or on that matrix gives you
really good embeddings. Specifically what we do to get good performance is either do positive PMI
matrix of words by verse IDs and then do SVD on that. Or just take a binary matrix. And do skip gram
negative sampling on that matrix. It's really simple. And I think the sort of interesting part
except there's a lot of interesting things that we try to talk about in the paper, like, you know,
the relation to this Dice metric that people have been using in machine translation, or it used to
be sort of a baseline algorithm for word alignment. But also it's sort of conceptually different,
right? So instead of saying that the meaning of the word is to company it keeps, we're saying that
the meaning is sort of where you see a word the situations in which you see a word? And you know, as
some, I've, before I did my linguistics typology, bachelor's degree, I did philosophy because I was
a big fan of Vichtenstein. And to me this is a slightly Vichtensteinian in the sense of you know,
defining a word by the situations in which it's used.

</turn>


<turn speaker="Anders Søgaard" timestamp="39:12">

And you know, since we did this paper, we've looked into other sort of extra linguistic way or extra
linguistic contexts. So for example, you can also look at a word distribution over YouTube videos
and look for a, you know, multilingual common threads for YouTube videos. And think of that as a
cross-lingual representation. Or you can think of you know, the representation of a word over multi-
lingual hashtags or there's a lot of things here. We've also use Gaze data to give us cross-lingual
embeddings. And I think that's, that opens up sort of an interesting can of worms too. Like, can we,
can we find sort of extra linguistic reference points and use those for either inducing cross-
lingual embeddings or at least improving or regularizing our cross-lingual embeddings.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:11">

So one detail here that not clear. How do you evaluate the different methods for embedding the
words?

</turn>


<turn speaker="Anders Søgaard" timestamp="40:18">

Right. So that's a really good question cause there, there's so many ways you can evaluate
embeddings, right. So we wanted to, I guess ideally we would have like a ton of different downstream
tasks. We wanted to keep things simple and have a lot of different languages in different datasets
and just focus on a couple of tasks. We felt that the most generic ones would be, or the most
representative ones would be bilingual dictionary induction and word alignment. So that's what we
used. And one interesting thing there is that that enabled us to compare to word alignment
algorithms. And it turns out that one really competitive baseline here is just IBM-1 again which is
something that people in cross-lingual embedding space typically do not use as a baseline.

</turn>


<turn speaker="Anders Søgaard" timestamp="41:08">

And it turned out that was a lot better than some of the word embedding algorithms. So yeah,
specifically, we learn the cross-lingual embeddings and then we have two tasks. One is given human
word alignments. So manually annotated word alignments if a word in some sentence is aligned to
another word can we predict what word that is? And so a relatively simple task and the harder task
is if you have a word in the bilingual dictionary, can you predict what the translation of that word
is according to the dictionary?

</turn>


<turn speaker="Waleed Ammar" timestamp="41:43">

Right. Yeah. I mean definitely the dictionary induction seems like a very reasonable evaluation. I'm
kind of surprised that you're using word alignments cause it's kind of, I don't know, it's, for me
it's kind of an archaic task at this point.

</turn>


<turn speaker="Anders Søgaard" timestamp="42:00">

Yeah, right. I guess it's in some ways simpler than bilingual dictionary induction, but at the same
time it's also sort of a meaning in context, which to some extent is more interesting than bilingual
dictionary induction because, you know, words have a lot of different senses and in word alignment
data, you potentially get some of the less frequent senses to which you might not get in bilingual
dictionaries. You might also have metaphor and things like that that would not be representative in
dictionaries.

</turn>


<turn speaker="Waleed Ammar" timestamp="42:39">

Makes sense. So any last thoughts about this paper? I'm also curious to know if you have any
thoughts about the current state of things in multi-lingual learning. What's coming next? What
should people work on when you're doing multi-lingual NLP?

</turn>


<turn speaker="Anders Søgaard" timestamp="42:57">

I think, so I'm I spent today in at the Technical University of Darmstadt having one-on-one meetings
with a lot of students, a lot of which work on cross-lingual learning. Also a lot of which work on
multi-task learning. And I think you know your work on combining multi-task learning and cross-
lingual learning is, I think is going to be representative of a lot of work that we're going to see
in the future. It makes a lot of sense when you deal with low resource languages to look into all
sorts of data, whatever is available that can give you some, you know, interesting bias for inducing
models. And I like to think of it as sort of a knowledge base completion problem, right? So if you
want to do Quechua dependency parsing and you don't have to Quechua dependency parsing data, if you
have English dependency parsing data and English part of speech tagging data and Quechua part of
speech tagging data, maybe, you know, those three resources will give you a lot of correlations that
will give you a basis for learning high quality Quechua dependence parses.

</turn>


<turn speaker="Anders Søgaard" timestamp="44:18">

So I think that that sort of combination and multitask learning and cross-lingual learning is really
interesting. I also think that there is a sort of third dimension, which is semi-supervised learning
and there's a lot of work in progress across a lot of different groups that I visited recently on
trying to get multi-tasks, learning and semi-supervised learning to work together. There's also
using other resources like knowledge bases for regularization. And you know, I think we're going to
see a lot of work, sort of trying to get hands dirty on, trying to combine a lot of different data
sources. Cause, you know for any of the languages that we deal with in the Bible paper, there is a
lot of first data sources that are probably much better than the Bible, right. So the Bible might be
sort of in the intersection of what's available for all these languages, but for any one of them,
there's going to be more data thats much more interesting to look at it. And I think people will
hopefully do a lot of that in the future.

</turn>


<turn speaker="Matt Gardner" timestamp="45:34">

Here's, a random question that what you just said made me think of, so we've talked today about
cross- lingual transfer of feature word representations and of part of speech tags and of dependency
parsing. Has anyone ever thought about doing a cross-lingual learning of language modeling? Does
that even make sense? Like, could you build a better language model for Quechua by leveraging a
trillion tokens of English,

</turn>


<turn speaker="Anders Søgaard" timestamp="46:04">

Like a character base language model.

</turn>


<turn speaker="Matt Gardner" timestamp="46:07">

Or word level?

</turn>


<turn speaker="Anders Søgaard" timestamp="46:09">

I feel like I've seen work on this. I better not say anything.

</turn>


<turn speaker="Matt Gardner" timestamp="46:16">

Okay.

</turn>


<turn speaker="Anders Søgaard" timestamp="46:17">

I think somebody worked on that.I worried that I'm going to say something really stupid?

</turn>


<turn speaker="Matt Gardner" timestamp="46:28">

That's fine. I'm just thinking about this because I get Waleed and Matt Peters at AI2 have done some
work on using language models to improve performance on other NLP tasks. And this talks about multi-
task learning cross-lingual learning made me wonder about how, we've also thought about using this
for domain adaptation. Right. So Waleed's paper on this Science IE SemEval task with Matt Peters was
how do we do better at information extraction on a small domain where we don't have a lot of labeled
data using a language model. So could you do the same transfer for language modeling? Like, I don't
know. It just made me think about this and I don't know,

</turn>


<turn speaker="Anders Søgaard" timestamp="47:14">

One of the things you can get from multi-task learning implicitly is domain adaptation by having
another task in another language or in another domain in your target domain. And you know, there's
[inaudible] work also on using a language model as an auxiliary task. We done part of speech tagging
work where we have predicting the log frequency of the next word as an auxiliary task giving us much
better performance on unseen words, for example. So, you know, you don't have to connect a lot of
dots to get cross-lingual language modeling as a potential bridge here, I guess. But I haven't
worked on that.

</turn>


<turn speaker="Matt Gardner" timestamp="47:56">

Okay. Interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="47:59">

Yeah, that's exciting. Okay. Thank you very much for joining us for the recording and yeah, we'll be
looking forward to more papers in your in your research.

</turn>


<turn speaker="Anders Søgaard" timestamp="48:08">

Thank you so much. Thanks for having me.

</turn>
