---
title: "Challenges in Data-Driven Research on Clinical Data - Alistair Johnson"
hosts: ["Waleed"]
guests: ["Alistair","Matt"]
number: 093
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing,

</Turn>


<Turn speaker="Waleed" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Alan Institute for
artificial intelligence.

</Turn>


<Turn speaker="Waleed" timestamp="00:12">

Today we'll be discussing the challenges of applying NLP on clinical data with Alistair Johnson.
Alistair is a research scientist at MIT. His research interests include the application of machine
learning to healthcare, specifically critical care with the aim of improving the efficiency and
quality of the care delivered. He received his bachelor of engineering in biomedical and electrical
engineering at McMaster University in Canada and his PhD in healthcare innovation at the University
of Oxford. Welcome to the program.

</Turn>


<Turn speaker="Alistair" timestamp="00:40">

Thanks for having me.

</Turn>


<Turn speaker="Waleed" timestamp="00:40">

So there are a lot of challenges in applying data driven methods to clinical data and it's mostly
about making the data available. You're an expert in this area and we wanted to get to pick your
brain on what these challenges are and have a better understanding of how can we potentially address
them.

</Turn>


<Turn speaker="Alistair" timestamp="00:56">

Yeah, well, I mean, I hope to be able to give a bit of insight to that. So let's see how it goes.

</Turn>


<Turn speaker="Waleed" timestamp="01:02">

I listed four challenges that I feel are the biggest ones that I'm aware of. But of course feel free
to add to the list or tell me that this is not really a problem. So the first one I think is the
privacy concerns about this, we're talking about data related to human beings who some of them are
alive, some of them are dead, but it doesn't really matter. Could you tell us more about this
concern?

</Turn>


<Turn speaker="Alistair" timestamp="01:26">

So, yeah, when you're dealing with, with healthcare data, this is sort of the chief challenge or
reason or most discussed issue around working with health data and around sharing health data. That
problem that you do not want somebody's personal medical information to be distributed to their
neighbors. It could be very sensitive, it could have social implications it could be used for fraud.
So there's, there's a big concern and a very valid concern around privacy of the medical data. At
the same time, we need to use this data and we need to share this data because the rate at which we
generate evidence in medicine is quite slow, is too slow so far. In my opinion, this is, I'd say the
biggest challenge is the one I'm dedicating my research to. And it's definitely a challenge, but
it's also in my opinion, a solvable challenge. You know, we have methods of de-identifying and
natural language processing is becoming very good. And it's just about accepting that, you know,
this is a problem that we have to solve and then going about solving it in my opinion, a lot of
people will site privacy concerns around sharing medical data and start there rather than, you know,
site these genuine privacy concerns and start to do something about it.

</Turn>


<Turn speaker="Waleed" timestamp="02:49">

So could you tell us more about the de-identification? How do you do it?

</Turn>


<Turn speaker="Alistair" timestamp="02:54">

Sure. So, it depends on the country you're in. In the United States, it's actually more convenient
than some other countries, mainly because the laws that were formed around de-identification of, of
health data in particular, HIPPA, which was an act of Congress, which stipulated this sort of rules
around what information had to be removed.They're very prescriptive. That is to say that, they
actually list out the attributes you need to remove. And if you remove those attributes, the data is
considered de-identified and the data is legally shareable. And that's actually a framework that's
easier to deal with than some other countries say the United Kingdom say Canada, where they don't
exactly prescribe what it means to de-identify. They just sort of vaguely say you should protect
patient information. So at least in the US if you're following the letter of the law, all you need
to do is remove all the attributes that they list in this safe harbor provision of HIPAA. And then
the data is considered de-identified and you can share it. So, depending on the data type, there are
a bunch of different techniques you can use to do that. But that's essentially the name of, of the
game.

</Turn>


<Turn speaker="Waleed" timestamp="04:09">

And what really matters is where the data was collected, not the data. So even though you're in the
US if you're using data through some partnership with an American institute in Canada, you'd have to
follow the Canadian rules.

</Turn>


<Turn speaker="Alistair" timestamp="04:22">

So that is a little bit unclear. But I will say the researchers I know in Canada will actually just
adopt HIPPA because it's prescriptive and because it gives them an idea of what they should do. So
even when we're working with hospitals in Canada, they'll say, okay, let's de-identify it to HIPPA
even though HIPAA has no legal basis in Canada, just because it actually gives you an idea of what
you actually need to do to de-identify the data.

</Turn>


<Turn speaker="Waleed" timestamp="04:47">

And in your experience, do you think the HIPAA regulations are conservative or are they overly
permissive?

</Turn>


<Turn speaker="Alistair" timestamp="04:55">

I think they're very good. So before HIPAA there was a 70's scandal that essentially they were
making some data available and somebody was able to identify a Massachusetts governor using publicly
available health insurance records because the governor collapsed during a very public event that
was published in the newspaper so you could sort of figure it out, and since then they created the
act. They stipulate these fields and I think they're very good. They cover; zip code, birthday. I
think it makes it very difficult to do cross data set link attacks where you say, okay, well I see
this person with a date of birth in this database and somebody has the same date of birth in another
database. So I can figure out who they are. And I think they are very good at handling structured
data.

</Turn>


<Turn speaker="Alistair" timestamp="05:44">

The two areas that become unclear are when you're dealing with longitudinal data, all of a sudden
it's harder to remove time components. So as one of the requirements of HIPAA is that you all dates,
except the year and if their age is over 89, you remove their age. But if you have someone who's
admitted, you know, in 2005 and they're 85 and then 10 years later, now they're 95, it's unclear
what you do. Do you retrospectively delete their age you know, it's no longer clear how you follow
HIPPA in that situation. And I think it's just because they weren't really grappling with that kind
of data back then. So for structured data, I think it would be extremely difficult to re identify
someone from purely structured data. If it's the identified to the HIPAA standard for unstructured
data, it almost becomes a theoretical argument.

</Turn>


<Turn speaker="Waleed" timestamp="06:41">

Do you think there's room for NLP researchers to improve the methods that you're currently using to
de-identify industry unstructured text?

</Turn>


<Turn speaker="Alistair" timestamp="06:50">

Absolutely. I think there's, it's almost, this is clearly my opinion, there is not enough research
in de-identification as a challenge. When we've started looking at it, we're always looking to
improve our methods. It's not even clear what the labeling strategies are for the entities and how
that works because there's just been so little research that a lot of these items are vague. There's
been a few benchmark data sets mainly from the I2B2 challenges, which has now called N2C2. I think
there's one in 2006 and there's one in 2014. And if you look at the difference in the annotations
for what they consider protected health information, it really highlights how we're still unsure how
to even structure the problem.

</Turn>


<Turn speaker="Waleed" timestamp="07:36">

Well thank you. I was reading the MIMIC3 paper that these patients appear in the data base with ages
of over 300 years. I thought that was pretty interesting because you have to like to add a random
number of years to their age.

</Turn>


<Turn speaker="Alistair" timestamp="07:51">

Yeah, that's the decision we made. So it's interesting. There's a lot of different ways you could do
it. But we shifted. It actually used to be shifting their, their age to 200 but then we shift all
the dates to the future to the year 2100 and so if you change someone's age to 200 and then their
date of birth is in the 19 hundreds. So people were actually contacting us saying, oh, but it real
dates of birth, this person is born in 1926 and we would reply and say yes, but if you look, they're
admitted in 2150 so clearly that date of birth so we actually shifted it to 300 to start people, you
know, worrying and emailing us about that.

</Turn>


<Turn speaker="Waleed" timestamp="08:31">

Great. So another direction, I guess people take to address this challenge is, synthesizing medical
records and then work on the synthesize records. Could you tell us more about what people do there?
Do you have any opinion on like whether this is an effective strategy or not?

</Turn>


<Turn speaker="Alistair" timestamp="08:48">

Yeah, so, so there, there are a few data sets. There's Cynthia I think is a famous one and there are
few others. There's a lot of work using the free text notes in MIMIC to generate a synthesize notes
as well. I think it's academically interesting but practically not useful. The only utility in
discussion with, with many people for these synthesize data sets is for making sure the plumbing of
your method is working in making sure that when you're running on a note, it's actually operated
technically run correctly. I think in terms of actually doing research with synthesize notes, I
don't think anybody would do it, and I think every sort of clinician I've talked to and most data
scientists who are sort of in the area say, you know, it's not really that interesting because in
the end you're just sort of training a model to fit the output of another model and they're not,
it's not super interesting.

</Turn>


<Turn speaker="Waleed" timestamp="09:50">

Yeah, it makes sense. I think, I mean there's this clear component of trying to analyze the text
itself and there's a different component of understanding what's happening. Like actually measuring
what's happening in the real world. And obviously we don't want to use the synthesize records to
analyze the real world, but I was, it's not clear to me if it's good enough to analyze to actually
prove our methods for understanding the text itself.

</Turn>


<Turn speaker="Alistair" timestamp="10:15">

It could be, but it feels like you're always bottleneck to the capabilities of that initial
synthesis algorithm, which just makes the entire problem difficult to understand. It makes a whole
lot more sense just to work on de-identifying your notes rather than trying to generate artificial
ones which which are realistic because that's a very difficult problem in itself.

</Turn>


<Turn speaker="Waleed" timestamp="10:37">

Great. Well, so you already mentioned there's different rules in different countries that will limit
your ability to share the data. I was in the panel that you were on which you, were a panelist at
NAACL a few weeks ago and somebody in that panel mentioned that for some reason there's a lot of
medical records that are shared without de-identification or with minimal de-identification in the
Netherlands. I'm curious to know like if you know like such cultural differences, where do you come
from? How are they being used ethics wise? Are we supposed to be using them or not?

</Turn>


<Turn speaker="Alistair" timestamp="11:11">

I don't know about the Netherlands, I can't really speak to that. I think in general a lot I get
frustrated in general at people who say we can't share medical data because we need to protect
patient privacy because it's very true. And I care a lot about patient privacy. I've spent a lot of
time manually curating, MIMIC, you know, improving things to make sure that they don't leak any
information. But many people don't, and they get away with it because they're sharing the medical
data without anybody knowing about it. I think in distributing MIMIC publicly, we have to hold
ourselves to a higher standard. But I think a lot of people essentially don't. And I think a lot of
medical data is shared using sub-par methods because they don't exist. And if you're working at a
company and you have a tight deadline, I think you're just going to make a best effort and, and
share the data.

</Turn>


<Turn speaker="Alistair" timestamp="12:07">

I've actually worked with companies who have sent me data sets which have been certified as de-
identified and, and they're clearly not, and I don't accept it as an excuse that the data is sort of
private that we can't share it. It just means that you're not actually trying. It means you're sort
of making an excuse so you don't have to.

</Turn>


<Turn speaker="Waleed" timestamp="12:28">

Yea, that's convenient to say that, "Sorry. I can't."

</Turn>


<Turn speaker="Alistair" timestamp="12:31">

So I made this point at NAACL and I'll make it again. I showed a figure of a blood pressure trend,
you know, a patient was in the ICU and you had their arterial blood pressure every hour for 36
hours. And I said, can you tell me who that patient is? And clearly you can't because it's not
enough data. And the same idea holds in the notes, right? I could show you a single nursing note and
you would have no way of identifying that patient. And so it's clearly possible to share medical
data, which totally protects the identity of the patient. It's just a matter of where you draw the
line and being careful with, okay we can share this much information but we need to be sure to
remove that and remove these items. That sort of that sort of thing.

</Turn>


<Turn speaker="Matt" timestamp="13:15">

How do you navigate the trade off here? Like there's clearly a lot more utility to having a lot more
information. If I want to do stuff, build some nice predictive model. The more data that it has,
presumably the better it's going to do. So like how do you decide how much de-identification is
enough?

</Turn>


<Turn speaker="Alistair" timestamp="13:35">

Yeah, so there are sort of two thoughts of how you could approach the de-identification that the
first one is you could only include things you know for sure are safe and just delete everything
else and the other approaches. Okay. You can sort of do named entity recognition. You can try and
pick out the things, you know are personal information and delete those. And so the former approach
really restricts what you're getting at because you're removing all the edge cases, you're removing
the rare events, you're removing the sort of interesting corner cases that might be able to be
picked up by an automated method that, that we're not noticing. And so we have taken the second
approach of just picking out the individual pieces of information and it really isn't a well-defined
science in how you do that for the notes we pick out, you know, all the entities and in terms of so
if it's their name, obviously you deleted. If it's their country of origin, maybe you do, maybe you
don't. It's very unclear whether that's protected health information. HIPAA says, well if there's
more than 10,000 people from that country, then you're fine. But at the same time, that's not
factoring in the fact that, you know, they may have visited that country recently, and maybe that's
some information. So, it becomes very unclear and it's just a judgment call that we make and we try
to be conservative with that judgment call.

</Turn>


<Turn speaker="Waleed" timestamp="15:02">

That's fair. I'd like to move to the another challenge in releasing data related to clinical
results. So you have a legal liability as a researcher who released this data set and I'd like to
better understand what these liabilities are and like how do you think about it?

</Turn>


<Turn speaker="Alistair" timestamp="15:20">

Well my PI has all the legal liabilities, so that's, that's a tricky one. So HIPAA actually lays out
the penalties for leaking protected health information and if you do it unintentionally then I think
it's like $50 per individual piece of information. I really don't want to do the math on like 2
million notes and 0.01% fail rate, like how much money that's going to cost. But that's the main
possible repercussion I guess is is that somebody finds PHI reports it to the office of civil
liberties and then they would fine us. I don't think anybody would try to do that. I would hope not.
And it's totally unclear whether that would happen, but the fear of it happening that stays present
in our mind.

</Turn>


<Turn speaker="Waleed" timestamp="16:09">

Is there any precedents that you're aware of? Just like, not for you but, or not for MIMIC or just
in general or just happened?

</Turn>


<Turn speaker="Alistair" timestamp="16:16">

So the interesting point I'd like to raise is any leak of patient information. If there's more than
500 patients, legally must be reported to the office of civil rights and they, they maintain a list
publicly of these leaks. And there's like two a day, I would say. So I think there's quite a few and
there's been quite a few big cases or fines against big insurers because they leak the data. That's
what I'm aware of. We're nowhere near, you know, at risk of that.

</Turn>


<Turn speaker="Waleed" timestamp="16:47">

Because you did the de-identification, is that what you mean?

</Turn>


<Turn speaker="Alistair" timestamp="16:50">

Yeah, because our data is quite well de-identified. I mean it's always in the 99 point something
region, and it's against the Data Use agreement to try to identify someone. So technically speaking,
doing that kind of research would violate the data use agreement. So before you can sue us, we're
going to sue you, kind of. I mean, but, I think the risk, the perceived risk I guess is much higher
than the practical risk cause so far the practical risk of zero, it hasn't happened after 10 years,
15 years. But again, despite that, you know, it's still in the back of your mind.

</Turn>


<Turn speaker="Waleed" timestamp="17:30">

Yeah, it makes sense. So I'd like to move to the next challenge. I am aware of, there's a lot of
different variety in which clinics and physicians document technical data, which we have an
impenetrability problem here. So could you tell us more about this?

</Turn>


<Turn speaker="Alistair" timestamp="17:46">

Yeah, I mean it's not just the provider, it's also across the system that they're using. So we're
sort of unique in that the Beth Israel Deaconess Medical Center, which is the source of our data,
has a custom EHR. I think it's the only hospital in the US which is still running a hospital wide
custom EHR. That's not buying an external vendor. And so they have all these different systems
interacting. And so for radiology reports you actually have a template, that's automatically spun up
that you sort of fill in and they will actually dictate that template and there's software that
automatically converts their voice to text and writes out that report. You can contrast that with
the ICU information system, which launches Microsoft word documents with templates and they fill in
the Microsoft word document and then that gets saved. And then you can contrast that with the end of
their hospital stay when you're writing a discharge summary, which is just a plain text box that
they, you know, copy, paste or type into it's notepad and across these three different domains you
get very different notes styles and that's ignoring the fact that the provider themselves will have
different notes styles. So within the nursing notes, you're saying, some nurses like to document
problems by each organ system and some don't. I don't know anybody who's actually explicitly tackled
it, sort of the variation individual level in MIMIC. It might be an interesting place to do some
research. I think it's an interesting source of variation. But I don't see it really as a barrier to
NLP.

</Turn>


<Turn speaker="Waleed" timestamp="19:27">

But isn't it a barrier to using the methods or models that we built on top using say MIMIC Data set
in a different hospital which does not use the same system?

</Turn>


<Turn speaker="Alistair" timestamp="19:39">

Yeah, possibly. I think it highlights that you need to know a bit about the domain before you start
building the model. So for the radiology reports, so many of the sentences are repeated. They use
the same sentence over and over and over again. There is no pneumothorax and they have those fixed
templates. And so some of the models in that domain have taken advantage of the fact that, you know,
this is a very templated domain where you use a lot of the same language over and over. So rather
than try and train a model just across all the texts, we'll actually have some fixed templates and
the model can decide whether to use a fixed template or write new text. What you're saying is true,
it's, a huge challenge to try and build a model to parse all the notes. But that's not what you
should be doing anyway. Your, model should, focus on sort of an individual domain if you're if
you're sort of working within that domain.

</Turn>


<Turn speaker="Waleed" timestamp="20:32">

I'd like to push on this a little bit. So even if we're talking about a very specific radiology
reports and maybe even for a very specific kind of disease across the different institutes, they
will have different practices in how to document this. And I guess I'm asking if this is the case.

</Turn>


<Turn speaker="Alistair" timestamp="20:51">

Yeah, yeah it certainly is. I think the impact on the models that you build, this is quite unclear.
So at our institute you are required to report on a certain condition within a certain amount of
time. So they are very frequently writing, this condition doesn't exist, this condition doesn't
exist because there's such a strong sort of drive towards quality and making sure that, you catch
that condition if it exists. And I can imagine another institute which doesn't have that at all. And
so if, say you had a labeled data set our labeled data set would have many more negative cases than
theirs because of that incentive. And I think that exists a lot, this sort of bias in data
collection. It's definitely not unique to NLP, or clinical NLP, it's sort of across all of the
clinical domain. And I think it's just something we sort of have to acknowledge exists and you sort
of have to, when you're building the model, understand the, the sort of data generation mechanism
that's, underlying it and making sure like, okay, is this biasing us in some way that, that we
totally throw off of the model if we tried it somewhere else.

</Turn>


<Turn speaker="Waleed" timestamp="21:58">

I see. Are there data sets which kind of combine clinical data across different institutes?

</Turn>


<Turn speaker="Alistair" timestamp="22:02">

Uh, not really publicly, especially if, so I guess I'll focus on, NLP. There are the I2B2 challenges
have some discharge summaries from partners and some from which is, another, Boston area sort of
hospital network. With the notes we have from MIMIC. I would say publicly, I don't think anything
like that exists of a sort of cross institute data set of clinical notes. Of course if you go into
sort of institute specific, then all of a sudden everybody is saying Oh, we have 20 million notes or
whatever.

</Turn>


<Turn speaker="Waleed" timestamp="22:38">

Right. I think the last thing that I wanted to talk about in terms of challenges is when we you want
to have actual labels on not just the naturally occurring data? It's very hard to find qualified
annotators for it.

</Turn>


<Turn speaker="Alistair" timestamp="22:52">

Yeah, absolutely. This is a very common problem. I think it's not really scalable to pay expert
annotators to annotate your data. For doctors, they're so expensive, you'd need a lot of money. I
mean that's what Google did with their "Diabetic Retinopathy" paper, they just threw millions of
dollars at doctors to annotate the data set and it's great for them. But in terms of a sort of
scalable research approach for us and in this sort of smaller universities it's, it's not practical.
The best avenue I see going forward is to look for sort of natural labels of the data. I saw a great
work out of Australia where they were working with x-rays and they were trying to detect fractures
and they used the hospital's sort of discharge diagnosis to label and X-ray with a fracture because
if you came into the hospital you had that fracture and if you came into the hospital for sure we
would catch that fracture before you left.

</Turn>


<Turn speaker="Alistair" timestamp="23:49">

And so they sort of avoided issues around me sort of documenting the diagnosis or not. And I think
we can do, we can do that a lot in NLP as well. We'd have to be a bit clever but sort of labeling
notes, you know, whether the condition exists, not based off the note, but based off some other
piece of information that we can bring in.

</Turn>


<Turn speaker="Waleed" timestamp="24:09">

Make Sense. Did I miss anything? Are there other challenges that you can think of related to making
data available in this domain?

</Turn>


<Turn speaker="Alistair" timestamp="24:16">

I mean, I think there's just the cultural fear that we need to get over. And I think we are also
need to stop accepting people's reasons for not sharing data at face value and we really need to
start pressing them. There are articles that I keep reading in journals which claim they're all for
data availability, all for code availability and then you go to their data availability statement
and they say, oh the data is licensed and you've go to the code availability and they say if you
request it we'll give it to you. And I think that's ridiculous and as sort of as a community, as the
community who is reviewing the papers, we need to just stop accepting that as as okay, we need to
push back when they say, oh you know there's, there's patient privacy, we need to protect patient
privacy. You need to push back and say, Oh but you sate in the paper, you de-identified the data,
therefore should be able to share it because you'd de-identified. There are many papers I've seen
where they state they de-identified the data and at the same time they state they can't share the
data because it's protected and it can't be both at the same time. So we need to really start
pushing people on this.

</Turn>


<Turn speaker="Waleed" timestamp="25:21">

I see. So we talked a lot about during this, our conversation about the MIMIC data set, but we
didn't really explain to the audience what is yj MIMIC data set. Could you tell us like what's the
backstory behind it? How it evolved over the years?

</Turn>


<Turn speaker="Alistair" timestamp="25:34">

Yeah. So I can't take credit for MIMIC. It, definitely, out dates me as an academic researcher. But
essentially it's sort of started as most research projects do as a grand and perhaps naive idea
that, oh, what if we can build a model that can make the decisions a doctor makes. And so the
thought processes, you know, what, we need to get all the data that the doctor sees and then we need
to have the doctor annotate that data very, very carefully and then we'll be able to build the
algorithm that maps, you know, the x's to the y's. And so they do this laboratory for computational
physiology at MIT, led by Roger Mark. And they sort of collected all this data and then presented it
to the doctors to annotate. And the doctors were like, well, we have no idea what's going on here.
We can tell you what our guesses are and what we treated based off the guesses, but we actually
can't really annotate this. And they're like, oh, okay. That makes it kind of difficult. But they
followed up with, you know, but this data is really, really useful. You know, we can, do a lot with
this data. This data set is awesome. So that's sort of where it went. After that, it's like, okay,
well let's start collecting the data and make, this this data set of retrospectively collected
medical data. So MIMIC, MIMIC1 was originally collected on paper and transcribed it filled up one
drawer, happily MIMIC II follow up with electronic data capture, which was much more feasible. So
MIMIC1 had like a hundred patients MIMIC II had something like 30,000.

</Turn>


<Turn speaker="Alistair" timestamp="27:07">

And then I joined shortly before we released MIMIC III where we are sort of continuing to improve
the sort of data collection. So, so MIMIC III, which is publicly available is completely accessible
to anybody. You have to, it's not open data in that it's not, you know, openly available to
everyone. There's a registration and a credentialing process that you have to go through. But after
that you get access to over 40,000 patients data. It's their laboratory values, it's their vital
signs, the treatments they're receiving, and most importantly it's all the clinical notes that are
written during their stay and, and all these patients are staying in the intensive care unit, which
is the sort of a last line of defense in the hospital. So these are all very sick patients who are
intensively monitored and because they're intensively monitored, there's a lot of data which, which
makes it very interesting for our purposes and also they're acutely ill. So there's the opportunity
to intervene sort of immediately and improve their outcome, which is also super interesting when
you're sort of building these sort of machine learning models.

</Turn>


<Turn speaker="Waleed" timestamp="28:16">

Totally. I've seen in the paper 2016 paper on MIMIC III that some courses are using it as the basis
for their coursework. That's pretty interesting.

</Turn>


<Turn speaker="Alistair" timestamp="28:28">

Yeah. There's over 40 or 50 courses now, you know, MIT, Harvard, and I should, I'll try and name all
the good universities so they all like me more but, yeah, it's, one of the, it's really real world
data. So, one of the principles we held to is that we would not pre-process the data before we gave
it to you. You know, we're giving it to you as close to the original data as possible. And so a lot
of these courses are using the data to say, Hey, look, this is how clinical data actually looks.
This is how the notes actually look in real life. They're not perfectly organized, and I think it's
really useful for, for sort of data scientists or clinicians or whoever is learning to sort of see
what the real world is like.

</Turn>


<Turn speaker="Waleed" timestamp="29:09">

Any thoughts on the under-explored ways in which we could use the MIMIC III data set?

</Turn>


<Turn speaker="Alistair" timestamp="29:15">

Yeah, I think there's quite a bit. I think the combining the notes with clinical data I think is a
little bit under utilized. So a lot of people when they do research with MIMIC, they will sort of
just look at the structured data or they will just look at the notes and the won't really mix the
two beyond some sort of very simple, like I pulled out topics from the notes and then I combine
those with some structured data. So think that's a very interesting avenue to move forward. I think
summarizing the notes in some useful way is actually quite difficult with MIMIC. So, for example, if
I'm interested in which patients are on beta blockers on, admission to the ICU, then how I would do
it as a human is I would look through one of the notes, look for medications on admissions section.
There'd be a list of sort of 10 different medications and then I would pull out the ones that are of
interest. And I'm actually not aware of a tool,even though it's a very feasible sort of NLP task,
I'm not aware of a tool that will just pull those out for me. And that's, that's just the start. I
mean there's, there's projects on sort of identifying, the sentiment of people around certain
treatments. So the sentiment of people around alcoholic versus non alcoholic cirrhosis is sort of
interesting. The sentiments around end of life care and, and you know, at what point do we
transition patients from sort of intensive life saving treatment to palliation? That's sort of
something that's purely existing in the notes. It's not really structured, and it's very sort of
loosely written in the notes. It sort of depends on providers for sure.

</Turn>


<Turn speaker="Waleed" timestamp="30:57">

So yeah, there are lots of Phd thesis, to be written.

</Turn>


<Turn speaker="Alistair" timestamp="31:02">

Yeah. For Sure

</Turn>


<Turn speaker="Waleed" timestamp="31:05">

All right. So I would like to ask you, aside from the MIMIC, what do you think clinicians actually
need from the NLP tools? Because you know there's data that's available, there are methods that we
know what to do. Like we do know, we know how NER relation extraction and stuff like that, but maybe
they don't care about all these things. Right? What do they actually care about?

</Turn>


<Turn speaker="Alistair" timestamp="31:32">

So I think the number one thing all clinicians want to do is stop typing stuff into the EHR. They
really want to stop doing that. My PI was still practicing every, every Wednesday and he stopped
practicing because it was so frustrating to input data into the EHR for his patients. It was just
too much. And I actually learned to avoid him the day after clinic because he would be so
frustrated, it would carry over into the next day. And it's like a legitimate problem. All all
clinicians and nurses and then so many people in the medical system are just dumping information
into, this EHR and never, seeing it. So, the things that I think they want is clever uses of NLP
that reduce that sort of burden. So one that we've done at the BI is, for patients that are admitted
to the emergency room, when you type that their chief complaint is chest pain, there is a machine
learning model that pops up, suggestions saying, "oh, are they also complaining of shortness of
breath?" "Are they also of this?" And rather than having to type out all their chief complaints, you
can just very quickly click, oh yeah. And that's a great example of building in some kind of model,
some kind of element that fits into their workflow that improves their workflow in that I'm sure
everybody would be, happy to adopt.

</Turn>


<Turn speaker="Waleed" timestamp="32:58">

I mean it does introduce some biases. It you'd be more likely to remember as a physician mentioned
these things that the model are proposing. Yeah.

</Turn>


<Turn speaker="Alistair" timestamp="33:07">

Yeah. So there, there are some contentious uses of NLP. I know there are some hospitals, I can't
name them because technically this is illegal, but there are some hospitals where they're creating
autocomplete, but the auto complete is designed to use phrases which they can subsequently bill for,
which is, which you're not allowed to do and which the company says that they're not doing. But
realistically we all know that's kind of what they're doing. They're sort of, they have this NLP
algorithm, which is suggesting certain key words that will allow somebody later to review the note
and say, Oh, okay, they were treated for this. We can bill for more money. So there are definitely a
intentional biases which are even being put in the data. I think the best solution to that rather
than just say there are problems, is I think there's this huge disconnect between the data put into
the EHR and the actual utility that comes out of it. So sort of clinician and nurses will document
all this information and then they won't see any value out of their documentation. You know, it
doesn't matter if I put in a blood pressure accurately or if I type it in, you know, technically
it's a legal record and it does matter. But realistically on a day to day basis they see no benefit
in, in high data quality. And once we start closing the loop with these tools where they see the
benefit of, of having high data quality in what they put into the EHR and they see the benefit of
the data that they put into the EHR, I think we'll see people be a lot more accepting of these sorts
of tools.

</Turn>


<Turn speaker="Waleed" timestamp="34:36">

Just to be clear, why are the doctors entering the data themselves instead of the nurses? Just, I'm
curious to know why.

</Turn>


<Turn speaker="Alistair" timestamp="34:44">

It depends on on what the data is. So, at our institute, doctors aren't allowed to document any
charted data like vital signs but they do write sort of notes. They write the summary at the end,
they write treatment plans, that sort of stuff. And like I said, the system that we use pops up
these Microsoft word documents and it's really slow and sluggish and really annoying to use. So,
it's just a part, for some reason it's part of their daily practice that they have to put in all
this different information into these, I will say EHR is designed for billing

</Turn>


<Turn speaker="Waleed" timestamp="35:19">

And the thinking is that some of this data that's required to add is not actually useful.

</Turn>


<Turn speaker="Alistair" timestamp="35:27">

In their minds. No, I mean that's, that's the issue that they're required to add this information
because eventually they'll get billed for it or the hospital will bill for it. So it's really
contentious in medicine whether you can use these billing codes. So a lot of data sets are just
sorta this patient encounter, so, they bill for diabetes, they bill for obesity and they bill for
sepsis. And it's very contentious. Whether these billing codes are useful for research. Actually, I
mean a lot of people do a lot of research with them and I'm sure they are useful for research in
some way, but they are heavily biased towards some conditions make you more money than others. As an
example, obesity according to the billing codes in our data set is around 15% but if you actually
look at people's heights and weights, it's more like 50% and that's just because the Beth Israel
under codes and these conditions because like I said, doctors aren't really interested in writing
all the different sort of chronic conditions associated with a patient in every single note.

</Turn>


<Turn speaker="Waleed" timestamp="36:30">

Yeah, that's pretty interesting. All, thank you so much for sharing all these insights. Was there
anything else that you wanted to share in this episode that we didn't bring up?

</Turn>


<Turn speaker="Alistair" timestamp="36:40">

One thing that will be super interesting for your listeners is, we plan on releasing a, a very large
data set of X-rays with the Free Text Radiology report in the coming month or two that will be from
over 60,000 patients at something like 200,000 different reports. And that, you know, it's going to
be really interesting in terms of a captioning, but for an actual x-ray. So that that will be super
exciting. So look for that coming out in the next month or two, and then eventually linking that to
the clinical record to allow you to make entirely new sort of insights from, from that data.

</Turn>


<Turn speaker="Waleed" timestamp="37:15">

Fantastic. Thank you for the service you and your team are doing for the community.

</Turn>


<Turn speaker="Alistair" timestamp="37:20">

Yeah. Happy to.

</Turn>
