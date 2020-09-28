---
title: "Neural Network Models for Paraphrase Identification, Semantic Textual Similarity, Natural Language Inference, and Question Answering, with Wuwei Lan"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Wei Xu","Wuwei Lan"]
number: "064"
tags: []
description: "Best reproduction paper at COLING 2018, by Wuwei Lan and Wei Xu. This paper takes a bunch of models for sentence pair classification (including paraphrase identification, semantic textual similarity, natural language inference / entailment, and answer sentence selection for QA) and compares all of them on all tasks. There's a very nice table in the paper showing the cross product of models and datasets, and how by looking at the original papers this table is almost empty; Wuwei and Wei fill in all of the missing values in that table with their own experiments. This is a very nice piece of work that helps us gain a broader understanding of how these models perform in diverse settings, and it's awesome that COLING explicitly asked for and rewarded this kind of paper, as it's not your typical \"come look at my shiny new model!\" paper. Our discussion with Wuwei and Wei covers what models and datasets the paper looked at, why the datasets can be treated similarly (and some reasons for why maybe they should be treated differently), the differences between the models that were tested, and the difficulties of reproducing someone else's model. https://www.semanticscholar.org/paper/Neural-Network-Models-for-Paraphrase-Semantic-and-Lan-Xu/6c990c162816bff2133a8e0ed9719bd0f87ae9d9"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F482835120&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

Okay. Today our guests are Wuwei Lan and Wei Xu, Wuwei Lan is a PhD student at Ohio state
university. His recent work focuses on collecting sentence paraphrases at large scale and deep
neural networks for automatic paraphrase identification. Wei Xu is an assistant professor at Ohio
state university and recently she's been focusing on learning semantics from large data or natural
language understanding and generation with stylistic creations. Welcome to the podcast. So today
we'll be discussing your paper which won the best paper award at COLING 2018. Congrats The paper is
titled Neural Network Models for Paraphrase Identification, Semantic Textual Similarity, Natural
Language Inference, and Question Answering. So just with the paper is that several NLP problems take
the form of two input sequences of tokens and categorical output. And while researchers have been
addressing each of these problems separately, there are certainly related, they are related tasks.
And it would be interesting to see how state of the art models for one of these tasks fare against
the others. So in this paper you provide a systematic analysis of how several of these models
perform across multiple tasks and domains. Could you tell us more about the different tasks and the
data sets that you use for evaluation in this framework?

</turn>


<turn speaker="Wuwei Lan" timestamp="01:34">

Yeah, sure. We use the fall tasks are the first day, the paraphrase identification. This task is
given sentence. The pair, we want to identify whether the two sentences, they are paraphrased though
with each other. The paraphrase. This task had two labels, paraphrase or non paraphrase. The second
task is a semantical textural similarity. This is similar to paraphrase the identification and the
difference. That's the labels, the labels follow semantic textural similarity is a similarities
score between zero and five. It's not a binary classification. The opposite shall be regression
value. Real valuable. Between zero and five, five is most similar and the zero is not similar. And
the start task is natural language inference. And is this task is very popular because of the SNLI
and MNLI dataset, this kind of a really good tool, the paraphrase, identification and a semantic
textual similarity.

</turn>


<turn speaker="Wuwei Lan" timestamp="02:32">

With Natural Language Inference. We want to predict the It focuses on three semantic relations: the
premise entails the hypothesis (entailment), they contradict each other (contradiction), or they are
unrelated (neutral). that is if we can, predict the data from the hypothesis from the premise this
is the one direction from premise to hypothesis. However for paraphrase identification, semantic
textual similarity this two way, bidirectional from synthesis one to synthesis two. So this
semantical relationship is kind of different in natural language inference. Similarly for
question/answering. There's also a pair QA pair given a question. Can we see this is the answer, The
sentence is the is the answer for this question. True or false?

</turn>


<turn speaker="Waleed Ammar" timestamp="03:25">

So in question answering, there are many variations of the question answering problems. Which one
are we talking about? What is the form of the answer?

</turn>


<turn speaker="Wuwei Lan" timestamp="03:33">

The question and Answering system that we use is WikiQA and TreeQA and also use a clean version. A
clean version means that we still act the QA Pairs. That is the answer pairs is a sentence. The best
answer, the correct answer is selected by the semantic relationship with the question.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:53">

So the input to the model is going to be the question and only one of the sentences that are
candidates. Is that right?

</turn>


<turn speaker="Wuwei Lan" timestamp="04:00">

The inputs for model is though one question, pair one questions sentence and one answer sentence is
a pair.

</turn>


<turn speaker="Matt Gardner" timestamp="04:07">

Yeah, I've heard of this task called answer sentence selection a lot of the time. So it's not like
extractive question answering like from SQuAD or something. We're given a passage and a question you
need to pull out the answer. We're just scoring answers, which might just be full sentences.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:24">

So going back to the first two tasks that you described, is it fair to say that any paraphrase, any
positive example in the paraphrase identification task would count also as a five in the semantic
textual similarity task.

</turn>


<turn speaker="Wuwei Lan" timestamp="04:41">

The semantic textual similarity task, we can think of as the score of five can be classified into
paraphrase, and the score zero, one, two can be classified into non paraphrase, but this is just a
very rough equivalence that we can actually, during the semantic textual similarity dataset
annotation, the Walker read our real value between zero and a five for this pair. So this is kind of
complicated to compare with the paraphrase and education.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:17">

Yeah. So clearly there are similar, like there are, there are related tasks. They're not the same
exactly. The four that you mentioned, some of them are more related than others. So do you feel
like, are there any specific differences between the nature of these tasks that would require
different inductive biases? Or do you feel that the same model or the same kind of inductive biases
baked in our models should be good for equally good for all these tasks? Of course, the paper later
tries to test this hypothesis. But I wanted to ask about what's the intuition behind the study? Did
you feel that was the main hypothesis that we should get the same, the best results with one type of
model for all of them?

</turn>


<turn speaker="Wei Xu" timestamp="06:04">

Yeah, that's an interesting question that's actually a very, a very good question. I think there's
differences in the dataset that it's very hard to analyze very quantitatively. So that's also one of
the reason of our paper is not only try to understand the models, but as well as to say whether we
can understand different data collection a little bit better. Also this year, there's a actually the
paper from your colleague at AI2 talking about the artificial annotation biases in the natural
language inference data set. So I do notice that something similar is kind of off the data quite
varies because the natural language inferences was given to a sentence to the croudsourcing workers
and add them to write a entailment or a negation or a neutral sentences. So the cross housing
workers will do it in some certain way.

</turn>


<turn speaker="Wei Xu" timestamp="07:08">

While the paraphrase identification task, we primarily tested on Twitter data that we collected in
our prior work, which is much more natural because the Twitter users will write quite independently
if we collect data from trending topics. But our other data set we tested is from the Twitter URL
data set, which basically rely on tweets that contain the same URL that refer to the same news
articles. In that case, some of the user may write independently and some other users will be
primarily a rephrasing from the news headlines. So that is also a little bit tricky. So we do notice
there are all these differences from the data collection techniques every person used. So that's
coming back to your question, how they are. All this data are connected in terms of tasks, but it's
also very much depends on the data sources or the data collection methodology used. We do feel after
this analysis we found like the data collection is still very challenging for this research field
that considers the pairs of sentences and the field probably needs to not only working on the
different, better models but as well as creating a more high quality and well refined data set for
future works.

</turn>


<turn speaker="Matt Gardner" timestamp="08:43">

Yeah. And I guess my intuition on the modeling question, should a single model do well across all of
these tasks? Before I read the paper, there's been a lot of work on getting single vectors for whole
sentences and comparing the two vectors. If you buy into that as a good representation then you
would think that it would work across all of these different tasks, you would think, I'm not sure
how much I buy into that. And particularly for something like a paraphrase detection, being able to
align substructures explicitly seems like it should really help. And for things like entailment
that's also probably true for question answering or answer sentence similarity. You wouldn't really
expect there to be a correspondence between structures in the question in the answer. And so maybe
an alignment kind of model wouldn't be as good I don't know. So at least my intuition is that no, a
single model probably wouldn't work unless you really think that a single sentence vector is going
to work and I'm not very convinced by that.

</turn>


<turn speaker="Wei Xu" timestamp="09:44">

I feel the same as you do. Exactly. I feel the sentence inviting my stories definitely have the
promises to be faster to train and more to apply to a different task. On the other side if you have
more particular data models that work closely on how to align the sentences or align pieces of a
sentence, a word or phrase based in the two sentence is definitely can do a better job. I think as a
little bit really depends on the task. As far as the data set, I felt like for paraphrases this word
alignment Or sentence alignment phrase alignment are quite crucial. It's definitely, if you consider
that it will work much better than having an embedding individually produced for each sentence and
compare the similarity off the two sentence level vectors.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:40">

Yes. Okay. I actually this time it would be a good point to explain the two broad categories of
models that we're talking about for the audience because we assume that people didn't listener
didn't necessarily read the paper. So yeah. Basically we're talking about two categories of models
that are often used for sentence. Comparing sentence pairs, one of them you referred to as sentence
encoding models, and the other is sentence pair interaction model. The main difference is that in
the sentence pair interaction model, you don't just encode the whole sequence in one vector, but you
also try to find the interaction between each pair of words and yeah. As, as you will note in the
paper. These are the main two types of models that are, have been considered in the past. So I
really like how you analyze a variety of different models in the same framework and helped, which
helps better understanding how the differs. So in table one, you summarize the key design choices
made in each of the components as you're recording the sentence, as you're a computing, the
interaction between pairs of words for a variety of models, I think it's like something like 15
models.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:54">

Which revealed how close these models some of these models are. Could you elaborate a little bit on
the framework that he used to analyze this models and touch on them? The main sign choices you feel
were important?

</turn>


<turn speaker="Wuwei Lan" timestamp="12:06">

Yeah, yeah, sure. The other two do a very good comparison. We carefully selected the four or five
models and the four sentence embedding based model. That means that we encode a vector for
sentences, then compare the sentences. We select inference and as you see for inference it is very
simple LSTM encoder with the max pooling. And as I see just is just a three layer LSTM. Always the
short caught connection followed by max pooling. With these two models that we can compare encoding
ability, which is better? One the LSTM is good enough or similar LSTM with the shortcut connection
is better? This is the first example you can compare. That's something that you manual based models.
Now let's talk about the pair interaction based models

</turn>


<turn speaker="Wuwei Lan" timestamp="13:02">

For this second type we select a three models the first is, the DecAtt , it's called decomposable
attentionand model. This kind of model doesn't use LSTM, and doesn't consider context information
The two sentences just go into the neural network and that follows the interaction in the textual
operations, between two sentences. So I think that you can refer to equation seven, to look at how
the equation calculated them. And DecATT was proposed in 2016. And it's very simple, very fast, can
get good performance on SNLI. And later ESIM was proposed. It's almost the same as the DecATT but It
uses context information and the word the sentence encoder is represented by biLSTM and not just
feed forward network. The attention part is almost the same as the DecATT.

</turn>


<turn speaker="Wuwei Lan" timestamp="14:11">

We call DecATT and ESIM as soft attention because the computer operating between any one of the pair
from the two sentences and okay. You are to compare the soft attention we experimented. We'll start
a model is called a PWIM, this kind of model uses a hard attention different from the soft attention
in equation seven the hard attention is a very intuitive, given the interaction matrix we sort the
interaction value and then select the top rank, for the pairs and then highlights them in Largo is
10 times or some other value. And then after this, the enlarge the rest on the matrix then we can
apply deep convolutional networks or LSTMs to identify the interaction pattern in the matrix. In
summary, we compare the first encoder, which kind of encoder is good. Single layer LSTM or three
layer LSTM, which is the best with short caller connection second, we compare the context. DecATT
doesn't use a LSTM other users use the LSTM model contact in the encoder representation. Third we
compare the soft and the hard attention. Which kind of attention is better. So yeah, I think three
comparisons should be very interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:51">

And how about the other variations that you have in table one looked like there are a larger variety
of design choices. And I wonder, I know you cannot possibly like test every thing, but I'm just
curious to know if you feel like any of these is worth highlighting or like just talking about.

</turn>


<turn speaker="Wuwei Lan" timestamp="16:12">

Actually short staked sentence encoder LSTM is most popular, other people also use treeLSTM
similarly, but I LSTM is most is considered the best of performance. I think ideally mode is LSTM as
a sentence encoder, this should be a default selection. This part I, it's okay. And second is the
interaction, interaction and attention. Actually it's the model with the interaction and attention
is always better than the sentence embedding based model. So here the interaction is a, it's a very
important to that, and I want to mention that there is a one model, use the self attention Wang and
Jiang 2017. So is this a different attention defined from the DecATT or PWIM model, but we didn't do
experiment of all this kind of mode, this kind of attention.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:20">

So self attention, it shouldn't, I guess be used for interaction right to find the interaction
between pairs of words across sentences. What do you use it for? Is it for the aggregation part?

</turn>


<turn speaker="Wuwei Lan" timestamp="17:31">

Oh, self-interaction is also used sentence encoder, they can be used to orient interaction.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:38">

And how about the like the different choices in the aggregation, tell us and output layers. Do you
feel like, it seems like they're kind of originally all hard

</turn>


<turn speaker="Wuwei Lan" timestamp="17:48">

These don't differ to much, if you use MLP or CNN it doesn't effect much. Mostly people will use
that material perception very simple and good enough to show the performance.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:01">

Okay. So do you want to jump into the experiments then and tell us about how the, the results looked
like or are there anything else that you'd like to talk about in the modeling part?

</turn>


<turn speaker="Wuwei Lan" timestamp="18:16">

Yeah, another interesting is that, during my re-implementation, based on pytorch, there are some
tricks, you'll have to adapts them. Otherwise you can not get to the performance reports in the
original paper. We can look at the full point the to implementation details actually for, SSE this
model, users a three layer biLSTM or with the shortcut connection it's very complicated, and this
model can be easily overfit. You can convert very fast but it can easily be overfit in the training
data . So we have to control the learning rate carefully for each application we insure the learning
rate,there's an equation there. So, each type up we make the learning task smaller, smaller and to
avoid this model overfitting in the dataset. I thought this is easier. This model I tried a long
time to get performance in the original paper but failed. Finally I am and use uses this technique,
gradient clipping that means for each gradient update we check the L2 norm of all the gradient
valuers. Now if it's greater than a threshold, we consider scale the gradient by a specific factor.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:52">

So these are, details that they're not mentioned in the original paper but these are things that you
had to do in order to match the results or get close to the results, I guess. I guess like as a
general statement I think that the core message you're trying to say is it's not easy to replicate
previous results. And yeah, that's kind of a risk when you're doing this sort of analysis. You worry
that like the results may not be taken seriously because you didn't actually replicate the same
numbers that you will reported before. So there will be some doubt that you have a bug in your
implementation or something like this. Could you tell us a little more about like how I guess how to
address this concern because obviously one of the reasons you may not be able to reproduce is
because people didn't do a very good job. Like reporting. Like we run a hundred experiments they
report only the best results and we've seen a lot of cases like this.

</turn>


<turn speaker="Wuwei Lan" timestamp="20:52">

Yeah, yeah, I agree with you. Actually the only one model implementation, if there is any small part
there, you cannot get to the performance. But in some cases the model can be, we are already clear
about every detail of this model and as the code is already checked multiple times, you can
guarantee there's no bug there. We can know that gets the performance stuff. So this would be
interesting. Yeah, there are some, there must be some trick we didn't pay attention to. So,

</turn>


<turn speaker="Waleed Ammar" timestamp="21:25">

I mean there are always going to be like some hyper parameters that you, you didn't tune right. You
cannot possibly tune everything.

</turn>


<turn speaker="Wuwei Lan" timestamp="21:33">

Just to follow the original setting follow the setting in the paper, the proposal, this kind of
hyper parameters

</turn>


<turn speaker="Waleed Ammar" timestamp="21:43">

And you feel that, that it's fully specified until he likes it oftentimes when I try to re implement
or replicate the results of another paper. They don't mention all the hyper parameters. There's some
choices that actually may matter. Like the size of the batch maybe, you know, I don't know like in
small things, like specific...

</turn>


<turn speaker="Wuwei Lan" timestamp="22:01">

I know that. Yeah. So yeah, I also need to check the original code. For example LSM originated in
Seattle and the PWIM was originally implemented in Tarsha I have to check the original code to get
some details.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:21">

Yeah. I mean I find this very useful exploration. I'm just like, I would like to think we do not
need to be a little bit be concerned at all when we're doing this type of analysis about whether our
results will match the previous results. And when do we stop trying?

</turn>


<turn speaker="Matt Gardner" timestamp="22:37">

Yeah, I think this is really depressing actually. You said it was, there might be some bug if you
don't reproduce the results, but actually a different hyper parameter I don't think is a bug. It's
just magic. And so like how it's just really frustrating being in this actually because you never
know what's the cause of your results. Like it's, it's super hard to reimplement someone else's
work. And so that's why it's a whole lot easier to start with a consistent environment where you
control everything. And you can run really controlled experiments to see the effect of particular
changes that you make, but then reviewers get grumpy at you because you're not reporting against the
original results. And it's just a big mess.

</turn>


<turn speaker="Wei Xu" timestamp="23:27">

Yeah, it's quite challenging. I think for about the modal we really care about I believe will, I
actually try to run it line by line to a side by side comparison as I very indirectly, I lost the
performance and the like and I realized like, on the toy example, I output the same thing. So it's a
pretty doubting. Yeah, glad enough. I think way I'm they pushed the performance pretty close to the
original reported on the certain data set, each of the model produced. We still, for most of the
cases we shot off like one point of performance that we really didn't figure out the final trigger.
And also I think it's worth mentioning the only, we were running out of time to pick the best
performance. Of course the best practice would be everyone run like five random seeds starting and I
average it.

</turn>


<turn speaker="Wei Xu" timestamp="24:19">

But given how long time you need to train such kind of model, I think a rarely way actually in
practice our source would do that. We couldn't do that either. So that ended up sort of, we thought
that might be the case that we lost a little bit performance, but I think this is kind of a known
problem. So actually I was very glad to see when I got the review back that people understand this
as a difficulty. Tried our best and the way faithfully there's reported, the number we could have
gotten. And thats also a very good point that because the difficulty of comparing or implementing
all this models I thought, that's one of the reason at the beginning of, Oh, I want you to say it
actually how this model performance at need to make it have a more controlled environment. Because
at this current stage of the research in this area, people have been working on neural model for two
or three years on these kind of tasks and data set.

</turn>


<turn speaker="Wei Xu" timestamp="25:19">

The performance differences of the top models are getting very close. So it's very hard to say what
the next direction to go, what actually worked or what doesn't. So we literally implemented it all
into a framework to make it more as comparable as possible. So they do say some interesting results
coming out. And actually when they put all this exciting results together, we were shocked to see
how many like empty cells in the table we have one table in a paper. I show you all the models and
the matrix of models as well as the dataset. When we actually put them together, I was shocked to
see how much empty space are there. We don't know what happening. So we were like determine to fill
this gap. But still it's a quite a pensive department I think some of the model take like two or
three days to form a cluster. So actually we were able to carry out this research because Ohio's
State actually will have a Ohio super computer center. So they have GPU clusters have like dozens or
hundreds GPUs they can use.

</turn>


<turn speaker="Wuwei Lan" timestamp="26:32">

116.

</turn>


<turn speaker="Wei Xu" timestamp="26:34">

Yeah. That's made it possible to do this research. So I can see why the original authors wouldn't be
able to run everything and show every result.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:44">

Yeah. Do you have any concerns about, I mean, I'm a little concerned that the results, the
conclusions we make from the experiments are based on one run instead of, like you mentioned having
multiple runs and computing the average and computing the standard division. Do you have a sense of
how big the variance look like for some of these models?

</turn>


<turn speaker="Wei Xu" timestamp="27:06">

Yeah. actually the variance is not that big, for the table we just run the one run time actually if
you run multiple times though the ranking order is always the same.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:20">

Well that's, that's great to hear. Thank you. Are there any, any other highlights that you'd like to
comment on in the, in the experimental results based on your analysis?

</turn>


<turn speaker="Wei Xu" timestamp="27:29">

I find something that impressed me is that if you're use a TreeLSTM it worked very well on those
dataset, that derived from Twitter data, which is such a surprise because parsing doesn't seem to be
something I would normally do on Twitter data to start and we also tried out actually the Stanford
standard parser, that's not even specially developed for the Twitter data. And then they realize
that it's kind of more, not about a model, but more about the data just because there's so much like
a partial matches in the Twitter data because this wasn't given a sentence and asked the cross and
water to rewrite. So it kind of like the Twitter user independently write about some event
happening. So they may have some half sentence like I think or like I wondered. So it kind of not
really have much caring a lot of meaning.

</turn>


<turn speaker="Wei Xu" timestamp="28:23">

But this gave actually a biLSTM a lot of hard time. So if you use 2LSTM and parsing. So then you
will have kind of put the a, there's like use these pieces into a less important position then
actually it works better. So that make us notice that the Twitter dataset we collected, although
have very interesting many kind of naturally occurred paraphrases, it does have not as clear in
terms of like the exact match of the meaning of the sentence. So we're currently actually working on
to a try to clean up this data set to make it with some post editing processes in order to make this
Twitter or paraphrase data set we created before to be even cleaner and more close to natural
language inferences data that was created by the crowd sourcing workers directly.

</turn>


<turn speaker="Waleed Ammar" timestamp="29:19">

Yeah, that's very interesting. I see in the table four that some of the models that do not model the
interaction. Still get the best results for like the SSE models getting the best results on the
Quora data set. Would you any, any thoughts on why this might be the case Is Quora t he textual
similarity task?

</turn>


<turn speaker="Wuwei Lan" timestamp="29:41">

Yeah. Quora is a little interesting. Actually this data set is not, it's just collected from the
user annotator identify them. Okay. People ask so many questions in Quora. Okay. If this year
they're founded, this question had been answered before, and people say, okay we will tag this
question and the paraphrase of the original question. So this kind of process can give us a noisy
labels compared to other standard datasets. The second thing is that for Quora, the interaction part
of between the pair in the Quora dataset is not very big deal. We also mentioned explain this in
4.3.2 The last question. Why does SEE excell on Quora?

</turn>


<turn speaker="Waleed Ammar" timestamp="30:38">

Okay.

</turn>


<turn speaker="Wei Xu" timestamp="30:38">

I do think like the Quora data set because they kind of more semiautomatic can be created and also
comprehend. Those like duplicate questions on Quora website. So a lot of pairs which I labeled as
paraphrases are content, a lot of words shared in common. So it's kind of similar to an early data
set. Started this paraphrase and textual entailment research back in 2005 or so from Microsoft
research, which is called Microsoft Research Paraphrase, which was quite popularly used for like
last decade. That's dataset have a similar issue. It's just a lot of paraphrase pairs. They contain
a lot of words shared in common. So they are actually quite strictly speaking are paraphrases, but
they are just less interesting from a model point of view.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:32">

Well but that doesn't necessarily explain why adding the interaction doesn't help or a, or maybe I'm
missing the point.

</turn>


<turn speaker="Matt Gardner" timestamp="31:40">

My guess here is that you get, these are tagged by users. Like Think Stack Overflow it's the same
basic deal where you have two questions that could be phrased very, very differently. Might not even
clearly overlap from like a textual similarity point of view. Like so imagine two very different
constructions that are in the end getting to the same point. It's a lot easier to like extract a
topic in a single vector from that and say if these topics are similar than it is to try to align
structures from sentences that are expressed in very different ways and because these are questions
on a user question site that that's my guess for why you see this behavior.

</turn>


<turn speaker="Wei Xu" timestamp="32:28">

Yeah and also wasn't worth pointing out is that Quora is one of the largest data set but comparably
those like a data set that SSE perform worse are paraphrase dataset or the semantic textual
similarity dataset they are much smaller, they are like a more like a magnitude smaller. So I think
the sentence embedding model definitely have the advantage to take a larger amount of data as well
as the interaction. It's also have an advantage on those dataset that they share a lot of word in
common, if they shared a lot of word in common or like a, the longest sequence shared in common is
like really long. And then it's like the embedding of course if you based on like multi-layer LSTM,
they will have very similar embedding come out. And I did identify those paraphrase a lot better. So
that does seem to perform better on those simpler or larger dataset.

</turn>


<turn speaker="Wuwei Lan" timestamp="33:26">

Yeah. One thing I want to mention is that the interaction based model can capture this very
complicated, interact patterns, the intact relationships between two sentences. However, Quora we
know it has some problem about the labels or the text. And what that means for the next few
examplesin Quora, the two sentences they're not, they're not the very semantically related. So
that's means the pairsin Quora. If we take the next three examples, that means a two sentences is
very clearly separate in semantical space. That's why the interaction doesn't help in this kind of
situation.

</turn>


<turn speaker="Waleed Ammar" timestamp="34:13">

All right. Any last thoughts on this paper paper before we conclude? I really think this type of
analysis is very important and it's sad that we don't see more of this type of work. So thank you
for doing it.

</turn>


<turn speaker="Wei Xu" timestamp="34:30">

Oh yeah. I think I actually have to thank Leon and Emily who are the program chairs of COLING I
think this year they particularly specify several type of papers out like this kind of reproducing
the existing result as well as survey paper and opinion position paper. So they actually, the COLING
this year made a separate categories and also this clear separation of different type of paper not
only encouraged a submission like ours as well as make reviewers to understand that different types
of paper have different values. So it wouldn't have a misunderstood by some reviewers or criticize a
to harshly on those kind of a little bit more different or like a not the most common way to write a
technical paper. So I think that that really kind of credit to Leon and Emily for this choice.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:27">

Yeah, that's a good point. We should, maybe we should try to generally like make this a consistent
track in other conferences as well.

</turn>


<turn speaker="Wei Xu" timestamp="35:36">

I think by, having this kind of papers in the conference and more and more people recognize the
value of this kind of paper. You're not like just incremental improving on some very complicated
models and be the state of art. That's only one as one way to write a paper, but there's other ways
to make a valuable contribution to the field.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:56">

Excellent. Thank you very much for joining us today.

</turn>


<turn speaker="Wei Xu" timestamp="35:59">

Thank you for having us.

</turn>


<turn speaker="Wuwei Lan" timestamp="36:01">

Thank you.

</turn>
