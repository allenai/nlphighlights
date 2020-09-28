---
title: "Data-to-text generation, with Verena Rieser and Ondřej Dušek"
hosts: ["Matt Gardner"]
guests: ["Verena Rieser","Ondřej Dušek"]
number: "108"
tags: []
description: "In this episode we invite Verena Rieser and Ondřej Dušek on to talk to us about the complexities of generating natural language when you have some kind of structured meaning representation as input. We talk about when you might want to do this, which is often is some kind of a dialog system, but also generating game summaries, and even some language modeling work. We then talk about why this is hard, which in large part is due to the difficulty of collecting data, and how to evaluate the output of these systems. We then move on to discussing the details of a major challenge that Verena and Ondřej put on, called the end-to-end natural language generation challenge (E2E NLG). This was a dataset of task-based dialog generation focused on the restaurant domain, with some very innovative data collection techniques. They held a shared task with 16 participating teams in 2017, and the data has been further used since. We talk about the methods that people used for the task, and what we can learn today from what methods have been used on this data. Verena's website: https://sites.google.com/site/verenateresarieser/ Ondřej's website: https://tuetschek.github.io/ The E2E NLG Challenge that we talked about quite a bit: http://www.macs.hw.ac.uk/InteractionLab/E2E/"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner Waleed Ammar and Pradeep Dasigi.

</turn>


<turn speaker="Matt Gardner" timestamp="00:08">

All right. Today our guests are Verena Rieser from a Heriot-Watt University and Ondřej Dušek from
Charles University in Prague. Verena and Ondřej, it's good to have you. Thanks for joining us.

</turn>


<turn speaker="Verena Rieser" timestamp="00:19">

Well thanks for inviting us.

</turn>


<turn speaker="Matt Gardner" timestamp="00:21">

Yeah. Hi. Thanks for inviting us.

</turn>


<turn speaker="Matt Gardner" timestamp="00:23">

Today. We wanted to talk about I guess what, what I think of as data to text generation, so like
natural language generation when you have some kind of structured stuff that you want to generate
from and I think Verena and Ondřej, you have more insight into this than I do. And so I'm going to
let you describe more clearly what exactly we're talking about here.

</turn>


<turn speaker="Verena Rieser" timestamp="00:42">

Yeah, I think natural language generation is sort of a popular term nowadays and to define it, it's
a bit of a moving target because it changed its meaning over the past couple of years. I think
currently people understand natural language generation as anything which can be modeled as a
condition or constraint. Language model. So ranging from image captioning to summerization, machine
translation or even style transfer. And what we meant when we set up our E2E Natural Language
challenge was the task of generating from meaning representations.

</turn>


<turn speaker="Matt Gardner" timestamp="01:20">

Right? So it's constrained in a particular way, not just given I guess given a structured input.
Right. So you gave examples of generating from an image, which is like, I have some contextual
generation, machine translation is, is also contextual generation in that I have some foreign
language sentence that I want to translate into some other language, but you're saying what you're
interested in here is where the context is a particular kind that you say is a meaning
representation. That word is a little bit overloaded, I guess people might think of abstract meaning
representation, AMR, which is a particular kind of thing. I think you're thinking of something a
little bit simpler. Do you want to tell us what kind of meaning representation you're talking about
here?

</turn>


<turn speaker="Verena Rieser" timestamp="02:01">

Yeah, sure. So it's a textual meaning representation. So here it's very loosely structured. So we
are talking about dialogue acts which are usually defined as some sort of intent with arguments or
for example, the intent could be inform the user about something and the arguments something like
type equals restaurant, and price equals cheap or something like that. And that then can be realized
as a cheap restaurant or a restaurant in the lower price range and so on. So something which is, you
know, described via text and loosely structured. This is different from what people used to
understand as data to text generation. So this term was originally coined by Ehud Reiter back in
2007 and it meant non-linguistic input data such as sensor data or even event logs and things like
that. Whereas now when people say data to text generation, they include all sort of structured
meaning representation such as; table data, knowledge graphs, AMRs or these type of under specify
dialogue acts, which we were using.

</turn>


<turn speaker="Matt Gardner" timestamp="03:19">

So I feel like it's probably familiar to a bunch of people why you might want to use some particular
kinds of contexts in generation, like if I have an image, I might want to describe what's in the
image and there are some pretty clear visually impaired use cases of this. Or if my context is a
foreign language sentence, there's some pretty clear use cases for why am I want to generate given
that. So what in what circumstances might someone wants to actually use a contextual generation
system where my context is this kind of semi-structured meaning representation.

</turn>


<turn speaker="Verena Rieser" timestamp="03:53">

So in our case, the motivation was really within the context of spoken dialogue systems, which
traditionally come in the modular architectures. So where you've got the natural language
understanding module and that outputs a you know, dialogue acts specification and that gets passed
into the dialogue manager and then the dialogue manager decides on what to say next. And that again
is on that abstract level of a dialogue act. So then the NLG component is part of a dialogue system
traditionally takes the style act representation and translates it into natural language. So that
was our motivation for using that specific type of meaning representation.

</turn>


<turn speaker="Matt Gardner" timestamp="04:39">

Yeah, and I guess specifically if you think of Imagine, Next Generation, Siri or Alexa, or Google
Assistant that does a better job actually responding to you having a conversation that's not really
very conversational at this point, but I guess your challenge that we will talk about in more detail
here in a little bit. You could say it's like trying to drive us toward a future where we have more
conversational assistance essentially. Am I understanding this right?

</turn>


<turn speaker="Ondřej Dušek" timestamp="05:03">

Yeah, yeah. But even the current version basically you know, has an NLG component there that starts
with some kind of meaning representation and then transforms it to text, which is then read aloud by
a text to speech component. So it's basically the same case here.

</turn>


<turn speaker="Matt Gardner" timestamp="05:22">

Yeah. Okay. Yeah, totally fair. I guess I was, I have a Google assistant, a bunch of Google home
devices in my house and they, my use of them is not very conversational at this point, but

</turn>


<turn speaker="Ondřej Dušek" timestamp="05:34">

Yeah. Yeah. But it still involves some kind of natural language generation even though I suppose in
case of Google assistant nowadays, it's probably just some, you know, handwritten templates filled
with some values and you know, we're trying to use more machine learning here.

</turn>


<turn speaker="Matt Gardner" timestamp="05:54">

Yep, Okay, great.

</turn>


<turn speaker="Verena Rieser" timestamp="05:55">

Yeah. I think also for dialogue systems, you currently have these two different architectures,
right? So one is based on this notion of dialogue act and it's all modularized. So you basically
you've got NLU dialog management and the NLG module and they're all sort of communicate with each
other on a symbolic level of dialogue acts. Whereas on the other hand, you've got this completely
end to end systems which basically treat the whole process as a encoder decoder model and they don't
require this dialogue act annotation, right? They are more on this open ended conversational level
so that they can handle what we call open domain conversations or all sorts of chitchat. Whereas the
traditionally the more modular dialogue system, they're task-based systems. So the dialogue acts are
really there to constrain the system to a particular task and make sure the system stays on topic,
on a particular task, and also conveys exactly that information as specified in the dialogue act and
as chosen by the dialogue manager whereas these end to end systems, they don't have so tight control
over what is said. Right? So that that can be positive because you basically can find an answer to
almost anything what the user says, but it's not always the best answer, right? So it's known that
the systems often have very unspecified or general answers. So things like, I don't know, or, you
know, tell me more about that or I'm sorry. Or on the other hand, they can also produce very
inappropriate answers which, you know, fit the context, but you don't really want to have in a
commercial system.

</turn>


<turn speaker="Matt Gardner" timestamp="07:49">

Right? And in chitchat kinds of applications, you could think maybe, maybe this kind of end-to-end
thing might work. But if you imagine any kind of system that interacts with a database or any kind
of external software system at all like say, tell me about the restaurants that are nearby, or like
find me something and then the dialogue manager issues a query and then gets some result back.

</turn>


<turn speaker="Verena Rieser" timestamp="08:15">

So it's a way of knowledge grounding basically, these dialogue acts help the system to, you know,
ground in a knowledge base which has some sort of meaning representation to queries.

</turn>


<turn speaker="Matt Gardner" timestamp="08:26">

Yeah. Yeah. And if you assume that the dialogue system is interacting with anything else, then
you're going to be in a situation where there is some kind of structured or where you have some
structured context to generate language from. Right?

</turn>


<turn speaker="Ondřej Dušek" timestamp="08:39">

Yeah. It's really hard to do it otherwise. Basically. I mean there are systems trying to, you know,
have a neural net that has like an attention mechanism over all possible entries in a database. It's
mostly just like toy examples so far it doesn't, doesn't work that well.

</turn>


<turn speaker="Matt Gardner" timestamp="09:01">

Yeah. I do a bunch of work in this kind of space where you're interacting with a database or
something. We typically don't close the loop and generate something after that. But yeah, like an
end-to-end system that does all of its database interaction inside of the neural net is like
impossible. Like this is, this is not going to happen and probably isn't even the right way of
thinking about this. So yeah, if we have a dialogue system that is interacting with something else,
we will always have this kind of setting. I can think of a few others where you might want like
contextual generation where the context is some kind of structure. I know for a long time people
have been looking at for instance, generating baseball games summaries or basketball games,
summaries or other kinds of like what happened in the stock market today. I don't know. Like you
could imagine some system that tries to generate a report for human consumption based on some kind
of structured data, right?

</turn>


<turn speaker="Ondřej Dušek" timestamp="09:50">

Yeah. It's basically whenever you have some kind of machine process data and you want to present it
to people in a natural way. One way of doing that is using natural language generation.

</turn>


<turn speaker="Matt Gardner" timestamp="10:03">

Okay, great. So I think we've got a decent handle on like what problem we're talking about and why
people might care about it. So what makes this hard? Why, why is it more challenging to generate
from structured contexts than other kinds of contexts?

</turn>


<turn speaker="Ondřej Dušek" timestamp="10:19">

Well, like the first part about this being hard is actually getting the structured data at least for
example, for a task like we've done with the E2E and NLG challenge where we had a lot of restaurant
recommendations basically, you know, you don't need like millions of training examples to make the
system work, but you still need thousands. Like in our case, we collected a data set of like 50,000
examples and getting that many examples to train a machine learning model to work with that is
tricky to do with like, you know, sufficient quality because it's too much for you to write it
yourself and you wouldn't be getting enough variety. And then if you use a methods like
crowdsourcing, then then you need to really check what crowdsourcing workers are entering. And we
basically always end up with a certain amount of of noise.

</turn>


<turn speaker="Ondřej Dušek" timestamp="11:19">

If you want to scrape data from the web, it might not be exactly what you want, you know, it might
be slightly out of domain and also any external source can be potentially dangerous. I mean there,
there might be some swearing or just kind of stuff that you basically don't want the users to, to
hear. So that's, that's one problem getting the data at all. And the other is somehow representing
the data inside neural nets. Cause I guess the more complex or the more difficult the structure of
your data is the more complex this becomes. So using relatively simple meaning representations as we
did in the E2E challenge where it was basically mostly like attributes and values, that's relatively
fine. You can just, you know, arrange them in a sequence. And the typical neural net models are able
to handle sequences pretty well. On the other hand, if you have graphs or tables you need to have
some more complex mechanisms to work with that and also if you have more structure it can even help
you. It can get you better results, but you still, you need a more complex model and it becomes more
expensive to collect the data or to build up the training data set.

</turn>


<turn speaker="Matt Gardner" timestamp="12:46">

Great. Yeah. Just just to paraphrase, to be sure I understood, it sounds like you're saying there
are two problems here. I guess the first one I hadn't even thought about, which is really
interesting. Data collection in itself for other kinds of contexts like images or foreign language
sentences. We have pretty natural ways to get reasonable, very large datasets, but if I have some
abstract meaning representation, these don't just exist everywhere that you can just scrape them.
You have to figure out how to get them. That's a really good point. I hadn't thought of that and
then modeling yeah is really interesting. Presumably you have graphs, you could take your structured
representation and represented as a graph and then do some kind of graphing coding perhaps. I think
we should push off the modeling discussion until a little bit later. But yeah, it's hard just from a
modeling perspective, given this structured thing, it's not trivial to think of how to model it.
We'll hopefully have time to talk about what people have done a little bit later in the discussion.
What about like faithfulness? So, there are even problems of like; I'm supposed to generate
something specific. How do I make sure that the model is generating what it's supposed to? So this
is I guess partly a modeling problem and also partly an evaluation problem.

</turn>


<turn speaker="Verena Rieser" timestamp="13:57">

Exactly. So that was actually one of the main results and findings of the E2E generation challenge
was that the models we've been looking at pretty much all had a problem with these so called
pathology. So we had hallucinations, which you know the model hallucinates content which isn't there
in the meaning representations or omissions. So the meaning representation specifies something, but
the model actually doesn't generate it or repetitions just saying things twice. And that's obviously
really bad in the context of task-based dialogue systems because you know that they have to be
faithful, these generation modules. So yeah, as you said, that's a challenge for both evaluation and
also for the modeling perspective. So what people did in the E2E challenge was basically beam re-
ranking, checking whether all the elements of the MR was covered by the outputs, doing actually
quite simple things like regex matching on the outputs that are generated with the MR, the meaning
representation. And then for evaluation it was more tricky. So we also used some you know, sort of
pattern matching to evaluate the semantic correctness. But this is something which for example, BLEU
doesn't cover that well. So traditional evaluation metrics are like word overlap based like BLEU and
follow on similar metrics, which won't tell you whether actually your model is faithful or not.

</turn>


<turn speaker="Matt Gardner" timestamp="15:36">

Yeah, I guess now that I think about this a little bit more, this isn't a different problem from
what you face in other generation problems. Like if my context is an image or a foreign language
sentence, I still want to have something that's faithful and that actually captures what my context
was. It's just here it's discreet and structured and some sense maybe that makes it easier because
like if I have an image, you mentioned methods that I could do like regex matching or Beam re-
ranking kinds of stuff to be sure that I actually captured what was in the meaning representation.
It's not really clear to me without having thought about this a lot more. How you would do this with
an image and so maybe you actually have it a little bit easier. I don't know what, what do you, what
do you think about this?

</turn>


<turn speaker="Verena Rieser" timestamp="16:17">

I agree that you know, string matching obviously makes it easy and we're dealing both the MR is
usually, you know, specified in terms of strings and the output is specified in terms of strings.

</turn>


<turn speaker="Ondřej Dušek" timestamp="16:29">

I suppose this also comes with the fact that what we're dealing with usually is generating stuff for
some kind of limited domain. I mean here we had the restaurant recommendations or you can have like,
you know, basketball summaries. So you kind of know the topic and that's why you can even work with
some kind of string matching cause for like machine translation. Typically you're expecting to
translate any sentence in the source language. So it would be pretty hard. I suppose you could, you
could check with some kind of hand written dictionary but it would still probably be quite tricky.
And I mean even even in our case, it's not perfect. You, you're not able to capture all possible
patterns of expressing that a restaurant is cheap, for example, even if you try, but it's much
easier than, than for like a general domain.

</turn>


<turn speaker="Matt Gardner" timestamp="17:24">

And I guess with a structured representation, it's a pretty clear limited scope for what you're
supposed to be generating. Whereas like image captioning for instance, there's so many bits that
that are in the image. Then so many different levels of granularity that you might want to describe
what's in the image. And so it's not really clear what you should be generating. At least in this
case you have a pretty clear task probably most of the time. Maybe there are some cases where you
don't, I guess like say I'm trying to summarize what the stock market did today or I'm trying to
summarize a basketball game. Maybe I'd have a similar problem. But for your dialogue generation,
it's probably pretty well scoped I think.

</turn>


<turn speaker="Verena Rieser" timestamp="18:02">

Yeah. I think there's also a difference here whether we talk about content only surface realization.
So in our case we assume that we don't do content selection rates. So we said you always should
generate everything specified in the meaning representation. Whereas other tasks you might not want
to do that you have to first select what you want to talk about. And then this automatic string
matching obviously becomes much harder because you know, it's actually defined by the tasks that you
maybe should not be talking about everything specified in the MR.

</turn>


<turn speaker="Matt Gardner" timestamp="18:33">

Right. Great. This is really good. So just to summarize, the problems that we've talked about are
getting data modeling stuff and some similar problems to other generation tasks about like how do
you make sure that the model is faithful and how do you evaluate that the model is faithful. I think
we can move on to what people have actually done. We've been kind of skirting around this end-to-end
natural language generation challenge that you both set up. Do you want to tell us about what
exactly that is and what you did?

</turn>


<turn speaker="Verena Rieser" timestamp="19:05">

Yeah, sure. So, this was a task my self, Ondřej, and our colleague Jekaterina Novikova set up in
2017 so a couple of years ago now. And the main motivation for this challenge was really that at the
time neuro generation was pretty new, right? So, and there were a couple of systems coming out
around 2015 which did like neural end-to-end generation from the sort of abstract meaning
representation, such as dialogue acts. Right? At the time, they were still very much limited to very
short formulaic utterances. So something which pretty much sounded like templates. So we wanted to
know can this actually scale to something which sounds a bit more natural and which is also longer,
right? So not just short utterances, but more complicated, lexically more rich, utterances, which
have more complicated discourse structure and so on.

</turn>


<turn speaker="Ondřej Dušek" timestamp="20:09">

They're more diverse as well.

</turn>


<turn speaker="Verena Rieser" timestamp="20:11">

Yes, exactly. So moving away from these very small limited data sets. And in order to do that, we
collected a new data set using crowdsourcing. And in order to get that type of diverse data, we
showed people pictures. So instead of telling them, here's our textual meaning representation, can
you please talk about it? We showed them a pictorial representation and I should add that this was
in the restaurant domain. So this is a domain which, you know, people working on task-based dialogue
systems use a lot. Cause it's small and well defined. And in our case we were lucky because we are
able to produce pictures telling the user, this is the task. So

</turn>


<turn speaker="Matt Gardner" timestamp="20:55">

Can you give some examples of what, like when you say restaurant domain, I can imagine a few
different things like booking or ordering or a few different things. So what exactly do you have
some examples of what you were doing?

</turn>


<turn speaker="Verena Rieser" timestamp="21:05">

So in our case it was mainly informing the user of the type of restaurant. For example restaurant
name, restaurant type, cuisine, price range. And then the system would generate something like China
Red is a cheap Chinese restaurant in the center of town, close to the river, something like that.

</turn>


<turn speaker="Matt Gardner" timestamp="21:27">

Okay. And how does, how do the pictures fit in here? Like you show a picture of a restaurant or
something?

</turn>


<turn speaker="Verena Rieser" timestamp="21:34">

Yeah, so we would show a picture of where it's located. Some sort of picture of the type of cuisine.

</turn>


<turn speaker="Ondřej Dušek" timestamp="21:41">

Kind of a schematic. You know, if you want to say that restaurant is cheap, you show like a, I think
there was a pound sign and you had like three possible and one of them was yellow and the other were
like blank. So that, that shows this. Like it's so, you know, low cost. If you want to show, I don't
know, a Japanese cuisine, you show a picture of a sushi or some kind of stuff. If you want to show
that children are not welcome in this restaurant, you show a picture of, of children and then cross
it out.

</turn>


<turn speaker="Matt Gardner" timestamp="22:19">

Interesting. This is really good. Like I do a bunch of work in reading comprehension these days and
when people create reading comprehension datasets, a lot of the time we, you get questions that have
very high word overlap with stuff that's in the paragraph itself. And what you just said was you, if
you don't do this, you're you and you show like the meaning representations that you used, which is
like some kind of logical form ish representation of, of like the price and all of this. You're
going to get people that are very, very influenced by the particular words that were chosen for the
meaning representation. And this is, this is a really interesting, good way of trying to get around
that. So, so yes, I get it now. This is, this is really good.

</turn>


<turn speaker="Verena Rieser" timestamp="22:58">

Yeah, exactly. So we wanted to avoid that. People are basically just being primed by the meaning
representation and basically just reading out what the meaning representation says. So yeah. So we
collected this dataset, which then indeed proved to be much more diverse than the previous datasets.
People used, you know more diverse ways of referring to different cuisines or saying, you know, it's
a cheap restaurant or moderately priced or you know, families are welcome or you can bring your
children. So different ways of basically referring to this underlying meaning representations. And
then we released this dataset, I think that was about early 2017

</turn>


<turn speaker="Matt Gardner" timestamp="23:43">

How big, how was it, did you say 50,000 earlier in the conversation? Is that right?

</turn>


<turn speaker="Verena Rieser" timestamp="23:48">

Yeah, 50 K.

</turn>


<turn speaker="Matt Gardner" timestamp="23:49">

Okay.

</turn>


<turn speaker="Verena Rieser" timestamp="23:50">

And for each meaning representation, we had I think it was between one and five linguistic
realization.

</turn>


<turn speaker="Ondřej Dušek" timestamp="24:01">

I think it was even more, but I mean it was like five or 6,000 different meaning representations.
And that was coupled with like 50,000 natural language utterances. So,

</turn>


<turn speaker="Matt Gardner" timestamp="24:14">

So on average you could say like 10 ish reference,

</turn>


<turn speaker="Ondřej Dušek" timestamp="24:18">

I think it was eight on average as far as I remember.

</turn>


<turn speaker="Matt Gardner" timestamp="24:21">

Okay. But then you could evaluate, say like, I have one meaning representation and I have like eight
references that I could compute BLEU against or whatever. So this is what we're talking about.

</turn>


<turn speaker="Ondřej Dušek" timestamp="24:30">

Yeah, yeah, exactly. Exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="24:32">

So you released this in early 2017.

</turn>


<turn speaker="Verena Rieser" timestamp="24:35">

Yes. So we released this as a shared task and we got quite a lot of interest. So we had I think 16
people, different organizations participating and over 60 systems submissions. So then we asked
people to specify a primary system. So we had about 20 primary systems and the primary systems we
determined in terms of automatic metrics. So we gave people an indication how well their systems
performed in terms of automatic metrics, and then they chose one or two primary systems each. I
think the interesting bit here was that we got a whole variety of different architecture. So most
people at the time used sequence-to-sequence models. But we also got very competitive template-based
systems, so people which actually harvested these templates in a data driven way from our data and
some grammar based systems and then also some other machine learning based systems using things like
imitation learning or RNNs or I think there was one using just a combination of linear classifiers.

</turn>


<turn speaker="Matt Gardner" timestamp="25:52">

All right. It sounds really interesting. That's really cool.

</turn>


<turn speaker="Verena Rieser" timestamp="25:55">

So I think what was a real main advantage here that the manual systems are actually highly
competitive. So people really put in a lot of effort. Whereas usually when you've got your manual
baseline, right, you don't really put in a lot of effort because you want to show that you neural
system can beat that manual baseline whereas here we had people clearly building very competitive
template-based system and indeed in the end we were able to show that these template-based systems
for this very small domain actually do really well compared to the end-to-end neural approaches.

</turn>


<turn speaker="Matt Gardner" timestamp="26:32">

So you had a shared task and someone won, I assume. Like, what was the method that actually won, was
it one of these template based ones? Is that what you're saying?

</turn>


<turn speaker="Ondřej Dušek" timestamp="26:42">

Actually not the winner was like an ensemble of three different seq2seq models trained in quite a
complex way and it used like this beam re-ranking so you know, they generated multiple outputs and
then checked which output is the most accurate and then they kind of used that one as the final
output. So that was the system that, that won, because it was one of the best on like both fluency
and accuracy. So it was a very good balance in this respect. And on the other hand there was a
template based system which was like completely handwritten templates, which was actually the most
accurate. But on the other hand, you know, the outputs were kind of repetitive and longish. So it
wasn't as fluent as the machine learning systems. And the other systems that use actually the
template mining from data actually carried over some noise from the data. So they weren't completely
accurate as well. But they did relatively well, compared to like much more complex machine learning
based models.

</turn>


<turn speaker="Matt Gardner" timestamp="28:06">

Yeah. This is interesting. It brings up a bunch of issues even just with evaluation. Right. Cause
you said in there that the template system was repetitive, which I guess implies that the seq2seq
ensemble was not so repetitive. I'm having a hard time even thinking of a metric that would capture
this cause you have to look at it across different test examples. It's not just a single one. Right.
This is a huge can of worms. So like how do you, how do you evaluate this?

</turn>


<turn speaker="Verena Rieser" timestamp="28:31">

So we, looked at a bunch of different metrics. So automatic metrics and also evaluation with humans.
So in terms of automatic metrics, we obviously use the standard ones like BLEU and then a bunch of
other sort of word overlap based or similarity based metrics. And then also metrics like readability
and metrics which aim to capture diversity. Like how many N grams for example, you have, how much
lexical diversity do you have?

</turn>


<turn speaker="Ondřej Dušek" timestamp="29:00">

Or entropy, which also kind of gives you the measure of diversity,

</turn>


<turn speaker="Matt Gardner" timestamp="29:05">

Entropy of the output distribution. Or of like the tokens that were produced?

</turn>


<turn speaker="Ondřej Dušek" timestamp="29:11">

Yes, yes. And entropy of the tokens.

</turn>


<turn speaker="Matt Gardner" timestamp="29:14">

So, so given all of the tokens that were produced across the entire dataset, you make a distribution
over the vocabulary given what was output and then you compute the entropy of that distribution.

</turn>


<turn speaker="Ondřej Dušek" timestamp="29:24">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="29:25">

Okay. Interesting. And you mentioned readability in there. Was that a manual judgment or do you have
some automatic way to do that?

</turn>


<turn speaker="Ondřej Dušek" timestamp="29:32">

I think that this one was automatic. I think there is like a,

</turn>


<turn speaker="Verena Rieser" timestamp="29:35">

Yeah, I'm just trying to remember how we computed that.

</turn>


<turn speaker="Matt Gardner" timestamp="29:39">

Yeah, there's some like level computations that you could do.

</turn>


<turn speaker="Verena Rieser" timestamp="29:43">

Yeah. There were like on these levels of

</turn>


<turn speaker="Ondřej Dušek" timestamp="29:46">

There was this level of syntactic complexity, right? Is the D-level or are that's how it was called,
right?

</turn>


<turn speaker="Verena Rieser" timestamp="29:53">

Yes. That's what we did. So, yeah, we also measured syntactic complexity in terms of these D levels.

</turn>


<turn speaker="Ondřej Dušek" timestamp="29:59">

And that's basically, I think it's based on like first using syntactic parsing and then then there
are some rules on top of that to determine like how complex that sentences. And did you have any
human evaluations?

</turn>


<turn speaker="Verena Rieser" timestamp="30:13">

Yes, indeed. So we had, first we had the automatic evaluations and then we had human evaluation.
Again, like crowdsourced human evaluations, which you know are, can be noisy. And we try to
determine two main factors. One is what people call fluency or you know, how well formed to this
basically. And the other was what people call informativeness or semantic correctness or basically
how well it captures a given meaning representation. And then we had a third criteria which aimed to
capture both semantic correctness and a well formed, how well formed it as in record quality. So
people had to rate these three dimensions for each pair they saw. So what we did, we did like a
evaluation where we showed people a reference and then different system outputs and they had to rank
them relatively to each other. So that's an idea we got from how people evaluate machine
translation. So it's determined the relative goodness of an utterance rather than asking people to
score an output on a liquid scale from one to five without a reference point, which I think can be
pretty noisy. We gave them a reference point. And then we also didn't use a liquid scale, but we
used a continuous scale. So that's a method called magnitude estimation. So you said, okay, if the
reference for example is a hundred, what would you give this utterance. So for example, you could
think that's twice as good

</turn>


<turn speaker="Ondřej Dušek" timestamp="31:48">

And you saw like five of them at the same time. So you could even like distinguish among them and
then, you know, give like relative scores against each other.

</turn>


<turn speaker="Matt Gardner" timestamp="31:59">

I've seen some machine translation output that is just so awful that it would be hard to even give a
relative ranking. I'm assuming these methods are at least close like that maybe this is a simpler
problem. And so you have, I'm assuming a lot here, I could be wrong, but maybe this is easier to get
close and so it's easier to actually have people not just throw up their hands and give up when they
see totally awful translations in the first place. Right. Does this make sense?

</turn>


<turn speaker="Verena Rieser" timestamp="32:33">

Yeah, I think that's a good point that actually most of our outputs were pretty close. So this
relative ranking tried to capture the fact that like how relative to each other, there might even be
some which are actually equally good. So I think that the range of output quality wasn't as diverse
as you would maybe see in machine translation.

</turn>


<turn speaker="Matt Gardner" timestamp="32:58">

Okay. Did it, did the people who were doing this also see the meaning representation or just the
reference?

</turn>


<turn speaker="Verena Rieser" timestamp="33:04">

Yeah, so it depends so when we evaluated informativeness or semantic correctness, we did show them
the meaning representation. But when we asked them to evaluate fluency, we didn't show them the
meaning representation. So again, that was an actual experiment which we run. Whether we should
evaluate fluency in semantic correctness in one go or whether we should ask it separately. And we
found that if you ask it separately, they are less correlated because ideally you want scores which
are not highly correlated. So we can make sure we are actually assessing different dimensions here.
Right,

</turn>


<turn speaker="Matt Gardner" timestamp="33:40">

Right.

</turn>


<turn speaker="Ondřej Dušek" timestamp="33:41">

Yeah. And this was also interesting that, you know, one of the systems that actually won on fluency
was one of the worst on over all quality where we also show the, you know, the meaning
representation because that system produced very nice and fluent sentences, but they were not very
accurate.

</turn>


<turn speaker="Matt Gardner" timestamp="34:02">

Right. Yeah. I could imagine a system that that outputs only ever one sentence and it's perfectly
fluent and so it wins the fluency, but it has no relation at all to the meaning representation. So
it is no good. Right.

</turn>


<turn speaker="Ondřej Dušek" timestamp="34:17">

I mean it was not that bad, but yeah, it's kind of an extreme case.

</turn>


<turn speaker="Matt Gardner" timestamp="34:22">

Right. So did you or has there been since any work on automatically evaluating the informativeness
or like coverage? I am not sure which, which is the right term, but like how well you're actually
completely capturing all of the information in the meaning representation. It's like you can have a
person do this. Right. But that's hard.

</turn>


<turn speaker="Ondřej Dušek" timestamp="34:46">

Yeah, it takes time.

</turn>


<turn speaker="Matt Gardner" timestamp="34:48">

And I know people have started thinking about this in some cases for like to do it automatically,
but I don't really know the state of this very well.

</turn>


<turn speaker="Verena Rieser" timestamp="34:58">

So I think for our task, as we discussed previously, this is relatively straightforward because it
can be done by a string matching, right? But for other tasks such as summarization, it's much harder
to do because you've got this step of content selection, which makes it much harder to determine,
you know, whether you're semantically correct with respect to the document you're trying to
summarize.

</turn>


<turn speaker="Ondřej Dušek" timestamp="35:24">

Yeah. And also your, your domain is broader so you're not able to get all possible strings. So this
is one option. The other option is you basically train a language understanding model on the system
output switch, which is what basically multiple people have done. And that even could help you to
kind of like train your NLG model better if you know what's, you know what output you're getting
from it. And you use that for example, to augment your training set by like correctly generated
outputs.

</turn>


<turn speaker="Matt Gardner" timestamp="36:05">

So what you mean by that is you're going to train a system to predict the meeting representation
from the utterance.

</turn>


<turn speaker="Ondřej Dušek" timestamp="36:13">

Yes, yes.

</turn>


<turn speaker="Matt Gardner" timestamp="36:15">

Yeah. Let's come back to that. I think that's really interesting. There was one thing that you said
earlier that I want to ask about. You said that you can use string match kinds of things to
automatically evaluate this except your data collection used pictures to try to get away from exact
string match. So it seems like this actually, if the data is good, the better the data is, the worst
these metrics actually work. Is that, is that fair?

</turn>


<turn speaker="Ondřej Dušek" timestamp="36:42">

Yeah, it actually made it harder to come up with the correct patterns. And I mean, when I was, you
know, trying to do exactly that, to come up with the, with the patterns, I had to go manually
through a relatively large portion of the data to see what all the different patterns are. And I'm
pretty sure I didn't get all of them. So you know, you always will have some kind of noise in this
evaluation.

</turn>


<turn speaker="Matt Gardner" timestamp="37:12">

Right. Okay.

</turn>


<turn speaker="Verena Rieser" timestamp="37:13">

Yeah, no, that's a really good point. So for example, we had people saying really creative things
because we show them these pictures. For example, they were the underlying meaning representation
where the cuisine was French. They would say, Oh, this is a restaurant serving wine and cheese.
Right. Because that was on the picture. So that is something, you know, which, yeah, you need to
recover from your dataset if you want to do exact string matching.

</turn>


<turn speaker="Matt Gardner" timestamp="37:44">

Right. Okay. So coming back to this idea of learning a system to recover information from the
utterance. I've heard this idea a few times. I'm not sure how much it's actually used, but just the
general idea. You could do this for machine translation. You could do it for a bunch of different
things. I'll describe it, how I've seen it in like machine translation kinds of stuff and we can
compare notes about how people do it in this E2E generation setting. So if I have a machine
translation system that I want to evaluate, one thing that I could do, let's say I'm translating
into English, I could take SQuAD, the Stanford Question Answering Dataset for reading comprehension
and I could take my translation system and translate the paragraphs and the question from my foreign
language into English. And then I could say, given this translation, am I able answer the question
as well as I could answer it with my system that was just trained on English.

</turn>


<turn speaker="Ondřej Dušek" timestamp="38:42">

Right.

</turn>


<turn speaker="Matt Gardner" timestamp="38:42">

You might want to be a little bit careful, like maybe only do the paragraph or maybe only do the
question. Like there are different things you could do, but this is the basic idea. Like, I want to
test my machine translation systems ability to retain the semantics of the thing that I'm
translating. And this pre-supposes like you have to have a French version of SQuAD in order to
translate it into English. So you have to have a parallel question answering corporate in some
sense. But if you have that, then you can imagine evaluating your system on how well it retains the
information that you need to do this end task. And I think this is basically the same idea as what
you were saying. It's just on trying to recover meaning representations instead of trying to answer
questions. Is this fair? Is this the same thing?

</turn>


<turn speaker="Ondřej Dušek" timestamp="39:28">

Yeah, I suppose in a way, I mean here the, the meaning representation is very well-defined. It's
basically like what you start with in the NLG process. So you can kind of go back and look if what
you generate it equals to what you started with. So it's, it's probably like better defined than in
SQuAD where I suppose the answer is usually like just a phrase or a single word or something like
that when you have like a whole paragraph of text to support it. So here you have the meaning
representation for like just like a sentence or two. So it's like far more fine grained.

</turn>


<turn speaker="Matt Gardner" timestamp="40:11">

Yeah. And easier to be clear, I'm not, I'm not aware of anyone actually doing the translation
evaluation that I mentioned, I've seen people talk about it and I think people have done it in
simpler settings. Right. This whole idea though that let's stick with a meeting representation
version. This still assumes that I have a parser that goes from the utterance to the meaning
representation and now the evaluation of my generation is dependent on the quality of my parser in
some way.

</turn>


<turn speaker="Ondřej Dušek" timestamp="40:40">

Yeah, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="40:42">

Which seems a little bit unfortunate.

</turn>


<turn speaker="Ondřej Dušek" timestamp="40:44">

I mean your parser can, involve this string matching is what we we talked about but there were a few
people who actually used this parser like a machine learning trained parser for days, but it wasn't
for the final evaluation of your model. It was mostly to kind of help the training process of your
generator. So you would know when your generator went wrong and then you could do something about
it. Like for one paper I remember at INLG last year they actually had the NLG system generate many
more training examples then use the sparser to check which one of them were accurate and only use
those accurate ones for training further.

</turn>


<turn speaker="Matt Gardner" timestamp="41:39">

Yeah. I've seen similar things in like question generation for SQuAD where you have this like loop
that in some sense kind of like, a GaN maybe, but you're generating stuff.

</turn>


<turn speaker="Ondřej Dušek" timestamp="41:50">

Yeah. Yeah. It's, it is kind of like, like GaN in a way. Yeah. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="41:56">

Kind of. If you wave your hands a bunch of, it's not really. Anyway, so this is, this is really
interesting. I hadn't really dug into this challenge that you set up. It's really interesting to
hear about all of these details. So this was 2017 what has happened since, has there been any, like,
do people still use this data? Has there been more or other kinds of challenges what's happened
since?

</turn>


<turn speaker="Verena Rieser" timestamp="42:21">

So this data is still used and people have even further develop this dataset. So at last year's ACL
for example, they introduced more structured meaning our presentation. So we already mentioned that
our meaning representations were pretty much flat and that's why, you know, these type of seq2seq
models did really well. But at last year's ACL, there was a paper by Facebook where they basically
included some discourse structure into our meaning representation. So for example, you often had
things like comparisons or contrasts where people would say, well, this is an expensive restaurant,
however, it's not child friendly or something like that. So they're annotated, these type of
discourse representations and they show that by annotating this, they got better outputs in terms of
they were more accurate and also more fluent, but that obviously also had this extra step of
annotation which they required.

</turn>


<turn speaker="Matt Gardner" timestamp="43:23">

Just to understand what it is exactly. You're saying, so they took the original data, same 5,000 or
something meaning representations and 50,000 or something utterances and you're not re- collecting
utterances. You're saying, let me look at the discourse phenomena, the hedging or whatever that
happens in the utterances and actually annotate them in the meaning representation. Yes. This means
I have to, I also have to annotate them at test time. Otherwise, how do I know what to generate
from, right. So you're giving the system more information at test time and then seeing if you can
generate better. It's more information about the input which is nice.

</turn>


<turn speaker="Ondřej Dušek" timestamp="44:02">

Yes, yes. Yeah. Actually this is what you're doing. Yeah. Okay. It's like, yeah, more constraining
the generation to hopefully get more accurate outputs, which is what they were showing in the paper.

</turn>


<turn speaker="Matt Gardner" timestamp="44:15">

Yeah, that makes sense. Pretty clear that if you give it this additional insight of other stuff that
goes on in language, you should be able to generate better from it.

</turn>


<turn speaker="Verena Rieser" timestamp="44:22">

Yeah. Exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="44:24">

Interesting. Cool. I guess that is like a different version of the data. So it is like I asked what
other data is there? Well now there's this augmented version that also has discourse phenomenon.

</turn>


<turn speaker="Verena Rieser" timestamp="44:35">

Yeah. And I think so what obviously happened since then, I think the two main events are, you know,
transformers and pre-trained language models and people have used them in various ways. So, also
last year there was a paper I think from William Wang's group, which basically used the language
model and a copy mechanism and then decided to learn when to copy from the meaning representation
and when to sort of fill in the gaps using the language model. And they were basically showing that
using that you need much less data. And then similarly earlier this year, I think there was a paper
by Google last week or two weeks ago where tthey also had like a dialogue act representation and
they they used a GDP2. And then on top of that they pre-trained on all available data sets which are
annotated with dialogue act.

</turn>


<turn speaker="Verena Rieser" timestamp="45:31">

So MultiWOZ, Frames can't remember a bunch of them. I think in total it was like 400K and then
they're actually fine tuned to a specific task. And again, you know, that was to show that you need
less data, what they didn't really address is how to make these models more accurate. Right. Because
that's what I think one of the main problems we found in the E2E challenge that but on the one hand,
yeah you need data. But on the other hand, once you got your models, how do you constrain them?

</turn>


<turn speaker="Matt Gardner" timestamp="46:04">

Yeah. Great.

</turn>


<turn speaker="Ondřej Dušek" timestamp="46:05">

Yeah, just wanted to mention that. Basically the stuff that I talked about combining language
understanding at NLG. This is kind of also like a post E2E challenge result basically from last
year. Okay. And there are, there were like three different groups who were using very similar
approaches to this. So this is something that people have been looking at lately.

</turn>


<turn speaker="Matt Gardner" timestamp="46:27">

Yeah. Great. So we're running a little bit short on time. This has been really fun. There's a bunch
that I had thought of that I wanted to talk about and we haven't even had time to cover it. I guess
my last question is what do you think are the most interesting open challenges left in this area?

</turn>


<turn speaker="Verena Rieser" timestamp="46:43">

I think there are a couple of themes across generation challenges. So what came out of the E2E
challenges. There's also a paper on, you know, challenges in neural summarization and then there is
a paper also from 2017 from Sasha Rush's group challenge in what they call Data-to-Document
Generation. And basically the three themes they all mentioned is while the data collection is a
challenge. You know, it's noisy data you're usually dealing with evaluation is a challenge. It's not
clear how you know, what are the right metrics to evaluate this including human evaluation is a
challenge because that's also usually noisy and highly influenced by, you know, your experimental
setup. And then finally I think there's also a challenge of that type of bias you introduced by
doing the sort of reference based generation reference-based evaluation. So again, you know, it's
highly depends on the quality of the data set you're using.

</turn>


<turn speaker="Ondřej Dušek" timestamp="47:48">

Great. And I would say yeah there is also a challenge in like reducing the amount of training data
you need, which is yeah, what's the pre-trained language model approaches have been trying to do
while staying accurate, which is still kind of unsolved and also yet trying to be a bit more diverse
and perhaps even adapt to the users. So you know, if you have a dialogue system and the user talks
in a certain way, you want to kind of come closer to them and then talk in a similar way. And this
also hasn't been addressed much. Mostly also because there isn't really a good data sets to try and
work with this.

</turn>


<turn speaker="Matt Gardner" timestamp="48:30">

Yeah, that seems like a really interesting challenge. I remember reading some PhD thesis on this
topic, like how do, how do power relationships affect, like, I forget what the linguistic term is,
where you tend to use the same word like you, you converge on vocabulary over time.

</turn>


<turn speaker="Ondřej Dušek" timestamp="48:47">

I think that entrainment is like an synonym to that. Maybe that one, that one, I don't know,

</turn>


<turn speaker="Matt Gardner" timestamp="48:54">

But yeah. Yeah, there's anyway, there's a really interesting long line of work in this whole area
too. And like how does that apply to dialogue systems? Yeah. There a lot of really interesting
things still to do.

</turn>


<turn speaker="Matt Gardner" timestamp="49:03">

Well, great. This has been really fun. Was, do you have any final thoughts before we conclude or
anything that you really wanted to talk about that we haven't gotten to yet?

</turn>


<turn speaker="Verena Rieser" timestamp="49:12">

I think there's a lot of stuff which actually we sort of thought we could cover within this hour,
but we didn't. Well, thank you for inviting us and it was really good to talk to you.

</turn>


<turn speaker="Ondřej Dušek" timestamp="49:24">

Great. Thank you for coming on. This was really fun.

</turn>


<turn speaker="Ondřej Dušek" timestamp="49:27">

Yeah, thanks for having us. It was really great.

</turn>
