---
title: "Transition-Based Dependency Parsing with Stack Long Short-Term Memory"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "005"
tags: []
description: "https://www.semanticscholar.org/paper/Transition-Based-Dependency-Parsing-with-Stack-Lon-Dyer-Ballesteros/396b7932beac62a72288eaea047981cc9a21379a"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F323402967&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:13">

All right. Today's paper is Transition-Based Dependency Parsing with Stack Long Short-Term by Chris
Dyer, Miguel Ballesteros, Wang Ling, Austin Matthews, and Noah A. Smith. These are folks at CMU.
This is an older paper. This was ACL 2015 about two years ago now. And to motivate this paper, I
think it's good to start off with transition based parsers in general and how it is that they work
and how they make their decisions. So to do dependency parsing, you try to decide essentially for
each word in a sentence what's its head. And you can do this and shift reduce or transition based
dependency parsing by starting with the sentence in a buffer and then doing a sequence of either
shifts or reduces.

</turn>


<turn speaker="Matt Gardner" timestamp="00:58">

And so you have a buffer and a stack. A shift moves a word from the buffer onto the stack and a
reduce will pop two words off of the stack and create a link between them a head child's
relationship or dependency between them, possibly with some label associated with it. And in this
way, just by doing a sequence of shifts and reduces, you can build up a dependency tree from a
sentence. And so if this is the model of parsing that you want to use,the key thing that you have to
figure out is how do you model the state of the parser such that at any point you can decide whether
you should shift or whether you should reduce. And from the early days of shift, reduce dependency
parsing, what you would do is take the parser state, which includes everything that's on the stack,
everything that's on the buffer and all of the things that you've done so far and hand engineer some
features based off of this.

</turn>


<turn speaker="Matt Gardner" timestamp="01:55">

Like, maybe look at some suffixes of the first word on the buffer or the part of speech tag of the
first and second words of the buffer or the thing on the stack or the last action that you took and
encode these as one-hot features and learn weights associated with them in some kind of linear
model, which you would then use given any particular states to decide, should I shift or should I
reduce? This is how things worked for a long time. There's a lot of research that I'm sweeping under
the rug there, but that's the general idea.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:24">

So how did the neural network models improve on this link of work?

</turn>


<turn speaker="Matt Gardner" timestamp="02:30">

So the earliest neural nets took these feature representations, these one-hot features and embedded
them. So you still essentially had hand engineered features. Just instead of them having one-hot
representations, they would get an embedding so that you could learn, for instance, that if you're
part of speech tag is NN that's similar to the part of speech tag NNS. And so you could share some
statistical strength between the features that you get. So it's not, the feature information isn't
quite as sparse as it was previously.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:01">

And yeah, and substantial improvements came out of this embedding so Danqi Chen's paper is
considered a milestone in dependency parsing in that sense.

</turn>


<turn speaker="Matt Gardner" timestamp="03:13">

Yeah. And then after that, the natural question is how far can you take this idea? What can, what
else can you embed like can we get rid of these hand engineered feature representations entirely?
And so I view this paper that we're looking at today. This is a bit of a long intro, but we're now
finally at this I'll call it the stack LSTM paper. This idea is like the natural extension and
conclusion of how much of the parser states can we embed. And essentially what they do is they
develop a representation where we can just take the entire state of the parser, everything on the
stack, everything on the buffer and the entire edge action sequence and put it into one big neural
net that gives us a single vector at the end of features that we can then use to decide should we
shift or should we reduce? So Waleed. You are in this group while this work was going on. You were
Chris's students as we found out last time. So do you have any insight on like the development of
this work?

</turn>


<turn speaker="Waleed Ammar" timestamp="04:13">

Yeah, this actually was a very exciting time in the group and Miguel Ballesteros was joining us as a
post doc. He knows a lot about dependency parsing and this style of parsing and Chris Dyer was
starting to work on neural networks and deep learning. And we noticed that there is a gap in the
libraries that are currently used for that at the time were used for doing neural networks using
neural networks for NLP. Which can be summarized by saying that the graph the computation graph for
the neural network must be specified beforehand which doesn't really fit many scenarios in natural
language processing. So the simplest cases that different sentences will have different lengths, but
also the tree structure when you're doing parsing will be different depending on which sentence
you're parsing. So this give rise to the development of the CNN library which is now called DyNet.
But at the same time, yeah, so Chris and Miguel came up with the idea of the staked LSTM parser
basically as a pure model that doesn't use features to do side parsing.

</turn>


<turn speaker="Matt Gardner" timestamp="05:48">

Yeah, that's interesting. So if we talk about the specifics of this model a little bit, there are
three different components of the parser state. There's the stack where as I said before, you shift
things from the buffer onto the stack and then you can pop stuff off and push it back onto the
stack. And so on the stack, you get these tree structures, it's not just single words. Each element
on the stack could be a sub tree and eventually will be the entire parse tree. The buffer is just a
sequence of words. And the action state is just a sequence of actions. And so it's pretty natural to
think of an RNN, as just a simple recursive recurrence network encoding the buffer and the, the
action sequence. But the stack is tricky. How do you get fancy representations of what's on the
stack because each of these things is it's own tree structure. And this is one thing that seems
particularly hard to do in frameworks other than something like DyNet that allows you to do
computation graphs. So it seems like a natural fit that this was developed in the same place that
these dynamic computation graphs were.

</turn>


<turn speaker="Matt Gardner" timestamp="06:54">

So the stack LSTM is essentially like a recurrent neural net except you can push and pop stuff off
of it. And so there's a pointer to the current top of the stack. And if you push something on the
pointer moves, if you pop something off the pointer goes back. And so it's, it's essentially a
recurrent net but you've lost anything that's been popped off and that's how the stack is encoded.
And then to get the final parser state that you decode from or you predict shift and reduce, you
just concatenate the representations of the stack, the action sequence and the buffer. And that's
the model. Hopefully that makes sense. It's a little bit hard to talk through this without a figure,
but we will try to get better.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:37">

Yeah. If there's a screen in front of you might want to look at figure two in the paper as Matt is
describing it.

</turn>


<turn speaker="Matt Gardner" timestamp="07:45">

So this is an interesting innovative model. Do you know much, I don't follow parsing all that much.
I think you follow it a little bit more than than I do. Do you know much of what's happened since?
This is two years old.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:57">

So I stopped working on dependencing parsing since I came to AI2, but one important development has
been Google's paper which was titled: Globally Normalized Transition-Based Neural Networks. It's
written by Daniel Andor and folks at the Google, New York office. Yeah, the interesting thing here
is that they came up with a method for globally normalizing the model. So the paper that you have
been describing really makes a local decision and we know from a long history of work in natural
language processing that it's much better to to do global normalization.

</turn>


<turn speaker="Matt Gardner" timestamp="08:43">

So one interesting issue with this, there's a whole lot of research in this direction that we're not
going to talk about right now, but I can give you a little teaser. This parser does a sequence of
shifts and reduces and it's trained a gold sequence of shifts and reduces. So at training time, you
have a parse tree. You deterministically convert this into a sequence of shifts and reduces and you
train the model. The model is essentially trained where each state action pair is a training
example. And so what this means is that training time, it never sees a state where it's made a wrong
decision. And so being able to recover from this at test time, it's not going to have a set of gold
action sequences. And so it's going to get into positions that it never even saw at training time
where it has bad decisions on its state. And so figuring out how to train the model in this kind of
situation is tricky. And globally normalizing is one way to try to handle this, this general class
of problems.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:42">

Right. Another approach people have considered is using reinforcement learning methods. That's
exactly the kind of problems that reinforcement learning methods are meant to solve.

</turn>


<turn speaker="Matt Gardner" timestamp="09:53">

Okay. I think that's good enough for this paper.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:58">

Thank you. Matt for talking about this paper. Next time we'll talk about Design Challenges for
Entity Linking a paper by Xiao Ling, Sameer Singh, and Daniel Weld at the University of Washington.

</turn>
