---
title: "Large Teams Develop, Small Groups Disrupt, with Lingfei Wu"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Lingfei Wu"]
number: "084"
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
artificial intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:12">

So today we'll be discussing a Nature paper published in 2019 with the title "Large Teams Develop
and Small Teams Disrupt, Science and Technology." By Lingfei Wu, Dashun Wang and James Evans. We
have the first author Lingfei Wu, in our virtual studio to talk about it. Ling is a computational
social scientist with a research interest in the future of research, education and employment in an
AI economy. He received his PhD in communication from the city, university of Hong Kong in 2013 and
is currently a postdoc at the department of sociology at the university of Chicago. Ling is now in
the job market for an assistant professor position in computational science, social science. So
welcome to the program.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="00:54">

Thank you Waleed and Matt.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:55">

So what's the backstory for this work? What got you interested in studying the team size and how it
relates to disruption?

</Turn>


<Turn speaker="Lingfei Wu" timestamp="01:01">

Yeah. First of all, thank you Waleed and Matt for inviting me to this, I have really enjoyed this
more, laid back relaxing vibe, to talk about the stories behind research and we've published a blog
about the story behind researching Nature community but I'm definitely happy to share more. So it
was in 2016 and I was visiting Santa Fe Institute. That's a great place with a lot of people talking
about gradient ideas about complex system and this and that. And I met James Evans there. Uh, at
first we were just stumped for on some very rough and big vague ideas about how natural or language
and the artificial language constrain our thinking. And then we gradually talk about all these kinds
of things that constrain the production of knowledge. You know, like, and then like at some point we
were talking about teams cause you can understand tease organizations, institutions, they are kind
of a social language.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="02:09">

That constraint I would thinking for example like in Japanese there are many, many unique characters
to talk about different kinds of fish. So we observe these kind of thing that the, if each different
language can shape our thinking dramatically and we were interested in idea wither, social language,
which is like our organization social network structure or these kinds of things does. It also shape
how we think and what we really know and that's kind of a starting point and that's also at the time
that the my collaborator James and Dashun they throw out the idea about how they feel small teams
that are kind of more like a move faster in the knowledge space and we kind of just combined all
these thing and the start the project.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:56">

That's very interesting. How have you explored different hypothesis before you stumbled upon this
one, which ended up being such a meaningful hypothesis to test? Cause sometimesI wonder if something
like this comes to light because people had a moment of inspiration or it's just a sequence of
failure and then results in a successful finding.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="03:16">

No, this is totally, yeah. I feel you in the, like anyone who did this kind of long term project or
even just publish a small paper will, I assume everyone, like we experienced the same fractuates
bumpy road journey. Like sometimes you as so exciting about new ideas as, and you just feel that is
a a lot about failed and then try it again. So in our Blog I show the image there like in total
almost 1,800 emails I send to my collaborator James and Dashun over these three years. And that is a
data visualization on how, and when things go, like we got a lot of heat I need to take care of all
these kind of issues. Every time we kind of got stuck, we try to bring the team back to the original
idea, which is measure disruptive innovation and try to associate with some very fundamental
measurements of social organization like, team size. We were also lucky in the early stage you
already observed the signal and then 80% of work is more like two tests, 80% of work is more like to
test the robustness of these patterns.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:29">

Yeah. It's not easy to find the right signal and find it consistently across different streams of
data so, could you, for the audience, help us understand what kind of a metric you use to define
disruption?

</Turn>


<Turn speaker="Lingfei Wu" timestamp="04:41">

Yeah, so the who cornerstone, of the paper is this website and the technically. It basically just
measures to what extent new idea it clips or overshadows the past ideas. So you just imagine an
expanding universe of knowledge and each idea or each paper for example, it could be a paper, a
pattern, or self-aware. Every idea has been built up on previous ideas, but the people constantly
compare you, like there's a famous quote, all these great words or just like, because you stand on
the giant shoulders, right? So the thing is that people are constantly; this quote capture this kind
of scenario that the followers, or the future observers constantly compare your work against the
work you'll build out. And that's kind of the original idea of disruption. And I have to note that
this, we think of different versions of this workshop, but in our paper we use the original version
proposed by Russel and Owen Smith, which is a very well defined and easy to operate. It's an issue
in citation networks.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:56">

Yeah. Could you explain that metric? I think it's an interesting one to think about.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="06:03">

Yeah, so basically it allowed us to go into detail. You'll be like if you have a paper and that you
have for example, three reference in this paper and then we all collect all the future papers which
either sites this paper or it's reference or both. And that it becomes a pool and that we calculate
the fraction of three types of papers in this pool. The first time is the paper the only sited the
focal paper. The second type is the paper, that site, both the focal paper and the reference. And
the third is the one that only cite the reference. And then that eventually the disruption will be
the probability or the fraction of the first type which only sites the focal paper minus the second
type, which sites both a focal paper and the reference. Because the probability of fracture is
between zero and one. And these forms measure between negative one and one when is one. It is like
all of future papers only cite you but not your reference. So you have very, very disruptive or you
totally eclipse or overshadows the narratives. The future tells you, Oh, I'll go to you but not your
reference and where is negative one, it's the reverse.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:16">

Yes. So when I read the metric as describe to me, the paper one question I had in my mind is what if
there is one paper that I cite in my paper, which tends to be cited in pretty much all papers that
are written in this area for that year. Okay. So something that's very influential, everyone is
using it. If I understand the metric correctly, then this means the majority of papers in this pool
that you're using to compute the metric will be only citing that other paper, not the focal paper,
which results in only a small margin for you to go onto the destruction Que.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="07:48">

Yeah, you are actually talking about a very typical scenario. It's like citing classics, those
popular papers. Back to our metaphor about eclipse, we can just imagine the eclipse of sun or moon
against eclipseing a little star. It's way easier to overshadow or eclipse a little star far from
you and less visible then to eclipse the sun or moon. And that is true there for a majority of
papers in our data set, that disruption is small, but that's also a very nice feature of the
measure. Allow us to highlight those successfully eclipse previous ideas. And uh, of course we can
give, like if we want to talk about a research story for example, people may think that would be a
natural foreign question would be if your reference is less popular, it's easier to eclipse than
right. So in our figure we try this and we separate paper by their impacts. Generally paper impacts
in figure three it's the impact control by the impact of the focal paper. In our extent data
figures, we also control the impact of the reference and try to see whether our story still holds
across different groups. Either they try to eclipse the sun or just a little star.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:08">

Yeah. I guess one interesting way to think about this is about some metric that you're trying to
design is like what are the, what are the extremes and are there failure cases on the extremes. One
way to maximize this metric is to not cite anyone in my papers. Right?

</Turn>


<Turn speaker="Lingfei Wu" timestamp="09:21">

True. If you don't have a reference, but the thing is, in our analysis, we actually drop this kind
of.. if you don't have an analysis because of like by default the disrupt would be one. But these
are kind of unfair. So we dropped them,

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:35">

Right. And if I don't go quite that extreme but, but still like the fewer papers that I cite, the
better I'm going to do on this metric kind of a priori, right?

</Turn>


<Turn speaker="Lingfei Wu" timestamp="09:43">

Yeah. So this is a really nice point, actually bringing us back to the thinking about these papers.
So at first we stopped from measuring disruption and associate that with the team size and first but
then we want to talk about a research story and that's when the tree metaphor comes in the picture.
So we imagine a paper or a, any kind of teamwork like pattern or software could be a tree, which
roots go deep into the past. That is it's reference and also grow the citation or impact into the
future. So it's a tree unfolding in time. That comes with the metaphor, t will be the assumption
that if you have a deeper roots, you go very, very deep to the past. That will be more disruptive
because the follower would typically prefer to just follow you rather than follow all of these,
deep, older references.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="10:38">

And another consequence is if you try to build your work on the less popular, like you try to
discover these hidden the forgotten notes and ideas in history and it will also make you more
disruptive because you are packing the forgotten ideas and that future citation will tend to build
on you but not going through the same effort you had been going through. We see a lot of things come
in the picture when we have the tree we, we kind of see things as like remembering the past and we
discover the invisible and forgotten ideas and package together nicely and pass it to future and
futures citation build more on this whereas the big things are doing the reverse.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:27">

Yeah I really liked the tree visualizations that I saw in your paper. I'd encourage any listeners
that have heard about this work and haven't seen those figures to go look at them cause they're,
they're pretty, I liked it a lot.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="11:37">

Thank you. Appreciate it. And I probably spend too much time on this, like a it be at some points
because of the project. I wasn't very fun. I have to have some fun doing this boring process of
processing, huge amount of data. So I try to be a little bit arty, but uh, they're cool also be very
destructive and adaptive. It's not a very efficient way of working.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:59">

Right. Uh, so we didn't actually talk about that central finding of that paper that much. So the
main finding here is that smaller teams tend to be, uh, to do more disruptive work.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="12:08">

Yeah.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:09">

Could you tell us a little more about how did you reach this conclusion? What kind of data you used,
what observations you've seen in the data?

</Turn>


<Turn speaker="Lingfei Wu" timestamp="12:15">

So the main idea we found is across these three data sets of research paper over 150 years, 44
million papers and also US patterns for forty years, over half a million and also 18 million
software in three years. We all observe these very robust association between team size and
disruption in the sense that small teams are more disruptive. So that's kind of like the main
finding of the paper and most of the paper its nature and they had really have a high expectation on
the robustness of the pattern. So we spend a lot of time to develop or these kinds of controls. Like
for Web science paper we have eight controls we have, we can control: impact, field, author, type of
paper, topic, the time period, time window, journal and for patterns we control the applicants like
say like from big company or from small company we can show industry what kind of industry are from,
does it matter and then for the software we can show whether it's a small project or it's a large
project measured by the code size.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="13:24">

And also we controlled the language like what kind of language you're using. And through all these
kinds of robustness tests we still see the same pattern no matter how much you slice the data set
into small pieces. So that's when we built up our confidence and we develop all these kind of tests.
Also the help, very like very constructive comments from the reviewers. They have the new respect
then like every one of them back and forth, they were like, Oh have you saw this? Have you checked
that to do a robustness test needs test? But as we mentioned a little bit earlier, this paper it's
a, for me it's more like a, yeah, we, we have the most a solid results in the paper. But I hope that
the paper is just a beginning of a conversation and a lot of way more interesting thinking is about
why small and large teams are so fundamentally different and the what is the process of knowledge,
discovery re discovery and the production and that I will feel, very happy for any of these kinds of
conversations.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="14:31">

Yeah. So what, I was wondering, how would you translate the findings that you had in the paper into
practical advice for researchers? I've always been very liberal about who to collaborate with. If
another researchers interested in the work I'm doing and they have something to contribute, that's
great. But it seems like you're finding suggest I should be more careful. Uh, try to avoid expanding
the team size by doing more things on my own.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="14:55">

Uh, yeah. So there are definitely some lessons we can take out and some are more obvious than
others. For the most applicable consequence we analyze how does this association relate to or effect
the science policy because basically we motivated scientists by two things. One, we give them a
prize. Two, we give them money, right? Um, so we analyze what is the Nobel prize over one, hundred
and relate to these. And we found the Nobel prize reward dis-proportionally to small and disruptive
teams, which to our perspective is a good thing because these teams are typically very innovative
and disruptive and create new directions. But we also, collect data and analyze how, so we want to
know like, how about us research should have found dates by the main government agencies around the
world. So we analyze data across almost a half a million papers that fund funded by these five main
government agencies, inquiry, Natural science foundation, us and also similar foundation in China,
in Geman, European, in Japan.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="16:08">

And we consistently found that the funded of the research actually less is more like more like large
teams and developing research I founded. And also more interestingly in the general population,
small teams are more disruptive. But the, in the funding of research we observe this small teams are
actually more conservative or more developing. So the many theory can come out of that to confirm
the theory goes beyond his paper. But the one possibility is because of the existing funding
environment, people try to be more conservative and try to secure the ideas before they submit a
proposal. So that brings us to the question like what is the best way to find the scientists? And
also back to your question about our own research rather than just the policy. I think it's a, it's
a kind of a trade off and also it's relevant to like different circles of career and also different
circles of life. I don't know. I mean like the offer, the idea, I'm just like, you ha we have
startups. We also have giant companies in Silicon Valley. It's the same logic going on in science.
We have small teams that are taking all these risks who got nothing to lose, not much to lose, but
we also have a lot of teams that you'd take a lot of risks, but that also means you need to pay the
bill. So I think it's a trade off between these kinds of modes.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:31">

Yeah, that makes sense. I think it still doesn't completely explain how as a researcher was most
interested in doing disruptive work.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="17:41">

Yeah. So I think that definitely means that if you want to be disruptive, you need to have a small
team that I think that significance is kind of clear, of course there's a chance but, with small
teams you have a higher chance to disrupt.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:58">

Yeah. I guess another thing to keep in mind here is what kind of team size are we talking about?
What is large versus small in this context

</Turn>


<Turn speaker="Lingfei Wu" timestamp="18:06">

True. That's a very nice perspective. So that also relates to one result in our paper, which is the
Figure 2 observe the robustness of this team size and disruption across fields. And we do observe
that on average some fields harder to disrupt the other fields. For example, physics. It's a field
that is very hard to disrupt and the social science and biology are relatively easier to disrupt.
And the, my personal interpretation on this is like science is a complex system. It includes both
kind of like more like artificial knowledge and also natural knowledge. So when we're doing physics
we are, it's kind of like we can, it's a debatable, you can have alternative theories on how
universe runs, but the, you don't have much a degree of return as much as like in sociology or like
other fields like computer science or something. It's more like we human being, we create these
kinds of understanding and we build logic. We do all of this. So I would say that more natural
knowledge is harder to disrupt and to disrupt these kinds of knowledge. You need a even smaller
team.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:18">

That's interesting. Like one, this is me just speculating here. I have not dug into this data at
all. Um, but I've been thinking recently about how we do science in computer science versus in say
physics, where or even biology and a lot of these places you need to get a lot of funding upfront to
build a machine or to buy lab rats or whatever. Um, get chemicals to run an experiment and this,
this costs a lot of money. It requires a big team. There is this dichotomy between the person who
proposes a theory that maybe eventually people think is good and good enough to verify
experimentally and then someone, some big team does the verification. And so like thinking about
these other kinds of scientific fields, this makes a lot of sense to me.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="20:09">

Exactly.

</Turn>


<Turn speaker="Matt Gardner" timestamp="20:10">

In computer science, I think we did this very differently because it's just, any grad student can
write code to run whatever experiment they want. This is changing a little bit as as compute is
getting more expensive with these deep neural networks, but it's just very different. We have very
much smaller teams in general in computer science than you see in a lot of these like CERN papers or
whatever. Right.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="20:33">

Yeah, I totally agree with this and that will bring us to a very interesting conversation on like
what, what do we mean by fields and what is artificial knowledge and what is the natural knowledge
and the, for the paper itself we observed that the across these fields, small teams on average are
more likely to be disruptive than larger teams, but definitely as Matt mentioned, we have different
feel and they have different practice and in computer science I would argue we still have very small
teams, my favorite paper by Turing that was like only himself and also some of my heroes like von
Neumann and then Stephen Wolfram, this kind of great brains, they basically work by themselves. But
of course we, some fields are more engineering than other fields and in these kinds of more a
private engineering fields. When we talk about small teams, we need to be careful like how small is
the small team? Like at least we need to in these kinds of applied engineering fields to be creative
you, there's like a bottom line of costs, right? Like you needed to have a GPU, you have the machine
running for you and that way you can talk about how creative you are. Then most of the people can
not just work with papers and pencil like theoretical.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="21:48">

Right. And I, I would like to know that in all of your fingers and figure 3B you have a different
line showing the disruption percentiles for a different team sizes, broken by the fields. And as far
as I can tell from the graph, computer science and engineering, the disruption is actually not going
down as the team size expands. You could tell me if I'm reading this wrong.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="22:11">

Yeah. As we mentioned in the paper the main reason I argue is because we were using web of science
data in terms of journal articles and we know engineering and computer science are not really value
in journal article the most, the top conferences is the main outlet of these ideas and research. So
I think that could be influential. But also the thing we just discussed, like different field has
different practices that will also like you probably also amplified what we just saw. But in the
extent data there's a extended that in which we separate them by journals. And then for that the
journal separation we put out engineer and computer science journals and within the single journal
we still see a small things more disruptive.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:59">

Could you tell us a little more about inference in reference patterns? So you talked about reference
popularity as opposed to age. I was wondering if you have any insights on why is it the case that
sometimes the larger team sizes result in more citations?

</Turn>


<Turn speaker="Lingfei Wu" timestamp="23:15">

It's still built up; the individual still comes from the universe and the star eclipse metaphor. So
the first thing we observe is that small teams are more disruptive, but then in that metaphor we
kind of connect that these two different ideas about the future and the past. Right? So you are more
disruptive typical means you are building up on the reference that is less visible or less popular
and earlier. And that immediately gives the assumption that if small teams are more disruptive would
they be because small teams actually align themselves with the earlier stars and less visible stars.
And then we test the data and found that this is actually a robust pattern. And this is also quite
understandable if we think of our daily life and practicing academia. If you have a large team you
are really socially constrained. So this is another idea. It comes with the paper that we haven't
presented in the paper but, we kind of have idea that we have two spaces, one is social space and
one is knowledge space and the way you have a, I would like to quote from James March, one of my
favorite scholars saying that linkage and the power and autonomy that it doesn't comes along the
same way.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="24:30">

If you have power you have the relied on linkage and linkage these show your autonomy. So basically
if you have a large social space, you are powerful, you are quite embedded in the power structure in
terms of collaboration network in terms of all these a institutional elite. You are kind of
constraint because you have to respond to what other people think all day, like that there are tons
of things you need to maintain. But then like if you are kind of on edge and disconnected and pretty
much make it a little bit personal, lonely then you have a huge autonomy, you can move easily in the
idea space. So if you're a small in space, you're probably be large in idea space, that's a kind of
another association. We try to joke behind the paper.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:16">

But this doesn't still explain that more citations that larger team size gets.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="25:22">

Yeah, I think it's a relevant cause like if you have a large state you have to chase what's going
on. Like you have to harvest the mature market of attention that you have to do what other people
are doing because you are taking a lot of money, you are taking a lot of resource. You need to be
responsible and you have to chase Full of flow. You know the chain; it's too risky to deviate too
much from the mastering of science. It's just too risky. It's not like a large teams guys are
irresponsible. No, they are cost thought and they cost constraint because they are so responsible
for the results. So they have to keep up with the mainstream, and cite the popular papers cite the
recent papers that helps them secure their position in the mainstream. But they're also distant them
from the origins of innovation.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="26:09">

Yeah, that makes sense to some extent. It's like maybe subconsciously gaming the metric of where you
want to get more citations by doing the things that are popular.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="26:17">

Yeah, and that's how we summarize our story by saying that get in the dimension of remembering and
forgetting, like to me like small teams are ike remembering earlier and less visible ideas impact
them, but large teams when they are chasing the hotspot, when they are chasing the mainstream, they
kind of helping, the entire science community to forget all these little, little people, all these
little ideas. And I would like to argue that those who remember history will be remembered long. I
mean if they ever be remembered, you know, of course that's risky. But those who forget history,
will be forgotten soon.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="26:56">

Yeah. Okay. So there is other factors that you mentioned in the paper and you mentioned briefly
before that you also controlled for, I was wondering if you would like to talk about any ones, any
factors that also correlated strongly with the structure?

</Turn>


<Turn speaker="Lingfei Wu" timestamp="27:11">

Yeah, we controlled many factors some in fact are very interesting. One factor as we mentioned for
the field, so there are like more natural knowledge field and artificial knowledge field if we may
put it that way. And another thing is as we show in the first figure we can show for the reviewers.
So, the way we do is we pull out all the titles and we pick the journals annual. The key was annual
and review so that pretty much purely review journals and we take these pulled off paper and compare
that against the population. We found that this reviewer or at least reviewing papers are indeed
more developing because theirs is less about original idea and those paper review by then more
disruptive. They are like kind of on different sides of the story. And another thing we did which is
very fun and relevant more to the NLP communities, like we try to compare the keywords and the the
trends of absorbing different keywords as we also present in the figure one we have these different
kinds of key words and if one keyword we have, we separate people in the two groups, the developing
group and disrupting group and if a keyword shows up with a way higher chance in one group against
another, then we pick them up and it's a, it's a fun way to play around with the data and see
whether [inaudible] is honest and whether it's possible for them to be honest.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="28:38">

So we observed that when people claim in, their title was about stabilizing or like confirm or like
these kinds of words, they are more like developing and when they claim that this is bringing new
knowledge into existing body, they are more disruptive. It's interesting to associate the language
scientists are using with the impact and consequences of whether they are disruptive or not. Yeah.
One more thing I would like to mention, we didn't present it in paper limited by the space. We
actually systematically measure the KL divergence between the abstract and title of a paper against
all the title of it's referenced paper and see whether a paper is measured by citation as more
disruptive. They are also more innovative in terms of then they have a higher KL divergence between
these two texts and things are, they're pretty consistent. So scientists are talking about new
things, new ideas, new words and then the entire community can pick them up. So it's kind of a self
report language versus peer evaluation.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="29:46">

Another factor that I thought was very interesting is looking at different time periods. I'm looking
at Figure 3C the extended data figure and I'm seeing that as time goes by, papers tend to be less
disruptive over time, which kind of like coincides with my intuition that like, I don't know, we
have more papers now. Like the bar to publication seems to be lower than it used to be 20 years ago.
I'm not entirely sure this is true. Uh, but this has been my intuition.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="30:18">

That's a good intuition. And one thing we didn't have opportunity to unfold in the paper. It's, it's
the temporal evolution of the disruption measure just like citation is evolved over time disruption
also, but the disruption has a very interesting pattern. Everyone started on the same point because
at first you don't really have many citation and there's no dramatical difference between different
groups. And over time you kind of observe that small teams, there that I call it, two ways to
success. We call these papers cited by another paper. The concept of sleeping beauty. There are a
lot of sleeping beauties in history, right? Like for example, Einstein's a paper on gravitational
wave has been sleeping for 100 years and all of a sudden it bursts and for all these papers let
eventually accumulate a lot of citations, sooner or later we observed that small teams more likely
became key papers by being disruptive as small teams became key papers by being developmental.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="31:21">

Again we see the like the social language and the organization comes in here they have advantages
versus disadvantages for small teams a good strategy is to maximize its capacity to seek for risky
ideas and implement that while it's for large teams is like the best strategy probably for them is
to develop existing ideas. So not, it's not just like on average is a tendency for all teams to do
that but also for the top five or like top of one best teams who survive in time. That's actually
the strategy they used. So I feel that's relevant to what you were saying about like a disruption
evolve over time because on average the citation will stabilize, right? People will forget about
you, but the disruption will divulge. If you are disruptive and you probably will accumulate, be
more disruptive because it's always easier to follow you then for your reference.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="32:15">

I think what you're telling me is that it's not necessarily the case that more recent work is less
disruptive in general in on average it may be a side effect of how we measure disruption.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="32:26">

You are totally right. Because like the more recent work, so the disruption is like thinking about
the tree again, it takes time to grow. So there's some work, it doesn't really have much time like
longer time window enough to grow. If you have longer years, it's like a classic emerge over time.
Right. We don't, we don't talk about classic like what's the recent year classic. But if we talk
about fifties, sixties it just, I take his time too as a witness can see these classics.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="32:52">

Sure. But you can still control for this by only considering the next, the following 10 years when
you're doing the analysis.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="32:59">

Yeah. But we controlled both so one thing we controlled is the time period. So we separate papers
into different cohorts in different decades and see whether the pattern holds the others. We control
the time windows from five years for all papers. And for one cohort paper we changed the window
size. Whether we calculate disruption within five year within 10 year, within 20 years, all the way
within 50 years, we are happy to see that that result is pretty robust. These are all in the extent
data figures.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="33:29">

All right. Are there any other thoughts that you'd like to share about this work? I'd like to end
with another question, but first I wanted to give you a chance to,

</Turn>


<Turn speaker="Lingfei Wu" timestamp="33:37">

I kinda, I kinda have a view of what's coming for the last question. So I hope this is like, um,
because we, we have been traveling, I haven't been traveling around and uh, my trainees in social
science and uh, um, I really like data science and I do a lot of data work and programming. So I try
to translate ideas across communities a lot. Like, uh, I also publish on Physical journals or
Physics community computer science community and a pseudo science community. And I keep thinking
what is the best research? This is of course is a very debatable big topic, but my personal opinion
is that I, one of the papers I love the most is from computer science community. It's called No
Country for Old Members. And that's from the a group lead by Dan Jurafsky and the first author is
Christian.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="34:26">

He was in Stanford when he wrote his paper, that paper basically tried to analyze a peer review
community and demonstrate how people get stuck in the past. Like whenever like get into the
community and the community started to use some kind of language. And I guess that with that
language, they don't evolve until the entire community just move forward and use different language
to talk about the same thing. And these kinds of things made me feel more like relatable. I kind of
like these kind of research. It's a very solid and it's like the pattern is robust, but it's not
just, you know, it's not just like, on average, typical computer science community, it touches, the
humanity and kind of help us reflect and we think what is humanity and what humanity, how humanity
will be replaced will be. Even crashed will be rebuilt in a society with more than more machine
intelligence. So that's a, that's kind of a, you know, thing I would like to pursue. And I welcome
more comments, ideas on this. I feel this is very urgent and important and essential hobby to study.
When we talk about machines, what are we talking about? We're actually talking about humans in what,
what is humanity?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="35:33">

Yeah. Thank you for sharing this. To end on a humorous note, I know that hosted a podcast calledLu
Gu in which you encourage researchers to share awkward moments, the experience of their life. So
it's only fair that we ask you to share some of the awkward moments that you experienced while
working on this project.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="35:50">

Uh, there are lots and one of the most awkward moment, probably the, when the paper was reject by
Science we submitted this to Science first. And uh, yeah, like totally three years and the second
year we've already did most of the preliminary research and we submit to Science and they have, we
went through many rounds of rebuttal and the community in Science kind of divided a little bit. Like
people have very different ideas. So it comes back to the humanities side of the note earlier. Like,
uh, I'm also reading another book, that I would like to recommend. It's a, it's called Science in
Action by (I apologize, it is French) Latour Bruno. And I like the idea of presenting in the book
that, the development of the science is like, we try to dump, contribute and dump more of these, our
local calculation, you know, going on in your lab and your brain, you know, mine too, those a
century of calculation, it becomes repository of human intelligence because machine intelligence, it
goes into the center and move forward to the next generation with us.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="36:59">

But we are all like vulnerable human beings. And I remember when the, we were reject, I reject, I
was rejected by Science. That was a very um, very, very like kind of challenging moments tough
times, this is would be a career defining paper for me and also a another thing relevant to that is
that it amplifies my identity crisis. That's also one of the reasons I spend some time to host the
podcast for while I was sitting in my office and sort of putting these in a very talk away. But this
is really what I thought I was thinking, what if I just get on this, get out of this office and got
hit by a car what would happened. Of course people will be very sad and you guess what will happen?
The university, we'll hire a new postdoc maybe from China, maybe one from somewhere.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="37:47">

So that's, that's, that's the how the science works. You know, like the machine, the power, the
social structure works. We move forward without with or without you. And that made me feel like
complicated, you know, like sad and like well what can I contribute with? What is my real identity?
So I think most of my awkward and challenging moments, comes from keep rethinking, how important is
the things research I'm doing and how that helped me help other people discover their identity
rather than just make or build a stronger machine.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="38:24">

Yeah. That's a a great way to end this conversation. Thank you. So much, that was a fun conversation
to have.

</Turn>


<Turn speaker="Lingfei Wu" timestamp="38:30">

Thank you. Yeah. Thanks again for Waleed and Matt for inviting me. Thank you.

</Turn>
