---
title: "Ethical considerations in NLP research, Emily Bender"
hosts: ["Pradeep Dasigi","Matt Gardner","Waleed Ammar"]
guests: ["Emily Bender"]
number: "106"
tags: []
description: "In this episode, we talked to Emily Bender about the ethical considerations in developing NLP models and putting them in production. Emily cited specific examples of ethical issues, and talked about the kinds of potential concerns to keep in mind, both when releasing NLP models that will be used by real people, and also while conducting NLP research. We concluded by discussing a set of open-ended questions about designing tasks, collecting data, and publishing results, that Emily has put together towards addressing these concerns. Emily M. Bender is a Professor in the Department of Linguistics and an Adjunct Professor in the Department of Computer Science and Engineering at the University of Washington. She’s active on Twitter at @emilymbender."
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner, Waleed Ammar, and Padeep Dasigi.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:08">

So today we'll be talking about ethics in NLP research with our guest, Emily Bender. Emily is a
professor at University of Washington affiliated with the department of linguistics as well as the
department of computer science and engineering. She's also the director of the competitional
linguistics laboratory at UW. Welcome to the program Emily.

</turn>


<turn speaker="Emily Bender" timestamp="00:26">

Thank you so much for having me on.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:27">

The reason I know that you're interested in this topic is I'm following you on Twitter and I keep
listening to all your comments about it. So we wanted to talk more. So could you provide an example
of what can go wrong when NLP researchers don't pay attention to ethical consideration? Just to
motivate the conversation?

</turn>


<turn speaker="Emily Bender" timestamp="00:45">

Yeah, I have lots of examples and I think it depends a little bit if we're thinking about what
happens just in the research context or if we're thinking about when the technology that we're
developing in the research context gets deployed. To pick an example of each of those first in the
deployed case, there was a story a couple of years back where a Palestinian man posted a picture of
himself with a bulldozer on Facebook and a caption that said something like, "good morning." And the
automatic translation translated it to something either in Hebrew or English, I forget which
language they were reading it in, "attack them" or "kill them all" or something like that. And the
poor fellow got arrested and detained for a day until the people who had seen this realize their
mistake. So that's already terrible enough. It obviously could have been much worse. And here I
think that the thing that was missed on the part of the company producing the translation was an
understanding of how their technology was going to be viewed by end users. And there's something
called automation bias where it's really easy to assume that because machines are not social
creatures, they are therefore objective and therefore whatever they say must be true. When in fact
we know as developers of the software there's tremendous amounts of uncertainty. And so we have a
responsibility to make that uncertainty visible and actionable at the other end. That's one I think
very well. These examples are all very emotional. But that's an example.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:05">

Yeah, I mean honestly I can relate quite a bit. I have a lot of people, friends who got arrested for
like political reasons and it's really terrible. Right? So I guess one point that is not clear to me
here is whenever I see a translation, automatic translation on, for example, Facebook, it always
says that it's automatically translated, doesn't actually like let you guess. So what do you think
the company needed to say or like provide in addition to this translation or this note for the
communication to be more ethical?

</turn>


<turn speaker="Emily Bender" timestamp="02:36">

Yeah, so it's a hard problem to solve, but I think there's some things that could be done. And so
one thing might be to develop a UI that shows something about confidence, right? We translated this
automatically and we have this much confidence in the translation. And then that would be something
that users over time would see varying. Now of course that has the danger that you get something
that's translated incorrectly with high confidence, but it does build in this notion that, Oh, this
isn't absolute, this is a guess. Right. Another thing would be more transparency about, you know,
what did Facebook think the source language was? And my guess there is that there's not enough
detail around varieties of Arabic, which is actually a huge language family, right? It's not one
language. But if Facebook said this was translated from something they probably just said translated
from Arabic and it's entirely possible that part of the problem was that it was a mismatch between
the actual variety that the original person posting was using and what the algorithm detected or, or
assumed. So that would be a kind of transparency. And that I think we as a research community have
an education obligation to basically let the public know that all of this is fallible. And that's at
odds with the incentives that we have to talk about how cool our research is. Right.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="03:47">

Would it have helped if we also showed, if there's a company that was doing the translation would
have also showed some sort of an accuracy instead of a confidence because if they had a way of
estimating how well they would do say on automated data and if we can show some sort of estimate of
the accuracy and how good the translation system is, would that have happened?

</turn>


<turn speaker="Emily Bender" timestamp="04:08">

Yeah, I love that idea. So that it's not just confidence in this particular example, but over time
with this language pair, this is our estimate of accuracy. That sounds like a great bit of
transparency to include. I also like sort of in this space, if you're looking at speech to speech
translation or speech to text. So I've seen this in the Skype translator. I see it in the Google
home device with the speech recognition step. It will update and change as it goes. And I think
that's a wonderful visual clue to the uncertainty of the machine, right. That when you see it
changing over time, I think that's just a very immediate notion that okay, the first thing it wrote
isn't necessarily right. And so therefore maybe everything is writing isn't necessarily right.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:44">

Yeah. And I know that the US designers put a of effort into trying to weigh different
considerations, but I imagine the can probably put more weight on the ethical side of things. The
conversion I've been involved with in the past in a variety of places did not put that much weight
on ethics. Yeah. Thank you for bringing this up. So now I think you wanted to provide two examples,
one from the industry or like an actual views and another from research.

</turn>


<turn speaker="Emily Bender" timestamp="05:10">

Yeah. So the research actually have, I think three quick examples that all fall under the heading of
setting up a task in such a way that it reifies notions of you can predict X from Y when in fact you
can't. Right. And so these come from published papers and organized shared tasks. So one was looking
at predicting the sentence that an accused person was given from their charge seat, what they were
charged with. And that's the only input, right? And if you think about how a judicial process works
at least in a fair judicial process, there's a few steps in between there. There's additional
information that should be coming in, right? But the system is just going from that input to that
output. A second one along those lines is a shared task being run this year. That's looking at, it
was initially framed predicting intellectual ability from text snippets and there, what was called
intellectual ability was actually IQ scores.

</turn>


<turn speaker="Emily Bender" timestamp="06:04">

And there's tremendous amounts of research showing that IQ scores don't measure what they purport to
measure. So there's a validity problem there between the output label and how it's being framed. But
then there's also this question of what is the set of reasons that would lead you to believe that in
short answer descriptions on some tests, there's enough information to predict even what IQ tests
are actually measuring. And I think that that's a common problem that we have because in our field
we are so hungry for datasets that we find something where there's, you know, from one source we
have data X and data Y. And so we say, okay, well let's set this up. Let us as a task where X is
input and Y is output without thinking through why is that a reasonable task? And I have one more
example of that from a published paper that was aiming to predict faces from voices.

</turn>


<turn speaker="Emily Bender" timestamp="06:50">

So the input is voice recordings and the output is generated images of faces. And again, I want to
ask what is it that makes you think that that information is there, why does it make sense to go
from X to Y? And part of that is just if you start answering those questions, you can quickly see
where the scientific invalidity is. But also it quickly lays out where the various assumptions are
that are going to reinforce different kinds of oppression in society. And if we say, Hey, we're
scientists and we're showing that you can predict X from Y. And in making that jump. We're relying
on all of these, let's say racist assumptions in some cases. Then we are basically using scientism
to reinforce that racism. And that's a, I think another kind of ethical risk that we need to be
aware of, especially as there's so much media attention to the work that we're doing.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:35">

So I'd like to isolate two aspects here. One, the scientific endeavor of finding whether you can or
cannot predict Y from X , from the actual, like the social consequences of having the public believe
that this is doable because I think the first one is actually reasonable in my opinion. And I am
interested in discussing the difference in opinions here. Why don't you think this is an interesting
research inquiry in its own right to see if we can, if it's possible to predict faces from voices or
the other way around or the IQ score from something that people would write. I would find reading
the results of this paper intriguing.

</turn>


<turn speaker="Emily Bender" timestamp="08:12">

So I think that if people are asking, genuinely asking the question, can we predict X from Y and
looking at, well what are the steps? What's the information in X that would allow us to predict Y,
what are the correlations are that we're building on? That's a very different thing from I'm going
to throw a neural net and give it X as input and Y is output in this one closed dataset where there
are undoubtedly artifacts and undoubtedly the neural net can build on those artifacts to do better
than baseline.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:37">

Got it.

</turn>


<turn speaker="Emily Bender" timestamp="08:37">

So those are, it's sort of a mismatch of methodology to question I think.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:41">

Yeah, that makes a lot of sense. I think that bridges the gap in understanding and yeah, if the goal
is to understand the correlation, then it doesn't make sense to throw a neural network at it. So
thank you for providing these examples. I think this provides clear motivation for why we are having
this episode discussing ethical considerations. Shifting to what NLP researchers who this podcast is
targeting. What are day to day? Things that we do commonly, which we should pause and think before
we do them.

</turn>


<turn speaker="Emily Bender" timestamp="09:10">

Yeah, I think we should always pause and think. And I think this is going to be a theme in this
discussion that I think things are moving too fast, but there's lots of different ways of
categorizing the risks of the kind of research that we do. And so I've put together one but I don't
want to say this is the only way to think about it, but I think we can at a high level separate
between risks in the research process. So ways we might be doing harm by carrying out the research
and then risks of the resulting technology. So to the first of those there's things like is our
research process exploitative? Is it exploitative of of say crowdworkers is it exploitative of
graduate students? What is the work we're asking of people and are we compensating them fairly? And
I should say in the case of working with graduate students, are we setting reasonable expectations
of the amount of time someone's actually doing work in a week?

</turn>


<turn speaker="Emily Bender" timestamp="09:56">

Right? So these are related, right? If you have a salary graduate student and you expect 80 hour
work weeks of them, you are not compensating them fairly. But it's another important angle on it.
The second thing is we should think about privacy as we're collecting data. So where are we getting
the data from? And I think that oftentimes people coming from, not fields like anthropology or
sociology or psychology where you start by working with humans and seeing them as humans. But
computer science or linguistics falls into this too where you start by working with speech and text
produced by humans and you think of it as just data. We need more practice in thinking about the
people whose speech and text we are analyzing and you know, are we doing this in a way that's
consistent with those individuals notions of what they thought was going to happen when they said
that thing. So the third thing was what, just what I said before, but in our research process, the
PR step is a part of the research process and that's where those examples that I was coming up with
before about, you know, are we doing societal harm by claiming to be able to predict Y from X is a
consideration under the research process heading.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:55">

Got it. So going back to exploiting people who are involved in the research, right. I think this is
an important problem and it's not clear to me for someone who actually wants to do the right thing,
how can we do that? It's not like straight forward. For example, if I'm hiring crowd workers to do
some annotations, it's not as simple as paying them the minimum wage right? In the U S because they
may come from different countries and we don't have data about what is the minimum wage in each of
these countries. Is the minimum wage, is the right thing, the target or not. Some of these tasks
require more skill. I don't know. Do you have any thoughts on that? If someone wants to, you know,
be on the right, how can they do this without spending, you know, all their time thinking about it.

</turn>


<turn speaker="Emily Bender" timestamp="11:35">

Exactly. You're absolutely right that there's hard questions there. And the last thing you said I
think puts a pin in it that we don't want to have to keep solving these problems ourselves over and
over and over again. So I am not, I don't work with crowdworkers. So I don't have that expertise.
But the idea would be to look to somebody who has thought this through and said, here's what we
developed for our system, we worked with crowdworkers, we know which countries they're coming from.
And we through this reasoning figure that this task was actually going to have to be more than
minimum wage for that country. And here's how we worked it out. And so basically instead of
reinventing the wheel, go look to best practices and then build on those and then always report out
and say, you know, we use crowdworkers for this and following so-and-so methodology, we made sure
that we were doing X, Y, and Z to compensate them fairly. And then that becomes part of the ongoing
practice of the field. And it's not this insurmountable problem each time we start to do it.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:23">

So what's a good venue to put together something like this? These guidelines. Do you think it's like
something that we should be publishing about or is it just like one of the research groups put
together methodology and just put it on the internet and invite other people to comment on it?

</turn>


<turn speaker="Emily Bender" timestamp="12:38">

So it's definitely important that it'd be out there and accessible. And I think that actually having
a peer review step would be even better. And so, you know, a good venue well possibly, so now in
our, you know, the ACL conferences now had just have ethics as a track, right? That's just an
ordinary kind of paper you can submit. I think it could fit under that. And then there's also
conferences in the broader AI ethics space and the flagship in one of those I think is called FAT*:
fairness, accountability and transparency. It was FAT ML in machine learning and then they said,
actually it's broader than that and that's going on this week actually in Barcelona. And so a
conference like that might also be a venue for that kind of a publication.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:13">

Yeah. Wonderful.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="13:14">

Beyond submitting to a specific track would it makes sense to do, I mean I have seen many dataset
papers in recent times include information about how exactly they got it this information from crowd
workers and how much they paid them and how long, if it is on Mechanical Turk, how long each head
took. Would it make sense for reviewers to actually to actually look for this information and if
they, is it a responsibility of the reviewers to look into this information and figured out if there
are any ethical considerations here and include that in the review process?

</turn>


<turn speaker="Emily Bender" timestamp="13:46">

Yes, absolutely. So I think there's, there's two different questions here. One is, you know, someone
could write a best practices paper about here's how you do it and that should be published somewhere
and accessible. And then anytime someone's producing a new dataset that uses crowd workers, they
should be giving information about how the crowd workers were recruited, who they were, right. Are
you, is this, are you collecting Singaporean English? And so you made sure that you found speakers
who are in Singapore. Is that enough because Singapore has lots of, you know, migration in and so
on. And then also how did you compensate them? And yes, absolutely the reviewers should be looking
for that. And in fact I just wrote a review where there was some crowd worker driven research and it
said nothing about compensation. So I asked that, I said instead of saying were they compensated
fairly, I said, how did you make sure they were compensated fairly presupposing that that's
obviously what you would do, right?

</turn>


<turn speaker="Waleed Ammar" timestamp="14:34">

Yeah. Also to applaud the efforts at AI2. So I used to work at AI2 and at some point we realize that
we're doing a lot of work collecting a lot of data from crowdsourcing and we put together a
committee to set such guidelines. I don't think it's public. Maybe we should try to see if AI 2 can
make it more public.

</turn>


<turn speaker="Emily Bender" timestamp="14:52">

That would be tremendously valuable.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:54">

Okay. So let's move on to the next, I think you want it to provide common risks in both the research
process and the outcomes of the research. Do you want to shift gears to the second?

</turn>


<turn speaker="Emily Bender" timestamp="15:04">

Sure. Yeah. So this is risks of the resulting technology. So here this is, we're building something.
And we are motivating it in the introduction to the paper by saying we're going to solve this
problem in the world, right? So we're certainly imagining that it's going to be deployed and out
there. And I think there's some questions that we can ask ourselves along the way to help guide our
valuable research time to technology that's going to have positive benefits or on balance positive
benefits rather than just, Oh well this looks like a fun thing. There's some data here. So I'm going
to work on that. And then stumbling into problematic things. So we should ask ourselves, if we
deploy this, do we run the risk of amplifying existing biases in society? And the answer is almost
always yes. So then the question is, well, what can we do about it?

</turn>


<turn speaker="Emily Bender" timestamp="15:45">

How can we mitigate that? And so some examples here are in Safiya Umoja Noble's work Algorithms of
Oppression. It's a 2018 book. She documents how search engines, which sort of present themselves as
being an impartial window into the internet, actually reinforce systems of oppression. And her
starting example is she had her stepdaughter and nieces over and was looking for some activities for
them to do and typed in the key phrase "black girl"s thinking to look for you know, activities that
black girls might be interested in and of course landed on a bunch of porn sites that's been fixed
since she started documenting it and pointing it out. But it came about because probably the way
language is used on the internet and Robin Spear points out that a lot of the web is porn correlates
words with other things that you aren't necessarily thinking about as you are developing the
software.

</turn>


<turn speaker="Emily Bender" timestamp="16:33">

And so it's really important to test for things like this. Another early example is Latanya Sweeney
documents in a communications of the ACM paper from 2013 called Discrimination in Online Ad
Delivery. How if you search at that point for names that sound African-American as opposed to names
that sound like they belonged to white Americans, you get different versions of this ad about
background checks. And so she discovered this when someone was searching for her to find her
research and put in her name and up on the sidebar up popped has Latanya Sweeney been convicted of a
crime, which you can imagine would be a terrible thing if you are applying for a job somewhere. And
so someone types in your name to try to find your research and they get the subliminal message that
maybe you're a criminal. So these are examples of amplifying existing biases in society that you
know, if the technology is broadly used, you have to be very careful about.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:23">

Yeah, these are really hard questions because the incentives that come into play for advertisers and
have little to do with ethics. Right. And I wonder like I don't, I don't expect you to give us like
a solution for all the ethical problems. So I'm not gonna ask this question. Yeah.

</turn>


<turn speaker="Emily Bender" timestamp="17:37">

The first step is to be aware of them and then to not look away. Right? So this is the first step of
solving things. If you're not even willing to look, then you can't help at all right. So that was
the first category. The first category was amplifying existing biases society. And the second one is
can be used unintentionally in harmful ways. And I think my example about the translation failure is
an example of that, right? Nobody was trying specifically to use the machine to weaponize the
machine translation. You can argue about the motivations of the people who read that translation
then took action based on it, right? But don't necessarily support those motivations, but they
weren't deliberately trying to hurt someone with machine translation. Another example is these
companies that are proporting to provide virtual interviewers that make decisions about people based
on their voices.

</turn>


<turn speaker="Emily Bender" timestamp="18:21">

And this is, you know, meant to solve the problem of there being too many applicants. And so the
poor screeners can't get through them fast enough. Or maybe it's trying to say, well, the machine
would be more objective than a human. But you can imagine if you are being interviewed by this and
your language variety doesn't match the one that the system was trained on, which is likely to be,
you know, one of a small handful of standardized varieties of English or maybe a couple of other
languages, then you're going to get knocked out of the running right away cause it can't even
understand you. Right. And similarly, if you've got systems where you have to go through a voice
dialogue system and your speech patterns don't match it's range, then you're not gonna be able to
have access. So what if, and this hasn't happened to my knowledge, but what if someone puts ASR in
the loop in the 911 system, right? And you've got someone who, like my in-laws for example, speaks
Indian English and the nine one one system is not ready for Indian English. Right. I definitely do
not want them unable to contact 911 because a stupid machine can't understand them, you know?

</turn>


<turn speaker="Waleed Ammar" timestamp="19:22">

Totally. Yeah. And I honestly, I can relate to this because like many people who are not native
English speakers already have trouble communicating with people who are taking the phone calls even
without having any inflammation. So it's only, it can only get worse. Well that's not true. I think
it may be better, but only if people who are building the N>P technology actually have this in mind
to your point.

</turn>


<turn speaker="Emily Bender" timestamp="19:43">

Exactly. Exactly. It needs to be tested. And then a fourth example there is if you've got hate
speech filters built in to say social media, right? That's definitely coming from positive
intentions. We want to reduce toxic discourse online. So we're going to put in some automatic
detection for hate speech and then enable the software to take some action based on that. Maybe it's
just flagging it, maybe it's saying, no, you can't post this, you have to rephrase or whatever. And
if that is designed in such a way that it catches, for example, a lot of false positives that are
actually people talking about their own experiences as the victims of hate speech, then it's going
to have some negative side effects that are particularly harmful to already marginalized groups. So
this is all examples of something being used widely and causing harm, but it's not being used
maliciously.

</turn>


<turn speaker="Emily Bender" timestamp="20:33">

It's just sort of a side effect. Right? Third category is technology that can be used on purpose in
harmful ways. So you might remember the Tay chatbot that Microsoft deployed and then had to take
down in 24 hours because users trained it to be spewing all of this hate speech. So that was
definitely intentional. I think that the automatic prediction of sentences from charge seats example
from before could easily be used with you know, malicious intent surveillance systems based on
sentiment analysis of social media. We're going to go find people who are unhappy and unhappy with
the government and you know, try to oppress them further. You could imagine systems that are trained
to detect different styles associated with LGBTQ identities. And then running that over text and
outing people who didn't think they were performing that identity in say the Twitter public space,
but only over in some close chat rooms say. And then finally you could imagine people using the very
powerful, very fluent sounding language models to produce fake news and then distribute it as if it
were real news. And there I think the main harm is not so much that people are going to be taken in
by any particular example because they are basically random. But it could lower people's overall
ability to go find reliable information by just flooding the zone with fake news. So there's lots of
potential for actual deliberate harm as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="21:49">

I think I mentioned in our conversation, right, that's not clear to me how any one person or any one
group decide if a methodology they're taking or the actions they're taking to avoid some of these
biases is working. So there is this distinction like in NLP at least we tend to do like empirical
work because you know, it's easy to evaluate and a lot of the problems that you're discussing are
not easy to evaluate because the effects are very nuances and there are so many factors that come
into play. It's not easy to measure the outcome. It's not clear to me what is a measurable outcome
that we can agree on.

</turn>


<turn speaker="Emily Bender" timestamp="22:25">

Yeah. I think that we are never going to be able to claim that we have solved any of these problems,
right? It doesn't, it doesn't fit that sort of a mindset. And so what do we do? Well, the first
thing I think is this really helpful slogan to hold onto that I learned, from the value sensitive
design researchers here at UW. So Batya Friedman is the leader of that, which is progress, not
perfection. That we have to be comfortable that we can never fully solve any of this, but it is
still worthwhile to try to make it better. And honestly, that's true in everything we work on in
NLP, right? When we say a problem is solved, it's because we've gotten to, you know, 99% accuracy on
the standard test set. Right.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:04">

So I think what you're saying is currently you think the researchers working in NLP don't spend
enough time thinking about this problem in the first place and we're not trying to solve the problem
necessarily, but we're trying to get more of us think about it and spend more time thinking about it
and you don't want it to be, you don't think it should be 100% of our time. Obviously it should be
something that we deliberately discuss and think about.

</turn>


<turn speaker="Emily Bender" timestamp="23:26">

Yes. And that we plan time to think about that when we're planning the next research project. We
actually build in time to think about, okay, who are we going to talk to to understand how this
technology interacts with society? Who are we going to talk to to understand how we get the best
practices for working with the crowdworkers? Who are we going to talk to to understand what's
actually in the dataset that we're building on so that we responsibly talk about how it could
generalize. Like there's also a scientific validity thing in there, right when we have, we train and
test systems based on specific datasets and then we sort of claim that we've solved the problem in
general or that we've done this well and the problem in general when in fact we've done this well on
the problem in English for this genre, for speakers from this era talking about these topics and we
don't really know that it generalizes beyond that.

</turn>


<turn speaker="Emily Bender" timestamp="24:09">

So by building in time to ask those questions I think is important. And then also allocating time
for talking to the public, which is why I'm, part of why I'm delighted to be doing this podcast. I
know that this is the main audience is people in our community, but I think that it is very
worthwhile for us to put time into talking to the broader public because in many cases what's needed
is not just, you know, the Goodwill and the hard work of all of the researchers. And companies, but
actual regulation and we aren't going to get that regulation unless we have an educated public that
knows to push for it and is able to educate their legislators as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:43">

Yeah totally, so I'd like to make sure that we have time to discuss a set of guidelines that you
compiled and shared few months ago for directing the efforts of research groups.

</turn>


<turn speaker="Emily Bender" timestamp="24:52">

I think I want to sort of put a little bit of context around them, which is that these questions
alone, they're focused very narrowly on task development and there's some other things that they
should go side by side with and in particular, so I've got three high level questions. Am I treating
the people involved in the research process fairly? That's the crowdworkers and privacy
considerations that we talked about. The second one is am I accurately representing the range of
speakers that my system should generalize to or whose biases my system might have picked up? And
this is coming out of a whole bunch of work that happened largely in 2018 around documenting
datasets and models trained on datasets so that people who pick up those models know what they're
getting. So I wrote a paper with Batya Friedman and we called it data statements and it was focused
on NLP datasets Timnit Gebrui, et al. at roughly the same time developed something called data
sheets that was looking across machine learning more broadly and Margaret Mitchell and others
published in FAT* 2019 developed something called model cards. And these are very similar ideas of
basically. When we hand along a dataset or a model trained on a dataset, there's a whole bunch of
detailed metadata that should go with it. So with those things in context, then there's also this
question of when I am designing a task or what I'm choosing to work on a task, does it make sense?
And that's what these questions are about.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:05">

So basically these are a set of questions that if I'm going to propose a shared task in some
workshop or create a dataset and put it in a paper, I should try to address both while designing the
data and when I'm disseminating the work.

</turn>


<turn speaker="Emily Bender" timestamp="26:20">

Yeah, exactly. And we should expect to when we're reviewing work that people have done this. Right.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:25">

Right. And in your opinion it should be ground for rejection if some of these are not addressed.

</turn>


<turn speaker="Emily Bender" timestamp="26:30">

Yeah, exactly. Just like used to be in ACL papers that you didn't have to have evaluation on held
out data or you didn't have to have a standard metric and then we came around to, well no actually
we can't really learn from what's going on here if we don't have held out data can see it
generalizes and metrics that are either, you know, well motivated elsewhere and just picked up where
the paper's motivating the metric is. I see this as similar.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:50">

No, I agree. I think one challenge here is that it's very subjective. Like whether someone is
actually addressing any of these concerns or not. And I think it will largely depend on whether the
person reviewing the work actually spends themselves enough time thinking about it. Right?

</turn>


<turn speaker="Emily Bender" timestamp="27:05">

Yeah, but that's true for everything about what we review. Right. You can say that certain parts of
it are more objective, right? If someone has made a mistake in one of their equations, you would
expect multiple people who know enough to pick that up the same way. Right. But I think also if
someone has, you know, completely glossed over the fact that there is socio-linguistic variation and
the system that they've set up where they think it's detecting intelligence is actually detecting
language variety based on socioeconomic status. That's not a subjective thing. That's a question of
knowing something about socio-linguistics and knowing about power and financial capital and social
capital all correlate with ways of speaking that relate to the education system and on and on and
on. This isn't subjective. It's just not taught in classes that are typically taken by computer
science students.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:50">

Yeah. Fair. I want to focus on one distinction between trying to be fair and addressing the full
spectrum of people who may benefit from a particular technology and making a proof of concept or
doing a step in research where you know like any one group or any one researcher is not expected to
solve the problem. Right? I think we kind of started with a narrow problem statement and in the
future other people, if this turns out to be an interesting and useful outcome, other people can
build on it and build a wider scope.

</turn>


<turn speaker="Emily Bender" timestamp="28:22">

You and I are both looking at these questions but we haven't said them out loud yet. So for the
listening audience would probably go through the questions. I think they fit in well in both of
those contexts, right? So the first question is: How does the output of the machine learning task
relate to the information it's framed as predicting? And a lot of this has to do with, you know,
that motivation that goes in the introduction. This is an interesting thing to try and do with
machine learning because we want to be able to predict X. Right? But the actual output label
frequently isn't directly X, it's some proxy for X. And so it's worth sort of stating explicitly
what that connection is. Why is this a reasonable proxy for X? Second question is: Does the input to
the machine learning task plausibly contain enough information to predict the output? And this is,
am I doing thoughtful science here or am I just picking up a set of numbers, calling it data and
throwing a neural net at it? And I think that, you know, in our guise as reviewers, we want to be
valuing and rewarding the thoughtful science

</turn>


<turn speaker="Pradeep Dasigi" timestamp="29:17">

We should probably also be concerned about whether the input has any more information then we want.
Right? I mean, sometimes it's possible that the inputs have unintended correlations with things we
are not interested in or that we actually avoid the model from being classified. Right? So that's
probably, is it?

</turn>


<turn speaker="Emily Bender" timestamp="29:33">

Yeah, absolutely. And when we're talking about language data, that is always going to be the case.
Language carries so much information. So if we're claiming that our model is able to predict Y from
X because of a certain thing in X, we have to be able to make the argument that it's not all those
other things in X, right? Then: What are the intended uses of this technology? And you know,
depending on what you're working on, it can be very, very far away, right? If you're doing sentiment
analysis, you can pretty quickly talk about uses real world deployment of sentiment analysis. If
you're talking about, let's say, parsing to predicate argument structure, that's got an enormous
range of uses. And so this question becomes, I think less pointed, you know, this is at first in the
reviewing process, I could imagine that there's going to be some misses where people say, well, you
didn't tell me how your predicate argument structure parser was going to be worked.

</turn>


<turn speaker="Emily Bender" timestamp="30:18">

You know, you're going to be used. And then it's like, okay, yeah, but that's less directly relevant
here. But what are possible misuses of this technology and how can they be minimized? And that might
be a question of we build this thing that allows us to detect hate speech and it could be misused to
curate and promote hate speech as opposed to trying to minimize the amount of hate speech in some
platform. And there sometimes the solution, the how do we minimize these risks isn't actually in the
technical stuff. It's in regulation. Right? And it's saying if this becomes robust, widespread
technology, then in order for it to have benefits to society, it's going to need to be regulated
along these lines. And that, the people who have expertise to build those regulations are lawyers,
but the lawyers don't necessarily know what the technology can do.

</turn>


<turn speaker="Emily Bender" timestamp="31:08">

And it's on us to say this is what can happen. Now let's try to build the societal structures that
prevent that from happening because we also want these beneficial applications of this technology.
So if the technology is working as intended, who might be harmed and how, and if it's not working as
intended, who might be harmed and how. And then here are the example of a hate speech filter, sort
of suppressing the voices of people who are trying to talk about their own experiences as victims of
hate speech is a good example. And then finally looping back to my point above about you know, what
is this based on? Let's document the data thoroughly so that people know when they've picked it up
and they go work on the next thing. Have they taken a dataset that was collected from college
students in the United States and then they're trying to deploy a system based on it in, I don't
know, Lagos to do named entity recognition in tweets or something. You need to have good matches
between training data and deployment and you're only going to be able to get those good matches if
there's documentation about where the data came from.

</turn>


<turn speaker="Waleed Ammar" timestamp="32:05">

Yeah, that makes a lot of sense. I think all of these points are important to mention in our
proposal to think about. The thing that I'm struggling with a little bit here is how can we make it
interesting for people to actually care, right. I think like so from the perspective of someone
who's actually doing the work and who realizes the social responsibility, I think it's important,
but in order for this to be done at scale, I think we want to align the incentives somehow. And I
think this goes back to your point earlier, that if the reviewers of our peer reviewed work care it
enough then they would have a stronger incentive for everyone to adopt it.

</turn>


<turn speaker="Emily Bender" timestamp="32:43">

Yeah, absolutely. So I think bringing it into reviewing is important. And I think also, not
necessarily just focusing on, but highlighting the aspects of the discussion where it really isn't
just about, you know, social justice, which is really important, but it's actually about scientific
validity as well. All right. We're talking about how well do systems generalize, we're talking about
the actual validity of the tasks and the applicability of system output in many of these cases. And
it's not just you know, this set of concerns that might seem peripheral or outside of the purview
for someone whose primary expertise is in model building say all right, it's, it's about, you know,
is this experiment that you're doing actually showing what you think it's showing and is it working
the way you think is going to work? And one of the things that I'm really interested in doing, and
I'm, we haven't gotten started yet, we're still seeking funding, but I'm with some colleagues
including Bernease Herman, Brandeis Marshall and Hal Daumé III.

</turn>


<turn speaker="Emily Bender" timestamp="33:35">

I'm working on designing shared tasks with evaluations that take into consideration not only the
percent match against the gold standard, but actual things like differential impacts of different
kinds of errors and who's most likely to be harmed and rolling that into the evaluation metrics so
that when somebody is working on this and they are in the thick of the hard work of saying, well,
let's see if I improve my model in this way or I changed the training regime in that way, how does
that affect my results? It's right there in the mix as you go. Rather than being a separate thing
that you think about maybe before and after.

</turn>


<turn speaker="Waleed Ammar" timestamp="34:06">

Yeah, that sounds really exciting and it will directly address this point of incentive here.

</turn>


<turn speaker="Emily Bender" timestamp="34:10">

But then the other thing I want to say is that we should look to all of the people in the humanistic
fields. So everyone doing digital humanities, everyone doing you know, psychology, sociology who
think of themselves primarily as interested in people and systems of people, but have had to learn
statistics for running experiments and they've had to learn, you know, programming to be able to do
their digital humanities methods. I think conversely, people who start in the programming and math
world need to learn some of the skills from these other fields about evaluation methodologies that
don't necessarily result in numbers or numbers compared to a baseline. And that's scary, right? We
all have expertise. We all have our training and we're sort of in our comfort zone, but sometimes
the tools that we need come from someone else's expertise and there I think we will make true
progress faster as opposed to lots of publications faster if we do more interdisciplinary
collaboration, for example, with colleagues in human computer interaction, human centered design and
engineering, science, technology and society, sociology, anthropology, psychology, et cetera. I
think that de siloing is going to be an important part of this as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:15">

Yeah, that makes sense. There's also like, since you're mentioning how other fields are like
addressing these questions, you know in medical research they have IRB boards, I don't remember what
it stands for, but essentially their job is to review both the ethical and scientific validity of
the research that's being done and it's like it's a systematic solution, every like larger
institution would have an IRB board and the work needs to pass IRB review before it's published. Do
you think it makes sense to implement something like this and it'll be, or an ML research,

</turn>


<turn speaker="Emily Bender" timestamp="35:49">

So it might, I think it's worth stepping back a little bit to see you. Why institutions have those
IRBs, and it's partially because of, you know, really harmful work that was done in early medical
science, right? And society as a whole said, we need to make sure that this doesn't happen. And so
we have IRBs at universities in the United States because if we don't, we can't get federal research
funding, right? There's some regulation that's behind that. It's not just that everyone at the
university feels particularly strongly about this, but there's, there's regulation and there's a
really interesting disconnect between the way people in computer science do research and the way
most of the other sciences do, right? If you think about what it takes to actually carry out an
experiment in biology or particle physics or if we move to the social sciences, psychology or
sociology, you have to come up with your careful plan.

</turn>


<turn speaker="Emily Bender" timestamp="36:40">

And if there are people involved, then there's the IRB and then you do the actual, you know,
sampling of your cultures or you know, harvesting of plants or observing part of the night sky or
whatever it is. And that takes time. And then you analyze the results in computer science. We have
this really strange and linguistics also because of the way we collect our data. Some of us, we have
this really strange scenario where we can say, huh, well what if I just threw that model at that
dataset and you can do an experiment on this timescale that is ridiculously fast and it right now
brings money and prestige to the field because it's making a certain kind of progress look fast, but
it also makes it even harder to imagine making room for some of these things. And I think that it is
important to build in the time for carefully thought out experiments that are then reviewed
somewhere. Maybe it's in task design, maybe if you're just picking up a task that someone else's
designed, you can rely on them having gone through the review process for example, but building it
in somewhere and I think it'll make us feel better about building it in if we look to our colleagues
in other fields and see what doing science looks like for them as opposed to what it looks like for
us.

</turn>


<turn speaker="Waleed Ammar" timestamp="37:47">

Yes. Well thank you. I think this has been a very interesting conversation. We're almost out of
time. Is there anything else that you wanted to bring up that we didn't already discuss?

</turn>


<turn speaker="Emily Bender" timestamp="37:56">

I think we managed to cover it. I guess the remark that I'd like to end with is that we should slow
down the pace and it will be good for everyone. It'll be good for the society that benefits because
we will have done more thoughtful software creation and it will be good for us as researchers
because we'll have better work life balance.

</turn>


<turn speaker="Waleed Ammar" timestamp="38:14">

Yeah, thank you. I don't know if all the grad students out there will find it easy to change their
mindset. I know that I was much more in a rush when I was a grad student because you know, fears,
competition and there's a need to publish often I think it's gonna take time for this culture of
change to happen. But I do agree with you. I, and I hope a field will slowly go a little bit slower.

</turn>


<turn speaker="Emily Bender" timestamp="38:36">

Yeah, I hope so too. And I hope that the people who are established take the lead in making that
change rather than pushing their grad students. And adding the stress, basically finding ways to
make space for their grad students to do more thoughtful work and more impactful work.

</turn>


<turn speaker="Waleed Ammar" timestamp="38:49">

Yeah. I do want to thank you on this note because I know several of your students who when you're
not around, would commend you and how much care you put in designing the deliverables so that people
don't have to work in holidays and things like this. So I think it's very well perceived. Thank you
for taking the lead on this and being more proactive than most.

</turn>


<turn speaker="Emily Bender" timestamp="39:11">

Oh, I'm glad to hear that and I hope that, I hope that more will follow suit.

</turn>


<turn speaker="Waleed Ammar" timestamp="39:14">

All right. Thank you, Emily. It has been a pleasure having you.

</turn>


<turn speaker="Emily Bender" timestamp="39:16">

Thank you very much.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="39:17">

Thanks Emily.

</turn>
