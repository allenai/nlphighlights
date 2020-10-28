---
title: "Evaluation of Text Generation, with Asli Celikyilmaz"
hosts: ["Pradeep Dasigi","Alexis Ross"]
guests: ["Asli Celikyilmaz"]
number: "120"
tags: []
description: "We invited Asli Celikyilmaz for this episode to talk about evaluation of text generation systems. We discussed the challenges in evaluating generated text, and covered human and automated metrics, with a discussion of recent developments in learning metrics. We also talked about some open research questions, including the difficulties in evaluating factual correctness of generated text.

Asli Celikyilmaz is a Principal Researcher at Microsoft Research.

Link to a survey co-authored by Asli on this topic: arxiv.org/abs/2006.14799"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F903728185&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello, and welcome to the NLP highlights podcast, where we talk about interesting work in natural
language processing. The hosts are Matt Gardner and Predeep Dasigi from the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:10">

For today's episode, we wanted to talk about evaluation of text generation using the more recent
natural language generation systems. And as a guest today on this episode, we have Asli Celikyilmaz
from Microsoft research she been a researcher out there, welcome to the podcast Asli.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="00:31">

Thank you, happy to be here.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:32">

Thanks for joining us. We also have as an additional co-host for this episode, Alexis Ross, who is a
predoctoral researcher at AI2 also on the AllenNLP team. Welcome to the podcast Alexis.

</turn>


<turn speaker="Alexis Ross" timestamp="00:45">

Thank you also happy to be here.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:47">

Okay. So let's dive into the topic Asli, can you tell us why natural language generation is hard and
what are the challenges involved in evaluating text generation systems?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="01:00">

Sure. I should thank you for asking this. This is actually a really hard question, but I I'll do my
best. So first of all, I guess we probably should clarify what we mean by NLG here, because there
are different definitions. So here, what we mean is I suppose, is semantically constraint text
generation. So the constraint part is mostly described as the input, which is in probabilistic term,
like the given part. So like the type of semantic constrain might actually depend on the type of the
NLP task. Like, so for instance, if it is image captioning, which is generating one or more
sentences describing a given image, the input would be like the features extracting from that image.
So if the task is to generate talking summaries, then it would be like sequences of words that
provided as input in what happened.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="01:50">

So the reasons why attributing to why NLG evaluation is hard is I would say that today we have these
standardization issues, which I think is very important. So like these automatic metrics are sort of
standardized, like using what we call NLTK natural language toolkit. So these, these are sort of
platforms. And in my opinion, they actually kind of significantly simplified the process of
benchmarking different NLG models for us. However, there's still many NLG tasks that use tasks
specific evaluation metrics that are nonstandard. So frankly, I mean, I do use several of them. So
these task specific metrics are not that easy. For instance, as a young researcher to find details
about like, you need to dig into the literature. So this is happening because different NLG tasks
deal with different goals. Hence these metrics use like they deal with these nonstandard criteria
that I talked about, like for as an example, story generation, which is constrained with a list of
outline points, for instance, which I worked before, it constrained like "Alice was friends with
Tom", if that's given then the generated story is expected to include things like "Alice and Tom" or
things like "the friendship between Alice and Tom."

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="03:18">

So now one can use these n-gram metrics, but you might need to invent like other metrics, which are
so many metrics to evaluate these criteria and it might not be easy to find examples in the
literature to, standardization is one of the things that in my opinion, makes it hard to evaluate
NLG another aspect is that we really don't know what to evaluate the generated text for. I mean, it
also depends on the task, but today we build these fantastic language generators like these GBT3
language models, and then we use these standard evaluation metrics to evaluate these models. Say,
for instance, if the task is summarize we need to know what's really the end user of this tool is
like what the user really cares about in the summary. So in the end, these NLG tasks are actually
designed to help humans to improve their productivity.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="04:18">

So the evaluation metrics should also care about that as well. Not just n-gram counts, except that
they're also useful. There's also other things like issues relating to ethical concerns. So we have
a survey paper on NLG evaluation and in our paper, we talk about the fact that there's still a lack
of systematic methods for evaluating how effectively an NLG system can actually avoid generating
non-ethical or improper or offensive language. In the old days, we didn't have these issues
actually. So we had these template-based NLG systems or slot based systems, which is easy to control
the generated text but these older systems also have issues like diversity or, you know, but they
didn't have this unpredictable behavior problems that current NLG systems have. There's also other
issues like I mentioned, like these neural decoders are not easily controllable. It's actually very
challenging in my opinion, because we don't have the control we had before.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="05:28">

Like with these template-based generation models with this current neural decoding algorithms, as
much as we had before we, I mean, instead we have these really strong decoding algorithms and
sampling algorithms. But if you think about the language that is very rich and full of metaphors and
control over texts, in this context can actually get really hard. So it is still a big challenge
when it comes to pushing neural NLG systems in production. When we consider these ethical or bias
issues that might originate from either training data or the biases that we introduce into these
models. And we talk about these in the paper, but one example is that a chat bot for instance, when
it is deployed, can just answer a yes. Yes could be very, you know, okay answer, but it could also
be offensive given the context. So how do we act it? So these are the things that we do have to, we
don't know how to solve them at this point.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="06:30">

Yeah. Thanks a lot for that overview. That's a lot of challenges. I hope we can cover all those
aspects in this evaluation. Let's try to go over those. So you mentioned that there are many tasks
specific aspects depending on what you're evaluating, but in general, what aspects of text
generation systems will we want to evaluate and are there any other, are there any aspects that are
like generally applicable to all the tasks?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="07:02">

Yup. Yup. Actually I thank you for this question. This is a very good question. I think that there
are genetic characteristics of the texts that humans as humans, we can actually know how to judge by
just reading a few sentences even, not even looking at the entire text. So these are criteria like
the quality. So we have been using quality, for like, since NLG is out, like these are metrics that
look at n-gram matches between like what human generation or the reference output and the model
generated output. Even if it is the template, the perplexity for instance, is another one in
language models, accuracy, these are all quality. Like you can cluster them in terms of quality,
which we know that are very important when building or evaluating these language generation models.
Then we have these other metrics like fluency that comes natural to human to , just by reading,
especially a native speaker to judge if text is fluent or not, but it may not be easy for an
evaluation metric.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="08:08">

Another one is [inaudible], which is also easy for humans, but there's also other things like
semantics where you judge the entire context, like the overall text. So those are things like
cohesion, coherence, which you might be hearing, which deals with the narrative flow of the, of the
text. If like for instance, the paragraph follows the previous one in a logical order. So these
metrics are actually, like I said, non trivial for humans, but ironically, these are not that easy
for a bit automatic metrics. I think that almost all NLG models should actually carry these
characteristics. It will be the ideal case, but there are, I feel like there are other criteria we
missed out and they're coming out in the recent years, especially around these models are considered
to be deployed in real like production environments.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="09:03">

Like for instance, take a bank for instance, using an automated generator system. And they're
generating an email for instance, automatically to send out there like a big cluster of customers
and they will want this generated email to be perfect. Right. I don't know what percentage or how
they measure, but one thing that they would be interested in measuring is this factual consistency
or factual coherence that it does not hallucinate or put a wrong entity in an email or send it to us
some, different name or title. So I think that the most important question here is to, is the
definition of the task. Like what the output characteristics we are looking for in this generator
text and go back and evaluate that text. And the generic ones should always be there, like this
quality and fluency, but other things are mostly coming out these days, depending on the task. In my
opinion, we should be evaluating all these tasks, but it's sometimes costly.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="10:08">

So is that the only barrier, cost are there some metrics that are specific only to certain tasks and
we don't really want to use them for others?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="10:19">

Not really maybe time complexity because some evaluation metrics, like, especially human
evaluations, which I can give more details later might be actually harder to evaluate and it might
require expertise in evaluating.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="10:38">

Right, right. So since you mentioned human evaluation I guess most research that's done in text
generation usually also has a human evaluation, or it almost seems like that's the gold standard for
evaluation. Is it because the idea is that the end consumer generation systems are usually humans is
that idea here?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="11:05">

I think so. I mean, the text generation is for humans and to improve humans productivity. So they're
the end user and the reader would be the humans. So I would say that the best evaluators of that
system would be the human evaluating, right. I mean, all we do with these metrics is to mimic how
humans would find the text or judge it. So I guess that's the end.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="11:34">

Okay. And yeah, so what's a right. I mean, your, survey paper that I recently read mentioned two
kinds of human evaluation, intrinsic and extrinsic, let's talk about the intrinsic evaluations
first. What is the typical setup for how intrinsic evaluation work?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="11:54">

Yeah, before we delve into evaluations, all of them like human evaluation in general is not that
easy to evaluate. We can talk about that later, if need be, we talked about this time-consuming
stuff, what have you but these, we clustered them in, in different settings because they have
different challenges. So like you asked like intrinsic evaluation is one in interesting evelation.
We ask people to evaluate the quality of the generated text, for instance, in an NLG setting. So it
might be required that we show the source types because like assuming that these are semantically
constraints, so there's the source or input text, and it might be that we need to show it for the
human to evaluate the output better. So for instance, machine translation might be one example. So
in this intrinsic evaluation metrics, we have some certain criteria we do use generally. But it
might differ based on some tasks that judges were asked for.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="12:55">

Like for instance, one of them is advocacy, especially it applies to the machine translation task.
It means like how much of the meaning expressed in the reference or human or gold standard, however
you name it is expressed in this target to translation. We also care about in this interesting
evaluations, the fluency aspect of the text, because like I said, for humans, it's actually easier
to evaluate this quality metric, which asks if the language is fluid or not. Coherence is another
one, which I am very interested in. My research is around narrative coherence, not just in NLG, but
other aspects of AI. It deals with how well the generated text fits in, in the entire context. Other
things that we ask in these intrinsic evaluation metrics are factuality, which has been started to
be standard these days. It's just to check if the generated texts is actually adhering to the facts
in the source, or maybe the actual like human output, the human generated output.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="14:02">

So the way these intrinsic evaluation metrics are done is we typically show these judges text or two
texts. Side-By-Side one could be like the reference text and other could be a model generated text.
But in other settings there's been like three way evaluations that humans are actually capable of
performing really well. Like you show, Hey, this is the reference. And these are the two model
outputs. Tell us which one is better performing in the criteria that I mentioned before. So this
way, if there are like N different type of criteria, we'll probably have like N different type of
interesting evaluations, which is very rich. And then you can go back and evaluate how your models
are doing with these experiments. So it actually introduces richness to your evaluation metrics and
you can design it in different ways.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="14:57">

Is the evaluations set up task specific as well. Are there some tasks where say the evaluation is
where, say, pairwise evaluation is more appropriate than a three-way evaluation or something?.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="15:06">

I think so, I would say yes. Okay. So these three ways to do this are more common, but I think that
the model builder like us, researchers, if we are the ones doing these evaluations should also look
into ways to evaluate based on the task. Like for instance, you know, you may be interested in the
fact that some entities must appear, some constraints must appear in the generated output. So you
will probably change the way, maybe you add a Likert scale or maybe a radio button to rank them. But
of course, none of these are, they have a lot of issues, which we can talk if you want, but they
come with a bit of cost sometimes. Yeah.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="15:56">

Ah, okay. Yeah, that makes sense. And I guess I guess more generally, when you talk about pairwise
evaluation, I guess the assumption here is that you're evaluating generated text against the
difference and that's it, but are there, I mean, it seems to me that there are some tasks where you
need additional input. Let's just say, for example, you're doing questions and answering and you're
evaluating generated answers. You probably at least need the question as well as the original input,
right.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="16:29">

Yeah. Yeah. True. Actually just a quick correction. We don't always show our reference to model in
these side by side. We might be interested in measuring the difference between two models that we
build or a difference between a model and a state-of-the-art model. For instance, you could replace
any of those with any model. And, but the judges don't need to know of course. And it's better that
they don't. So I sound bias. Yeah. .

</turn>


<turn speaker="Pradeep Dasigi" timestamp="17:02">

Okay, Yeah. That makes sense. Right. So that's intrinsic evaluation. You also mentioned that there
are cases where an extrinsic evaluation may be preferred or easier to perform. Can you give us an
example?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="17:15">

Absolutely. Yeah. So I've actually been in the setting where we needed to do extrinsic evaluations.
So you don't actually see these evaluations in NLP research publications frequently because they
sort of measure the system's overall quality, these extrinsic evaluations, like for instance,
they're mainly like one of the best examples to extrinsic evaluation is how voice enabled personal
assistants are evaluated. So extrinsic evaluation measured the end-to-end performance. So humans
evaluate the system by interacting with it.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="17:52">

So mostly by trying out different scenarios, then they try to measure how successful the system is.
Like, for instance, if it's a task oriented dialogue system, they judge, if the task has been
fulfilled or not. So in these settings, the criteria used to evaluate these systems are obviously
task dependent, especially for extrinsic evaluations. For instance, like we gave an example from the
dialogue scenario after the human judge interacts with the system at the end, you ask, you get
feedback from the human. And one of these feedbacks is towards obtaining more information about how
the system did like for instance, if the system correctly completed the task, like how many terms,
for instance, for dialogue systems, it is shorter dialogues are better. I mean, for other systems
you don't care. So it's very task specific.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="18:48">

So there's also things like engagement is important in human or maybe chit-chat dialogue. So even
though I think that the best way to evaluate a system is human, but the process can be actually very
lengthy. Like for instance, especially in these days, we work from home. So you want, if you have
these judges, you need to send them the software or the hardware, just so they could try it out.
They might have technical issues, connection issues, and what have you. So you name it. And so it's,
in my opinion, these kind of evaluations, although the best way to evaluate your system before
launching to everyone like your community or the audience or customers still you need to invest in
to get a better performance out of these models.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="19:40">

Yeah. That makes sense.

</turn>


<turn speaker="Alexis Ross" timestamp="19:42">

I have a follow up question to that. Do we have any idea about the correlation between these
intrinsic evaluation metrics and later extrinsic evaluation, like are good evaluation metrics in
this initial intrinsic evaluation is that a good proxy for later evaluation?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="20:06">

Yeah, that's a very good question. And that's what it should be. So, we, I think like when we're
building these systems, especially if it's like an interactive system, like a human dialogue system
or even building any machine learning model, we sort of, you've used this gradient in the sand. Like
we look at our models might converge or stuck in local optima. Like you don't actually have like
your first trial, you don't have the best model. And what you really need to do is to rely on less
costly, not involving like nonhuman evolving evaluation metrics just so that you can actually get a
better performance from your model. So once do, then you can maybe go out and then extrinsic
evaluations might follow if you need one, not all of your NLG tasks need an extrinsic evaluation,
but in terms of trust, like if you are trusting your model with some, not just one, but maybe a
several different automatic evaluation metrics that is suitable to your task, then it might be time
to go out and evaluate the true miss. Maybe a small controlled experiment with humans is a better
way before you launch it to, especially if you're doing extrinsic evaluations would be a better way.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="21:22">

Right? So we talked about how human evaluation is the gold-standard for evaluating text generated
systems. But it seems to me that a big disadvantage is when humans don't agree with each other and
as opposed to automated metrics humans are subjective as to how we deal with this subject.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="21:46">

Yeah. So this is in literature called Inter-Annotator Agreement usually, and maybe we should define
that for the audience. So it's a measure where we have say two annotators and we can, we'd like to
know to what degree they agree with their judgments. So actually it's a matter of like, the question
is why we use this Inter-Annotator Agreement is more important. It is because like you said, there's
a subjectivity in judging about things. There are, like, there are things that are not observable
not clear by looking at the texts, for instance, things like semantics, how do you evaluate deeper
semantics? So because of this, there's this need to evaluate such human subjectivity. So like for
instance, if you are producing human labeled data, interrelated agreements would measure the quality
of the collected data by assessing to what extent the, the humans disagree.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="22:48">

So how do we deal with issues? So that's really the hard question. It's still a little bit of an
expertise goes a long way in this. So the question is more related to gathering quality information
from humans. So there are studies that have that use like human ratings that are like highly subject
to personal and interpretation biases. And this actually in the end yields noisy human labels. So we
really don't want that. So what these annotation, or like these experimentations do is they measure
or increase in order to increase the quality of the collected data. They look into several different
metrics. Like for instance, if like say you have a very low Inter-Annotator Agreement this doesn't
necessarily mean that your models are performing bad or that it might probably be that your design
or annotation design might be, might not be the right way of evaluating the task that you're looking
into.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="23:58">

So changing the labeling experiment, adding maybe novice or more experienced humans and looking into
like, there differences and correlations is one way. Another way is which we mentioned, I think in
the paper is either using rating or ranking. So to humans, it's easier to rank things than rate,
like using the scalar value to maybe you need to change it to a ranking task than a rating task. So
also like we mentioned, comparative tasks, like side by side tasks are easier. So there are other
ways we could probably invest, but like I said, I'm actually not that expert in doing this, but I've
been doing human evaluations for a long time to know these issues. But I always, in my experiments,
you know, consult the experts to especially if the task is, new.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="24:56">

Okay. Yeah, that makes sense. And you made this very good point about how a low Inter-Annotator
Agreement doesn't necessarily mean that the annotators are not doing a good job. It could also be
that your task is not well defined or that your annotation guidelines are not clear enough or things
like that. So that observation do think it's probably not necessarily a good idea to push for higher
Inter-Annotator Agreement all the time and are there other reasons why you don't want to do that.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="25:32">

Yeah. Oh, that's an excellent question. And, I don't know how to answer it, but I'm going to sort of
tell a little bit about my experience. It's actually usually comes in evaluations of a lot of NLP
tasks, not just NLG task, in my opinion, the question is, like if we have obtained several types of
annotations from different experts and the results showed that their annotations highly agree,
should you blindly accept them? Well, I would say this happens when your experiment setting is
perhaps under specified, like for instance, this is, explain this with an example, I guess, like,
for instance, say you have an image captioning model and you've trained it with a lot of data and
you use like transfer learning and adversarial training, and you have a fantastic performing model.
And even your automatic metrics have shown great performance.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="26:28">

So in this scenario, there is this high chance that the humans would probably easily detect that the
baseline is underperforming and the agreement will be really high. This is a very classical case of
under experimentation in human evaluations. So I don't know, maybe another scenario in which human
agreements might be high is when experiments are conducted with non-expert annotators or maybe noisy
labelers, because we use these platforms like you know open platforms and in those settings, any
annotators can join in. So, you know, like I said some expert knowledge in doing how to do human
evaluations is required in these settings when you get these like really high Inter-Annotator
Agreement.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="27:21">

Yeah, yeah, yeah. That makes sense. Thanks. So, right. I mean, that's we talked about human
evaluation. I think it would've been nice to move on to how we can automatically measure performance
of text generations, not involving humans, because we seem to be doing a lot of that lately. Right.
So automatic metrics, like do measures like that, are they all supposed to be proxies for human
evaluation? What exactly is the motivation behind them?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="27:54">

Yeah. this is actually a great question. I think there's potential utility with using both human and
automatic metrics together. So if you think about training your model I mentioned this earlier,
before the model converse to a local optimum and global optimum, what have you we do need to
understand how this model [is] performing. Like we have a way of knowing between like zero and one
compared to other models that we know of this new model is performing. So in that sense, automatic
metrics are very useful. If the model being trained is not converged or underperforming, there's no
point in taking data and asking humans how we did, while we know that it actually doesn't perform
well, right. So in addition to this, I think automated metrics task agnostic or not provide a way to
compare a model to gold output, or maybe two outputs.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="28:56">

So it's like a visual or like in perception you have some sort of an idea that tells you how this
model is doing compared to other models. So they're actually really valuable and important in a
sense also these is this fact that which we discussed about human subjectivity, the challenges in
human evaluations. One might rely on automatic metrics in those cases, if like for instance, your
task is really, really hard and even for human judges, so a little bit of a more clear idea might be
obtained by looking at these human automatic evaluation.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="29:34">

Right. But when we try to assess the quality of these automated metrics, we usually talk about how
well they correlate with human judgement, right, is that true?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="29:45">

Yeah. Yeah. Well, yes, it is true in natural language generation there are these criteria like we
talk about fluency, redundancy, coherence, and overall, what have you. So with these metrics, these
n-gram metrics and their variations that come with these automatic metrics, it's really important
that we use these human evaluations to see if they agree. So if the metric can actually measure it,
these some aspects of the humans we care about beyond n-gram overlap, I would say, this metric is
high quality. So for instance, maybe a metric like METEOR in addition to n-gram similarities
actually looks into some contextual similarity, which in some cases performs much better than n-gram
metrics. So actually this issue becomes more pronounced with language variability issues versus if
the task is like abstractive summarization or even machine translation image, there are different
ways or different verb usages of saying the same thing or same meaning.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="30:53">

So the metric that is focused on an n-gram match between the reference and the model generated text
rather is not suitable for this task. So unless maybe multiple references are used, then you might
get a better out of your metrics, but it doesn't necessarily mean that this metrics are less
quality, but maybe not suitable for the task. So as, model bases, we need to be careful about what
metric we choose and how to evaluate and underlying like intuition about these metrics. Not just
because state-of-the-art models use it or the paper before us used it. We need to know what they
actually really mean when we evaluate, even if they are various standard metrics in my opinion.
There are other metrics like which measure maybe beyond n-gram similarity, or even n-gram
similarity, you can consider like for instance entities, or relation match. These are things that a
automatic metric can actually evaluate, but we go and ask humans to evaluate other things like
fluency or grammaticality. So if you think about it, an entity or like a metric evaluating entity
match a human evaluating on fluency, and you expect the correlation between them while they're
actually looking at different things. So then that says poor experimentation or evolution
experimentation in the sense that we need to be careful about.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="32:16">

Yeah. That's a great point. You mentioned language readability and how some automatic metrics are
not good enough to capture I think going further in that line of thought do you think automatic
metrics that are generally applicable to all languages, or are they more English centric?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="32:42">

They are, in my opinion, more English centric. Most of them, I think the answer is no in this case.
So there's this free I had to look that up actually free order languages. So these languages are
like Slavic languages. Persian is one of them. Turkish is another one, which is my mother tonged
actually. So this is what this means is like this free ordered languages is very similar to how we
do this sort of porosity in English without changing the order. But in those languages, in order to
reflect that porosity, what we do in English, you change the order to change. This is just just for
emphasis. So in these languages, the sentence order or the word order might change, and then it
might actually mean totally different things. So if you have a metric that is very keen on the word
order, then it may not be suitable for these, like free order word order language.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="33:39">

Also it applies to morphologically rich languages, and Turkish is also another one. So these
languages have lots of morphemes. Morphemes are like things like the suffix is that you add to the
words like cat cats, you make that plural English doesn't have as many as morphologically rich
languages do. So like in these languages order of morphemes is very important if you change you
order the meaning changes and like, especially in machine translation, this is more pronounced and
more important. So it's important that researchers working with these languages should also be
careful about what kind of evaluation metric the choose.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="34:17">

Right, yeah, these are challenges that I guess we don't really have great solutions to these
problems yet. But let's talk about a couple of popular evaluation metrics and maybe go over what the
limitations are. BLEU, I guess is probably the most popular metric. And I understand that it's a
position based metric can you explain to us how exactly BLEU works, maybe just give an intuitive
explanation of what it can do.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="34:48">

I think every NLP researcher has used BLEU in their lives in one way or another. So it's always good
to define or give an intuition. So thanks for asking. So BLEU compares like this consecutive
phrases, especially using machine translation. I should say that. And then it finds like consecutive
phrases. It finds in reference and it goes back and tries to find in the reference translation. And
it counts the number of the matches, but then it has this property called brevity penalty. It's like
a weighted measure. What it is it's interested in the length of the generation and especially it
cripples or the generates, like when the generated text is actually a really short, then you get
adverse BLEU scores. So it deals with the fact that if there is a large gap between the length of
the reference sentence and the length of the generated sentence, then the brevity penalty in the
limit would be really small and it will reduce your BLEU score. So in short, BLEU is an n-gram
overlap measure between the candidate and the reference translation with a with weight, which we
call brevity penalty for shorter outputs.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="36:07">

Okay, great. Thanks. That's useful. And it seems like there are many moving parts in this is, or I
guess there could be many moving parts in this. How do you tokenize the text before you use BLEU to
evaluate, or maybe the, you, you mentioned n-gram overlap, I guess, and there is this hyperparameter
for n, or denoted as n, which is the maximum order of the n-grams you're using, and there are many
such differences, right? So, given these, it seems like there is a minimum people say they use BLEU
maybe it's not immediately obvious how exactly they use BLEU. Is it a standard implementation of
BLEU that people use or are there variations there?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="36:54">

Yeah, I would say no. I've seen like we have these several standard implementations like this I
can't remember the other ones, NLTK is another one. There are some standard implementations. I
actually don't know many of those, but because of non-standardization and it just does not happen
just in BLEU, it happens in ROUGE scores as well. We get variations, in our comparisons and, it
might be an advantage or disadvantage to the model builder. So it's a totally different dimension
that we could talk for an hour, I suppose. But I don't think that maybe for BLEU, we have because we
have this, like most of the publications use NLTK and they report that they use NLTK, but anyone can
go and because it's easy to implement an implemented BLEU metric and report that be like, maybe they
use stemming or maybe some other lemmatization and what's have you to syntactically improve their
BLEU score while they're underperforming.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="38:08">

So that's actually an issue, which was not your question, but I'm actually really thinking that this
is a problem that we should be really paying attention to, especially when reporting our results,

</turn>


<turn speaker="Alexis Ross" timestamp="38:22">

One follow up question about the kind of standard setup we were talking earlier about how sometimes
there are multiple ways of paraphrasing or summarizing or translating. So in the typical setup with
these automatic metrics is one reference used or do you use multiple references and get the
automatic metrics using those and then combine them in some way? Or is there enough standard?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="38:44">

Yeah, so I think there are variations. I mean, I could say standard because most people know that if
you use more like in machine translation, if you use additional references, your BLEU score might
improve because you get more out of you know, more matches and then BLEU is over the corpus so you
can improve your BLEU score that way. It depends on the task for machine translation using multiple
references is sort of standard for summarization task. For instance, it may not be that standard or
not that common, like for instance, texts, simplification tasks, would you be using multiple
references? I don't know. You probably need to try out and see which one works better, but most
people in, other than MTN summarization dealing with these NLG tasks, probably using a single
reference to measure and maybe not BLEU, but some other metrics like ROUGE, I suppose.

</turn>


<turn speaker="Alexis Ross" timestamp="39:42">

Got it.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="39:44">

Right. And right. So ROUGE I know that is more commonly used in summarization, but so can you
explain to us how we ROUGE is different from BLEU?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="39:56">

So BLEU like we said, it's precision. So you look at how much the n-grams in the hypothesis, like
this generator text appears in the reference text ROUGE is the other way around. So it measures how
much the n-grams in the reference appeared in the machine generated text. So ROUGE has, so in a
sense, ROUGE looks at recall and BLEU is like precision, but I would argue that BLEU is also sort of
looking at recall because of this brevity penalty, because you're looking at the reference, like it
penalizes the model generated results when they are shorter than reference. So by penalizing brevity
in generated text only reference re-introducing the account on his recall. So nothing is keeping us
from using BLEU or ROUGE in summarization tasks, but ROUGE scores are sort of geared towards
assessing longer attacks, because like for instance, they have this several variants, like ROUGE L,
which is longest common subsequence, which doesn't necessarily look at the consecutive word matches,
but also a longer span of n-gram matches. And these are important, especially if you are interested
in capturing the salient entities in the generated texts. So ROUGE might be a better, I suppose, for
summarization or for some other longer text generation evaluations, then BLEU.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="41:25">

Awesome. Okay. And I guess I could ask the same question that I asked for BLEU here as well. I mean,
given that there are so many variants of ROUGE do you think research papers on summarization are
consistent in how they use ROUGE?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="41:40">

Yes. I mean the most common way to report in summarization, I've been publishing summarization
papers for quite some time to actually say a few things about this is a ROUGE 1 and 2 is most
commonly use because then you'll want to actually compare your models in terms of fluency. But most
commonly, we look at ROUGE-L like this longest common subsequence measure. It mandates that, you
know, it doesn't mandate like BLEU this positive matching, but I want to also add that, okay,
ROUGE-1, ROUGE-2, ROUGE-L there are other variations, like for instance, it does do verb stemming,
software removal and other things you can those could also be reported in the papers, but I would
say that those are not enough we need to, because they're like, especially in summarization with
like longer text generation, we do value other things. Like for instance narrative coherence is
something that I care about ROUGE to a degree, might measure, I suppose, but, not the continuation,
that's this flow of concepts in a text.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="42:50">

So in that case, I feel like it just reporting ROUGE scores is not enough. Today, luckily in NLP
conferences, we do see a human evaluation that comes with any of these summarization or long texts,
any text generation these days, which I'm happy about. Except there are things that I'm not happy
about. Like for instance, the human evolution sections of these papers are really short and they're
not, they're under examined or like we discussed the experimentation, like the human evaluation
experimentation might be under specified. And that could be like other issues that needs to be
evaluated and reported that as readers, as a scientific reporting should be really, we need, again,
we need to spend, or have a subsection for a different type of evaluations other than ROUGE
evaluations for these text generation, especially NLG long text NLG.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="43:48">

Cool. Thanks. Yeah. Talking about the limitations of these metrics, I think is a great segue into
the more recent developments on using learned metrics for tax generation seems like a pretty
exciting research topic. Can you tell us why, can you give us a a summary a brief overview of the
recent development?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="44:11">

Yeah. There's been a lot in the last two, three years, I suppose, that are coming out. I think it's
mostly related to the fact that like these BERT or like these transformer based language models,
language generation or encoding models are doing real well now that we really want to try out if
these actually do well in our evaluation, in the evaluation context, because like we have these
fantastic language models and we are using metrics from two thousands, which mainly focus on word
overlap. So I was like, it's very natural that we do today to focus on these on these model based
now I'd like to mention that they're like issues with training. These is metrics, which we can talk
if you, if need be, but again, with any metric that comes, it comes to cost and we need to deal
with.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="45:05">

Yeah. Right. So I think that's definitely very interesting thing that we could talk about. I mean,
on the surface, it generally seems like I think at least to me, it seems to be a crazy idea, to
train a metric, given that we know that our models have many limitations and we have been talking
about lots of papers published about how models are not learning the things that we want them to
learn, given all these limitations. It seems crazy that we are applying these models to evaluation.
So how exactly do you think are we getting around those issues?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="45:41">

So, like I said these are new issues that we're encountering, and we're recently starting to look
into these issues. So these train evaluation models are trained on datasets collected manually, or
maybe automatically or semiautomatic from web, like the weakly supervise fashion and then they're
trained based on those type of labels. So I think that the biggest limitation of this today, it
might change tomorrow is building these machine learning based models is how to mimic the human way
of evaluating this, right. I mean, we are using just the label, like human input and then the input.
And then we're sort of asking these BERT style or like these very large transformer based models to
figure out the relation between the single input and this dataset, like natural language, dataset.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="46:40">

So while there's this, like, I feel like there's two sides of this coin. Like we know human
evaluation results are noisy. They're like we talk about how subjective they are, especially for
some tasks, it's even hard to get human agreements on them. But on the other side, we have these
really very large models, very efficient models that can actually work on their noise. And we know
how to work with them by adding some adversaries like noise input. So maybe the fact that we would
need a lot of human evaluations might actually solve and might actually help us to go towards this,
into solving like a, getting better evaluation, like trustable models that were reliable models, I
suppose,

</turn>


<turn speaker="Pradeep Dasigi" timestamp="47:26">

I guess model reliability is also a big topic to discuss on its own. You mentioned right. For
example, you mentioned factually correctness a couple of times in our conversation. Do think that we
are closer to evaluating factual correctness for these trained metrics than we were earlier.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="47:49">

I think. So I'm going to actually answer this question with the study that I've done with my interns
over the summer. So what we did is we investigated language generation evaluation metrics. So we
looked at two different problems. One of them was language models. So two ways we evaluated was in
like in current language models is perplexity and downstream task, like, you know, semantic
downstream task performance or something. So none of these are actually that reliable, like you
said, so we investigated different ways of evaluating language models beyond these two metrics, like
beyond perplexity. And one of the things that I looked at was factual correctness. So for instance,
recent work has found that the state-of-the-art language models actually frequently hallucinate
information. So when performing these generation tasks like for instace summarization, it's hard,
even for humans to discern the difference between a model generated and human generated like fake or
real text, which actually is my opinion, very risky.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="48:53">

So frankly, these factual consistency metrics are pretty new to me. I mean, I'm working in language
generation for a long time now and have yet to use these evaluation metrics. I'm a little bit
skeptical. So what I asked my interns is to instead put all these factual consistency metrics that
came out under a microscope and see which one works better in which scenarios in which domains we
looked at a spectrum of domains and we looked at different dimensions, like if they are accurate or
how sensitive these are, for instance. And we came up with meta evaluation, which I can talk about,
we haven't published it, but our findings are we are going to hopefully submit soon are credible.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="49:43">

Okay. That sounds great. Can you please tell us more about it?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="49:47">

Yeah, no, I'm happy to. So so we define good measure, like good factual consistency measure. So we
came up with like this meta evaluation of factual consistencies, because I think that's the biggest
limitation. Like I told you, we don't, I mean, like there are three factual consistency metrics. How
do you know they're actually doing development which one is good? So obviously we don't know. So we
created some sort of guidelines if you will, or meta evaluation, however, we don't even have a name
yet to how one should measure the degree to factual consistency of these metrics. So one of the
things we considered so we considered several dimensions, domains is another one by domain. I mean,
like for instance we take summarization a domain would be like Archive domain, or could be like
meeting summarization domain. They are totally different. How do we use factual consistency in these
domains?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="50:45">

So we defined correctness as one meta evaluation of a factual evaluation metric, like think about a
document factually, correct summary, partially factually correct summary and factually incorrect
summary. So these factually correct. So this metric can actually correctly sort them. So this is one
way of measuring correct sensitivity. We've done a lot of sensitivity analysis, which like for
instance, like two summaries with different levels of factual inconsistencies should be, they should
be reflected in magnitude, right? I mean, you need to by by looking, but this metric should have, it
should tell one is more factually incorrect than the other with this metric. So there should be some
upper bound and lower bound in these factual correctness. And then there's a sensitivity about like
how much factual consistency inconsistencies in the text. And they should be able to measure that
sensitivity, capture the sensitivity.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="51:44">

I think that especially if these systems are going to be used in human applications, we need to
definitely need to be aware of this. So one more thing that I want to add here is that in old days,
BLEU and ROUGE, when they came out you know, this nest and document understanding like it's doc
organizations have organized workshops around investigating, how good these metrics are there like
several papers, if you search how good BLEU is online, you'll probably find thousands. And we, in my
opinion, we need to have these new factual evaluation metrics. We need to have some sort of like,
give it kind of come to the standardization or at these like a deeper evaluation of these metrics
are because they're very important. So that's why we focused on this meta evaluation. And so what I
want to say is that BLEU is coming to use metrics. It's not by chance because it's been investigated
a lot and it's been invested in a lot of resources. So we should do the same for the new one.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="52:46">

That's a great point. Thanks. That's quite fascinating. It really seems like research and evaluation
is quite interesting and important and yeah, so, right. I had a couple more questions, but I think
that we are out of time, so let me ask you just to one or two most important questions that I have
left. What do you think are the outstanding challenges in the field of evaluating next generation
systems and what do you think we should focus on more beyond the ones that you just mentioned?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="53:26">

So, like I mentioned, things that are harder to evaluate for humans will still be hard for our
models in my opinion. So like things like common sense or things like artistic aspects, like for
instance, poetry is really not that easy to evaluate things like engagement in conversations or
engagement in novels human or empathy. So these are the things that are hard and they're going to
say even become harder when we, with these new, large, these powerful language models, generating
poems for us and other things like subjective to humans or topics that you cannot actually get away
from partisan thinking. And there's gonna always gonna be issues with evaluation in these cases.
And, one more thing that I'm these days I'm very interested in is this multi-model environments that
require long horizons and maybe longer conversations between these agents. Things like that is going
to be really challenging to evaluate the performance of the agents were currently doing, evaluating
them based on the task completion, but not looking at like the overall horizon and how they
interacted with user. And did they use the language? Well, things like that is, is in my opinion,
are still challenging.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="54:49">

Great. Yeah. Thanks a lot. This has been a wonderful conversation. Is there anything that you wanted
to talk about that we didn't ask you?

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="54:58">

These are what we talked about. Like the most important parts I think, I think we did well, so this
was good. Thank you so much.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="55:06">

Oh, thanks. I learned a lot from this conversation. This was quite interesting. Thank you.

</turn>


<turn speaker="Alexis Ross" timestamp="55:11">

Thank you.

</turn>


<turn speaker="Asli Celikyilmaz" timestamp="55:11">

Thank you.

</turn>
