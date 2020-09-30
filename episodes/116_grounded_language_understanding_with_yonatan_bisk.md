---
title: "Grounded Language Understanding, with Yonatan Bisk"
hosts: ["Matt Gardner","Pradeep Dasigi"]
guests: ["Yonatan Bisk"]
number: "116"
tags: []
description: "We invited Yonatan Bisk to talk about grounded language understanding. We started off by discussing an overview of the topic, its research goals, and the the challenges involved. In the latter half of the conversation, we talked about ALFRED (Shridhar et al., 2019), a grounded instruction following benchmark that simulates training a robot butler. The current best models built for this benchmark perform very poorly compared to humans. We discussed why that might be, and what could be done to improve their performance. Yonatan Bisk is currently an assistant professor at Language Technologies Institute at Carnegie Mellon University. The data and the leaderboard for ALFRED can be accessed here: https://askforalfred.com/."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F851220814&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello, and welcome to the NLP highlights podcast, where we talk about interesting work in natural
language processing. The hosts are Matt Gardner and Pradeep Dasigi from the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:11">

Hello everyone. Today for this episode, we are chatting with Yonatan Bisk. We wanted to talk about
grounded language understanding Yonatan Bisk is currently an assistant professor at Carnegie Mellon
university. Welcome to the podcast Yonatan.

</turn>


<turn speaker="Yonatan Bisk" timestamp="00:25">

Thank you so much. This is exciting and fun.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:27">

We wanted to talk about grounded language understanding and we wanted to do an overview of the topic
first. And then we wanted to talk about your recent benchmark ALFRED (Action Learning From Realistic
Environments and Directives), before we get there. Can you please tell us what exactly you mean by
grounded language understanding?

</turn>


<turn speaker="Yonatan Bisk" timestamp="00:45">

Yeah, so I think it's a pretty broad term and at the risk of being somewhat controversial, I would
sort of classify it as basically any time that you're using, let's say NLP tools outside of the
context of just text. And so specifically, most of my work is going to look at connecting that maybe
to action taking or some amount of images, but it's sort of a broader question, right? So I think
that if you throw to people like a lot of Joyce Chai's older work on, for instance, gaze and gesture
or LP Morency's work on reading facial recognition faces and how they're emoting. And those are all
aspects of language, which are sort of not coded for in the text. And so grounded language
understanding means that you are understanding language you're processing language while privy to
all of those additional signals. And therefore also in a sort of broader notion of semantics then
maybe was accessible. If you were just looking at text.

</turn>


<turn speaker="Matt Gardner" timestamp="01:43">

I have a question on that, I've thought of grounded understanding, like, to me, it seems reasonable
to talk about grounding one piece of text in the context of another piece of text, and this is not
like some extra textual signal, but it is like separate from the original text that you're doing.
And I'm wondering what you think about this.

</turn>


<turn speaker="Yonatan Bisk" timestamp="02:03">

Yeah. So this is sort of the standard fun little debate that I find myself in, which is if grounding
simply means that you're connecting language to some meaning representation, then there's nothing
about that meaning representation that's required to be for instance, multimodal, but colloquially.
I think most of us when we're using it are talking about grounding as in the world and where the
world is, the sort of perceptual world that humans have. And if we want to sort of jump
philosophical for a second, I think that what's interesting about this discussion is that if you
were to ask people colloquially, how language is learned or understood for like a child, they would
talk about the importance of, you know, building Legos and pointing to things and stuff like this.
But then when we talk about what's required for language learning or understanding in NLP, we're
like, Oh, well, if you had a database, that's probably fine. And I think that sort of
philosophically, we're just maybe falling on two different sides of that, where those of us doing
sort of more, the multimodal side tend to try to align the research agenda to that same intuition we
have about children. Versus I completely agree with you. If I wanted to build a rich QA system, then
grounding to a database is probably sort of the sufficient or right approach.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="03:18">

That makes sense. You did briefly mention some of the tasks that people have been working on that is
that can be called grounded language understanding, but can you give us a more concrete examples of
some tasks and what the high-level research goals that are in those tasks?

</turn>


<turn speaker="Yonatan Bisk" timestamp="03:35">

Yeah, there's a couple of things that have gotten pretty popular in sort of the last few years,
which I can touch on before I do that. I think maybe pop up a level and say like sort of the way I
tend to view the space is if I think of, for instance, roboticists as my customer, and I'm an NLP
person, what tool can I hand them? What sort of package could I hand them that they could actually
use? And right now the answer to that is basically that I don't have one because what we're seeing
is that this sort of semantics doesn't match. And so whether it's the sort of really foundational
work of like Stephanie Tellex or Cynthia Matuszek, who were trying to do language instruction
following with robots, or some of the more recent work in navigation and simulation, this kind of is
the Matterport room to room. things like this.

</turn>


<turn speaker="Yonatan Bisk" timestamp="04:23">

It's not clear that the semantics that you get out of even the largest pre-trained model for left
and right are different colors or you know, simple action taking actually correspond to something
that's useful for grounding in the real world. And so that's the disconnect and therefore the space
of tasks is actually quite broad because I think if we're thinking about the idea that someday we'd
like to have, which is also the motivation for ALFRED someday, we'd like to have a sort of robot
butler in our house, what are all the possible sort of intermediaries and semantic issues that
you're going to run into when you're trying to bridge that? So to make that more concrete for you?
Yeah. So there's definitely the entire community for instance of human robot interaction, which is
asking this question, which is how do I actually connect language to control their control, meaning
potentially even a real valued outputs, like motor control kinds of things.

</turn>


<turn speaker="Yonatan Bisk" timestamp="05:18">

And then you have this sort of more recent sort of popular space where it's a little easier to
taskify, if you will, which is navigation and simulation or sort of the visual question, answering
visual common sense types of tasks. And those are I think, important prerequisites to that larger
goal, but they're also more popular at the moment because it's just easier to run a leaderboard than
have a robot and have a human actually interacting with it. And so that's maybe kind of a broad
answer to the question, but I can dive into any of those more deeply if you want.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="05:54">

Yeah, let's talk about the mismatch in semantics. I that's quite interesting. Can you give a
concrete example there? And you can maybe talk more about it.

</turn>


<turn speaker="Yonatan Bisk" timestamp="06:03">

There's sort of a couple of classic examples and I want to caution that some of these examples are
changing because obviously these technologies are changing rapidly. The sort of my favorite one, if
we were to go back a few years would be the fact that we've always known the antonyms and synonyms
in embedding space were hard to distinguish, and we didn't really spend a lot of time on that in
NLP, but it's actually really important if you're going to turn left versus turn, right. Or it's
really important that colors not get lumped together because they're actually sort of orthogonal in
a lot of contexts. If I'm saying I want the red one versus the blue one, those are antonyms. It
doesn't matter that they're both. It does matter that they're both colors in the sense that it may
be constraints my search space a little bit, but it doesn't, they're not interchangeable.

</turn>


<turn speaker="Yonatan Bisk" timestamp="06:47">

And so those kinds of things have meant that we can't sort of take something off the shelf and hand
it to someone who's doing actual, you know, manipulation or interaction. And this is sort of,
there's another level to this, which is a little bit more nuanced, perhaps, which is that most of
the time when we think about action taking, and this is true in simulation, and it's true in the
context of generating semantic parse or whatever is that we think in terms of discreet output
spaces. And so as language people, we think, Oh, I've got discreet input, I'm doing discreet output.
But if I really wanted to connect down to a robot whether it was manipulation in the sense that I
have a hand is going to grab something and I have to control every single joint of that arm and
those fingers or whether it's an actual robot, that's a mobile robot that has wheels.

</turn>


<turn speaker="Yonatan Bisk" timestamp="07:40">

Then you're actually not outputting discreet actions at all. You need to output motor torques. And
so how do you convert the concept of left into a certain amount of motor torque? How do you convert
the concept of opening into a sequence of motor control actions that cause you to let's say grab the
top of a Coke bottle and the bottom with a hold steady and twist that conversion is nontrivial. And
I think the argument that I would typically hear from an NLP person is, but I don't care. Right.
Because what does it matter that there's a sort of these fine grain distinctions that's on the other
side of a sort of conceptual API boundary, if you will. What I care about is that I'm opening or I
care about is that I've turned or something. But I think that to this comment about semantic
mismatch, you actually do want a lot of that information.

</turn>


<turn speaker="Yonatan Bisk" timestamp="08:32">

If you want to know if something flows or not, you want it like a liquid. You want to know if
something is deformable or not the fact that you know, that you can fold a blanket or that the fact
that you know, that you can more easily crush a empty water bottle than a full water bottle. That's
all meaning that really should be in the representation for full water bottle versus empty water
bottle. So how am I supposed to get that information? If I don't have access to the control, if I
don't have access to the manipulation. And some of this I realize is pie in the sky. I'm not trying
to argue that everyone go out and buy a robot right now and switch their entire research agendas.
But, more just to recognize that there's a lot of meaning that we have access to in these word
representations. When we talk about in this case empty versus full, that you don't have access to if
you're simply pulling from text or even if you're grounded, but you've abstracted away, the
manipulation aspects.

</turn>


<turn speaker="Matt Gardner" timestamp="09:30">

Yeah. I guess what, what seems to me that as one who has not really thought about these issues, all
that much is that the hard question is what is the right abstraction layer to think about these
problems? Because clearly, like you mentioned opening a bottle where like you grasp the bottom and
twist the top or something, and that presupposes a particular robot with actuators and our language
representation or whatever like, if you want to grab something off the shelf, it's going to have to
be robot dependent. If you want to use it at that level.

</turn>


<turn speaker="Yonatan Bisk" timestamp="10:00">

Yeah. This is, you're absolutely correct. And this is part of what I love about this space. And this
is also why this is so hard. I just had a conversation last week at a CVPR panel with Jana Kosecka
about this, where she was basically saying the number one problem that we have is that we don't know
what the right sort of abstraction barriers are between these levels and how to learn them, because
it's not just that the specific actuators, which is, would you brought up, it's also the specific
bottle opening, a wine bottle is a different thing. Opening a cabinet is a different thing. And
language is full of these kinds of situations where we're really not talking about control. We're
really talking about post conditions. When we say to turn left, we're not even really saying that
you should act execute the action left.

</turn>


<turn speaker="Yonatan Bisk" timestamp="10:50">

What we're really saying is get your body into a space such that it is now, you know, satisfies the
condition left, right? If you turned right three times, that would also be fine. So this sort of
understanding of how do we transition between those things and this really fascinating question, I
think to me, is how do you learn those abstractions in the first place? And just to ramble for a
little bit longer on this particular point, I'm going to sort of throw to a really nice transition
that I think we've seen for instance, out of Yoav Artzi lab, where a lot of his work, which is
really foundational in the semantic parsing space has transitioned to this continuous control. And
that's because increasingly it becomes harder, like you can't justify those predicates. So the
predicates that we were so good at getting language to map to it turned out, we couldn't necessarily
implement on a device.

</turn>


<turn speaker="Yonatan Bisk" timestamp="11:40">

And so therefore we had chosen the wrong abstraction as language people, and we needed to sort of
learn from the real world. Don't know what that looks like. I think one thing that I've been trying
to do at least talk in terms of XYZ coordinates. So if I sort of, I don't know how your robot arm is
going to get to this position, but I do know that the object is at least at said position in space.
So that's kind of a little bit closer throwing a little bit of a bone, but yes, this is a key
question. And if we want to go really philosophical, the open that we're talking about here is still
more concrete than the open of opening a conversation, or I think it's like so the fact that we're
able to use the same word at all these different levels is another fascinating question bout this
space. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="12:29">

Interesting. I like the connection you made with Yoav's switch from like what you might call
traditional semantic parsing into this like construction following. I feel like I've kind of done
the same thing where I've gone from translating questions or language to like database queries to
trying to operate on open domain paragraphs. And there you need like something like a neural module
network or something similar that tries to expand this a little bit, just an interesting connection,

</turn>


<turn speaker="Pradeep Dasigi" timestamp="12:55">

Right? I mean, many of the examples you gave so far are about say robots interacting with some, some
sort of an environment is that generally the high-level goal of most of these systems where you have
an agent interacting with an environment and you have some rewards coming from it. Is that usually
the right abstraction?

</turn>


<turn speaker="Yonatan Bisk" timestamp="13:14">

Yeah. I, you know, I don't want to speak for people in general. I like to joke that we all really
wish we just had a terminator we could raise our own child and that's going to require a few new
technological advances. But yeah, I think fundamentally it's that we want; a robot is just a mobile
computer that can actually not just move through the world, but ideally can, can affect the world.
And that's the goal and that just requires different language that being said, I don't want to
dismiss, for example, some really fundamental work that's being done on sort of multimodal
representations, which maybe doesn't have a direct application there yet. So it's not the case that
we have solved fusion. So just because you have a, you know, the pen-ultimate layer of a ResNet
model that's detection, and you have the CLS token embedding from Bert, doesn't mean that
concatenating them means, congratulations, we're now multi-modal, and we've done everything.

</turn>


<turn speaker="Yonatan Bisk" timestamp="14:15">

For all intents and purposes. You may still basically be turning, let's say the vision signal into
symbols, and then sort of doing some similar kind of simple manipulation on it. Or you may be
solving a task, which doesn't actually require that much information out of the visual signal. So
there's this more basic perhaps machine learning question, which is how do you actually do multi-
modal fusion? How do you build representations that are enhanced by both where information flows
both directions, and we don't have answers to things like that. And those types, that type of
research, oftentimes doesn't have an actual robot or doesn't have sort of a large scale image
resource that is maybe working on, but I still think it's really important to the larger question.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="14:57">

Yeah. Okay. Makes sense. And I guess I'm beginning to realize that grounded language understanding
as a topic as much bigger than I had originally imagined. So that's good. I guess it's a more
general definition. And also, I think, I guess I had imagined when we talk about agents versus
environment agents working in environments, that kind of a setup, we usually think about some sort
of reinforcement learning learning paradigm, which is not generally applicable to all grounding
problems probably, right?

</turn>


<turn speaker="Yonatan Bisk" timestamp="15:30">

Yeah. I don't think of it as, I don't think they are sort of at odds or necessary it's there, it's
just, it's one, it's one technique that makes sense in this space. I think the reason that we think
of RL in grounded environments is again, related to this issue of representations. We don't have the
luxury typically of actually training successfully from scratch. So if we take something like
locomotion, we really don't want to, okay. you can imagine for instance, that we set up a task,
which is that I'm going to have a language instruction paired with an agent walking. And if I set
that up as a purely supervised task, where even in the best of case, I collect 10,000, 20,000
examples, that's really not going to be enough for me to learn the locomotion. And so what does RL,
what does self play enable?

</turn>


<turn speaker="Yonatan Bisk" timestamp="16:19">

It enables the agent to build some A-linguistic or pre-linguistic primitives, which we can then
attach language to. And I think this is not dissimilar from what we expect to get out of a child,
right? So the child has some notion of the world it has some notion of gravity. It has some notion
of the, maybe the pets that it's interacted with, things like this long before it gets the label for
those things. And so it's really just a question of how much prior knowledge you are allowing the
agent to build up versus assuming that you're gonna be able to learn all that at the same time as
language. And in generally speaking, that latter approach is just not going to be as successful.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="16:57">

Great. Yeah. I think that's, that's generally a pretty good overview of grounded language
understanding and yeah, that was useful for me to hear. And let's talk about ALFRED, the specific
benchmarks that you've been working on, and you even have a workshop, ECCV where it's sort of like a
shared task group. So can you give us a high-level description of what exactly is an ALFRED and what
systems built for ALFRED need to achieve?

</turn>


<turn speaker="Yonatan Bisk" timestamp="17:24">

Yeah. So I'm going to try to be sort of as honest and transparent about its limitations as possible,
because I think that what we're trying to do with ALFRED is one baby step in this direction of this
larger goal, right? So we named it ALFRED because it's this sort of butler paradigm. So if we all
want these household butler robots, that there's a long way to go from, the only really commodity
robot right now is a Roomba. So if you think of, if we're at Roomba level and we want butler level,
we've got, we've got a pretty big gap there. And so then the question became what are a couple of
sort of component technologies or abilities that are important along the way there. And so we
decided to focus on both extending the existing kind of navigation paradigm. That's been really
popular in simulation to having a little bit more interaction, specifically, having a notion of
things like post conditions or immutable state changes.

</turn>


<turn speaker="Yonatan Bisk" timestamp="18:22">

So the fact that something can go from dirty to clean the fact that something can get cut or cooked,
these are important. And we can talk about some of why that is in a second, and then also moving to
a longer horizons. So in the room to room navigation, which has been sort of really important for
this work in the last couple of years, we, if I recall correctly, the average trajectory length is
something like six or seven steps. So the mapping from the language to the action is actually not, I
don't want to say it's not hard. We've all worked on it quite a bit, but it's comparatively, maybe
simple when you think about how many sort of smaller steps actually need to be taken if you had a
robot that was moving through the world. So maybe getting a little bit too into the nitty gritty
there.

</turn>


<turn speaker="Yonatan Bisk" timestamp="19:10">

So let me pop up a level and say that the paradigm is you're in the Thor house environment, you're
in one of the rooms you have randomly instantiated objects and positions, and you have some high-
level goal described in language and some lower level goals described in language that you need to
accomplish. And the example I use is typically something like put a clean Apple in the fridge. We as
sort of, as humans can take that and even though we haven't been in this kitchen, even though we
haven't seen any of these things can instantiate a basic program in our minds, I'm going to need to
find an apple. I'm probably going to need to run an underwater in the sink. I'm going to need to
turn off the water. I'm going to need to put it in the fridge. And so then the question is how do we
train systems to do that, including simplified manipulation and keeping track of their progress

</turn>


<turn speaker="Matt Gardner" timestamp="19:58">

Just really quick. You mentioned Thor that I don't think has been explained, and that's just a
simulated simulated environment built with a game engine.

</turn>


<turn speaker="Yonatan Bisk" timestamp="20:06">

That's right. That's right. So AI 2 Thor is a unity game engine based simulated environment where
they've got custom assets that have been built for a bunch of different rooms. So we've got; there's
living rooms, bathrooms, kitchens, bedrooms, and maybe forgetting something. And then there are
certain objects that occur in one versus the other. So towels in the bathroom and apples in the
kitchen, things like this. And these are all articulated in the sense that for instance, a cabinet
can open an Apple can be picked up things like this. And so this is different from, there's a lot of
really awesome simulators that look specifically at the navigation task. And so they're interested
in having sort of a really good visual scene, but maybe not one that you can actually poke around
in. And so that's sort of the key sort of step here in terms of moving towards a real robot.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="21:00">

We'll talk about the specifics of how exactly the dataset was constructed a little later, but can
you describe to us how the ALFRED dataset is different from prior grounding datasets?

</turn>


<turn speaker="Yonatan Bisk" timestamp="21:12">

Yeah. So it's really the fact that we're dealing with these longer horizon interaction changes. So I
hesitate to sort of jump to low-level too quickly here, but let's just take a couple of features. So
if we have to actually move around a grid, that's not as realistic as motor control in continuous
actions, but it is more realistic than being able to hop to another sort of location in the world.
So it means that all of a sudden, even something as simple as walking to the counter is, you know,
takes several steps and you need to keep track of, Oh, well, when I'm turning, I can no longer see
the counter, but that's okay. I'm still sort of on route to it. So how do I sort of maintain state?
How do I remember what I'm doing?

</turn>


<turn speaker="Yonatan Bisk" timestamp="22:00">

The fact that you have state changes that can't be reversed is also an important component. So if I
make a mistake and I cook something, I can't uncook it, which means that this whole episode is just
a failure. And that's different from, if you think about a standard navigation domain where I can
always sort of reverse and back up. And that allows me to do things like search in that space that I
can't do in the real world. And the sort of maybe third part is that we tried to structure it
specifically around pretty common robotic tasks. So the simplest of which is called "pick and
place". So it's just literally what it sounds like. Can I pick something up and can I put it in a
specific location and then then building from there? So for instance, if you have a receptacle, can
I pick something up?

</turn>


<turn speaker="Yonatan Bisk" timestamp="22:51">

Can I pick an Apple up, put it in a bowl, then pick up the bowl with the apple and place it in the
microwave, things like this. And these sound very simple and conceptually they are, but each time
you do this, you have an extra interaction component, which is harder. How do I select the apple?
How do I select the faucet? And you have an increasingly long trajectory, which is also somewhat
rare in this space, which is that I have maybe the same amount of language texts, but I have a lot
more low-level actions I need to perform. And this is again, just trying to bridge that gap towards
the realism. We're still not at the level of fine grain that would be required if I actually had a
hand that was, that had to go grasp the apple, but it's a step towards that.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="23:36">

Right? So you mentioned navigation and how it's the grid based navigation. that's in ALFRED, right?
And the paper makes a, between grid based or discreet navigation versus graph based navigation. Can
you tell us a bit more about that? What exactly does it mean?

</turn>


<turn speaker="Yonatan Bisk" timestamp="23:53">

Yeah, so graph based is kind of an unintuitive term, but the it's actually something we're all
familiar with. it's basically a Google street view. So when you're in Google street view, you
clicked next, you basically hop to some, some future point and you hop at a point in a way that is
much larger granularity than if you were to actually walk there. And so in our case, again, still a
simplification, it's a grid. So now it's maybe 10 steps instead of one step to do that hop. And then
in an ideal case, it would be continuous. Right. So it would be really, you know, infinitely fine-
grained.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="24:27">

Okay. Okay. Yeah, that makes sense. And the other interesting distinction that the paper mentions is
egocentric versus a third person, visual observations. So is that about how much of the environment
agent can see?

</turn>


<turn speaker="Yonatan Bisk" timestamp="24:42">

Yeah. So I'm going to maybe make two distinctions because so first of all, everyone who's working in
the simulated agent space is thinking egocentric. And so first let me maybe motivate why egocentric.
And then the second question is basically how well instrumented that is. So egocentric is because
again, that's a more realistic setting. So if you imagine that you wanted to have a robot which had
perfect vision of the entire kitchen, and you wanted to do that in the real world, that would mean
setting up cameras all around the entire kitchen, maybe the entire ceiling kind of if you're
familiar with sort of the Amazon go grocery stores, it's that style of model, which is you just
have, I mean, it's amazing the number of cameras that are in there to get you from every single
view.

</turn>


<turn speaker="Yonatan Bisk" timestamp="25:29">

And that is awesome. It allows you to have basically perfect localization of everything. But if we
now, consider for instance, when, when we're cooking or when we're grocery shopping or do something
like something with our own two eyes, every time we turn our head, everything disappears. So there's
this really important memory component, which is that like, if I was looking at a dish and then I
turned to my cabinet, I can't forget where the dishes I have to have that in a mental model, I don't
have perfect sort of localization of it anymore. And so how do you build models that are able to do
that? Now we're not unique in that space, but one of the things that people are thinking about
adding both to ALFRED and that exists in some of the other navigation is an in between state.
There's an argument here that if you're going to build a simulated agent, while it may be
prohibitively expensive to instrument an entire house with cameras, it doesn't necessarily make
sense on the other hand to limit it to be, as I dunno, as simple as humans are.

</turn>


<turn speaker="Yonatan Bisk" timestamp="26:29">

So just because humans only have two eyes doesn't mean a robot has to only have two eyes. So why
can't a robot, for example, in the way the self driving car has 360 vision have have that. And so
that still means that things occasionally are, things are not necessarily visible. You don't have
all angles, but you do have a much wider sort of panoramic view. In our current version, we don't
use panoramic views, but I know that some people are working on those extensions and that is pretty
common in the navigation space. And so that way you can see behind you and things like this. So
these are some of the decisions.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="27:02">

Can you give an example of a problem in ALFRED that makes it challenging to perform with an
egocentric view?

</turn>


<turn speaker="Yonatan Bisk" timestamp="27:11">

Yeah, I mean, I think it's basically just any time you're looking for something, this is maybe a
little bit hard to do without visuals, but let's imagine that I want to walk to the counter. And so
I see the counter in front of me, but there's a table that's blocking my path. So in order to, in
order to get to the counter, I'm going to have to turn away from looking at it so that I can walk,
let's say to my left, and then I'm going to turn and then so that I, and now can see it again, but
then I'm going to turn to my right in order to get in front of the table and then turn. So there's,
let's say 50% of those navigation actions are ones where the counter that I am aiming at is not
visible. If I have panoramic vision, I do have to, it's not trivial. I can now see where the counter
is at all times, but I do need to reconcile that with my heading. And if I have an overhead
bird's-eye full, perfect vision, then it's sort of trivial it's because I know exactly where I am. I
know where everything is. And so that's the distinction, that's the spectrum,

</turn>


<turn speaker="Pradeep Dasigi" timestamp="28:12">

Right? Yeah. let's talk about what exactly is an unfair down the specifics of how the data set has
bent. So I know that I've read that ALFRED comes to this language directors paid with expert
demonstrations. Can you describe how exactly a little bit?

</turn>


<turn speaker="Yonatan Bisk" timestamp="28:27">

Yeah. So the idea there is that we're going to define things in terms of post conditions. And this
is kind of throwing a bone to that earlier conversation we were having about kind of, what is the
goal of language and such. So if we define some post conditions, which are, for example, that using
what I said earlier let's say there's a clean apple in the fridge. Then I should really throw also
mentioned, which I haven't, apologies up until this point. So Mohit Shridhar is the first author and
and gets the most credit for all of this. And so what he implemented there was this a planner that
could basically have perfect knowledge of the world. And so therefore could go through a series of
discrete actions in order to accomplish some, some post conditions.

</turn>


<turn speaker="Yonatan Bisk" timestamp="29:12">

So you would say, I need a world configuration such that there is an apple, which has a flag set as
clean, and a location set is in the fridge. And so now what are the sequence of steps that are
required to do that? And so you have to, he uses a standard PDDL planner here, but you could imagine
any number of ways to try to get that trajectory.

</turn>


<turn speaker="Matt Gardner" timestamp="29:33">

What's PDDL? What does that stand for?

</turn>


<turn speaker="Yonatan Bisk" timestamp="29:36">

This is one of those pieces of homework I should definitely have done. It's a planning domain
definition language. So basically you have to specify the set of actions that can be taken in this
universe. You have to sort of specify the set of success conditions, and then you can think of any
standard standard planning algorithm that you learned about in intro to AI. So now you're just
running that through this space in order to, get a trajectory in particular, get the shortest path
trajectory.

</turn>


<turn speaker="Matt Gardner" timestamp="30:05">

So in the end, we are, you do have to pick some abstraction and map language to that abstraction in
some way.

</turn>


<turn speaker="Yonatan Bisk" timestamp="30:12">

Yeah. And exactly. And in this case, it's basically the set of API calls and that's, we can get into
this more in a second, but we've tried to use that where necessary and then avoid it where we can.
So for example, you could imagine that one of your API calls would be pick up apple, and it would
just sort of magic the apple into your hand. That's something that we tried to avoid, and the way we
did it was with pixel level masks. So the way that you actually select an apple is that you produce
a binary mask on the image on sort of what you're seeing, and you outline the thing that you're
going to interact with. And then we use basically, if the majority of what you've selected is an
object that object gets the pickup action in this case. And that takes you a tiny step closer
towards manipulation.

</turn>


<turn speaker="Matt Gardner" timestamp="31:03">

This is really interesting to think about. I've studied a lot recently on generalization in semantic
parsing. So we are mapping language to these sequences of actions. They're not in like a simulated
space, they're in like a grammar production space, but it is very related. And what we find is that
the closer your action space is to like predicate argument, structure and language, the better you
generalize. For instance, if turning left requires a long sequence of incremental like manipulation
steps, then my model will, will tend to memorize that long sequence and generalize poorer, the
longer the action sequence, the harder it is that I generalize to new combinations of things. And so
like this, hearing you talk about this? It makes me think, well, actually it might be nice to have
like a pick action predicate, pickup, apple predicate, at least in the middle I like that in the
end, the data, as you described, it requires grounding to something more fundamental, but still from
a modeling perspective, it probably would be useful to have something higher level in between that
you then plan from to those lower level things.

</turn>


<turn speaker="Yonatan Bisk" timestamp="32:16">

I completely agree and I think without circling back too much to the beginning of this conversation,
one of the reasons I love this space is because of these discussions about abstraction is because it
makes it so clear that when we say like put a clean apple in the fridge, you can instantiate an
abstract program right now that would be executable in any kitchen. And then there's this of A, how
did you formulate that sort of intermediary representation and then B, how did you then convert that
into something that was more explicit and explicit here, again, being at various levels. So being
more explicit, meaning you could now instantiate something that includes an action, like grasp
apple, but that's still not as explicit as if you were in a physical kitchen and you had to instruct
someone to actually perform this. And that would be different if it was a small child that maybe
needed to use two hands versus it was you who could hold it with one.

</turn>


<turn speaker="Yonatan Bisk" timestamp="33:13">

So you actually have the ability to take this abstract concept or this abstract goal, and just
really ground it to the appropriate scene and the appropriate agent and move through these levels.
And how do we build those and how do we, where do they come from? Is it our job to define them? That
seems maybe problematic. And so my inclination is to say that this is ideally something that's a
little bit more emergent. It's something that once we've done a lot of manipulation, we start to
recognize some similarities. And so we realized like, Oh, every time, someone talks about going to
the left, it's sort of this region, or it's the sequence of motor control actions. There's sort of a
hole that I can sort of define of space that would be considered left. And so maybe now I've kind of
induced that concept. I now have that abstraction and then I'd like to sort of work up from there,
but yeah, certain point, this gets AI complete. And I don't have, I'm not going to make any claims
about how we actually do this.

</turn>


<turn speaker="Matt Gardner" timestamp="34:11">

Yeah. And I think the fundamental point here is, is like at the end of the day, you don't want to
hard code in the dataset, these particular decisions about abstractions. And so I really like that.
You're going down to like pixel maps. And so you're saying methods can compete. It's an even playing
field. If you find some intermediate abstraction layer helpful, then that's really interesting. You
can demonstrate it, but if you don't want to do it, then that's fine. And, and any method at all
that can solve the problem, it can compete here.

</turn>


<turn speaker="Yonatan Bisk" timestamp="34:41">

That's yeah. A hundred percent. And these, and these pixel level masks jumping around a little bit
are quite difficult. So it turns out our favorite example of this is, so one of the beautiful things
in Thor's that they've actually created sort of unique assets for every room. So even though they're
the same in the sense that there's an apple, in let's say every kitchen, they've actually gone ahead
and sort of drawn and constructed a model for a new apple in the case of something like a microwave,
most microwaves look pretty much the same, so that if you can draw the pixel level mask for one
microwave, you can do it for another, in the case of a sink faucets, they're all over the place. And
so the process of realizing that, Oh, this one has a long gooseneck and this one is sort of a flat
rectangle and this one has the lever attached to the faucet. And this one actually has two little
knobs that are sort of set aside from it. That level of generalization is also fascinating, right?
Because we're were saying like, you don't actually just get to have the concept turn on the water.
You need to figure out what about this metallic surface is functionally necessary to do that.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="35:53">

Yeah. Good. Talking about the abstractions, I think brings us to our next point of contribution.
ALFRED comes with two levels of language directives, the high-level actions and the low-level
language directives. So are the low-level ones, those which correspond to the actions that the agent
has to take. Can you tell us more about that?

</turn>


<turn speaker="Yonatan Bisk" timestamp="36:13">

Yeah, so they're much closer, to what you would think of as navigation. So what exists, excuse me,
in the navigation space. So let me see, I can pull up an example really quickly. We've got something
like here's a goal, which is to put a clean sponge on a metal rack. This would take place in a
bathroom. And then the lower level instruction is going to correspond to every sub goal that's
necessary to achieve that. So there's a sentence which is "go to the left and face the faucet side
of the bathtub". So I have to understand what the bathtub is. I have to understand what the faucet
is. I have to understand what it means to be on the left of it, but it's fundamentally just a
navigation instruction. Then I have, you know, "pick up the leftmost green sponge from the bathtub."

</turn>


<turn speaker="Yonatan Bisk" timestamp="36:55">

So now I have to localize between the objects that are in front of me. I have to choose the one I
left. These are reasonably low-level, and we're going to do this first. So that's the picking up
it's then the turning to where I'm going to actually place it. It's the putting it down so on and so
forth. And so, yeah, we're annotating at both of those levels so that the lower level is much closer
to what currently exists in the literature, but the higher level annotation is there because that's
obviously what we would like to be able to handle. And that enables hopefully some future research
on, bridging. How do you sort of instantiate plans from abstract goals?

</turn>


<turn speaker="Pradeep Dasigi" timestamp="37:32">

Correct. So ideally you'd like the agent to just get the high-level actions or high-level goals and
be able to perform the low-level actions with our expert supervision there. Right.

</turn>


<turn speaker="Yonatan Bisk" timestamp="37:43">

That's right. And I think that's just because obviously if we had a butler robot, that's what we
would, we would want. And right now people aren't going to do that because they don't actually have.
So if you were talking to a robot who we've run in other work, we've run some experiments where we
ask these kinds of things of annotators. And if you tell them that you're interacting with a robot,
they get really low-level really quickly because their mental model of that agent of that
conversational partner is one that doesn't understand anything it's, you know, or we've done
something similar where we ask if you were to explain, for instance, cooking to a child. And so then
all of a sudden you're very explicit about what things in the kitchen are hot and like what tools
you need and things like this. And so we really want to mirror that here, which is that if current
research is assuming that we have an incredibly naive sort of maybe even more so than a child, that
we're a sort of agent that we're talking to, how do we move to the point where we're talking to an
"adult", where we're talking to someone who, where we can just specify the goal and have them
understand the environment and the world enough to actually accomplish it.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="38:45">

Again, talking about the concrete process in which this data was generated. You had a high-level
actions, which are essentially down plates of actions that are applied to specific objects, specific
object categories right. And you had expert demonstrations from AI-2 THOR which was then used to
generate the language directors using crowdsourcing. Correct. So how were the expert demonstrations
produced?

</turn>


<turn speaker="Yonatan Bisk" timestamp="39:14">

So those are from this planner. So yeah, so what we did was we would take, we again, we want to have
some abstraction and generalization is sort of the key. That's always sort of the goal in the
background. So we take something like, I'm just glancing at the environment. And so off the top of
my head, I'm putting a book on a desk in a specific bedroom. This is a very general simple concept.
So now what I'm going to do is I'm going to instantiate that in many bedrooms. So I'm going to say
like, if you understand what it means to put a book on a desk, and then it shouldn't matter, the
orientation of all the objects in that room, then what I'm going to do is even within that specific
room, I'm going to instantiate it three times. So all the furniture is going to stay the same, but
the various other distractor objects are going to move around where the book starts is going to move
around. Because again, if you understand the goal that really shouldn't matter.

</turn>


<turn speaker="Yonatan Bisk" timestamp="40:06">

And then for each one of those individual instances or random, initializations, we're going to
annotate it three different times, because if you, again, repeating myself, but if you understand
the goal, then like three different phrasings of that same task and that same environment really
shouldn't be a problem. And so what you end up with is for any specific, what we call tuple. So any
specific high-level goal, including room, you're going to have basically nine language
instantiations, you're going to have three different room initializations and each of those three
different annotations, all describing the same thing. And so as much as possible, ideally, an agent
is going to be able to see that, and it's gonna be able to connect those pieces.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="40:48">

Yeah. I'd like to move on to the models that the baseline models built for ALFRED and what you hope
to see and the competition that is being held at ECCV. But before we get there, I had a quick
question about the dataset details. So the crowdworkers were shown just the expert demonstrations,
right. They were not given the high-level goals and they would ask to annotate the language
directors given expert demonstrations. Right?

</turn>


<turn speaker="Yonatan Bisk" timestamp="41:17">

Right. So we broke up the entire video into these sub goals, which is why there is an instruction
for each piece. And then we also had them provide this overall. Right. And so we don't have answer
your question in advance. We don't have issues, people sort of misunderstood, what the goal was, we
do have some cases where they've maybe misidentified one of the objects. So for example, a simulated
egg and a simulated potato look the same apparently to a lot of people. And so we do have some
things like this, but nothing that would therefore sort of fundamentally change the, you know, the
goals or things like this. And that's because these are very simple. I can sort of rattle them off,
but it's pick something up, put it somewhere, stack something and put it somewhere, put two of an
object somewhere, clean, something, heat, something, cool, something, or examine something in the
light. So the last one is simply bringing something over to like a lamp and turning on the lamp so
you can see it better. So they're quite simple kinds of tasks.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="42:21">

Thanks. Let's talk about the baseline models that were built for ALFRED. Can you give us a brief
overview of the class of models that were tried?

</turn>


<turn speaker="Yonatan Bisk" timestamp="42:30">

Yeah. So I'm going to preface this by saying that what we've done is not brilliant. So this is sort
of seq-to-seq style baseline that's in the paper. And some people have, I think, have been working
on various ways to extend this. The, let me break down what those pieces are. So I'm going to try to
do this, I guess, by timestamp. So if you have a visual scene, you have some image that you're
looking at in front of you, you build some, some summary vector of that basically, and you're now
need to decide what you're going to do next. So you have a language instruction and you have some
history of what you've done up until this point. And you're going to use, your hidden state, for
instance, in this case of like this seq-to-seq model. So you have some hidden state from the
previous timestamp to re-weight the language instruction.

</turn>


<turn speaker="Yonatan Bisk" timestamp="43:20">

Keeping in mind, right, that the language instruction here as we've been noting is a full paragraph.
So the vast majority of the instruction is no longer relevant or is not yet relevant. So what about
what I've done up until now? It was going to let me sort of isolate what the actual next instruction
is. I'm then going to, so combine my previous action, my rating of the language and my visual
perception to update my hidden state and predict the next action to take. If the next action is
something like putting an object somewhere, picking up an object, then you also have a deconvolution
to predict this pixel level mask for the environment. If it's something like navigation, then there
is no mask. And so therefore that's ignored that part of the output is ignored. And so what we've
proposed there is pretty simple. And then what we've tried to do is tack onto it, some of the best
practices that we've seen from the navigation world, the single biggest innovation in that space
being this notion of a progress monitor.

</turn>


<turn speaker="Yonatan Bisk" timestamp="44:21">

So the really hard thing, or one of the really hard things again, is that if you have an entire
paragraph of text and you've got these very rich visual signals that you're getting, you know,
dozens of you have to learn these correspondences. And so having this auxiliary loss that basically
helps you learn that alignment has been proven pretty useful. In our case, we can do this in a
couple of ways. So we can do this in terms of raw actions. So you can imagine every single time I
take one step I've progressed, you know, some percentage towards completion, or we can do it at the
level of sub goals at the level of post conditions. So having washed something I've actually sort of
accomplished a, major step, which is maybe more significant than having taken one or two navigation
steps.

</turn>


<turn speaker="Yonatan Bisk" timestamp="45:08">

And so we play with both of those as auxiliary losses to help kind of regularize the attention. And
we do see some, benefits there, but full disclosure, because it's really obvious when you look at
our results, our models are terrible. And so there's a huge gap there. And part of it is that again,
that technology was a progress monitoring, I think is really important, but it's also how do you
retrofit it to these much longer instructions and to these much larger action spaces and so forth.
So it's not as simple as when you were simply trying to learn an alignment on eight steps in a
standard navigation. And so we have quite a long ways to go there on that front. We have a long ways
to go on these predicted masks. So the difference between our performance in a seen environment
versus an unseen environment, pretty dramatic. So there's a number of places where there is some
pretty obvious issues that have to be addressed,

</turn>


<turn speaker="Pradeep Dasigi" timestamp="46:06">

Right? What's the average number of steps for instance, in ALFRED?

</turn>


<turn speaker="Yonatan Bisk" timestamp="46:11">

So I think it's roughly 55 though I would, I should read my own paper to get you something more
accurate. Yeah.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="46:19">

I guess the point here is that it's a fairly big number for many of these models.

</turn>


<turn speaker="Yonatan Bisk" timestamp="46:24">

Yeah. And then the language instructions I think in terms of tokens is over a hundred on average. So
again, I think that this is one of these things, which maybe I'll harp on for one second, because I
think that if you're used to seq-to-seq models in the context of, for instance, machine translation,
you might be thinking like, all right, this doesn't really sound that bad, but we really do have a
lot of difficulty in this sort of multimodal space of figuring out how to do those alignments off of
those of those ResNet features. And those are very rich like 2000 to 2048, you know, or more
vectors. And so there's a lot of little things that a model can overfit to very quickly. And so
learning actually how to do this properly has turned out to be quite difficult for the literature at
large.

</turn>


<turn speaker="Matt Gardner" timestamp="47:10">

I might've missed something earlier when you were describing the dataset, so when you said there
were like a hundred tokens in the language, I was expecting more like 10 or less because you were
talking about high-level goals, I guess when you say they're like a hundred tokens, you mean, you
have, you said, you've got annotations for like the individual steps. And so this is like the
concatenation that you're talking about?

</turn>


<turn speaker="Yonatan Bisk" timestamp="47:30">

That's right. That's right. Yes. Correct. So the high-level goals, I think on average are less than
10 you're absolutely right. But then the sort of full paragraph of instructions, is over a hundred.

</turn>


<turn speaker="Matt Gardner" timestamp="47:42">

And so the task is not, I just give you a high-level goal and you do it.

</turn>


<turn speaker="Yonatan Bisk" timestamp="47:47">

Oh, I would love if that was the task. But I mean, I think our performance is in the, you know,
single percentage success rates, even when we have the entire paragraph.

</turn>


<turn speaker="Matt Gardner" timestamp="47:58">

Okay. Okay. All right. And you said 55 actions, and I got really nervous because like that, when,
for instance, when you map language to SQL SQL statements have lots and lots of tokens, and this is
where you get really, really bad memorization in the model and really poor, I guess, a lot of
memorization and really poor generalization. And so I was imagining very similar things, but yeah,
if you have like a hundred tokens describing 55 actions, that seems more reasonable from a parsing
perspective.

</turn>


<turn speaker="Yonatan Bisk" timestamp="48:26">

Yeah. I don't, and I, we didn't create it to be impossible, you know? So I mean, we're hoping that
it's really more just a, an intermediary step on this path. Right,

</turn>


<turn speaker="Pradeep Dasigi" timestamp="48:37">

Right. To make things concrete, the kinds of supervision you're getting for the models, I guess for
the baseline models that you present in the paper, it's the low-level actions paired with the high-
level goals. And of course the visual inputs from each of these steps, right. I mean, and also the
auxiliary losses you described based on the progress bars. Right. That that's clear. And, also I
think one of the results in your paper shows that the high-level goals actually don't help much,
right. The high-level goals are, I mean, models built with high-level goal supervision perform as
well as those with just the low-level goals. Right?

</turn>


<turn speaker="Yonatan Bisk" timestamp="49:16">

Yeah, that's right. We're yeah. We're not at the point. I mean, these numbers are also; so to give
people some context in sort of task success. So this is, there's a couple of metrics there's sort of
two that matter most, which are overall success rate. So did you just achieve, you know, actually
achieve the task perfectly then there's kind of a slight relaxation, which is this goal condition.
So how many of these sort of sub goals did you achieve? So maybe you didn't get it into the apple
into the fridge, but you at least cleaned it or something. And for a seen environment actually
achieving the task, our best performance is like 3.7%. So it's quite quite low. And that translates
to 0% in an unseen environment. Or I think on the test sets, it's like 0.4% for the unseen best
case.

</turn>


<turn speaker="Yonatan Bisk" timestamp="50:09">

And there's a second set of metrics, which is where you, reweight both the success rate and the goal
conditions based off of the path length. So you could maybe have achieved these things, but you took
a circuitous route. And so we're going to penalize you a little bit that, and so those numbers are
going to be a little bit lower, but overall, sorry to close that out. It's a test set task success
rate of like 4% of goal conditioned task success rate of 9.4% in seen environments and then 0.4 and
7% respectively and unseen environments. So the takeaway there ignoring all the numbers is
everything's under 10% and in some cases under 5%, so there's a huge margin versus humans performing
upwards of 90% on these things. So that gives you a little bit of a sense for sort of just how much,
how much head room there is.

</turn>


<turn speaker="Yonatan Bisk" timestamp="51:06">

And also to be clear, we really did not want the numbers to be that low. So we really did. We tried
a whole bunch of different techniques and we did lots of parameters search sweeps. And we, you know,
we really wanted to have a stronger baseline than this, but it's hard. And we're also hindered a
little bit because which was on purpose because we can't do search. So you know, I think that if you
removed the state changes that are immutable, then you could run a search algorithm where you would
have an agent, which would maybe not be as efficient, but it could try a couple of different paths.
It could sort of rewind things like this. And we would start to see those success rates go up. But
when you're in a situation where a single change is not recoverable, then you really have to get it
right the first time. And that makes this whole thing much more difficult.

</turn>


<turn speaker="Matt Gardner" timestamp="51:58">

I mean, can't, you have some kind of search internal to the agent that tries to model its own
environment.

</turn>


<turn speaker="Yonatan Bisk" timestamp="52:05">

That's a hundred percent. Yeah. So, so I love this. It's a huge research question. I don't want to
misquote various papers, but there are some people who have been thinking about this, it's a bit
difficult because where's the line at which you basically have to recreate a simulator in your head
and sort of at what fidelity and what does that look like, but totally, totally valid. We have some
work. So I did some work with Chris Paxton at Nvidia on sort of simple manipulation where you're
just trying to move blocks around where you take an instruction and you take a scene and you need to
roll out what the next few steps of the world would look like, including a deconvolution that
actually visualizes the world. So if I were to take this action, what would the scene look like? And
that was with simple blocks and, it was already difficult, but there's definitely people thinking
about this, or how do you put sort of maybe priors over what the world might look like and stuff
like that.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="53:01">

Yeah. Right. So are there any other high-level observations from your experiments that you'd like to
mention?

</turn>


<turn speaker="Yonatan Bisk" timestamp="53:07">

No, I think, I think we've been really, I think this conversation has thankfully sort of really
focused in on what I think are some of the key aspects, which is what does it mean to build
intermediate representations, which are actually useful for language. And that's kind of one of the
key research questions. we're hoping that the environment enables is we both want future research to
increasingly ground it. So we're maybe eventually you get rid of the grid, you introduce more sort
of fine grain manipulation, that's one direction. But then I think as language people for us, the
question is what does it mean to build representations, which are meaningful as intermediaries and
think about abstraction because we too often perhaps treat language as a monolith. We too often sort
of think, well, it's taxed. And I don't think about the fact that left and right, is both a low-
level distinction and political party affiliation. Like what does it mean to sort of have access to
all those different, those meanings at the same time, in this case, maybe more concretely move
between the kinds of instructions and levels of granularity that are necessary for different
abilities of an agent.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="54:16">

Great. Yeah. Given that you have a public leader board for ALFRED and that you're coordinating a
workshop based on it, what do you think are the next steps to actually fill the huge gap between
models and human performance?

</turn>


<turn speaker="Yonatan Bisk" timestamp="54:32">

Yeah. So I think we've, we've brought up several of these things a little bit already. So one thing
that we did not do, and it was partially because again, it's quite difficult is initializing with
self play. So I believe Mohit the first author was telling me that there's some work maybe out of
Kristen Grauman 's lab on learning basic affordances in the Thor environment. Right? So if you have
an agent that goes around and if first learns how to open and what it can open and what it can pick
up then that gives you a sort of initial semantics of the world and maybe the sort of simplified
physics of this world to learn language on top of. And that seems really promising for a linguistic
or pre-linguistic knowledge. There's also, we were saying people thinking about to what extent does
the task get simplified if you have panoramic views?

</turn>


<turn speaker="Yonatan Bisk" timestamp="55:20">

So how much are we hindering ourselves by using egocentric? And so I think some people are looking
at that question, and then the really big thing is this notion of memory. And so this notion of,
state tracking. And so if people are able to come up with better or maybe hierarchical
representations that allow them to track what they've done and, recover, if they, if they make small
mistakes, things like this, that would be, that would be super awesome. So those are the kinds of
things I'm hoping for. I obviously don't want this task to last forever. I'd like to see, I don't
want to say have it killed, that's a little bit dramatic, but basically I would love to see some
innovations that really just shoot the performance up. Hopefully in ways that we find are
generalizable so that the sort of these bars can get pushed.

</turn>


<turn speaker="Yonatan Bisk" timestamp="56:10">

So the language complexity can increase the task, complexity can increase, and then we can see
whether or not the innovations in the same way that we found that progress monitor was helpful, but
not as much as you would hope because when we moved from navigation to instruction following we're
generally it doesn't generalize. What are the kinds of innovations that do exist, or that are
created for this environment that will help a more realistic settings in which are the ones where we
learned that we made a simplifying assumption about the world that was problematic and it doesn't
actually reconcile nicely with the real world.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="56:43">

Yeah, that makes sense. Thanks. That's all the questions I had for you. Is there anything that you
wanted to talk about that I didn't ask you about?

</turn>


<turn speaker="Yonatan Bisk" timestamp="56:51">

No, I know this was super fun. I just hope that, you know, I think as a, as a general push, I think
that we're at a really fun place right now, sort of technologically and tool-wise that we can do
these kinds of things, that there are several different simulators and we didn't even, we didn't
talk about the sort of wide space of simulators. So HABITAT is the other really big one. That's been
mostly thinking about navigation, but there's also like, so the NVIDIA® Isaac™ is the simulator that
allows you to do sort of more fine grain, manipulation pi-bullet, things like this, have all this
physics that's involved. We're kind of getting to a place now where we've got a lot of really good
tools, many of which can even do SIM-to-real transfer pretty well for specific hardware. We also
have so many wonderful off the shelf vision technologies that you can, I mean, torch vision, you can
just import, and all of a sudden you've got these, features, which are maybe not perfect.

</turn>


<turn speaker="Yonatan Bisk" timestamp="57:44">

They may not be, you know, ideally, as we were saying earlier, there'll be some ability to allow for
information flow between back and forth between the language and the vision, but we're at a place
now where if people are interested in grounded language, or if they're interested in multimodality,
they can basically pull things off the shelf and start playing with it, which just wasn't the case a
few years ago. And particularly when it comes to these simulators, it's buying what I just saw. The,
Boston dynamics is now selling their, their little four legged robot for like, I think $75,000. You
know, you don't need that, that kind of cash. You can basically pull the spec for one of these
robots into a pretty good physics engine and start playing around with and seeing to what extent you
can, train language in that space and you, and you can connect your language models to it.

</turn>


<turn speaker="Yonatan Bisk" timestamp="58:32">

So mostly just a plug that, we're at a sort of pretty cool moment, I think, as a community doing
this and that, I'm just sort of a young newcomer to this; Mirella Lapata has been doing grounded
language and multimodality for ages, Ray Mooney has been doing this, all of Cynthia and Joyce's
work. There's a lot of people who've who really sort of paved the path here. And now we get to
benefit from that.

</turn>


<turn speaker="Matt Gardner" timestamp="58:57">

This has been a really fun conversation, kind of making me want to switch my research area.

</turn>


<turn speaker="Yonatan Bisk" timestamp="59:03">

That's that's the whole goal. No, no, no. I think, I think I don't mean to demean on, on NLP more
generally. I think there's a lot of, obviously on tackled stuff in NLP broadly that's text-based but
I do think we're at a pretty fun moment where we get to do we get to do NLP for AI, not just NLP for
text and that's pretty cool.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="59:20">

Great. Yeah. That's a great note to end this conversation on thanks Yonatan.

</turn>


<turn speaker="Yonatan Bisk" timestamp="59:25">

Yeah, of course.

</turn>
