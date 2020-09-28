---
title: "Incidental Supervision: Moving beyond Supervised Learning, with Dan Roth"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Dan Roth"]
number: "048"
tags: []
description: "AAAI 2017 paper, by Dan Roth. In this episode we have a conversation with Dan about what he means by \"incidental supervision\", and how it's related to ideas in reinforcement learning and representation learning. For many tasks, there are signals you can get from seemingly unrelated data that will help you in making predictions. Leveraging the international news cycle to learn transliteration models for named entities is one example of this, as is the current trend in NLP of using language models or other multi-task signals to do better representation learning for your end task. Dan argues that we need to be thinking about this more explicitly in our research, instead of learning everything \"end-to-end\", as we will never have enough data to learn complex tasks directly from annotations alone. https://www.semanticscholar.org/paper/Incidental-Supervision-Moving-beyond-Supervised-Le-Roth/2997dcfc6d5ffc262d57d0a26f74d091de096573"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar we are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:11">

Okay. Today for our guest we have Dan Roth with us. Dan Roth is a professor of computer science at
the University of Pennsylvania where he recently moved after having been at the University of
Illinois at Urbana/Champaign for many years. Dan is a fellow of the American Association for
Advancement of Science, The Association of Computing Machinery, The Association for the Advancement
of Artificial Intelligence and the Association of Computational Linguistics. And he's been
contributing to NLP research about as long as I've been alive. So Dan, it's an honor to have you
with us on the program.

</turn>


<turn speaker="Dan Roth" timestamp="00:39">

Not so much though. Okay, I'll take it.

</turn>


<turn speaker="Matt Gardner" timestamp="00:44">

Today we wanted to talk about a paper you published at AAAI 2017 called Incidental Supervision:
Moving Beyond Supervised Learning. Do you want to give us a quick description of what this paper is
about?

</turn>


<turn speaker="Dan Roth" timestamp="00:56">

So basically this paper is a pitch to take supervision more seriously. So the standard machine
learning approaches that we've developed and loved for many years, everything builds on a supervised
machine learning. But I think that in many, many cases it's actually unrealistic to assume that
standard supervised learning is going to scale and that it also addresses all the issues that we
want to solve in order to push for natural language understanding. So, what I was trying to argue is
that we should think about this seriously and provided a few examples mostly from my own research
over the last few years of ideas of how to pursue machine learning with other forms of supervision.

</turn>


<turn speaker="Matt Gardner" timestamp="01:46">

So what other forms of supervision are you talking about here?

</turn>


<turn speaker="Dan Roth" timestamp="01:48">

So I'm calling this kind of family of things "incidental supervision," you can call it indirect
supervision. So, the standard formulation that we got used to is we define a task, we collect
examples for these tasks. We collect annotation labels for this task and then we can train. Now in
many cases I think this isn't going to scale because providing labels is just too costly, enough
labels is going to be too costly, you require expertise. Just if you think about, I don't know, task
like semantic parsing, even semantic role labelings, these are tasks that require per sentence, you
know, five to seven minutes of an expert. In addition, I think that in many natural language,
understanding tasks, not everything is well defined in a way that we can actually solicit
supervision. A lot of things are interrelated and we want to be able to learn from one task about
another task. And all these are kind of captured by this notion of incidental supervision. I can
give you a few examples or you want to,

</turn>


<turn speaker="Matt Gardner" timestamp="03:03">

Yeah, so I guess I feel like I've seen similar ideas for quite awhile. Like I did my thesis on
knowledge base construction and so there was a lot of work on distantly supervised relation
extraction. That seems pretty similar to what you're talking about. There's like question answers,
supervision and semantic parsing. Do these fit into what you're calling incidental supervision?

</turn>


<turn speaker="Dan Roth" timestamp="03:23">

So a lot of these fit in one way or another. I see them as special cases. In some cases they're a
little bit different conceptually so for example, weak supervision or distance supervisions are also
good forms of supervisions that we want to be able to study and exploit it. The slight difference is
that they provide direct supervision to the task. So if you have weak supervision you still have a
task, you have well defined set of examples, a well defined set of labels for the task only that
it's weak in the sense that either it's noisy or it's missing sometimes and so on. What I wanted to
focus on is all these cases where there is a lot of data out there, there's a lot of information out
there and there is the ability to extract signals from this data that are not, that are completely
the signals that from information that was there completely independently of the task at hand and
the same data might be able to supply supervision for many other tasks.

</turn>


<turn speaker="Dan Roth" timestamp="04:35">

And really the data was there. The information was there. The tasks that you came up with yesterday
has nothing to do with it, but still you can exploit this data or signals from this data to
supervise it. So let me give you a couple of examples. So one of my first examples also in the paper
that I still like is actually from work with Alex Klementiev of my former students from about maybe
close to 10 years ago. The idea is basically this, you're working with comparable corpora taken form
over multiple years and it's reasonable to assume that reference to specific name entities say names
of people follow the same temporal patterns over multiple corpora. But as I said, I'll just
comparable as Russian corpora and English corpora, you know, an Israeli corpora and so on just
because some people or some events are hot. So everyone is talking about them at the same time.

</turn>


<turn speaker="Dan Roth" timestamp="05:34">

So now if you are able to tap into this information and you can analyze this temporal signal, which
requires perhaps, you know, doing some technical stuff. So we did some FFT to analyze the temporal
signals. Then you can exploit this and figure out that there is a signal there that is highly co-
related, I like to think about it with the signal that you care about. For example, if you wanted to
enter transliteration models, so that would be one example. So the data was there, it was generated.
It's that just the nature of how we write to text and then you can exploit it for multiple things.

</turn>


<turn speaker="Matt Gardner" timestamp="06:15">

I guess this also sounds pretty similar to a lot of recent work these days on different kinds of
transfer learning or representation learning that leverages other tasks like multitask and I know
some folks at the University of Washington have done what they're calling syntactic scaffolding
where they're trying to predict semantic role labels, but they use syntax supervision to help get
their model into a good spot before predicting this.

</turn>


<turn speaker="Dan Roth" timestamp="06:39">

Yeah, I completely agree. I mean it's related to multiple things, so actually want to get to this
issue of representation learning, which I think is, there's one other task I want to talk about
which I think is really natural here, which is what I call a response driven learning, but let me
take you on this representation learning. I think this is a very good example of this idea. In fact,
just to be an historian for a minute because you said that I've been doing this for some time. The
first work that I've done in natural language processing just after my PhD was in 96 on context-
sensitive spelling and the way we've done context-sensitive spelling later on we moved on to do
similar techniques for grammar checking is you see it on a word. Let's think about peace, piece,
piece "ie" and peace "ea" you see it on a word and you learn from the context, the local context of
the word a representation of the word. So I can learn a representation of peace, "ea" form context
in which it appears and I can learn representation for piece "ie" we've used linear representation,
this is exactly the same thing that people call CBOW today only the use slightly different algorithm
and what you get at the end is a representation for each word, so we learned representation for
multiple words and now you just use this representation as a way to predict given a sentence and a
question which word fits better in this context, you use your Linear representation. This is exactly
what people are doing today and this is a good example because you've learned without supervising
for the task. We've done work on what I call dataless classification, which essentially means in the
context of text categorization, given a news article, I want to know which topics it belongs to.

</turn>


<turn speaker="Dan Roth" timestamp="08:31">

Is it about sports finance, vehicles, what have you. I don't need to supervise this task at all
because I can get definitions or an understanding of what sport is or what American football is say
from Wikipedia. And I can represent this information in such a way that it will be used as a
classifier the representation that we've used in this context is something that is called extended
semantic analysis. Actually due to Gabrilovich and Markovitch. Basically what you do is for each
word you represent it as a weighted list of all the Wikipedia titles this word appears in. Very nice
representation impossible to beat in this domain, in fact. So what happens once you have this
representation, given a document and a taxonomy of topics, you represent both of them using this
representation. A,nd now you can do text classification without any training at all.

</turn>


<turn speaker="Dan Roth" timestamp="09:34">

So basically I'm agreeing with you, this is extremely related to at least some applications of this
incidental supervision are extremely related or can exploit representation learning in a good way.
But it's not only there, there are many other domains where you can apply this. So one of the
interesting application I think is that of from our perspective semantic parsing, but, but you can
use it in multiple other places. So the idea is that you want to be able to take text and convert it
to a representation that is quite expressive, meaning representation of some sort, very difficult to
train. You really need to be an expert and you need a lot of data because it's a structure task.
This suggestion that we've made and many groups have followed up on this is what we call response
driven learning and the idea is that let's assume that you have some weak model that you can
initialize and it can convert your text to a meaning representation.

</turn>


<turn speaker="Dan Roth" timestamp="10:35">

Take this approximate meaning representation and execute it. Do something with it, sort of invent a
simple deliberative task. For example, send it as a query to a database. If the query gets an easy a
correct response, you can assume that your meaning representation was correct. It's unlikely this
will happen otherwise, if it was not correct, you'll get feedback. No, and then the question is can
you exploit to this poor level of interaction, you know, very narrow bandwidth of signal that is
very easy to supervise. Every kid can supervise this level of interaction. Whether the query was
answered correctly or not, can you exploit it and propagated back to produce a good meaning
representation. So this is again an example where rather than supervising it heavily, you figure out
simple incidental signals that you can propagate or convert algorithmically to a strong supervision.

</turn>


<turn speaker="Matt Gardner" timestamp="11:39">

So what you just described there seems really similar to me to reinforcement learning. How would you
distinguish what you just described from traditional reinforcement learning?

</turn>


<turn speaker="Dan Roth" timestamp="11:47">

It's, it's very related to reinforcement learning. Typically, at least in the applications that
we've used, it's a one round reinforcement learning. So reinforcement learning at least
traditionally, not so much in the way it's been used in NLP in the last couple of years or few
years. It was a little bit deeper process, right? So you would do something, you do something else,
you do something else and maybe later on after many steps you'll get a word that you will have to
figure out how to account for earlier. So conceptually I completely agree. Very similar and probably
we can exploit even better some ideas from reinforcement to improve these kinds of protocols.
Technically what we've done was a little bit different.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:31">

So in the paper you described multiple approaches for us to be able to use this kind of incidental
and supervision that may be available. How do you think of these different approaches as a coherent
strategy? Or did you really think of them as you say three approaches we can we can use to make use
of incidents and supervision.

</turn>


<turn speaker="Dan Roth" timestamp="12:51">

So are you looking for some kind of unified formulation for this?

</turn>


<turn speaker="Waleed Ammar" timestamp="12:57">

That's really the question. Do you think we should think of a way to formalize the incidental
supervision problem as something that people should work on coherently? Or are you providing some
examples and suggesting that people should find additional approaches to examine and make use of
this supervision?

</turn>


<turn speaker="Dan Roth" timestamp="13:17">

So at this point, I don't know, I would love to know of a way to uniformly formulate this task such
that kind of all this umbrella of approaches that I've described, we look in a unified way. So,
there are some commonalities among these, or at least among subsets of them. In many cases we are
thinking about looking at signals that exist in the data, doing some reasoning with respect to this
data as a way to exploit signal. So if I see text that says something like, you know, "The plane
landed in Chicago, it took two hours for the passengers to leave O'Hare, you and me know that we can
learn from this that O'Hare is in Chicago just by virtue of doing simple inference and exploiting
conventions in writing. So there is one reasoning step that we've done as a way to produce a
supervision signal to this relationship. O'Hare is in Chicago, many of these incidental supervision
tasks are like that where you look at the data, you extract some signals, you do one reasoning step
and then you get a signal that you can use as supervision. At this point, I don't know, I haven't
thought too carefully about how to, whether I can unify all these instances.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:51">

Right, so yeah, after reading the paper I came out thinking that the key message here is when I'm
thinking of a problem I'm trying to solve, I need to think of other data that's related and it
doesn't have to necessarily follow one of the three paradigms or the three approaches that you
discover in the paper. But yeah, these are examples of ways we can use incident supervision.

</turn>


<turn speaker="Dan Roth" timestamp="15:11">

I completely agree. Yeah. I mean I can give you more examples and that are not in the paper. And I
think, yeah, that's basically the way it is. So as I said, my key goal with this was to argue that
we have to think about it and we have to sort of move out from the standard direct supervision
paradigm and expand it a little bit.

</turn>


<turn speaker="Matt Gardner" timestamp="15:37">

Yeah. If I can give another anecdote, it was actually from you that I started thinking about this
pretty heavily a little over a year ago. I was giving a presentation to the AI2 Scientific Advisory
board, and you were there, I was talking about trying to learn deep learning model for question
answering on a very small dataset. And you said something about "How do you expect your model to
learn English at the same time, it's trying to reason to answer questions." And this got me really
thinking about representation learning and these kinds of things and a lot of the recent work that
AI2 has been doing on using language models to, in some sense learn English, to then have a better
representation of your texts so that you can do better reasoning later. Your feedback made me a
whole lot more excited about this initial work and I think is part of the reason that we pursued it.
So

</turn>


<turn speaker="Dan Roth" timestamp="16:27">

Yeah, I'm glad. I'm glad this question helped. I mean it's a question. Yeah. I think it's, it's
something to think about because a lot of times we care about one task, but we don't really think
about what does it really mean to address this task. QA is a good example here. Your familiar was
Daniel Khashabi's work on QA were he actually tries to decouple these two and say, let's assume I
already know English at some level. What does that mean? Of course it has to be better defined and
he defines it, you know, in some way, maybe not completely satisfactory at this point, but at least
in some way. And then take this and see what you can say about answering various kinds of questions.

</turn>


<turn speaker="Matt Gardner" timestamp="17:11">

Yeah. in that work, I think you're talking about this semantic ILP, like where you construct a graph
in some sense of the language and then run inference using an integer linear program over this graph
to try to answer a question. Is that the work that you're talking about?

</turn>


<turn speaker="Dan Roth" timestamp="17:26">

Yeah, yeah, that's, that's it, in fact there's a series of work, but yeah, the last chapter so far
is exactly that, and some are motivated by, you know, very early work that people have done in AI on
reasoning, learning and reasoning where people have said, you know, once you understand language,
you should be able to any question about this piece of text that people give you in today's
technology, that's not the case because we train specifically on this text. So we wanted to decouple
these and see to what extent we can push this agenda a little bit more.

</turn>


<turn speaker="Matt Gardner" timestamp="18:06">

So do you think that's a good way of thinking about this incidental supervision as it applies to
NLP? That learn English or learn? I guess in your first example you, it was more let's, learn about
what's going on in the world and leverage that and not so much let's learn English, but

</turn>


<turn speaker="Dan Roth" timestamp="18:25">

It's true, because this was just a text classification problem. So it's much easier.

</turn>


<turn speaker="Matt Gardner" timestamp="18:30">

Yeah. So it feels like what people are thinking about today for how do you learn English are let's
use a language model or a machine translation model to do representation learning. Let's use
syntactic scaffolding or some other kind of multitask supervision. Would you add anything to this
from your insights on incidental supervision?

</turn>


<turn speaker="Dan Roth" timestamp="18:53">

So one of the examples I'm giving there is the issue of a lot of NLP decisions actually involve
multiple decisions that interact. And today's philosophy, at least in some task, is that you should
do everything together, essentially solving multiple tasks at the same time, which in principle we
already know. I mean, we've been doing work on this for, I don't know, the last 10, 15 years. If you
have a lot of jointly annotated data you can do it. But in principle, I think a lot about languages,
about the composition depending on which direction you want to think about. So, in some decisions
inform other decisions and so on. And the way to think about it is that this allows you to make
complex decisions with less data than you would have needed if you really wanna think about
everything together.

</turn>


<turn speaker="Dan Roth" timestamp="19:50">

I'll give you a simple example. Let's think kind of semantic role labeling or an extended notion of
semantic role labeling where you care not about verb as predicates, but also say about prepositions
as predicate. So take the sentence "Dan slept on the train to Chicago." Think about this together
with "Dan, slept on the train to recover from is cold." Let's think. So we have a verb "sleep," and
we want to understand the arguments of sleep. We have a preposition "to" we want to understand what
relation is dictated by the preposition to. It could be a location to Chicago, but it could be also
a purpose say to recover from his cold. These are two different to's, right? They represent two
different relations. Now what I can do is I can supervise everything or I can say, you know what?
The supervision that I give for the verb really constrains in some way the supervision that I give
to the preposition "to."

</turn>


<turn speaker="Dan Roth" timestamp="20:53">

If I know that the verb as a location adjunct, Chicago probably it forces "to" to also be a location
preposition. So these two are related. Now that means that I probably don't have to jointly
supervise. I just need to be aware of the relations between verbs and prepositions somehow either
using some constraints, statistical or declarative, I don't care. But this knowledge will allow me
to use a lot less data because I can relate to tasks. So that's kind of a complimentary idea to this
notion of supervision. Right. So I don't necessarily have to jointly supervise everything, but maybe
I can supervise partly and I will know somethings.

</turn>


<turn speaker="Matt Gardner" timestamp="21:44">

So in some sense you could. One way of posing what you're saying is thinking of this as
representation learning. So if I have a better representation of Chicago that I got somewhere that I
know it's a location and a better representation of to recover from a cold, then I'm just going to
have an easier time on this preposition attachment or understanding decision. Right?

</turn>


<turn speaker="Dan Roth" timestamp="22:05">

Yeah, I completely agree. Yeah. It all boils down to how you represent things. Right? Yeah, I agree.

</turn>


<turn speaker="Matt Gardner" timestamp="22:14">

Yeah. Yeah. I remember a bunch of conversations, like as I said earlier, I was, I did my PhD
thinking about knowledge base construction and I thought a lot about how could I use some big
knowledge base like Freebase to do better preposition attachment for instance. And this Chicago
example seems like a natural thing. The problem there is coverage is so low for these knowledge
bases. But anyway, these days I guess people are just thinking of just doing representation learning
over a large corpus

</turn>


<turn speaker="Dan Roth" timestamp="22:40">

But yeah, so representation then is crucially important here and the fact that I gave semantic role
labeling as an example shouldn't distract from that. I mean there is a mix in natural language
between sort of the soft representation, typically lexical representation and other things and the
most structural presentation there is still structure. And we should be able to develop formulations
that allow us to play on both of these and kind of gain from both of these.

</turn>


<turn speaker="Matt Gardner" timestamp="23:13">

So this paper at AAAI was published almost a year ago and I assume was submitted to AAAI even
earlier than that. So I guess I'm wondering if you have any further insights about incidental
supervision since you've published this paper. Like what do you think right now today is the most
interesting part of incidental supervision to push on?

</turn>


<turn speaker="Dan Roth" timestamp="23:35">

Okay, so yes, so it's true that this is something that I've been thinking about for more than two
years. You know, it's, in fact incidental supervision was the title of Alex Klementiev thesis in
like, I don't know what, 2008 or something like that. So, but over the last couple of years, I think
other people have also looked at what I would call incidental supervision even if they don't. So
I'll give you one example, which to me is the most exciting thing that is happening in this area
now, a little bit related to the example I gave you before where we talked about semantic role
labeling of prepositions and verbs. So if you think about, Luke Zettlemoyer's work on QA-SRL and
more recent work that he has been doing there. So the idea there is to show that in order to
supervise semantic role labeling or any shallow semantic analysis of text one you don't actually
need experts.

</turn>


<turn speaker="Dan Roth" timestamp="24:35">

You can ask very simple what I call derivative tasks. Simple questions about the sentence and they
give you a lot of information that hopefully eventually no one has done it yet, but we are working
on it. Will give you a signal that will allow you to map text into shallow semantic representation.
So that's one gain of incidental supervision. There is actually another hidden gain that I tried to
mention in my paper, but I think this line of work gives an excellent set of examples for, and
that's the idea that sometimes we didn't even name tasks, but this level of supervision gives us
names for the task or shows us that we have to solve this task. So if you look at questions with
respect to sentences, sometimes the question itself reveals specific relations in the sentence that
otherwise the community hasn't defined as a task.

</turn>


<turn speaker="Dan Roth" timestamp="25:39">

Right. If I tell you, you know there's a sentence that mentions a door knob a question about it,
might ask, you know, what is the knob for or you know, and as opposed to this, if you have a garage
door, the question is going to be different because the relation between garage and door is
different than between door and knob. The questions people, anyone who understands language would
ask different questions about it reveal the different relations. So, this is another outcome of this
notion of incidental supervision that just by going out to the environment and soliciting
information that everyone can give you about the text you learn things that eventually will use as
supervision for tasks.

</turn>


<turn speaker="Matt Gardner" timestamp="26:32">

Yeah. In the Penn Treebank noun compounds. I just, for the listeners, I'm pretty sure this is what
you're getting at. Soin the Penn Treebank noun compounds were annotated as flat. Like they didn't
try to recover the structure of noun compounds because it's just too hard. Like how do you decide
what, which one goes higher up in the tree and what not. But it's, it seems pretty natural to
recover this information by using question answer pairs. And you can get at some semantics that,
that no one has really been able to capture before. Right.

</turn>


<turn speaker="Dan Roth" timestamp="26:59">

That's exactly what I'm what I'm saying. Yeah, completely agree. So, this is another example where I
think I say something about it in the paper, you know, there are many tasks that we haven't
completely defined. There are intermediate tasks, but they are really important and this level of
supervision, if you want to call it, but really indirect supervision weak type of supervision that
just asks question, everyone can do this. You don't need to be an expert. We will reveal that. We
want to be able to know this and we'll be able to generate a representation that recovered it.

</turn>


<turn speaker="Matt Gardner" timestamp="27:35">

Great. It was really nice talking to you. Any, final thoughts before we conclude?

</turn>


<turn speaker="Dan Roth" timestamp="27:39">

Well, thanks a lot, it was really interesting and hopefully everyone is going to start doing
incidental supervision one way or another.

</turn>


<turn speaker="Matt Gardner" timestamp="27:47">

Yeah, great. Thanks for the conversation. It was really interesting.

</turn>


<turn speaker="Dan Roth" timestamp="27:50">

Thanks a lot. Bye.

</turn>
