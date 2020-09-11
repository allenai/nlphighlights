---
title: "Cross-Sentence N-ary Relation Extraction with Graph LSTMs, with Nanyun (Violet) Peng"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["New Speaker","Nanyun Peng"]
number: 041
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


<Turn speaker="Waleed Ammar" timestamp="00:12">

Today our guest is Nanyun (Violet) Peng. She just graduated from the Johns Hopkins University with a
PhD in computer science and now joining ISI at the university of Southern California as a research
scientist. We're going to talk about her recent paper in TACL titled Cross-Sentence N-ary Relation
Extraction with Graph LSTMs. It's co-authored with Hoifung Poon, Chris Quirck, Kristina Toutanova,
and Wen-tau Yih. So could you tell us just a brief introduction about this paper. What's the main
motivation for working on cross-sentence N=ary relation extraction?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="00:56">

Sure. Yeah. Thank you for having me here. So basically that summer we wanted to work on some row
relation extraction on the biomedical domain. And there are natural demand and they want to extract
drug gene and mutation interactions so that it can help the precision medicine for cancer research.
So people actually manually created these data set and they took years to do it and they only have a
hundred or merely a thousand entries of this interaction. They also have some online community that
people can comment under those facts so they can collect it to share with everyone. So we as
computer scientists, we think, okay, well why cannot we automate this process? So the origin of
motivation was we want to extract a number of relations more than two entities involved and when we
consider those a number of relations. It's more natural that they will appear across sentance
boundary because it's hard to mention all of the things just in one sentence. And also it's the
structure of how they right the papers. They usually have the things spread through the papers.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:31">

So did people, the researchers who work on relations extraction try to address this problem extract
N-ary relations before or is this the first time someone tried to do it?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="02:42">

I would say specifically for relation extraction. The, I think we are very pioneer on N-ary relation
and Chris Quirk, they had a previous paper on cross-sentence relation extraction. I think they also
pioneer on that, but on a more, how to say, on a higher level the whole information extraction
community for that event extraction, it's usually a cross-sentence and would involve more than two
entities at some of the event. So there are those works. But for relation extraction specifically, I
think we're pioneer on the N-ary cross-sentence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:27">

So I'm very interested in like your perspective on how relation extraction, especially N-ary
relation extraction compares to event extraction. The problems seem to be two perspectives for the
same data. So are you, do you have any insights on how do we create a mental map of the difference
between these two problems?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="03:49">

That's a good question. I think it's even for me like conceptually even there is a more grand thing
that it will involve more things. But the relation is so more of the relation between the entitites.
So event is more like there is a central thing happening. So in a lot of event extraction research,
people do slot filling that makes a lot of things for me because I've felt it's event driven and
then there will be things involved. But relation is more like we're trying to extract the relations
between the entities. So from the goal, from the perspective of the research goal and the
granularity I think relation extraction is a finer granularity.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:41">

Right. So yeah. So in event extraction, people often talk about trigger words and that's like, it's
a special thing in the event but in the relation extraction all the entities involved are equally
important I think.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="04:54">

Yes. That's my perspective.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:57">

Yeah, I don't know that trigger words are too important because a trigger word to me evokes
something like FrameNet frame semantics and frames are N-ary relations. To me the difference is more
that, at least as I've seen people researching event extraction and talk about it, an event is
something that is located in time. And so it has, like it's H specific temporal event and you're
trying to find the arguments like the participants in this specific temporal event. Whereas
relations are things that are not located in time. It's just this gene interacts with this drug or
sorry this drug affects this mutation on this gene in a particular way. And that's true no matter
when it's, we're not trying to find out some temporarily located thing. It's just there is a
relationship between these N things and we want to find that relationship.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:51">

So this is very interesting because I feel like the the temporal aspect of event extraction that
you're talking about doesn't seem to be critical for the definition of the event extraction problem.
It so happened that when people were extracting datasets, collecting datasets, for event extraction,
this is the kind of data they were looking for I don't feel that there's an inherent data
representation distinction here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:25">

Yeah, I agree with you. I'm, the caveat here is that I haven't really extensively studied either of
these things. I've just seen talks by these people. And it seems like you asked at the beginning
what the perspective is on these different problems and I think the perspective is event extraction.
People think of these more in terms of temporally located things and relation extraction folks think
of this more as a relationship between N things.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:49">

Right. Makes sense.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:52">

All right. So in the paper you described the graph LSTMs and the document graph. Would you like to
explain what these are, why they're important for this problem?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="07:03">

Yes. So basically as I said, we want, we're trying to approach the problem of N-ary relation
extraction and cross-sentence N-ary relation extraction. So we faced several problems, one thing is
we are across-sentence boundary and we need a way to capture very long rent dependencies. And also
we're currently have an N-ary relation and previous research when they consider binary relations,
they usually use a shortest path between the two entitites to design feature or design neural
architecture that appear to be very important, very informative thing. And we want to incorporate
those as well. So basically we want to simultaneously incorporate different types of dependencies
and we want to capture the long distant dependencies. So that motivated us to design a graph, LSTM
that contains all of that information in one graph.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:15">

So how would you avoid the graph LSTM if we don't have the graph LSTM you would still be able to
design an encoder for the three entities that are involved or more but just by treating them as a
linear sequence. Is this one of the one of the models that you compare to?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="08:41">

You mean the shortest dependencies pass between the pair-wise entities?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:46">

Right.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="08:47">

Yeah, I think we compared it with weight extracted features between the pair-wise shortest path.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:01">

Okay. So, is the motivation that we would like to be able to extract direct relations between the
pairs that are not continuous? Is that why we need a graph LSTM?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="09:13">

Oh, no, I think one thing is we want to have something general. So the for this one we considered
three entities. But we can also easily imagine there will be need for more than three entities. So
you can essentially do all the engineer trick and also when it, the end goes to a larger, it's also
involving some engineered the design on how you do the pair-wise, how you combine the pair-wise
features. So there will be a lot of things, but we want to keep things simple and basically cast out
to the other scenario as well.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:56">

I think it'd be easier to get at Waleed's question if you first explained what the n-ary model
structure is for when you're trying to predict an n-ary relation and then we can talk about the
difference.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="10:07">

Okay. Yeah. So basically we want to have a model that we'll be able to incorporate different type of
dependencies and long term dependency. So we first do pre-processing to the input document. We got
all the syntactic dependencies and the discourse dependencies and a co-ref relations between the
sentences, and we also have the original chain structure, we call it time sequence structure, like
the original order. So we have all this information in one graph and we're trying to design a
representation learner based on this graph and we'll be able to incorporate all the arcs, the
connections in this graph. So one thing you would notify is in this graph there are cycles,
especially when you consider the other adjacent relation and then the, there world be dependency and
discourse relations.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="11:17">

There are cycles, so it's not straightforward to design some neural networks that can train on a
cyclic graph, and so basically Oh. And then after designing this representation learner. We are
trying to just use this representation learner to learn the representations for each of the entities
in a sentence. And we can view that representation as a context representation for entities and
would only use that representation as our feature to feed to a relation classification classifier to
make the final decisions.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:05">

So we assume that we already know which entities you are interested in capturing relation between?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="12:12">

What?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:13">

Do we assume that the entities in the sentence or the entities mentioned?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="12:16">

Oh yes. The entity mentioned and boundaries is already given and we use a little drawing to do this
pre-processing step.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:27">

Right. And so then the goal is given a sequence of word embeddings and some entity boundaries. We
literally just want to get a vector for each of these entities, concatenate them, pass them through
a feed forward network and classify relation. Right. And so now Waleed's question is, couldn't I
just use an LSTM for that? Why have this graph stuff?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="12:49">

Yes. So if you use a LSTM, you basically only can capture one type of dependencies at a time and you
can use several for each LSTM for one type of thing. And then you put them together.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:07">

Right? So we have the LSTM only can do like sequential information. We've had tree LSTM that can
like look at the syntax of the sentence in some sense. But your graph LSTM lets you encode also co-
reference and discourse kinds of features. Right? Is that a good description? Is there something I
missed?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="13:26">

Yes. I think this is it. And also we want something general. So you essentially can do them
separately. I think when we are comparing the baselines we, compare with a tree LSTM, we also
compare with biLSTM. So we basically take these two information and we put them together. And one
thing is we tried to include and exclude the discourse and co-ref connections. With on that, when we
excluded it the performance was actually better. That's the unfortunate thing. Yeah, that's
unfortunate. But I think one thing is we just use the pre-processing tools to do this. So the
current these course analysis and co-ref on the biomedical domain are not in the stage that they can
provide very informative information. That's our assumption. But even if we didn't use it in these
specific problem that we're approaching, the framework is flexible enough to include all of them.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:38">

And so then because you're using just the linear, the word sequence information and the tree
information, you could think of this just as like a combination of those two. Like that's what
you're getting.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="14:47">

Yes.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:48">

Interesting. Yeah. I remember some work by Sam Bowman, the SPINN paper that did a very similar thing
where you build up a tree you get a shift reduce representation of a syntax tree and you can do tree
composition at the same time as a linear chains LSTM. So it seems really similar in the end to that
kind of work. But you're right, yours is more general and could in theory incorporate a much richer
kinds of dependencies. But this, as you said earlier, leads us to a problem which is there could be
cycles in this graph. So how do you handle back propagation and descent?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="15:24">

Yeah, so I currently use a very simple method based on an observation that we can decompose the
cycles into two directed acyclic graphs by if you define a topological order this graph. And then
you put all the arcs from the left to right in one graph and for the arc from right to left in
another graph. Then you have two bags and then you, when you put these two bags together, you re-
construct the whole graph. And the current, topological order we are using is just the original
order in the original sentence order.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:16">

Does this give you the same gradient as you would get if you actually treated the cycles correctly?
Like with some kind of iterative estimation procedure?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="16:25">

No, it won't be the same, but if you use the, there are also cons for if you decompose it into
several steps because then the gradient steps you can pass will be restricted by the unstep. Right.
So I think it will be a very good study on comparing different ways to approximate a acyclic graph.
By unroll it into several steps or decompose it. Also we we're trying to compare different ways to
decompose it. So in the paper we only mentioned that we have the time sequence order. Actually I
also tried to use a tree order. So basically from the root to the leaves and then the reverse and
that didn't perform as well.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:22">

That's interesting.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:23">

Yeah. Very interesting. So if the LSTM formulation only allows you to have one preceding input. How
do you do a graph? How do you allow a node to have multiple previous nodes? In your paper you
described two methods for doing this. So two modification for the LSTM. Without getting into the
details of the math equations, would you like to give us a high level idea as to what are the
distinctions.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="17:53">

Sure. So basically when you have several proceedings, you essentially, from my perspective, you
essentially need to have several forget gate if we stay in that LSTM region. So basically if you
have several forget gate, you will be able to integrate all the information the from the proceedings
and you basically combine them.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="18:26">

Right. so do you feel like the distinction between full paramaterization and the edge type embedding
the two ways you used to extend LSTMs are worth discussing, or do you feel like to begin?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="18:41">

Yeah, I think we can discuss it a bit. So as I said for the different precedent you want to have
different forget gate and then how you parameterize those forget gate will be a problem. The current
will be like worth some discussion. So the current way we're doing it is for a type of entities, we
always share the same parameters for computing the forget gates. So when we have three types of
different arcs that we're trying to model we will have three groups of groups of parameters that we
need to learn. But actually you can think of more than three different types of arcs because if you
go into the fine-grained syntactic dependencies, there will be more than a hundred different types.
So in that way you will face a severe exploding of the parameter exploding. That's the one of the
motivation that we design, the second variation, the embedding type variation. But we find that that
didn't perform as well, as good as the previous one. And for the previous one, because it cannot
scale up to a hundred of different types, we only stay on the coarse-grained type. So the dependency
in discourse and then other adjacency.

</Turn>


<Turn speaker="Matt Gardner" timestamp="20:24">

So it looks like at a fundamental level here, what you're doing is you're summing in particular
places over your many inputs, right? Traditional LSTM has one input because you have a graph, you
have multiple possible ones and you're just coming up with a particular way of summing the
information from all of those things. Right? And you do it, you do it in the forget gate. You can
imagine trying it in several other places.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="20:47">

YES!

</Turn>


<Turn speaker="Waleed Ammar" timestamp="20:48">

Cool. So would you like to tell us about the application, the actual experiments that you ran with
this model?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="20:55">

Sure. So we apply it to the biomedical demand to extract the drug gene mutation interaction. And one
challenge we face is that we don't have any supervision, supervised manual annotated data for us to
do fully supervised learning. So we basically take, we use distant supervision and a way, take some
previous knowledge base. We're doing noise matching to see whether these facts in the knowledge base
match something in the document within a confine of several sentences and if we match it we treat it
as a positive example and others we treat them as negative examples. So this way we collected 3000
paragraphs off extracting mutation relations. And we just used this for our training. And since we
have a very small amount of training data, we're also looking to multitask learning where we
decompose the n-ary relation into binary relation. So when we're looking to extracting mutation, we
are also looking to drug gene relation and drug-mutation relation so this way we can collect more
data because when you consider binary relation, you can match more mentions from the raw data. Oh,
the raw co-reference, we're using is pubmed.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:44">

Great. So could you, could you explain what are the relation types that we're interested then in the
ternary case and also in the binary case?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="22:53">

Yes. So basically in this work way reduce the relation type to just positive relation or negative.
They have relation or do not have relation because when we were looking through the knowledge base
that people manually created. There are conflicts. So in some of the entries that these tripple have
relation of prohibit, then in another entry, those same three entities, it's says it has promote. So
these types of things usually happen. And also as a pilot study, we think it would better keep
things simple so we reduce it to binary, has relation or does not have relation. And so for these
n-ary and I think I overload the term binary. So for pair-wise relation and the triple relations we
only do the positive relation, has a relation or does not have a relation.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:03">

And I think that's actually fair for limited classes of types. So I guess cities and countries. So
I, I did my PhD looking at knowledge base completion, particularly when we have a text corpus. So
it's a very similar problem. And cities and countries really only have one relation between them.
And so all you really have to do is say are these two things related or not? And then you know what
the relation is. And for genes and mutations, that's probably also true, right? There's probably
only like, I can't think of a, I'm not a biologist so I won't speculate too much, but I think it's
fair to reduce these problems because the types are already a really strong constraint on the kinds
of relations that could even exist.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="24:50">

Yeah. so from the original database we actually get five different relation types, but we reduce it
to two.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:59">

Interesting.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:00">

I'm curious to know, so the gene drug knowledge database, that's the one you used to do the distance
supervision. Do you treat any record in this dataset as a positive example for this supervison?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="25:14">

Yes, Exactly.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:14">

You mentioned that one of the things that people that the biologists label is that the drug inhibits
or prohibits, right? These seem to be the opposite things that's we're trying to characterize.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="25:35">

Yes. But we treat both of them as has relation.

</Turn>


<Turn speaker="New Speaker" timestamp="25:41">

Okay. So could you, do you remember the top of your head? How often was it the case that you match
all three entities in the same sentence about the turnout not to have the relationship.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="25:56">

We didn't manually look through the data because we also use it for like developing, right? We train
our model and a tune our model on that dataset, so we didn't look too much into it, but we are fully
aware of this issue. That's why in addition to the automatic evaluation, like five fold cross-
validation we also do a manual evaluation by we're training this model and we have to extract all
the facts from the whole pubmed corpus and we randomly sample several instances, we randomly
actually sampled 150 instances from the extracted fact and we have people to manually evaluate
whether these entities has relations or not. And in that experiments with very if we give it a 90%
of the confident we get a 75% of accuracy.

</Turn>


<Turn speaker="Matt Gardner" timestamp="27:05">

So to be a little more explicit in these details, how do you come up with a test instance? Like, do
you run a mentioned detector entity tagger first? Like how exactly does this test set up work?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="27:20">

Oh, okay. So basically first we'll run Literome that is an entity extraction for the biomedical
domain. So we will have all the, all the candidate will be some sentences within a three sentence
window. That contains at least one drug and one gene and one mutation mention.

</Turn>


<Turn speaker="Matt Gardner" timestamp="27:50">

Okay.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="27:50">

And then we match the knowledge base. And if these three mentioned appeared in the knowledge base,
we treat it as a positive example. Others we treat them as negative examples.

</Turn>


<Turn speaker="Matt Gardner" timestamp="28:06">

Okay. So I think to Walleed's question, the key thing here is you have a window of three sentences.
So I did like the last paper of my thesis was, one of the main conclusions was that actually if I
ever see a city and a country in the same sentence, almost certainly they are related because you
would never talk about a city and a country in which that city does not appear. At least you would
almost never see this in text. So if you see these two things in text together in the same sentence,
then almost certainly they're related. Not a particularly groundbreaking revelation. But this is one
thing that I found. And so as I was reading this paper, I was thinking about this issue because if I
see a gene, a drug, and mutation in the same sentence, then almost certainly they're related, right?
But, but you have this three sentence window. And so there could be some discourse things that say
we're changing topics and that's the thing you're trying to have your classifier learn. Is that
right?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="29:08">

Yes, yes. I think then now the great way to answer your question is we actually in the manual
evaluation part, we actually try to randomly sample the sentences where there are actually drug,
gene and the mutation mentioned in the three sentences and there the precision is only less than
20%. So less than 20% of the time those things actually have relation.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:39">

Yeah. Yeah. And now that you've said that this is a three sentence window, that makes a lot of sense
because you could very easily just like to switch topics or mention, they're not actually
interacting, but they come up together within a couple of sentences.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="29:54">

Yeah, I think this is one thing. Another thing is I do look into the manual evaluation data. So in
those data we see that in some times it will mention that we have some trial on several different
drugs. So there will be several different drugs and then there would be mentioned as gene and
mutation. Then among all those drugs, a lot of them aren't about any relation. And also there are
just talking about clinical trials. That possibility would be something that's specific for the
biomedical domain.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="30:33">

Yeah, you want to solve the harder cases.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="30:36">

Yeah.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="30:37">

So would you like to give us a quick summary of the experiment results on looking at table one that
shows the cross validation accuracies and showing how the graph LSTM compares to the baseline?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="30:54">

Yes. So basically we compare the feature engineer baseline where the features include all the
syntactic, dependencies discourse. And we also do have a feature engineer to try to include and
exclude all those features and then we compare with CNN and biLSTMs and we find that LSTMs in these,
Oh, we find that all the representation learning method performed better than the feature
engineering baseline. And then LSTM performs better than the CNN and the biLSTM and Tree LSTM
performed similarly, I think Tree LSTM performed a little bit better. And the graph LSTM also
performed better than both Tree LSTM and biLSTM. Yeah. But one thing is the differences wasn't as
large as we would hope.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="32:06">

Do you remember to what extent was it important to do multitask learning or adding the pair-wise
relations?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="32:13">

Yeah, so the multi-task learning actually helped a lot. Most of the improvement came from the multi-
task learning. We basically, if I put it in number, so from the LSTM to graph LSTM, I think we got a
0.5 - 0.8% of improvement. But if we do multitask learning, we got 2 point of improvements.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:43">

Did you also use the multitask learning for the biLSTM and the other representation learning setups?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="32:53">

Yes, yes. And I see similar improvements for each.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:59">

Right. And the numbers that are reported in the table, it's with the, all of the methods use this
multitask learning does that, right.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="33:07">

I think I only tried it for biLSTM and the graph LSTM and I reported both of them in the paper.

</Turn>


<Turn speaker="Matt Gardner" timestamp="33:16">

Okay. Oh yeah, I was, I was looking at a different table you're totally right.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="33:23">

All right. Then there was one more experiment that you that you did on genetic pathways.

</Turn>


<Turn speaker="Nanyun Peng" timestamp="33:29">

Oh yes. So for that one is, it's basically just a sanity check because on that dataset there are
manually labeled dependency trees. So that's our like gold dependency. But for, for the pubmed
experiments, the dependencies are we ran a Stanford parser on it. So we are trying to compare if we
have a perfect syntactic parsing compared with the automatically generated syntactic dependencies,
which one will be better. And we find that that's right that they have a perfect dependency
syntactic dependence and analysis where we'll be better off.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="34:25">

Okay. All right. So that's all the questions I had for you on the paper. Any last comments?

</Turn>


<Turn speaker="Nanyun Peng" timestamp="34:31">

No. Thank you for having me here. And it's a great conversation with you guys.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:35">

Ya, Thanks for the discussion.

</Turn>
