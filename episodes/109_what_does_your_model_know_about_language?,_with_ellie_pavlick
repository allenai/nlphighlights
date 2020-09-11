---
title: "What does your model know about language?, with Ellie Pavlick"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Ellie Pavlick"]
number: 109
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner, Waleed Ammar, and Pradeep Dasigi.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:08">

All right. Today our guest is Ellie Pavlick, who is an assistant professor at Brown University and a
research scientist at Google. Ellie, welcome to the program.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="00:15">

Thank you. Good to be here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:17">

So we have these huge pre-trained language models these days that intuitively seem to capture some
notion of language of English or whatever language they're pre-trained on. But what a lot of people
are thinking about these days is how do we actually know in some concrete quantitative sense what
these models know about language. And Ellie, you've done a lot of work in this direction. There are
a few different ways to try to answer this question. Do you want to tell us about what some of those
ways are?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="00:48">

Yeah, so I think kind of at a high level, it's a very exciting topic to me and it kind of represents
somewhat of a pivot, I think in NLP, right? Like, I remember when I was in grad school or quite
recently, like there was this very definite feeling of NLP as being like, we are an engineering
field. So the question of does the model know language was always very much in test specific way. So
it was like these kinds of debates about like what are the right parts of speech, what should a
representation of language have in terms of parts of speech or syntactic structure or like those
kinds of discussions about language representation. We could kind of punt on all of them, right? And
just say like, I don't care. I specifically remember hearing people saying things like the right
representation is whatever representation allows me to do machine translation well or allows me to
do summarization well or something like that.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="01:36">

And I think now that we've shifted towards these deep models and specifically trying to do these
general purpose language representations, it's like opened up this can of worms, which is kind of a
hot mess. And I think we'll hopefully talk about today in terms of like how we start to try to
measure these things quantitatively so that it's not just like philosophical debates about what
language should look like. But yeah, we definitely can't just use this test specific way. And so the
kinds of methods that that people have started inventing, I think they're there's like a lot of room
to kind of pick through these and think about like what makes sense, what doesn't make sense, what
is it we're trying to do?

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:15">

Yeah. Yeah. So, so I guess you mentioned there like for machine translation, what representation
should I use? And previously people tried syntax based, machine translation and phrase based and
token based. Like there was a progression of using different kinds of representations to do machine
translation and now it's all end-to-end. And I guess, so you brought up like what representation
should I use? Well now that's not the question anymore because it's like we don't really know what
representation the model is choosing to use. And so instead of trying to answer the question of what
representation should I use, like what, what representation works best, it's what representation did
the machine figure out? And we're trying to like understand what's going on here. Right,

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="02:58">

Right. I mean it's definitely like that's where a lot of, I think the kind of specific methods that
we're, we'll probably talk about today are kind of when a model was trained to do a task, what
representation did it end up choosing and what kind of fell out to some extent for free. But I think
then there's the larger question of is that the right representation or is that a representation
that'll allow it to do all of the tasks? Right. And so a model trained end-to-end to do sentiment
analysis might not end up learning something about syntactic structure, deep syntactic structure
cause it's just not that necessary for sentiment. Whereas other types of tasks, it might be quite
different and there's some assumption, I think with all of us, that there is some, the right
representation of language that allows you to do all the tasks.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="03:42">

And we're hoping we kind of get there, but in the meantime we're saying like on each of these
specific tasks, what is the thing that fell out of each of those?

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:49">

Yeah, yeah, that's a great way of thinking about it. You could imagine I want to do some particular
end task and the recommendation today is to do huge language model pre-training on billions of
tokens of text and then learn some representation of language from that and use it to fine tune a
model on whatever task you care about. But there's the question of does the language model pre-
training, give me the information that I need in order to do my end task.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="04:16">

I think we're seeing that empirically. So there's this kind of assumption that some representations
are "better" than others. Like some representations of language are better once they get at more or
the important aspects of things and some end-to-end training on some tasks might lead to better
representations than other ones. Right. And we're seeing that that language modeling end-to-end
training on language modeling produces representations that then work on a lot more tasks or work
better on a lot more tasks than end-to-end training on something like sentiment. Right. actually
when I was at this Hopkins summer workshop two summers ago now with Sam Bowman and we had a team
looking at different pre-training models and it was an exercise in negative results, right. Cause we
were like, surely there's some tasks that's better than language modeling and we tried lots of
different things and we couldn't get something that really worked better then language modeling. And
I think that kind of speaks to this point that it's like end-to-end training always results in the
same application. It is task specific. And so then the question is what is the right task that will
lead to better representations? In order to do that, we have to say what counts as a better
representation or how do we know that a representation is good?

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:20">

Right? Yes. And also language modeling isn't going or at least currently doesn't get us everything
we might want for all possible end tasks.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="05:30">

Absolutely right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:30">

And so again, we were back to this question of what was actually learned. How do I know what's in
there and how can I make informed decisions about what I should do if I want to maximize performance
on my end task. So now we come to, if I want to answer that question, what are the main techniques
that people use to try to answer it?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="05:49">

Well, there's two main categories that I've spent more time thinking about. Like in kind of broad
brush strokes. I would say I've been kind of thinking them as a "structural" and "behavioral" types
of experiments. So, and that terminology is somewhat borrowed from like when people study human
language processing or something like that. Like there's different kinds of ways of saying is my
current theory of how human language processing works supported by some kind of evidence. And one
way you can do it is structural type analysis, which is like put the person under an FMRI, try and
see if there's some kind of localizable parts of the brain activity that seem to correspond to some
structure. So like you would see stuff like if I have people read sentences about events in active
and passive voice, do I see the same parts of light up in response to something like agent or
patient roles independent of syntax, things like that.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="06:41">

So you're looking for some kind of structural information that suggests that this piece of our high
level model of language is being represented somewhere. And then the other one would be like
behavioral studies, which is basically just like, does my model make predictions that are consistent
with the predictions that humans would make about language? So something like acceptability
judgments is really standard, lLike here's the sentence, yes or no, is this a good English sentence?
People make judgements about that and you say, does my model make judgements that are highly
correlated with humans? I think this is what we think about more in NLP as just kind of accuracy
metrics against a human gold standard. I think that's less straightforward than we sometimes assume
it is. But to a large extent we're just saying like does it make the same predictions? And there
it's quite possible that you have two models that are using entirely different structures but making
the same predictions. Right, and so it's maybe a little more model agnostic. You're just saying is
it making predictions that are consistent with humans? And I think we've been seeing a good amount
of work on both of those. I mean, personally I've been trying to use both methods. I think you can't
get away with just one or just the other. But I think we've been seeing a lot of work on, in both
sides.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:48">

Yeah. Yeah. And I think the reason you can't get away from using just one, you can't get away with
just using one or the other is because both of them have limitations and things that they're good
at. And there's, there's a lot to talk about here, but maybe we should start with just one of them.
So the structural analysis, which I guess people these days mostly call probing either there are
some other related kinds of work.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="08:11">

I mean I think I would also throw in loosely things like visualizations and stuff like that in with
structural analysis. But yeah, I think probing largely.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:20">

Yup. So here the basic idea is I'm going to freeze the weights of my model and see what I can pull
out of those weights somehow, right?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="08:29">

Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:31">

So do you have a high level summary of like what you do with this and like what are its limitations?
What's, what's it good at? What can I actually learn from these probes?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="08:39">

Yeah, there's a lot to say about the probing techniques and limitation. So I think the strength or
the thing you can say is somewhere in this representation there was sufficient information to make
predictions about the structure that is very vague. So looking at something like part of speech you
run some probing classifier and say, does this model know something about part of speech? So you
say, let's look at the hidden representation. So lets train a classifier on the frozen
representations and say doesn't know if this word was a noun or not. And so however accurate that
classifier is, you can say there was enough information in this representation to know whether it
was a noun with this percent accuracy. Right. That's all you can really, really say. But that's not
nothing, right? Because it says that there's some information that is indicative of that property of
the language. And when we look at different baselines, I think there's like, you can say it's doing
better than what it would've done from just lexical identity, for example, which tends to be a
pretty strong baseline or it's doing better than what it could've done from random guessing. Those
kinds of things are guessing most frequent part of speech. That's definitely something that is
exciting. I guess this just started being used like a year or two years ago, right? It's fairly new.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:46">

Yeah. I think the original ELMo paper had a tiny bit of this.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="09:51">

Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:51">

This was my contribution to the ELMo paper was running some essentially some probing experiments on
ELMo.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="09:57">

And that was like two years ago, right? Things happen so fast,

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:01">

Late 2017 so two and a half,

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="10:04">

Two and a half years. Okay. So yeah, when this, when people first started doing this and I think
also the, What Can You Cram into a Vector paper was one of those like early ones doing this and this
is and it was like a really exciting idea. It was like, Oh, what a cool way of, of analyzing these
things in terms of something other than prediction accuracy on a task. But then I think recently
people have gotten pretty critical, not critical but like disillusioned with it cause it's kind of
seemed really promising. And then there's a lot of issues that come into play. So I think one of
them is just how strong the probing classifiers are and how powerful these models, like they can get
quite good accuracy on randomly initialized models and things like that. But there's like weird
heuristics that have gotten used in the probing classifier where it's like, Oh, the probing
classifier should be linear, which is quite an arbitrary constraint to place on it just for some, or
like, it should be linear, it should be a small model. But that seems quite arbitrary. And so it's
hard to say why having part of speech be linearly extractable from the embeddings is better than
having it be extractable with a small nonlinear network or something else. And then I think also
that notion. So there's that recent paper the control probes.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:13">

Yeah. John Hewitt at EMNLP last year. Yep.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="11:15">

So I think that gets at what a lot of people have been worried about is just like, could these
classifiers be doing a pretty good job even with pretty crappy representations? And I think the
answer is often yeah. As we often see with neural nets, right, they're able to learn a lot from
pretty bad inputs. So that's one thing is just kind of saying how much do I read into strong
accuracy on the models. The other issue I think, which I've been more interested in is like the
causality aspect of it. So the fact that the representation does contain some information about this
isn't nothing, but it says very little about whether the models using it are using it in the right
way and how important it is in the representation. So like you could kind of incidentally have coded
a lot about part of speech and that doesn't mean you're actually sensitive to it in the ways you
should be sensitive to it in any kind of downstream tasks.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:04">

Yeah, yeah. I think you could summarize almost everything you said and just the simple, you have to
take the absolute probing numbers that you get with a major, major grain of salt because you really
can't conclude hardly anything at all from the absolute numbers that you get out of a probing
classifier. Like if I get 97% part of speech tagging accuracy or constituency label, let me back up
for listeners, one probing tests that you might do is take a word in a sentence and predict for just
given the representation of that word in a contextualized embedding, predict its path in a
constituency tree from the roots to the leaf that is that word. So like sentence verb phrase, noun
phrase, determiner, something like that. So if I get really high accuracy on that, say I get like
95% accuracy, I actually can't conclude very much just from that absolute number. I do think the
probes though are really good at giving me, giving us relative information. Like looking at
different layers in a model and trying to understand where things are or taking two different
representations and comparing them so we can get good relative information, just not good absolute
information. The absolute information is kind of meaningless.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="13:13">

Yeah, and I totally agree with that. Although I also think that's not unique to probes. Like, one
thing I've liked about this line of work in general is it's an excuse for us in NLP to take a step
back and think about scientific methods and things like that. And I think it's always been the case
that we shouldn't have been reading too much into absolute numbers. And we shouldn't be taking any
one evaluation as an authority. I don't think it's quite, I don't think it's possible to have an
evaluation that's the evaluation and that's all we ever have to worry about. Right. So to the extent
that all of these methods are suspect, I think that's a really nice thing. Kind of forces us to take
these things more. But yes, I think that's definitely true in probing accuracy, especially because
these baselines for a lot of language stuff are extremely high, right? Because we're dealing with
varies in distributions of things and like you can, a dumb model can easily get 95% accuracy as
we've known for a long time.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:06">

Yeah. I've been, I've been trying to think of, I, I've talked with a few people about this. I'm
trying to figure out can we actually get a probe that will give us numbers that we can trust and
it's hard to think about how to do that.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="14:19">

What do you mean by trust? I mean I don't not trust the numbers. It's the interpretation of the
number.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:25">

Yeah, yeah. It get absolute numbers that if, if I get very high absolute numbers, I, I can actually
claim that the model has something about that linguistic phenomenon, we can actually pose this
question precisely, which is, let's say I this, this comes from discussions I had on Twitter with
Emily Bender about can you learn meaning from form so Jacob Andreas in that discussion said if there
something in my representation that is isomorphic to some linguistic phenomenon, then you can, if
like across the board there's this isomorphism between the language models, representations and the
meaning whatever it is that you want to, that you, that you want to extract. Then you can say, okay,
the language model has learned something interesting here anyway. I don't want to put words in Jacob
Andreas' mouth and that this isn't entirely the point, but that we can precisely characterize this
problem as is there an isomorphism from my language model representations to part of speech
categories and can I find that isomorphism using only a part of this of, of the input space. And if
I can find it using just part of the input space and it generalizes to the rest, then I can claim
that there is something in that representation that knows about part of speech as we define it. Does
this, does this, do you buy this?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="15:41">

I think yes. And I think this is where I get into the why we need the behavioral side too or why I
think that this area is quite a bit more complex than we often think of it. And and so one of these
notions, I spend a lot of time talking to like linguists and psychologists too. And I think these
notions of there being a set of part of speech categories, that this is the set and they should be
represented. The idea that we know what the model is that the neural net should be learning and
we're trying to map it onto that. I don't know that we can take that for granted. And so like to the
extent that you say like yes, if there was, if there was some fixed set, if there was a meaning
representation that I knew existed and I can learn some model.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="16:22">

Like if you can take a given the fact that there is some target representation you're trying to say,
did my neural net learn that then yes. But I don't actually know that I believe that that exists.
And so maybe that makes that almost a moot point or it seems like we would want something that
would,

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:38">

Yeah.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="16:40">

Yeah. So like for me, I often like to use the structural things as like, is there something that is
highly indicative of having captured this phenomenon? But I don't know that I want a hard, yes, it
has it. Because I think that line of saying it has to have this exact thing. If we actually knew
that that was possible, then we wouldn't really need the big squishy neural net to do it. We could
have written it down in some much more exact nicer formula. And I don't think we have that for a lot
of language phenomenon like we have close to it but not the full thing. And part of what's really
interesting and kind of exciting is the fact that neural nets that don't have that thing are
performing so well and we're trying to figure out what part of that thing do they agree on? Do these
competing models like much more structured symbolic models, softer models, what parts do they agree
on? Like is there a notion of part of speech and that we're seeing yes. So I've seen like all of
these probing classifier results as quite encouraging kind of a win for a lot of linguistic theories
that are like if you want to model language, you're going to need some kind of notion of these types
of things. And we're seeing that, yes it's true that models that do this well had to kind of, these
notions had to emerge. But I don't know that once we have to get on an exact set, like we have to
specifically say this is the actual part of sequence for all of these and it exactly maps onto it. I
don't know that we can do that so I think I would be hesitant to pursue some line of work that
assumed that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:58">

Right, right. Yeah. This is really interesting. You highlighted to me like how many different
questions there are that we could be asking with all of this stuff there are questions about
language, like what are the part of speech categories and is there a computational way that with
these language models we can try to answer some of these questions. I'm not a linguist but like
there's at least a little bit of potential here to try to answer that kind of question. There are
also like learnability questions like what falls out from a like more on NLP kind of perspective.
Like given that I train this model on language, what falls out and is it, is it at least close to
stuff that linguists know about? Even if the things that we've defined in linguistics aren't
perfect. Like what's there,

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="18:37">

Right. I think that, yeah, I think it's actually really, or maybe I'm just biased by what I've been
thinking about recently, but you can definitely flip it on its head and try to use it the other way
around. So like you think about kind of when we back in like eighties and nineties and NLP
incorporating her kind of the work on computational linguistics and bringing ideas from linguistics
into NLP, it was like linguists have these models, can we use them to help improve computational
models? But now we're seeing these other things where it's like, Oh, these models have empirical
success. Can that help us inform the models of like, yeah, what categories are there or what
structures are there? And I think that seeing what kind of falls out is a really promising or at
least very interesting direction. That said, I think what you were describing about trying to say is
there like a perfect mapping between these two spaces is a relevant piece for that, right? You would
be saying like what is the symbolic model that most closely describes what the neural net is doing?
But I don't know if they'll ever be the same model.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:33">

I definitely agree with that. Yes. Yes. Okay. This has been a really interesting discussion about
probes. You have what I think is one of the best works on these kinds of probing models. And I
wondered if you could tell us about some of the details of this. This is a paper that you published
called BERT Rediscovers the Classical NLP Pipeline. Do you want to tell us what, what's going on in
this paper?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="19:54">

Yeah, so I think this actually, I mean, it segues nicely out of the, what we're just talking about
where we want to say like these models are, maybe it's almost a negative. So it's like these models
have good empirical success and we're trying to say, does this tell us something about what
representations of language lead to this kind of empirical success? And so what we were doing in
that paper was we're saying we know a lot about the kind of traditional pipeline that we've spent a
lot of time building that was highly informed by linguistic theories about we have parts of speech
and then parts of speech should inform for example, parsing. And then parsing should inform for
example, co-references solution. And if you were to build, or like you download the SpaCy or
Stanford NLP pipeline, you'll like explicitly see these kinds of steps and if you want to do
something like constituency parsing, it will have to run a part of speech tagger first.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="20:45">

And so we were what we've been using these probeiing classifiers to look at these different specific
tasks like part of speech and dependency parsing. And so then the question is within these neural
networks, is it using them in the way that we'd kind of expect to get in the pipeline or is this
information being encoded in a way that suggests that that's consistent with this pipeline? I should
also just give a shout out to Ian Tenney who's the first author on this paper. And a lot of great
work and a lot of great ideas in here are his. So what wanted to do here was say let's train these
kinds of probing classifiers for a lot of different tests that exist in the pipeline and let's train
them at every level of these very, very deep networks. And what we ended up seeing was that the
stuff that happens earlier in the pipeline, so things like part of speech tagging would be encoded
in earlier layers of the network and then stuff that happened much later in the pipeline.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="21:32">

So things like co-reference resolution, which depend on part of speech and parsing, we assume to be
good at co-reference resolution, you need some notion of a parse structure for example. So that
would happen much later. So that was just really a, I think maybe validating to see from the
perspective of these traditional pipelines is like yes, in order for models to start doing really
well, they ended up kind of reinventing the wheel. So when we say like can we look at the empirical
success of these models and use it to learn something about how language might work in general. This
was almost like a validation that we're not seeing anything really fundamentally new here in terms
of theories of how language is represented. But it's quite exciting to see that this kind of emerged
naturally. Right? So we didn't tell it you should encode part of speech first and then you should
encode parse structure.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="22:21">

But you see these kind of increasingly complex abstractions getting encoded one after the other. But
the kind of nice thing you see that you don't see with traditional discreet pipelines is that over
the course of the network you can see that informational kind of move around and get influenced
based on kind of high level information. So we saw these examples where you would have like a word
that has an ambiguous part of speech and it would in the lower levels be being tagged as like a
noun. And then after the parse structure had been developed, it would get changed to being tagged as
a verb or something that would depend on the parse structure in these quite elegant ways that again
I think we used to work on explicitly by doing some kind of joint modeling and things that were like
in pre neural days, you would still try to appreciate the fact that sometimes the higher levels of
the pipeline need to inform the lower levels and we'd have to kind of explicitly build these
complicated joint models and now that happens someone naturally in these end-to-end systems. So. So
I think that was pretty exciting.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:16">

Yeah. We were talking about absolute numbers versus relative numbers. One reason this paper is
informative and like really useful is that it really is only looking at relative performance and you
can say like I probe each layer in some way of BERT and then because I'm actually looking at this,
Oh you do have some columns in your paper that, that say absolute numbers, but they're really not
highlighted at all. And almost the entire paper is just focusing on relative judgments and cause
really that's what we can learn from these probes. And you do a very convincing job of showing the
points that you made. I think it's, it's really nice. I do think it's worth highlighting very
briefly the way that you decided this, that what you called it, like an expected layer. Do you
remember how this is done? Do you want to describe what you're doing here?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="24:03">

Yeah, so, and this is basically just saying at what layer do we like that's kind of what's the the
center of mass for this distribution overall of the weights and the layers. So at what layer we
roughly saying this is where we expect this information to have been encoded. Of course there's no
tight regularization on these. They were just regression weights, like scalar mixing weights over
all the layers in BERT. So there's not like a single layer where it says, this is where the part of
speech is encoded, right? There's a, it can be kind of smeared over several layers. So that was our
way of kind of getting a single summary statistic of at what layer does this information roughly
correspond to? And that gives us a much clearer sense of the ordering of them. We also, you can see
in this where you talk about the absolute numbers, we have a lot of metrics.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="24:48">

We've got very metric happy because of the issues that you were talking about, right? Like no one
metric will really tell the whole story and so we wanted to be very honest with what's going on. So
like we also have this notion of kind of how many new examples are you getting correct at each
layer. And you'll see like a histogram in our massive plot in there. And you can see this issue with
the relativeness. Like at that first layer you're in most on most tasks you're at like 90% accuracy.
And so it really is about getting those long tail examples right. But I think in most of language I
won't talk about like learning syntactic structure and it's about getting the tail right. And
specifically when you're talking about like linguistics and real models of language, it's about not
just getting the tail, it's getting all possible infant, like the full competence of the language,
right? So it's so 95% accuracy does not count is not even interesting, right? It's the other 5%.
That is what's important and the fact that we can't understand these long ones so that you can see
that quite clearly here in those fingers, because you see that at those first layers it's almost
perfect accuracy on most things. But then it's how far do you have to get in the neck before you can
start getting these long tail examples. And sometimes that takes quite a while.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:57">

Yeah. Great. Really nice paper.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:59">

I have a clarification. How important is it for the weights of the BERT model or the pre-trained
model to be fixed as opposed to fine tuned while doing the probing?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="26:10">

That's a great question. So we've started looking at the fine tuned models. We just did the pre-
trained models at the beginning just because it gave us a starting place. And it was like directly
what do you get as a result of a pre-training the language modeling part. But once you fine tune
models, then things start changing quite a bit. We have some kind of work in progress. We've been
looking at, also with Ian. Who is on that paper. We've been looking at some fine tuned models. It's
largely quite similar and most of the fine tuning seems to affect the higher layers, which I think
is consistent with stuff that's been shown in other work.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="26:47">

But it's still just like, then you open up this again another can of worms, right? Which is like,
what tasks are you fine tuning on? What is the domain of the data? You're fine tuning on. What kinds
of phenomenon are being captured there. And so the reason we start with the pre-trained model was
just, it was like the most vanilla setting and there's nothing that actually guarantees that it's
going to be the same or different after fine tuning. And then once you're doing fine tuning, you
have to make decisions about what tasks and all that kind of stuff. So we started playing with that
and I'm really interested in what's happening during fine tuning. My instinct right now is a lot
less than than we think. Right? Like so not actually that much exciting stuff seems to be happening
during fine tuning. It seems to be quite shallow updates to what's going on. Right? So it's just
kind of top layer. It's not really doing big rewrites of what is syntax and things like that. Yeah.
But I think that that's a whole separate set of experiments we need to run to really know what's the
difference between the pre-trained and fine tuned models

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:36">

As we were talking earlier, like really probing helps when you look at relative numbers with the
comparison between the fine tuned measurements for probing tasks and a pre-trained fixed weights
would indicate anything for you if you look at them.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="27:52">

The difference between the pre-trained and the fine-tuned, I think if there were a big difference.
Relative difference. Yes. I think that, or like relative to pre-training to fine tune showed a big
difference. That'd be very interesting. One of the first things we did, so I made this point. So
this is kind of ongoing work. We don't have anything to point to, which is kind of just means I'm
just going to spout vague stuff and you can fact check me on it. But we'll have stuff out soon, but
we've been looking at so yeah, this kind of question of the model is representing these features,
but it's clearly not using it. So there was some more kind of with Tal Linzen and Tom McCoy, his
student where we showed that like if you have these kinds of template examples where you make little
syntactic manipulations, it confuses these models, these fine tuned models.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="28:35">

So it's like they're not exploiting the fact that they have syntactic information, even though our
probing studies suggest they do have syntactic information. Right? So the first question is like,
well, maybe during fine tuning it just zaps all the syntactic information. So maybe if we re-ran all
these probing classifiers on a fine-tuned model, they'd be at very bad accuracy. But that's not the
case. Right. and I think I would have been quite surprised if that was the case. And so that's your
question is like would the fine tuning, just eliminate all of this rich syntactic structure that was
learned during pre-training, but it does not seem that that's the case. So there's something else
going on that's the model has these features but it doesn't necessarily use them.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="29:13">

Got it, thank you.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:14">

Maybe one way to describe that is that the fine tuned model learned some way of performing its end
task without really needing all of the stuff that it learned from the language model in pre-
training.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="29:28">

Right, right, right. Which is I think is quite unsurprising. It's like disappointing and surprising,
right? It's like, like I see what you did there and I'm just, I just have to say I'm disappointed
language model, but like the a, because it's like when for we train these, these discriminative
tasks, it's just a lot of easy, cheap tricks that they can exploit. And the model has no incentive
to prefer to use subject object relations when it can just memorize lists of words. Other
discussions, and I've talked to people in computer vision, I think the other assumption is that the
generative nature of pre-training just incentivizes much, much better models and richer structure
and then we fine tune on these discriminative tasks that just don't need that. It's like easy to
come up with kind of cheap tricks to learn discriminative tasks that you can't get away with if
you're actually trying to model the full distribution of all the observed data. So, so that
disconnect might explain something.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:22">

Yeah. I think one of the challenging things that we as a field will have to figure out is given
these models that clearly do have some pretty, I wanted to say deep, but I don't know that that's
quite the right word, but do you have non-trivial understanding of language phenomena from their
pre-training? How do we get them to actually do something with it in a way that that's like
meaningful and it sure seems like they aren't even though they have the like something they know
something about language, but it's just a bunch of cheap tricks in the models that we actually use.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="30:57">

I'm wondering if it makes sense to to have some guidelines for like how to prepare a dataset when
you're doing the probings to avoid some of these cheap tricks. You know, the model could leverage
like I ideally maybe all the words in the test set to be unseen in training. That's probably not
easy, you know, to find sentences with no overlap. But I imagine like we can have like a softer
constraint while constructing the dataset.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="31:24">

You mean in the training and testing of the probing classifier?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="31:29">

Right.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="31:29">

Yeah, I think like the more held out the better definitely. But I think to me, if this feels like
baselines is your best bet, right. Is trying to make sure you're really clear and then focusing on
relative performances. Because I've just not yet seen a successful attempt to build a dataset with
no artifacts. So there's always some kind of artifacts, right. And especially the smarter these
models are then the more buried the artifacts that they're exploiting become. And for things like
syntactic structure, it can be really hard to say that like this is actually structure versus just a
really deep correlation of groups of words. Like it gets quite hard to really remove all of the
things it might be exploiting. Yeah. So I think that in my opinion, the best practices reporting
lots of baseline numbers and at a minimum doing the kind of control probe type stuff of saying like,
what if you randomly initialized and things like that. But then maybe even reporting for several
different probing classifiers on maybe some different initializations and splits and giving
intervals and those kinds of things that just make it clear. How interesting is the relative
performance gain? Maybe.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="32:37">

Great. And the baselines are always one of the layers in the network or are there like other
baselines that you're proposing or thinking people should typically use when doing probing?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="32:48">

Yes. Let me think. So we're talking about let's say something like the part of speech one, the
baseline we've been using most that I quite like is just the first layer of the network. Right? so
like that basically tells us like, what if you just knew about this word? Like you just knew the
identity of the word. But then we've also like, so in the precursor to the rediscovers, the pipeline
paper was our ICLR paper where we were doing this probing there. There we also did like increasingly
large window size on each side. So you're saying like, what if you didn't just memorize the word
that you basically memorize this five word window. What if you looked at the whole sentence?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="33:23">

So we did a lot of things that were like, what kinds of things might you be exploiting other than
actually what's encoded about this word at this location in the sentence. And none of them are
perfect, but you do see that they do start to close the gap. And so you like maybe you could explain
the same relative improvement as instead of the model having a coded something about part of speech,
it's just packed into the representation of this word, a representation of its neighbor words as
well. And maybe that would be enough and this is like the fancy 2020 version of we built a trigram
model instead of a unigram model or something. And that's kind of what could be happening. And so I
think having those kinds of baselines help quite a bit. But then other things you can do with
datasets like making, trying to remove heuristics to the extent possible, having the datasets be
more held out or even pathological. And this maybe gets into the behavioral type studies. Like if
you say like this heuristics, you could have used at a train time, will give you 0% at test time,
right? Like by inverting all of your compositions or something like that. Like every word that
appeared as a contradiction in the training set is now an entailment in the testing set. Something
like that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:31">

Yeah. So going back to the isomorphism stuff that I mentioned earlier, I think the way to solve
Waleed's problem like to build a dataset, at least it's easy to think about this in a toy two
dimensional space. Like I take say the upper left quadrant and I use that input space only to learn
an isomorphism like to essentially to learn a classifier to what my output space should be. And then
if it generalizes to the other three quadrants, then I can make strong claims about the underlying
representation. And so if you can actually partition your space this way, this is essentially
between train and test of the probing classifier. If you can actually partition this space, then you
can make strong claims. The trouble is it's not really clear at all how to do that with language and
Nelson Liu. I got Nelson tried to do this because I was like, Hey, we should do this because this
seems like the right way to do it. He spent some time trying to figure out how to do it. Couldn't
really figure out a good way to actually split the data.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="35:30">

What did he try? Cause I can't picture how I do this with language because it's so structured.

</Turn>


<Turn speaker="Matt Gardner" timestamp="35:36">

Yeah. It's like you closed class function words like "the" and "a" and like you would have to have
it such that all of the, all of the occurrences of "the" are in the train set and all of the
occurrences of "a" are in the test set or something like this. But then you also, as you said, have
to think about, determiner noun combination. Like what if it's just that structure and so you have
to split it across that it's so it, yeah, it gets really messy. It's easy to think about in a toyed
space, but like impossible for these super high dimensional spaces like language. Right.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="36:02">

And I think actually this gets to another question that's become increasingly kind of in this space,
which is like what is a fair generalization to make? I'm not sure that there is any model of human
language that says you should know what "a" means. Having only ever heard what "the" means, like
there's that's just not really a sensible thing. We would expect any model of language to be able to
explain that's not a generalization that kids can do.

</Turn>


<Turn speaker="Matt Gardner" timestamp="36:26">

So, so that's not actually what we're saying with this. We're saying that in my representation
learning, I got to see all occurrences of "the" and "a" and whatever. It's just that when I tried to
map that to some meaning representation, I only got to see "the", to learn the mapping. And then if
that mapping translates and also works with "a" then I've learned something generalizable about
those, those part of speech categories.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="36:49">

Right, right, right. And then this gets to what I was saying before, but as far as I know, there's
not actually meaning representation, like a standard known meaning representation that can collapse
words in these ways. Right. So there is some distinction between "the" and "a" that we do need to
maintain that you wouldn't actually want these to map onto the same part of your meeting
representation cause then you'll lose the distinction between "the" and "a". And if your model is a
good model, it knows the distinction between "the" and "a" so there's some way to say,

</Turn>


<Turn speaker="Matt Gardner" timestamp="37:16">

Right, this is why the mapping would pull out the part of speech. And so like I can learn several
different mappings to learn different things like maybe definiteness or whatever. And so the mapping
that is like, this is a determiner that should generalize hopefully, but your point earlier is it
still stands that like part of speech is fuzzy when we get to the boundary cases, it's not really
clear what we should do there, there are reasons why you shouldn't ever expect something perfect in
this mapping. I think this is a great time to pivot to the behavioral testing that you're talking
about. I guess we've already gone almost the length of a full episode just talking about the probes.
But I think it would be nice to talk for at least a little bit about the behavioral testing. What is
this and how does it work?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="37:57">

Yeah. So I guess the idea here would be let's not make any particular claims about what the
underlying structure of what the model should have learned structurally. And instead, let's just say
what are the types of predictions that should be able to explain or produce or support. So you would
say something like, well, maybe if a model knows something about subject object roles or subject
object ordering, it should be able to distinguish between the sentences "man bites, dog" and "dog
bites, man." Right? That's like one of the classic examples. Or if it knows something about factive
verbs, then it should know that the sentence, "I know that factive verbs entail their compliments"
factive verbs entail, I should use a better example of that. Something like, "I know that Sally is
from Chicago, entails Sally's from Chicago." So you can set up these kinds of entailment type tasks
or paraphrase tasks or acceptability tasks that are supposed to, that if a model has a good
representation of some particular structure or some particular lexical knowledge, then it should
make correct predictions on these inferences. And so then you can basically just train models on
these tests and then measure accuracy and then you assume accuracy as a proxy for having represented
that structure, that feature, or hat aspect of language and enough to make good predictions in that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="39:17">

I guess the main challenge here of a behavioral test versus a probe is that the language model can't
do the behavioral test without additional training, right? It's output spaces it's typically a
generative model, either over masked words in a sentence or next words or something like this, but
the behavioral test that you want, the model isn't trained to do this. So how do I actually do a
behavioral test on something that was trained in a generative way?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="39:45">

I think that's often true in general, although that's not the distinction I would make between
structural and behavioral types of things because like you could so like the Tal Linzen/Yoav
Goldberg style subject verb agreement tasks are directly in artifact of the pre-trained language
model. You just say predict which word comes next. But that would still be somewhat of a behavioral
task. Right? I would think because you're just, you're not saying, yeah. And I think other ones that
where people look at things like correlations with surprise will measures or something in humans.
Like you can imagine something like that. But more often than that, we designed something like an
entailment set and a lot of the work that I've been involved in has been like entailment style
sentence pairs.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="40:28">

And then yeah, we have to fine tune a verb based model to do this test specifically. And that
introduces quite a lot of compounds because then you have to train it on some tests and then I guess
this gets at the issue when you have training probing classifiers too. But you have to figure out
what kind of splits are, what kind of artifacts are introduced in the training set. You have to make
assumptions about the form of the fine tune classifier and model. And now you, you've introduced a
lot of stuff beyond what was directly an artifact of the preaching model, right?

</Turn>


<Turn speaker="Matt Gardner" timestamp="40:59">

Yeah. Yeah. I think that's it. That's a good characterization. I guess if you want to do the non
fine tuned behavioral test, you have to figure out how to test the phenomena that you care about in
a way that doesn't require fine tuning, which is challenging.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="41:15">

Yeah, I think this is Adam Poliak's paper and Van Durme that lab has used the phrase recasting quite
a bit in this way. And I think when people talk, and I think there's been other work where it's like
turn everything into a language modeling task or turn everything into a QA task. And I think it's
actually not. So that's basically let's redesign the task in such a way that it fits the form of the
model is explicitly trained to do hopefully without then meeting to a ton of fine tuning. I think
the work on like using language models for common sense reasoning and knowledge base completion and
stuff would kind of fall into that. And it's like, Oh, instead of asking questions, let's just have
it complete, fill in the blank and see how well it does there.

</Turn>


<Turn speaker="Matt Gardner" timestamp="41:54">

I have mixed feelings about this. I like at one level the format in some sense probably doesn't
matter in most cases. Like if you do it with a language model versus if you do it with a sentence
pair classification like NLI or if you do it within a question answering format. These are basically
isomorphic to each other in most cases. And you can like the information content in all of your
examples is basically the same. And so the reason you might want to do it is if I have a model that
was trained in one way and I want to ask things about what it can do without introducing confounds,
then I might want to like recast things in order to probe that kind of model,

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="42:34">

Right? With anything where you have to find tune. And I think this gets at the issue of what's a
fair generalization task that we were just talking about. So like if I've trained a language model
and now I'm trying to test an NLI, there's a bit of work that needs to be done to just train the
model about like the shape of the NLI task. Like it just needs to know what are the inputs, where
the output is, what do I care about here? And so that requires it to do a ton of additional training
where it could learn all sorts of new things and people generally want to avoid that. But then if
you have a model that was trained on, even if you have a model that was trained and it, kind of
knows the quote shape of the task, you still end up with these issues where it's like, did it
actually get exposed to enough data of this phenomenon that we should have expected it to learn it?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="43:13">

And I think this is what's come up quite a bit with questions around kind of compositionality and
syntactic structure and things like that where it's like, is it fair to assume that the model could
have learned this relationship between, for example, like this verb and particular constraints on
its arguments or something like that. And you're like, well, if it's only seen any verbs of this
type five times during training, 10 times a hundred times, like what's enough times to now hold it
responsible for having learned that? And I think often we kind of throw up our hands and maybe
that's fine and we say, I don't know. I'm just asking did it learn it? Not should it have learned
it. But then when we start doing the analysis, we often then have a little more evaluative aspect
and we're kind of like disappointed that the model didn't learn it and we're not sure if it's an
architecture issue or a data issue. And that kind of opens up that, that whole avenue of
investigation.

</Turn>


<Turn speaker="Matt Gardner" timestamp="44:04">

Right. I guess you, you can't even go down that avenue of investigation until you're able to ask and
answer the questions. Right. So figuring out what the right way to ask it is then lets us ask
further questions about if it doesn't know this, why not.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="44:19">

Right, right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="44:20">

So I think we're running a bit low on time. Do you have like a two minute version of what your
favorite behavioral tasks are?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="44:27">

No, because so, and I will say why yes, didn't get to get into it. I think one of the, a separate
bit of work that or kind of parallel work to this has been figuring out what the human, upper bound
on these should be. And I think that that is actually incredibly hard. And and so I kind of like to
use the fact that we're doing all this probing work as an excuse to revisit what is it that we know
about human language processing or how do we know that humans have these structures or have this
behavior and we probably shouldn't be taking all of those things for granted. Like now is a good
time to revisit what are properties that language should have. So I think I do actually have a
favorite task, which is I still like the entailment NLI tasks.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="45:07">

It's like entailment in quotes. It's not really linguistics entailment it's like NLP entailment but
I like this kind of natural language inference task where it's like, read some sentence, draw some
conclusions about the world now say yes or no to other sentences based on your current model of the
world. Like that's kind of how I think of the task. I think it's pretty elegant and most things
could be mapped onto this format in a very natural way. I don't think any of our current NLI
datasets are really satisfying. But I think the task itself is quite nice. But that's one where I
think that it's actually, it sounds very simple and it is remarkably hard to get this task into a
format that's where you can get high human agreement and that we really know what inferences they
should make.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="45:50">

And so I think that that there's something much deeper going on there that rather than simplifying
the task or switching to a different task where we have a sense that we have better human agreement,
it's like a good excuse to kind of take a step back and say, what is it we're actually asking models
to do? Why is it that humans that it's so hard to get humans to do it with high accuracy or with
high agreement and yeah. And I think that's probably true of quite a large number of the behavioral
tasks that the human gold standard is actually not that clear cut.

</Turn>


<Turn speaker="Matt Gardner" timestamp="46:16">

Yeah. And you have a nice paper on this topic about disagreement and NLI and trying to better model
the disagreement. You want to give listeners a pointer to the title of that paper if they want to
look at it.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="46:28">

Yeah, I think it's called Inherent Disagreements in Human Textual Inferences. It was at one point
Human Judgments of Entailment but I think I changed it to Human Textual Inferences because
entailment is a loaded word.

</Turn>


<Turn speaker="Matt Gardner" timestamp="46:40">

Great. Thanks. This has been a really fun discussion. Is there, do you have any final thoughts or
anything that you really wanted to cover that we didn't get to?

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="46:47">

I don't think so. I think this is a huge topic. I hope we we at least hit the main points there's,
there's so much talk about, so, yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="46:55">

Yeah. Thanks. This was really fun.

</Turn>


<Turn speaker="Ellie Pavlick" timestamp="46:57">

Cool. Thanks so much.

</Turn>
