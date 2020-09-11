---
title: "Bidirectional Attention Flow for Machine Comprehension"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "002"
tags: []
description: TODO
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

Okay, today's paper is Bidirectional Attention Flow for Machine Comprehension by Minjoon Seo,
Aniruddha Kembhavi, Ali Farhadi, Hannaneh Hajishirzi. These are folks at the University of
Washington and the Allen Institute for Artificial Intelligence, Min was here as an intern when he
did this work. This paper focuses on a task that's become to be known as reading comprehension,
which is, the inputs to this task are a passage of text in this case, a Wikipedia paragraph and a
question about that passage where the answer is constraints to be a span of text within the passage.
And so a model needs to take these two inputs and predict as output a span. This, this paper was
evaluated on this dataset called the Stanford question, answering dataset or SQuAD.

</turn>


<turn speaker="Matt Gardner" timestamp="01:05">

And when it was submitted, this paper was originally submitted to archive in November. This was
state-of-the-art, it got the best performance on this dataset. An ensemble of these models is still
pretty close to the top performance on the SQuAD leaderboard though single model performance has
gone down quite a bit. Because this is a really busy area there have been a lot of submissions
recently.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:31">

So what is the high level overview of the paper?

</turn>


<turn speaker="Matt Gardner" timestamp="01:36">

So at its core, what any technique that wants to answer SQuAD questions needs to do is match words
in the question to words in the passage and then find some kind of type information. Like if you see
in the question what team you need to find a team in the passage. So an example passage might be
about the Superbowl in 2010 and the question might be who won or which team won the Superbowl in
2010. And the model would essentially look for the word Superbowl in 2010. Find them in the passage
and then find some noun phrase near that string of words that matches what it on the question which
team. And that's essentially what this model does. At a high level you could think of like, it does
pretty standard stuff. You encode both the passage and the question using some kind of encoder. They
use a word embeddings concatenated with the character level CNN and then pass that through some
highway layers of bi-directional LSTM. And they do that using the same encoders for both the passage
and the question to get them into the same relative space. And then you need to do some kind of
matching. The tricky thing with this matching is that you'll have a different number of words in the
passage and in the question.

</turn>


<turn speaker="Matt Gardner" timestamp="02:53">

And so previous techniques will often take the question and smash it into a single vector instead of
one vector per word in the question and then compute some attention given that question vector over
the passage and try to do a matching that way. This paper uses a matrix of attentions essentially
computing a similarity between each encoded word in the passage and each encoded word in the
question to try to do this matching. And they call it the particular way that they do this bi-
directional attention flow. Interestingly, I think this is pretty similar to a method called
decomposable attention on the Stanford Natural Language Inference dataset by Ankur Parikh and some
others at Google New York where they similarly compute a matrix of attentions and then use that.

</turn>


<turn speaker="Matt Gardner" timestamp="03:38">

So I guess that task is a little bit different where you have a passage, or premise and hypothesis
and you want to know does the premise entail the hypothesis? And so they decompose this using a
decomposable matrix of attentions to compute whether each word in the premise entails each word in
the hypothesis and then does some aggregation on top of that. Anyway, the point there is, it's a
really similar similarity operation where you have this matrix of attentions and that's essentially
what this paper does. It computes this and then gets a representation, takes this matrix and smashes
it back into the passage representation so that you still have an encoded vector for each word in
the passage, which then goes through another few deep biLSTMs and then you predict the span
beginning, pass that through another biLSTM and then predict the span text you get. In the end,
which span of text answers the question that was asked.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:38">

So in what way are the two models different?

</turn>


<turn speaker="Matt Gardner" timestamp="04:44">

You mean the decomposable attention and bidirectional attention to flow. So decomposable attention
was trying to do a natural language inference. And so in the end, given these two strings of texts,
you output a yes no, it was actually entails, contradicts, or neutral. But essentially you predict a
classification decision given these two things these two strings of text. Whereas in SQuAD and this
bi-directional attention flow model, they have this similar matrix of attentions except the output
is an index into the passage. And so it's not a simple classification decision. And so you need the
output of this similarity matrix computation to go back and do something that's the same size of the
passage so that you can predict which index to the passage has the answer.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:32">

That makes sense. So the paper also talks about the difference between a dynamic attention and the
attention method that is proposed in the paper. Would you like to explain the difference between
dynamic attention and this approach?

</turn>


<turn speaker="Matt Gardner" timestamp="05:47">

I think you're actually a little more familiar with that because of your experience with machine
translation.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:51">

Of course. So in machine translation, your job is to translate from a source sentence, a sequence of
words in a source language to a sequence of words in a target language. And there as you're
translating the first word, you have a distribution over the words you're actually translating in
the source sentence. Sometimes you'd be translating one word at a time, sometimes you'd be
translating multiple words. And it makes sense as you're translating the full word in the target
sentence to have a dependency on the previous weights for the attention because you wouldn't be
scrabbling around the sentence all the time. So in that sense having some kind of a memory for the
attention which in this paper refers to it as dynamic attention makes sense as opposed in question
answering this is not necessarily a useful thing.

</turn>


<turn speaker="Matt Gardner" timestamp="06:45">

Does dynamic attention also let you keep track of what things you've already translated?

</turn>


<turn speaker="Waleed Ammar" timestamp="06:50">

Some versions of it allows you to do this? Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="06:54">

Okay, interesting. Another interesting thing to notice is that if you look at the SQuAD leader board
results, all of the top results have this ensemble thing at the end. And so BiDaf, the bi-
directional attention flow model which we'll call BiDaf shows up twice on the leaderboard one that
says single model and one that says ensemble. And the difference between the single model and the
ensemble model for almost all of these is about four points F1 so BiDaf on its own gets about 77 F1
score. Whereas an ensemble, of BiDaf models gets 81 F1 score. It's just interesting that you always
have to do this to get top performance on these tasks.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:31">

Right, so how does the BiDaf paper do the ensemble?

</turn>


<turn speaker="Matt Gardner" timestamp="07:35">

So BiDaf is a description of a model architecture and you can train that model architecture given
the SQuAD training set and evaluate it on the SQuAD test set. And this is a single model, but that
training procedure relies on a particular set of random states, which you can set using a random
seed. And what they do to do this ensemble is they just pick 12 different random seeds, train 12
different models which have exactly the same architecture, but it will be slightly different because
of this ensembling. And then each model outputs a probability for each span in the text. So you get
like P of X, Y for each span-start, span-ends possibility in the passage. And then they sum those P
of X, Ys over all 12 models and pick the ARG max the span that has the highest total probability
assigned by all of the models together.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:33">

By any of the moments. Is that right?

</turn>


<turn speaker="Matt Gardner" timestamp="08:37">

It's not the, it's not the, the span that gets the highest individual probability score. It's the
highest sum of probability scores across all 12 models.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:48">

I see. Okay.

</turn>


<turn speaker="Matt Gardner" timestamp="08:49">

So the last thing I thought we could talk about with this paper is that Min has put up an
interactive demo on the web, that you can actually play around with this model and how it does, I
think this is really nice. It lets you actually evaluate in practice how this does on real datasets.
Because you can ask it anything you want. You can write your own paragraph and ask the model to
answer a question about the paragraph and see how it does. And you can see that it does really well
on certain kinds of easy questions, but you can also really easily trick the model in really
interesting ways.

</turn>


<turn speaker="Matt Gardner" timestamp="09:24">

So here's an example that I like. This is found by Peter Clark. If you give the model the paragraph,
"A dog's main job is to bark. A cat carries out the task of meowing." And then you give it the
question, "What tasks does the dog carry out?" It answers "meowing" and not "to bark" or "barking."
I think this is really interesting. And it really highlights what it is that this model is doing. So
it's taking the words in the question and finding the best match to words in the passage and here
"dog" matches "dog" in the first sentence. But task "carry out" matches. "Cats carry out the task"
in the second sentence a whole lot better. There's like more overlap with the second sentence than
there is with the first. And so it says, Oh, the answer is in the second sentence. And then it pulls
out the entity, the phrase that best matches the question words like what task? And it says
"meowing," even though the answer is totally wrong.

</turn>


<turn speaker="Matt Gardner" timestamp="10:26">

Another interesting failure case of these models is in a demo paragraph. This one actually comes
from SQuAD. It's a paragraph about the Superbowl 50. The last sentence is; so this is a paragraph
about the Panthers and it says "They (the Panthers) joined the Patriots, Dallas Cowboys and
Pittsburgh Steelers as one of four teams that have made eight appearances in the Superbowl." So if
you ask it, what teams have made eight appearances in the Superbowl, it gives you "Patriots, Dallas
Cowboys and Pittsburgh Steelers." Yeah, that's actually right. Except it only gets three of the four
because "the Panthers" only appears as a pronoun and it appears disjoint from "Patriots, Dallas
Cowboys and Pittsburgh Steelers." So while this model is able to match eight appearances in the
Superbowl with eight appearances in the Superbowl and the question, so like the question in the
passage match almost exactly it's able to pull out the part of that sentence that answers the
question except it misses that there's also additional information earlier in the paragraph that it
could have used to give a better answer to the question.

</turn>


<turn speaker="Matt Gardner" timestamp="11:26">

And also you can slightly tweak this question to make the model fail again in other interesting
ways. So if you give bad grammar to the question and say what team have made 10 appearances in the
Superbowl, it just pulls out Pittsburgh Steelers. That's interesting, it's at least able to
differentiate singular and plural. And when it thinks that the answer is asking for something
singular it returns just a single answer. I think that's pretty cool even though well I guess it's
not clear what should do with a bad grammar in the question anyway. So that's interesting. Also if
you change eight appearances to 10 appearances. So the question is now what teams have made 10
appearances in the Superbowl? It gives you the same answer.

</turn>


<turn speaker="Matt Gardner" timestamp="12:10">

It's not surprising that it gives you the same answer. This model doesn't have any capacity to
reason about numbers, but it shows how easily these models can be misled by giving it questions that
are similar to, but importantly different from word sequences that appear in the passage.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:29">

Right. So, Matt, you were working on this model and other models and so you probably have insights
on how to address some of the problems that you just mentioned.

</turn>


<turn speaker="Matt Gardner" timestamp="12:43">

Ooh. Personally I think, well if you want to get this eight versus 10 thing, right, you have to have
some kind of formal representation of the meaning of this passage. Like you're not going to get a
neural net to do arithmetic without some kind of symbolic computation. It's just not going to
happen. I don't think, maybe some people would disagree with me, but I don't think that's going to
happen. I think you need some kind of merging of semantic parsing in, in some form with these kinds
of neural matching of question words to passage texts. Like, you, need something more formal or
symbolic to do these more complex kinds of things. I don't think there's a way around that.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:21">

That makes a lot of sense. Do you think we should just switch gears to doing symbol reasoning or do
you think there is a way to combine the hybrid modeling approach where you can only do symbolic
reasoning when you need to?

</turn>


<turn speaker="Matt Gardner" timestamp="13:35">

I think that's an excellent question and it's definitely an open one. There's a lot of research
ongoing in this area and I don't think this is solved at all. It's something that we're actively
working on here. And lots of other people are working on it too. So we'll see how things play out. I
guess

</turn>


<turn speaker="Waleed Ammar" timestamp="13:50">

So good.

</turn>


<turn speaker="Matt Gardner" timestamp="13:51">

Okay. I think that's it for this week. Next time, or sorry for, that's it for today. Next time we
will talk about a paper called: Making Neural QA as Simple as Possible but not Simpler.

</turn>
