---
title: "A Simple Neural Network Module for Relational Reasoning"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "020"
tags: []
description: TODO
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:13">

Today's paper is titled: A Simple Neural Network Module for Relational Reasoning. It was put on
archive a few days ago, written by Adam Santoro and others at Deep Mind. So the paper addresses
relational reasoning between sets of objects. Let's say you have a set of objects and want to encode
the relationship between them and while conducting another task. The paper introduces a module,
which they call relation network for that purpose. So the input to the relation module or the
relation network module is a set of objects. Each represented with a dense vector. And then there's
a function that combines, that computes the relation between each pair of these objects using a
multi-layer perceptron. And then you aggregate this representation, the output of the assumption is
called a relation and then you sum up these relations and feed it into another MLP. Another Multi-
layer perceptron to compute the overall embedding or representation of the relations among these
objects in each set.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:21">

And the paper makes this nice analogy to CNNs and RNNs saying that the capacity to compute relations
is baked into the relation network in the same way that the capacity to reason about spatial and
translational translation invariant properties are built into the CNN and also in the same way that
the capacity for reason about sequential dependencies is built into the recurrent neural networks.

</turn>


<turn speaker="Matt Gardner" timestamp="01:47">

So what you described sounds really, really similar to me to similarity matrices that have been
computed in NLP models, deep text models for a long time. So there's the decomposable attention
model by Ankur Parikh and others at Google where a given a pair of sentences, they compute a
similarity matrix between this parameterized with a neural net on each similarity operation. And
then they do some aggregation functions on top of that. Like that seems like exactly like what
you're describing here. Also the bi-directional attention flow model by Minjoon Seo computes a
similarity between each word vector in a question, in each word vector and each word vector in a
passage compute this similarity matrix that they then do further operations on. So am I missing
something?

</turn>


<turn speaker="Waleed Ammar" timestamp="02:35">

That's exactly right. You can use the functions used in both of these papers to replace the function
that computes the relation between a pair of entities here in this in this model. And then I think
the main difference would be the fact that this works on a set of objects. So basically it sums up
the relations that you get from the pairs another small distinctions that the other papers are
concerned about finding a similarity between the objects. While this is trying to encode the
relation in a dense vector. So if the output is not as clear, it's a vector in this time, but the
end, we're still using neural networks to compute it.

</turn>


<turn speaker="Matt Gardner" timestamp="03:21">

Right. I guess I said similarity, but actually that's not what's computed in the decomposable
attention model. It's this matrix of, it is a matrix of like similarity, something like a similarity
computation. But actually what the SNLI model is trying to show is there is an entailment
relationship between this pair of words, it's just a matrix relational operation. That's like
exactly what's going on here. Similarly in the bi-directional attention flow model, it's not an
explicit similarity. It's a parameterized function that then gets used to update some for the
representation. So I called it a similarity matrix because you're doing this matrix of operations.
Anyway, it just seems like this is something that's been done for a long time and I'm not really
sure what's new here.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:04">

Yeah, when I saw this paper, I didn't think this is the first time someone defines a function that
estimates the relationship between pairs of objects in this fashion. I think maybe one nice thing
here is that they're indicating that this is a thing. This is a module that you can instantiate and
put in another model, which just putting more emphasis on the usefulness of this structure.

</turn>


<turn speaker="Matt Gardner" timestamp="04:36">

Maybe I'm being a little bit pushing on this a little bit too much, but like if you're writing code
and Keras or something, this is just a layer. I have a layer that is a matrix attention layer that
computes the similarity matrix. Exactly. And I wrote this code a long time ago, so I don't know,
maybe Yoav Goldberg's post yesterday on criticizing deep learning papers that try to do language has
gotten me thinking about this, but I'm just really struggling to find out what's new here. It seems
like they're claiming more than they should be.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:08">

I think the main thing that made this paper as popular as it is now on Twitter, is that the results
we have on the CLEVR dataset are exceeding the human performance. So maybe I should spend a minute
talking about this dataset. It consists of 100,000 rendered images and about 1 million auto-
generated questions. So it was released a few months ago in December by folks at Stanford and Fair,
it will be presented at CVPR 2017. So I'm seeing an example of these images now, it's a 2D image
that shows a bunch of objects, 3D objects with with shadows. So there are cylinders, spheres, and
cubes. Each of them have different colors, some of them have different material and the questions
goes like, one question would be, "Are there an equal number of large things and metal spheres?"
Another question would be, "How many objects are either small cylinders or metal things?" So these
are kind of tricky questions for a competition model to answer. But at the end of the day, they are
automatically generated questions. And we know from previous work that you know, natural languages
are very different than automatically generated language. So we know this, for example, from results
on BAbi dataset, I'm sure Matt can talk for hours about.

</turn>


<turn speaker="Matt Gardner" timestamp="06:47">

Let's not waste time. Talking about that dataset.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:50">

Right? So yeah, so to go back the to the paper, the, results in this paper show that adding this
module, the relation network module to a neural network that's performing at the state-of-the-art
level for this dataset substantially improves the performance and importantly exceeds the
performance of humans on this task. So the best previous results was reported in this was 68.5%.
Their implementation with some tuning for the parameters got it up to 76.6%. So that's like an 8%
increase just without modifying the network at all. But then when you add the relation network
module to it, to reason about how each of these pairs of objects actually are related, you get a
very big performance increase into about 20 or 19 point increase. And there results is 95.5%, which
is a few points more than what the humans can do on this.

</turn>


<turn speaker="Matt Gardner" timestamp="08:06">

So let me push back on that a little bit. I do think this is an interesting piece of work and it's
good that people are looking at these models in this dataset. Like, I don't want to criticize the
authors here, but we should be really careful about the hype that we give to results. It makes a
really nice headline to say, Ooh, superhuman performance on a visual reasoning task. But wait a
minute. What humans are you talking about? Was this people on Mechanical Turk? Did you actually
check that? They were trying to solve the task. There's a lot of noise on Mechanical Turk. I don't
know where the human performance came from. I haven't read like the CLEVR paper, so I don't know
this for sure, but when you make these out strong claims about like superhuman performance, you need
to be really careful.

</turn>


<turn speaker="Matt Gardner" timestamp="08:52">

Strong claims requires strong evidence and also they say a visual reasoning task, reasoning over
what when, when you hear "superhuman performance on a visual reasoning tasks," you might think we
have these complex natural language statements that we have to do reasoning over. Actually this is
machine generated text. If I'm understanding right just like BAbi you can't call this natural
language reasoning. It's not natural language. So while this is an interesting result, we need to be
really careful about the scope of the claims that we make. Otherwise we're just going to go off the
rails.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:23">

So I agree, yes, we should take these results with a grain of salt. I don't know honestly how well
trained the humans who are performing this task or whether they were actually trying to explicitly
address this problem or not. Let me quickly talk about the model that they used to solve the
problem. You use a convolutional neural network to convert the image into a set of object embeddings
and their notion of objects are really very strange. But lets not go into this detail. So they don't
actually try to do object detection rather they consider a few parts in the image to be objects and
find relationships between them. So that's what they do in order to get an embedding for each
object. And then they use an LSTM to embed the question that is asked about the image, and they
compute the relation between each pair of the entities using the relation network and aggregate
these relation embeddings and feed them into another multi-layer perceptron and then make the
prediction of the answer.

</turn>


<turn speaker="Matt Gardner" timestamp="10:37">

So I'm looking at the specifics of the model and now I can see where the differences are between the
previous similarity matrix kinds of things that I've seen. Or there's also this paper on like
multicontext attention that outputs a vector as like your similarity computation. You have like
multiple entries in this spectrum instead of just a single similarity. And these are parameterized.
They learn different things. It's not just a simple top product. So the, real difference here, the
instead of having a similarity matrix, I'm still gonna use this word even though it's not totally
correct. Instead of having a similarity matrix between a question and a passage, each word in the
question and each word in the passage, they have this between each pixel, each pair of pixels in the
image, right. And then this is parameterized not just by a vector of learned parameters, but also by
the question vector.

</turn>


<turn speaker="Matt Gardner" timestamp="11:31">

So you're given a question, you encode it with an LSTM and then you take that encoded vector and use
it as part of the parameterization of this similarity function. And so yeah, you're doing
essentially a similarity between three things instead of two. So it's slightly different in the same
vein as some other work. That should I think have been cited, wasn't but anyway, like a lot of
people have been thinking about these similar ideas. It's not to me some revolutionary new like
network structure. It's just an application of ideas that people have had for a long time to a
particular new problem, with good results.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:08">

They're not at all. And the like the group of pixels that the consider to be an object. This is
really an abstraction that yeah, I don't think it's critical to this work. So I don't think this
distinction is a novelty here

</turn>


<turn speaker="Matt Gardner" timestamp="12:24">

And I should be, I should be clear. I said each pair of pixels, I mean, each pair of the like max
pooled top layer representation out of your CNN. So it's not like an individual pixel, it's like a
representation of a group of pixels that you're comparing.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:39">

Right. So one thing that they wanted to explore more closely is how does like, is this good because
it addresses the relational aspect or the relational reasoning between objects, or is it good just
in general? And, the CLEVR dataset doesn't have like a distinction between questions that talk about
the relations and one that dose't. So they constructed this aptly named dataset called Sort-of-
CLEVR, which consists of 2D images rendered. Each of them consist of six squares or circles with
unique colors so that you can ask questions about them and we hard code the questions. And there are
two types of questions they ask. One is relational and the other is non-relational. So an example of
a relational question would be "What is the shape of the object that is farthest from the gray
object?"

</turn>


<turn speaker="Waleed Ammar" timestamp="13:36">

And another non-relational object question would be, "What is the shape of the gray object?" And the
results are kind of interesting. They confirm their hypothesis that this relation network is really
embedding relation between things. So the convolutional neural network, the baseline, gives 94%
accuracy on the non-relational questions, but only 63% accuracy on the relational questions. When
you compare this to their CNN model augmented with the relational with relation network module you
get 94% accuracy on both types of questions. So the result, the conclusion, the draw here is that
really the relation network is good at modeling this relation between pairs. They also show results
on BAbi, which yeah, we're not, super excited about. But the main takeaway in the paper is that
there is a particular task in BAbi called basic induction task. And the best of the three baselines
they look at performance at 55%. That's the DNC model. And their model with the relation network
gives 98% accuracy on this task.

</turn>


<turn speaker="Matt Gardner" timestamp="15:01">

So okay, let's talk about BAbi for just a minute. They show that they don't do too well on the three
step task. So here, imagine a set, I guess I need to describe BAbi. So you get a list of sentences
like; "John is in the garage." "John picked up the football." "John went to the hallway." "Where is
the football?" or "Where was the football before the hallway?" And the answer is "garage." And so in
order to answer that last question, you need to put together a number of things. What you might
notice is that this model does nothing to do multi-step kinds of reasoning. How does it get this
question right then? How can it possibly go backwards in time? In order to answer the question
correctly? Well, you can imagine these questions are totally templated.

</turn>


<turn speaker="Matt Gardner" timestamp="16:01">

And so you can imagine the model just learning that it can store the comparison it needs to do for
the first step. In one part of it's hidden vector state and the comparison it needs to do for the
second step of reasoning in another part of it's hidden state and the comparison it needs to do for
the third step. Like it's always going to be an item and a person, for instance, it'll do that
comparison in like the last section of it's hidden state. And so you can do, because this task is so
artificial and so templated, you can actually decompose all of the steps that you need in this
supposedly multi-step process into just an aggregation of pairwise comparisons. Does this make
sense?

</turn>


<turn speaker="Waleed Ammar" timestamp="16:47">

It does.

</turn>


<turn speaker="Matt Gardner" timestamp="16:47">

So, yeah, I would again, take this result in any results on BAbi with a huge grain of salt because
it's not really language, it's incredibly templated and thus gameable in these kinds of ways. This
model shouldn't be able to do anything multi-step, but it can solve BAbi without too much trouble.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:08">

So to wrap up this paper introduces a relation module. Were, whenever you have a set of objects and
you want to characterize the relations between the objects or pairs of these objects, you can use
this module to get it, and there are some results that suggest it may be a good fit for this.

</turn>


<turn speaker="Matt Gardner" timestamp="17:30">

Okay. Thanks Waleed for telling us about this paper. Next time we'll have another interview with
Maruan Al-Shedivat who will be talking to us about his paper called:Contextual Explanation Networks.

</turn>
