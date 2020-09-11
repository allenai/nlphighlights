---
title: "Translating Neuralese, with Jacob Andreas"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Jacob Andreas"]
number: "034"
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

All right. Our guest today is Jacob Andreas he will be talking to us about his paper titled,
Translating Neuralese and it's a paper co authored by him and Anca Dragan and Dan Klein. Jacob is a
superstar PhD student at UC Berkeley is generally interested in natural language processing problems
as a window into reasoning, planning and perception. The paper we're discussing today focuses on
using language as a prop for understanding model behavior. In particular, it tries to interpret
neuralese messages used to coordinate among decentralized agents by translating them into natural
language. So what's the motivation for this line of work?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="00:53">

So there's been a bunch of interests. I mean really going all the way back to like the early
nineties, but again in the last couple of years on learning sort of multiagent strategies in an end-
to-end way, right? So if I have some kind of system, like a bunch of Roombas that are all trying to
clean a room together or maybe a bunch of self driving cars or something and they all have to
coordinate somehow we might like to design or rather we might like to learn the communication
protocol that they use just from a task signal rather than trying to design it by hand. And so there
have been a bunch of different ways proposed for doing this. And if you want, we can talk about some
of the details about how that works. But basically the modern version of this thing, these just look
like big RNNs.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="01:38">

You have a bunch of little agents implemented as little neural nets and they're sending messages to
each other over some kind of vector value communication channel. And so these agents are all talking
to each other in this kind of language of RNN hidden state vectors. And it's natural after learning
one of these policies which you know, empirically work really well. Do you want to actually
understand what's going on and say like, what is the information that's being passed around between
these things? When do they say certain things? Why do they say certain things? And what's the high
level communication strategy that's actually being learned. And so that's the problem that we're
trying to solve here is given access to one of these kinds of pre-trained multiagent systems. That
use this communication. Can we take that communication and turn it into something that people can
understand?

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:26">

Do you think it's even really practical to be learning the communication? So like if I'm designing
some multi-agent system under what circumstances, like in, in a practical situation of what I really
want to learn the communication policy instead of just defining it apriori.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="02:44">

Yeah. So the self driving car example is actually probably a terrible example because anything
that's a safety critical application, you'd probably want to know ahead of time. What's actually
going on here. But no, I mean I think there are, you know, the kinds of examples that people have
looked at for these things are sort of strategic games where you might imagine, you know, if there's
some sort of auction for advertisements or something where some kind of communication phase ahead of
time where people report their values as useful, that it might actually be possible to automatically
learn more sophisticated strategies that people are capable of writing down by hand and even kind
of, you know, in non-safety critical robotics applications or like gameplay or designing, you know,
yeah. Agents for video game AIs or whatever. These kinds of things might actually be quite
effective.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:38">

So the paper focuses on deep communicating policies or DCPs, could you give me an example of a DCP
for those folks who are not familiar?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="03:47">

Yeah, so I mean, the simplest version of one of these kinds of policies that we're talking about
that you can imagine is something that plays a referring discretion game. And so this is something
that mostly gets used for analysis and gets studied a lot in kind of like a pragmatics and in the
COMPSCI community. But where basically I have two players. I have a speaking player and a listening
player. They're both going to see say two pictures. And the speaking player is told that it has to
refer to one of the two pictures and it's going to send some kind of message to the listening player
that's going to allow the listening player to identify the image that the speaking player was trying
to talk about. And so, you know, when people play this game, the speaking players literally
generating some kind of natural language description of the image that they're trying to refer to.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="04:34">

But you can also set up kind of a end-to-end neural models that, you know, the speaker slips up some
representation of both of the images produces some kind of hidden state vector, passes that hidden
state vector off to the other half of the model. And the other half of the model looks at the two
images and the state vector that it's received and tries to reconstruct what was going on there. And
you know, so in this kind of like one-step setting, you can think of auto encoders generically as
being these kinds of games. And if you unroll these over multiple steps, then you get the kinds of
things that people started to look at more recently in the literature where you can actually have
you know, sort of agents interacting in real time with each other.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:19">

Right. So a key contribution of this work is the framework that you came up with to compare the
messages used in a policy that uses deep learning, to messages used in a human policy. Could you
elaborate on this and walk us through the two kinds of visions used in this formulation?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="05:37">

Yeah. So the sort of what makes us an interest, you know, this is basically a machine translation
problem in the sense that I have messages in this neuralease language that my learn model is
speaking. And I want to be able to understand what's going on by translating those messages into
English. The problem is that unlike in a normal machine translation problem, we don't have access to
any kind of parallel trading data, right? So I have examples of my neural nets talking to my neural
nets and I have examples of people talking to people, but I never get to see paired data. And so the
kind of hard problem that we have here is to figure out how to build a translation system in that
setting. And basically what makes this possible is the fact that even though we don't have real sort
of parallel machine translation data we do know in some sense how these messages ground out in the
world, right?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="06:27">

That we get to observe, not just sort of vectors detached from any kind of context, but actually,
you know, sort of the message that my learned agents sent when it was in a particular state of the
world and the person that it was trying to communicate to, or the model that was trying to
communicate to was also in a particular state of the world. And so we can get examples of sort of
learned agents talking to learned agents and that grounding and then humans talking to humans you
know, if we get them to play the same kinds of games and the grounding that the humans observe when
they're generating those messages. And it's through that through that grounding in sort of actual
states of the world that we're actually there, we're able to build something that looks like a
translation system. And I can talk about how that is done at length.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:14">

Yeah, that's, that's interesting. I, guess I've seen a lot of work at least a few papers recently on
if I have two big piles of text in two different languages but no parallel text, how do I learn
translation dictionary between them? And this is kind of a similar problem to what you're looking at
in this paper, but I guess the difference is you have this external notion of some kind of grounding
in order to do this mapping. Can you tell us exactly how you view the grounding that lets you bridge
these two?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="07:46">

So actually before I do that to talk about you know, when in, sort of normal NLP, normal machine
translation settings, there's this kind of view of machine translation is decipherment where I sort
of know what my source text looks like and I know what my parallel text looks like, but I don't
necessarily have a direct model and I still want to learn a mapping between them. And there you can
do it. Basically by assuming that the language models look the same, that there's some sort of set
of things that are being referred to on the source side and the target side. And you know, that if I
could just kind of find the correspondence between some fixed source language model and some fixed
target language model then that would let me solve the problem. So when people mine for kind of
comparable corpora for doing these things in machine translation land or whatever that's basically
what's going on.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="08:41">

And I guess the other way in which the problem that we have here is hard is that we also don't have
comparable corpora. We can't assume that the strategy that our humans are using and our robots are
using are actually the same. And so even when in a particular state of the world, I can't
necessarily assume that my learn model is like trying to talk about the same thing that my human
agent is trying to talk about. And, that's what makes this difficult because it means that I can't
just kind of naively say, okay, well here's an agent message. Look at the messages that humans were
generating in the same state and try to directly learn a mapping between them even kind of
conditioned on the state. Precisely because, you know, it might be the case that playing some kind
of, well yeah, one of these like image referring expression games but the humans saying things like
it's a red bird or it's a yellow bird and the learned agent is saying something like, you know, the
third pixel from the top left has a saturation that's 126. And so you do need some way of of teasing
that apart. And so in particular, what we do is we take this idea that again has been like super
well studied in the sort of COMPSCI computational models and pragmatics community. Which is that if
I really care about getting some representation of the meaning of a message a good way of capturing
that is to look at the belief distribution that it induces in the person who listens to the message.
And so the sort of actual translation criteria that we built here is I start with the message that
the speaker sent. And rather than even really trying to recover exactly what the speaker state was,
what we tried to do is we build a model that takes us from that message onto the belief that a sort
of optimal listener forms about the state that the speaker might be in upon hearing that message.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="10:34">

And we can do that for our agents. We can do that for our humans when we have examples of humans as
well. And now we have a kind of common space of representations in which to do translation. This
common space of representation is basically the space of distributions that the listener thinks that
we might be in. And then we don't even necessarily need to assume you know, that our human agents
and our automated agents are choosing to talk about the same things.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:03">

Oh, here are we talking about distributions over observations or over actions that are possible in
this state?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="11:13">

Over observations essentially. I mean, you know, you can sort of do different versions of this
depending on whether your environment as a whole is partially observed or totally observed. You
know, the only reason that the agents should need to communicate at all is if there's some
information that's private to the speaker that the listener doesn't have access to. Whether those
two things together sort of tell you everything that you need to know about the environment or
whether there might be also further information that neither person knows about doesn't really
matter in this framework. But yeah, basically you can think about it as the speaker is going to see
some kind of feature vector and we want to compute the distribution over those feature vectors.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:59">

Yeah. Can you give an example of this to make it a little more concrete?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="12:02">

Yeah, so I mean, I think again in the the like simple one-step referring expression game is, is an
easy way to think about this. So what's the information that both people observe? They both observe
that there are these two images and then there's some extra bit of information that's visible to the
speaker, but not the listener, which is the identity of the image that we're actually trying to
refer to. And so in that case, the kind of distribution that you want to form is just a kind of the
distribution over how that bit has been assigned. So given that the speaker said it's the red bird
how much do I think it's the picture on the left and how much do I think it's a picture on the
right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:43">

Good. And I think in your paper you mentioned two different kinds of groundings and this is just one
of them, right?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="12:49">

This is one of them. Yeah. And then the more complicated one that we look at in the paper we have
this sort of challenging driving game where there are two cars that are both trying to get through
an intersection, but they can't actually see each other. And so they have to do as kind of a
communication to coordinate about how to crash or how to, sorry, how to get through the intersection
without crashing into each other. And so they are the kinds of belief distributions that you're
trying to form look more complicated because what the listener is trying to reconstruct is not just
you know, sort of is it the picture on the left or the picture on the right, but over all the
positions that the car might be that the other car might be in and all the other orientations that
the other car might be in and all of the sort of goals that it might have, the places that it's
trying to reach. As it crosses this intersection that's essentially the space of distributions that
that we're trying to learn in.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:39">

Okay. Is there any other way to look at what beliefs get induced by these messages? So this is
[inaudible]

</Turn>


<Turn speaker="Jacob Andreas" timestamp="13:47">

Yeah, so I mean, you know, one thing that you can do is to basically like sum of the outer max over
them or whatever in the course of sort of generating natural language translations of these things.
But if you actually want to see sort of visually what beliefs are getting induced you can, right. We
have a model. The way we compute these representations is we have a model that picks up an utterance
in English or in neuralese or whatever, and that picks up a state of the world and tells us the
probability of that state of the world given the utterance. So we can just sample a bunch of states
of the world and then only keep around the ones that are assigned high probability by a particular
utterance or a particular neuralese message. And then that kind of collection of states that your
mind in that way gives you some way of kind of visually inspecting the kinds of belief, different
distributions that you're forming. And so, you know, again, in the referring expression setting,
what you kind of want to happen there is that that puts most of its maps on the right image and not
on the wrong image and in these kinds of driving games that you wind up with a coherent clusters of
states.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:01">

Okay. So I guess then what you're saying is we know that a translation of a neural message into
English or some other language is good if it induces if both messages induce the same kinds of state
representations, beliefs about states in the listener of each of these respective languages. Right?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="15:24">

That's exactly,

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:24">

And in your paper you also presented a different way of defining a good translation based on what
actions the speaker might take. Is that right? Like you had, the speaker view and a listener view.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:38">

I guess the symantic view I think was the one that you're adopting in the paper and there's the
pragmatic view of what makes for a good translation.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:49">

You want to tell you want to tell us about the second one?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="15:51">

Yeah, so I mean basically, well, yeah, kind of like you just said, you know, if we're trying to
generate translations that are grounded out in some kind of task with some kind of associated reward
function you can either say, well, in fact, you know, in some ways the most natural thing to say is
that what we actually care about optimizing with this translation criteria is the reward that our
two agents are obtaining together on this task. And so there's a kind of, yeah, like behavior
oriented view of translation that says like, I don't actually care about what meanings are at all.
Whatever it is that the robot just said. If I have a robot and a human working together, the
translation that I generate for the human should just be the thing that makes the human most likely
to do the thing that will maximize the reward whether or not they actually form a correct belief or
believe the right thing about the robot. And so we have a little example in the paper that basically
shows that there are circumstances where you can do that, where the thing that you have to tell the
human to maximize the reward. Even like given a sort of what the robot thinks is a truthful message.
Your translation winds up totally lying about the meaning of the message that you're trying to
communicate. And so, you know, if we were really doing these things in task-oriented settings you
might still maybe want to go out and do it that way, but from the perspective of doing interpretable
AI and really kind of understanding like what's the information content of these messages and what's
the strategy that the agent is employing. We decided to focus more on these kind of explicitly
belief oriented ways of doing translation.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:39">

Yeah, that makes sense.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:40">

All right. So are the representations are the messages used in the neuralese policy? Are they
assumed to be continuous? Or are we assuming that there's some discrete set of symbols?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="17:57">

Yeah, so here all the message space is continuous right. And this is you know, we're kind of,
there's two lines of work on this learning communication stuff. There are a couple of papers that
just say, let's treat these things as kind of structurally big RNNs with weird conductivity patterns
and just learn the communication via back prop. There's a whole other line of research that focuses
on learning discreet communication protocols. These mostly have kind of more of a, again, if a kind
of COMPSCI or evolution of language flavor, they're really fiddly to get to train and you have to
work very hard to get you know, any kind of sensible structure and even very, very simple languages
at all. With a lot of these kinds of discreet codes, you know, and I guess I'll just say again, our
motivation with this really is about understanding the kinds of systems that are used are likely to
get used in the real world. And to the extent that learning these continuous message spaces is a
much easier thing. These seem like the more interesting kinds of systems to study from that point of
view.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:07">

I'm looking at the equations in your paper in section five where you talk about how you actually
decide what is a good translation, we've been talking about the intuition for what makes a
translation good. You have some math that formalizes this. And I'm wondering if it makes sense to
try to explain that in podcast form. I don't know if you want to do that for us?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="19:29">

Really. It's like the math is actually not that complicated, right? It's basically, you know, once
you have the core intuition that what makes a good translation is that it induces the same belief in
your listener as whatever message that you started out with. You know, there's some work you have to
do. Just getting to kind of a, what's the right notion of the distance between beliefs that you
might induce in a listener when your beliefs are represented as probability distributions and then
how do you actually compute that thing efficiently? And I don't think, you know, we have a
particular solution to that in the paper, but I don't think the details are particularly important
or even necessarily like the best way of doing it. But it was, you know, kind of the first thing
that you write down once you have this sort of core intuition about how to go about doing
translation.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="20:25">

Other sort of mathy things in the paper. I mean, one of the cool things is that even though, you
know, we talked about the difference between doing translation in a way that kind of respects the
truthfulness of beliefs and translation. In a way that optimizes performance in a downstream
listener on the actual task of a word function. And even when we take the sort of let's get the
beliefs as good as possible perspective rather than the let's make the reward function as high as
possible perspective. It's possible, they're like very, very easy proofs that you can do to show
that you're not going to do too bad on the downstream reward function even when you're not
optimizing it for optimizing for it explicitly, as long as you make kind of reasonable assumptions
about how smart your listener is.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:17">

Yeah, that's cool. So can you tell us how well this actually worked?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="21:22">

Yeah, so I mean we've talked about some of these tasks a little bit already, but we're looking at
three different games in this paper. Two of the games are these kinds of like single step referring
expression games. One is the kind of simplest possible version of this where the things that the
speaker might be trying to refer to and things that the listener is trying to resolve are just
colors. So basically they observe, you know, some like RGB or HSV triple or whatever. And that's the
whole space in which the communication game takes place. We moved from there to a real referring
expression game with photographs of birds. And then finally, the last thing that we're looking at
here again, was this a two player driving game where these cars are trying to get through an
intersection without crashing into each other.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:11">

So the goal of the of this work is not to improve the performance of the coordination. It's rather
to measure how well can we do by interpreting these messages. So what metrics do you use in order to
evaluate this?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="22:32">

So the way we think about evaluating these kinds of problems is, one, you know, we have this
criteria of can we, are we inducing the correct belief about the state that the speaker was in? And
so that's something that we can actually evaluate directly in that we can sort of take a message
that the speaker sent, we can strip away the context and then we can show our model a bunch of
states that the speaker might have actually been in and see if it can correctly guess you know,
where the message actually came from. And if you are correctly representing the semantics of these
messages you should be able to do that reasonably well. And the cool thing is once you do that, just
for this kind of representation function that you have you know, sort of, can I get from an earliest
message back to states?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="23:23">

I can now evaluate a translation model by saying, okay, I'm going to take this neuralese message,
I'm going to translate it, and then I'm going to see if I can get from that translated message again
back to the state in which the neuralese speaker who didn't know that this was going to get
translated into English the state that that model was in. And so one of the evaluations that we do
is just how well can you reconstruct these things? And the answer is actually like pretty well for
all of the different tasks that we were looking at here. And in particular you do a lot better,
maybe unsurprisingly in this setting by explicitly doing this kind of belief oriented view of
translation rather than learning a direct mapping from neuralese messages to natural language
messages that happen to have been entered in the same state.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="24:14">

The other evaluation that we look at is this downstream task performance thing. So even though it's
not something that we're optimizing for explicitly, you know, we have some theoretical evidence that
we should be able to actually do well with respect to the reward function on the downstream task.
And so the way we do this, is we, you know, we've trained our robots to only play the game with
other robots. We've trained our humans to only play the game with other humans. We then take a robot
and we hook up the translation layer in the middle and we let the robot talk to a human by way of
this translation layer. And we see how well playing this game together by the translation layer they
actually do. And then you can do it in the opposite direction also for these kinds of asymmetric
games where, you know, maybe other human speaking in a robot listening.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="25:03">

And there again you do quite well in the referring expression games. There are conditions under
which you can actually do better in that setting than humans do speaking to other humans because the
robots managed to find a better strategy than the humans come up with on their own. And then that
strategy survives translation. The story is a little bit more mixed in the driving game where you do
substantially worse than, you know, either humans playing with humans do or robots playing with
robots, but still much better with this kind of belief oriented way of doing translation than with
something more direct and more like a classical machine translation model.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:42">

That's interesting it looks like you can actually translate pretty well when you have this given
grounding. I guess that makes me think a lot of other kinds of, people are thinking a lot these days
about interpreting neural models because they're really quite opaque a lot of the time.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="25:57">

Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:58">

Do you have any thoughts on how you could push this forward to actually interpret other kinds of
neural models where you don't have some strong notion of grounding that you're leveraging here?

</Turn>


<Turn speaker="Jacob Andreas" timestamp="26:10">

Yeah, I mean, so for any neural model, right, there's some notion of grounding, which is just you
know, you have your input data which is some representation of some kind of world state and your
output data. Right? And you know, once you have the kind of like referring expression game view of
these things, there is a, it's like maybe a little weird, but you can take this very expansive view
of what it means to play one of these kinds of referring expression games and say, I can take any
neural net that I have and chop it in half in an arbitrary place. And think of the value that gets
computed in that last layer on a given input as the message that the first half of the neural
network, which is some kind of speaker sends to the second half of the neural network, which is some
kind of listener.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="26:57">

And you can actually use these same kinds of techniques to come up with some sort of representation
of what's actually going on there. And you know, all that's really saying again is that like I have
some kind of neural representation that's computed and you know, one way of asking how do I
interpret what this network is doing is to say, by the time I get to the Nth layer in this network,
what information about the input has been, has the network decided is irrelevant and has discarded.
And what like extra information has it imputed about the input that might not be easy to compute
from sort of raw surface features in a straightforward way. And so you can play the same game,
right? If saying, okay, well here's some you know, neural net hidden vector, give me the
distribution over training data. That might have given me something that looks close to this
particular vector I've come up with. And then if you care about getting out of natural language
explanations, rather than just visualizing sort of collections and training examples, you can do the
same thing that we're doing here and saying, okay, now what sentence do I have to produce to give me
the same distribution over training examples,

</Turn>


<Turn speaker="Matt Gardner" timestamp="28:09">

Right? When you mentioned cutting the network in half and treating that as a message, I guess if you
really want to use the same method that you used here, you'd have to also get humans to write
language corresponding to it or as a message in a similar spot in the network, right? So you can
actually do the translation that you did in this work.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="28:30">

Right? But the cool thing is that for a surprisingly large number of tasks that we care about, that
kind of natural language data is either easy to collect or already exists. So if you think about you
know, doing image recognition, for example you know, we have these huge image captioning datasets,
which are all about pairing photographs with natural language strings. And that's exactly the kind
of data that you potentially need to learn one of these sorts of models.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:00">

Interesting.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="29:02">

Well, thank you. This was a very interesting paper very different than most papers we read in NLP
conferences. I wonder if you'd like to give us a very brief description of the following the next
paper that you published in the same direction of interpreting deep representations in NLP the paper
titled:Analogs of Linguistic Structure in Deep Representations.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="29:32">

Yeah. So this is actually very closely related to the thing that we were just talking about here of
can we sort of apply these techniques to more general machine learning models. And so what we did in
the EMNLP paper is take a kind of vanilla conditional sequence auto encoding tasks, it doesn't
explicitly have any kind of communicative component. You just have some kind of labeled input. You
have an RNN that slurps up your labeled input and then tries to reconstruct it again. And what we're
doing here is we're using basically the same technique that we were using in this paper to try to
understand what the hidden representation that you know, lives between the encoder part of this
model and the decoder part of this model, what that representation looks like. And what's cool is
that for the particular task that we're doing here, we again have these kinds of natural language
annotations, but they're like, the data is, you know, without going into too much detail is all
about compositionality and we have, you know, sort of people using negation and conjunction and
disjunction.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="30:44">

And we have ground truth logical annotations for all of the natural language utterances in this
dataset. And so this means that you know, in this paper we're really building something that looks
more like a phrase dictionary than a general purpose translation model where, you know, at the end
of the day in my driving game or my referring expression game, all I'm doing is saying like, here's
a whole message that I saw a human send before that seems to give me the right belief distribution.
In this new paper we can actually look more explicitly at the structure of these message spaces and
say that, you know, not only can I translate, you know, some particular vector into some particular
natural language string, but I can find the hidden substructure. I can say the way this vector does
this is there's this like negation operation on the outside and then, you know, these two primitive
attributes of the world are being referred to on the inside. And the kind of amazing thing is that
even though this thing has been trained without natural language data at all, you can find structure
in this vector space of messages that looks a lot like kind of familiar compositional structures
that we have in natural language.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="31:50">

Perfect. Thank you very much for the for introducing this paper, I am looking forward to read it.
And thank you again for joining us for this recording.

</Turn>


<Turn speaker="Jacob Andreas" timestamp="32:00">

Yeah, thanks a lot.

</Turn>
