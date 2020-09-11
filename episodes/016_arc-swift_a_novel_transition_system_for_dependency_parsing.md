---
title: "Arc-swift: A Novel Transition System for Dependency Parsing"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "016"
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


<turn speaker="Matt Gardner" timestamp="00:11">

All right. Today's paper is titled Arc-swift: A Novel Transition System for Dependency Parsing. This
is a short paper at ACL 2017 by Peng Qi and Chris Manning at Stanford University. To motivate this
paper, we should first back up a little bit and talk about transition based dependency parsing in
general. We've talked about this a few times before on this podcast. The main idea is I want to go
from a sentence to a tree over that sentence where the tree, it shows dependency relationships
between the words. So the root of the tree is generally the main verb of the sentence. And that verb
will have dependency edges to say it's subject and its object if it has propositional phrase
attachments.

</turn>


<turn speaker="Matt Gardner" timestamp="00:58">

All of these you need to, to construct this tree in order to show the dependency relationships
between the words. And the way that you do this is you initialize some transition based parser. You
can think of this as like a finite state machine, essentially that it's state is initialized by the
word that it sees in the sentence. And then it takes actions that incrementally build up the
dependency tree. So the actions might shift. Let me, let's back up even a little bit more. So the
actions at a high level will connect words like head words to their children possibly with some
label. And the way that parsers actually do this is by maintaining a couple of data structures
called a stack and a buffer. And the actions typically boil down to shifting things from the buffer
to the stack so that you can delay head decisions.

</turn>


<turn speaker="Matt Gardner" timestamp="01:57">

And then after you've pushed enough things onto the stack, you can pop some off and connect them and
possibly push it back on depending on the particular transition system that you're using. So the
first transition system that was introduced for this kind of transition based dependency parsing was
called Arc-standard. And here there are three actions. One is shift and the other two are related
they're left attach and right attached. So what a shift does is you take a word from the buffer and
you put it onto the stack. So in a simple sentence like "They told him a story." The first action
that you'll take is a shift and you'll move "they" the first word on the buffer onto the stack. And
then the other actions that you can do are left attached and right attach.

</turn>


<turn speaker="Matt Gardner" timestamp="02:45">

And both of these actions will pop two things off of the buffer, off of the stack, connect to them
in some relationship, either with the left word or the right word being the head, depending on which
action you picked. And then it will pop that, push the head back onto the stack. So for, "They told
him a story." Again, you're going to shift twice. You'll put "they" and then "told" onto the stack
and then you'll do a left attach where you pop off both "they" and "told" you'll say that told us
the head with the label subject and you'll push told back onto the stack. And then you push him and
then you reduce him and make it the indirect object. And then you push a and then story and then you
pop off a story, you attach the story, you put story back and then you pop off told and story and
you attach, told to story.

</turn>


<turn speaker="Matt Gardner" timestamp="03:32">

And it's probably hard to follow this in audio. But that's okay. So we've done this series of shifts
and reduces in order to in order to construct this dependency tree. Okay. So the tricky thing about
this is that when, you can't attach a child to its head until that child is finished until it has
all of its dependents attached to it. Because when you do this left or right attach, that child is
going to be gone because you only push the head back onto the stack. You can't attach anything else
to it. And so this can make modeling hard because you have to delay some attachments until all of
the node's children are finished. And maybe in some cases you don't want to do this because it'd be
easier from a modeling perspective to make some attachments earlier rather than later.

</turn>


<turn speaker="Matt Gardner" timestamp="04:28">

And so this motivates this different transition system called Arc-eager, which I'll spare you the,
like detailed walk through on this one, but it adds, it changes the behavior of left and right
attach so that they can be done earlier and adds a reduce operation that just pops something off the
stack without actually making an attachment. So that in this case you can attach things to their.
You can attach heads to their dependents even if the dependent isn't done yet because later I can do
a reduce and get rid of it because I've already finished. Hopefully that makes sense. So Waleed, I
know you've done a bit of work with dependency parsing with a bunch of papers on, I guess
particularly multi-lingual dependency parsing. But do you have any insight on Arc-standard versus
Arc-eager? Which one should you use?

</turn>


<turn speaker="Waleed Ammar" timestamp="05:21">

So I actually asked people who are experts on this. So Miguel Ballesteros told me that for some
languages arc-eager works better and for others arc-standard works better. It's not clear where we
should use which so it seems to be an open problem.

</turn>


<turn speaker="Matt Gardner" timestamp="05:41">

I guess that now we finally arrive at the contribution of the paper that we're talking about today,
which is a new transition system called Arc-swift. And so for both of these transition systems that
we just talked about, you're only ever allowed to make pretty local decisions about which
attachments you make. That is in order to attach two words to each other, they either have to both
be on top of the stack or one word has to be on the top of the stack and one word at the beginning
of the buffer.

</turn>


<turn speaker="Matt Gardner" timestamp="06:13">

And so you have to delay some decisions, some attachment decisions until you get to this state. And
then you can attach things and then you can do shifts or pops or reduces or whatever in order to get
the next attachments decision into the right place so that you can actually make the attachment.
What arc-swift does is it says; I'm allowed to attach the top word on the buffer to any other place
in the stack. I can look as far down in the stack as I want in order to make an attachment. And this
saves you from having to delay these modeling decisions and lets you make the decisions earlier,
which is why it's called swift, I guess. You can make faster decisions about dependency attachments
and hopefully spend your modeling efforts better. Instead of trying to make the model decided like
how long do I have to wait before I can actually make this attachment? It can just make the
attachment as soon as it thinks it can.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:06">

So when you actually make it, that's when you remove the dependent from the stack?

</turn>


<turn speaker="Matt Gardner" timestamp="07:12">

Yeah. You do pop off the thing that you just attached to the stack. There's some detailed
constraints on exactly what you're allowed to attach things to with these left and right attachment
decisions. That would be a little complex to try to describe in this podcast. But the high level
point here is that you're making, when something's at the top of the buffer, you can, you can attach
it to anything on the stack. And so you can make non-local decisions which let you attach things
earlier and have a better model. So one example they gave is "I ate fish with ketchup." versus "I
ate fish with chopsticks." In the first case you're eating fish and ketchup, or fish with ketchup.
And so ketchup "with ketchup" should attach to fish. Whereas in the second case, I ate fish with
chopsticks "with chopsticks" is the manner in which you're eating fish and so it attaches to ate in
transition systems when you're looking at the word with in arc-standard and arc-eager, or you have
to know should I shift this or should I attach it immediately? And in order to do that, you have to
know things about ate and fish and the word that's coming next. And so the featurized, like the
decision you have to make requires some non-local information, but you're only making a local
decision. So it's kind of a mismatch between the transition system and the modeling that you have to
do. Whereas in this arc-swift when you decide the with, when you're looking at with, you can just
make the attachment decision to attach it to wherever it needs to be directly instead of having to
delay the decision in some cases.

</turn>


<turn speaker="Matt Gardner" timestamp="08:53">

So they evaluate this on standard dependency parsing datasets and show that they get the differences
seem tiny. But that's just with that's true of dependency parsing in general, cause the numbers are
already so high, they get like a 0.4 or so percent improvement when you use a model, like when you
use this new transition system with the same model versus the old transition systems.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:24">

This is which languages.

</turn>


<turn speaker="Matt Gardner" timestamp="09:27">

So they evaluated on Penn Treebank in like with PennTreebank converted to Stanford dependencies and
some English universal dependency dataset. So yeah, they only evaluated on English here. And they
have some analysis on in which kind of dependence this helps most with. And you do better on
prepositional phrase attachment and conjunctions with the arc-swift in particular than you do with
the previous dependency transition systems.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:00">

So that's great. These are the hardest things to, parse. So even if we make a little bit of progress
on these hard problems, that's so valuable.

</turn>


<turn speaker="Matt Gardner" timestamp="10:11">

So ya, this was a short paper. So a short episode but I thought it was an interesting little piece
of work. I guess I've thought a lot about transition based models in general because we just built a
semantic parser that takes a series of actions. And so thinking carefully about what those actions
look like, what actions are available to you is really important, a really important modeling
decision. And so this is a nice contribution giving a new transition system to a very well studied
problem and showing a significant though somewhat small gain.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:46">

Thank you for presenting this paper Matt. Next time we will talk about a paper titled: pix2code:
Generating Code from a Graphical User Interface Screenshot.

</turn>
