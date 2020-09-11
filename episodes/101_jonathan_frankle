---
title: "Jonathan Frankle"
hosts: ["Waleed","Pradeep Dasigi"]
guests: ["Jonathan Franke"]
number: 101
tags: []
description: TODO
type: episode
---

<Turn speaker="Pradeep Dasigi" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</Turn>


<Turn speaker="Waleed" timestamp="00:06">

This is Matt Gardner and Waleed Amar. We are research scientists at the Allan Institute for
artificial intelligence.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="00:12">

Hello, everyone. This episode's guest is Jonathan Frankel who is a PhD student at MIT. Welcome to
the podcast episode Jonathan.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="00:19">

Thank you so much for having me.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="00:20">

Today. We are talking about the Lottery Ticket hypothesis. This work has been quite popular lately.
After the original paper was published, sometime last year, there's been a lot of follow up work in
this area. We decided to chat with Jonathan about the Lottery Ticket hypothesis and also what
provincially some of the followup work that's come out after the pruning paper was written.
Jonathan, can you tell us about what exactly the Lottery Ticket hypothesis is?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="00:42">

First, just a little bit of context on why this works. It's important to understand the motivation,
so we already know that the neural networks that we usually train are much larger than they have to
be to represent the functions that they eventually learn. That's one piece of evidence for this. We
trained very large models, but afterwards we can prune them. We can remove connections, we can
remove neurons and make them much smaller, often an order of magnitude smaller. And we don't lose
any accuracy in the process. And what this means is that the functions learned by the model have a
very compact representation, much smaller than the models original capacity was. And the question I
wanted to ask with this work was, was that capacity ever necessary? Did we ever need to have all
those extra connections in order for the model to learn? Was it that perhaps the learning process
requires a lot of capacity, but actually representing the final function requires very little
capacity.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="01:30">

And so the goal of this work was to try to understand can we train these smaller models from the
start? Now there've been previous experiments that have shown that if you take the model
architecture that you get from training a big model and then pruning it and try training that from
the start. So just to randomly sample new values for each of the connections and try to train it.
This produces much lower accuracy than the pruned network. The experiment I want to try was maybe
these connections received a very lucky initialization, maybe the original values that each
connection received were very important. And so I just wanted to try perhaps what if we take the
pruned architecture, set each connection back to its original value, maybe that will learn
differently. And we found that in the end that actually learns very effectively, well past the point
where randomly initializing the sparse model causes it to reach lower and lower accuracy.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="02:14">

Using the original initialization for each connection causes it to get much better accuracy. And the
hypothesis is, in a sense, a generalization of that phenomenon. We hypothesize perhaps in general
the large networks that we train have much smaller sub networks that are capable of training just as
effectively, they can train just as fast to just as good of performance. It's a hypothesis that only
characterizes the empirical results that we found. It's, you know, not a theory, it's not a fact of
the universe. We don't have a proof for it, but it was a way of summarizing all of our observations
on a pretty wide range of vision networks.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="02:46">

Thanks. That's a great summary. Thanks for also telling us the motivation behind the Lottery Ticket
hypothesis. You mentioned pruning the network and finding sub networks within the larger network.
Can you tell us about how exactly that pruning would work?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="03:00">

There are a lot of different strategies for pruning neural networks. If you can imagine a strategy,
somebody who's published a paper on it, but the simplest way of putting a neural network is to train
it to completion and then remove the connections with the lowest magnitudes. Every connection has a
weight and look at the weight value and take the absolute value of that and remove those that have
the lowest values at the end of training. There's no theorem that says this should work well, but in
practice, this is one of the most effective ways to prune it's been popular as a pruning strategy
going back to the 1980s. We extended that strategy and then ask the question, what if you take the
sub network that you get by pruning and take each connection back to its original value?

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="03:34">

You mentioned that that's one of the many techniques that people have tried. Can you briefly
summarize to us what other options people have used in the past and how they compare to the
magnitude pruning that you just mentioned?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="03:45">

I can definitely summarize the other options. I don't want to talk too much about the comparison
just because it's one of the big challenges right now is that it's very hard to compare these
methods, but there are two different aspects of pruning that you need to think about. The first is
what is my heuristic for pruning? What tells me which connection should be pruned and which
connections should not, and people have looked at things like activations, things like gradients or
various other sensitivity metrics that look at the loss. People have looked at the momentum
parameters, pretty much any quantity that might confer some information, folks have looked at. And,
in general it's quite hard to compare these to each other. The other axis that you might consider is
what kinds of structures will you prune? In the paper, I focus on pruning individual connections,
which is the smallest kind of structure, but you might imagine pruning an entire neuron that
involves pruning a lot of connections in a very structured way or pruning an entire convolutional
filter or convolutional channel in the context of our natural language processing model that might
be pruning an attention head and these sorts of structured printing approaches are actually very
popular in practice.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="04:41">

The idea is that if you prune a network connection by connection, you get a sparse matrix in the end
and the sparse matrices are less efficient on most modern hardware. Whereas if you prune in a more
structured way, you may still get dense matrices that simply have smaller dimensions and those are
much more efficient on CPU's. So in practice, people tend to favor structured pruning approaches
where possible because it'll get you better speed up and better efficiency.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="05:02">

Cool. Yeah, that sounds good. So going back to magnitude pruning, which is a technique that you used
in most of your work, what you mentioned does sound a lot like dropout. Can you tell us a bit about
how it compares to dropout?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="05:14">

There are two big differences. One is that you can imagine my lottery ticket experiment is taking
place in two phases. The first phase is you train the whole network and the second phase is you
retrain with just a sub network. In the case of dropout, you're training the whole network the
entire time. But on each iteration you're randomly dropping a certain fraction of either the neurons
or the connections as you train the network. So the two big differences are, in my case, I'm never
randomly dropping connections. The connections are always dropped given that a heuristic set of
these connections were less important. And once they're dropped, they're dropped forever. I don't
have connections coming and going like in dropout. And the other big differences that I either train
the full model or I train the sparse model in drop out. You're somewhat always training a sparse sub
network the entire time, but you're training a different sparse sub network every time.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="05:56">

Right. So, you described to us how exactly pruning works and what exactly you're trying to do here.
Is there a formal definition or a formal statement for the hypothesis, the Lottery Ticket hypothesis
that you want to mention? I've written a statement that uses mathematical notation, but I still
wouldn't call it a formal statement, necessarily. I think the Lottery Ticket hypothesis is by its
nature, informal. It reflects kind of an empirical statement of what we've seen in practice, but I'm
always nervous to put it into a formal context because I can give you a counter example; situations
where the lottery ticket hypothesis could not possibly apply, situations where the network is
already of minimum size when you train it and therefore you can't make it any smaller. So it's
really an empirical phenomenon. It's a statement about the kinds of networks we typically train in
practice on the kinds of tasks we typically use in practice. Not a statement about neural networks
universally.

</Turn>


<Turn speaker="Waleed" timestamp="06:45">

Interesting. I was wondering, depending on that method that you use for pruning, you will end up
with a different kind of sub network. Right, so like you said, if you prune individual connections,
you'll have a very sparse matrix, but the original size of completion would stay the same. I'm
curious to know if you've seen more robust or more common shapes for these subnetworks that tend to
be winning tickets?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="07:08">

Somewhat. It varies depending on not only the architecture and the task, but also how you optimize
the network. So I'm always nervous to make general statements beyond. There are definitely patterns,
but the patterns vary. I think one thing I've seen in general is that it tends to be evenly sparse.
You don't tend to see certain neurons that are very highly connected and certain neurons that are
unconnected, you tend to see that all neurons have about the same number of incoming connections.
Beyond that though, I've had a very hard time trying to extract patterns about either the
architecture or the initialization. That would be the Holy Grail in my opinion. If we had a way to
just create these sparse networks from scratch by looking at enough of these lottery tickets and so
far that's been a challenging task for me to take on.

</Turn>


<Turn speaker="Waleed" timestamp="07:46">

Got it. And in terms of the implication, is one of these pruning methods easier to use in practice?
For example, all of the insights that people have been using somewhat as a whole on this hypothesis
is that we can do this deletion when we do this deletion where you want to initialize the model
parameters or some of the original model parameters. This way we make sure that we have at least
some of the of the winning tickets. Right. I was wondering if you have any insights on just
practical considerations when considering which method, which pruning method to use.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="08:17">

I'm not sure there are too many practical insights with respect to pruning in general from a lottery
ticket phenomenon. I think one of the big points of emphasis for me when I present the work is that
it's not really about pruning. I would say more it's about how neural networks learn and what the
optimization process looks like. I think pruning was a methodological choice in order to get at that
idea, but I'm always nervous to make pruning the centerpiece. I can make a couple of notes though
that a team at Facebook recently released a paper where they showed, and it's going to be in NeurIPS
later this week, where they showed that these lottery tickets can transfer from task to task. So if
you find one for one vision task, you can reuse it for another vision task and this is at least a
way of taking advantage of the fact that once you've found one of these good initializations, it may
be useful beyond precisely the original task you used it for.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="09:02">

Another insight we found is that typically in pruning, after you've pruned the network, you've
actually lost a bunch of accuracy because you've just damaged the function you learned. So, you have
to train the network a little bit more to kind of fix up the network and get back to a good
accuracy. We found empirically that if you follow the lottery ticket procedure instead, you train to
completion, you prune, then you rewind the weights back to some earlier value and retrain from
there. We actually get better performance in terms of the sparsity of the pruned network that
matches the accuracy of the original network. So there are some implications, but I don't think it
was kind of a centerpiece of the work.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="09:34">

Right. I wanted to chat a bit about how exactly you implemented the pruning procedure and what
exactly you did for the experiments. Can you describe to us how exactly pruning worked?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="09:44">

Once you train a network to completion, you just train it following whatever procedure is standard
for that particular network. The next step is to prune it and I stated earlier that you prune the
connections at the lowest magnitude. There's more to it than that. You could imagine a lot of ways
that might go wrong. Let's imagine that you have say a two layer network and all the connections in
the first layer end up having very small values. If you prune the weights with the lowest magnitudes
globally, one fear might be that you accidentally prune the entire first layer and the network no
longer works properly and that's been a concern in the literature dating back, I think decades. So
one solution people typically took was to prune the lowest, say 20% of weights in each layer, or
pick your favorite percentage, but to prune each layer separately.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="10:26">

The idea being that perhaps the weights will have similar distributions by layer, but the
distributions may not necessarily be related to each other between layers. That was at least the
insight. Now we've, we ended up finding in practice in this paper that you can just prune the
network globally, treat the network as one giant vector of weights and prune those at the lowest
magnitude, completely ignoring the layer boundaries. This is something that does not intuitively
work. In fact, in neural networks that have a value activation function and especially at batch
normalization, there's no reason to believe that the magnitudes of weights in one layer will have
anything to do with magnitudes of weights in another layer. What we found in practice at the
network, when you prune it in this way, it seems to find good proportions in which to prune each
layer and we can actually get better sparsity numbers than state of the art just by printing
globally rather than trying to be too careful about which layers we prune. It's been a very
surprising phenomenon. If you pick the exact right layer-wise proportions, you'll do the best, but
doing that requires a lot of hyper parameter search and in fact the silly thing to do ends up being
the best thing to do, in our experience, which was a kind of weird surprise.

</Turn>


<Turn speaker="Waleed" timestamp="11:29">

I'm curious to know how large are the networks that you used for these experiments?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="11:30">

In the original paper, we focused on small vision networks, so small, fully connected networks and
convolutional networks for MNIST and CIFAR10. In follow up work, we've extended this to large-scale
convolutional residual networks for image net. We've had to change the procedure a little bit in
doing so, but I think we may chat about that later.

</Turn>


<Turn speaker="Waleed" timestamp="11:47">

You don't need to do the pruning coordinator.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="11:50">

That's correct. We found that up to models like Resnet 50 and Inception on image net, you can just
prune globally and you'll in fact beat state of the art performance that other pruning methods have
gotten. We've even matched the performance of a very fancy pruning method that used reinforcement
learning to select the layer wise pruning percentages, which was a very surprising finding.

</Turn>


<Turn speaker="Waleed" timestamp="12:08">

Do you observe large differences in percentage of weights from different layers?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="12:12">

Definitely the differences are often dramatic. For example, in a VGG style network, just kind of a
standard convolutional network with say, 19 layers, we'll see that the first layer, which is very
small, only about 30,000 parameters will maintain, let's say about a third of its parameters, maybe
two thirds of its parameters. The last layer, which is exceedingly large. Perhaps a couple of
million parameters will get pruned by more than 99%

</Turn>


<Turn speaker="Waleed" timestamp="12:33">

I think this is our feeling, right, because we have no reason to think that all the layers need to
have the same number of parameters and maybe this simple method is enough to find out how many we
need for each layer after the fact.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="12:45">

Exactly. We actually found that we used to prune the networks by 20% for each layer, but for this
kind of network it became a big problem when the first layer has 30,000 parameters and in the last
test, 2 million. Then if you prune by 20% for each layer, the first layer becomes a bottleneck.
You'll basically run out of parameters in that layer very quickly where the last layer still has a
lot of capacity, so you definitely don't want to do this and I think it's really lucky that pruning
globally seems to work and find good percentages. There's no reason necessarily to believe that this
is the case. It may have to do with the kinds of initialization schemes we use and something to do
with batch normalization. It's a topic that we're definitely conversing about in our lab right now
and plan to follow up on shortly because we think this is an important question for trying to
understand the nature of optimization. Really.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="13:25">

Before we go and talk about your experiments with large networks, can you tell us a bit more about
your findings on the simpler models that you looked at in your initial paper? You looked at
feedforward networks and convolution. Can you describe to us those experiments?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="13:40">

Definitely. By and large for MNIST and CIFAR 10 we found that running this lottery ticket
experiment, will find very small sub networks that match the performance of the original network.
And by very small, I mean between about 10% and 1% of the original size of the network. And really
this depends on how over parameterized the original network was. It's possible to get, you know,
arbitrarily good percentage values by just starting with gigantically large networks to begin with.
But these were pretty standard architectures and we got sparsity levels that were on par with what
you would get after pruning the network or pruning the network after training, and we found that
these networks match the accuracy of the original network. In fact, sometimes they exceeded the
accuracy of the original network, the test accuracy, and they learn faster. That is to say iteration
for iteration. They reached higher accuracy than the the full network had reached. Now we found that
the initialization was very important for these networks. If you reinitialize them, performance is
much worse, it always declines the sparser the network is. Whereas in the lottery ticket case, the
networks actually sometimes improved in accuracy or at least maintained accuracy down to very
extreme sparsities.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="14:38">

Just to be clear, when you say training faster, you're talking about reaching, at least stopping
earlier, correct? Or stopping at an earlier interation, correct?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="14:47">

We measured early stopping by the iteration of minimum validation loss on a separate holdout
validation set, but even if you just look at the training curves, you'll see that the curve for the
lottery ticket goes up faster and plateaus sooner than the corresponding network and plateaus at
about the same place.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="15:02">

Okay. I guess intuitively it makes sense to me that a smaller network would train faster, but I
don't have a very good intuition for why the accuracies of the smaller network would be higher than
the validation network. Do have some explanation for that?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="15:17">

We have kind of vague intuition, but I don't think we have anything scientifically backed right now.
Now, this is not a phenomenon unique to lottery tickets. This is actually a phenomenon we see in
pruning where if you look at a lot of printing papers, you'll see that after the network is pruned
and then retrained a little bit. Accuracy is higher than it was before and so one hypothesis might
be that simply the network has less capacity to overfit. We've removed some parameters that perhaps
may have been doing memorization or something like that. And so we've given the network the ability
to generalize better. That could be one hypothesis, but it's not something we've investigated
rigorously. So I wouldn't put that on paper and submit that anywhere right now.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="15:49">

Sure. So for your simpler experiments in your pruning paper, you experimented with a feed forward
architecture and the convolutional architecture. Did you see any interesting trends between or
differences between the two architectures in the Lottery Ticket hypothesis?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="16:04">

I recall that we saw some differences in behavior from pruning convolutions versus printing fully
connected layers and some very small countnets. I don't actually recall off the top of my head what
precisely those trends were and I always get them mixed up. So I don't want to misspeak right now
cause I always get that backwards. And I will say that in larger scale convolutional networks where
we use average pooling at the end view, vast, vast, vast majority of parameters are in the
convolutions. And so we can basically treat it as pruning just the convolutions. In fact, in some
experiments we didn't even prune the fully connected layer because it was so small it didn't matter.
It might've been on the order of hundreds of parameters where the other layers were on the order of
millions.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="16:39">

Okay. Yeah, that makes sense. Let's chat about scaling of these experiments to larger models and you
have some follow up on scaling up the Lottery Ticket hypothesis to larger margins as well. Can you
tell us what the challenges were in doing so?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="16:53">

Definitely, I mean the key challenge, just to be completely blunt, is that the original experiment
doesn't work. Once you get to a certain model, complexity or task size, one could conjecture many
different aspects of the model or task have to do with this, but once we get to what are typically
seen to be harder models or more real models, the original experiment doesn't work. If you prune the
network at the end of training and then reset all the weights back to their original values, they'll
do no better than if you just randomly reinitialize the network. The trends we observe disappear and
so one might think this is the end of the story. There are two ways of showing how this behavior
does actually scale up and I think each of those ways ends up providing some interesting insights
into how deep learning works in general and a lot of what I'm going to discuss actually we haven't
even put in archive yet.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="17:37">

We found that one way in the original paper getting around this challenge was to lower the learning
rate for the network which reduces overall performance but allows this phenomenon to work again kind
of mysterious at least at first glance or to use learning rate warm-up for the first part of
training that is start your learning rate very low and gradually increase it to the full value of
the course of the first many epics of training. And these restore the lottery ticket behavior,
although performance tends to go down a little bit for the overall network, and this might seem
surprising. Now, one hypothesis we had intuitively was perhaps early in training, STD is actually
very noisy and in an over-parameterized tense network, the network may be able to find a different
optimization trajectory. Despite the noise. These sparse networks which have many fewer parameters
may not be able to find a new optimization trajectory if they get knocked off course and the early
noise and training may be tantamount to just re-initializing the network in some sense. This was
just an intuition we had and over the past few months we've made it a little bit more rigorous. So
one other way of getting around this, if this were the case, would be what if we just skip that
first part of training? What if instead of putting each connection back to its original weight, we
put each connection back to its weight a little after the beginning, say 1% of the way into training
and we find that this works. Once you do this, it completely restores all the lottery ticket
behavior up to the largest models that we've tried on image net; standard models like Resnet 50 and
Inception. And this has been a strange and surprising phenomenon. To me, it's very exciting because
we have this ability to compare and contrast. If you set the weights to iteration zero, things don't
work. If you set them just a little bit later, things do work. And then you ask the question, what's
the difference? It's a natural scientific experiment and we found something quite interesting. It's
a phenomenon we're referring to as instability. So we wanted to measure how unstable is the network
to the noise of stochastic gradient descent. And so we tried something, we take the network and
train two identical copies of it and train them on different samples of data order. So different
random data order which controls the noise of SGD. So, in the end you get two trained networks which
have been trained in an identical fashion except on different data orders. So you've got two
different samples of STD noise and then we want to compare these networks somehow to understand how
much did SGD noise really affect the optimization process by giving us how different were these two
networks.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="19:48">

One way of doing this might be to look at the L2 distance between the networks and parameter space.
And this actually shows a trend where the L2 distance is very large, when the lottery tickets don't
work. The L2 distance gets smaller and smaller and smaller and reaches some minimum. It's not zero,
but it reaches some plateau of lower L2 distance. When lottery ticket phenomenon starts working, the
networks seem more robust to STD noise in terms of where they land in parameter space.

</Turn>


<Turn speaker="Waleed" timestamp="20:13">

When you do this, do you actually prune the parameters or do you just train the model to the end?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="20:17">

So for now, let's talk about the pruned networks, but actually this works on the full networks as
well and that's kind of a cool result of this experiment that we weren't expecting but has us very
excited. So train the network to completion. Prune it just like before, set the weights back to
their values at some earlier iteration "K." K might be zero or K might be, you know, 1% of the way
into training and then make two copies of that network, this sparse network and try training that.
And we find that when K reaches a sufficient value that the lottery ticket phenomenon starts
appearing. The networks also reach some kind of plateau of being relatively close in terms of L2
distance, whereas earlier they were much more distant in L2 distance. When you rewind too early when
K equals zero for example. Another thing you might do with these two networks, if you wanted to
compare them is try to understand are they in the same minimum because you know these minimum could
be very large and so L2 distance doesn't tell you very much about the lost landscape. It could be in
a completely separate minimum. It could be in the same, what does small even mean in L2 distance.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="21:12">

So we tried actually a very simple experiment. We used this recent phenomenon called mode
connectivity, which has shown that in a lot of cases the minima found by separate neural networks
are actually connected by paths of constant loss, meaning the minima are the same in a sense. And so
we tried taking the two trained networks and linearly interpolating between them in parameter space,
considering the networks that are on the line between the two networks and seeing, you know, what is
the error of this network? At this point, at this point, at this point, all the way along the the
line between the two networks and we found something very interesting. At the point where the
lottery tickets phenomenon starts working, error doesn't change along this line. The networks are
linearly connected in the same minimum. At points before that, error spikes along the line and then
comes back down, meaning that the networks may be in the same minimum, but the minima are not
linearly connected. And so interestingly, this, this linear connectivity seems to correlate with
when the lottery ticket phenomenon and starts working. We refer to this linear connectivity as
stability. The networks that are connected in this way are stable to SGD noise because we trained on
two different samples of SGD noise and they found the same linearly connected minimum. Whereas when
they're separated by a peak, when loss increases, we call them unstable. Just um, some terminology,

</Turn>


<Turn speaker="Waleed" timestamp="22:19">

I'm trying to wrap my head around the linear combination. So for any point in the middle between the
two models, you pick some parameter, maybe like 0.1, right? And 0.9. So, any weight in this new
network that you're building, you multiply all the parameters of the first model by 0.1 and added to
0.9 times all the parameters of the second one.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="22:40">

That's correct. And this is, it's not something that intuitively should work. It's something that
seems rather strange, but it's actually something that has a lengthy legacy. We were definitely not
the first to come up with this. We were inspired by a number of other papers we've read in recent
years that have shown phenomenon such as: you can train a network, you can get multiple copies of it
near the minimum and you can actually average the networks and you'll get a network that performs
better. There's a lengthy legacy of other people who inspired us, who have done similar operations
with their networks. We just happened to, the interesting part I think is less the interpolation and
much more of the experimental setup. Interpolation was more a method of comparison that we borrowed
from a lot of very smart people who have come up with this idea and used it in a lot of other
creative ways, but it's very surprising to us that this is what happened; that linear interpolation
is enough. In many other pieces of work that have looked at this phenomenon known as mode
connectivity, typically linear interpolation does not work. You can't, there is not a linear path
between the minima. There's a piecewise linear path that can have at a minimum two pieces and
connect the minima, but there isn't a linear path. And so this is a strange set of circumstances
where we consistently find linear paths.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="23:49">

So, to summarize, you found that there is a linear path between the network after it's been trained
to completion and at the state where it's been trained only for K the box, right to the point where
you will be writing it.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="24:01">

If you have a network at a particular iteration, K and you train two copies of it under different
samples of SGD noise, those copies will always find a minimum in which they are linearly connected.
So optimization will always find this linear region.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="24:14">

Did this also explain the results that you saw in your simpler models where you didn't actually have
to define, you could actually reset the weights all to zero?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="24:23">

I'd be careful to say explain, but we did find in these simpler models that even, you know from
iteration zero these sparse sub networks will always find linearly connected minima and from
iteration zero the lottery tickets phenomenon seems to work. And I will say we found this behavior
all the way up to very large models on image net where to me it's particularly surprising that this
interpolation works given these are very complicated models with a lot of parameters. In the case of
Inception, I believe there are 100 separate layers in the model in various permutations and various
interconnections. So to us it was very surprising that one could do this on these large models and
that the phenomenon scales in this way.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="24:57">

Yeah, that makes sense. Thanks. So for the rest of the time we have, I wanted to talk about some of
the implications of the results that you saw in your work and also some of the followup work that
came after your paper was published. I guess the high level result here, something that you started
off with as well. One implication is that most of our models are over parametrized, right? I mean
that's essentially the basis of your hypothesis. Trying to remove all these additional parameters is
what you're doing, but in general, database of a hypothesis. Also train your model till a certain
point and then either reset or rewind it back and use at the model after it's been trained to
completion to inform your pruning, or you manage your pruning, part of it. Right? So does it mean
that we should always start with an over parameterized model? Can we actually be clever about how we
initialize these models into something else?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="25:48">

So the answer is right now I would say yes, but that is to say right now the easiest way to get a
neural network to learn effectively is to start over parameterized. If you try to train a sparse
model, it'll be much more difficult. With that said, I think there's a lot of nuance here. So for
example, there've been a couple of really great papers that have come out I think from the
university of Washington and from some folks at Google that have shown methods for starting with the
sparse network and then kind of changing the sparsity pattern as you learn. So, periodically kind of
change which connections you have, add some new connections, remove some old ones as you can
maintain a sparse network for the entirety of training and get very good performance. Nearly state
of the art performance on these tasks without ever having needed an overparameterized model.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="26:29">

This is known as dynamic sparsity. I've been focused on static sparsity, given the lottery ticket
phenomenon shows there's a good static sparsity pattern for these networks, but I think these are
very exciting and show that sparsity is a way to train neural networks. Alternatively, now really
the implication of lottery hypothesis is these sparse networks exist very early in training often at
initialization. Now it would be very nice if we knew how to find them right then and there. The
approach I've described is wildly inefficient and I would not suggest it for anything other than
scientific purposes or if you use it carefully for pruning given our more recent paper on the topic,
but really the, the algorithm was developed for scientific purposes with the idea of just
understanding how optimization works in the role of over parameterization. To me, the Holy grail is
an approach that allows us to prune early in training that realizes the opportunity that we've
described. It's something that I'm very interested in and I've seen a lot of great papers on the
subject that are trying to make progress by suggesting heuristics for doing so.

</Turn>


<Turn speaker="Waleed" timestamp="27:21">

I see. Yeah, that, that does sound very exciting. Can you talk about the heuristics you just
mentioned that would be more efficient in training?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="27:28">

On the pruning early and training side, there was a paper that was released simultaneously with our
paper at ICLR last year called SNIP, which looked at a heuristic where your computer sensitivity
metric with respect to the loss and the sensitivity metric involves looking at the gradient and it's
there. There's a little bit more complexity than just looking at the gradient, but the method
suggests a way of pruning connections at initialization. These snip networks don't perform as well
as the lottery tickets. Obviously lottery tickets have a lot more information to work from. So I was
really impressed with how well the snip networks performed given this is done using one mini batch
of data at initialization, the cost is basically zero, whereas the cost of finding a lottery ticket
is more expensive than the cost to just train the full network. So in my view, you can think of the
lottery ticket performance as the the ceiling, the the ideal that we would like to reach. And I hope
that in the next couple of years we'll see papers trying to slowly reach higher and higher toward
that ceiling.

</Turn>


<Turn speaker="Waleed" timestamp="28:19">

Just to get a sense of the difference, how long do you need to train the network to find the lottery
tickets before you like your results?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="28:26">

We trained the network for the standard amount of time we need to train to the end. We found
anecdotally that pruning less than about halfway through training produces much worse results.
Magnitudes are not a good indicator of which weights you need and don't need at that point in
training. So one big challenge here is actually the magnitude pruning, which works surprisingly well
at the end of training, works quite badly early in training. And so I think the search is on to try
to understand what signals we should be looking for early in training. Now, one more cynical view
might say actually, you know, maybe this is an impossible task. We need to know where the network is
going to go, what the optimization landscape looks like before we can know what to prune. And in a
sense a lottery ticket has the advantage of retroactively looking back; of knowing where the weights
are going to end up and perhaps there just isn't enough information early in training, although it
would have been possible to prune and it would have been impossible to know what to prune. There are
definitely days where I wake up and and feel the more cynical view and days where I wake up and feel
the more optimistic view and I'm very sympathetic to people who take both perspectives and I know
that there are people who have very strong opinions on both sides of this.

</Turn>


<Turn speaker="Waleed" timestamp="29:31">

Thank you for sharing this insight. Another thing I'm wondering about, you may have mentioned it
already, but I'm not entirely sure. So if we were to, without actually resetting the values, do we
get better or worse performance?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="29:43">

To prune without resetting the values and then you train it a little bit more from there? You'll get
a little bit worse performance actually then resetting the values and retraining from there. And
this is a paper that we have in submission to ICLR right now that explores this phenomenon
empirically and finds that this rewinding or resetting process actually does better than what's
known as fine tuning, which is where you prune a network and then just keep training from there. And
this was rather surprising to us, but actually someone else pointed out when they saw our numbers
from one of the papers that they looked surprisingly good and we then did a little bit more
literature review and realize that we had beaten state of the art in a couple of settings. And
that's surprising. I'm not entirely sure why that's the case.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="30:20">

I could probably speculate for awhile if you wanted me to. It's very interesting and it's something
that I think should be taken into account when you want to prune a neural network. This might
actually provide you with better performance for the same sparsity, which is kind of cool.

</Turn>


<Turn speaker="Waleed" timestamp="30:32">

I would love to hear your explanation of this because you probably thought about it a lot more than
other people.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="30:37">

The simplest explanation I could come up with at a high level and this is nowhere near rigorous
enough to be empirically evaluated, is simply that if you prune a network and keep the trained
weights, you may still be stuck in some sort of minimum and perhaps you know the network may may
really be trapped in a place where it can't get out. Explore the optimization landscape. Whereas if
you prune and then rewind to an earlier iteration, you can kind of replay the optimization process
in this smaller subspace represented by the pruned network and perhaps that may lead the network to
find an optimum that's a better fit for the sparsity level that it has.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="31:08">

And again, this is all far too high level and non rigorous for me to ever write down on a paper. But
that might be one very simple perspective that one could take on the problem. It's something that
we're very curious about because this was just a complete surprise to us. I'm reminded every day how
little we know about neural networks and my experiments love to remind me of my own ignorance on a
daily basis.

</Turn>


<Turn speaker="Waleed" timestamp="31:28">

More reason to continue working in the same areas. Exactly. I think this is a beautiful scientific
area particularly because not only do we know nothing, but sometimes we think we know something and
we need to be reminded that we really know nothing. I think that's the most fun kind of place to do
science.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="31:44">

Talking about some specifics of resetting. There was also this other paper from Uber I think, where
they looked at how exactly you reset your model and how it affects your performance and they talked
about some results and understanding the Lottery Ticket hypothesis better. Can you talk about that
work a bit, briefly?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="32:02">

This paper is also going to be presented at NeurIPS this week and the team at Uber Hattie, Janice,
Roseanne and, and Jason wrote an excellent paper that followed up on the lottery ticket paper. They,
they had a number of exciting phenomena that they observed. One was that actually the initial values
don't seem to matter that much. It's really just the sign, whether the weight was positive or
negative. You can actually re-sample the initial values and as long as you maintain the same sign
for every initial value, then it works just as well. And this was very exciting. It was something
that I'd seen anecdotally and they did this very rigorously. So this is very impressive. The next
thing they observed is they tried a bunch of other pruning heuristics, including what happens if you
prune the smallest weights instead of the biggest weights. What happens if you prune the weights
that changed the most or increase in magnitude the most?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="32:44">

And they found that the magnitude increase heuristic, if I remember right, worked the best. It
worked a little bit better than actually just looking at the pure magnitude of the weight. So I
thought that was really exciting. The last piece was they discovered what they're calling the
supermass phenomenon. They noticed something I completely missed, which is that usually when you
randomly initialize a network, it has accuracy, no better than random guessing. So on a task like
MNIST or CIFAR 10 that has 10 classes to choose from, you just get about 10% accuracy plus or minus
a little bit. They noticed actually that these lottery tickets were getting better than random
accuracy, in fact quite substantially so despite not being trained at all just by choosing the right
pruning, you were getting much better performance and so they exploded this phenomenon and actually
tried what happens if you just try to train which weights you prune, so try to train a pruning mask
that determines which weights to keep and which weights to get rid of and they found they could
achieve, if I remember, it's something like 80% accuracy on MNIST just by finding the right ways to
prune without ever training the network itself, and this actually there's been another paper that
followed up on this on larger scale networks.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="33:44">

I think it came out last week where the authors, I believe they're at the Allen Institute showed
that actually you can get up almost state of the art full performance on image net by taking very
wide networks and just using a clever algorithm to figure out which weights to keep and which
weights to throw out. But otherwise keeping the random initialization. This was not something I
expected to emerge out of the Lottery Ticket work and not something I ever noticed. But really I, I
have a lot of respect for the team at Uber for the really careful research they did to make this
observation and exploit it and for the team at the Allen Institute who I think took it to the next
level.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="34:18">

Yeah, it does sound like a really exciting space. Lots of interesting work to do. And the thing I
wanted to ask you about is that in your initial paper you hypothesized that the winning tickets are,
which submit works would remain as winning tickets could somehow tell us about the inductor biases
that are required or the end tasks. Do you have any insights related to that?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="34:37">

Not a lot so far, unfortunately. In the end of the original lottery ticket paper, I outlined three
ways I imagined this might actually be practical. Way number one was perhaps we should take these
lottery tickets and see if they work on other tasks. Maybe they're expensive to find, but we can get
a lot of use out of them. Number two is maybe we can find ways to prune the networks early. I've
already mentioned I think examples of each of those and the third one is maybe we can actually look
at the details of the networks themselves and try to understand better ways of building neural
networks by looking at the structure of the networks, what inductive biases they might encode, what
the initializations might look like. And I would rate these in order from top to bottom as easy,
medium and hard. Looking at the inductive biases being the very hard part. You're trying to find
some statistical pattern in neural networks that are very expensive to generate, especially if
they're, you know, neural networks on real tasks. And so to me that's the very hardest part. It's
something that I would like to make more progress on but haven't found anything that's worth talking
about as of right now. Simply because you know, figuring out the right way to analyze a large
connection of neural networks, each of which has both different structure and different
initialization gets very tricky.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="35:41">

Also, there's some followup work on sharing the transferability of winning tickets across tasks and
whether the generalizability of these winning tickets is kind of like a prerequisite condition for a
specific subnetwork being a winning ticket. Can you summarize those two results please?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="35:57">

There have been a couple of studies that have come out on this. I think the most comprehensive is
from a team at Facebook and Ari, Hownon, McKayla and Yuan Dong found that you can actually take
winning lottery tickets that you found on one task for at least computer vision, train them on
another task, and actually they do surprisingly well. They don't seem to lose really much if any
performance. And in fact, what they generally found is you could take a winning ticket on a harder
task, say image net and then train it on an easier task, say places or CFR 10 or something like that
and you preserve the same accuracy that you got from the original network. In fact, I think they saw
sometimes the accuracy even went up from first finding a winning ticket based on a harder task and
then transferring it down to a slightly easier task.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="36:37">

And so to me this is very exciting. This says that it may take a lot of time, energy and expense to
find these lottery tickets, but once you found them, perhaps when we put out the next version of
Pytorch or TensorFlow, we should just ship a couple of lottery tickets for say that were founded via
image net or some very hard task. And you know, maybe we should be using those networks to train on
for a general purpose computer vision task. And this may give us a sparser network with a good
initialization. So to me this is actually the most direct way to exploit the lottery ticket
observations. The team at Facebook did a fantastic job. Just really extracting that insight and
taking it to the extreme, showing how much we can get out of it.

</Turn>


<Turn speaker="Waleed" timestamp="37:13">

I mean, I don't know of any efforts to define the tickets, so instead of just like defining it as a
set of weights in a given layer, define it as a more mathematical way so that you can generalize
across different sizes. For example.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="37:25">

I'm not aware of any to date, but theory has always been my weakness as a computer scientist, so I'm
hopeful that somebody will look at this from a more theoretical perspective. I will say that
personally, my research philosophy is that these neural networks show so many strange empirical
phenomena that we only observe on real networks, real datasets and generally at large scales that I
tend to prefer taking a very directly empirical approach to these things because I believe that
that's where we'll see phenomena that can later be codified and justified via theory. I tend to hang
out on the very empirical side and I'm not aware of anything on the theory side right now.

</Turn>


<Turn speaker="Waleed" timestamp="37:59">

I think that's fine. Still, the question that's in my mind is how do we take winning tickets that
work in a certain model configuration and try to use them in a different model configuration where
like the, maybe the hidden sizers are different.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="38:13">

Oh I see. I see. That, I've seen less of. I could imagine that perhaps you can build a network
around what you have. So add some new neurons that are simply fully connected. It seems like the
default assumption to make and so you have kind of a sparse underlying core to the network and you
could add components. I believe in the transfer learning setting, that's actually what they did
because in the transfer learning setting you may go from image net with a thousand classes to see
far with only 10 classes. So I believe they actually removed the last layer of the network and add
on a new last layer with a different size and just reinitialize it from scratch. And that worked
quite well. So I think there are definitely ways of taking advantage of this even when things don't
necessarily line up cleanly. Neural networks are so malleable that you can get away with a lot of
pretty ridiculous things like what I've done and they still work surprisingly well.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="38:55">

Great. Thanks a lot for summarizing your results and even talking about some of the follow up work
that came after your paper was published. Is there anything else that you wanted to talk about that
we may have missed?

</Turn>


<Turn speaker="Jonathan Franke" timestamp="39:06">

Oh, there's, I think one more thing, which is more of a philosophical note perhaps or a research
strategy note, and this was my first machine learning project, so to me, no, I, I feel like I won
the lottery and that this worked, but I feel like there were a lot of lessons I learned along the
way and two of them really that I would want to share with folks where we're both kind of scientific
and research strategy. I think there was something when I used to work on programming language
theory for my master's, my master's advisor used to tell me, find the smallest possible system that
exhibits the property that you're interested in, understand it there and only then do you scale up.
I think in machine learning we tend to be so obsessed with large scale that we're not willing to
start with very small networks.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="39:42">

You know, based on what I've said during our conversation, I think you both know that had I started
trying to run the lottery ticket experiments on image net, I would have had a negative result and I
would've stopped right there because it wouldn't have worked. And so the lesson I really took away
from this is start with very simple networks that exhibit the property. Perhaps they'll exhibit the
property spuriously and you won't find the property elsewhere. But we should be starting small where
we can do very rigorous science and only then working our way up to large networks where there may
be more complexity, more nuance, and also it may simply be too expensive to do the kind of rigorous
science that we really should be doing. The other big lesson I took away is I think what I mentioned
before that really in a sense, if you want to understand neural networks as they work in practice,
we have to be scientists about it.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="40:25">

I think that it starts with the empirical observations that we wouldn't have necessarily predicted
from the math, but we can justify once we go to the math. A lot of weird things happen when you
train a large neural network. I'm sure anyone who's trained a network has seen all sorts of strange,
surprising phenomena show up, many of which just seem to be emergent based on the complexity of the
data set, the complexity of the network, the scales that we're working with. And so to that end, I
think philosophically I think we should be more like physicists where we have theoretical
frameworks, we run experiments to look for new phenomena and then we have to try to figure out how
to integrate those phenomena and observations into our mathematical models of what's happening. So
to me the big lesson was there's a lot of room for doing good, rigorous science and sometimes we
have to work at smaller scales in order to be quite that rigorous given how expensive it is to work
at a lot of the large scales.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="41:09">

Great, thanks. Those are really important things to keep in mind. Thanks a lot, Jonathan, for
joining us and chatting with us and I learned a lot chatting with you for this episode. Thanks
again.

</Turn>


<Turn speaker="Jonathan Franke" timestamp="41:18">

Definitely. Thank you so much for having me.

</Turn>
