---
title: "Question Answering from Unstructured Text by Retrieval and Comprehension"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: 013
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:12">

Today's paper is qQuestion Answering from Unstructured Text by Retrieval and Comprehension by
Retrieval and Comprehension. These are folks at CMU and this paper takes a look at the question
answering task, but slightly harder than a lot of current iterations of it. So instead of like in
the SQuAD data sets where you're given a passage that contains the answer to the question and the
question about the passage, here you're just given a question and a corpus of documents and that
hopefully has the answer to the question that you're trying to ask. And so the first thing that you
have to do is find in that collection of documents some document that has the answer and then you
have to run some reading comprehension model that you might've learned on SQuAD or some similar kind
of model to actually pull out the answer to the question.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:04">

And I say it's different than current iterations. Actually, this general notion of question
answering has a long history in the TREC tasks, but current models are focusing these days, it seems
like on what we're calling reading comprehension where you're given a particular passage of text,
which simplifies the problem quite a bit. So this paper is looking at the harder version of the
problem. Though I should note that they're looking at the Wikimovies dataset, which actually isn't
quite a reading comprehension dataset. The issue is that the questions aren't really human
generated. They kind of are but really kind of aren't. So what the authors of the Wikimovies dataset
did was for each, this is you take Wikipedia articles and you take facts from Freebase or Wikipedia
and I guess there's a correspondence between you so it doesn't really matter which one you say.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:59">

They take these facts and then for each kind of fact they wrote down some number of templates,
question templates and then given a template and a fact you could automatically create a question so
you can automatically create a very large set of pseudo natural questions using this template
generated approach. And there are a lot of problems with using templates and calling it language.
And so I like to think of this dataset as a slot filling dataset. So the distinction that I make
between slot filling and reading comprehension is that slot filling means, given a fact with
something missing. So in Freebase maybe you're given "Colorado is a state" and you want to know what
entity is in the relation a location contains with Colorado. So like you might be looking for the
United States for instance, because Colorado is in the United States or you might be looking for
Barack Obama's birthday.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:53">

You're given some facts that is essentially just a machine readable representation of a fact with
something missing and you have to fill it in. And reading comprehension or question answering on the
other hand has an actual natural language question. And so the reading comprehension or question
answering is strictly more difficult because you have to deal with the ambiguity of language on both
understanding the meaning of the question and understanding the text that you're trying to read.
Whereas slot filling, you only have to deal with that ambiguity on the passage comprehension side.
So anyway, they call this a comprehension task. I think it's actually a slot filling task, but it's
still interesting to consider.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:36">

So they can relatively alleviate this problem by using different templates while training the model
then they're using at this time.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:47">

Yeah. So I guess the Wikimovies dataset tries to be a little smart. Like they know that these are
templates and so you're going to have this like it's essentially just, it's not natural language.
They try to make it a bit more like natural language by taking some of the templates and only using
them for the training data and using other templates for the same slot at test time. This is still
though pretty artificial to me I think because really you just have to do, fine the closest template
that you saw at training time and use that as like use the model that you learned for that in order
to answer the question. So yeah, it does a little bit better than like a traditional slot filling
thing, but still it's not, questioning answering it's slot filling. A little side note, I was at
EMNLP when this was presented, this dataset and one of the commentors got really mad at the
Wikimovies like the authors of this because they're like, stop calling this language. In fairness to
the authors I this, I think this is a useful data set. It's just slot filling. It's not question
answer. That's all I would say.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:55">

It's just to clarify the slots, the names of the slots are going to be shared across the train and
test set. Only the templates are different.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:02">

Yes.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:03">

Okay.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:04">

Yes. So I'll mention one other thing about this dataset before moving onto the models that the
paper's presenting. So the paper split these templates into train and tests. So you only saw some
templates at train and some templates at test. Another way to do this would've been to split
entities between training and dev and tests so that essentially you can't memorize facts about
entities that you see at training time and use the facts that you've memorized at test time. And
this would have been a different and also interesting way to do the dataset. I guess it just gets a
different kinds of things. One trouble with this is that if you're using an entity embedding kind of
method, which a lot of the methods on this Wikimovies dataset do, then you're going to have a hard
time because you're not going to have entity embeddings for test time entities, which just makes
this hard. But it also means that you could make this less of a reading task than a memorize facts
at training time task. So anyway other trade-offs in the dataset that you choose to use.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:07">

And that would have made the problem much more realistic because oftentimes when we're dealing with
a real problem, we actually don't see many of the entities at test time.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:20">

Yeah. So I guess we can see, the modeling decisions made in this paper do get at this a little bit
as we'll see in a minute. So the model that they're using to do question answering is essentially
what this model called the attention sum reader, this was a couple of years ago, I believe that was
first presented on the CNN Daily Mail reading comprehension dataset. And the way that the attention
sum reader works is you encode the question into a vector and then you run some sequencing encoder
on the passage. So you get a vector for every word in the passage. You compute an attention between
the question word, sorry, the question vector and each word in the passage, you normalize the
similarities into a probability distribution over the passage. And then you sum up the probability
that corresponds to each entity or each possible answer option, which in both of these datasets is
an entity.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:22">

So of course you sum up all the attention that corresponds to each entity and then that is your
probability distribution over your answer choices, which are the entities. And they use basically a
vanilla attention sum reader with a couple of additional inputs to the initial word embedding. One
is for capitalization. They have an indicator feature specifying whether this thing is capitalized,
which you could think of as like a poor man's NER version annotation. And they also have entity
linking as an additional input, which if you're trying to map, like if you want to find facts about
entities and your answer options are all entities knowing which words in the document that you're
reading correspond to which entities is pretty important for making this decision.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:11">

But how is this encoded in the network?

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:16">

They, run an entity linker and then they learn an embedding for every entity. And they can catenate
the entity vector with the word vector as the input to the passage LSTM. All right. I guess in this
case it's, it's a biGRU, same basic idea. And when I looked at their model, it seems like there's a
whole lot of overlap between this capitalization feature and the entity linking. And so it's not
clear to me why they have both of them, but apparently they found it useful, otherwise they wouldn't
have done it. So it's, I guess it's an interesting thing to try.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:51">

One other interesting point in their modeling decisions is that some of these questions have
multiple answers. So maybe the question is, who is the president of the United States? And you can
get a list of 45 different people and you want to handle this intelligently in your loss function.
So if you're looking at, I guess it's pretty common if you're doing some kind of multiple choice
question answering to compute a probability distribution over answer options and then train your
model to maximize cross entropy loss. So you predict a probability distribution. The label is a one-
hot probability distribution over I guess a one-hot vector, which is a probability distribution and
then you, try to, you maximize cross entropy loss between these two distributions. All right, sorry,
you minimize a cross entropy loss.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:42">

Except as there are multiple correct answers. There will be multiple ones in this.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:46">

Yes, exactly. And then it's no longer a probability distribution but you're making, your model still
outputs a probability distribution and so then your loss by definition can no longer be zero. You
can still try and do this anyway so that's what they do. They they minimize cross entropy loss
versus this a sum of one-hot vectors, which is okay, also a little bit awkward because if you think
of like your model outputs when you really want to output a one for something that's true. Now
you're going to, if there are two true options and you want them both to be scored highly, the max
score, you can give it is 0.5. And if there are three options, the max score, you can give it as
0.33. And so if you want to rank these outputs, and you're doing this, like you can't compare
probability distributions over different questions anymore, there's like, there's no absolute score
because you're forcing your model to distribute the probability mass across multiple entities. So
this can get a little bit awkward and makes me wonder like, why didn't they just use some kind of
ranking loss? But I guess that's just a different decision you can make. Still in a ranking last,
you still have to find some threshold if you want to actually decide which things are true and which
things are false, so you're just pushing your problem to somewhere else.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:05">

So at training time, there's an easy way to get around this problem by just instead of using ones as
the gold answer, use halfs. But then this this doesn't solve the problem at decoding time. How do
you select which subset of answers at prediction time and it's still not clear to me how, how do you
do this?

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:28">

They just use ranking metrics at test time. So they don't even try to handle this. They just output
a rank list, which again makes me think that a ranking training objective would have been a totally
natural thing to do. But that's okay. There are different ways to do the same thing. Okay. So then
that's their model for; given a passage how do we pick what the answer is. An attention sum reader
with a few additional inputs and trained with this modified cross entropy loss, sum of the cross
entropy losses. And then their ranking model is essentially the same model except instead of
outputting a distribution over entities or tokens in my document, I'm going to output a single
score, which is, is this document even relevant? Does it contain the answer to my question at all?
And to train this model they used, they took the question and passages that they knew had the
correct answer and trained the model to, I guess they sampled 10 negative documents from some
corpus.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:29">

They had 18,000, I think Wikipedia articles and they sampled 10 of those. And trained the model to
pick the correct one out of these sets of 11. Using this cross entropy loss.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:43">

The model you presented, only discusses how we can get an answer from a given paragraph, but it
doesn't tell us how to select some of the documents. Presumably there are millions of documents or
in this case, thousands of documents you want to select to find the answer in how do we do this.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:01">

So they train the model in the way that I talked about. So you have this essentially an attention
sum reader where you have a question vector and then you get a word vector, passage vectors, a
vector for each word in the passage. You compute and attention over that given the question vector
and then you pass these through some final feed forward NLP and get a single score which says, is
this document relevant or not? They train this given the correct document and some sample negative
documents. And then given the question, they run the model on all of the 18,000 documents in their
corpus and they select the top K and use that as their passage. And they do this in a pipeline pre-
processing, kind of way.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="13:51">

Yeah, this sounds very expensive.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:54">

Yeah. You can imagine if their corporates had been millions instead of 18,000 running it on all of
them probably would have been hard. But even in that case, it's not too bad to take the question,
run it through a search engine get the top 1000 or 2000 results and run this more expensive model on
all of those 2000 like that's totally feasible. Yeah, I think that would be the reasonable thing to
do.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:19">

And another natural thing that people have tried, you might be thinking that they should have done
this is used reinforcement learning. So use reinforce to get a signal for the retrieval step. Have a
single model that's trained end-to-end to do retrieval and answer the question. They say that the
reason they do this is because reinforcement learning is too hard. We have too many documents to
make this feasible. So they're set at 18,000 and you want to do reinforcement learning over this.
Maybe you're going to have time. I know that Eunsol Choi has a paper where she did this on a related
but slightly different dataset Wikisuggest, I think it was called. Though there the reinforcement
learning step was deciding which sentence has the answer in a document. And so the number of choices
you have for the reinforcement learning to learn is more on the order of a hundred or tens of
sentences instead of 18,000. So yeah, maybe they do have a point here that maybe this is too large
to be feasible with reinforcement learning. I don't know. I haven't tried it.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:25">

I guess one last point about this modeling stuff is they make an interesting analogy to models that
do like sequence-to-sequence models that can either generate words from some vocabulary or copy a
word from its input. So these have gained a lot of popularity recently on like some semantic parsing
tasks and document summarization and question generation. So there've been a lot of tasks recently
where this kind of model has been used. And they make an interesting analogy that you can think of
question answering this way too. If what you're outputting is an entity and they have this combined
model where either they can use the attention sum over the document in order to answer the question
or they can output just an entity from their list of known entities, their entity vocabulary.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:23">

And so at the end that they have a component of their model that outputs a gate which says, how much
should I, how much do I think this document actually contains the entity? And I should trust my
attention sum component versus how much should I trust, or if it's not there, should I just generate
an entity from the vocabulary? And you can imagine that for common or head entities where you have
good distributions and you've been able to memorize a bunch of facts, that training time, being able
to generate just from your vocab without really having paid any attention at all to the document is
a good idea. Whereas if it's a tail entity, do you haven't seen very much a training time, you don't
have good embeddings for it. Being able to say get that entity from an attention of a document is a
good idea.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:07">

So I thought this was a really interesting analogy, a connection between these kinds of models that
I haven't thought of before.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:12">

Yeah, I'd be very curious to see if any of the cases where the model choose to create, to select an
entity from the vocabulary are actually correct.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:24">

Yeah. So the, they give some examples of that and they're mostly on like questions about what
language something is in. So one example, they say, I think there's this, I think it's a movie. So
what language is Koi... Mil Gaya in some Bollywood movie? And the answer is Hindi, English and
Hindi, English. Never actually appear in the document. You just have to know that Bollywood produces
movies in Hindi, English. And by having seen that enough times in the training set, you can just
predict from your vocabulary distribution, your entity vocabulary distribution, that Hindi, English
are the answers.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="18:03">

That is very interesting.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:04">

Yeah, that was a nice piece of work here. So my main takeaways from this I think Wikimovies is a
moderately interesting slot filling dataset. It's still not clear to me the extent to which we
should actually use this instead of Wikireading, which I think is basically the same thing but on a
much larger scale. But this was an interesting paper on Wikimovies and so you can do some
interesting work with it. And though I guess you should note the performance is getting pretty high.
Their numbers are like, I think in the 80s. Yeah, in this end-to-end setting where they're actually
answering the questions after having done retrieval, they get like 80, 86 hits at one performance,
like accurate accuracy of at one is your top prediction correct. So they're doing quite well on this
data set it's not as clear how much room there is to improve.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:03">

It is a bit challenging problem given that you have a very large set of documents you skim from you
know, I'm surprised to see these numbers.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:12">

Yeah. I guess that 86 number I said was on this Wikientity subset that they created, which is
removing any question whose answer doesn't actually show up in the document. So like the Hindi,
English Bollywood example, wouldn't it be in that subset? So if you look at the full dataset,
actually the number is quite a bit lower, in the 60s.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:33">

Even in the sub set they're, searching for the answer in the entire dataset. They're not only
constrained to a few documents that are selected.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:41">

Yeah, I guess this is another point I wanted to talk about it, but I forgot. So they compared
against some really simple retrieval baselines. So instead of learning a model to figure out which
documents has the answer to your question that you can just literally use a simple search engine
with some simple heuristics and their boost over that is almost nothing. So actually seems like
retrieval in this setting is pretty easy. You only had 18,000 Wikipedia articles and you have to
pick, like there just isn't that much ambiguity over which article is going to have the correct
answer in most cases. I think that's what we see here.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="20:22">

It also tells us that this is good news basically because it's using a search engine or a way to do
keyword matching would be a much cheaper option.

</Turn>


<Turn speaker="Matt Gardner" timestamp="20:32">

Yeah. Except so I'm working on a pretty similar problem, which is given a science question and a
large collection of science documents find a document or a passage or paragraph or something that
supports the answer to this question. Retrieval is a lot harder there. Like the simple retrieval
baselines work in some cases. But you get much more complicated questions and it's a lot harder to
find the correct, find a document that actually has a reasonable answer to the question you're
trying to ask. Does that make sense?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="21:08">

It's not very clear why is this the case? Is it because you have to do a multi-step reasoning in
order to find the answer?

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:17">

I guess it's because some of the questions are like what causes a marble to fall to the bottom of a
glass of water. And so if you're doing a retrieval, you're going to find stuff about marbles and
water and stuff and what you want is some description of gravity and the retrieval problem is just a
lot harder in these kinds of settings.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="21:36">

Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:40">

So my takeaways from this paper I guess, the modeling decisions that they made weren't incredibly
novel. I didn't think like they just use out of the box like the attention sum reader with some
minor tweaks. This analogy to this, to the generate plus copy sequence-to-sequence thing was pretty
interesting. What I got most out of this paper, I'm working on a similar problem and these authors
published the tweaks that they needed to get this to actually work. And I can read this paper and
say, Oh hey, I can try these tweaks. Like I've, I've done so much stuff, I haven't tried the exact
things that they did. And so this is really useful for me in seeing what things I should try next to
try to get this to actually work on my task. Just some like minor experiment level configuration
kinds of things are just really useful to get from these kinds of papers. And I think that's all I
had to say.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:36">

Thank you for presenting this paper mat. Next time we'll talk about the paper titled: Discourse-
Based Objectives for Fast Unsupervised Sentence Representation Learning.

</Turn>
