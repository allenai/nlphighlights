---
title: "Multi-Task Learning of Keyphrase Boundary Classification, with Isabelle Augenstein"
hosts: ["Matt Gardner"]
guests: ["Isabelle Augenstein","New Speaker","Walleed Ammar"]
number: "039"
tags: []
description: "Isabelle Augenstein was the lead organizer of SemEval 2017 task 10, on extracting keyphrases and relations from scientific publications. In this episode we talk about her experience organizing the task, how the task was set up, and what the result of the task was. We also talk about some related work Isabelle did on multi-task learning for keyphrase boundary detection. https://www.semanticscholar.org/paper/SemEval-2017-Task-10-ScienceIE-Extracting-Keyphras-Augenstein-Das/71007219617d0f5e2419c5c1ab1a0d6d0bc40b7e https://www.semanticscholar.org/paper/Multi-Task-Learning-of-Keyphrase-Boundary-Classifi-Augenstein-S%C3%B8gaard/4a0db09d0c19dfeb78900164d46d4b06cd3fc9f3"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F349782271&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Walleed Ammar" timestamp="00:05">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allan Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:10">

All right. For today, our guest is Isabelle Augenstein, who at recently started as an assistant
professor at the university of Copenhagen. She previously was working as a postdoc with Sebastian
Riedel and has done some work on machine reading from scientific articles including organizing a
shared task SemEval 2017 and that's the main thing we're going to talk about today. So thanks for
being with us Isabelle.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="00:37">

No problem. Thanks for inviting me.

</turn>


<turn speaker="Matt Gardner" timestamp="00:39">

Can you tell us what this shared task was about?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="00:44">

So, this shared task was about extracting information from publications, specifically key phrases
and relations between them.

</turn>


<turn speaker="Matt Gardner" timestamp="00:53">

And why did you want to organize this shared task? Why is this an interesting problem?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="00:58">

So the main motivation is that when researchers start working on a new problem, they have to find
papers about the topic in order to know what the related work is and what they can build on. And in
order to do so, those search engines, they have to have some understanding about what the key
phrases are and the relations between them, how the key phrases are organized hierarchically. That's
the main motivation between organizing the shared tasks to help, people who build these search
engines help researchers find better papers about their research areas.

</turn>


<turn speaker="Walleed Ammar" timestamp="01:35">

Right. The timing of this shared task is very appropriate for us in the semantic scholar team
because we were just starting to work on this problem at the same time. And we provided a bunch of
legal data, which is very related to this domain and that was very convenient. So, recently, like a
little flag course on Scholar here, we recently made a release with basically identifying key
phrases and some of the relations between entities and we're making them available to the Semantic
Scholar website. So, you can now find the association, between papers and their key phrases.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="02:17">

Nice.

</turn>


<turn speaker="Matt Gardner" timestamp="02:17">

Great. So yeah, a useful shared task. So how exactly was this shared task set up? What went into
putting it together?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="02:28">

So I had just started my postdoc at UCL and the postdoc was based on the grant with Elsevier. And
the problem was that there was no data, really, in order to work on this problem. So we could have
just started working on some unsupervised approaches or so, but we thought it would be fun to
organize a shared task on this to also get other people in the community interested in this problem.
So, one of the first things I did when I started my postdoc at UCL was to work on this shared task
proposal. And yeah, so the process was we submitted a proposal, we waited and then at some point it
was approved. And yeah, also actually we looked for some collaborators to write this proposal and
fortunately Andrew McCallum is also very interested in the problem and he was interested in working
with us on that.

</turn>


<turn speaker="Matt Gardner" timestamp="03:25">

So, did you have annotations before you submitted the shared task; a proposal?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="03:30">

Not on this dataset, no. We started looking into it a little bit, specifically, Andrew started
looking into it a little bit, but we didn't properly start annotating datasets no.

</turn>


<turn speaker="Matt Gardner" timestamp="03:42">

Did you have funding for the annotations or did that come after the proposal was accepted? How did
that work?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="03:49">

No, we talked to Elsevier and they they said they would fund us to annotate the datasets. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="03:55">

So can you give us some more details on what exactly you annotated and how that worked?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="04:00">

Yeah, sure. So what we wanted to annotate specifically were materials, processes and tasks. So
processes are things like methods and equipment and the tasks are things like information extraction
materials or things like datasets or physical materials if you're thinking about material science
and then the relations between them were HYPONYM-OF and SYNONYM-OF. And I already mentioned material
science. So what I want to add now is that we looked at different domains, so we looked at computer
science, material science, and physics. And we selected papers from those domains to annotate.

</turn>


<turn speaker="Walleed Ammar" timestamp="04:42">

Did you find any relative difficulty in finding people to annotate depending on which domain?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="04:50">

No, I think it was equally difficult for all the domains. I mean, yeah, we selected students to
annotate and we just sent out emails; UCL was the nicest to help us advertise it actually on the UCL
website where students can look for many jobs. So that helped. But still, yeah, they got tired of
annotating very quickly.

</turn>


<turn speaker="Walleed Ammar" timestamp="05:17">

Yeah, absolutely. I'm curious to know if you tried to crowdsource this cause like sometimes, I don't
know, it's like sometimes we underestimate what we crowdsource workers can or cannot do. In this
case, in this particular case, I would not expect them to be able to do the annotation with high
quality. But maybe if there was enough redundancy, we might be able to get something out of it.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="05:41">

Maybe. Yes. So we did one pilot study with one annotator who was an engineering student and we
thought we would start with that to see was this possible at all. And the annotator already found it
difficult being the main expert. So we thought we really could not give this to just any crowd
workers.

</turn>


<turn speaker="Matt Gardner" timestamp="06:02">

I see. Just to, to give the listeners an example of what we're talking about, to make this a little
more concrete in the paper describing the shared task, there's an example paragraph and I'm just
going to read it and then tell you what the key phrases and stuff are. It's "Information extraction
is the process of extracting structured data from unstructured text, which is relevant for several
end-to-end tasks including question answering the paper addresses the tasks of named entity
recognition, "NER" a sub task of information extraction using conditional random fields, "CRF". Our
method is evaluated on the CoNLL-2003 NER corpus." So in here we have several tasks that are
mentioned including information extraction, question answering, and named entity recognition. There
are some processes or methods, which are conditional random fields. And there's a dataset which is
the CoNLL-2003 NER corpus and the relations that are expressed here are a named entity recognition
is the same as or a synonym for the NER that was in quotes in the text and it's an instance of or a
hyponym of information extraction and similarly conditional random fields is a synonym for CRF. So
these are the kinds of things that we want a system to be able to extract and that we want
annotators to be able to reliably recover. Right.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="07:23">

Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="07:23">

And I can see looking at this, how it might be difficult for someone to know that question answering
should be labeled as a task. For instance. Like how do you know that certain phrases should be tasks
or should not. Really, it's a whole lot easier if you're a domain expert to know what this is,

</turn>


<turn speaker="Walleed Ammar" timestamp="07:42">

Yeah. And we've also been trying to do this for like the medical domains, which I have absolutely no
idea about. So it was very difficult to come up with guidelines to help the annotators be consistent
and provide useful annotations for us. So I'm curious, how did you design the guidelines for the
annotators?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="08:08">

So we have this one annotator who was doing a pre-study with us and she helped to develop the
guidelines. So we went back and forth a little bit. Yeah. But basically it was just based on that
and based on our experience with annotating data.

</turn>


<turn speaker="Walleed Ammar" timestamp="08:27">

And how like how consistent did you find the annotators after a finalizing the guidelines?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="08:35">

They weren't so consistent. You can find it in the paper. Actually, we measured Cohen's Kappa and
some of the students who were very motivated, they did well. But as I already mentioned earlier,
people tend to get tired after awhile, either tired or bored or didn't want to finish it. It's hard
to tell afterwards. Right. But those who tried and who read the guidelines and so on they did well.

</turn>


<turn speaker="Matt Gardner" timestamp="09:06">

So given how hard this was, how big of a dataset were you able to collect?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="09:13">

We collect a few hundreds of annotations. Or we annotated a few hundreds of papers, but actually
just paragraphs in those papers. Yeah,

</turn>


<turn speaker="Matt Gardner" timestamp="09:25">

I see. So yeah, looking at the data, it looks like 350 training examples here. That seems really
small. That seems like a really hard task.

</turn>


<turn speaker="Walleed Ammar" timestamp="09:35">

However, this is the biggest dataset for this task. [inaudible]

</turn>


<turn speaker="Matt Gardner" timestamp="09:36">

Yeah, yeah that wasn't supposed to be a criticism, it's just wow, this seems hard to learn because
it's a tiny dataset. And so I guess just looking at this the table and the paper, it looks like
there were almost 6,000 labeled key phrases. So that's more than 10 per paragraph. That's I guess
better than than 500 sounds. So 500 paragraphs total, but each one has like 10 key phrases. And if
it's a tagging problem which I believe you treated this as then it's not just 500 examples, if you
treat the tag itself as a single example, it's 500 times the length of the passage. And so it's a
little bit better than it sounds at first glance, but it's still pretty small. Yeah. Interesting.

</turn>


<turn speaker="Walleed Ammar" timestamp="10:32">

So fast forward to the actual participation, like when the participants say the you want to join the
shared task, like how was it? What's the process like, how much time did you spend organizing and
coordinating with the other shared task organizers and the participants.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="10:55">

So, that was also quite a lot of work. So as SemEval piloted this system called CodaLab for
uploading data and evaluating results, it was a new system to us and it was a new system for most of
the organizers and we didn't a hundred percent know how to use it. So that was quite a hard process
for us. And also participants found problems in the training data like annotation errors and we
didn't really know what to do about it because the data was annotated by some students. And yeah. We
eventually re annotated some of the data based on feedback we got from participants and re-released
it. But yeah, it was really hard to deal those small things.

</turn>


<turn speaker="Walleed Ammar" timestamp="11:55">

Are you planning to organize another one? Maybe not necessarily for the same task, but in general
based on this experience. Would you encourage other people to design and organize shared tasks?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="12:11">

I think the shared task was very successful in what I envisaged for it to achieve which is to get
people to be interested in the problem. And from that perspective I would absolutely encouraged
people to organize share tasks. But at the stage where I organized the shared task, I was a postdoc
and I think it's more useful for PhD students to take the lead on organizing shared tasks because
they can still learn a lot of things about, I don't know, annotating data, organizing tasks and all
of this. And to me that was, I already knew things about that, so I didn't have so much to learn
from that. I think.

</turn>


<turn speaker="Matt Gardner" timestamp="12:59">

Just a bunch of painful work. But as you said, it ended up really useful and I think it's a really
interesting problem. So thanks for doing that painful work because it was a nice test.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="13:10">

Yeah, no problem. Thanks for participating.

</turn>


<turn speaker="Matt Gardner" timestamp="13:14">

I guess that's a nice segue to tell us about what you actually found. I guess we haven't yet talked
about how you evaluated, like what was the set up for the actual task itself, given the data that
you collected. Do you want to tell us about that?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="13:26">

Yeah. so one of the things that we really wanted participants to do, and that was not successful was
to get them to work on several tasks at once. So the actual tasks identifying key phrase boundaries,
then classifying key phrases, so saying if their post is this or task of materials, and then also
classifying relations recognizing relations and classifying them into Hyponym and synonym. Right.
And we wanted participants to work on several of those tasks at once and potentially work on a joint
learning solutions to those tasks. And participants didn't seem to want to do that.

</turn>


<turn speaker="Matt Gardner" timestamp="14:11">

Sounds like a hard problem with a lot of joint variables.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="14:13">

Yeah, yeah, yeah. But we thought that would be super interesting. A super interesting learning
problem, but participants were more interested in just working on boundary detection, on boundary
texting classification because that's very similar to name entity recognition and classification. So
I would guess that people already had some idea of how to go about it. They were more interested in
applying existing solution, or slightly re-working them.

</turn>


<turn speaker="New Speaker" timestamp="14:39">

Interesting.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="14:39">

Yeah, but then the evaluation scenarios that we had for those, we actually took the different types
of tasks to get, so people had to work on relation extraction or key-phrase classification and
relation instruction or on all of the three things together. And we provided the goals labeled data
for the task that the other ones relied on.

</turn>


<turn speaker="Matt Gardner" timestamp="15:03">

So I guess I see in table three in this paper that I'm looking at the results overall for teams that
did all three of your sub tasks. Which as you said, are like key phrase identification, key phrase
classification and relation classification or extraction. And there are a bunch of teams that did
all three of these. So what do you mean they didn't do them jointly? Were these all pipeline
systems. Like I'm a little confused as to what you meant there.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="15:32">

Oh, sorry. They developed solutions for all the three tasks but they didn't develop a joint learning
approach for all of these tasks.

</turn>


<turn speaker="New Speaker" timestamp="15:40">

I see.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="15:41">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="15:41">

Okay. And how well did systems do? Do you think we learned something interesting about solving this
problem from this result?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="15:55">

Yeah, so one of the things I found really interesting from this is that scientific key phrases tend
to be quite long. And that's what made the key phrase boundary detection task already very
challenging because, so they're longer than say, a named entity typically is.

</turn>


<turn speaker="Matt Gardner" timestamp="16:15">

Can you give, do you know off the top of your head any example of a longer key phrase? The example
that we talked about earlier, I think the largest key phrase was three words, Conditional Random
Field. Oh wait, that CoNLL-2003 NER Dataset might've been four words.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="16:33">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="16:34">

Do you know on the top of your head a longer one. If not, that's okay.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="16:37">

I don't know. Maybe named entity recognition and classification methods also. That would be quite
long.

</turn>


<turn speaker="Walleed Ammar" timestamp="16:43">

Yeah. I do remember like a decent percentage were more than five words, which is kind of rare.

</turn>


<turn speaker="Matt Gardner" timestamp="16:51">

Interesting. Yeah. The way you said that, I could see how a student who isn't really familiar with
this would have annotated that longer phrase. But if I saw named entity recognition and
classification methods, there's no way I would say that's a single key phrase. I would've split that
up. Interesting.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="17:09">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="17:09">

Okay.

</turn>


<turn speaker="Walleed Ammar" timestamp="17:10">

So you had an ACL paper which explorers doing multi-task learning for this particular, for the key
phase extraction task. Right. We'd like to look into that a little bit.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="17:22">

Sure. So the idea of the ACL paper was that, well we can approach the task of key phrase edification
classification very similar to how one would approach a named entity recognition classification
task, which is just a tagging problem, right? So sequencer labeling problem. But as we already
discussed earlier, there isn't a lot of training data available for the task. So one of the things
that works very well in such low resource scenarios is to use multi-task learning. So that is to try
to learn multiple tasks at once and yeah. So then we can use data related tasks like identifying
hyperlinks or so, and what happens is that the inputs to the newer model is specific to each task
and the hidden layers are shared between the tasks. So the key phrase identification and hyponym
detection. They would share the hidden layers, but then the output layer is specific to each task
because of course they need to predict different things. The model, yeah. For the different tasks.

</turn>


<turn speaker="Walleed Ammar" timestamp="18:35">

Yes. So what, what kind of tasks did you use? You mentioned hyperlink detection any other tasks?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="18:42">

Yeah. we use chunking, FrameNet target identification, hyperlink detection, multi word
identification and super sense tagging.

</turn>


<turn speaker="Walleed Ammar" timestamp="18:52">

So basically other tasks which try to encourage the model to find boundaries between pretty much
noun phrases, but some of them also try to identify like key phrases really but in a different
sense.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="19:05">

Yes, exactly. Yeah, that was the idea.

</turn>


<turn speaker="Walleed Ammar" timestamp="19:07">

And what's like the strategy for training across the different tasks for training the model? Like
alternating loss function between the different tasks. How would you do that?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="19:18">

Yeah, exactly. So in each training iteration, a task is randomly sampled and then you know for that
task the loss is computed and so on. And the parameters are updated and then a new task is sampled
again. So it's just a random sampling of tasks.

</turn>


<turn speaker="Walleed Ammar" timestamp="19:42">

I see. So I suppose you sample a batch of similar tasks of examples in a similar task and then draw
another batch from from the next task, is that right?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="19:56">

Yeah, exactly. Yeah. And ideally you want the training data to be roughly at the similar size
because otherwise you over sample for one task or you have to,

</turn>


<turn speaker="Walleed Ammar" timestamp="20:09">

Sorry. Yeah, just continue.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="20:11">

Oh, sorry. Or you have to, you have to introduce some, some additional functionality. So you
actually only sample a similar amount from each task.

</turn>


<turn speaker="Walleed Ammar" timestamp="20:20">

I would expect over sampling from the actual tasks that we care about. So in this case, key phrase
extraction to be a reasonable thing to do. I would like would it, would it be reasonable to give it
higher weight or sampling from it more often.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="20:37">

I mean intuitively yes. But in practice people don't seem to do that or it doesn't seem to work any
better. So what I typically do is I determine when to stop training based on the main task, that
that works well in practice. So to have some early stuff in criteria based on the main task
development at performance.

</turn>


<turn speaker="Matt Gardner" timestamp="20:58">

Interesting. So this sounds very much like one of the tasks in your shared task was this method that
we're talking about a submission to the shared tasks.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="21:09">

No. So we did this work before the shared task in a way or while we were working on annotating the
training data on the shared task.

</turn>


<turn speaker="Matt Gardner" timestamp="21:18">

And then just, it seems like you could have just used this, submitted it as a competitor in the
shared task. Did you, why did you decide against that?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="21:29">

Well task organizers shouldn't submit to their own tasks really. So that's why we didn't do it.

</turn>


<turn speaker="Matt Gardner" timestamp="21:36">

Fair enough. Is that really like a conflict though?

</turn>


<turn speaker="Walleed Ammar" timestamp="21:41">

Kind of like they're both a participant and a judge. I feel like any participant would question the
results. If a is a little funny saying, we have the best results

</turn>


<turn speaker="Matt Gardner" timestamp="21:55">

If you establish the judging criteria in some fair objective way, like is it really a problem.

</turn>


<turn speaker="Walleed Ammar" timestamp="22:05">

Well, one key thing is the tests that is supposed to, like the participants don't get the gold
labels for them. Although some, because you know, in order to do some tasks you had, you had to be
able to get the goal data for other tasks in particular in order to evaluate your system just for
relation extraction, you need to get some standard annotation for the key phrases. And so in that
case that holds the gold labels. So I was one of the participants who had access to to the key
phrases, but I was basically committed not to use it while predicting end tasks. So basically the
organizers was trusting the participants to be responsible.

</turn>


<turn speaker="New Speaker" timestamp="22:58">

Okay.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="22:59">

Yeah. But in the future, I mean, this CodaLab system also allows people to upload Docker containers
so they can actually upload their code as a Docker container and then run it on new data. And when
we submitted the task proposal and we thought about all of these things, we thought participants
would upload their codes and then the system would run it on new data, but then the SemEval
organizers decided that would be too complicated somehow, too involved. So, yeah. So we should
upload the data instead. We still decided to stick with our evaluation, different evaluation
scenarios.

</turn>


<turn speaker="Walleed Ammar" timestamp="23:37">

Well, and in fairness of those, it had quite a bit of complication, especially for someone who
haven't tried a system before for like the CodaLab system or never tried Docker containers before.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="23:50">

Oh, absolutely. I can understand why they decided that.

</turn>


<turn speaker="Matt Gardner" timestamp="23:55">

Yeah, I guess we haven't talked too much about what actually like the systems that did best on this
task. Maybe that's Waleed trying to be humble about this and avoid talking about it because his
system won and actually I think the result is pretty, the best system is pretty similar to the
multitask stuff that you were just talking about your previous system.

</turn>


<turn speaker="Matt Gardner" timestamp="24:23">

Yeah, I mean you, you can think of our submission for this shared task as multitask learning or the
other task is language model. Although to be more accurate, we were doing basically model transfer.
We were training most of the model parameters using the language model. And basically you can think
of language models trained on huge amounts of unlabeled data as like you're learning how to encode,
how to get a better encoding for individual tokens. And you can think of this as a pretty good
featurization of every word in your input. And it turns out to be very effective, and not just for
this task Matt has a whole bunch of other tasks where this shows to be a very useful a very useful
approach.

</turn>


<turn speaker="Matt Gardner" timestamp="25:15">

And he just said, Matt that's - that's Matt Peters and not Matt Gardner that's Waleed's co-author
there. I guess you didn't describe that as multitask learning, but as you and Isabelle were talking
earlier, like you really are just interleaving like a language model objective with the NER
objective. It's just, you're interleaving is quite artificial because you're doing all of the
language modeling first. So I don't know, I think it's interesting to think about these as similar.
Were there any other interesting highlights from the systems that people submitted?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="25:52">

Yeah. I think what was quite interesting was to see that there was some people doing very well with
just developing some simple features with also rule-based systems. I think the system that did best
on the scenario, which one was it three, or C which is just relation extraction was the system just
using Hearst patterns. It just spent a lots of time developing some really good rules and because
the dataset was so small and yeah, somehow it worked quite well.

</turn>


<turn speaker="Matt Gardner" timestamp="26:25">

I guess the rule based systems aren't dead particularly if you want to build the best system for
some product. Right. I guess a lot of industrial applications still use really simple techniques
even though us researchers like to think that our fancy complicated systems are better in practice
sometimes you can engineer better systems without it.

</turn>


<turn speaker="Walleed Ammar" timestamp="26:56">

I'd say it depends on the domain. If the domain is fairly limited and you expect most of the
examples to look alike to some extent. Yeah, I agree. But there are many examples where this field
basically machine translation is one of them for example, Microsoft had started using like rule
based models and they were not scalable at all. In order to do it for more languages and when you
have access to more labeled data it makes much more sense to use statistical kind of models. And I
think in this particular case, because we don't have much labeled data, that's probably the reason.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="27:43">

Yeah, I completely agree. I would have said the same thing because here we don't have enough labeled
training data, those systems to perform well. So what we should have done really is to annotate more
data,

</turn>


<turn speaker="Matt Gardner" timestamp="27:55">

But that's hard. Right.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="27:58">

Yeah.

</turn>


<turn speaker="New Speaker" timestamp="27:58">

Do you have any ideas on how to make that easier? Is that an interesting problem to you anymore,
like how to scale up this annotation effort?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="28:07">

Yeah. it is interesting to me and we tried to do, I mean we tried to do this, but then in the end it
didn't work so well. One of the things I worked on for my PhD was distance supervision, but you have
a knowledge base consisting of relations. And you try to use this knowledge base to automatically
annotate text that you can then train a model on to extract more relations. And so we tried to do
something similar here, but for some reason it was really, really hard. I think it's because the key
phrases are so long and we didn't have a good knowledge base to start with.

</turn>


<turn speaker="Matt Gardner" timestamp="28:47">

One thing that I've wanted to get a Semantic Scholar team to do is allow researchers to annotate
various things about papers and authors as they use the website. Do you think, Waleed is shaking his
head, cause I don't know if he thinks this is a good idea, but my question for you is, would you if
you had the ability to annotate things on Semantic Scholar, would you contribute at least a little
bit of your time to doing some annotation for a paper you cared about?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="29:15">

I think if I saw this as a new feature, I would be interested and I would do it, but I probably
wouldn't do it, I mean more than two or three times. But yeah, another interesting thing is actually
to let researchers annotate their own papers because they want their own papers to be found by other
people. So they might be interested in annotating their own papers. If you sent them an email
saying, Hey, we now have paper index on Semantic Scholar. Why don't you help us annotate it better?

</turn>


<turn speaker="Matt Gardner" timestamp="29:44">

Yeah, I think that's key.

</turn>


<turn speaker="Walleed Ammar" timestamp="29:46">

We're definitely exploring some of these ideas. Like one thing that we're a little worried about in
the first case is the quality of the data we collect. The model just for like for example, some
people may be adversarial trying to diminish the work of other researchers. When we work on a
product and we get like actual complaints, this becomes a real issue issue. And like doing,
controlling the quality of suggestions is really like a, is that an operation that we cannot afford
to do right now? But we definitely acknowledge the importance of this of these contributions? The
second one I think it's much more reliable. I wouldn't expect Isabelle to tell us wrong information
about her papers. So.

</turn>


<turn speaker="Matt Gardner" timestamp="30:38">

Yeah, that's a really good point. I guess I was a little naive cause I haven't worked on such a
public product like that. Accepting user based annotations cause you're right, you'll get all kinds
of garbage from random people.

</turn>


<turn speaker="Walleed Ammar" timestamp="30:52">

Yeah. We like some of the team members spent a lot of time trying to like come up with ways to do
this quickly, but it was very hard and it was time consuming. It was not a very effective way or
using our time.

</turn>


<turn speaker="Matt Gardner" timestamp="31:05">

So thanks Isabelle for talking to us. Is there anything else you'd like to say about this shared
task? Anything we missed that you think we should've talked about?

</turn>


<turn speaker="Isabelle Augenstein" timestamp="31:14">

There's just one more thing. So in 2018, there will be an SemEval task on information extraction
from scientific papers, not organized by us. But I would encourage you to have a look. So that's
focused on the relation extraction task.

</turn>


<turn speaker="Matt Gardner" timestamp="31:33">

Cool. Great.

</turn>


<turn speaker="Walleed Ammar" timestamp="31:34">

Excellent. Looking forward to it. Thank you, Isabelle.

</turn>


<turn speaker="Isabelle Augenstein" timestamp="31:36">

Thank you.

</turn>
