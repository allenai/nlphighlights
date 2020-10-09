---
title: "Social NLP, with Diyi Yang"
hosts: ["Matt Gardner","Pradeep Dasigi"]
guests: ["Diyi Yang"]
number: "119"
tags: []
description: "In this episode, Diyi Yang gives us an overview of using NLP models for social applications, including understanding social relationships, processes, roles, and power. As NLP systems are getting used more and more in the real world, they additionally have increasing social impacts that must be studied. We talk about how to get started in this field, what datasets exist and are commonly used, and potential ethical issues. We additionally cover two of Diyi's recent papers, on neutralizing subjective bias in text, and on modeling persuasiveness in text. Diyi Yang is an assistant professor in the School of Interactive Computing at Georgia Tech."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F887154022&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello, and welcome to the NLP highlights podcast, where we talk about interesting work in natural
language processing. The hosts are Matt Gardner and Predeep Dasigi from the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:11">

Okay. So this is episode we focus on social NLP. We'll discuss an overview of the field and we'll
talk about some of the interesting research work in this area we have with us, Diyi Yang, who's done
a lot of exciting work in this field. She is an assistant professor at the school of interactive
computing at Georgia Tech, the podcast Diyi.

</turn>


<turn speaker="Diyi Yang" timestamp="00:29">

Thank you so much. And I'm very happy to be here.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:32">

Yeah. So when we say social NLP, what exactly do we mean by that? Can you give us an overview of
what exactly the research focus here is and what kinds of questions we are interested in when we
discuss Social NLP?

</turn>


<turn speaker="Diyi Yang" timestamp="00:46">

Sure. Yeah, so basically social NLP looks at not only the content of language, but also the social
dimensions of language. So like intuitively like who said it, who said the language to whom and then
for what purpose and in what context, so the field of social NLP is growing a lot at this space. So
many researchers work social NLP use social media data or leverage social science or psychology
theories to model people's social behaviors. So that's pretty much the space. So one interesting
assumption that social NLP try to emphasize is that natural language processing is not only about
the information or the message content itself. So this assumption in itself is it's useful because
it makes it possible for us to model a language. Using some statistical models, but it ignores the
other important half of language.

</turn>


<turn speaker="Diyi Yang" timestamp="01:48">

So this language is used by people. So there are demographics that we need to understand and also by
our interactions, that is the social component. So yeah, I think language happens in interactions,
communications between human human and also between human emotions. So we really need to kind of
introduce these social factor into the process of NLP. And I think this will transform NLP into the
next level. So basically enable some very novel, interesting assets and application, and also
hopefully inspire some equipment software. So in terms of the questions or specific research in this
space, I really like the framework propose that by Michael Halliday systemic functional linguistics
so that a framework provides a very interesting social perspective to kind of locale the
relationship between language and as a function of language in social societies. So many problems
that I'm personally interested in about social NLP can be categorized under this framework so that
the first mega category is what do we call interpersonal semantics?

</turn>


<turn speaker="Diyi Yang" timestamp="03:03">

So basically it will locate a whole language review, interpersonal relations or social relations or
language enable us to cooperate, form bonds, negotiate, persuade, or ask of things. So this will
involve some empirical research like pragmatics. And it's more about the social meaning of language
and the emotional opinion arguments that makes this course, et cetera. So that's the first category.
The second category actually moves to a higher level is a look at the context of the social process
in which we use our language. And then we call it ideation of semantics. So basically we pay more
attention to how we use language in the real world and understand the whole language, use review our
social role influence, power dynamics, even like the group of structure in the social department.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="04:02">

Great. Yeah. Thanks. That's a great overview. You mentioned that there's a lot of recent work in
social NLP. Is it because we have a lot more data to process or are there other reasons?

</turn>


<turn speaker="Diyi Yang" timestamp="04:17">

Yes, I think the internet and then the web provides a unique moment and the position for us to study
the dynamics between social dimensions and also the continent dimensions of NLP. So like we all know
that the interaction between the human human, the human emotions are growing like exponentially
these days. And so the introduction of type social web, all sorts of stuff. And as you may see, like
from my just like the overview part, there are these kind of inner wiring, the relation between
language social linguistics. So it's a very exciting interdisciplinary field though. So we have more
work at these days. Another perspective that I think is that people start to think about how to make
our technology right. So we have seen greater success from NLP many standard tasks with very good
performance, and even like industry application such as a personal assistant or machine
translations.

</turn>


<turn speaker="Diyi Yang" timestamp="05:24">

But then we also pay attention to somethings that we largely ignored in the past. So the limitations
of not incorporating social aspects kind of limited the functionality or growth of those
applications for them, there are research showing that there are biases in toxicity detection models
towards specific populations. When we use our machine translation systems, they may generate a
culturally impolite or not a respectful outputs. So, or if you look at some of the new tasks, we
defined that these days, such as the common sense reasoning in social context, we all see like a
relatively limited performance compared to like very standardized whole purpose or task. So
basically I think since we are trying to build the systems that can communicate a naturally and
interactively with human, but we kinda need to study the social dimension of language technology.
And I think maybe that's part of the reason why we see more work these days.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="06:31">

Would it be fair to paraphrase? What you just said as NLP is starting to actually work in practice
in some scenarios. And so we have to think carefully about what it means that people are actually
using these systems.

</turn>


<turn speaker="Diyi Yang" timestamp="06:45">

Yeah. I think that's a great paraphrase. So like because we, have achieved the very good performance
centralize the corpora benchmark dataset. So when we try to, like they put NLP systems into
practice, there are so much human side or social side of that that we need to be aware of. So I
think that this is a great opportunity, especially for our research in the academic world.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="07:11">

Great, thanks. Right. So that's I think, I mean, you've covered a lot of interesting details about
this field. Let's talk about some specific examples. What kinds of social linguistic aspects do
people study when they look at speech, right. I mean, I've heard of problems like studying framing
or argumentation. Can you give more examples there?

</turn>


<turn speaker="Diyi Yang" timestamp="07:36">

Sure. Yeah. So again, I think this social NLP is interdisciplinary field, as I just mentioned. So
there are many interviewing like relations between language, social linguistics. So I think
intuitively we can kind of categorize it into several levels. So from a individual, if we just look
at a person perspective, I think of people in this field of study language and identity such as like
whether attacks is written by a specific identity or population inferring demographic attributes
from language. So politeness, humor, persuasion, even language accommodation kind of happen out of
this individual relation perspective. So you will also see some work from Cristian at Cornell; he
has written a lot of research on studying politeness in language, and then Yulia [Tsvetkov] and
David [Jurgens] they have a really nice work of inferring people's attributes from their social
media posts. So those are all about the individual level modeling of social NLP.

</turn>


<turn speaker="Diyi Yang" timestamp="08:42">

So from a relatively higher level, like a group or community perspective. So we start to look at
like a social role of revealed in our language, and then the dialyze features or some like community
specific language signatures. There is a very interesting work from Brendan O'Connor from UMass
studying the sports community, and then the language use in that specific community. So that's a
group level. From a broader, like a society perspective I think that they're in the space of social
NLP, people study like language change, social influence, and even like language and social
movements. So for instance, Jacob Eisenstein's work on language variation and the change provides a
very nice view of the type of societal level social.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="09:36">

Great. Thanks. Let's say I want to start working on endless feed, and I don't know much about this
feature. What kinds of datasets are available to me and how do I get started?

</turn>


<turn speaker="Diyi Yang" timestamp="09:48">

Yeah. So this is a very interesting question. So very NLP type of question, because when we think
about like a classic NLP we study like a benchmark Corpora, like a standardized at task. So when it
comes to a social NLP, we actually do not have many such benchmark datasets. I mean, the task of
social phenomenon that people are interested in may be very subtle, like brand new very different,
right? There are some kind of recent effort of creating datasets for social contexts, such as the
social IQA. So in terms of the dataset, so a Twitter and the raw data have been widely used by the
community to study social NLP. So of course you have a lot of data there. And then for users, you
may have some of the interesting, like demographics that you can use.

</turn>


<turn speaker="Diyi Yang" timestamp="10:38">

Other corpus include the, like a Yelp and the Wikipedia. So I really like, Wikipedia and I think it
shows the beautiful and the positive side of human online participation compared to other negative
biases or attacks that we see on the web. So Wiki is a very rich context, not only English, but also
in other 200 language versions. And it's not only about the millions of articles we see on the
surface, but also millions of editors will volunteer to edit to the articles together. And then they
will also make a decisions about whether to keep an article or not, or whether an editor should be
promoted to an administrator role, or whether the decision process is fair or something. So
basically I think it has a really nice ecosystems to study many social aspects. Another paradigm of
data in social NLP is to kind of have connections or collaborations with organizations and the
companies.

</turn>


<turn speaker="Diyi Yang" timestamp="11:47">

So for example, like in one of the persuasion work with data, we actually collaborate with a peer-
to-peer lending platform called kiva.org. And then when we studied like a social support in
language, we collaborate with American Cancer Society to get some public data about the people's
health communications. So other researchers, they start to pattern our ways, let's see prices, text
line to understand online therapy conversation. So in those cases, I think that data is really a
large scale and then contents rich information with ground data labels.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="12:25">

So if I'm someone just getting started in this area, especially if I think, Oh, Hey, this, this
dataset might be interesting to build, no one's done this yet. This seems fraught with potential
ethical issues. And I wonder if you have any guidelines or pointers or something people that are
starting in this area should think about in terms of like the ethics of social NLP.

</turn>


<turn speaker="Diyi Yang" timestamp="12:48">

Yes. I think that's an excellent question. So in terms of the ethical part of the dataset, so I
think we have, and I think that the community has paid attention to this issue. So for example, like
there are certain type of guidelines that we should take into account when thinking about this
problem. So for example, when you ask the annotators to work on labeling like speech or bias that
counted, so is this an ethical process? We need to guarantee neither people in this process and not
an negatively affected by your NLP task, right? So that's from the data acquisition process. And
then in terms of users, like we are using users data, how to deal with the personal identifiable
information in the text, and then people's Twitter handles or sorts of things. And another very
interesting case I've been thinking about is that sometimes we just quote somebody's posts, Twitter
posts or whatever in our paper publicly.

</turn>


<turn speaker="Diyi Yang" timestamp="13:53">

So those information are all publicly available. Basically, if you search at a specific message
using the internet, you will get to know the user's information. So a good practice that we have
been taken in these days is to paraphrase each specific example that we use in our paper to protect
the original user's identity. So although the data is already like kind of a normalized, but like
still, I think a lot of the considerations should be put into the ethical part. So this is like some
generic person. So when it comes to a specific problem or task, especially, let's say people are
trying to identify depression from text, right? So in this case, there are all sorts of issues that
we need to think about. So protecting user's identity, whether we are making like fair and
responsible predictions from the text, those are all things that we need to take care of.

</turn>


<turn speaker="Diyi Yang" timestamp="14:54">

I think there is a very interesting trend especially in the last two years in the NLP community is I
started to see more and more people putting an ethical consideration paragraph in their paper to
talk about what specific consideration they have taken. What are some of the steps they've taken to
do this and another thing widely used in HCI by the start to gets attention. It's the ARB review
process. So especially for universities, I think you can go through this ARB process to have an
expert committee to help you look at your proposed research, and then discuss both the positive and
negative implications that might rise from your research. So those are all I think key issues.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="15:47">

Going back to the data sources that you were talking about, one of the sources you mentioned was we
Wikipedia, and you said that it's available and you pointed out that it's available in multiple
languages. Is that generally true about other kinds of datasets as well? And have people look at
social NLP related problems in languages beyond English?

</turn>


<turn speaker="Diyi Yang" timestamp="16:07">

Yeah, again, I asked the question. So my answer is that it's a social NLP is starting to be more
international. So again, these days we see many recent papers studying multi-lingo, social
phenomenon. So for example, my colleague at Georgia Tech studying like mental health communities. So
they look at the linguistic markers of depression and that people express in their language. And
then they have very interesting cultural related insets. So for example, when they look at how
people self disclose their mental health concerns in language, they found that people from the
majority word countries, such as India and the South Africa, people are less likely to express
negative emotions in their language compared to those from Western countries, such as United States
or UK. And then also a recent study, also looking at the mental health and the language from that
Chinese individuals are generally less likely to express distress or mental health issues and often
attribute such distress to some external events or something like a physical causes because of the
stigma towards this. So I can imagine many interesting findings may exist. So when it comes to
persuasion, when it comes to politeness or even like a humor, so those are all like culturally
heavily related phenomenon. So I think in this case for social NLP, the unique challenge is not only
about the multi-lingual measures or models, but also about interpreting those culturally grounded
results and the finding. So I agree. And also I think that social NLP needs to look beyond the
English and also pay more attention to different populations and the groups,

</turn>


<turn speaker="Matt Gardner" timestamp="18:07">

This is, this is maybe getting a little bit ahead of ourselves or something that you're not as
familiar with. But when I hear you say that, like make conclusions about like people from China,
having particular ways of expressing themselves, if you make those conclusions using NLP systems, I
think, wait a minute, are we, are we certain that our NLP systems actually like, like, is this
something that's due is the difference that we see due to the actual, real cultural difference or
due to the NLP tools that we're using to try to find that difference? Like, how do you deal with
these issues?

</turn>


<turn speaker="Diyi Yang" timestamp="18:37">

That's, that's, that's why a social NLP is challenging, right? So there are so many confounding
factors when it comes to how we interpret a result that we get. So all factors are possible in this
space. It's possible that maybe you are doing less accurate NLP to a software there. So that's why
you see some kind of difference when we compare English text versus Chinese or other language
versions here. And also it's possible that the culture may play a role there. So I think that's why
social NLP is really difficult and challenging to work on. It also suggest another dimension here is
that we need more collaborations. We need more accurate a tools so that we do not need to worry
about, Oh, this is because the software is not accurate. So that's one part that I think this field
is truly interdisciplinary and we need help and advances in each component of this research process.
And also these days, I think like, as a causal inference starts to play its role here, because we
have a lot of issues. Like what you just pointed out, we need to better understand what triggers are
related to this specific finding. So again like a new field with many open ended and challenging
questions.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="19:57">

So when you talk about different kinds of research problems that people have looked at related to
social NLP recently, it seems like a typical research pipeline here is that you start off with some
questions related to social sciences and you seek to answer by collecting data that would give you
some insights into that specific social attribute or social patterns. And you try to apply a matrix
to it. So can you tell me a bit more about where do these questions usually come from? Who asks
these questions?

</turn>


<turn speaker="Diyi Yang" timestamp="20:36">

Yeah. Great. So I think it's like again, kind of multiple dimensions in your question. So who asks
these questions? Well, researcher asks those questions because those questions are needed to be
resolved, and the users need answers for these type of questions and we need to fully understand
this when we build NLP applications that it can be used for real world benefits. So a lot of the
cases, I think that you are correct, like we begin with a specific phenomenon. So it's a very
important in our field, such as we look at the persuasion or we look at a bias, we look at a
negotiation, or we look at a social role. So in this case, of course it's an interdisciplinary field
and the many people, many scholars in other fields have already taking a look at this kind of
research.

</turn>


<turn speaker="Diyi Yang" timestamp="21:29">

So we try to build upon their work and also introduce the computational power that we can have from
the NLP field. So basically so far, most of the work is building upon some of the social science or
psychology insights, and then leveraging the powerful NLP algorithms to enable us to have some large
scale understandings of the phenomenon. So I think that this process actually can be a very
interesting loop. So if you think about social versus NLP. So I think social could introduce very
interesting problems, very ground data theories for NLP and a sometimes it could inspire the design
or development of new algorithms in the other direction I think NLP can provide a, like a measures,
or rigorous measures, and enable us to do this large scale interpretation. Sometimes it may
validate, or even like disprove some of the true findings in the social status. So it's kind of a
very interesting.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="22:38">

Cool. So let's talk about some of your recent work and go into some of the details, and I'd like to
understand the specific details of two of your recent books. Firstly, I want you to talk about your
paper, your AAA, a paper from this year on Automatically Neutralizing Subjective Bias in Text. Can
you tell us what kinds of subject bias you looked at and can you give us some examples there?

</turn>


<turn speaker="Diyi Yang" timestamp="23:01">

Sure. So, this work is about neutralizing subjective bias, and it's in close collaboration with
Stanford University and also Kyoto University in Japan, lead by Reid Pryzant a PhD students at
Stanford. So we mainly look at a framing bias. So here framing bias refers to using subjective
language sometimes with presupposition and then talking about opinions as facts, or using very
judgmental language. So to give some examples here, one example we have in our paper is a programmer
always starts his career in a big tech company. So in this case, it's a general statement and it
assumed that programmers, should be male, however, a neutral or a fair statement should be
programmers always start their careers in big-tech companies. So in this case, the course of the
introduction of presupposition, of the demographic attributes of people, we end up with bias,
subjectivity bias statement.

</turn>


<turn speaker="Diyi Yang" timestamp="24:19">

Another example we may hear a lot from news and especially like headlines. Sometimes they want to
catch your attention is “John McCain exposed as an unprincipled politician” versus "John McCain
described as an unprincipled politician." So in this case, the difference is the word exposed versus
the word described. So the verb exposed is an active verb which presuppose that the truth of the
accompaniment their while a non-biased sentence would use of verb, such as "described" so that we do
not presuppose the subjective opinion of the writer. So there is no bias from the writer or the
author that we have in our interpretation of the sentence. So framing bias is very subtle as you may
observe. And even for people, I think that we may not be able to recognize them or the difference
between them as a first glance. So that's why we think that we should do a computational models.
Maybe models can do a better job than us.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="25:33">

And, where do you get this data from?

</turn>


<turn speaker="Diyi Yang" timestamp="25:37">

Oh yeah. So Wikipedia. So Wiki is a very interesting ecosystems as I emphasize a lot throughout our
conversation. So on Wikipedia, there is this interesting policy called neutral point of view,
because we want to make a Wikipedia article like a encyclopedia neutral and the factual. So that's a
lot of people can refer to it, right? So this neutral point of view policy basically says that all
content on Wikipedia must be written in a neutral point of view. That is it must represent like a
fairly proportionally, without editorial bias. So there are a set of like a sub principles defined
like a, how to avoid stating opinions as facts or how to not use judgmental language. So there are
detailed breakdowns. So we look at a whole editors added articles. So basically when I'd see {name],
the editor come to Wikipedia and then they observe that at some other editors, just insert a bias
statement.

</turn>


<turn speaker="Diyi Yang" timestamp="26:46">

So they will make the change and then critical assessment receives this edit. So in that case, you
will have two versions before and after, and then another thing that the editor's very good practice
is that editors submit a comment in their comments that they will say that I made this change
because it violates the neutral point of view, or I make this edit to remove point of view. So
that's where we get our ground truth labels. So basically we use the regular expressions to parse
the comment that editors wrote, and they use that to retrieve the before and the, after in this
case, we will be able to get a parallel corpus here. So the, before it's a bias statement and then
the after is a relatively neutral version of that. So we look at the English Wikipedia and the
corpus would end up with has like 18 thousand parallel sentences. So it's a pretty large corpus.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="27:52">

Do Wikipedia editors tend to agree with each other about whether or not something is neutral because
subjective bias seems like it's subjective, right.

</turn>


<turn speaker="Diyi Yang" timestamp="28:02">

Yes, yes, it is subjective. So as I mentioned, so there is a policy page about how to interpret
neutral point of view policy. So there are multiple break it downs of what the cases it is like a
subjective bias. And in what cases it is not so, and also another, like interesting thing we found
that like we handed a dataset a construction process is. So if we look at the tenure or the
experience level of different editors, and then to see, because this is like a very subtle and
sometimes complicated to recognize that. So we look at who is doing this type of neutral point of
view edits. And it turns out to be like people with a lot of expertise. So this kind of suggest that
a we could like trust the comments that they put there because they stay in the community longer,
they have a lot of experience dealing with this, and then they well understand that the policy. So
that's one kind of story behind this thing. The other is that if this is, if this edit turns out not
to be correct, then there will also be discussions behind the each Wikipedia page where people talk
about like hey why I made this edit and then why it is for neutral point of view. So it's a
volunteer based community. And it's so interesting and a fantastic that to, they have a well
documented policy for a neutral point of view.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="29:34">

Yeah, it does sound like Wikipedia is indeed an exciting source for these kinds of data. Yeah. I
have not really thought much about what actually happens behind the scenes. We usually only mostly
process Wikipedia pages or the final outputs, but it's great to know about this process that's
happening behind the scenes. Okay. So coming back to your actual task of de-biasing or removing
subjective biases in texts, what exactly is the problem description here? You're given a sentence
with subjective to bias and what do you do with it?

</turn>


<turn speaker="Diyi Yang" timestamp="30:09">

Yep. So the task here is actually a form of text generation. So as the dataset itself, so we have
the before and after. So the input here is like bias statement and then the output here is
neutralized text. Then the modeling task that we have is to generate this neutralized attacks given
this bias, the sentences, doing this parallel corpus, we have collected. So that's the problem
statement in terms of the actual method that we use. We use the sequence-to-sequence in encoder-
decoder framework as the base architecture. And we also designed a set of task specific components
to further improve the model. So for example, like in the paper, we actually talk about the two
types of algorithms. The first one is what we call a modular network. So it tries to simulate all
human reader bias statements.

</turn>


<turn speaker="Diyi Yang" timestamp="31:11">

So inspired by that we are first the used BERT to base the classifier to fined which word in this
sentence might be bias or not given the context. And then we can join this prediction of over
different tokens together with the encoder representation, to generate to the new sentence, that's
what we call the modular algorithm. So you can see that in this process, we will be able to
visualize which word might not be bias. So this is a very controllable model. So the other type of
modal we did is just like an end-to-end framework. So we didn't. So interestingly like we didn't
find out which model is better. So is they actually performed equally better? The nuances there is
that we found that this type of end-to-end models without looking at which word might be bias or
not, they can generate a more fluent language and then also they can preserve the meaning of the
sentence well.

</turn>


<turn speaker="Diyi Yang" timestamp="32:13">

But our type of modular network, they can reduce the bias to the maximum degree compared to the end-
to-end fashion. So another interesting model trick that we did here is that if you think about it,
the neutralization process, the new sentence needs to have similar semantical content and meaning as
the original one, but less subjective and then more neutral. So to kind of capture these nuances we
introduced the modify the loss function here to reward the generation or introduction of new words.
Since in most of the cases, only a few words have changed the generated text while the rest of them
are the same. So models tended to just output the exact same output so the modified the loss
function we introduced is very helpful to do that

</turn>


<turn speaker="Matt Gardner" timestamp="33:08">

Quick clarifying question here, is it part of the task to detect whether there is bias or are you
always assuming that you get a subjectively biased statement as input?

</turn>


<turn speaker="Diyi Yang" timestamp="33:19">

Yes. So of course we constructed the corpus because we need to see like the editor change the bias
statement into neutral. So that assumes, that the given texts is biased already, so that's one of
the assumption for this specific of work.

</turn>


<turn speaker="Matt Gardner" timestamp="33:36">

So you couldn't then just like take this and run it on all of, all of the news articles from some
particular website that is your favorite news outlet, because some of the statements might be
unbiased and then it wouldn't behave as you expect.

</turn>


<turn speaker="Diyi Yang" timestamp="33:49">

That's a great question. So that's also our ongoing work. So this specific work as an initial
effort, we make the bias sentence to a neutralized sentence. So some of the ongoing work, we are
trying to see like giving any random statement from Wikipedia article. Can we identify whether it is
bias or not? Because it's like a preprocessing for our current systems. And we found that the
initial accuracy, we get whether a statement is biased or not is actually around the 70%. So yeah, I
think in the end we would expect a systems to do every thing. Using one universal system that is;
detecting whether a statement is biased or not and then if yes, use this type of neutralization
framework to neutralize it, and you can also imagine that people could build just like one single
system that does this in a joint fashion. So that's also our ongoing work at the moment.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="34:55">

Great, thanks. So I wanted to ask about evaluation, actually both for identifying subjective bias
and also for de-biasing biased statements, it seems like, especially for de-biasing, in your paper
it is hard to have ground truths here, there isn't one single thing to de-biasing a sentence. So how
exactly do you evaluate?

</turn>


<turn speaker="Diyi Yang" timestamp="35:21">

Yeah. So first I think we can do it in an automatical way. There are also human evaluation. I will
share in a few minutes. So in terms of the automatic measures since this is treated as a standard
generation task, right. And then we have the ground truths from editors about how to make the
change. So we can just measure the distance or the errors that are model did compared to these
ground truths. So from this perspective, we use the widely used the BLEU, and then we also have the
accuracy measure here that has whether it corrects the sentence accurately as the ground truths, but
that's just a zero or one for a sentence. So that's the accuracy measure. So those are the two
automatic measures. And then we rely on human, expert annotation in the dataset creation process.

</turn>


<turn speaker="Diyi Yang" timestamp="36:14">

In another case, we also introduce like a three human evaluation metrics here the first one is
whether the meaning of the two sentences are preserved because we want data to be neutral, but we do
not want to change the meaning there. And then we also measure the fluency of the generation. And
the most important measure here is whether a given sentence is less bias or more bias. So with the
design or careful for tasks on Amazon Mechanical Turk, because as we all know that the subjective
bias here is subtle and then people may not recognize that in that case annotators may not be
qualified to work on our annotation. So to do that we design a qualification training test. So
basically we provided the background of what is neutral point of view, policy on Wikipedia. And then
we give examples. We also provide a, let's say five, like pass the questions. So we know whether a
sentence is biased or not and the which word. And then we ask annotators to pick them out. So only
people who did very well in the training can work on the actual evaluation part. So that's how we
guaranteed that we could get a fair assessment of the model performance.

</turn>


<turn speaker="Matt Gardner" timestamp="37:34">

So you said it there that you want the meaning of the sentence before and after to be the same,
except this seems inherently in conflict with removing the subjective bias, which is part like you
want to take a sentence, but remove a piece of the meaning. And so this seems hard to define in
terms of an evaluation metric, because at one point you want some of the meaning to be the same, but
you want a particular aspect of the meaning to be different. Like that's the whole point of the
model. So like, how do you wrap your head around what is meaning and like what you're supposed to
change here?

</turn>


<turn speaker="Diyi Yang" timestamp="38:10">

Great question. So I think what is meaning, that in itself is a very interesting question. So we did
think about this, and whenever we talk about the neutralization and then the meaning, they seem to
be somehow confounded, right? So from our perspective, like the bias, the subjective bias, a neutral
point of view is more like a style maybe is not a very accurate word, but it's more like a style
when we ask people to check whether it preserves the meaning. We try to be very specific, like for
example, like it did not change some of the key information. Information is also an interesting word
here. It did not change some of the key entities or relations or like facts there. So that's what we
mean by preserving. So the bias on like the neutral point of view is something we view more like a
style. So that's like a careful steps we did in the actual evaluation process. I think this is a
great question in general. So especially these days when we work on very stylistic text generation.
So we use fluency, we use meaning preserving, we may use some other style related measures. So this
is a generic issue that I think we face right now with human evaluation part. And I think future
work could do more as a providing, let's say maybe a universal template for researchers to better
evaluate their assistance.

</turn>


<turn speaker="Matt Gardner" timestamp="39:46">

Right? Yeah. I guess we have different words in a language because they mean at least slightly
different things. And so it's interesting to think about, like, there are pragmatics involved that
are indeed changed when you change these things and linguistics, I guess that has a little bit of
this probably more than I'm aware of. And, but I don't think we talk about this as much as we
probably should in NLP, like we throw around these like meaning preserving words without really
thinking about actually what, what does that mean? Yeah. Interesting. Thanks.

</turn>


<turn speaker="Diyi Yang" timestamp="40:20">

Yeah. We have an ongoing collaboration with the University of Virginia like a careful understanding
of the human annotation process. So we hope that that work could provide us some insights into this
process. So think about that for the same task. If you use different framing in your evaluation text
snippets would that give you the same or different evaluation results? So stay tuned for the
results!

</turn>


<turn speaker="Pradeep Dasigi" timestamp="41:02">

So, you talked about how you model this problem and how you evaluate the models performance. In
general what were the take aways from modeling this task and what aspects of tasks were difficult to
model and what would you change about this model.

</turn>


<turn speaker="Diyi Yang" timestamp="41:10">

So, one interesting aspect we found the, from this process is that maybe this is true, like NLP
models and our models tended to do very well in generating fluent text. So is that the texts that we
produce are grammatically correct. And then when we look at the error analysis, we found that maybe
it's due to the subtilty or the complexity of language, understanding required a full bias
centralization. We find more errors when it comes to the actual picking the bias word for like
adjusting the appropriate word to replace that. So a closer look at that is that we found that when
the tested data points involve replacing some factive or assertive verbs, that's more of an issue.
And another kind of shortcut that our models tended to make is it has a tendency to simply remove
words instead of finding a good replacement, because that's easier, especially for other verbs
adjectives.

</turn>


<turn speaker="Diyi Yang" timestamp="42:18">

One simple fix is just to remove that and the model is doing that a lot of the times, and I think
that this problem in itself is very hard. And in this initial effort, we look at the single word
change. So for bias neutralization, so we can think about the multi-word change or the multi-lingual
setting, or even like a cross sentence bias like would be very cool future work to model another
aspect that I think we haven't taken into account but we should is to incorporate the aspect of fact
checking. Because if we want to know whether a presupposition is correct is true, or if it's not, we
need to model that apart. And that requires us a more sophisticated systems designed for this work.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="43:13">

Cool. Thanks. We do not have a lot of time left, but I really wanted to go over your work on
modeling persuasiveness as well, because I think it's pretty exciting. Can you give us a brief
overview of that work from your NACL of 2019 paper?

</turn>


<turn speaker="Diyi Yang" timestamp="43:27">

Sure, yeah. So that's more like a upstate part of this bias work. So if you think about a bias as
removing some, unwanted framing, this persuasion work is like, okay, for some good purpose, can we
help people write a more persuasive request? And then can we quantify the degree of persuasiveness
there? I think in that work, we care more about what a specific persuasion strategies are used in a
message. So persuasion is a widely studied concept in psychology. And then, so as I think that
Daniel Kahneman said in his Nobel prize, winning book, so when people are looking at a request or
information, there are two systems going on in our minds. The first system one is fast and
emotional. So we rate our own very superficial cues in the context to make decisions for them. But
if people emphasize like, Oh, only a few left, then you think of that, Oh, this must be very good
because people are like getting it all the time.

</turn>


<turn speaker="Diyi Yang" timestamp="44:29">

And then system two in contrast is slower and then more deliberative, more logic. So people will
carefully evaluate the request and then ask questions like, Oh, are those facts correct, or are
those concurrants warranted. So our work is inspired by this and also the new information processing
theory in psychology, basically it's another version of the same framework break it down here so we
can borrow this new information process theory from psychology and then translated them into some
sense that we can, or we encounter in language. So for an some interesting categories are scarcity.
So if I talk about like, please take action this loan is going to expire in 15 minutes or that's
scarcity, right? So it kind of creates this urgency and then tell you that you value this item more
when it becomes rare or urgent.

</turn>


<turn speaker="Diyi Yang" timestamp="45:25">

Another interesting thing is identity. So if I want to convince you, I will emphasize the
commonalities between the speaker and the audience. So, Oh, we are all located in Seattle and the so
we can talk about something in Seattle versus in Atlanta, or there are like emotional aspects. You
can emphasize in your language. So there are many like a theoretical inspired precision strategies
that we introduced in this work. So the goal of this work is to see how could we build a
computational model to identify different precision strategies that people use at a sentence level.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="46:05">

You mentioned some data from computer sciences. And are there any additional theories from social
sciences that you relied on as well? Things like scarcity and identity do these actually come from
some theory in social sciences.

</turn>


<turn speaker="Diyi Yang" timestamp="46:20">

Yes. There is a framework called social influence and then basically it introduced different tactics
that we use in language. So scarcity, concreteness, identity, there are also like reciprocity. So
you do me a favor this time, and then I will return it to you in the future. So basically if I want
to convince others, I could see that, Oh, I'm sure I will give you the back to the community by
doing blah, blah, blah. So that that's all sort of substance that the social science has studied a
lot. And then when that, the way data is to transform those very interesting tactics, and then see
how that reflected in language.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="47:03">

And what was your data source for this task?

</turn>


<turn speaker="Diyi Yang" timestamp="47:06">

Yeah. So we collaborate with kiva.org, which is a largest peer-to-peer lending platform in the
United States. So it's environmental where borrowers usually from developing countries and they,
they post their request online. And then there will be community advocators who will further
advocate request in the discussion board to get more people attention, whereas those loans. So we
actually analyze those advocacy requests. So for each advocacy request that we know how many people,
this message reach out to, and then among them, how many people take actions to lend. So this will
give us some kind of overall global level of persuasiveness. So when we have like around 42,000,
actual requests, and then 400-500 of them, we work with annotators on Amazon Mechanical Turk to
annotate each request and the persuasion strategies people use at each sentence level that is for
each specific sentence, what the specific precision strategies did they use. So that's the overview
of the dataset.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="48:22">

So the indicator of persuasiveness in this task is how many people essentially gave money or
something.

</turn>


<turn speaker="Diyi Yang" timestamp="48:32">

Yes, yes. So that's a very strong indicator because you could read the message and you think the
message is cool, but like, what really matters is that you take actions to respond to the request so
that's the overall persuasiveness measure of our data, which I think it's a very strong indicator.
Another dataset that we use for generalization here is also very interesting. So it's from raw data,
how the random acts of pizza. So basically the, community members can write a request to ask a full
of free piece of pizza. And then the only thing they provide it's like a text message saying
something like why I need a pizza why you should give me a pizza and then communicating other
community members will read this request and determine whether they will give, and then there is a
bot thats monitor this process. So that's a, once the requester received a pizza there will be some
indications. So we also used this data to test the persuasion strategies that we use.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="49:33">

And did you find good ways of getting more pizza?

</turn>


<turn speaker="Diyi Yang" timestamp="49:37">

That's not ethical to use computational models to get us some real world benefits. Right.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="49:45">

Okay got it, I'll keep that in mind. Okay, great. Thanks. yeah. We are short on time, but I am glad
we went over the interesting details of both these papers. And before we end this conversation I
also wanted to ask about some of the other exciting things that you're working on and what general
direction you are headed in.

</turn>


<turn speaker="Diyi Yang" timestamp="50:10">

Yeah, sure. So I think as I, I truly believe this, that we are in a very unique moment and a
position to study social NLP and the, there are so much like a data alternatives and the phenomena
we can observe from the web. So thing that I'm personally excited about this direction is about
first is to build some like algorithms for those what I call socially low resource text. As you can
see, either for the bias or for the persuasion, we always go through this process of, there is a new
social phenomenon, and we are going to collect data. We are going to build a model and then we are
going to interpret the findings, right? So it's sometimes in order to build the models or have
reasonable accuracy you need to have a pretty large corpus, especially those are very subtle, like
social phenomenon.

</turn>


<turn speaker="Diyi Yang" timestamp="51:05">

So one thing we are trying to do is that whether we could build measures to speed up this process
and also to kind of computationally scientifically model social phenomenon. So we need a better like
a semi-supervised or even, unsupervised measures for these socially low resource task. So right now,
my group is working towards building those measures or learning with limited or small data for what
I call socially low-resource tasks. So one of our recent works at ACL look at how to propose a new,
like a semi-supervised text classification framework. So elaborate, recent advances in argumentation
and the self training. So basically the idea is to create a large amount of argumentative training
data points by, interpreting texts in the hidden space. So that's one direction we want to like push
forward.

</turn>


<turn speaker="Diyi Yang" timestamp="52:01">

So overall I think as social NLP is emerging, and then there are a lot of like a great pioneer
researchers whose research laid the foundation for this field, such as professor Dan Jurafsky,
Lilian Lee, Noah Smith, Jacob Eisenstein, Dirk Hovy and many others. So I'm a newcomer to this
field, and I'm really excited about this, especially around building socially aware language
technologies. In addition to the measures I think of some other exciting directions in our lab right
now is to understand the social dynamics between human and AI. Just think about it, we use the
attitudes in our communication. What are some of the social dynamics there? And can we promote a
civility in language use and then try to remove those or study those ill intentioned language use.
And more importantly, I think a main point of this issue in the beginning about the ethical apart.
So as we study more social aspects of NLP how can we build privacy preserving and responsible NLP?
So that's also some directions we have been thinking of.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="53:14">

Okay, great. Thanks. Is is there anything else you want to talk about that we didn't ask you about?

</turn>


<turn speaker="Diyi Yang" timestamp="53:21">

This is great. And I think we need more people to join us and we will find more interesting social
NLP research.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="53:29">

Yeah, I agree. Thanks a lot for this conversation.

</turn>


<turn speaker="Diyi Yang" timestamp="53:31">

Thank you

</turn>
