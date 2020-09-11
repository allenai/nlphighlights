---
title: "Visual Reasoning, with Yoav Artzi"
hosts: ["Waleed"]
guests: ["Zhou","Matt","New Speaker"]
number: "082"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt" timestamp="00:00">

Hello and welcome to the NLP Highlights podcast where we talk about interesting work in natural
language processing.

</Turn>


<Turn speaker="Waleed" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Alan Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Matt" timestamp="00:12">

All right, today our guest is Zhou Yu who was an assistant professor at the University of
California, Davis. Zhou welcome to the program.

</Turn>


<Turn speaker="Zhou" timestamp="00:18">

Thank you Matt.

</Turn>


<Turn speaker="Matt" timestamp="00:19">

Today we wanted to talk about dialogue research. We've been doing these area overview episodes and
people requested talking about dialogue methods and chat bots and this kind of thing. Zhou led the
team at UC Davis that won the Alexa Prize last year, which was one of the main competitions for
these kinds of open ended dialogue systems and so we thought Zhou would be a great person to have on
to tell us about dialogue research and what's going on there. Zhou, do you want to start off by
telling us what is a dialogue system, what do we mean when we say dialogue?

</Turn>


<Turn speaker="Zhou" timestamp="00:53">

Yes, so when we talk about dialogue mostly is where the context is with respect to question
answering. So dialogues mainly have multiple turns. So basicly, I say something, you say something
back. I say something back to you again. So you have these kind of multiple exchanges between two
users or multiple users. When we say dialog systems, basically we replaced one of the humans was a
machine, so now we became a human talking to a machine. So this is our human-machine dialogue. So we
basically use these all of the time, Amazon Alexa or Apple Siri these are common dialogue systems
people may know or use everyday. So, the dialogue system sometimes it really depends, you can call
it spoken dialogue system, which means your input is speech or you can call it a normal dialogue
system or a text based dialogue system, which the input is typing text. Both of them could exist
while it would also depend on the output. If the Dialogue system is speaking back to you, then it's
more spoken dialogue system. If the dialog system is texting back to you, then it's more a text
based dialogue system.

</Turn>


<Turn speaker="Matt" timestamp="02:00">

When you say a speech dialogue versus a text dialogue, I imagine that all systems take spoken
language as input and produce spoken languages output will, in the inside still be working with text
and not a speech signal. Is that true?

</Turn>


<Turn speaker="Zhou" timestamp="02:16">

Yeah, that's a big difference in terms of what we call spoken dialogue systems or text-based
dialogue systems. Both of them are very popular.

</Turn>


<Turn speaker="Matt" timestamp="02:25">

Yeah. I guess it's a whole lot easier to interact with something with your voice.

</Turn>


<Turn speaker="Zhou" timestamp="02:28">

Yeah. So they have advantages and disadvantages, right, on both sides. So for a spoken dialogue
system, it's much easier to interact with your voice for sure. Especially if it's used for special
scenarios, for example, in car navigation where you can't really type. Sometimes, like in smart home
scenarios, people like to talk to it better than typing to it. Also, interacting with your smart
phones.

</Turn>


<Turn speaker="Matt" timestamp="02:55">

Yeah. And I guess, Microsoft research has some Twitter chat bots and those are all texts. You're not
going to have speech on Twitter. So yeah, I guess there are a lot of different applications.

</Turn>


<Turn speaker="Zhou" timestamp="03:05">

Yeah. So certain company's customer service systems are text-based, so again, type in, right, so you
can also call in basically type in systems has the advantage of it basically skip the automatic
speech recognition process so basically it's a little bit easier to process text information.

</Turn>


<Turn speaker="Matt" timestamp="03:24">

Yeah. One thing I'm still not totally clear on, you've mentioned in this discussion so far a whole
lot of different possible dialogue systems like we mentioned customer assistance; things like Siri
and Alexa and question answering systems. Is there a way to categorize the different areas of
dialogue research? How do dialogue researchers think about all of these different applications?

</Turn>


<Turn speaker="Zhou" timestamp="03:47">

We are mostly saying the tasks are very different from each other or the domain of the conversation
domain is different for every task. But in general, people may say a task oriented system or a non-
task oriented system. These are the major distinctions. A task oriented system is basically, the
system has a goal, it needs to complete and be evaluated on the go ,while non-task orientated system
is basically what people usually call social chat bot. That doesn't really have a specific goal, but
the major motivation for building such a system is to engage people in engaging conversation so for
entertainment purposes or for exploring what is AI?

</Turn>


<Turn speaker="Matt" timestamp="04:35">

Yeah, I guess you could think of what you're calling non-task oriented systems also. It's just a
different, much more open-ended task. I've looked a little bit into the Alexa Prize. The end goal is
to have an engaging conversation with a person that lasts for something like 20 minutes. And so you
do have a task, it's just defined in terms of this vague notion of engagement.

</Turn>


<Turn speaker="Zhou" timestamp="04:57">

Yes.

</Turn>


<Turn speaker="Matt" timestamp="04:57">

If you want to train a system, you've got to have some reward function or loss function, somehow.
And, I guess that's how you would try to train this for these more open ended systems in the end. So
can you give some more examples of what a task oriented dialogue system, as you've defined it? What
kinds of systems are these? Is Siri task oriented?

</Turn>


<Turn speaker="Zhou" timestamp="05:23">

It really is. I would say Siri is mostly task oriented. It is composed of different individual,
smaller systems. That completes one single task and they merge them together. So for example, one
small system handles setting alarms, one small system handling question answering and then they
merge them together. In terms of domain for dialogue system is basically, there are a lot of
domains. One possibility we talk about, customer service for example, booking tickets, booking movie
tickets, booking hotels. But it's actually more than a lot of people thought. Dialog system could
also serve as educational system. For example, the system that can teach you how to learn a second
language, can teach you science knowledge, it can help you to practice your communication skills and
all these different purposes of learning. Also, we say, we can help in terms of healthcare
applications. For example, when the nurse is doing the discharge, you can replace it was a
conversational system.

</Turn>


<Turn speaker="Zhou" timestamp="06:26">

Or, if people are doing interviews, such as clinical interviews, to screen depressions or PTSDs or
these kinds of different mental disorders, you can also use a conversational system to help you or
assist you in these kinds of dialogues. It's actually much more than you thought. They can also be
used in terms of entertainment. It can help you to buy stuff like a recommendation through
interactions it can recommend a certain movie to you, recommend certain type of clothes. So
basically you can think about it as conversational system as just another human being. And it's
advantage is just it can use a context. So, multiple exchanges to help you to do things or do things
together with you or, doing negotiation. So basically I have a go, he has a go and trying to
negotiate things, or I want to persuade you, you want to persuade me. So it can do almost anything
that humans can do. But what we mostly focus on is the language behavior, less on the nonverbal or,
actual physical behaviors.

</Turn>


<Turn speaker="Waleed" timestamp="07:36">

So, are there methods that transfer across different tasks, or is it mostly like a, every task is
completed or ends?

</Turn>


<Turn speaker="Zhou" timestamp="07:44">

That's a good question. Yes. S,o right now in the industry, everything is trained on one particular
domain and everything is trained from scratch. They didn't really leverage other tasks. So our
recent paper we submit to ACL is actually doing exactly what you were talking about, leveraging
other domain information to help a domain that has less training examples or less annotated data.

</Turn>


<Turn speaker="Waleed" timestamp="08:11">

Just to be sure, are you making a distinction between the domain and the task or are you using them
as synonyms?

</Turn>


<Turn speaker="Zhou" timestamp="08:18">

No, we mostly think domain and the task as the same.

</Turn>


<Turn speaker="Waleed" timestamp="08:21">

Okay. So, what you're describing now is work which transfers from a task and a domain to a different
task and domain?

</Turn>


<Turn speaker="Zhou" timestamp="08:28">

Between tasks. So, in dialogue system, a lot of times when we say task and domain, they are actually
the same thing, what we did before is we used meta learning to try to learn general models using
different domains or a task; try, you know, asking for weather [info], asking for restaurants,
asking for bus information and tried to adapt it to a new task that has less annotated data, for
example, booking movie tickets, so that we did a one-shot learning and also semi-supervised learning
gave them 10% of the data. Basically we're saying the reason that we can do these kinds of domain
transferring is you still look at these different tasks, they still share certain dialogue acts that
are universal. For example, booking tickets or booking restaurants, they all have this kind of
request information and they all have this kind of provide information that are going on between two
users. So basically you can basically learn these syntactic information for these tasks and transfer
it to a different task, but also have these kinds of dialogue acts.

</Turn>


<Turn speaker="Waleed" timestamp="09:34">

So you mentioned transferring the data. How about the models themselves that are used for each of
the different tasks? Do they tend to be, aside from your latest work on this problem, do people
typically use completely different methods or are they methods that generally work well for a large
variety of tasks?

</Turn>


<Turn speaker="Zhou" timestamp="09:53">

So, I have to clarify. One thing is my previous work is transferring the model. Not really data. We
are learning the model from multiple tasks and trying to use that model to adapt the model to a new
task. So if you're saying; if there are other people have been working on the similar areas about
transferring models from one task to the other. So, there is; Tiancheng [Zhao], from CMU, Maxine
[Eskenazi]'s studnet, he had one paper on zero-shot transfer learning, a similar concept also as
transferring the models to a new domain. Very few people have been working on that so it's basically
me and him. The reason is mostly, dialogue data somehow very few of the available dialogue data sets
are there, so people really have a hard time trying to find what is transferable and what is not
transferable. We have been working on campus restaurant, the bus information request data for a long
time. The major reason is it's really hard to collect these kinds of multi-domain data and
annotating these data regularly requires a lot of effort as well.

</Turn>


<Turn speaker="Waleed" timestamp="11:03">

So maybe something that would help clarify this is, can you give us a quick overview of how dialogue
systems work for task oriented or non-task oriented dialogues? What, are the basic building blocks
of these systems?

</Turn>


<Turn speaker="Zhou" timestamp="11:16">

So dialogue system, traditionally we separate them into a couple of different tasks. First is called
natural language understanding. So you have a sentence, for example, where, I want Italian food. I
want to understand in terms of what is the dialogue act. So basically it's providing me with the
information and I want to understand specific slots that are useful for me to help me to query
information from the database. Here, particularly is Italian. So, you can treat this as sequential
tagging problems and also dialogue act prediction problems. So they are two, and then once you have
these information about the slots, then what we usually do is called, dialogue state tracking. So
dialogue state is basically something you can think about in reinforcement is similar as well, the,
history. Basically things you want to track over time. In the restaurant domain,

</Turn>


<Turn speaker="Zhou" timestamp="12:13">

basically things you wanted to track are what type of food you want, how many people you wanted to
book the restaurant for, where do you want to go? So these kinds of areas. So, these information you
accumulate over time for once a conversation is going forward. So you basically accumulate all these
states you want to track over time. That's another task we call dialogue state tracking. Once you
have these kinds of dialogue states tracked, the next thing you do is basically what we call
dialogue-manager-policy-planning. As a system, you know what we have so far from the history, now
what you need to do is, based on the history, what should we do, so what the system should react to
the user based on certain information that you learned over how humans do that. You basically plan,
Oh, if I already have the food type already have the area, I already have the number of people.

</Turn>


<Turn speaker="Zhou" timestamp="13:04">

Then the only thing that I'm missing is whether you want an expensive restaurant or a cheap
restaurant. Then the system basically plans out, oh this slot is missing then we should pick this
specific action to execute. Now the dialogue system knows my act is to request information about
price range; this is your dialogue act of the system. And, then the last part of natural language
generation based on these kind of, we call it meaning representation. How can you translate that
into a natural language surface flow? Basically people are saying like what price range do you want?
So, basically that's some natural language you want to generate in the end. So basically this is
like the whole pipeline.

</Turn>


<Turn speaker="Matt" timestamp="13:43">

Yeah, thanks. That was a super helpful example and it made me think about connections to research
that I've done. We typically call this a semantic parsing where you translate language, some natural
language statement or question into an executable program. So, if I could rephrase what you just
said in my terminology, you basically have a dialogue execution engine, something that is, I think
there are other ways to do this than what I'm going to describe. This is one thing you could do
where, I write some dialogue management piece of code that knows it needs these pieces of
information. I get a dialogue turn from the user, I parse it into a statement that I'm going to
execute on this program. The program produces some output and maybe sends it to the user and then
you just continue this way. It's just semantic parsing that, as you go, changing your execution
state. Did that sound like a reasonable approximation of what you said?

</Turn>


<Turn speaker="Zhou" timestamp="14:40">

Yes,

</Turn>


<Turn speaker="New Speaker" timestamp="14:40">

But I think one key difference though between how we typically think of semantic parsing and what
these dialogue systems do is that, there are pieces of this dialogue management system that are also
learned. Is that true or is it all pretty much written by hand?

</Turn>


<Turn speaker="Zhou" timestamp="14:58">

Yeah. So it really depends on how you design your system. But, mostly, the slots are predefined. So,
basically what is the information you need in the dialogue manager? If you think about the whole
thing as a semantic parsing problem, then the only difference in turn is the dialogue state
tracking, which we actually accumulate the information across the dialogues. So semantic parsing,
you basically execute on one sentence, right? You don't keep track of the previous history. So
because of the tracking of the previous history, then you basically parse it back. Basically you
have the logical form, then you generate the natural language out of it. So, definitely people can
use semantic parsing to do language understanding. So basically parsing the natural language
sentence of the human into a logical form.

</Turn>


<Turn speaker="Matt" timestamp="15:50">

Yeah, and I think this also gets Waleed's earlier questions about what things are transferable. If
we think of this still in this terms of semantic parsing, or the natural language understanding
piece that translates language to some program or number of slots or whatever. And then, separately,
maybe mostly handwritten, maybe some learned components on the execution of the dialogue management.
It sure seems like the dialogue management stuff has to change depending on what task I'm doing.
Whereas there's probably some way to transfer some components of the model that goes from language
to program or slots or however you want to call that. Is that fair?

</Turn>


<Turn speaker="Zhou" timestamp="16:27">

Yes, definitely. This is what I usually call, like these are separate modules, but you can combine
these modules together into more end to end in an encoder decoder framework. So for example one of
the recent work is trying to combine language understanding and dialogue management together. Now
you basically can integrate certain things out so you become a sequence to sequence. Your input is
your utterance for any user and they plus a system, previous utterance and belief state. So
basically your dialogue state and then you decode your current dialogue state and then you use a
current dialogue state on previous utterance to decode the system utterance. So that's also
possible. You got to think about the most basic encoder decoder methods have been used for dialogue
generation, which is specifically just for Chit Chat. Right, it's basically, it doesn't really
incorporate any of the history. So basically one sentence in one sentence out, so that's
specifically only used quite popular was like a chit chat that sometimes context doesn't really,
it's not that useful, but still, for a task oriented system, you want it to control these logics,
then it's harder just use one encoder decoder to solve everything.

</Turn>


<Turn speaker="Waleed" timestamp="17:49">

Can you tell us a little bit more about how you represent the state and logic management system?

</Turn>


<Turn speaker="Zhou" timestamp="17:52">

Yes. So the states how you represent them somehow is defined by experts. Here particularly, we have
annotations. So we have human-human conversation, and then people as an expert, will label these
states. So, for example, after this utterance, my state would change. So it's predefined. For
example, in restaurants I predefined the states are consistent of updates among; restaurant type,
price range, location of the restaurant, how many people. So these are predefined slots. So that's
why a lot of times a lot of, human efforts are put in to designing these states. So it's very
similar to your reinforcement learning, right? So if it's discreet states, you actually define it
yourself.

</Turn>


<Turn speaker="Waleed" timestamp="18:46">

So one particular state value would be; I already know which restaurant or which cuisine that the
user is interested in and what time do you want to go. But I don't know how many people are going.
So that would be one value of the state.

</Turn>


<Turn speaker="Zhou" timestamp="18:59">

Yes. You can think about it as a sequence; Italian, cheap. Yeah, and that's it.

</Turn>


<Turn speaker="Matt" timestamp="19:05">

And so what I wonder about this is why would I want to predict the next state with a seek to seek
model or is that basically having the seek to seek model predicting the next program, which
implicitly, you're basically just abstracting away the program at all. And instead of going from
like language to slot, I go from language to next state. Is that what's going on in this encoder
decoder model that you were talking about?

</Turn>


<Turn speaker="Zhou" timestamp="19:31">

Yes. So in dialogues, especially if we have specific goals we want to complete, we will design these
dialogues states. And then now basically we say, the encoder decoder, we wanted to decode the states
and then update the states to make sure that states are having the supervision. Previously, encoder
decoder, you just have your utterance and your system utterance, right? Use utterance system or
utterance, but now we want to add in an extra component is basically to decoder. I want the user
utterance coming in. I decode the dialog states, so I can check with my previous human annotated
decoder to see if the states are correct. All right, so basically I had this kind of extra loop of
supervision to make sure that my logic is correct once I think my logic is correct I use my logic to
produce a system utterance

</Turn>


<Turn speaker="Waleed" timestamp="20:18">

I'm a little confused by what you mean by the state is correct here?

</Turn>


<Turn speaker="Zhou" timestamp="20:22">

So, for example, I have user utterance coming in and I have some histories, right? I want to make
sure the first decoder, the decoded output is the police state, which is what we call, dialogue
state, right? So I want to make sure that the system understands I already had food type. I already
had, for example, a number of people. We train this thing in a supervised fashion, right? We have a
human human conversation label it with these dialogue states. It's a supervised setting that
basically, I tell you that if the user says this and what the history is, you have to decode this
type of dialogue state to me, you can't make errors.

</Turn>


<Turn speaker="Waleed" timestamp="21:00">

So the supervision happens at the level of the state values.

</Turn>


<Turn speaker="Zhou" timestamp="21:03">

Yeah, so basically you have this extra supervision from the human.

</Turn>


<Turn speaker="Matt" timestamp="21:07">

Yeah, I guess so. The difference here seems like I could alternatively have human utterance and
slots supervision and then I write the state change code myself where I have my like encoded in my
dialogue management software is the current state and how the current slots update my current state
to the next state. What you're saying is is instead I replaced that dialogue management software
with just these annotated state sequences and predicted those directly removing the need for the
program. Do you have any intuition about when you would want to do each one of these two options?

</Turn>


<Turn speaker="Zhou" timestamp="21:45">

Yeah, so, you can think about you have at, NLU you have dialogue state tracking, you have dialogue,
policy planning, you have natural language generation. You have this kind of four components. So you
can combine any of these together in terms of sequentially. Or you can combine all of them together
and then basically if you separate everything out you get extra information in terms of supervision.
So the trade off is if you separate everything out, it requires more annotation for a human. If you
combine them together it definitely requires less human supervision. It really depends on the task
difficulty, certain task you have to integrate everything together. Just having the dialog act as
supervision might be good enough by sort of the task as much more difficult. Then probably giving it
more annotations. For example, the dialogue act of the system, the user is dialogue act or slots
values

</Turn>


<Turn speaker="Zhou" timestamp="22:40">

could help it better. So it really depends on how difficult the task is. So we also did another
paper recently as trying to understand what type of task would be helpful in integrating or
combining certain modules together. So for Cambridge restaurant task it's a relatively easy task and
then basically integrating everything together, just leaving out the police state as the annotation
is good enough to get a pretty good results. But if it's a more complex task. So recently we have
been looking into a task called, a Lenovo Laptop, a wireless problem. Basically it's a customer
service system that trying to help you to solve your wireless does not work for you to think about.
And then this task is much more complex. It's not like the restaurant that you just asked for,
what's your food type, what's the area you want to be in an I kinda do a database search and tell
you what this is the restaurant you're looking for, where for these kinds of problem shooting
scenario, you wanted to collect some information from the human and then you're trying to say, why
don't you try this solution?

</Turn>


<Turn speaker="Zhou" timestamp="23:43">

And then tell the user, "have you tried this solution" and tell you, Oh, this solution doesn't work.
And then the system has to re-plan because it didn't work and it gave me this output, I need to ask
you to try another solution. So this in terms of dialogue manager planning, it's much more
complicated. That's why we find like separating these out like individual models and trying to let
them share some information so for a hidden state. It's actually a more efficient compared to only
giving them the dialogue state of supervision.

</Turn>


<Turn speaker="Matt" timestamp="24:14">

Oh that's interesting.

</Turn>


<Turn speaker="New Speaker" timestamp="24:14">

So it really depends on how complex your task is. Ideally the perfect world is you have a lot of
data and all the data is annotated with all the possible annotations we have. Then it's basically
you'll get pretty much perfect scores. But then if you have limited data, so basically or you have
limited number of conversations, then the only thing you can do is make sure, all the annotations
you annotated are fed into the model.

</Turn>


<Turn speaker="Zhou" timestamp="24:42">

Then you probably can get a better performance. But sometimes all of them you annotate are not
necessary. You can get rid of certain, for example, dialogue NLU understanding for restaurants
because it's relatively simple. The dialogue act is just provide information and a request
information but for certain tasks, for example with the Lenovo task, the dialogue act is much more
complex and then probably including the dialogue act understanding for the user and the system is
going to help you in planning your system as well. It's always a trade off. If you provide more
data, provide more annotation your system is definitely going to be better, but in reality you have
to put all these kinds of human efforts to actually generate these. Then it's now generalize-able to
different tasks so it's a trade off between if you want a better system? You want to know either to
collect more data or you either want it to provide a more annotation for a limited set of data.

</Turn>


<Turn speaker="Matt" timestamp="25:36">

Interesting. Thanks. That was a good overview. I guess just to summarize the conversation so far
we've talked about what dialogue research is that there are these two main ways of thinking about
this and task oriented dialogue and non task oriented dialogue or more like Chit Chat, social chat
bot kind of stuff. We've talked a bit about how these basic systems work. So there's an
understanding component that parses text into some kind of slots or program that then gets
interpreted by a dialogue state tracking kind of module which then produces some dialogue output.
Right. The next interesting thing to talk about is how do you evaluate the output of these systems?
Do you look at the text, that is output? Do you look at some external signal like task completion
rate? How do you know how well you're doing here?

</Turn>


<Turn speaker="Zhou" timestamp="26:25">

So mostly yeah, we look at task completion rate for task oriented system for example, booking a
restaurant is you have to get the restaurant name and that name has to be corrected, fitting all the
criteria that user is requesting. While for other tasks then things are more complicated. Even with
task oriented systems sometimes it could be a little bit complicated. For example, we're looking at
a task that not collaborative like negotiation, right? Then the evaluations a bit different in terms
of what we think is acceptable in terms of the range, for example, buying stuff. Also like another
thing. So we look at as in comparison right, which one is more efficient. Even if like both systems
complete the goal like, system, A completed going five turns and system B completed in seven turns
and A on average is more efficient than B.

</Turn>


<Turn speaker="Zhou" timestamp="27:17">

or A is better in this. There are all these kind of other things that we will look at as when we
talk about evaluation, right? A lot of times people are just evaluating on the existing data set
that is collected, which is not cool at all because in real time when you are talking to real human,
people will definitely have different type of reactions to the system because individuals are
different. So ideally we wish every paper when they are talking about their evaluation, they have
tried it with a real human. So either you deployed on Mechanical Turk or you have a fixed set of
people would actually interact with a system that you look at the task completion rate. Instead of
saying, Hey, I built my own user simulator, I simulate how user would actual actually be doing and
the evaluate on the user simulator is how you build the, or use the simulator is a big factor in the
evaluation process.

</Turn>


<Turn speaker="Zhou" timestamp="28:15">

If you build a really simple user simulator---for example 'A' comes in and I just say 'B', then it's
very easy to max out the user simulator you can always do it correctly. We also recently are trying
to say, establish standards for user simulator for example, we can't afford to do real user
evaluation. We can give you some standard or use a simulator with both and tell you, like, if you
use this simulator, if you get 100% that means for real user probably you get a certain percentage
and depending on how complex your user simulator is, then it would tell you how good your system's
performance is. This is mostly for a task oriented system, but for a non task oriented system then
the evaluation metric definitely is a lot more fuzzy. One universal thing that we agreed on is if we
give you this particular setting,

</Turn>


<Turn speaker="Zhou" timestamp="29:08">

if the user is voluntarily interacting with this particular system, key things, basically the longer
he is willing to stay in the conversation, the better the system is. So, basically, the length of
the conversation we are talking about. The other possibility is we ask the user to self-report these
proceedings of the system. Usually, we say how likely would you come back to talk to the system
again? This is one type of question people ask. Another the type of question people ask is how
engaged do you feel throughout the system. And also these are probably more holistic understanding
of the how good the system is for a social chat bot. Individually, for turn wise, a lot of people
would use in terms of appropriateness or coherence. In this context, if I reply the system replied
this, do you think it's coherent?

</Turn>


<Turn speaker="Zhou" timestamp="29:59">

Another thing is called diversity. Example of the system, if you use just a sequence-to-sequence
model, a lot of times the system would generate a very boring, tedious sentence. Things like I like,
I don't know. I like it. So diversity somehow is another metric people would actually evaluate the
system response on. We have to say there's no automatic metric that is so convincing that people
would say if that automatic check metric reached like a really high score, then you get a really
good chat bot because every metric somehow is biased towards certain dimension. For example, if you
say coherence, it's really hard to evaluate automatic coherence. A lot of people will say, oh maybe
you can build a classifier on an annotated corpus of coherence and an incoherence sentence and try
to use that as a classifier to prediction score and you sentence that you see.

</Turn>


<Turn speaker="Zhou" timestamp="30:54">

But this is also a bias in terms of, if your trained corpus and you're tested corpus are very
different from each other and it's really hard to say the predictor score is actually very useful.
Other people may do things like blue score, which means that they have some referenced sentence,
which is like they got it all from like a human-human conversation. And the problem is, if you
actually use a chat bot, right, and use it to interact with real human, the real human would
definitely not follow the script. It would diverge very soon and they don't really have any
reference sentence you can make reference back to. You maybe can do like a one turn by turn as a
reference because I all the context is similar. You say, Oh, if it was you, what would you say? But
it's not ideal in terms of evaluating a real dialog system that interacting was real human. While
the real human has other freedom to say whatever he wants to. That's why there is this kind of
dilemma in dialogue system, because there are multiple turns, you can't collect a conversational
system corpus that covers all the possible with expanding tree, but how people would have diverged
when they're responding to the system.

</Turn>


<Turn speaker="Matt" timestamp="32:09">

Yeah. So that was really fascinating. That was a lot more different ways to evaluate this than I was
expecting. That's a really hard and interesting problem. I think to wrap up, the last question that
I have is what are the open problems that you see in dialogue research? Where should research go
from here? Are there exciting areas, areas that are super hard and seem intractable right now? Where
do you see research going?

</Turn>


<Turn speaker="Zhou" timestamp="32:35">

So I have certain interest definitely, one is learning with less supervision for example, labeling
dialogues are extremely difficult. Collecting dialogue corpus is extremely difficult. Can we build
algorithms that need less data or less annotation, but still build a pretty good conversational
system? That basically, we are talking about transfer learning. We're talking about semi-supervised
learning or unsupervised learning entirely. So anything that we can do to reduce annotation or data
needed would be very interesting and very practical for the industry as well. Because, a lot of the
time industry right now still uses rule-based dialogue systems. Why? Is it because it's really hard
to obtain all these kinds of dialogues and we require for you to build a machine learning based
model? So, if you need less of these data, less of these annotation, then the people would actually
be more acceptable of using the ML based system and mostly ML based system,

</Turn>


<Turn speaker="Zhou" timestamp="33:42">

if it can generalize towards different domains that will basically help the system industry people
to actually deploy one type of pipeline, just change the training data or change something to adapt
it to a new domain or a different task. So that is what I think is most important things that we
need to solve in the dialogue domain. Basically, how do we make our methods, our algorithm
attractive to the industry so that they put in less effort to build high quality dialogue systems
with less rigid output of the system and logic. It's more adaptable to human beings, individual
users as well. The other thing we can see, as I personally am very interested in, I've been working
on as well, as how do we just step out of these kind of question information request and exchange
dialogue system, these collaborative dialogue systems to go into a more competitive goal dialogue
systems that involves topics such as negotiation, recommendation, persuasion.

</Turn>


<Turn speaker="Zhou" timestamp="34:45">

So it's now like, oh, we all know perfectly well what I want to do and what the system wants to do
and we do things together. Now the system has its own goal the user has their own goal. We're trying
to negotiate between each other to reach a certain consensus. So, it could be applied in a lot of
things. For example, if the system wanted to help people to sell stuff, right? He needs to know how
to negotiate prices. If the system wanted to be helping patients to persuade the patients to take
their drug on time, persuade the patient to do exercise all the time, right? So these type of, these
kinds of competitive goals, systems are very important but very difficult to train and model.

</Turn>


<Turn speaker="Matt" timestamp="35:30">

Yeah, I listened to a podcast called intelligence squared US debates where they bring in a bunch of
people every episode to debate some topic. And not very long ago there was an episode that had, I
believe it was a system from IBM Watson that was participating in the debate against the human. Yes.
Which was interesting.

</Turn>


<Turn speaker="Zhou" timestamp="35:51">

Yes. Argumentation generation is also very important in framing some of these.

</Turn>


<Turn speaker="Matt" timestamp="35:56">

Great do you have any last thoughts, anything you wanted to talk about that we didn't cover before
we finish?

</Turn>


<Turn speaker="Zhou" timestamp="36:01">

One more thing is about, expanding dialogue system into multiple modalities. So that's also my, a
PHD theses, right now we are talking about the system's input is text or audio. What if we have much
more richer input and output, which means, for example, we have the ability to get the vision feeds.
We can do analysis on the users, for example, emotions or facial effects. We can use acoustic
information to understand humans mental states a little bit better. Can we utilize them with this
information to adapt to the users better? Also in terms of the physical output of the system. What
if we can show you pictures, not only tell you what's going on, what if, we can play you certain
animations? Even a little further is if you use a system on robots, if you tell the robot to do
things the robots can actually move things for you or give you certain things. So it's a bit more
complex and now it goes into this kind of human-robotic collaboration. But these are like a
connecting areas in dialogues that is, I think, as future research and would bring much more complex
problems, which is more exciting to solve.

</Turn>


<Turn speaker="Matt" timestamp="37:16">

Yeah. Great. That sounds really interesting. Thanks Zhou for coming on and talking to us. This was a
really interesting conversation.

</Turn>


<Turn speaker="Zhou" timestamp="37:21">

Sure. Good to talk to you guys too.

</Turn>
