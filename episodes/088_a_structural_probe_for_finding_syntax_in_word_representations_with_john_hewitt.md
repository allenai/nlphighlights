---
title: "A Structural Probe for Finding Syntax in Word Representations, with John Hewitt"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["John Hewitt","New Speaker"]
number: "088"
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
artificial intelligence. Our guest today is John Hewitt. John is a PhD students working at Stanford
University. In this episode we'll be discussing an interesting method, John recently published on
probing word embeddings for syntax. The paper is titled "A Structural Probe For Finding Syntax in
Word Representations. It's co-author Chris Manning. It will be presented at NAACL 2019 in
Minneapolis. John, welcome to the program.

</Turn>


<Turn speaker="John Hewitt" timestamp="00:34">

Hello. Thank you for welcoming me. I'm happy to be here.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:37">

So over the past few months we've seen how contextualized word representations for training language
modeling such as Elmo and Bert improve the performance on a variety of NLP tasks and the remarkable
effectiveness of these representations inspired several LMP researchers to understand what
linguistic phenomena or implicitly being learned in these models and the paper we are discussing
today, falls in this line of work. And we would like to dig a little deeper. So John, could you tell
us what type of this is you're trying to test in this probe? And how does it differ from some of the
previous hypotheses tested in other probes?

</Turn>


<Turn speaker="John Hewitt" timestamp="01:10">

Yeah, absolutely. So I think we were inspired by recent work showing that deep language model like
neural networks learn something about syntax and learn a lot of syntactic information. And so the
hypothesis that we wanted to test is that entire parse trees. So in our case dependency parse trees,
but entire parse trees are really learned implicitly through the language modeling objective. And we
wanted to test a very specific hypothesis about how that information would be encoded by the
unsupervised learner.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:39">

Right. So how, how is it different from the previous maybe, simpler tasks that have been tried in
the literature before?

</Turn>


<Turn speaker="John Hewitt" timestamp="01:46">

Yeah, great question. So I think that there's been a lot of good work on defining tasks that look
for specific types of information of syntactic information as well as tasks that say do like a CCG
super tagging, which gives you statement about, you know, you can do this labeling task and to do
the labeling task well you need information about, this syntax. And so the way that we wanted to
progress this research direction is to say all of this syntactic information writ large is
interesting. But there is also this macro distinction where maybe 10 years ago it would have been
more plausible to say I want to add dependency parse trees to my NLP model to make all the numbers
better. If dependency parse trees have all this information and disambiguate things and they're
great.

</Turn>


<Turn speaker="John Hewitt" timestamp="02:39">

And nowadays you still see some of that but you know it definitely less. And the, and the gains are
kind of modest. And so one hypothesis is that this information is actually being built. Like this
tree structure is being built softly by the unsupervised learner itself. And so these probing papers
that look for these labeling tasks just don't test the same hypothesis, you know, is the actual
hierarchical structure being built implicitly in its entirety by the unsupervised learner and really
like a global fashion. And when we get more into the details we'll talk about what that means. So
that's a broad distinction. There's a difference between syntactic information, which people have
been looking alot into and our question of, you know, are these tree hierarchies; latently, softly,
built internally into the representations and maybe that's why, it's not as necessary to add them in
a hard manner on top.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:28">

So just to clarify, I know there has been previous work on taking a constituency parse tree and
getting a probing task to see if I can recover the path from the roots to the terminal for every
word in a sentence, right? For instance, "The cat ate food", then what you would predict with your
probing task for cat would be something like, sentence, noun, phrase, noun or something like this.
Right? So you're essentially recovering complete syntax information of like, how would this word
participate in the syntax of the sentence?

</Turn>


<Turn speaker="John Hewitt" timestamp="03:59">

Is this separate from the probing tasks that would ask like what the parent and the grandparent and
the great grandparents were all a separate tasks.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:06">

So, I may be wrong a little bit on the details. If your tree is shallow, these are essentially
equivalent and you're right that if a tree is very deep. These aren't, and I guess this is also
similar to CCG super tagging, right, but what you're saying is yes people have looked at this syntax
information previously just not in a globally coherent way is that the distinction you're making?

</Turn>


<Turn speaker="John Hewitt" timestamp="04:26">

It's almost theq distinction I'm making because people have also done full constituency parsing
through a probe on top of a fixed representation before as well and then in that case clearly you're
getting the whole constituency tree out. You know the distinction there with our work is that we
want to make a very specific hypothesis about how information is encoded by the model. In
particular. A really simple unlikely one predicting all of the grandparents and great grandparents
labels I think falls more on the side of, yeah, you have a lot of information about what labels are
where and also these tasks I think tended to be, you know you'd come up with like a balanced data
set for example. Can you predict whether like this is the right label or not, which is not quite the
same as actually reconstructing the tree in the wild and then when there were tasks that
reconstructed the tree. My understanding is that the probe model on top is a bit more complex and I
think that we had something to add with the simplicity of the probe parametrization and the claims
that we get to make of about the space that the model learns and hopefully that'll be useful on top
of the already very good probing work that existed before our paper.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:32">

Great, thanks.

</Turn>


<Turn speaker="New Speaker" timestamp="05:33">

Yeah, so we enticed the listeners enough, I think about this probe. Could you tell us, how do you
actually do that?

</Turn>


<Turn speaker="John Hewitt" timestamp="05:39">

I'd be happy to. I really nice way to think about it is when you look at representing graphs we have
this nice question where we want to know if this graph of a dependency parse on every sentence
exists latently in the hidden states that the network constructs, but you can representations of
individual nodes in each graph. So if you take a vector for one node in a graph and you take an L2
distance between that vector for one node and a vector for another node, you can come up with this
representation where their distance equals the number of edges between the two nodes in the graph.
Then you can kind of reconstruct all the information of the graph from this notion. And so in
dependency parse type sense. Whenever you have two words in a governance relation, they're going to
be a distance of one.

</Turn>


<Turn speaker="John Hewitt" timestamp="06:26">

And that's you know, that's headedness that's a salient thing that people think about a lot. But
what if their distance, you know what if they're two edges away and then their distance two, if
they're three inches away, they are distance three. And so it's really hard of course to ask if this
discreet structure or graph exists in the continuous vector space that the model constructs and the
connection that we're going to make to make this a lot easier as in this concept of a distance
metric by distance metric we really mean something very precise. Right? So it has the triangle
inequality we're going to have to relax that we'll see, but it has the triangle inequality. It's
like a non negativity, it's symmetric and what we first claim is that the tree itself can be
represented, each dependency parse tree can be represented by a distance metric where every pair of
words has the distance of the number of edges between the two words in the tree, and then the vector
space also has a distance metric and that's how we're going to connect these two ideas.

</Turn>


<Turn speaker="John Hewitt" timestamp="07:16">

That's what our structural probe leverages, right? So even though one is continuous and one is
discreet, we both have distance metrics and that's what the probe looks for. We're going to ask if
we can find a parameterized distance metric on the vector space. A single one that matches all
distance metrics on every single tree on every single sentence really, really well. Hopefully this
is actually pretty simple in terms of implementation because if you just take like Euclidean
distance L2 distance, you can easily parameterize it with any positive definite in our case a
positive semi definite matrix. So you have this square matrix, a single matrix that defines which
dimensions matter more, which dimensions matter less to this distance metric. As it's a probe, you
have this supervised notion where we're going to use parse trees to try to find, in this case the
matrix in the middle or equivalently find the right distance metric that reconstruct all the parse
tree distances, over the course of the whole, parse corpus and as best as possible.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:15">

This distance metrics that you define, you say for any dependency parse tree, I can talk about
distances between nodes between them, but if all I do is recover the distances, I don't actually
recover the tree. Right.

</Turn>


<Turn speaker="John Hewitt" timestamp="08:28">

Um, you recover the tree up to the, the edge directions so you don't get the edge directions out.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:34">

Or edge labels.

</Turn>


<Turn speaker="John Hewitt" timestamp="08:35">

Uh, yes. Yeah, we completely, and this is something that you could definitely have you noted our
paper about, we don't even mention edge labels anywhere in the paper, which are very important in
some sense. But in another asking the structural question I think was the contribution there. And I
think the asking the labeling question kind of is just a labeling question which we've done before.
And so hopefully someone will do that but we haven't a great, great point. Great Point.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:03">

So how do you learn the parameters of the probe? What's your objective?

</Turn>


<Turn speaker="John Hewitt" timestamp="09:07">

Yeah, so you can think of them as this positive semi definite matrix. You can also think of taking
each individual word representation and putting it through a linear transformation. It ends up in a
new space now, right? And so you linearly transform every word representation in every sentence and
then you take there squared l two distance between all pairs of hidden vectors. My sentence is "The
chef who ran to the store without a food," you take the vector for "chef" and you take the vector
for "was" you take the squared L2 distance and that's going to be some value. And their actual
distance in the parse tree is one. And all we do is define a loss. That's just the L1 loss on the
residual of, of the difference. So it's just saying, you know, I want these two to be very close.

</Turn>


<Turn speaker="John Hewitt" timestamp="09:52">

We're gonna use L1 loss because, um, I don't know, honestly, it's somewhat arbitrary. People can try
their losses if they wanna do it. This one seemed to work and has the intuition that maybe some
edges are not going to predict very well at all and we're just gonna let them be kind of far off,
you don't want a squared loss where we're get really penalized for, for huge mistakes. Yeah. So for
every pair of words, in every sentence in the training corpus, we kick the predicted distance under
our probe with this parametrization of this matrix in the middle. And we take the difference between
that predicted distance and the true tree distance and we just diff them and in back prop the loss.
And so in terms of deep learning, it's actually probably the least interesting, you know, model to
come out at NAACL of this year. But, uh, I think that's part of the beauty of it. Hopefully.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:41">

So you take all the pairs of words in the same sentence and apply this lost words. I'd wonder if you
have tried also other things like try to optimize the model so that the longer distances tend to
give you larger values without necessarily matching exactly the normal of the tree.

</Turn>


<Turn speaker="John Hewitt" timestamp="10:59">

Yeah, that's a good point. And it actually brings up a whole potential family of ways to make the
parsing numbers better when doing these methods. So one thing that I tried briefly for example, is
to have a distortion loss instead of the L1 loss. So this means that you, you know, after taking
this, this difference between the predicted and the true distances, you then divide by the true
distance, right? To give the intuition that like if I have this error on this 20 length dependency
path, I don't really care that it's 20 length. I just care that it's far and I'm just going to down
weight that. But like I really want the things that are distance one to be distance one and your the
numbers get better. Right? But for the sake of this geometric argument that we want to make, we just
decided not to do it for this paper. We thought it made the analysis and the claims a bit stronger.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:46">

Yeah, the intuition of the work is pretty elegant what you're trying to do it is very simple, you
have a metric defined on the tree, a metric defined on the metric space, find a way to optimize a
simple normal linear transformation on the vector space so that they match. So what kind of
representations have you actually tried to use this for?

</Turn>


<Turn speaker="John Hewitt" timestamp="12:07">

Okay, well first thing, thank you, I appreciate the evaluation. And so the hypotheses that we
presented in the paper we developed when working with Elmo in particular, which, and you know all
the layers of Elmo. And so it's a bi-directional LSTM and actually only later did we without
changing these hypotheses at all, then apply them also to the hidden representations that Bert
constructs. Because one argument could be that this hypothesis is kind of architecture specific and
that like you know, some other metric or is some bizarre result of like the dynamics of LSTMs for
example, that maybe build up your incremental state and the way that attention based models don't do
and based on the fact that the Bert numbers are better in the same way that maybe Bert downstream
numbers are better than Elmo downstream numbers. We were pretty happy with how the hypothesis held
up on the Bert representations, but those are really the only two that we've done any extensive
testing on. I think that testing these on one directional actual real quote unquote language models
would be a great next step, for example.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="13:14">

You also use some baselines. I think it's important to talk about the baselines because it's not
like you can throw any arbitrary vector representation for the words and structure will come out of
it if you optimize this transformation enough.

</Turn>


<Turn speaker="John Hewitt" timestamp="13:27">

Yeah, that, so that's, that's a really good point and it's important in probing papers, right? That
you can get some really nice looking numbers using probes and what do those numbers mean is
something that I think the whole community needs to keep thinking more and more about. And so as
baselines, right, we wanted a couple of actually pretty strong behaviors for our baselines. The
first is that if you actually take uncontextualized word representations, you want to not be able to
parse at all from them. Just because you can train a parser on top of the linear sequence of an
uncontextualized word representations does not mean that the uncontextualized word representations
themselves. Actually quote unquote, "learned to parse." And so it's nice result that if you tried to
apply our structural probe on, the character CNNs of Elmo with the parse distance tasks, you really
just don't get trees out at all.

</Turn>


<Turn speaker="John Hewitt" timestamp="14:14">

In fact, what you see qualitatively is that most words just connect right to the root, which makes
some sense. We also have a couple of baseline contextualization methods, so we will say, what If you
have some information about your local context, but clearly there's no information in the model
that's building that contextualization to actually parse. So we take this weighted average of the
whole sentence that's focused on the word that you care about, or we'll take a random projections of
biLSTM with untrained weights, which has been shown to be really strong baseline. We said we don't
want to be able to get parses out of those two either. And I'd say to a pretty good extent, you're
really not able get a whole lot of information out of them. Most of what you get out of both of
these baselines is deviations from this quote unquote linear hypothesis. So like a, you know, a
syntactic null hypothesis in English is that you just have the linear sequence of words from left to
right. And that's all the latent structure there is. And that's not quite what we get out of the
probes on the baselines. You do get some kind of fitting to some local nonlinearities, but we were
pretty happy that you couldn't get much more than that out of them.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:18">

I guess. Thinking about your Elmo, CNN, you said you can't get like any structure out, which
obviously is understandable, the numbers aren't zero though. You said it's mostly connecting to the
roots. I wonder like clearly you should be able to say determiners attached to nouns. Right? And if
you combine that with the simple linear assumption like it give positional information plus a
character you should be able to get at least local stuff. Right? Does this make sense?

</Turn>


<Turn speaker="John Hewitt" timestamp="15:50">

Totally makes sense. So I think that if you took some combination of linear information plus
uncontextualized representations, you'd be able to get some reasonable numbers. But if you look at
the numbers for the, what we call proj zero or the random bylaws cam on the linear projections,
maybe an uncharitable but reasonable way of looking at that, it's actually, the numbers are pretty
good, right? So like I said, a minute ago that they were bad and I actually do believe that, but if
you wanted to say they were good, you could and I wouldn't be able to say no, absolutely not.
They're terrible. Like they're not, they're not awful. And if you look at the examples that we
present, or we present a parse tree for each model, for a single sentence, you actually see exactly
what you're saying. I think. So I expect if we had some ad hoc combination of the character CNNs and
linearity, we'd get something like that, but it'd be at least the baseline we didn't run.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:40">

Yeah. Yeah. And that's, that's totally fine. I'm just trying to unpack the baseline results a little
bit. So this what you call proj zero, like the name confused me at first, but it's just like
learning and learning and contextualize it right on the, the tasks specific data.

</Turn>


<Turn speaker="John Hewitt" timestamp="16:53">

Oh No, the, the BiLSTM conceptualizer is random weights completely untrained. We just trained the
structural probe on top of that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:00">

I didn't realize that at all. I read the whole paper and thought you were fine tuning the
contextualizer. Okay.

</Turn>


<Turn speaker="John Hewitt" timestamp="17:05">

No, I expect we could do very well if we did that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:08">

That ould be a really interesting additional baseline, right? Where I'm seeing how much is the pre-
training giving me versus what I could have done just with this task specific data. So does this
make sense?

</Turn>


<Turn speaker="John Hewitt" timestamp="17:19">

I kind of disagree because you have so much capacity in a biLSTM. Like if you have a biLSTM plus,
you know, biFN layer, for example, on top of unconventional word embeddings you get epsilon from
state of the art, right? And so biLSTM plus, you know, distance metric, it's actually a biFN layer
with different assumptions. And so as opposed to a baseline, I'd actually consider that in oracle

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:41">

An oracle on. But you're doing it on held out data.

</Turn>


<Turn speaker="John Hewitt" timestamp="17:44">

Yeah. So like I don't expect that our structural probes could possibly do better than if you also
trained BiLSTM just for, because like in when we're doing our structural probes, we work, right? We
don't fine tune the Elmo BiLSTM. Now if you were to find tune the Elmo biLSTM and the structural
probe on top, then I'd say that's a reasonable comparison. But you get so much out of having this
biLSTM layer that you're training with the supervision of the parsing that you just can't get out of
this one little, positive semi definite matrix that you're using on everything else. I just not
quite sure what the comparison would tell us. I think the numbers would be very,

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:16">

Yeah, that's totally fair. I guess I was trying to get on a different question there then your paper
is trying to answer and this is like how much syntax do you learn from pre-training? Compared to
what you could do, with like a state of the art kind of person.

</Turn>


<Turn speaker="John Hewitt" timestamp="18:29">

Yeah, I think that what is potentially extractable in total from the model is also a great question,
which I think also the other probing papers have done a lot, have done a really good job of asking.
It's like if you just tried your hardest to get all of this syntax information out of Elmo and what
could you do and how does that compare to just taking the character CNNs and putting them through
biLSTM. I mean, a great recent example is, Tenney et al. at ICLR 2019, which has this, I think
that's the right one. Which has a great comparison of how can we get some really good information
out of these models as well as Nelson Liu's NAACL paper. So everyone should read those two too they
ask very different questions.

</Turn>


<Turn speaker="New Speaker" timestamp="19:12">

Right? So we didn't really talk about the evaluation. How do you evaluate after you apply the
boundaries of your probe, what numbers do you report?

</Turn>


<Turn speaker="John Hewitt" timestamp="19:19">

Yes. So this is a great question and I would love pushback from the community on this. Maybe people
shouldn't request pushback. I'll tell you what we did and then you know why it makes some sense and
why, why maybe there can be more, more work there. So what we didn't want to do is report some kind
of average error on the distance prediction. And so if you look at this truly as a distance
recreation task and you say that I want to recreate this distance metric because it just the
distance metric has all the information in young directed tree, then really the scaler numbers of
the distances don't matter. What matters is that words that are far are far and words that are close
are close. And the Spearman correlation exactly operationalizes this intuition that you want close
things close and far things far.

</Turn>


<Turn speaker="John Hewitt" timestamp="20:02">

And if you have this perfect notion of close things close and far things far, you actually perfectly
reconstruct the tree, even if all of the individual scaler distances aren't exactly the same. Does
that make sense?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="20:12">

Yeah, it does.

</Turn>


<Turn speaker="John Hewitt" timestamp="20:12">

So we have this metric where we take sentences of a range of lengths and we compute the average
Spearman correlation for each word in each sentence to say are the words that are supposed to be far
farther than the words that are supposed to be close. And so that's this, you can call it, it's this
metric that hasn't shown up in other places, but it's useful for thinking about how well are the
distance metrics recreating the true distance metrics and to make things a little bit more concrete
and interpretable, we wanted to actually pull a tree out of the distance metrics somehow.

</Turn>


<Turn speaker="John Hewitt" timestamp="20:43">

And here's where the decisions become somewhat arbitrary, right? If you take the gold distance
metric and you take the minimum spanning tree on it, you just get the true tree back really easily
because you connect all of the words that are distance one in your minimum spanning tree and then
you have a tree and you don't even look at any of the other distances, right? So you have like n
squared distances and you're constructing your minimum spanning tree using some first year, prim
algorithm or something, and as soon as you're done walking through all of the pairs of words that
are distance one, you have a connected tree and you're done. And so if you really did a good job
constructing the tree you could just do the same thing, you could take a minimum spanning tree and
get a tree out.

</Turn>


<Turn speaker="John Hewitt" timestamp="21:22">

So that's what we do. So on the predicted distance metrics, we take a minimum spanning tree and we
just call that the tree that the distance metric predicted. Now another thing you could do for
example, is define an integer linear program that assigned word connections while minimally
violating all pairs of distances in all n squared relationships according to the predicted distance
metrics. So you definitely could do that. And it just seemed like this one worked well enough and
other people can try that if they want. So yeah, that's, that's how we do it. So once you have the
true tree and the predicted tree, we compute this analog of the unlabeled attachment score, which we
call the undirected unlabeled attachment score. Because we care about the connections between words
for this task and not so much the ordering of them.

</Turn>


<Turn speaker="John Hewitt" timestamp="22:11">

So it's just because we have a guaranteed and N minus one edges in the tree it's just the percent of
edges that were correct. Another thing though, in the evaluation that I should bring up is that this
idea that like the distance metric doesn't actually reconstruct the tree edge directions. So the
dependency parses are rooted trees. They're rooted at the root of the sentence and there are
directions to the edges and the governance relations and we have pretty much exactly the same probe
to try to reconstruct the edge directions as we do to reconstruct the actual tree itself. So if you
would like to hear more about that, I can talk more about it. Otherwise people can read the paper.
So I'll, I'll leave it up to you to you guys.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:47">

Oh, well I think it's an important addition. If you want to reconstruct the actual tree, we need a
way to do this and to find the directionality. Could you, yeah. Could you just tell us how does this
relate to the tree norm? What do you mean by that?

</Turn>


<Turn speaker="John Hewitt" timestamp="22:58">

Yeah, of course. And so tree norm actually itself is this tree depth notion we call the number of
edges in the dependency parse tree between the root and the word that you care about. So the depth
of the root is zero and the depth of, any word is the, the path length between that word and the
root. Similar notions have been used in other papers. So what you can cram into a single vector
paper, right? To find the maximum tree depth of a sentence and see if your encoding models could
classify what bucket of maximum tree depth things ended up in. And there is another paper NAACL this
year that takes a more neurosciencey take on probing and tries to determine if you can classify
again how many open constituents there are for any given word, right?

</Turn>


<Turn speaker="John Hewitt" timestamp="23:42">

So the way that we connect to our setup is to say if the trees are defined by a distance metric,
then the edge directions themselves, like it's a nice directed tree, like a dependency tree. Any
rooted trees, a nice directed tree, all the edges go in a reasonable directions and you're directed
in some sense anyway. But the edge directions are defined in some sense by this total order, which
is the depth in the tree. So if you have two words that are connected by an edge, the word that is
deeper in the tree is going to have the edge coming in towards it. And what constructs the nice
total order on a vector space? Well, any norm constructs, the total order and a vector space and you
can order all vectors in the vector space by the scalar value of the norm.

</Turn>


<Turn speaker="John Hewitt" timestamp="24:24">

And so if there is, you know, a corresponding notion of distance in a tree means you know, Euclidean
distance in some sense in the vector space, then maybe the norm of the vector in some space actually
corresponds to this tree depth norm. And so we actually use exactly the same structural probes set
up to try to predict for every word in every sentence, this scalar regression type depth in the
tree. And again, we just tried to find the inner product under which these tree depths are
reconstructed best. So it's like a quadratic form in each individual word representation. You can
kind of think of it as the structural probe itself defines a whole bunch of vectors that kind of
describe what distance, what kind of depth in the tree means. And each word representation is kind
of compared to each of these vectors.

</Turn>


<Turn speaker="John Hewitt" timestamp="25:11">

And that's how you get this nice scalar ranking. And so from an evaluation point of view, right
independently for every word and every sentence, there's this depth prediction. So you put each word
representation through a norm, sorry, through the same norm. And then you get this independent
scalar prediction and then we compare here again the Spearman correlation are the deep things deep
in the shallow things shallow. That's what we call the norm Spearman and NR cable one and then we
have this other loose metric for intuition sake. Which we call the root percent, which is you know
what for what percent of sentences is the root word predicted to be the least deep. Just to give
people a more interpretable but less cohesive intuition for how well these models are doing cause
you really should have the root near the top of the tree hopefuly.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:57">

I felt like I was really excited about the structure problem because it gives us a way of actually
constructing the full tree minus the labels and I was a little disappointed the paper didn't report
results on just like unlabeled attachement score with the directionality. So I wonder if you have
any thoughts on like, why, why not?

</Turn>


<Turn speaker="John Hewitt" timestamp="26:15">

That's a great point and I'm glad you brought it up. We did not in part because each of these two
phenomena are interesting by themselves. The fact that you're able to find these two, and I think
that to try to evaluate them both could do some smart things about maybe defining a single norm for
a single inner product, for example. That gets you both, all of the parts, depths and all the parts
distances or you could predict them both separately and then just define the undirected tree and
then put all the edge directions on them. I mean, I think that the honest truth is that with the
amount of time and resources I had naive ways of doing that would just probably underestimate the
quality of the individual predictions themselves or like would look a lot worse to be totally
honest. And the individual predictions themselves without a little bit more engineering.

</Turn>


<Turn speaker="John Hewitt" timestamp="27:00">

So like for example, when you're trying to define the edge directions once you already have the, so
the undirected edges, right? You could just pick the tree up by the root, right, with the root
prediction thing and then have all the edges fall out. Or you can on a pairwise level predicts for
every pair of words which are for every, you know, worked pair of words in an editor relationship,
which one is higher, which one is lower or you do some combination, I don't know. They all seem
plausible. They're all consistent with the method as it was a short paper, we kind of decided like,
Yep, that's, that's going to be good and someone's going to do it and it's not going to be us.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:34">

Yeah, that's fair. That's fair. Yeah. We need to keep publishing and. Right. So what I'm hearing is
you don't know the results of such an experiments yet because you haven't done it.

</Turn>


<Turn speaker="John Hewitt" timestamp="27:43">

I actually do not.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:45">

Okay, cool. You mentioned some of the results, but I wonder if there are any specific results you
wanted to highlight.

</Turn>


<Turn speaker="John Hewitt" timestamp="27:50">

Yeah, absolutely. So the first thing is that I'm really happy that none of our reviewers said, wow,
these parsing results are nowhere near a state of the art. Um, you know, strong reject parsers are
better than this because the numbers really are just not what we expect from supervise parsing and I
I'm glad that the community seems to be okay with that. But looking at some of the, like there are
two results in the distance metric, in the distance probe that I would point people at. One is the
actual minimum spanning tree. Tree reconstructions some in the paper that are pretty interesting
where you see this nice nested structure appearing and some long distance dependencies and a lot of
things wrong also obviously but non-linearity where you would like to see it. And then a lot of
mistakes happen in deciding attachments that you may or may not believe in.

</Turn>


<Turn speaker="John Hewitt" timestamp="28:42">

Obviously there are also mistakes happening and maybe more important things as well. But you know
the, the extent to which this simple minimum spanning tree and all these predicted independently
predicted distance metrics. I mean sorry, distance values reconstruct the tree. I think we were
pretty surprised by, but then I would also want to point people at in the papers figure nine when we
call these distance matrices, the actual all n squared pairs of distances which show you this really
nice notion of global structure. And I think that's one of the things we get out of our probe that
you wouldn't get if you were just probing for, for example headedness so totally reasonable thing to
do would be to have, you know, a bilinear probe that tried to predict whether our pair of words was
headed or not or was in a headedness relationship or not.

</Turn>


<Turn speaker="John Hewitt" timestamp="29:28">

And actually our viewers really rightfully pointed out this would be a pretty reasonable thing to
do. And it's actually a lot easier of a task to predict zero one headedness compared to like know
that you are 13 edges away from this other word somewhere in the sentence. But what you end up
seeing is that there is, this makes a claim about this, this global structure. So words tend to
actually know that they're far away constituents. Even though the headedness relationships don't
immediately tell you that and this means this information is directly available for every pair of of
word representations.You don't need to first construct the tree out of the hidden representations
and then know what's close and what's far. Every pair of vectors has some information about how
close and how far they are.

</Turn>


<Turn speaker="John Hewitt" timestamp="30:12">

So these are these predicted parse distance versus the gold parse distance, matrices. I think those
are pretty fun and something you wouldn't have gotten out of other probes. In terms of the parse
depth, the root percent prediction accuracy is relatively good and the graphs that we have, I really
hope that people do some interesting analyses of, of where these models agree in differ. It seems
maybe at a cursory glance that Elmo, for example, seems to like to increment and detriment parse
steps in more of a choppy way than Bert, which you could hand wave a whole bunch and say something,
something recurrent something, something hidden state dynamics. Whereas attention is doing this oft
notion. I don't know. It had these nice potential qualitative things that could bring up interesting
thoughts in your head. And I hope thats one of the things people take away from this is,you have
some numbers, the numbers are good enough to say that. Yeah, there's clearly some parse trees
somewhere if you've looked in this way. Um, but also it might give people ways to keep looking in
more interesting ways into what decisions these models are making.

</Turn>


<Turn speaker="Matt Gardner" timestamp="31:24">

That's really interesting. I have a couple of maybe controversial questions. The first one is, could
you use this to say evaluate theories of syntax? Just to be clear on what I mean, what you've shown
is that that models that are estimated based off of some huge pile of texts trying to predict the
next word or fill in missing words or cover, something that's very close to the notion of syntax and
you could say, without getting any syntax at all and you could imagine or hypothesized that this is
an alternative way of discovering syntactic theory or something like this. Like certainly you want
to be careful that this is definitely a controversial kind of thing, but could we someday use these
kinds of models to evaluate syntactic theories?

</Turn>


<Turn speaker="John Hewitt" timestamp="32:07">

I think that I have an anecdote that hopefully will express what I believe about that statement
instead. So if you try to find linear structure in these models, right, just like the linear chain
graph, use a structural probe to try to find the linear chain graph. We had some really early
experiments where we tried that first and actually it turns out you do a pretty good job of
reconstructing the linear chain graph because Bert and Elmo are both just given the linear chain.
Now we only tried this on on some other models.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:37">

Wait, just to be clear, you mean that essentially the vectors are encoding positional information.

</Turn>


<Turn speaker="John Hewitt" timestamp="32:44">

Yeah,

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:44">

that's what you're saying.

</Turn>


<Turn speaker="John Hewitt" timestamp="32:45">

Exactly. Exactly.

</Turn>


<Turn speaker="John Hewitt" timestamp="32:46">

And, and so we tried this for example, for like a, a simple one directional LSTM that was not
trained on a whole lot of data. And yeah you don't predict the exact scalar values very well, but
you could kind of the rough, like if you take the spearman correlation, it's pretty good. And that's
in some sense because it's a really easy task and the information is explicitly given to both modles
like to these models. And so if you were to try to use this as a representation of syntactic theory,
you'd be like, look, you know, it does best at predicting linear chains. So clearly linearity is
what is human syntax is. And that's just not what we want to take out of that. So I would be very
cautious in making that kind of claim cause you could just like, you know, so, so one, one example
that's been brought up is like you could train on standard dependencies and then evaluate on
universal dependencies or the other way around or see which one, which of the two formalism, which
are just, you know, slightly different in certain ways is better captured by these models but you
know as one is one easier than the other for them like this.

</Turn>


<Turn speaker="John Hewitt" timestamp="33:45">

There's so many confounding factors and something that I think is not spoken of enough yet but
hopefully will be, is this idea that like the probes can pick up on things that are maybe not, I
don't know, not every single point of accuracy that the probe picks up on is indicative of some
clear information that the model has constructed. And you can see that because you get these non-
zero accuracies on the baselines for example. And so I'd just be worried that if we saw three or
four point difference between our two syntactic theories of stating what that meant writ large and
angering a bunch of linguists, which is something I tried to avoid doing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:26">

Good. Yeah, I think that's a good answer to the question in the, and I agree with you and one
important point here is that this probe is not unsupervised.

</Turn>


<Turn speaker="John Hewitt" timestamp="34:35">

It is not,

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:36">

You're not, recovering trees in a totally unsupervised way. You're supervising the probe and so
you're saying, how well can I recover this particular syntactic theory from the representations that
I learned, which actually isn't making any statement at all about what underlying structure the
model is actually using in some sense, right? It's just saying is this stuff that it has in there
similar or recoverable to this representation that I'm injecting.

</Turn>


<Turn speaker="John Hewitt" timestamp="35:01">

I agree. So it says, is the information necessary for reconstructing these distances present in this
linearly decodable way globally, in all sentences and all word representations. But if the quote
unquote true oracle syntactic representation of Bert can be linearly transformed into one of our
theories that we're trying to pull out of it. We have no way of knowing, right? Cause we have this
on your transformation that we are supervising. One thing that I think is actually a potential boon
to people who want to analyze these things is taking really low rank approximations or really low
ranked liners transformations, for the probe where you go from this thousand dimensional Elmo or
Bert space down into say 30 or 60 dimensions. So in our paper we show that linear transformation
really only needs to send you like a 60 dimensional space.

</Turn>


<Turn speaker="John Hewitt" timestamp="35:50">

Looking at what each of the rows actually this matrix say. And so you know, I've tried to look at
these to some extent and so saying like, oh look, you know this row might actually correspond to
this syntactic distinction that said that puts all the words on one side of the noun subject on one
side and then all the words on the other side of the noun subject on the other side. That's not a
statement I can back up, but it's something that I thought, oh that would be cool. And you know,
looked at that and said, looked at the data a little bit and said, oh maybe right. And so like there
is definitely insights I think you can get, but I would say it stopps short of being able to
evaluate syntactic theory.

</Turn>


<Turn speaker="Matt Gardner" timestamp="36:26">

Yeah. Fair enough. My second perhaps controversial question you've shown pretty conclusively that we
can recover or that Elmo and Bert, these pre-trained representations learn some notion of syntax.
What does this say about the relevance of what we used to call core NLP for future NLP systems? Like
do we still need to worry about these tasks at all, what do you think?

</Turn>


<Turn speaker="John Hewitt" timestamp="36:47">

Oh, I think that's a great question. So I think that what I like about this work is this
wholedichotomy of like, do we need more data, we have these structuralist models that are trained
off of a lot of data or do we like throw core NLP at it? And we get our dependency parses and we get
a bunch of rich features, then we put them in some feature combination. Right. One thing that is
clear to me though, I need to quantify it is that these emergent properties as syntax really appear
when you have the world's data, when you have so much data. So it seems like, and I'm hoping to be
able to evaluate this sometime soon in the future. If you have not the Internet of data, then these
emergent properties of syntax just really don't happen.

</Turn>


<Turn speaker="John Hewitt" timestamp="37:29">

And I think a hot take of this paper right, is that it's actually a claim that syntax is important
because to cash the gradient descent, if given enough data and enough expressive, it actually finds
some notion that's in times, again, that's a hot take. It's not backed up by the paper. Right. But
like the fact that you find this structure in Bert says that it'll find some notion of it if it's
given enough capacity. And so when you don't have this much data, when you don't have this much
compute and you don't have this much expensive, it just really like almost every domain and language
and task on earth if you ask me if there's about 7,000 languages on earth. We don't have core NLP
for all those languages. But I think that there's this, there's this notion in which hard syntactic
structures actually defining the whole dependency parse and saying like, ah, throw the dependency
parse at it.

</Turn>


<Turn speaker="John Hewitt" timestamp="38:19">

I can't say what the future for that will be, but I do think that it's reasonable that we might be
able to encourage these emergent properties that show up in these huge data models to actually show
up when we have less data using our structured models. Right. So what if you wanted the L2 distance
tree distance hypothesis to hold when you only had, , a reasonable amount of data and not a Bert
amount of data. Cause it seems to help Bert maybe or Bert somehow constructs it for some reason. So
why don't we encourage that to happen when it wouldn't happen naturally. I think that's an
interesting thing that I hope that I or probably other people will end up exploring too.

</Turn>


<Turn speaker="Matt Gardner" timestamp="38:58">

Yeah, that's a great answer. Thanks.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="39:00">

So this has been a very interesting conversation. Did we miss anything that you wanted to talk about
about this work?

</Turn>


<Turn speaker="John Hewitt" timestamp="39:05">

Yeah, I think the last thing I want to say is that the code for running this is hopefully easy
enough to run such that people can actually just type sentences they're interested in into some pre-
trained probes and the code that I have on GitHub, will run Bert for you and then run the probe for
you. And print out this exactly the same graphs that I have in the paper for whatever sentence you
want to work with. And so I hope that it will pique people's interest in just saying like, what if I
send, you know, some garden path sentence on it? What happens? There's, there's so many great fine
grained analyses that I hope people run that I'd be really just can't personally run. And I hope
that people will both take the code that I, that I've written and also take the paper and say like
what are all the hypotheses we can test, we can test other languages.

</Turn>


<Turn speaker="John Hewitt" timestamp="39:49">

People have already started to test other languages actually independent of me. You know, we can, we
can test where the errors are being made. We can test whether, you know, I have this, this toy
example in the blog post where I have this subject verb number agreement example where I just keep
adding relative causes between chef and store a or was when like the chef who ran to the store was
out of food and just keep adding clauses in the middle between the subject and the verb. And for
some reason it seems like, you know, the arc between chef and was vaguely might still line up even
with a lot of things in the middle and now it's like, oh it's, you know, they've got something
similar to like the, you know, assign higher probability to the correct number conjugation of the
verb work that we saw that we've been seeing for the last couple of years. And like, is it a
scientific statement? Absolutely not. But it was Kinda cool and I hope people run those kinds of
analyses and see what more quantitative things they would like to run in the future.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="40:41">

That's sort of the virtualizations in this work are very interesting and fun to play with. Reminder
that this paper will be presented in NAACL in a couple of months John just told me that it's going
to be an oral presentation. So you're welcome to go. Thank you for joining us today, John, it was
fun.

</Turn>


<Turn speaker="John Hewitt" timestamp="40:56">

Thank you too. Thanks for having me.

</Turn>
