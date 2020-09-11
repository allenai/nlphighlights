---
title: "Deep Reinforcement Learning Doesn't Work Yet, with Alex Irpan"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Alex Irpan"]
number: "074"
tags: []
description: TODO
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:11">

Today our guest is Alex Irpan. Alex started in reinforcement learning during his undergrad at UC
Berkeley. After his undergrad degree. He joined Google brain residency program for a year and at the
end of the year he decided to stay at Google full time. He's currently working at Brain Robotics.
And yes, so welcome to the program. So you wrote a blog post a few months ago and it went viral. So
the title of the blog post is "Reinforcement Learning Doesn't Work Yet." We'd like to know a little
bit about the motivation for writing this post. So it's, I think that the, this post is a reality
check on the hype around reinforced learning. Could you talk about why this hype exists and why it's
harmful?

</turn>


<turn speaker="Alex Irpan" timestamp="00:57">

Sure. So I guess the reason the hype exists has to do with essentially how cool it is when you get
reinforcement learning to work. So I know that back in 2015 when DeepMind had their first results on
Atari and you could like see these learned agents actually learning this pretty wide variety of
different games and also when DeepMind had their big success in like AlphaGo and so on and, and sort
of like the world really started paying attention to these sorts of technologies. I feel that it was
around that point that people started getting a lot of hype around reinforcement learning started
like appearing and it had been building up for a while, but sort of like I feel these were like
watershed moments in the field for why it's interesting to work on them. Why, people wanted to work
on them in the first place.

</turn>


<turn speaker="Alex Irpan" timestamp="01:54">

And I suppose that the problem here is that a lot of times when you see these demos, they're always
at the end of the research process when everything's working and what isn't clear from this is like
what things are like during the actual research process when things aren't working that well or what
happens when the reinforcement learning you try just doesn't work ever. And then you just sort of
like give up and move to a different sort of technique. And I think that this sort of selection
biases may be common across research where you really tend to see the positive results. But when
this gets magnified with all of the people who are interested in machine learning and reinforcement
learning in particular, then it really builds this wave of hype, which I felt wasn't fully deserved
by the reinforcement learning techniques at the time. And that was why I started thinking about
writing this blog post and then started working on it.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:56">

So when you say at the time, do you feel like your opinion changed about this over the past few
months?

</turn>


<turn speaker="Alex Irpan" timestamp="03:03">

I feel like it's, it's getting better. I think there are still a lot of random weird things that
show up when you do reinforce learning research, but I would say that what I feel has changed for
the better is that people are, I guess talking about the issues of RL event more and are a bit more
aware of ways that these models can fail and so on and are trying to propose ways to improve it,
which is, which is really like all I wanted out of the blog post in the sense of what I wanted it to
be was not a post saying that reinforcement learning would never work but more as l a peer reviewed
piece of saying as of like the moment that I was writing to post reinforcement learning still has a
large number of issues within it, but I think they'll get better and I think they have gotten a bit
better.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:57">

Yeah. One point that rang a bell for me is that oftentimes people work on a problem and rediscover
the same issue that other people have discovered before. After all the work. And I think this is a
very important point to make the other thing that you mentioned also in the post is practitioners,
who really want to get something to work for the test at hand, many of them would assume that
reinforcement learning is mature enough to be used for that purpose and your post suggests that this
is not the case.

</turn>


<turn speaker="Alex Irpan" timestamp="04:27">

Yeah. so my feeling is that there like some aspects of machine learning that are a lot more, I
suppose studied or like proven to be not too annoying to get working. And reinforcement learning is
definitely not one of these where it is right now. And, and I suppose that was another reason that I
wanted to write this post in terms of essentially, so that when people would ask me how they could
use RL for their problem, I could tell them that it's likely isn't a good idea unless you have good
reasons for why you specifically need reinforcement learning versus some other technique.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:05">

Alright. So, in the rest of the post, you listed a number of limitations of current methods. And I'd
like to go over them and discuss them a little bit more. So the first one you mentioned is that deep
reinforced learning is still orders of magnitude above a practical level of sample efficiency. So
this may not be a problem for simulated environments like Atari games, but most real world problems
cannot be simulated this way. And it seems like simulated environments have this a double edge sword
aspects to them. On the one hand, the enable a lot of progress in deep reinforced learning research
but also the diverted the attention away from this fundamental limitation of the methods.

</turn>


<turn speaker="Alex Irpan" timestamp="05:48">

Yeah, I feel like that simulation is a very important tool for RL research for the reasons that you
described that it does let you collect enough data to start asking questions about what can our
models learn if we just assume we have all the data we need. And, that's like a pretty important
question to answer. And then the tricky part is when you're, when you're trying to do this in
settings where that isn't true or when people talk about applying reinforcement learning to a
problem and then haven't fully thought through exactly how much data they'll have available and so
on, then then you start getting into issues of do I actually have enough data for my RL algorithm or
do I actually have enough time to collect all of the data I would need if you have access to
something which will generate that data if you give it enough time.

</turn>


<turn speaker="Alex Irpan" timestamp="06:43">

I would say that the one thing that I've sort of changed my mind about since writing the post is
that there are some real world problems that are somewhat more stimulatable or somewhat easier to
get lots of data from. And generally this happens when your problems are primarily software problems
in the sense that when things are just all in software, you can just spin up more machines and more
copies of the same program. And then this can often be good enough for getting lots of data. And the
difficulties of having lots of samples can often come down more to just like when you need to work
with real hardware or you need to interact with real humans or things like,

</turn>


<turn speaker="Matt Gardner" timestamp="07:24">

Could you give a concrete example to demonstrate?

</turn>


<turn speaker="Alex Irpan" timestamp="07:28">

Sure. So I guess I work on brain robotics right now and a lot of what we do is trying to apply
machine learning techniques, Onto real world robots and, and this sense it's really changed a lot of
the priorities of how I view like how we approach the problem because you can't just like buy a lot
of robots, robots are expensive. And because of this, it really means that the limiting factor is
how much robotics data do you have and a lot of the other aspects of what goes into a machine
learning system suddenly become less important relative to this. And it really changes how you
approach problems, which, which I like a lot. It's like it's an interesting perspective. Whereas if
you are doing things on like maybe like just simulated robots for example, you can just spin up lots
of copies of your robot simulation and there have been some interesting be reinforcement learning
papers that do work primarily in simulation, but a lot of the questions surrounding this is that
it's nice that this works in simulation, but we want it to actually run on a real world robot at the
end of the day.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:36">

Alright.

</turn>


<turn speaker="Matt Gardner" timestamp="08:37">

Yeah. I think that's a really interesting point about cost conscious learning in general. I know a
bunch of work in natural language processing that thinks about data annotation in a cost conscious
way because I guess we don't use reinforcement learning as much, but we do want to annotate and need
to think about how do I get that data in a way that's scalable. Or if I'm issuing queries to a
search engine, I probably have to pay for those queries. They're interesting things and I wonder if
there are any insights on that we can get from reinforcement learning in real world settings with
real robots that can apply to these cost-conscious kinds of problems that we have in NLP. Any
thoughts there?

</turn>


<turn speaker="Alex Irpan" timestamp="09:21">

I'm not sure if I have a good answer for it off the top of my head, but I would agree that there
does seem to be the shared link there of what do you do when your data does cost something to
generate or to get and so on and how do you change your research to approach it and so on. So I know
that at least in the work that I've done recently, we've been trying to see how much we can leverage
out of essentially like saved logs or saved videos of what our robots have executed in the past and
try to really leverage this as much as possible versus actually running our newly learned models on
our robots. Because once you, once you've saved videos of execution, then you can just keep training
on these as much as you want offline without having to actually run your real world robot. The main
problem is that doing learning from this data can be a lot trickier. So there, there are trade offs.

</turn>


<turn speaker="Matt Gardner" timestamp="10:24">

Yeah. Interesting. Good point. Can we dig in a little bit more into the sample complexity issue too?
You have a nice figure in your paper about the rainbow DQN,

</turn>


<turn speaker="Alex Irpan" timestamp="10:38">

Right.

</turn>


<turn speaker="Matt Gardner" timestamp="10:38">

That shows dramatically lower sample efficiency, sample inefficiency, higher sample efficiency on
these Atari games. But even this model you say still gets, still takes 83 hours of playing an Atari
game or the, all of these Atari games in order to match human performance.

</turn>


<turn speaker="Alex Irpan" timestamp="10:58">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="10:59">

And where, where as a human within just a couple of minutes can understand what the game is about
and get at least reasonable performance. So what do you think any intuitions about the gap there?
How can we close this gap?

</turn>


<turn speaker="Alex Irpan" timestamp="11:13">

Yeah, I've talked to a few people about this since; I guess when I got blog posts feedback generally
it was good, but sort of this still like 83 hours point was one of the main sticking points for
people who did have complaints about it. And the, I would say that the common feeling is that when
humans played a video game, they have a lot of priors about how that game is going to work or how
the world is going to work. There is this paper, I think it was called human priors for playing
video games or human priors for Atari, which studied this where essentially what they did was they
took an Atari game and they changed the visuals. So for example, instead of like keys looking like
he's in doors looking like doors, your keys are like blue squares and your doors are red squares.

</turn>


<turn speaker="Alex Irpan" timestamp="12:01">

And then they got a bunch of human participants to play these games and timed how long it took them
to solve them. And they showed that the more you make the game look less like a real world game, the
longer it takes for humans to figure out how to solve them because they have to, re-learn this
mapping that blue squares are things that might be opened by squares, whereas everybody knows the
key opens the door. And so what my guess is is that when these RL models, they're always trained
from scratch. So they're always like relearning everything. Whereas humans have enough pre-built
knowledge that they're able to do these like quick adaptations towards playing the different Atari
games. And that's what lets them learn really well.

</turn>


<turn speaker="Matt Gardner" timestamp="12:44">

Yeah, that's a, that's great that, that was my guess as to what happened. It's, it's good to hear
you say the same thing. It was like if I see an asteroid coming at my spaceship as I'm playing one
of these Atari games, I'm pretty sure that I need to move. This notion of common sense and how do we
get machines to have common sense. It's a hard problem.

</turn>


<turn speaker="Alex Irpan" timestamp="13:07">

Right? Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:09">

All right. So the next point in your post was around performance. You mentioned that if you just
care about final performance, many problems are better solved by other methods. And as one of the
examples, you provide links to the NFC 2014 paper, but you at all in university of Michigan showing
that an off the shelf Monte Carlo research algorithm outperforms the DQ net on the Atari benchmark
at the time and its been a while since 2014. I wonder if this is still true of the recent deep
reinforcement learning methods if they're still outperformed by traditional methods.

</turn>


<turn speaker="Alex Irpan" timestamp="13:48">

Yeah, so I got curious about this and I double checked the numbers. And so it turns out that the
baseline DQN that was first proposed does generally performed worse than these tree search methods.
If you compare the numbers for rainbow DQN with all of the various tricks that people have added
over the past three or four years, that does start to be a lot more competitive with the numbers
that you get out of tree search. It's, it's not necessarily like a very, an unambiguous rainbow DQN
does better than tree search. It's the kind of thing where some models, your planning based approach
does a lot better and some models to learned approach those a lot better. And it sort of like an
unclear why exactly that is. I would assume it's just something about how the different games are
structured.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:39">

Well I mean I think the thing that point's still valid and you attribute this kind of slower start
for deep reinforcement learning methods is that it's hard to include any problem specific
information as part of the algorithm because of the oral setup which making the problem harder than
it needs to be really. So could you elaborate on why this is difficult? Why it's hard to incorporate
problem specific information?

</turn>


<turn speaker="Alex Irpan" timestamp="15:07">

Sure. Yeah. So a lot of the ways RL algorithms get motivated is by saying you have some set of
States and some set of actions and if you're in a state and take this action, you go to another
state and you get some reward. And essentially these are all very general concepts. Or a state is a
set of things. Your actions are a set of things and your avoids are just arbitrary float valleys
that you get now and then and then you do derivations within this entire framework. But at the end
of it, what you get out is a reinforcement learning algorithm, which in theory works in any
environment. But, then the problem comes in like if you do know something about your environment,
it's not getting captured in this derivation and your algorithm isn't able to make sense of this
information. This is all sort of like very hand-wavy and not really like a mathematical argument
more as like an intuitive one.

</turn>


<turn speaker="Alex Irpan" timestamp="16:05">

So maybe an analogy I would make is like if you, if you have like a bunch of metal cubes and they're
scattered all across the room and you want to assemble them in one place one way to do it is to like
pick each of them up individually and just sorta like sweep them together into one place, which
would work for an arbitrary set of objects. Another approach would be like you, you take a very
powerful back then and you put it in the center of the room and because all the cubes are in bed or
they'll just automatically go there. So you have this sense in which this like magnet bridge based
approach is working because you know your cubes are made out of metal. Whereas your other approach
works for objects that aren't metal cubes but it's going to be a bit slower. So hopefully that
analogy makes it make more sense.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:51">

I think it does. But at the same time we designed these methods and we designed the model that's
used to predict the actions. And like you mentioned later in the post, we can instead of a model
three setup, you can, you can have a model of the word that you, that makes it easier to encode
these problem specific information. So I wonder why this hasn't been as common as, as it seems to
be, yeah.

</turn>


<turn speaker="Alex Irpan" timestamp="17:23">

Yeah. I think that is just that making models of the real world seems pretty difficult at least
empirically where if you can have a nice model of how things work, then a lot of the papers in the
field show that you do get drastically improved sample efficiency, things work a lot faster and so
on. The main tricky part is that when the models don't work or when they are hard to learn, then the
results are bad and then they don't get published. So it's always this sort of, it goes back to
their original like selection bias problem where it's unclear like which models are learnable and
which ones aren't. If you just try to read the literature and it really just relies on having to ask
people who have experience trying to build models of different kinds of systems or worlds to see
what what is and isn't doable.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:14">

Okay. Okay. So in, in light of this discussion, do you have any thoughts on why the research on deep
reinforcement learning has attracted so much attention even without necessarily achieving the best
results, even with a simulated environments that are not really like representing word; for the most
part real world scenarios,

</turn>


<turn speaker="Alex Irpan" timestamp="18:36">

I guess it comes back to seeing what your final learn policy does, where it is very gratifying to
see that you, you provide an image of this Atari game and your model outputs an action which
actually makes sense and is the right thing to do. And, and that furthermore, It didn't have to do a
bunch of planning and its head or like doing a lot of searches of executing. Like if I do this
sequence of actions it will lead to the right thing. It just sort of takes in the input set and just
returns out the action that you want immediately. So I think that there was a, I remember there was
like this Andrew Ng Facebook post right when AlphaGo, won its first game where he was talking about,
one thing that he liked or found exciting was that it took a lot of the online search computation
that you normally have to do in game AI and instead it managed to push it all into the neural net in
some way. And that what's exciting about this is that doing neural net inference is a lot faster
than doing this full search process. So there's something about knowledge going into the net in some
way, which is interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:51">

I see. All right. So moving to the next question. The next point in your post is around reward
functions. And you mentioned how hard it is to design a reward function, which actually encourages
the desirable behaviors of the model, and is learnable. Could you talk a little bit more about how,
how your choice of the reward function is related to getting stuck in a local optima and the
different choices that we might have?

</turn>


<turn speaker="Alex Irpan" timestamp="20:18">

So I would say that when, when humans design reward functions for different tasks, normally what
happens is you, you try to identify things that you think are helpful for solving the problem and
then you add different constants for like, it's good to like say say if it's like maybe like a
racing game, it's good to like run over like fuel stops to like get more fuel or it's good to pick
up this item which will give you more acceleration and so on. And then you make guesses as to what
is like the relative importance of these in terms of letting you finish solving the game. And the
tricky part is that then your learning algorithm is like what at the sites to do really depends on
what constants you pick here. And furthermore, the actual behavior it learns can depend quite a bit
on whether you've selected these constants correctly.

</turn>


<turn speaker="Alex Irpan" timestamp="21:14">

And, and I think that there is like the open AI boat racing game that showed that for if you do this
like incorrectly, you get into cases where your agent learns that it should just keep picking up
these power-ups that let it move faster without ever actually completing the race, which is what you
wanted your agent to learn in the first place. So, so sometimes like you pick constants and they
work the first time and sometimes they don't and it's just hard to figure out when is, when is this
going to happen or when it isn't.

</turn>


<turn speaker="Matt Gardner" timestamp="21:45">

I guess the point for all of this is to help in the search so that you can presumably get to the
reward that you actually care about faster.

</turn>


<turn speaker="Alex Irpan" timestamp="21:53">

Right? Yeah. So the whole point is that you're trying to bias the learning in some way that gets you
to the final thing you actually care about. And if you do the biasing poorly, then you don't get to
the thing you care about. But if you don't add in this biasing at all, it can be tricky to do enough
exploration to see what the successful states look like essentially.

</turn>


<turn speaker="Matt Gardner" timestamp="22:17">

Do people remove the biases? Like I'm, I'm imagining I do some initial search to help the model find
a good end state and once I find a good end state presumably I have a trajectory that will get me
back and I can remove some of the biases. Do people do this?

</turn>


<turn speaker="Alex Irpan" timestamp="22:37">

I, think people can do something like that. So I'd say that's, that's getting close to the idea of
expert demonstrations and imitation learning and so on where you, you give data but you know,
represents your final success state and then try to have the model learn to reproduce that behavior.
And I do think that's a promising line of research in terms of how to get around these problems.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:04">

Is this roughly similar to, like, the counter part of this inspired learning would be having
defining an objective function in terms of how, how different your predictions are from the gold
annotation. And then you may want to add some regularizes and depending on the structure of the
problem, you may come up with more creative regularization that like how the model reached the
neighborhood or the parameters set up that that you're interested in. Would this be a reasonable
approximation of what's going on?

</turn>


<turn speaker="Alex Irpan" timestamp="23:40">

I think it sounds reasonable enough. So I would say that generally when you add regularization in a
supervised learning model, it normally helps you. Whereas in reinforcement learning, when you're
trying to do something similar, it's a bit up in the air. It's more of like a 50, 50 thing on wither
helps you or hurts you. But I think the, maybe the common point is that you have the objective you
care about and then the regularization you're adding on top that you think will help you achieve
that objective.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:15">

Yeah. It's, I guess it sounds closer to a auxiliary test at an auxiliary tasks when you, when you
care about one problem but there are some like related tasks that we think you think would help you
with there. And sometimes they don't. They do. Sometimes they don't.

</turn>


<turn speaker="Alex Irpan" timestamp="24:29">

Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:30">

All right. So another point you make is that deep reinforcement learning has yet to have its image
net for control moments. So it's about how we over-fit to the environments when we are training
these models and you give several examples of how existing models fit to arbitrary characteristics
of the environment. Could you elaborate on one of the examples to clarify this point?

</turn>


<turn speaker="Alex Irpan" timestamp="24:52">

Sure. So, in the post itself, I talked about two papers, one of which I worked on, one in which I
didn't. And the way both of these papers showed this problem can occur is that they played using two
player games and they have one player's behavior be hardcoded and the other player is learned by
reinforcement learning to learn to beat the second player essentially. So what you can do is train
the first player to get high reward and then you can at evaluation time, change how the second
players hard coded behavior is. And what this, what the argument here is, is that if your learned
agent has truly learned what it means to beat this game, it should be able to beat arbitrary
opponents. But in practice if you change how that opponent acts, then it all, a lot of times your
performance can just like degrade a lot and then you're suddenly seeing a lot of like weird
behaviors show up. I think there's like a video of like a laser tag game in the post where in at
learning time it, it does a good job of like tacking the opponent and then you switch how it, how
the other agent acts and then it sort of just runs into walls a bunch and like doesn't really move
anywhere.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:11">

Yeah, that sounds a lot like what we face in, in supervised machine learning where oftentimes we
like to think of the datasets we're training on as if we're trying to build a model for this task.
But really we, more often than not, we over-fit the models to the dataset on which we're training.
And if you take another dataset addressing the same task, it does significantly worse. Is this the
same problem here or is there a like a unique characteristic of the problem in deep reinforcement
learning that make it fundamentally different?

</turn>


<turn speaker="Alex Irpan" timestamp="26:46">

I think it's, I think there's like the same underlying root cause and it's that parts of how
reinforcement learning work make the problem more apparent later. So in reinforcement learning it's
a bit less like having a fixed set of data you're learning from. And the more common thing is that
you have an environment which generates data depending on how you act within it. So, because of
this, if you have different policies, you can generate wildly different distributions of data and a
lot of their reinforcement learning process is; interact with their environment, update myself based
on what feedback I get. So you get into these cyclic issues where you're updating yourself based on
data, which is partially controlled by what you've learned so far. And because of this, you can get
into these weird feedback loops where you just spiral off into very different parts of the state
space depending on what happens.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:42">

Right. And recently, at least in the NLP domain, we started having efforts to combine, like you have
like kind of combo tasks where you can, you can evaluate a one model or one approach on a variety of
tasks to kind of reduce the risk of overfitting to any of them. I don't know if that's gonna be the
way to address this problem in NLP or in supervised machine learning. But I wonder if there's like
similar efforts in the deep RL space.

</turn>


<turn speaker="Alex Irpan" timestamp="28:17">

Yeah, I think they're similar efforts are happening there or there are, they're starting to happen.
So I know opening, I has a, they have their retro game contest, which is essentially a, it's a
contest, challenging people to train reinforcement learning on games from the video games, Sonic the
hedgehog, and they explicitly set up their contents to be, we'll give you some set of levels which
you can train from. And we're going to have a holdout set of levels which nobody is going to be able
to see and your agent is going to have to be able to learn how to get good reward in their test set
levels. And I think that this is like a good step in terms of trying to have benchmarks or contests
where the challenge is not just learning to do control and like one instantiation of your video game
or environment, but across like a wider distribution.

</turn>


<turn speaker="Matt Gardner" timestamp="29:13">

I find it really surprising that this isn't how standard evaluation already works. Like it seems too
much like cheating to evaluate in the same environment that you were trained on. Why don't people
switch environments more often?

</turn>


<turn speaker="Alex Irpan" timestamp="29:26">

So I would say the reason people don't switch environments more often just has to do with where
reinforcement learning was at that time where or even if you are acting in the same environment that
you were training on, a lot of times you would fail to solve the task or you would have failed to
achieve high reward and so on. And because of this there, it's basically like, it's tricky to
measure how you generalize to things if you can't learn anything in the first place. And, and so I
think that now that reinforcement learning is like starting to become more useful or at least is
able to learn more things now. That's why we're starting to see this shift towards having these test
set environments because people actually have some expectation that they'll be able to solve their
train set environments and then they can start studying generalization.

</turn>


<turn speaker="Matt Gardner" timestamp="30:17">

Yeah, I guess so Waleed started this point on talking about an ImageNet moment for reinforcement
learning, like you mentioned in your post, I guess the, and similarly a glove or word to VEC moment
or an Elmo moment in natural language processing, these are all representation, learning challenges,
right? Were given some input. That's largely in the class of inputs that I expect to see. I learned
some general feature extractor that can work well across a variety of tasks. It seems hard to think
about a general reinforcement learning input. Like, I can imagine using an image net to do a pre-
trained image net or pre-trained Elmo or something to do feature extraction for my reinforcement
learning problem. But it doesn't seem like they're, I, I'm having a hard time even thinking like
where is the representation learning to do in a general reinforcement learning task cause they're
all so different.

</turn>


<turn speaker="Alex Irpan" timestamp="31:11">

Yeah. I think that's a, that's a good point. And what I would guess what happened was that you would
just have to start adding restrictions over what kinds of reinforcement learning tasks you care
about. And that I know that there have been some people talking about I think it's like, it's like
intuitive physics is what it's called and essentially that's, it has to do with like constraining
things to environments where they operate according to however your world physics operates. For
example. I think this is based off, like there's some like developmental psychology stuff for this,
but I don't really actually want to try to explain it cause I don't know any of it and I don't want
those people to get mad at me.

</turn>


<turn speaker="Matt Gardner" timestamp="31:57">

Yeah. Yeah. That's a really good point. So I was thinking of like, what am I inputs, but also like,
I think what you're saying is that for real world scenarios, if I want to do reinforcement learning,
that's actually in the physical environment I can get some representation learning on a model like
model of how the world behaves.

</turn>


<turn speaker="Alex Irpan" timestamp="32:16">

Yeah. Right,

</turn>


<turn speaker="Matt Gardner" timestamp="32:16">

Right. Yeah, that's a really good point.

</turn>


<turn speaker="Waleed Ammar" timestamp="32:18">

Yeah. I suppose the current benchmarks don't lend themselves to any improvements if you use ImageNet
kind of features.

</turn>


<turn speaker="Alex Irpan" timestamp="32:25">

Yeah, I guess right now basically it's just Atari games look a lot different from ImageNet things or
real world images. I mean,

</turn>


<turn speaker="Waleed Ammar" timestamp="32:35">

Yeah. And I love the humorous quote that you take from Jacob Andreas saying that "Deep RL is popular
because it's the only area in ML where it's socially acceptable to train on the test set."

</turn>


<turn speaker="Alex Irpan" timestamp="32:49">

Yeah, I like that to from Jacob, it's like, I wish it were less true, but it kind of is.

</turn>


<turn speaker="Waleed Ammar" timestamp="32:59">

It's pretty fun. All right. So the next point in the post talks about stability. And I always
actually, I didn't realize that until I read your posts how much variance one should expect in Deep
RL models even beyond what we see in supervise neural models. So yeah. So what are some of the
reasons behind this extra variance?

</turn>


<turn speaker="Alex Irpan" timestamp="33:22">

I think it goes back to the point I was making about the cyclical nature of the data you're
receiving depending on what you have learned so far. And, what I'm guessing is happening is that
depending on essentially different aspects of uranium initialization or the early steps of your like
gradient descent process, sometimes your model will lock into doing behaviors that are productive
and sometimes it won't. And if it, if it's initially starts doing something that's productive, then
it's able to sort of quickly bootstrap off of this and then you see curves that it sort of start
increasing in reward pretty quickly. Or if it doesn't do anything productive, then your award curve
mostly stays flat. And then it just sort of, it just depends on when does it lock into seeing the
right thing or not. And I think this is where a lot of the variance comes from. Just these things
that can oftentimes come down to a random chance on when you see the takeoff versus when you don't.

</turn>


<turn speaker="Matt Gardner" timestamp="34:24">

I guess my intuition on this, you could tell me if I'm right or wrong, is that in the most general
reinforcement learning case, I just have a state machine that's taking actions and at some point
eventually we'll get a reward and it's like a totally random search until you get there. And there's
no way to know, like in addition to like the randomness you might get from a non convex lost surface
in supervised learning, you also have this like totally random search and maybe sometimes you'll
find something good and maybe sometimes you won't. And unless you have a better search algorithm
with some stronger reward signal to guide the initial stages of the search, you're just gonna have a
hard time on a whole lot of variance. Is that fair?

</turn>


<turn speaker="Alex Irpan" timestamp="35:09">

Yeah, that, that sounds pretty fair.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:11">

Alright. Which reflects on the updates that you get to the model in, in a supervised mode, you will,
you'll have a data set and you'll be shuffling your data points, but it is the same data set
basically, right? Depending on which path you take. When you're turning your model and deep RL,
you'll be exposed to different updates.

</turn>


<turn speaker="Alex Irpan" timestamp="35:30">

Yeah, right. I think there are also like a few, I'm not sure if there's anything published for this
but I know that some people have done some experiments trying to understand what does your reward
like lost landscape look like and RL problems and all the things I've seen for it suggests that a
lot of times it looks like there's a lot of fairly flat plateaus and then a big cliff for increasing
reward and then like a plateau after learning the task. So I guess it goes back to the random search
question of like when you're in this like flat Valley there, like everything sort of looks about the
same and you just have to hope that you randomly move towards the cliff eventually.

</turn>


<turn speaker="Waleed Ammar" timestamp="36:12">

So you put together a short list of success stories in deep RL research and you identify some of the
common themes or common properties that you recommend or like to minimize frustration over
researcher who was doing any work in this area. Do you, would like to walk us through the list?

</turn>


<turn speaker="Alex Irpan" timestamp="36:32">

Sure, yeah. So one thing that helps a lot for RL is that if, if you actually can just generate a lot
of data than, than a lot of times you, you can be fine because of like, like reinforcement learning
can be data inefficient, but if you have a lot of data than this isn't really a problem anymore.
Another thing that can help is if just like the core learning problem is not really like super
difficult or only has like, maybe like a short number of steps within it in terms of like what, what
gets hard for reinforcement learning is when you basically need to do say, like 10 things, right? In
order to succeed if you have to do, if you'd have to make by 10 correct decisions in a row before
you receive positive reward, then it's very hard for random exploration to actually do this.

</turn>


<turn speaker="Alex Irpan" timestamp="37:24">

Whereas if you only need to do maybe like two or three things correct in a row, it gets a lot
easier. I guess the question of like how easy it is to randomly do the correct thing or not is like
very problem dependent. But I like, I think thinking about the length of like how many things have
to go right for things to start working is a good heuristic for this sort of thing. I'd say that
another thing that has empirically been shown to work pretty well is self play this is pretty much
restricted to environments where you have like two agents that are competing against one another.
But this is something that, that DeepMind did for AlphaGo and it's something that open AI did for
their Dota 2 AI as well. And in both cases, somehow when you have agents playing against copies of
themselves, there's something about the process that makes learning like get a lot faster in terms
of like exploring new strategies and so on.

</turn>


<turn speaker="Alex Irpan" timestamp="38:22">

And I'm sure there are lots of like intuitive arguments you can make for it in terms of like agents
like being in competition with one another and so on. I don't have super great intuitions for why it
helps so much, but empirically it does seem to help lot. And I guess one other maybe like the final
thing that would be important is that we, I guess I've been talking a lot about how it can take a
long time to explore to your first initial positive reward. And one of the ways to get around this
is essentially having like a very rich reward signal where a lot of your actions give you like
either like a small boost or a small penalty. And I suppose that that this does come back unto the
reward shaping issues where if you, if you tune these boosts or penalties poorly, then you can
sometimes get weird results. But a lot of times doing this sort of reward shaping to encourage
moving in the right direction so to speak, it is just important for the problem and it is just
something you have to do.

</turn>


<turn speaker="Waleed Ammar" timestamp="39:27">

Yeah. I got mixed signals from the post whether you're recommending the reward signal to be shaped
or or just like one at the end of the episode. It seems like from what you're saying now you, you do
think it's best to have a shape reward if you know how to design it.

</turn>


<turn speaker="Alex Irpan" timestamp="39:49">

Yeah. I think what I would recommend is that you should try a more sparse reward first. And if
that's learnable, then you don't really need to do anything more. But if that isn't learnable, then
you should start thinking about how do I shape my reward for this? And the reason I would recommend
it this way is that generally sparse rewards are less gameable than shaped rewards. So if you can
learn your reward that is less game of war or less likely to misrepresent what things you want, then
you should just do that.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:23">

Alright. Any other thoughts before we conclude?

</turn>


<turn speaker="Alex Irpan" timestamp="40:27">

No, not really. I guess this was fun to do. Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:31">

Thank you very much.

</turn>


<turn speaker="Alex Irpan" timestamp="40:33">

Yeah, thanks.

</turn>
