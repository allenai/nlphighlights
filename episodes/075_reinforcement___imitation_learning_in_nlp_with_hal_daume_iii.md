---
title: "Reinforcement _ Imitation Learning in NLP, with Hal Daumé III"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Hal Daume III"]
number: "075"
tags: []
description: "In this episode, we invite Hal Daumé to continue the discussion on reinforcement learning, focusing on how it has been used in NLP. We discuss how to reduce NLP problems into the reinforcement learning framework, and circumstances where it may or may not be useful. We discuss imitation learning, roll-in and roll-out, and how to approximate an expert with a reference policy. DAgger: https://www.semanticscholar.org/paper/A-Reduction-of-Imitation-Learning-and-Structured-to-Ross-Gordon/17eddf33b513ae1134abadab728bdbf6abab2a05?navId=citing-papers RESLOPE: http://legacydirs.umiacs.umd.edu/~hal/docs/daume18reslope.pdf"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F533485659&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:05">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:11">

Today our guest is Hal Daume, Hal is a professor of computer science at the University of Maryland.
College park is currently on leave at Microsoft research in New York. He's interested in studying
how to get computers to learn language through natural interaction with people. He's also interested
in studying how we can do this in a way that promotes fairness, transparency and extend-ability in
learned models. Welcome to the program.

</turn>


<turn speaker="Hal Daume III" timestamp="00:32">

Thanks.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:32">

So how can you reduce structure, prediction problems into reinforced learning? People who are
listening to this podcast, many of them care about structure, prediction problems and not many of
them probably care about reinforcement learning. So could you tell us a bit of how you would do this
and why would you do it?

</turn>


<turn speaker="Hal Daume III" timestamp="00:49">

Yeah, sure. So I think in some ways this is actually a lot easier to explain now than it was five or
or certainly 10 years ago. So one of the things that changed recently is with the advent of sort of
sequence to sequence style neural network models and their variants, it becomes natural to think of
a lot of structured prediction tasks as these sequential decision making problem. The easy example
is something like machine translation or I guess even easier part of speech tagging where the output
is just very clearly a sequence in translation case, a sequence of words. And then this can be very
easily interpreted as the sequential decision making problem where in each step you're deciding on
the next word to produce. For other problems, you know, it's often a little bit more complicated. So
for dependency parsing you know there's probably about a half dozen different shift reduced variants
that transformed the problem of constructing a directed dependency tree into essentially again, a
sequential decision making problem.

</turn>


<turn speaker="Hal Daume III" timestamp="01:51">

And so I think that while this sort of style of thinking of structured prediction output as being
one of making a sequence of decisions hasn't historically been the way that many people in the field
think about it. I think nowadays because of the success of these models, it's becoming almost the de
facto way of thinking about these problems, and then once you have it a sequential decision making
problem, the question is, okay, well now I have to train this thing that's making the sequential
decisions and then the question is how can you train this and the traditional answers you train by
something like maximum likelihood or some max margin criteria or something like that where you say
that you want observed training output to have high likelihood under your model, but the sort of
reinforcement learning and imitation learning paradigm offers, I guess alternative solutions to that
that have some advantages in terms of hopefully leading to better models.

</turn>


<turn speaker="Matt Gardner" timestamp="02:45">

I guess I'll jump in here early. As you're talking about applications of this, I've been doing a lot
of work on semantic parsing or what you're parsing into is some kind of executable representation
like a program. And often you want to train these things just with question answer supervision so
you don't get a labeled sequence. All you know is after I've finished a sequence, is this correct or
not? And now this looks very, very much like a reinforcement learning problem. And so we've seen
very recently a whole bunch of reinforcement learning methods being applied to these kinds of tasks.

</turn>


<turn speaker="Hal Daume III" timestamp="03:13">

I think this is a really interesting example. So the cases where if I think about this, you know,
sort of as like a traditional structured prediction problem, the structure is in a latent variable
more than in the output. And I think that it is very natural to think about this as reinforcement
learning where basically you make a sequence of decisions and then at the end of the day you
basically get like a thumbs up or thumbs down or some sort of scalar signal telling me whether that
whole sequence of decisions was good. So, yeah. So I think we're seeing a lot of that. I think
there's a little bit of a risk when you think about structured prediction problems as reinforcement
learning problems, there are two fundamental things that make, I would say most if not all
structured prediction problems easier than your sort of arbitrary reinforcement learning problems.
So the first is that the world is deterministic typically and also typically fully known.

</turn>


<turn speaker="Hal Daume III" timestamp="04:04">

So in translation, I know if I say the next word should be dog, the next word is going to be dog.
There's no chance that like the world conspires against me and does something unexpected. And so
that's sort of the first way in which I think the structure prediction setting is easier the second
is that, so there are of course many variants of reinforcement learning, but one of the standard
models is the setting where you really only get one chance at life. So like, you know, you have a
robot and maybe it can live a million times, but in each life execution it has to sort of commit to
one half and just do that path. Right. So I think Tim Vieira has been calling this, you only live
once. YOLO reinforcement learning. And I think that this is also a case that's a little bit
different in structured, prediction cause in structured prediction. You can easily produce an n-best
lists and you could in the semantic parsing example, you can of course compute for each of the
hundred best outputs, what's the reward? And so I think this gives you a bit more power and leverage
that you can use that sort of semi unique to the structured prediction setting that potentially
makes things a lot easier. And I think that's also why imitation learning comes up, which we haven't
talked about yet.

</turn>


<turn speaker="Matt Gardner" timestamp="05:18">

Yeah, and another difference with typical reinforcement learning, you can correct me if I'm wrong
here, but it feels like in more traditional reinforcement learning tasks, you have to spend a lot of
time thinking about what your reward is. And very often you have just a point reward after some long
search or you have to try to give some hints to guide the search until you get a good point reward.
But if you're treating structured prediction as a reinforcement learning problem, you basically have
a fixed known reward at every step.

</turn>


<turn speaker="Hal Daume III" timestamp="05:45">

Yeah, I think that's, I mean I think that's like 90% right. So I think there are some cases that I
want to set aside. So your semantic parsing case I think is a little different because there you
really don't know until the end. I mean maybe you could craft heuristics or something, but by
default you don't know.

</turn>


<turn speaker="Matt Gardner" timestamp="06:00">

Yeah. And you said that's more of a case where the structure is latent, it's not in the output
space. So it's questionable whether that's even the same thing here. Right?

</turn>


<turn speaker="Hal Daume III" timestamp="06:06">

Yeah, I think that's right. So, but I think, yeah, in the traditional sort of structured prediction
setting where the output that's structured, at least in cases where you know, we've successfully, we
meaning the broader community have successfully done things. It's almost always the case that you
have some intermediate signal about whether you're doing a good job. If the gold standard
translation is "the hippopotamus walked into the lake" and the first word you produce is "building."
You probably know at that point that you're on the wrong path.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:36">

So imitation learning came up. Could you tell us what it is? Yes. So I think of imitation learning
as sort of this very broad category where you're trying to solve a sequential decision making
problem like you would in reinforcement learning. But instead of learning just from a longterm
reward that you get at the end of completion of a task, you get to observe some someone else,
"someone else" in quotes performing that task.

</turn>


<turn speaker="Hal Daume III" timestamp="07:01">

And then hopefully you can learn from their behavior. And I think there's two dominant styles within
imitation learning. So one, I would roughly term learning from demonstration. So the setting there
is that the only thing you have access to is a bunch of executions of the task by an expert. And
this is basically a static data set that you can query. And in some ways this is maybe the closest
match to the way that people by default think about structured prediction as sort of a reinforcement
learning task. Because I have a training set, I can interpret the gold standard output as some path
and my sequential decision making process. But that's sort of the, the only access I have to the
expert. And then there's the more interactive setting where you assume that at any point in time the
expert is queryable.

</turn>


<turn speaker="Hal Daume III" timestamp="07:52">

So translation you would say, okay, the gold standard output was "the hippopotamus walked into the
lake." And you know, maybe my translation system starts off and it produces "a big," and then you
want to ask the expert like, okay, if you had started your sentence with "a big," how would you
finish that sentence? And so this obviously requires much stronger assumptions about the sort of
access you have to this expert. But when you do have this access, you can often get much better
algorithms. I think one of the things that people work on in the space of imitation, learning for
structured prediction is really trying to get at this question, how can I compute that expert? So
you can think about the experts simply as like a search task. So I have some prefix of my output and
I want to minimize over all suffixes, the overall loss that I would obtain if I if I produced that
suffix.

</turn>


<turn speaker="Hal Daume III" timestamp="08:51">

And so for some tasks this is trivial, like sequence labeling under a Hamming loss, the answer is
always just do whatever is the right thing to do on the next word. In some cases it's a bit harder.
So you know, for dependency parsing Yoav Goldberg and colleagues have a handful of papers on how to
do this computation efficiently. And then for other problems, you know, we may be able to
approximate it reasonably well, but I don't know, for instance, for like BLUE score with machine
translation, whether anyone knows if there is an efficient solution. There, there is for like string
edit distance. So there's a bit of a tension there in terms of, you know, what do you want to
optimize versus what is efficient to approximate.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:32">

So in your own work on using intuition, learning in machine translation, what would you do in order
to approximate this loss?

</turn>


<turn speaker="Hal Daume III" timestamp="09:39">

So in practice for these sort of general text prediction tasks, like whether it's translation or
caption generation or something like that, we've tended to use edit distance because it's actually
quite easy to write down. I mean you basically just sort of decompose the standard string edit
distance dynamic program. It's pretty efficient. It also has this very nice property because in
string edit distance, the worst case is I write down a word and I shouldn't have written it down and
so then I'll do a delete. So the worst case loss that you get for any single decision is one with
one exception, which is if you accidentally produce end of sequence prematurely. So you have to sort
of special case that, cause that will obviously cost a lot if you've only produced one word and the,
the actual thing should have 20 words but string edit distance, it's very easy to compute and it's
pretty easy to optimize.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:30">

So, how is the preformance for choices of the trends was a approximating every words.

</turn>


<turn speaker="Hal Daume III" timestamp="10:35">

The answer here is actually a complicated and I think pretty interesting. So there's actually kind
of a big open question. Okay. Maybe it's not a big open question, but I think there's an open
question about, you know, are you better off optimizing the thing that you really care about? Let's
say it's BLUE score or are you better off optimizing something simpler that's may be easier to
approximate. There are two issues here that are worth disentangling. So one is can you compute what
the optimal action would be or what the optimal decision would be from any stage. That's basically
just sort of a standard sort of computer science question. And then there's the learning question,
which is I might have a relatively simple loss like string edit distance. That's pretty much always
zero one except for this end of sentence case. Or I might have a really complicated loss like meteor
or something like that where there's all sorts of partial credit for synonyms and stuff like that.

</turn>


<turn speaker="Hal Daume III" timestamp="11:30">

And there's a little bit of an analogy to even like binary classification under surrogate losses.
Like are you better off optimizing the thing that you care about or are you better off optimizing
something that's close but it's maybe much, much easier to learn. And so I don't know the answer
partially because we don't know how to do this computation for the harder thing. I mean, I think
generally there does seem to be sort of benefit for getting closer and closer to the loss function
you care about. But I think that there's definitely a plateau at some point where it's probably not
worth it. And, and you're maybe even making the learning problem harder as an extreme example. Maybe
the loss function you care about is just do I exactly match the gold reference. Right. And so you
get one point if you match it and zero points. Otherwise this is gonna be super hard to learn
because like any mistake will throw you off entirely. So there are sort of obvious cases where it's
bad to go for the loss that you care about. At least initially you could imagine some curriculum
thing or something like that. But yeah, I think the short answer is I don't really know.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:31">

So that's not fundamentally one of the biggest issues with your learning standard, right? That's
where you still don't know how to define word rewards. I guess the difference here is that we were
actually able to get good performance on some of these standard tests with our not great
approximations for their work.

</turn>


<turn speaker="Hal Daume III" timestamp="12:46">

Yeah, I think that's right. And you know, I think there's also a little bit of a disconnect, you
know, between some research land and real land, right? In research land we're happy to say like, Oh,
the metric I care about is BLUE, I'm going to optimize BLUE and then end of story. But you know, if
you're actually deploying a production machine translation system, like BLUE is probably one of many
metrics that you're tracking and you know, do you really want a super fine tune for one of them when
what you really care about is, you know, sort of like user experience or something like that. So you
know, I think that's also slightly why I'm not super concerned with am I optimizing exactly the
thing because probably that exact thing is not even what I really want to optimize anyway.

</turn>


<turn speaker="Matt Gardner" timestamp="13:33">

Yeah. There was a recent paper, I believe it was by folks at Salesforce. They used ROUGE instead of
BLUE, but they optimize this directly and found that it was much worse than say multitasking with
the language modeling. Even though they got higher ROUGE scores, the output just looks
incomprehensible. So why should you do this?

</turn>


<turn speaker="Hal Daume III" timestamp="13:50">

Yeah, it used to be the case at least at the document understanding conference that they would use
ROUGE where it first throughout all stop words. And so if you train against that, lo and behold,
you'll learn to produce this summary with no stop words cause you can pack it in more content words,
which is obviously not what you want.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:07">

Right. So I heard you in multiple occasions talk or write about dagger as your favorite algorithm.
Could you tell us about it as a concrete way of doing imitation learning?

</turn>


<turn speaker="Hal Daume III" timestamp="14:17">

Yeah, so I often say the dagger is my favorite algorithm. And the reason I say that is because it's
a, it's simple. It works pretty well. It's not like you can't beat it for sure. It's been beaten
both sort of theoretically and in practice, but it has sort of a nice flavor that also has led to a
bunch of subsequent development. So the basic idea is I'm okay if I hand you a pile of
demonstrations, the first thing you're going to do is you're going to do what is a traditionally
called behavioral cloning, which is basically just a fancy way of saying I'm going to do supervised
learning against the ground truth data. This means I'm just going to; given every state that the
expert visits, I get to see the action that they take in that state. And then I'm going to train a
classifier to try to re predict that action.

</turn>


<turn speaker="Hal Daume III" timestamp="15:03">

So this is essentially what, you know, for instance, in sequence to sequence models, this is
basically how they're all trained by default. The problem, which I guess you know we've known about
since at least like 2000 well, I've known about it since about 2003. I'm sure that other people were
perhaps aware of this before me. But the problem I guess is I think like Marc’Aurelio Ranzato has
started calling this exposure bias. So how much I think is a good name. So it's basically that
you're training the decision maker assuming all past decisions are made correctly. And so then a
test time, if you start making incorrect decisions you sort of get off of this gold standard path.
And then you know, in the worst case the model has no idea what to do. So what dagger does, it says,
okay, first run supervised learning or behavioral cloning.

</turn>


<turn speaker="Hal Daume III" timestamp="15:51">

Now what I'm going to do is I'm going to take the thing that I learned there and I'm going to run it
over the training data and it will probably diverged from what the expert did. and every time it
does, I'm going to ask the expert, what would you do in this state that I didn't see the first time
around? So I'm basically asking the expert like how do you correct for the errors that the model is
making? So this will give me a new dataset. So I'll take the union of the original data set and this
new one, and I'll train a classifier on the union. Basically the resulting classifier now has
learned to recover from the mistakes of the previous one. But of course they will make it;s own
novel mistakes. And so you now want to repeat this process and you know sort of in like a
traditional iterative optimization kind of fashion, you can show that at some point in this process
you don't have to run it too long.

</turn>


<turn speaker="Hal Daume III" timestamp="16:36">

You'll end up with something that has reasonably good performance guarantees. Nowadays, I think most
people who do dagger would call what I just described batch dagger because you're sort of building a
dataset training, building a dataset training. No one really likes to do batch learning anymore. So
pretty much everyone does online dagger. The main difference is just that you, okay. So when you
would have created an example that you would put into your dataset, instead of doing that, you just
do an online update on that example. And so you start off by doing your standard online updates
across the whole dataset. And then you pick one example, make predictions, ask the expert for
advice, take that and make those updates. Go to the next example. And so on. So this was not the
version of the algorithm that was initially proposed, but you can analyze it too. It works fine.
Especially in today's everything stochastic gradient descent style. This is I think the one that
people do in practice

</turn>


<turn speaker="Waleed Ammar" timestamp="17:29">

How important is it to use the new experiences as opposed to correct the gold standard experiences
when you were mixing these examples, especially online.

</turn>


<turn speaker="Hal Daume III" timestamp="17:38">

Right. So, so I guess just to be precise that the terminology that I like for this is that I think
of this as I'm making a sequence of decisions and at some point I'm going to ask the expert what
would you do here? And so you can ask what policy was I using to make the previous decisions? I'll
call that the rollin policy. And then I can ask what policy would make future decisions. And I'll
call that the rollout policy. If you always use the expert as the rollin policy, then you're just
training on the gold standard trajectories and life can be really bad. I mean certainly in theory,
in practice it's rarely really bad, but you know, it's usually you could do better. And then there's
this question like, okay, do I completely switch over to my learned policy at some point or do I
interpolate between the expert and the learned policy or whatever.

</turn>


<turn speaker="Hal Daume III" timestamp="18:29">

This also comes up in like the mixer algorithm where they do some sort of interpolation. So I think
here the answer is slightly unsatisfying. So the answer is that like, at least as far as theory
goes, all theory says you should just never roll in with the expert at all. You should just always
be rolling in with the policy. So like if you look at the, the regret bound that you get for dagger,
there's this term that you pay that depends on how you're doing the roll in. And if you actually
just did this roll in according to learn policy, this term would be zero, which would be like the
minimum in the bound. But in practice, no one does that because you end up wasting a lot of time
exploring parts of it. Like when the, when the learned policy has only seen like zero or 10
examples, it's making essentially random decisions.

</turn>


<turn speaker="Hal Daume III" timestamp="19:20">

And so you're getting like really not so useful feedback. The only place I've seen someone really
try to analyze this is in the scheduled sampling paper. So scheduled sampling is basically running
something like dagger on a recurrent neural network and they have three or four maybe different
schedules for interpretating between the expert and the learned policy. I don't remember there being
like a really strong obvious winner. And I think that actually for like the more complicated
problems, they only reported results for the thing that was best and didn't report a comparison. So
I mean, my own experience is I pretty much always just use the 0.99 to the example number
probability of rolling in with the experts. So you get started on this geometric decrease of use of
the expert. And I usually pick that 0.99. So like if I know that, you know, the data set has 10,000
examples and I'm going to do 10 passes over the data.

</turn>


<turn speaker="Hal Daume III" timestamp="20:15">

So that's like a hundred thousand examples. So I picked the 0.99 so that that number to the 100,000
is like 0.1 or something like that. So that, you know, I have, cause you know, if you sent it to a
0.99 and you have a million examples, then like by the time you're not even 5% of the way through
the data set, you're not using the experts. So I don't know, that's my heuristic, but okay. You
know, I don't think, I think the thing that's unsatisfying here is that the theory says you should
use always learned rollin. But I think all practical experiences that that's not true. So there's
clearly a gap in the analysis.

</turn>


<turn speaker="Matt Gardner" timestamp="20:54">

Can I jump in here with a clarification for people who aren't familiar with this? So you've been
talking about an expert and I think we haven't really said exactly what that is. And you, someone
listening might have the idea that I'm like getting additional annotations on the fly even at every
training instances. You said that like now we do this online dagger kind of stuff. So to be super
clear, let's, I'm doing part of speech tagging and I'm predicting I'm, I'm getting input words, I'm
predicting parts of speech. And if I use policy roll in, as you've described it, so I'm, I'm
predicting parts of speech and now let's say I've made a few incorrect predictions, where do I get
an expert for what comes next? Is this from the data?

</turn>


<turn speaker="Hal Daume III" timestamp="21:38">

Yeah. So thank you for asking this question because this is the question that everyone asks and yet
I still clearly gloss over it too much. So abstractly, the, you know, this notion of an expert came
from the fact that, you know, a lot of imitation learning comes from, for instance, robotics where
you would actually maybe ask a person, you know, what would you do in this case? We, you know, don't
want to do that. So we generally take advantage of the fact that like, this thing that I mentioned
at the beginning that in structured prediction land, we know the world exactly. It's deterministic
and so on. And so what I really want the expert to do is, I want the experts to tell me at this
point in time, if I make this decision and subsequently make all other decisions optimally, sorry,
let me rephrase that.

</turn>


<turn speaker="Hal Daume III" timestamp="22:32">

What I want the expert to do is I want the experts to tell me what action to make right now so that
if I made that and all subsequent decisions, optimally I would minimize my downstream loss. And so
this is a point where it would be nice to have a whiteboard, but in the sequence prediction under
hammy loss, this is particularly easy, right? So like, let's say I've made three mistakes so far
under a hammy loss, I just pay for the total number of words that I tag incorrectly. And so if I,

</turn>


<turn speaker="Matt Gardner" timestamp="23:08">

Hamming loss is another term that some people might not be familiar with, this is this zero one. Did
I get each action right? Right.

</turn>


<turn speaker="Hal Daume III" timestamp="23:14">

Yeah, that's right. So, how many words do I tag incorrect? If this is the loss that I care about, if
I'm asking myself, how should I tag the fifth word, it makes no difference how I tagged the previous
four words and it makes no difference how I tag future words. Because in the future, the best thing
to do is just tag every word, right. Regardless of any errors or any correct decisions I made in the
past. In this case, the expert is like super easy to compute. It's just the best thing to do on word
five is whatever the label is for word five in the translation example, it's harder, right? So if
the, if the truth is "a big hippopotamus ran into the lake" and I produced "a hippopotamus," it's
not clear, should I just ignore the fact that I missed the word big or should I try to say a
hippopotamus that is large ran into the lake or whatever. Right? So there's a bunch of different
ways that you could try to repair and the way that you know is if I made all subsequent decisions
optimally, what would minimize my loss? So our experts are pretty much always in these sort of
simulated experts where you can at least in principle computationally evaluate all possible future
suffixes and compute a loss and then pick the minimum. In practice. You probably don't want to do
that because there are too many than you have to have algorithms for doing this.

</turn>


<turn speaker="Matt Gardner" timestamp="24:32">

So how do you do this in practice for translation? The naive thing that I can think of, I haven't
done this for translation before, but I'm thinking if my label is "a hippopotamus walks into the
lake." And I produced "a big," if I just go by word index, I'm going to skip hippopotamus because
hippopotamus was the second word in my input and I said big there and so like do you have to shift
something over? Like how, how does this work?

</turn>


<turn speaker="Hal Daume III" timestamp="24:54">

Yeah, so this is hard. My recollection, which I hope is not wrong, but my recollection is that in
for instance the scheduled sampling paper, they use a strategy which has been called data as
demonstrator, which does exactly what you say. If the truth is a hippopotamus, blah, blah, blah, and
you produce a big, then the right thing to do to say blah, blah, blah, and you're going to totally
miss hippopotamus. So, so that's maybe not great. The answer of course depends now on what your loss
function is. If you're loss function is string edit distance, then I'm going to be like super hand-
wavy here. But if you're loss function and string edit distance, then essentially this big is either
going to correspond to an insertion I have an extra word, assuming you completed as hippopotamus,
blah, blah, blah. Or it's going to count as a swap where you swapped the word hippopotamus with big.

</turn>


<turn speaker="Hal Daume III" timestamp="25:42">

So let's assume that your string edit distance, is set up so that the cost of a swap is bigger than
the cost of an insertion, which it's kind of an arbitrary decision, but it makes this case work out.
So if the cost of a swap is bigger than it's going to say, okay, at this point, the best thing to do
is to think of the big as an insertion and then complete by saying hippopotamus next and then going
on. But this does depend on exactly how you set up the costs for the different edit operations.

</turn>


<turn speaker="Matt Gardner" timestamp="26:10">

You mentioned earlier that it's tractable. You can write down easy solutions for edit distance. I
assume this doesn't include some kind of language modeling loss because you would expect that to be
a lot more informative on whether the swamp or the insertion is more reasonable.

</turn>


<turn speaker="Hal Daume III" timestamp="26:23">

Yeah, right. Yes, you're right. It does not. If you wanted to be fancy, you could have some sort of
a nontrivial costs associated with swaps and insertions and deletions. Right. You could say swapping
horse with pony is less bad than swapping horse with astrophysics. Yeah. I've never tried that.

</turn>


<turn speaker="Matt Gardner" timestamp="26:42">

I guess a bunch people have done similar stuff for like label, like predicting class labels, right.
That's, it doesn't seem that far to push this toward using it inside of an algorithm like this.

</turn>


<turn speaker="Hal Daume III" timestamp="26:54">

So I think this is a totally reasonable thing to do. I simply haven't tried it. I think one thing
that's not totally obvious is how you would compare those costs to cost of insertions and deletions.
So you know, how much better is it to replace horse with astrophysics than it is to just drop horse
altogether? I don't know. I mean, but then this gets into metric design and you know, all this other
stuff.

</turn>


<turn speaker="Matt Gardner" timestamp="27:17">

And it's totally context dependent, which will like kill your algorithm for efficiency and

</turn>


<turn speaker="Hal Daume III" timestamp="27:21">

Yeah, that's right. Right. So because it's edit distance, it has to be word by word. You're not
allowed to condition on anything else or the dynamic program goes away.

</turn>


<turn speaker="Matt Gardner" timestamp="27:29">

Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:29">

So we talked about imitation learning for NLP, why do we do this? Do we do this to improve the speed
of inference, do we do it because it allows us to incorporate more dependencies across the different
variables that we're predicting. Why would we do it?

</turn>


<turn speaker="Hal Daume III" timestamp="27:42">

Yeah. So I think this answer has actually changed dramatically over time. So in the beginning,
meaning 10, 12 years ago, the answer was was fewer independence assumptions and speed. So at the
time the dominant solution to structured prediction problems were things like conditional random
fields and max margin mark off networks where you basically have to make pretty strong independence
assumptions in order to get tractable inference algorithms. And so one of the things that was I
guess a selling point of the sequential decision making view is that you could condition on anything
in the past and you sort of get that for free. I mean you don't get it for free. You get it at the
cost of, you have to do this iterative training algorithm, but you get to do greedy search for free
at test time, which means that you get to condition on whatever you want and you get to be fast.

</turn>


<turn speaker="Hal Daume III" timestamp="28:30">

I think that now the story is a bit different because I think that to some degree, the incumbent
techniques these days are sequence to sequence models and their variants trained on maximum
likelihood loss. And so now it's really a question of is the test time behavior of this model being
substantially hurt by the fact that it gets into areas of the search space or it basically it makes
errors that it doesn't know how to recover from. So if you have a part of speech tagger that's
getting 95% accuracy, is this worth doing? Probably not. You should just stick with your maximum
likelihood trained thing. A because there's not much head room and B because if your thing is 95%
accurate, 95% of the time it's making the same predictions as the expert anyway. And so this whole
notion of getting additional data off the training path sort of goes away.

</turn>


<turn speaker="Hal Daume III" timestamp="29:24">

So I think that where you would hope to see sort of interesting things happen are cases where the
model does often sort of get off the gold path in ways that are potentially recoverable but that
don't sort of by default have data to recover from. And then think the other is that you're
optimizing maximum likelihood by default. You don't get to take into account whatever you think a
good loss function is for this task. So you're training your machine translation system to optimize
likelihood regardless of whether you care about blue score or Meteor or whatever. And so you get the
advantage, you can inject your specific loss into the training process.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:03">

I think this is a fairly common, I don't know, most of the ones i've worked on performance was far
from perfect and we definitely made a couple mistakes that can be recovered from, I think it's fair
to say that imitation learning for NLP is not mainstream yet. So what's preventing us from using it
all the time? Is the performance actually compelling enough for everyone to be using it or not?

</turn>


<turn speaker="Hal Daume III" timestamp="30:25">

Yeah, I think there's a couple of things. One is I think that for very well studied problems like
you know, a part of speech tagging or dependency parsing or whatever, they're pretty much always
consistent gains to be had, but they're not huge. And so I think that hasn't been this mind blown
experience where it's like, Oh I have to do this thing. And I think, you know, for more complicated
problems it's actually hard. So while you get this nice benefit that the test time behavior is fast,
you do pay at training time and you sort of pay in two ways. So one is that you have to compute this
expert which takes time. And the other is that the computation and integration of the expert doesn't
always play nicely with the way that we like to pack things to work on GPU and all that sort of
technical engineering stuff.

</turn>


<turn speaker="Hal Daume III" timestamp="31:19">

Right? Cause like if you think about translation, what I'm really asking you to do if you want to
run this algorithm is I'm asking you to decode your training set many, many times. And decoding is
slow and this naturally makes training slower. So part of the answer to your question is, imitation
learning style techniques, people are gaining awareness, but there's not, as far as I know off the
shelf algorithms built into standard tool kits that comes with additional training overhead. And I
think part of it might be that as a community in NLP, we tend to think a lot more about
representation than about algorithms. And so I think that when we tend to look for improvements on
problems, we tend to default think about how can I model this thing better? Because I don't know,
like I really like language. Like it's fun to think about like how do I model language?

</turn>


<turn speaker="Hal Daume III" timestamp="32:08">

And I think we think more about that and less about algorithms and I think that's totally fine. I
think that, you know, the best of both worlds is that the people who love thinking about
representations can do awesome representation work. And then people who really love algorithms can
do awesome algorithms work and then you plug them together and then you win the universe. But you
know, I think that practically we'll need sort of better toolkits. We'll need better open source
software for instance. The fact that I kept sort of going back to this string edit distance example.
So as far I know there's maybe like me, and this is limited by who I talk to, but there's me and
like one other person who knows how to do this. So it's not hard to derive, but it takes a little
bit of work. And so I don't think there's been a paper that, for instance, shows what the algorithm
is for computing this this expert efficiently and so on. So I think that there's there's still a
bunch to be done in terms of getting tools and resources out.

</turn>


<turn speaker="Waleed Ammar" timestamp="33:06">

Are there certain characteristics of a problem once you see them, you say, Oh, this is a good fit
for imitation learning?

</turn>


<turn speaker="Hal Daume III" timestamp="33:12">

Yeah. Every problem. No more seriously. I, you know, I think it's like, you know, if you're already
doing really well on the problem, it's not worth the effort. The other thing to keep in mind is that
you're getting 95% accuracy. It's maybe not worth it. The other thing that's sort of changed with
the advent of sort of deep learning stuff is that we basically know now that we can over-fit
anything, right? But if you over-fit your training data, then rolling in with your own policy versus
rolling in with the expert are exactly the same thing. This has changed with sort of deep learning
models. This used to be a small issue. Now I think it's a major issue so you have to be very careful
that you do some sort of like regularization or drop out or something like that to ensure that your
training performance is not artificially bloated over what your test performance would be like or
you have to do cross validation, but then this adds all sorts of extra overhead. That's really
difficult and now I totally forgot actually, what was your question?

</turn>


<turn speaker="Waleed Ammar" timestamp="34:12">

Are there other characteristics that will tell you that this is a good fit?

</turn>


<turn speaker="Hal Daume III" timestamp="34:16">

Well, I mean from a practical perspective, if you have a super enormous dataset A, you might be able
to just fit it pretty well B, you might be really unexcited about decoding it over and over again,
which is maybe one of the reasons why there's not a huge amount of work in machine translation land
in this space. Because there are, you tend to have very large data sets, but you know, there are
certainly plenty of problems where you have large data sets, but models still aren't very good. So I
don't know. I mean I think, I don't think I have a much better answer than just if there's not that
much head room, it's probably not worth it otherwise, if it's not a computational burden, it's a,
it's possibly worth trying.

</turn>


<turn speaker="Waleed Ammar" timestamp="34:54">

Alright, sounds good. Are there any other thoughts on this topic?

</turn>


<turn speaker="Hal Daume III" timestamp="34:58">

So we talked about imitation learning for sort of the bulk. I wanted to circle back briefly to like
reinforcement learning more broadly. There's been a handful of papers. The first one I know of that
came out was by Stefan Riezler looking at quote unquote "bandit structured prediction." And this is
basically the setting where you have a structured prediction task, but all you get to know at the
end is whether you did a good job or not. You never get to see what the right output was. There's
been similar stuff to this in the past. So I remember this paper by Ryan McDonald where they're
trying to train a perceptron to optimize some downstream task behavior, which has a very similar
flavor. It was probably from the late two thousands maybe or maybe the early 2010s so the setting
that I always think about when I think about this problem is if you use Facebook or Twitter and you
have friends who post in languages that you don't know you can often ask for a translation and then
sometimes they'll ask for, you know, or rating like, you know, how good was this translation, like
one star to five star or something.

</turn>


<turn speaker="Hal Daume III" timestamp="35:58">

And then you'd like to use that to improve the quality of the translations. This looks much, much
more like a reinforcement learning problem where I make a sequence of decisions to produce a
translation and then it's only at the end that I get feedback about whether it's good or bad and I
never get to know what a good translation would have been. So this has a flavor of reinforcement
learning in the sense that you get this external reward. It also has this YOLO flavor where I don't
get to show a user 25 different translations and to ask them to like score each one. I sort of get
one shot at this, but we do still have the advantage that we have in structured prediction that we
can do all sorts of computation offline because we know how the "world works." So I think this is an
interesting middle ground where you have a bit more structure than in a pure reinforcement learning
setting.

</turn>


<turn speaker="Hal Daume III" timestamp="36:51">

And I guess my side comment is reinforcement learning is really hard. If you can avoid doing it,
you're probably in a pretty good place when we have problems like this where there is additional
structure beyond, just reinforcement learning. I think the degree to which we can take advantage of
that structure is really good. And I haven't actually seen any work on this where people try to take
advantage of this. So for the bandit structured prediction work that I've seen, which it's not a
particularly big community, it pretty much all treats it like just straight up reinforcement
learning. Our own papers included. And I think that's leaving a bunch on the table that we could
possibly capitalize on.

</turn>


<turn speaker="Matt Gardner" timestamp="37:31">

I guess circling back to semantic parsing, people do do this a bit in semantic parsing where you may
be take it, there are ways of building up a program that you would execute where you can do partial
executions as you're going and use that to help you in your search. So yeah, other than your
structured bandit, I guess semantic parsing is another area that's at least close.

</turn>


<turn speaker="Hal Daume III" timestamp="37:51">

Yeah, no, I think exactly. I mean, you know, I honestly haven't followed semantic parsing for the
past couple of years, but a couple of years ago I remember sort of the, maybe the dominant paradigm
is, you know, essentially produce an n-best list, run all of the things in the n-best list and cross
your fingers that one of them gives you the right answer and then do fancy stuff with the result. So
I think that the bandits structured is a little harder because you only get to evaluate one, but you
can still compute a lot. And so this gives you a lot more potential power. But I actually, I think
that semantic parsing and program synthesis and you know, these problems, I think these are really
awesome problems to think about in this space. There is a lot of room for both building better
imitation or reinforcement algorithms and hopefully, you know, we're getting better at this problem.
I think it could be really fruitful.

</turn>


<turn speaker="Matt Gardner" timestamp="38:42">

Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="38:42">

On this topic, I think you had a recent paper with colleagues on ICLR 2018, would you like to tell
us a little bit about us.

</turn>


<turn speaker="Hal Daume III" timestamp="38:50">

Yeah. So re slope, you know, I could, I could tell you about it for an hour, but I won't. So this
paper essentially started as this paper on learning to search better than your teacher, which was
ICML 2015 where we essentially had a new imitation learning algorithm. And then we observed that
with small changes, you could apply it in the structured bandit setting. And so there's a little
theorem in there at the end of the paper that says this isn't going to be too bad. So then you can
go implement that after the papers accepted and realize that it just doesn't work at all. And so
then we had a couple of intermediate workshop papers where we were really trying to understand why
doesn't this work? I mean, okay, at a very broad level there's too much variance in the system. But,
more specifically, the thing that goes wrong is that suppose that I make a few decisions according
to my current policy and then at some step I decided to try something new to see if it's better than
what my default would have been.

</turn>


<turn speaker="Hal Daume III" timestamp="39:44">

So I try this new thing and then at the end of the day I see some loss or some reward associated
with it. Now the problem is that I don't know whether that loss should be attributed to the decision
that I changed or whether it's due to other decisions along the path. And in particular, the thing
that went wrong in the previous algorithm was taking into account decisions that I'd made
previously. So like if I make three errors before I try this deviation, then this deviation is going
to look bad regardless of whether it's actually a good deviation or not. The re slope idea is
basically to try to automatically do this sort of credit assignment. And so roughly what it does or
at least my, the way that I explain it and sort of anecdote is, so suppose that I have a policy for
getting into the library and today I decide instead of turning left here, I'm going to go straight
and see if that gets me to the library any faster.

</turn>


<turn speaker="Hal Daume III" timestamp="40:38">

So I choose to go straight and let's say after a block I run into one of my friends at a coffee shop
and I grab a cup of coffee and I talk to them for five minutes. And then I ended up late to the
library by four and a half minutes. Now does this mean that this was a bad decision? No, it actually
means it was a really good decision cause I can attribute five minutes to my coffee. And so this
actually overall saved me 30 seconds. And so what Re-slope is trying to do is it's trying to learn
just from this end of the day feedback or what were the decisions that I made that sort of added up
to that long term reward. And so then by doing this credit assignment you can do a better job of
trying to figure out whether this deviation you made was good or not.

</turn>


<turn speaker="Waleed Ammar" timestamp="41:17">

That sounds a lot like inverse reinforcement learning is that one of the ways you would do that?

</turn>


<turn speaker="Hal Daume III" timestamp="41:21">

So actually that had not occurred to me when we were working on this. But yeah, I mean I think there
is very much an inverse reinforcement learning flavor. So for people who don't know, right. So
inverse reinforcement is the task where I get through, observed some behavior. I assume that the
agent who is executing this behavior is sort of near optimal for some reward function. But I don't
know what that reward function is. And then I try to reverse engineer what that reward function was.
So like you watch, I don't know Hal write papers and you don't know why he's writing these papers.
So you try to imagine, okay, what could it be that he's optimizing for that's causing him to make
these decisions? Yeah, so I think there's a connection here in the sense that you're trying to infer
something about a reward.

</turn>


<turn speaker="Hal Daume III" timestamp="42:04">

I think the difference is that in traditional IRL, the data with which you do this is typically
demonstrations. Whereas in re slope, the data with which we're doing this is this reward that you
only get at the end. And I guess just as like a side comment, one thing I had no idea about until we
were doing this re-slope paper. So we did evaluation both on traditional reinforcement learning
tasks and on structured prediction tasks. And one thing I didn't realize is that if you take a lot
of standard reinforcement learning algorithms and you force them to only observe reward at the end,
rather than observe incremental reward as they go along, it makes the problem much, much harder.
Which I guess is obvious in retrospect, but I didn't realize to what extent these algorithms really
are relying on getting consistent incremental feedback that sort of pointing you in the right
direction. Like if you just give end of decision reward, like these things get really, really
difficult very quick.

</turn>


<turn speaker="Waleed Ammar" timestamp="43:01">

Yeah, that makes a lot of sense. And I haven't honestly tried any of the methods so I only probably
have a second hand experience.

</turn>


<turn speaker="Hal Daume III" timestamp="43:08">

My encouragement if you do is there was a nice summer school at the vector Institute this past
summer on deep learning and reinforcement learning. I guess this is just a plug for anyone who's
listening. So if you're interested in learning about reinforcement learning, the talks there were I
think really, really good. I mean I also gave a talk there. I'm not trying to like say that my talk
was really, really good, but mine was about imitation learning. So if you want to learn more about
imitations learning, you can look there. But a lot of the others had really good practical tips
where like if you want these things to work in practice, here's what you have to do. And I think
it's a, it's super valuable to hear this from people who have really been working to get these
things to work in practice over years or decades in some cases.

</turn>


<turn speaker="Waleed Ammar" timestamp="43:49">

All right. Thank you very much for joining us today. This was a fun conversation.

</turn>


<turn speaker="Hal Daume III" timestamp="43:52">

Yeah. Thank you for having me. I really enjoyed it.

</turn>
