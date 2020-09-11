---
title: "Leaderboards and Science, with Siva Reddy"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Natalie S."]
number: 080
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
Artificial Intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:12">

Today our guest is Natalie Schluter. Natalie is an assistant professor at the department of computer
science in IT University of Copenhagen and the head of the program for a new data science degree
offered at the university. Her main research is in theoretical computer science and its applications
in NLP and data science. Welcome to the podcast, Natalie,

</Turn>


<Turn speaker="Natalie S." timestamp="00:29">

Thanks for having me.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:30">

So today we're going to talk about your paper published at NLP recently titled The Glass Ceiling in
NLP: A Reference to the Unethical Barrier that Denies Highly Achieving Women from Accessing More
Senior Roles in the Research Community. Could you start by telling us the motivation for you to
study this phenomena in a quantitative way?

</Turn>


<Turn speaker="Natalie S." timestamp="00:48">

That's the thing. It's not really my area. I mean I'm a data scientist. I'm interested in in
different problems. But my main area of research obviously is NLP the field and not a meta analysis
on the people in NLP. But I had been hearing, I mean I've, I've known the struggles that I have been
going through, but for me that was just anecdotal. And then in recent years I kept hearing that
actually there wasn't any problem when we compared computer science to NLP; that NLP was doing well,
that there was no problem for female researchers. And I had heard about this really amazing model
for describing power inequality in mentor mentee networks. And I thought, well, why don't I just see
what's actually happening in the NLP comunity using that.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:42">

Yeah, that's very intriguing and it's a very good time for doing this because like there's more
awareness about gender inequality in all sorts of domains and it's definitely an important problem
to study. How did you actually study this? You looked at the mentor/mentee relationships in
authorship, in paper authorships and the ACL ontology. Could you elaborate on how this works? What
are the main building blocks for doing this analysis?

</Turn>


<Turn speaker="Natalie S." timestamp="02:04">

The main thing is that we have this pretty steady proportion of female research here in our
community and it looks not so bad. It's around a third of the researchers that are female. And
that's in comparison to the computer science general field, which is maybe down towards 20 or even
the current statistics is ess than that. But one thing that this number, this very basic proportion
of female researchers didn't account for was the dynamics of power. So not only should we be looking
at how many females are actually in the community, but are they rising to positions of seniority in
the field? Looking at mentor, mentee relationships by checking out who has published together is not
a new thing yet. And so it's a, it's quite a regular thing that's done in the network analysis and
network science communities where in many fields like ours in general, we tend to publish with a
mentor starting out.

</Turn>


<Turn speaker="Natalie S." timestamp="03:13">

And so as the, new person on the scene possibly doing most of the dirty work in the research, we
would end up with our name as the first author on the paper and with our mentor or supervisor,
research advisor, PhD supervisor with the last position in the list of authors for the paper? Now,
just having your name as a last author on a single paper as possibly questionable. So I thought,
well maybe if I consider having one's name on more than one paper, maybe two, maybe three, maybe
there's some threshold that I can be sure of counts as. Okay. Now I'm actually a mentor. This is
when I came up with looking at seniority at threshold T. So up to near the at threshold T means that
I've had my name at that senior position on a paper for T papers.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:08">

So one distinction that's not clear to me is whether you have a note for every mention of an author
name or do you consolidate all the multiple mentions for the same author name?

</Turn>


<Turn speaker="Natalie S." timestamp="04:18">

I tried to consolidate them that I do some main normalization. So, for example, I lowercase
everything. I, sorry everybody, I take away accents out of the name because I found this to be not
very regularly done in the, in the author and the oncology. I also take off things like senior and
junior. I'd remove middle names. Sorry again. So I do some, some dirty work, but there are a few
things that I have to throw away. In the end, I have to throw away authors whose first name isn't
given. So if it's just an initial, because I can't be sure who it's referring to. And then when I'm
taking all of these names, so these sort of normalized names that I've consolidated, I have to
actually annotate them for genders. And I use a bunch of different lists for genders of first name.
So I plug these lists automatically whenever the name's not ambiguously male and female. So I ended
up with about 3000, over 3000 names that I couldn't annotate automatically. And for those names. I
actually just went through on a Google image search and tried to categorize the names by hand as
being male or female, but for still around 1600 names, I couldn't tell what the gender was and I had
to throw them out of the, of the dataset.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:45">

Right. So my name's like Jesse would be one of the throw no eight, right?

</Turn>


<Turn speaker="Natalie S." timestamp="05:49">

No, not necessarily. I mean unless there's two people maybe. So you said Jesse knots,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:56">

You'll also look for last name as well

</Turn>


<Turn speaker="Natalie S." timestamp="05:58">

For the last day. So it was mainly a, actually the majority of these names were probably Chinese
names, which when you spell them out and what our Western alphabet that the, the names, well, I
think some of the names are genuinely ambiguous, but of course there's no tones on these Chinese
names when we saw it. So they're even more ambiguous than before. So quite literally I would have
two names, first and last name and search for NLP with it and up would come, a female researcher in
NLP and a male researcher in NLP. And you just couldn't tell what was referring to what.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:34">

Okay. And then you, depending on the threshold, do you use the, you vote different graph to
represent this relationship and you draw a link an edge between two authors if they appear as first
and last.

</Turn>


<Turn speaker="Natalie S." timestamp="06:45">

That's right. So first and last and then you get into my network.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:48">

So that's like the setup for how to construct the raw data.

</Turn>


<Turn speaker="Natalie S." timestamp="06:52">

So I mean I ended up constructing this network but I, I mean I started off with like just some
really basic data analysis. I wanted to first just look at the proportion of female and male mentors
and just see, so you remember I have this, we have this number, about a third of the researchers in
the field are female. I wanted to look at the proportions and see if they were steady as is this
general portion of males and females. Within the females, is the proportion of mentors similar to
that of of male mentors in the male population? So that's the first study I carried out and what I
showed. So if you look at different levels of a mentor, so seniority at different thresholds. T I've
showed that actually this well, the data showed that this, there's actually a rising gap in the
proportion of male mentors and female mentors.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:50">

And this is the ratio between males who had this many papers as last authors among all male authors
on that year or ever.

</Turn>


<Turn speaker="Natalie S." timestamp="07:58">

This would be a cumulative number. So if you had, so if in 1995 you had seniority seven then the
next year you would still have seniority seven. This is sort of cumulative number over time.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:15">

So the proportions are, as you pointed out in the paper, like the rate at which the increased
sometimes is stable. But recently you've seen a lot of discrepancies.

</Turn>


<Turn speaker="Natalie S." timestamp="08:25">

What do you mean?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:25">

I remember reading that earlier time that they were close.

</Turn>


<Turn speaker="Natalie S." timestamp="08:29">

Yeah, exactly. So this seemed to, maybe around 2000 early two thousands this gap in proportions
starts to close in, so they start to become more equal and then all of a sudden the gap widens up
again, which is probably following some of the changes in, in mainstream, in our, in our domain
since we have such an interdisciplinary domain. So this hasn't been checked out at all, but we all,
we all kind of remember the mid two thousands as when basically everything became machine learning.
So there are some hypotheses to check out in those numbers.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:12">

I'm still trying to unpack a little bit this result. What your data shows is that the proportion of
mentors at various threshold values increases over time from like if we say that the threshold is
two papers, so a person has to be the last author on two papers to be considered a mentor. The
proportion goes in 1995 from 3% of people who meet the mentor designation to 7% of people who meet
the mentor designation. Sorry. These, these males and females, it's 3% to 6%. Why the increase in
the first place, like what, what's going on here? Why is this, why is the proportion of mentors
increasing at all?

</Turn>


<Turn speaker="Natalie S." timestamp="09:54">

Oh, well, I mean there could be many factors in this, but I definitely don't study the field and the
impact as a meta researcher of an NLP in the in the world, but I would guess that the field is
expanding, that people are recognizing NLP to become a field of its own. That we're taking up more
space in computer science department, maybe taking up more space in big data companies for reasons
like this.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:26">

Yeah. Okay. That, that makes sense. And I guess another interesting thing I would point out just
from the data itself for leaving aside the gender issues for a minute, it sure looks like this
proportion has leveled out in the last seven or so years, which is also interesting. I guess this
kind of supports what you were just saying. Like the way I, the way I read this is that maybe the
field matured and has been like at in a steady state for the last decade or so. Is that basically
your understanding too?

</Turn>


<Turn speaker="Natalie S." timestamp="10:54">

I don't know about a steady state, so I don't know exactly what that would mean, but I would hope
that people have become a little bit more aware of these gaps and of diversity problems in general
and they have become appreciative that actually there does need to be several different segments and
in this discipline and to maybe take more care that they aren't having. So if you look at the last
graph in the figure that you're referring to, the flattening out doesn't exactly happen there. So
I'm not sure if we can totally conclude that something is becoming stable and I think we should be
really careful to observe that the proportions are still not becoming equal. I mean, so males are
continuing to have a larger proportion of their population as mentors in our field and I think we
still need to examine why that's the case.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:57">

Yeah, yeah, definitely. I wasn't trying to say otherwise. I was like, you, you have a bunch of
interesting stuff in this data. And I was just commenting on something that wasn't related to gender
at all because yes, even if you want to say that with the lower threshold values, like the
proportions of mentors isn't really changing much. You're, you're right, your data still shows
there's a very significant gap between the two genders.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:20">

Okay. So that was the first observation that there is a growing mentor gender gap in the second one
you're talking about that the time it takes for someone to become a mentor. Could you talk more
about this?

</Turn>


<Turn speaker="Natalie S." timestamp="12:32">

Yeah, so I just looked at the time from first publication to achieving mentor status at threshold T
and I plotted this over the years and for different thresholds. And once again I show that there is
a gap between the two genders, that it does take females quite a bit longer time to achieve mentor
status.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:59">

So one thing I had a, when I looked at this as the author disambiguation is gonna have a big impact
on this observation, but maybe not with the other ones, have you seen cases where there was big gaps
in the publication? You're like maybe someone, you've published a few a few papers in 2000 and then
you didn't publish until 2015 have you seen things like this or this may indicate merging of authors
who are different but have the same name.

</Turn>


<Turn speaker="Natalie S." timestamp="13:22">

Ah, right. So I actually no, I didn't check any of this out. So, so for all of these analyses, I
really tried to stay away from looking into fringe cases because as soon as you start doing that,
you just get into so many exceptions to every rule. So I made really kind of brutal decisions, like
for example calling a mentor, the last author and calling the mentee, the first author. That's kind
of a brutal decision. I have a lot of papers that aren't like that, but I would hope that with large
numbers, this observation would be a little bit robust and that it would be able to actually make
statements based on these very simple kind of harsh decisions that I've made.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="14:06">

No, I agree. I think in aggregate they're not that problematic. I guess I'm only worried about like
extreme cases where the distance or the time it takes to become a mentor is really a much longer
than it needs to be because but this, this effect, I don't think there's any specific reason to
think it's going to be more, more robust in among males or females.

</Turn>


<Turn speaker="Natalie S." timestamp="14:26">

Well that's exactly it. So any sort of mistakes should be mistakes equally among the two genders.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:33">

So can we talk about like the actual lengths, we're talking about here, so for threshold of four
papers or you're the last author, it looks like there's a gap today of like 15 to 16 years on
average for males and 17 to 18 years for females from when you publish your first paper to when
you're considered a mentor. Is that, am I understanding this right?

</Turn>


<Turn speaker="Natalie S." timestamp="14:57">

Yeah, that's exactly right. That's a long time. Yes.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:00">

Yeah. This is the first time actually I've thought about this idea of measuring how long it takes
for someone to be a mentor and yeah. It's surprisingly long.

</Turn>


<Turn speaker="Natalie S." timestamp="15:08">

And so I was actually really surprised by these results as well. I mean, of course you also hear
about fall out. But this is a nice way to capture within the pool of people who actually made it to
mentor status. Can you see a visible obstacle in doing so? And I think this is captured by this time
gap.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:27">

Yeah. I wonder how much variance there is, It really would be interesting to observe this.

</Turn>


<Turn speaker="Natalie S." timestamp="15:31">

Yeah. So if you look at the background of each little sub chart, I tried to give some understanding
about what the statistical significance is. So the darker the background, the less statistically
significant it is. Now, these are not like crazy significant I have last P Val that use at, for
example, at threshold T equals 10 is a 0.1, one three P value for statistical significance.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="16:04">

All right, so that was your third observation from the analysis that you did. Oh, sorry, the second
one. And the third one was in gender mentorship correlation with future success. Could you talk
about a little bit about this?

</Turn>


<Turn speaker="Natalie S." timestamp="16:23">

Yeah, sure. So I just seen it really interesting paper this year about the chemistry field by Gaule
and Piacentini, they tried to look at the effect of engender supervision on a graduated PhD students
acquiring a permanent position in academia later on. And they had really accurate data. So they had
exact data for all of the students in the, in the States. They're the genders of their, their
mentors. So who their mentors were, the genders of their mentors and the jobs that they acquired.
And that was for many years. So obviously mine is an approximation of this. So what I did was I
looked at so for different thresholds of becoming a mentor at threshold T I tried to see among those
who had had just any female or any male supervisor, you just needed a hit that you had been mentored
in some way by a female or a male. And that's where these numbers come out. So across the board I
showed that when there was this engender relationship of mentorship, that this was a stronger sort
of predictor of success of becoming a mentor at threshold T.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:51">

So this is so just to make sure that the audience following, we look at the proportion in each cell
of which the mentee ended up being a mentor and in both males and females. So if I'm a male mentor,
my chances are higher if I am mentored by a male and if I'm a female, my chances are higher if I'm
mentored by a female.

</Turn>


<Turn speaker="Natalie S." timestamp="18:11">

Yeah, that's right. There is actually an interesting note on that. So my next step was to construct
a network and to apply a model. And there's actually an interesting note on that in the paper that I
take the model from. So what they noticed was, so there is this concept which is a very natural
concept for people called homophily, which is this tendency for people to associate with others who
are very much like them. Now, I suppose I can talk about the general model here as I'm about to
explain how I see it, a glass ceiling effect can occur in a network where, amongst other things
there is this homophobia at work now in this prediction for success; prediction, like engender
supervision being a predictor of later success according to this mathematical model, there's
actually, if we have absolute homophily, that means that if both genders completely ignore anyone
who's not in their own gender, we basically make two parallel universes and there's no there's no
limit to the power that each gender can have. So what these numbers reflect really are, you know, if
the females stay to themselves and the males stick with themselves and, and nobody talks together,
then yeah, of course trivially, we don't have any problem of a glass ceiling effect because we're
not talking to each other anyways and we don't really care about each other.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:45">

Yeah, that's very interesting. So could you, could you tell us a little more about how did you
characterize the increasing homophily? How do you measure what is expected and then compare it to
what's actually happening?

</Turn>


<Turn speaker="Natalie S." timestamp="19:56">

Yeah, so you mentioned that I constructed this network, so in the network, the mentors and the
mentees, there are the nodes and the edges are the relationships between them. I thought that the
idea from for this, from this paper by Avin et al. 2015 what they did was introduced what's called a
bias preferential attachment model and it works like this. So you're constructing a graph and so
you're contacting a network of of researchers and new people, so new mentees enter the network, one
at a time and they're a male with a certain probability and female with a certain probability. Now
according to the proportions of females and males, that happened to occur in that population. And
for us in NLP, this is this 0.33 the one third for females rather. And for males it's the two
thirds. Now a note becomes a specific gender with this probability.

</Turn>


<Turn speaker="Natalie S." timestamp="20:57">

And then after that they have to establish a relationship and they do that by kind of following who
is the most influential in the network currently. So who has the most power now a power can be seen
as how many other people am I attached to. A new mentee is going to attach to a supervisor with a
probability that's reflected by the degree of that supervisor in the network. How many other nodes
that that supervisor's already attached to, which is that a researcher is influence. Now this is
called a "rich get richer" mechanism. Now when we're looking at homophily in the network, what we
want to look at is the number of female nodes and the number of male notes currently in the network
just based on these proportions of female and male nodes. If all edges were equally likely, how many
mixed edges would we expect to find? So how many mixed relations would we expect to find? And if
that expected number of mixed edges is much above what we actually find in the network, then we can
see that that network is showing homophily.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:12">

Right. And, and the observation that you found was that it's consistently lower than what is
expected according to this model?

</Turn>


<Turn speaker="Natalie S." timestamp="22:19">

Yeah, exactly. For our network, we have this model of a minority majority mechanisms. So because we
haven't minority majority, we have a minority female and majority males, we can make the assumption.
So it's an assumption in this model that there is a rich get richer mechanism at work that mentees
are going to want to attach to a more influential mentors in fact that anyone's going to want to
attach to more influential people. And then finally there is this check for homophily does it exist
or not? And it's in the network. I know what Avin et al. l showed was that based on some definitions
of a glass ceiling effect, that given these three mechanisms in the network that a glass ceiling
theoretically will exist

</Turn>


<Turn speaker="Waleed Ammar" timestamp="23:12">

And you have a specific formulation for how to characterize this glass ceiling. Could you give a
definition of how it is characterized?

</Turn>


<Turn speaker="Natalie S." timestamp="23:19">

Yeah, sure. So so this is totally directly from Avin et al.'s paper. Well, how you can think about
it is you look at the notes in the two populations that have the most power. So these are the nodes
with the highest degrees from the male population and from the in the female population. And you
consider that. So as you add more and more nodes, you consider the, the proportion of female
powerful nodes to the male powerful nodes. And now if there is a decreasing fraction of the female
nodes who contain a certain level of power or more with respect to the number of male notes who,
have the same level of power or more. So if this proportion is decreasing and generally tending
towards zero, then we can say that there is a glass ceiling

</Turn>


<Turn speaker="Waleed Ammar" timestamp="24:11">

And this follows directly from the assumptions in the model we have. So you can conclude this
without looking at the data at all. Right.

</Turn>


<Turn speaker="Natalie S." timestamp="24:18">

So this is a definition that I just gave you. So I told trying to describe what is a glass ceiling
or glass ceiling is a situation where, so for females it is a situation where the levels of power
that are obtained by males are not achievable by the same amount of females, simply not achievable.
And in fact that, when you look at the two proportions together that the number of females having
that amount of power with relation to the number of males is tending towards zero. That means that
they're becoming obliterated over time. So this is sort of the definition of the glass ceiling and
now you look at the three mechanisms at work here, meaning that there's a minority majority that
there's homophily in the network and that there's a rich get richer tendency given them those three
mechanisms. Mathematically it can be proven that this glass ceiling exists in the network.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:16">

That's very interesting. This study, I think this can apply be applied on a lot of other phenomena
that I would want to study. Like things like to what extent people affiliate with others from the
same country or from same ethnicity and yeah, I can see a lot of ways to extend this work.

</Turn>


<Turn speaker="Natalie S." timestamp="25:32">

Totally. The question is getting the data.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:35">

Yeah. Thank you for all these evaluations, by the way, is the data available? Could you share it?

</Turn>


<Turn speaker="Natalie S." timestamp="25:39">

So I'm not as sociologist, I'm not an ethicist. I still don't know what are the sort of ethical
ramifications of passing out data with everybody's gender annotated on it. But there are ethicists
that I can talk to about it. So I think that anyone who's interested in that, please come and join
in the discussion with me, write to me. And I actually know a couple other people who have very
similar data, who know a lot more about ethics than me. So we should probably get together and talk.
But yeah, the data is available as soon as I know I'm not doing something dodgy by distributing it.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="26:13">

Okay. Do you have any other thoughts on this work?

</Turn>


<Turn speaker="Natalie S." timestamp="26:16">

No, just a super happy that people are actually interested in this stuff. I didn't think anyone
would read this paper, so I'm really glad that people are, are interested.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="26:26">

Thank you for doing all this hard work. Yeah, I know it wasn't easy.

</Turn>


<Turn speaker="Natalie S." timestamp="26:30">

Thanks for inviting me.

</Turn>
