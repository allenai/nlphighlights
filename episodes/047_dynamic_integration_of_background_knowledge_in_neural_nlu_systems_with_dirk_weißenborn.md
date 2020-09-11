---
title: "Dynamic integration of background knowledge in neural NLU systems, with Dirk Weißenborn"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Dirk Weißenborn"]
number: "047"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:12">

Our guest today is Dirk Weißenborn. Dirk is a PhD student at DFKI German Research Center for
Artificial Intelligence working with Hans Uszkoreit and Feiyu Xu, he's interested in representation
learning for NLP with a focus on tasks involved in reading comprehension and integrational
background knowledge. Today we're going to talk about his paper Dynamic Integration of Background
Knowledge in Neural NLU systems. It was published in archive earlier in 2017 and it was coauthored
with Tomas Kocisky and Chris Dyer. So the paper proposes, a method for incorporating the background
knowledge related to a particular example by dynamically refining word embeddings. Could you tell us
a little more about the motivation for doing this work Dirk?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="00:59">

Sure. So in order to understand the motivation about our work, we need to understand the limitations
of nowadays neural architectures and how we employ them. Usually we train our models on static
results that are merely able to learn a very limited amount of facts about the world of course, to
learn knowledge is restricted to the domain of training data and thus very hard to transfer. And of
course similarly these models will have a hard time with changing knowledge. So basically knowledge
and facts that change over time, like who is the president or other entity related facts. Although
these problems can be of course mitigated using unsupervised learning methods and online learning
techniques. I believe that with techniques that we have available at the moment is not enough
current unsupervised learning techniques are not sufficiently powerful at extracting abstract
knowledge from unlabeled data yet.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="01:53">

So for instance, it's very hard to extract simple information about words, for example, which words
are synonyms and antonyms to each other. So when we use word embeddings, for instance, the most
typical form of exploiting unsupervised learning from language processing. Another important fact is
of course that it's also not clear how and what kind of knowledge we store when we train our models,
especially when we consider that they use only a very limited amount of the parameters when trained
on supervised tasks. So how much can you really store in this very limited amount of pairing
throughout world? That's very limited. So I think such models do not really understand a lot about
language and I'm not particularly good at memorizing large amounts of abstract knowledge, but I'm
really good at memorizing large amounts of superficial patterns. So in short, the ability to learn
and store abstract knowledge is limited. In our work, we propose a very simple solution to go around
that. This is to provide explicit data background knowledge. So we don't try to learn background
knowledge and in form of parameter somehow implicitly, but we just give the model the knowledge that
it needs in order to solve the task at hand on the fly.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:06">

Basically what you're saying. Instead of having to provide parametrization for the different kinds
in which the knowledge may be available. You're going to use the word embeddings as the basis for
representing this knowledge and we're going to consume the background knowledge and somehow induce
this information in word embeddings. So what was the approach you use to operationalize this?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="03:32">

Exactly. So as you already mentioned, we operationalized the approach of integrating background
knowledge through the use of word embeddings. So we basically, we use word embeddings here in this
work as kind of key value store you could say, so they are not anything else than that. So each word
basically refers to some kind of embedding, which stores some form of information. Usually we think
of them as being static, but now we basically make the word embeddings dynamic. That means we
integrate background knowledge, explicit background knowledge, so written texts directly into the
word representations before we processed the task at hand. So this is the basic idea.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:12">

How do you pick which background knowledge you're going to use?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="04:16">

Yeah, so this is somehow task dependent of course. So at the moment how we solved this in the paper
is depending on the task, we kind of have an heuristic that retrieves potentially relevant
background knowledge. By potentially we mean that we kind of try to exhaustively, get high recall on
what might be relevant. Even if we retrieve unrelevant more knowledge for the task at hand. Our
model should be able to just neglect it and not use it for its prediction. For example both question
answering and recognizing textual entailment. It's basically both of these tasks about two sequences
of text. One is the question or the hypothesis and the other is the context from which we should
basically extract the answer or the premise for recognizing textual entailment and we kind of just
retrieve information that connects those two sequences tighter with each other. So we look for
concepts that are connected in sequence one with concepts that are connected with concepts in
sequence two. Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:20">

So just to be sure I'm understanding what's going on, your goal is to incorporate background
knowledge that we find as written text into some kind of reasoning model. So question answering or
natural language inference, textual entailment, whatever you want to call that task. And then your,
your process, you have some baseline model, which is I guess some LSTM we can get into that a little
bit more. And then you retrieved some background knowledge given the question in the passage and
that background knowledge then gets used how? What exactly do you do here?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="05:52">

So what we do is basically we try to find the list of as we call it in the paper assertions,
assertions are basically simple facts about the word in written text and natural language. And once
we have those, a list of those, we kind of let what we call a reading module, read that knowledge.
And by reading it, it incrementally updates the word representations. So if it reads a word in the
background knowledge, it is basically incorporating at the moment it's used as this occurrence of
the word and like the context around it to refine its representation, it's word representation based
on that knowledge, that piece of knowledge that we gave to the model.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:38">

And so what you mean here is, so you have say an LSTM, probably a bi-directional LSTM that you're
running on these textual assertions that are your background knowledge. You're taking the output of
the LSTM for each word as your new embedding for that word.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="06:52">

Oh right. It's not new. It's we used that output of, for example of BiLSTMs of course, now one word
can occur multiple times, right? In the context in the background of a piece of background knowledge
that we reading. So if we have a list of additional background information, then one concept or one
word might appear multiple times. So we additional lead to pool of all the occurrences of a single
word. And we cannot just update or use the output of the, of the LSTM as the new word embedding. But
we need to pool of all occurrences of this word. And then we update by basically using a weighted
edition with all representations of the word. So by pooling we get basically a new update candidate
and then we perform a weighted update by a weighted edition with the old representation and the NLU
representation of the word that we basically gathered by pooling over all occurrences of the LSTM
states or whatever you use that we get from reading the background knowledge.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:56">

And then what happens to this new representation? How does it get used?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="08:00">

Then we have basically updated our word embedding matrix and because most of our neural NLU models
that we are using rely on the use of word embeddings. You basically just give the task model that
sits on top that uses the word embeddings, the updated word embeddings in contrast to using the
fixed word embeddings that we usually use and that's all there is. It's really kind of orthogonal to
the task. So you just uptake your word embedding matrix and use the updated, as we call it, refined
word embedding matrix to basically employ your task model on top.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:40">

And I suppose the model parameters that are used to refine these word embeddings are trained jointly
with the end task.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="08:48">

Yeah, that's also important, right? That the models or the reading module is trained jointly with
the task model on top. So there might be interesting ways of using this reading module to share
between tasks. Maybe so, QA can share the same reading module with NLI and so on. We didn't try that
yet, but this is a possibility as well. But as of now we just use it as part of our end-to-end model
for the task.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:14">

So if we remove the pooling operation that you have between lemmas, like if I see the same word in
multiple background assertions and in the question or in the passage for instance, you do this
averaging pooling operation. If we remove that, are you basically just adding another LSTM another
layer of LSTM on the bottom? Is that right?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="09:34">

For example, if you would do that, then it's not possible anymore to update your word embedding
matrix, but then you can also not incorporate your background knowledge as well. Right, because the
pooling is what you need in order to incorporate the background knowledge. But if you think about it
that way, you could say that basically if let's say each word only occurs once in your context and
you don't have any background knowledge, then it's very similar to employing basically a stacked
LSTM. So I guess two layers of LSTM thats, correct. Yeah. Not only that, you have kind of a skip
connection between the layers with the way it updates, but that's correct.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:21">

So in the paper you mentioned two things in order to combine these different, the word embedding
difference reading steps, right? There's the maxpooling and there's the gated. Could you give us
some intuition on why we need this instead of taking just the last embedding? Did you try to use the
last embedding? Do you think it would work?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="10:41">

I am not sure that I understand the question completely. What do you mean by the last embedding?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:47">

Oh, sorry. After the word, all the contexts and the related background information has been
consumed. We might think that like the final product of this, the final word embedding. After
updating with all this information, will be the ones to use because it's like the most comprehensive
one, but of course it's most affected by the most recent texts that you used. So perhaps that's why
we need to do maxpooling.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="11:14">

So. Yeah. One thing is then you're basically would do an update, on the update on your word
embeddings would be the same for words. That would be one thing that's maybe not good. A second
thing is that you mentioned the most comprehensive is the last state which is not necessarily true
because we're employing bi-directional LSTM. So at each point you basically have information about
the whole context. So at each position in the text you're reading,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:44">

Sorry, I think I didn't make myself clear. There are multiple reading steps in this approach. So the
first example that you give in the paper first you read the premise and then you read the hypothesis
and then you read the assertions and you do maxpooling here after each, in order to get a
representation for a particular word after.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="12:06">

Wow. Okay.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:08">

Instead of taking maxpooling,

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="12:10">

We do everything in parallel. Is that what you,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:12">

You can basically take the last representation for the word people based on the most recent reading
step which has already consumed all the previous steps.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="12:22">

So basically what you're saying is that we don't have to iteratively incrementally update our
embedding matrix, but just we update it once?,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:34">

No, actually I, we can probably take this offline after after the podcast, but another question I
had was how to pick which, how many digging steps you use, how to design these, in the example you
gave, you have three readings steps and then you use embedding in the final task. I can see other
ways of doing it. For example, each of the assertions could be a separate training step or you could
have combined that premise and the hypothesis because they're like the example that you're trying to
comprehend. Do you have any insights on how to choose these? How to organize our reading steps in a
given task?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="13:17">

Right. If you, for example, let's start with the assertion. So if you would basically read each
assertion individually and then read the next one, then you would impose kind of a reading order and
also, you would have a lot of updates on your embedding matrix. That means the distance or the depth
basically of your network because it's dynamically constructed would be very very large and that
means that information from like the Word first reading step would have a hard time reaching the
actual task model that sits on top. So I can imagine that this would really pose problems. So we
order basically now the reading steps because they had different types of inputs. One has basically
the type premise, the other has the type hypothesis, the other has to type assertions. So that's why
we chose three here.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="14:12">

For question answering it's similar question, context or odd question to supporting context
documents and the assertions. But I understand that of course we could basically process in parallel
the premise and the hypothesis as you mentioned, that's possible. But I think here it might be nice
to read the hypothesis when you already have read the context of the premise that might effect the
model. Yes, it's kind of a trade off. It might be, it might help, it might not help. So that's just
a design edition here it's, I am not sure whether it's really necessary.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="14:47">

Another possible thing to experiment with to see if the order in which we present this information
makes a difference. So if we first read the assertions and then read the hypothesis, a neighborhood
premise does it make any difference, I'd be curious to know if that's the case.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="15:02">

Yeah. So we had experiments on that as well and it didn't, so you could basically change premise
hypothesis around and it didn't make a big of a difference. So we just stuck with this order. But
what's basically important is that you basically tell at least for question answering, I believe
it's important to tell the model what is the question and what is the supporting document now, just
for the model to know what it is reading at the moment. Similarly for recognizing textual
entailment. So you additionally give one feature that indicates what kind of input the model is
receiving at the moment. Is it receiving the premise, is it receiving the hypothesis or the
assertions and this is kind of an important feature for the model test to know where does this text
come from? What's the source of this text?

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:49">

Yeah, I would guess the maxpooling operation that you do in computer vision, the motivation for the
maxpooling is to give, it gives the model some like a convolutional networks some kind of
translation and variance. And the analogy in this setting is for mutation in variance to the
ordering that you're passing these things. I would expect it to be like your result is very
intuitive because that's what I would expect to get from the maxpooling operation.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="16:14">

Yes.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:15">

So the way that you're doing this background knowledge and incorporation is by updating word
embeddings that get fed into your end task model. Do you have any intuition for what exactly this
model is? Like how is this actually using the background knowledge? Like, do you have some kind of
explanation for what's actually going on here?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="16:34">

Yes. so now it really depends, so there are some simple things that the model can extract. For
example, when it's reading for example, for question answering the question, it might simply just
for each word that it reads at this particular moment add a feature that basically says, well this
word appeared in the question. This is a very important feature that is very important for getting
good results of question answering for example, with a simple task model on top. And so those kinds
of tasks, specific features can be learned by the model, other things that are going on. So we
plotted this once as well. How do the embeddings change from the rich node to the refined ones? You
basically see that model adds kind of information that's orthogonal to the information that was
already there in the unrefined word embeddings.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="17:29">

So it's not trying to move around the semantics of the words, but it's kind of adding information in
a way, background information to these models. But in general, it's really hard to say what exactly
the model does. I think it really extract some important task specific features. If you look for
natural language inference, when we give the model an assertion that basically says, well, this word
is the antonym of that word. Then the model somehow stores this information because when we switch
the assertion and say the same word is the synonym of the other word, then the model also switches
the predictions from whatever it had said before. So it can do this kind of counterfactual reasoning
somehow. So it is somehow sensitive to the semantics of the information that it's presented with.
But how exactly it does it is hard to say really. I would say it basically it learns to store those
kinds of information, like features basically just in the memory. Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:35">

So as I was reading this paper, I thought there've been some recent papers showing that LSTM is
basically, or at least you can view it, a simplified view of them is what you're doing is
representing each word as a weighted combination of the other words in your, in the sentence, right,
which in some sense is also what word2vec does but over a much larger training set and any
particular word pair that you might see in your word2vec corpus is going to be pretty diluted
probably after you're averaging over like a billion words and so what you're doing with this
particular way of getting background knowledge is enhancing links between the question in the
passage or the premise and the hypothesis.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="19:15">

Exactly.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:15">

That would have been there, that you would certainly have seen these support associations in
word2vec. It's just may have been washed out by a large training set and now you're forcing these
word vectors to be closer together because what the LSTM is doing when it gives you the refined
representation for people after you read the assertion people as a group or a group is another word
for people or something like this. You're pushing the vector for people closer to the vector for
group and then this strengthens the association between the premise and the hypothesis and your
input.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="19:49">

This somehow, yes, this is part of the story definitely I would say. So what you're doing basically
is you make stronger connections between your premise and hypothesis, make it basically easier for
the model to find these connections and pushing them maybe closer together somehow in your
representation space. But this alone would not explain, for example, the example that I had before
the counterfactual reasoning. So thre is a bit more going on than just making things similar because
if you just make things similar then you cannot really, then you don't know really what the
difference between what antonym and synonym means and things like that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="20:28">

Yep. That's a good point.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="20:29">

So there is a bit more going on. I'm sure there is definitely. And that was also the initial idea of
this model that you have that you really kind of try to push those closer. But obviously that cannot
be all.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="20:45">

Could you tell us more about the experimental results? So you mentioned that you experimented with
two tasks, question answering and textual entailment. Can you give us the highlights of the results?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="20:58">

Yeah, of course. So let me start maybe by question answering. So what we could show there basically
that we got consistent improvements when basically introducing our idea. Bye. On a baseline task
model that we used, which is a simple biLSTM which does not perform that well on the document QA
tasks by itself. But when we introduce our extension or reading extension, it does very well, even
if you don't use knowledge, even if you don't use background knowledge. So if you just give the
model what we also kind of consider background knowledge, the context of the task itself. So would
question and document it, reads it and then update. So you could now argue that well it's kind of
having two stacked LSTM so the model is a bit more powerful, but we test that as well. So what
happens if we have our baseline models? So without the reading architecture but using two layers of
LSTMs or biLSTMs and the model did not improve performance.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="21:58">

So it's not that we have now more parameters or more computation complexity, but it's really that
our reading architecture and especially this pooling of word occurrences helps a lot. If we then add
knowledge, it helps further significantly so you can really see the gains for textual entailment.
It's kind of similar at least for the multi-NLI dataset. That's a more recent, a more complex
dataset on SNLI it did help for our simple biLSTM baseline model, but we also try to use our
methodology with a more state-of-the-art kind of model. Basically enhanced LSTM for natural language
inference and there we could not improve on SNLI. So it's basically it stayed the same with reading
and with knowledge, but on multiNLI you can really see the differences again. So we argued in the
paper as well SNLI has a lot of peculiarities.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="22:59">

It's really not a good test bed in general for our approach because the vocabulary there is very
limited. The sentences are very short. The domain is very narrow. It's basically image captions and
language is not complex. So but on multiNLI which is much more complex, we can really show
improvements again. And yeah, another highlight is basically that in the low data regimes so if we
remove training data and dimensionality of our model, then there the improvements get even higher.
So really low data regimes, our model or our basically refinement strategy helps even more.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="23:38">

I didn't understand that last part. What do you mean by removing the training data?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="23:42">

So basically by reducing the amount of training that we give to the model, because these dataset a
very, very large, one thing we might want from like extracting background knowledge is that our
models are not that data hungry anymore. And we could show that improvements are more substantial
when you have a lower or a less training data.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="24:01">

So Okay. Can I go back to the QA results when you're only including the context instead of the
background knowledge? This sounds a lot like context sensitive word embeddings. So there are several
previous papers that try to basically just get a better representation of the word based on the
given context instead of using the same embedding for every word. And this sounds very similar, do
you have any thoughts on how this is different without using the background knowledge?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="24:31">

So, one thing were it differs again is here that we do the pooling of word occurrences and the other
big differences that these other systems with the contextualized word representations are pre-
trained on some other results. So this is kind of an orthogonal approach. This is kind of, you use
aesthetic model to produce some word representation. And actually we could also use the word
representations that come out of these contextualized word representations as starting embeddings
for our model. So our model basically refines embeddings on the fly kind of, and it's basically task
specific. Whereas the other one is unsupervised and trained in an unsupervised fashion.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:14">

Actually I wouldn't have thought this was context sensitive because you still have a tight level
embedding matrix, right? Because the pooling that you're doing across four instances of the same
word..

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:28">

Thats only for a given example. So my understanding is that you have a different embedding for each
different example in the dataset. So it's sensitive to the example, not sensitive to the particular
token.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="25:40">

It's kind of sensitive to the entire context of the task of this task instance. You could say it's
an contextualized with respect to the instance of the task that you're processing. So to the entire
context, whereas in contextualize word representations that are used most of the time because they
don't use any pooling, it is rather really contextualize to this specific appearance of a token. So
there are definitely some differences there.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="26:09">

Yeah, I think that's an important difference for an absolute model.

</Turn>


<Turn speaker="Matt Gardner" timestamp="26:11">

And I guess in the way that you're doing things, if I get a sentence like "I may have done that in
May or June, I don't remember." The word may there it may be your lemmatiser figures out that these
are different lemmas but assuming it doesn't, both instances of may there would get the same
representation, you would pool across those. Right.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="26:30">

I would pool across those, but to starting representations of those two would be different because I
don't start with the lemma word embeddings I start with the real word embedding. So then I would
basically update both these representations with the same pooled representation and it might turn
out that one of them gets updated a lot and the other one not at all. It might happen. That May as
being the noun would be updated a lot because we like to update nouns and nouns are context
sensitive, whereas the other may, the word or exterior word won't be updated. So yes, things like
that can happen with the current approach that we're taking. But the model can learn to
differentiate between these.

</Turn>


<Turn speaker="Matt Gardner" timestamp="27:17">

So it seems like to me as I read papers that published on SQuAD and TriviaQA kinds of models, a
really key feature of these is some kind of bi-directional attention or attention matrix between the
question in the passage so that you can find similar words between them and what you're showing here
is improvements over a baseline that doesn't do this. And so I wonder to what extent you're
capturing the same information that a bi-directional kind of attention would capture and if your
improvements would help, if you had a richer model to start with.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:50">

Before going into this, for the TriviaQA tasks, the baseline one was even outperforming the state-
of-the-art] results even without adding any of the proposed methods. I don't know. It seems like the
baseline on TriviaQA or not, are not true enough. I don't know. That's actually something I was
wondering about.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="28:08">

Yeah, so that's the problem with TriviaQA at that time was that the kind of the way the different
papers or experiments were done were not all equal. They used different amounts of context to answer
it because the context that you get in TriviaQA is very large, so you have to put something away. So
there might be something going on in the preprocessing that's different in my case than in the other
works. Now there was a paper that showed how to do it properly. They got really good results with
that, actually now we will have a refined version of this paper where we also do it the proper way
such that the TriviaQA basically results get much, much better. Yeah. So it's a bit weird, but this
is something that, yeah, because of TriviaQA that happens because of TriviaQA and people not
properly using it.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="29:10">

How about the question that Matt was asking, do you think what you're doing now with the reading
steps to refine the embeddings resembles in any way like the bidirectional attention?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="29:24">

So this is a very good question. If you think about it somehow, yes, it's kind of hard because the
maxpooling operation that you're doing and integrating that back into the word representations
that's something similar to some form of attention. So because basically you're fusing information
of different occurrences of the same word in different inputs as well even and by fusing these kinds
of information and later reusing that fused information, you do something similar, differences that
it's hard. So it's hard tension in a way, it's not soft, it's not computed, it's just saying, well
words the same words or the same lemmas belong to each other kind of. And we've fused their
information so we could say there's something similar somehow going on. Only that we don't rely on a
computational model for doing that, but use a very straightforward putting operational over lemmas.
Yep. Was that clear?

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:27">

Yep, I get the. I don't know. Looking at the ESIM results where you take a state-of-the-art model
already and try to improve it with your method. It seems a lot less compelling.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="30:39">

Yes, yes, definitely. Yeah. As I said, this is really, it makes also sense that it's less compelling
because part of it is really exactly this, right, this mechanism. So that already kind of captures a
lot of what you would also capture with attention basically. But it does it just as part of the
model and you don't have to learn it. And actually if you look at the low data regime, then also for
ESIM, it makes a big difference because if you have not enough training data, then ESIM cannot learn
good attention weights but our model, since it's hard and it's kind of hard coded attention, it does
a much better job. So yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="31:19">

Yeah, that's an interesting point.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="31:21">

Right. So my last question about the paper has to do with run time performance. How much additional
time should we expect if we use this approach?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="31:31">

Right. So that that really depends. You know, it depends. One on the encoder that you use for your
reading modules and now here we use biLSTMs, which are known to be quite slow. Maybe one could use
something that's a bit faster and a bit more localized, like CNNs. Basically, that would mean that
you cannot capture the whole context of what you're reading at a particular moment. But maybe for
this approach here it might be enough because for assertions for example, you usually only have four
or five words, so you could also have a convolution with a width of four or five that would catch
basically everything at every position. But in general, if you say your task model is also a biLSTM,
then you should expect around twice the run time, right? Because you're basically having to run two
biLTMS plus the run time that you need for the assertions.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="32:29">

And that really depends on how many assertions you give to the model. But since the assertions are
very small in the case of concept map, that's not that actually that you lose in terms of of runtime
and for ESIM for example, the impact of course is not that big because ESIM itself is much more, it
needs much more computation than the reading module. So it depends on your task system. If your task
system itself is very complex, then it's negligible. If your task system very easy and very simple,
then it will of course double the run time for instance.

</Turn>


<Turn speaker="Matt Gardner" timestamp="33:09">

So I have one more question. The motivation for this paper was how do we incorporate background
knowledge into our models, right?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="33:17">

Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="33:17">

How well do you think you've captured that goal?

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="33:21">

So I think that we could show that our models are able to incorporate background knowledge in a
semantically useful way. We have experiments for like counterfactual reasoning and things like that.
So that seems to work. And also empirically we show that the information that you get from
knowledge, external knowledge helps models across different tasks. And actually if I may share some
improvements that we have now, not improvements, but we have another source of information that we
included now for this model that will be updated soon in the paper. And this is Wikipedia itself for
question answering. So what we did there basically is we try to answer the question, take the top K
predictions. And for these top K predictions we try to retrieve their corresponding Wikipedia
entries. And we basically then look at the definitions in Wikipediat, the abstract and our reading
architecture reads the abstracts of the top K predictions and incorporates that knowledge as well.
And after that the model gets even better at question answering, especially in TriviaQA. So in
TriviaQA I really get a lot of gains by also incorporating background knowledge from Wikipedia not
just from concept maps and yeah, so this is upcoming. So I think we are able to incorporate
important information from heterogeneous sources. So yes. So I think we kind of achieved what we
went out for.

</Turn>


<Turn speaker="Matt Gardner" timestamp="35:04">

Yeah, that's really interesting to hear. I was particularly wondering about the limitations of this
triple store, concept map like can these same methods apply to more complex kinds of background
knowledge, harder kinds of questions. So yeah, I'll be really interested to see the updated version.
That sounds pretty cool.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="35:18">

Yeah. So short answer to that is yes, it also works with unstructured when you incorporate
unstructured background knowledge.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="35:27">

Yeah. I thought that was very clever, saying that to convert a knowledge based tupoles to natural
language , it never occurred to me that would be an effective way to equate background knowledge.
Glad it works. All right. Thank you very much for joining us Dirk.

</Turn>


<Turn speaker="Dirk Weißenborn" timestamp="35:43">

Well, thank you.

</Turn>


<Turn speaker="Matt Gardner" timestamp="35:44">

Thanks.

</Turn>
