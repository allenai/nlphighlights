---
title: "Second language acquisition modeling, with Burr Settles"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Burr Settles","New Speaker"]
number: 069
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artifical Intelligence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:11">

All right. Today our guest is Burr Settles. He did his PhD at university of Wisconsin in Madison on
active learning kinds of stuff and then did a post doc at CMU on the Nell project. I met Burr there
and had a fun time working with him and for the past five and a half years Burr has been, leading
the research team at Duolingo, working on, helping people to learn languages. Welcome, Burr welcome
to the program.

</Turn>


<Turn speaker="Burr Settles" timestamp="00:38">

Yeah, thanks for having me. Is good to be here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:41">

And today, we wanted to talk about a paper that was published at an ACL workshop titled Second
Language Acquisition Modeling where you got together an interesting shared task and tried to study
the problem of how people learn language. Do you want to tell us what, what's going on in this
shared tasks that you did?

</Turn>


<Turn speaker="Burr Settles" timestamp="01:00">

Yeah. So the idea for this came together I think last fall at EMNLP in 2017 and we probably get
dozens of data requests that Duolingo both from computer scientists, learning scientists and
linguists all the time dozens a month probably. And because we're kind of a small, you know,
research and engineering team, we as a startup don't necessarily have the bandwidth to satisfy those
requests. So we decided to create a shared task that would be of interest to all of these
communities. And also, you know, valuable and interesting to us using the unique kind of data that
we have. And so we got the gears turning on that last fall, and released the data set in January and
had a workshop in June in new Orleans at the NACL conference.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:57">

Oh, did I say that wrong? I thought this was ACL. Yeah, I said that wrong. Sorry. This was a NAACL
paper.

</Turn>


<Turn speaker="Burr Settles" timestamp="02:03">

It's still organized by the association of computational linguistics, though.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:07">

Right. Thanks. Thanks for, thanks for correcting me. So I can imagine second language acquisition.
That's what your paper is titled. Your data is dealing with something like this, but I can imagine a
lot, a lot of different ways of trying to tackle how people learn languages. What was your take on
how to study this problem?

</Turn>


<Turn speaker="Burr Settles" timestamp="02:24">

Sure. So I think what we were trying to do with this this shared task was to fill in some gaps in
the research, both in the kinds of questions that people asked in the kind of data that were
available to the research community and to do so in a way that was kind of relevant to us and our
user base. So there have been lots of learner datasets that have come out of the intelligent
tutoring system and educational data mining communities like a Carnegie Mellon hosts data shop,
which is a repository of, I don't even know how many hundreds of data sets, but most of those are
math or physics related kind of a more objective kinds of results in most of are true, false or
multiple choice questions which lend themselves pretty easily to certain ways of computational
modeling. And there's very little language data there. And, and what language data there is is
mostly vocabulary only and flashcard and not really in context of, longer sentences or even shorter
sentences. And there also exists on the flip side. Lots of learner corpora that have come out of the
second language acquisition communities. But most of that is English and most of it is also for
intermediate or advanced students of a language of English in particular and a lot of it's been
collected in assessment settings, not actually learning settings.

</Turn>


<Turn speaker="Burr Settles" timestamp="03:57">

And there's also very little data that's more longitudinal in nature that follows learners over
time. And there's also very little of it for beginners. Like, I said, it's mostly intermediate and
advanced. So we're working in a space where most of our users, well, our users of Duolingo, are
learning a variety of different languages. About half of our users are learning English, but many of
them are learning Spanish or French or even Irish Gaelic and and they do so over longer, longer
periods of time. And the exercise types are kind of multimodal and various, they're not just true
false in that you actually have to actually have to construct translations or transcriptions or even
speak.

</Turn>


<Turn speaker="Burr Settles" timestamp="04:44">

And so what we wanted to do was to, you know, at the intersection of this Venn diagram of all these
unique properties of what we have that doesn't really appear to be out there yet. That's what we
tried to do.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:57">

Yeah. It seems like a really nice resource. Like you have so much data that no one else really has
access to of people that are actually trying to learn languages at all different levels. It's, it's
really interesting and it's nice of you to provide this data as a resource for the community.

</Turn>


<Turn speaker="Burr Settles" timestamp="05:15">

Yeah. And our, our goal was not just to, the hope was that we would bring in people not just from
computer science, machine learning and natural language processing, but also engage kind of the
cognitive science and psychology researchers who are relevant to this as well as, you know, applied
linguists in second language acquisition researchers. And so I was kind of pleased to see that when
we released the data set and announced the shared tasks, there were 15 teams that participated and
they were pretty evenly split among those three broad buckets of communities. There were linguists
and psychologists and then also computer scientists who, who threw their hats into the ring.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:54">

Yeah. Great. I'd love to dig in, dig into how these different communities approach the problem. But
first I think we should describe the problem. So what, what was the data that you actually provided
for this task?

</Turn>


<Turn speaker="Burr Settles" timestamp="06:05">

Right. So we, provided three different tracks of data of for, three different languages. So there
was an English data set for people learning English, a French dataset and a Spanish data set. And
those are our three most popular courses. And so the data consisted of about 7 million tokens that
were generated by about 6,000 students learning those three languages over the course of 30 days.

</Turn>


<Turn speaker="Burr Settles" timestamp="06:37">

And we know if you've ever used Duolingo there are a variety of different exercise types. Some of
them are more passive, some of them are more active. And for this particular date of release for a
variety of reasons, we just focused on three of the exercise types that we use. And it's kinda hard
to describe them just in words. So for people who are listening, if you want to pop up in shared a
task.duolingo.com that's the URL that has information about the task and the, different teams papers
as well as the description of the dataset. And you can kind of look along as I described this. So
one of the exercises is what we call a reverse translate. So you're given a prompt in your native
language, let's say English, you have the "Bee is an insect." And then you have to, if you're
learning French, you wouldn't have to try, you know, actually type in the translation of that
"l'abeille est un insecte."

</Turn>


<Turn speaker="Burr Settles" timestamp="07:40">

And we, there's also a variant of that we call reverse tap, which is a simplified version where you
still, it's the same task. You're given a prompt in your native language and then you have to
generate the the foreign language translation. But you're given a word bank to choose from, so you
don't necessarily have to remember them from memory. So this is what second language acquisition
people would call assisted recall. And then there's also a listening transcription task where
instead of seeing the prompt, you actually hear the sentence we're trying to get you to generate in
the second language and then you transcribe that. So all three of these are they're tied to written
production of the language. And part of the reason we decided to do it this way is that it lent
itself to data formats that NLP people would already be familiar with, you know, things like named
entity recognition or parsing. So, there were token level data all in the same language. And, that
way we didn't have to worry about flipping because for all of these exercises there also exists the
other direction where you're given a prompt in the L-2 and you have to generate your native language
as well as multiple choice and other kinds of formats. So we restricted it just to these three.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:06">

Okay. So then our data looks like just to summarize this, we have people who are learning a
different language. We have exercises they're trying to do where in every case they're generating
something in the language they're learning either by translation or by transcription. And we get the
log of what they did and we want to decide something about it,

</Turn>


<Turn speaker="Burr Settles" timestamp="09:29">

Right? So, so the task you can think of it if you're familiar with kind of a Conal datasets.
There's, there's a row for each token in the correct answer that we were trying to get them to
generate. And then there's some metadata about who the user is a unique identifier for each one of
the users. And then some other metadata, like what country are they from? How many days have they
been learning this course in Duolingo? Are they using the website versus the iOS or Android apps?
What type of lesson this is, whether it was a reverse translate, reverse tap or a listening
exercise. Then there is a token level label that you're trying to predict of did they correctly
generate this word or not. So for example, let's say you're a Spanish speaker learning English and
you're given what we're trying to get you to generate is "she is my mother and he is my father." But
instead you type in, she is modern and he is fodder. So both of the minds, both of the pronouns
would be marked wrong because they're missing. And then both mother and father would be marked wrong
because they were, they were typos or improperly recalled.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:49">

Do you record what kind of error there was or just that the word was wrong.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:54">

In this particular formulation of the task, it's just that the token was wrong. We, when we were
trying to define exactly what this task would be, we, there was a lot of debate over what to do and,
and how to formulate it. Whether we wanted it just to binary classification task, which is what we
ultimately settled on or, something like even maybe closer to a regression task where we provided
the label was like the string edit distance between whatever they were supposed to generate and what
they did. Or if we wanted a multi-class classification task of whether or not it was an omission or
a typo or a miss conjugation or something like that. And for this first stab at anything like this,
we decided to just keep it simple and make it a binary prediction task of whether or not it was
correct or incorrect.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:47">

Yeah, I think it makes a lot of sense to keep it simple. To start. I was, I was imagining something
like could detect which phonemes they're not translating correctly. Like your mother versus mader or
whatever example. You could imagine getting incredibly fine grain too. You're trying to decide what
exactly this person doesn't understand.

</Turn>


<Turn speaker="Burr Settles" timestamp="12:07">

Right. And I think there's a good chance that we'll release a followup version of the dataset that
includes additional metadata about both the prompt and what the what the user typed in so that if
you're interested in those questions, you could go ahead and, and, and dig a little bit deeper into
that. And that would be really cool. There are some, believe it or not, GDPR general data privacy
regulation issues involved with releasing that data. So that's why we haven't yet. But

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:40">

So I, I wonder if the, if the user changing the order of words that were supposed to be produced
will this count as correct or incorrect?

</Turn>


<Turn speaker="Burr Settles" timestamp="12:49">

It depends. So that, that is another limitation of this formulation of the task. So if you, if you
deleted a word from the reference answer from what we're expecting it or right, then you would get
that wrong. However, if you inserted a word or transposed a word it might either be marked wrong or
just missing from the Corpus. So that that is a limitation of this. Like sort of, for example, if
you if you, if the, she is my mother and here's my father prompt example from earlier, if the
student said something like she is my only mother, you know, only would just be missing from the
datasets or if you said she is mother my then I'm not sure which one of the tokens would be correct
and aligned and the other token would not be,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="13:50">

so the alignment has to be more monotonic then.

</Turn>


<Turn speaker="Burr Settles" timestamp="13:52">

Yes.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:52">

Yeah. And this is because of some details of how you generated the data. You're only looking at the
reference like the correct thing and marking yes, no on the correct output.

</Turn>


<Turn speaker="Burr Settles" timestamp="14:03">

Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:03">

So it makes it hard if there's not a great alignment between them.

</Turn>


<Turn speaker="New Speaker" timestamp="14:07">

Right, so if you're familiar with the tasks of grammatical error detection and grammatical error
correction .That's the task where you're actually given like organic L2 learner output, which has
the mistakes in it. And you're trying to detect which tokens were wrong and, in what way they were
wrong. In some cases, this is almost the opposite of that. So this is what we expected you to
generate correctly and these are the mistakes you made, but they're kind of limited to with respect
to what you were supposed to have generated.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="14:42">

So I wonder if the data and this shared task reflect the national distribution of native languages
in your user Population, or did you stratify it in certain ways too, for any specific goals that
you've had in mind?

</Turn>


<Turn speaker="Burr Settles" timestamp="15:00">

So in this particular dataset, given the timeline that we were working on and how easy it was to
pull data from our data warehouse, the English learners are all native speakers of Spanish and the
Spanish learners and the French learners in those corporate, they were all native speakers of
English, or at least they were all Duolingo courses or pairs of languages, which is what we assume
to be in native language, although sometimes it's a second language, but a very proficient one. So
basically the three tracks more accurately are Spanish for English learners, French for English
learners and English for Spanish learners. In the future if we do something like this again I think
we would pull more broadly from so that English learners had more of a variety of language
backgrounds, not just Spanish, but also French and Japanese, Chinese Portuguese, et cetera.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:58">

So, switching directions just a little bit. I think we, we've got a decent handle on how, on the
data that you've collected, which is I'm taking a bunch of learners, I have some exercises they, did
I take the correct answer and I Mark, yes, no. Did they get each word correct? Say I'm a linguist
that wants to know how, like study the process of second language acquisition. Can you argue for why
this dataset is a good one?

</Turn>


<Turn speaker="Burr Settles" timestamp="16:26">

A few reasons. There, so there are sort of token level annotations of which words were correctly
generated, and not and, each, error could be the result of several different things. So it could be
a vocabulary gap. It could be a morphology error, it could be a syntax or a word order gap. And
because we have this somewhat longitudinal data over the course of time for beginners you can start
to tease apart, ideally, this is what we were hoping to tease apart those kinds of different
aspects.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:07">

Unfortunately, almost most of the, well broadly speaking, the different teams that participated in
the task, they were, they took two approaches, either fancy algorithms or fancy features. And there
were a few teams that did both but the winning teams generally were the fancy algorithms teams who
maybe did absolutely no feature engineering beyond what we provided. And one of the, shortcomings of
that is that it lended itself to very little insight on the actual language learning process.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:42">

I guess related to that, if I had a system that could do this arbitrarily well, so say say that I
could predict for a particular exercise, what the user's gonna do wrong, how would that help me?
Like what, what can I do with that?

</Turn>


<Turn speaker="Burr Settles" timestamp="17:58">

Right. So the, the reason we're interested in this question and Duolingo is to help drive
personalized adaptive lessons. So if we can have a system that, whether explicitly or implicitly has
some notion of this user struggling with plural, subjunctive conjugations, so we should, next time
they come into practice, we should try to bias that lesson to include more of those so that they get
more practice with that. Even if what we're actually teaching them is something else entirely. We do
have exercises that introduce new vocabulary but happened to use this particular, you know, mophic-
syntactic thing that they're struggling with. Another use would be to provide users or teachers
because lots of teachers use Duolingo in the classroom with more detailed or interesting learner
analytics. So not just, you know, here's some scores, some gamified score which is very motivating
and part of why Duolingo is structured like a game, but also here are the different aspects of
language learning and here is how well you're doing on them. And then that that can help students in
their own self study or teachers in a classroom setting be able to know where they should focus or
draw in resources from other ways.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:14">

Yeah, that's interesting. I guess I was also thinking of a, I think a paper you had a couple of
years ago on space repetition and I, as I was reading it this modeling paper about your cert task, I
wondered, do you really always want to only show things that these are struggling with? Like, could
you use this to say this another way? I might want to show the user an exercise that, they're not
struggling with, but I might predict they will be sung at some point in the future if they don't see
this one.

</Turn>


<Turn speaker="Burr Settles" timestamp="19:48">

Ah, right. It's kind of an open question of when is the optimal point to to practice. You know, is
it when you're just on the verge of forgetting? Is it just a little bit before that? Intuitively,
that's what I would say. And if we had an arbitrarily good system for this, then you know, I could
lean on some of my active learning jobs to try to tune and figure out where those thresholds are or,
how to prioritize, you know, out of the 7,000 different aspects of language learning that we could
get you to focus on right now, you know, which are the, the which of the arms we're going to pull.

</Turn>


<Turn speaker="Matt Gardner" timestamp="20:28">

So this last question is how, would you imagine a person actually doing this task? Like is this
like, I'm just thinking like if I'm trying to build a system, probably I would want to build some
intuition on how I would solve the task first, just to convince myself that it's even solvable and
then use those intuitions to design the model. So what kinds of things do you think would help a
person solve whether or not a user that's doing this exercise will get this right or wrong? Like
how, how should I even start To build a model?

</Turn>


<Turn speaker="Burr Settles" timestamp="21:04">

Yeah, that's a good question. So, I mean, I'm not sure what a human baseline for something like this
would even be. I mean, the task is given a language learner and their history with certain exercises
in the past predict the mistakes that they're going to make at some arbitrary time point in the
future. And that's kind of like weird, although in some opaque and magical way, like that's what
good teachers do. Good, teachers are, are perceptive of their students the mistakes that they've
made in the past and make some guesses about how to correct for that or, you know, deal with that in
the future. And so I guess where that's mostly played into how to approach this task is maybe in the
feature engineering. So things like what are the different core components of language? What are the
different features that might affect how easily you learn things? Like, is this a cognate or does it
represent some language feature that exists in the L1? How long has it been since they've seen this?
How likely are they to have forgotten it? So most of where that transfers over is thinking
qualitatively and like how, would a human approach this? And then trying to build those into the,
the second language acquisition modeling system.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:40">

Yeah. Great. And I think that that's a nice segue into the systems that actually were submitted to
the shared tasks. Cause I think you, the paper mentions that a bunch of those features were tried by
a bunch of the systems. Right. So do you want to tell us about the systems that were submitted to
the task and how well they did?

</Turn>


<Turn speaker="Burr Settles" timestamp="23:00">

Yeah, so there were 15 systems and they I kind of got ahead. I kind of alluded to this earlier, that
there were broadly two approaches, fancy algorithms and fancy features. I'd say about somewhere
between a third and a half, the systems used a logistic regression or some other kind of linear
classifier which is also what we provided as a baseline system. And those teams and broad strokes
came from more language and psychology backgrounds and spent most of their time engineering new
features. Like what I what I just described. So broadly speaking, some of those were some of the
more successful ones were word Corpus frequency string at a distance between the L1 and L2 or cognit
cognateness. Some teams use.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:52">

quick, sorry, quick question on that word frequency is when you say Corpus, do you mean in the
exercises or do you mean in some, like what large pile of texts?

</Turn>


<Turn speaker="Burr Settles" timestamp="24:01">

Yeah. So they, they, they drew from other corporate or either spoken or written corporate like movie
subtitles or Wikipedia or things like that. So I'm empirical word frequency and other domains.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:14">

And I missed this in your paper, but I wanted to be sure I asked. Were there features, like how
often the user had seen the word previously?

</Turn>


<Turn speaker="Burr Settles" timestamp="24:23">

Yes. So that's another one. How there was several user word interaction features, like history
features. So things like how frequently they'd seen the word of the past, a running average of their
accuracy with that, word or token. Some teams spliced those up into lima and inflection. You know,
how many times they'd seen this and this, this root form versus this particular, the inflicted form
vector space embeddings were other features that, people tried. And in the paper, the meta analysis,
we actually have a figure that just kind of names a lot of the different features and how popular
they were as well as estimates of what effects, if any they seem to have on the area under the ROC
curve, which is the evaluation metric we used in this task.

</Turn>


<Turn speaker="Burr Settles" timestamp="25:22">

So on the algorithm side, so those are, that's kind of the feature side. On the algorithm side, I
guess I should also say we provided some linguistic features. We used a Google syntax net to part of
speech tag and parse all of the, the reference answers. And so we provided those along with
morphology features. And so some teams chose to use those and some did not. And some actually just
ran their own parsers to generate their own.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:55">

And then, and then the other class of systems used like fancy RNNS.

</Turn>


<Turn speaker="Burr Settles" timestamp="26:00">

Right. So there were on the algorithmic side generally there was three groups of approaches. There
were the linear models, which I already described. Gradient boosted decision trees were pretty
popular or random forest, basically tree ensembles. And then also there were recurrent neural
network approaches. And there were, there's at least two ways to use a recurrent neural network for
this data set. So one is the way it would normally be used. in a like a part of speech tagging or
named entity recognition task where within each exercise you're trying to tag each token within the
sentence. But then you could also use a recurrent neural network kind of as what's essentially a
knowledge tracing model. A knowledge tracing comes out of the intelligent tutoring system community
and usually use hidden mark models for this. But tracking a particular user's history with all the
words over time. So they've got this kind of global RNN and you can have a local exercise level RNN
and some of the more successful teams combined, these one team actually trained two separate models.
And then had them vote in an ensemble sort of approach.

</Turn>


<Turn speaker="Burr Settles" timestamp="27:16">

Another team actually had a unified model with the unified loss function. And that approach seemed
to do a little bit better. But it's, hard to know whether that was why, because there are also
different feature engineering design decisions.

</Turn>


<Turn speaker="Matt Gardner" timestamp="27:33">

Right. Any any interesting high level takeaways? I guess we've talked about some of them that there
are these different kinds of features. I guess I don't think you've told us the results of the
affect modeling you did.

</Turn>


<Turn speaker="Burr Settles" timestamp="27:48">

Right. So we did a, a linear mixed effects model to try to estimate how well or how, much a
particular algorithm design decision contributed to the area under the ROC curve evaluation while
controlling for random effects. Like you know, which user was it? Which, language was it? Cause
there were systematic differences between English and French and Spanish. I forget which one was
easiest, but and then also the different team, you know, different different aspects of the
implementations of the algorithms that we can't necessarily account for by just they used an RNN.
Broadly speaking, there was a significant, positive effects using recurrent neural networks,uand
slightly significant positive effects using decision tree ensembles. and also there were some teams
that chose a multitask approach to the, the task, which is we were hoping some people would do,
which is also why we provided three different tracks, so what we're hoping to get to the bottom of
are what are the commonalities and what are the differences about learning English versus French
versus Spanish. and teams that chose a multitask approach also had a significant boost in their,
area under the ROC curve because it, presumably there was it able to leverage information about
innate problems of language learning across the three tasks.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:29">

So what do you, what would you say you've learned from the, the result of this shared task, has it
changed anything that you're doing at Duolingo?

</Turn>


<Turn speaker="Burr Settles" timestamp="29:36">

Well, we had actually internally tried a recurrent neural networks a bit in the past at the exercise
level, not at kind of at the word level like this before. And we're not able to get them to perform
it any better than just a logistic regression. Which a footnote that I should mention. For those who
aren't as familiar with psychometrics and the intelligent tutoring system community logistic
regression in this case is what would be known as an item response theory model or more specifically
an additive factor model in that community. And it's pretty standard. in how computer adaptive tests
and intelligent tutoring systems work.

</Turn>


<Turn speaker="Burr Settles" timestamp="30:16">

In the simplest form that you're, it's like a logistic regression logistic regression with two
features. One is an indicator variable for the user. And another is an indicator variable for the
exercise or in this case like a token. And then like if a user has a weight of zero, that means
they're the average user. And if it's a positive one, then their one standard deviation better than
average. And that's how the systems tend to work. So those kind of like of recurrent neural network
or deep knowledge tracing and like this logistic regression or an item response model a are two ends
of a complexity extreme or spectrum. We had been biased more toward the simpler linear models just
because they seem to work well in what we had tried internally. So this actually opened our minds a
little bit about using more sequential modeling over time.

</Turn>


<Turn speaker="Burr Settles" timestamp="31:18">

One of the downsides though, however, is there less interpretable? You have less of a sense if we
wanted to provide these detailed user analytics or kind of theory based adaptive lessons you're
unable to extract, you know, what it is a particular learner is struggling with in some symbolic
way. Then those are some limitations. But we're starting some more initiatives to dig into this
within the company. And so I think we're going to use the results of this shared task as a starting
point for some of those investigations. And I think something else that we learned where the
limitations of the data and the task as defined. So I think Waleed already asked a question about
the language backgrounds so part of the reason that things like word cognate features didn't seem to
help very much is probably because there wasn't much flexibility for them to shine.

</Turn>


<Turn speaker="Burr Settles" timestamp="32:26">

Whereas if you were comparing a Chinese speaker and a Russian speaker and an Arabic speaker and a
Spanish speaker all learning English those sorts of features probably will matter more. Also word
maybe didn't matter as much because these were all beginners and it was a fairly limited time window
of 30 days. I think also this space repetition features didn't help as much. So if we were to do
something like this again, which which I hope we do it would be a longer dataset with a variety of
L1 learner backgrounds. And I think that would make for a richer, more interesting task. And
hopefully we can also learn more, not just about what kind of algorithms work, but more about second
language acquisition generally. So just as much science as engineering.

</Turn>


<Turn speaker="Matt Gardner" timestamp="33:16">

Yeah. And I feel like if you also are somehow able to like do multi-class classification on like
what kind of error this is, you'd probably get a lot more both in the interpretability side because
you might not know what the model is doing, but at least you have output that you can aggregate and
give some kind of detailed feedback about what kinds of errors that the person makes. But also maybe
get some more insight on what the model is actually doing to, because you have a, I guess more as
you said, like cognate might matter more for this particular kind of classification decision and
instead of just a yes, no.

</Turn>


<Turn speaker="Burr Settles" timestamp="33:53">

Right. yeah. And, and that's part of the reason we just, we started with what we did. So that we
could iterate and get feedback, you know, learn what worked, what didn't, what were the limitations,
what were the strengths, what are the kinds of research questions that people from all three of
these communities would want to ask of this kind of data. And and then hopefully we can dig into the
data resources that we have to provide stuff like that in the future.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:19">

Yeah. Great. This has been a really interesting discussion. Thanks for coming on. Do you have any
last thoughts or is there anything you wanted to talk about that we missed?

</Turn>


<Turn speaker="Burr Settles" timestamp="34:28">

Well, we're hiring, you can go to duolingo.com/jobs we're, we're looking for more machine learning
engineers and research scientists to work on these efforts.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:39">

Yeah, there are really interesting problems. I've been very tempted myself to Duolingo. I applied
for an internship. They were back in the day,

</Turn>


<Turn speaker="Burr Settles" timestamp="34:45">

Back in the day when, when we didn't really have the bandwidth to support interns. I remember that
and I apologize.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:52">

Yeah. Anyway, thanks. Thanks for this has been really fun.

</Turn>


<Turn speaker="Burr Settles" timestamp="34:54">

Thanks for having me.

</Turn>
