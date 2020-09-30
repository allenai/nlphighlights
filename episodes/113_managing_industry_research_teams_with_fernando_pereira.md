---
title: "Managing Industry Research Teams, with Fernando Pereira"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Fernando Pereira"]
number: "113"
tags: []
description: "We invited Fernando Pereira, a VP and Distinguished Engineer at Google, where he leads NLU and ML research, to talk about managing NLP research teams in industry. Topics we discussed include prioritizing research against product development and effective collaboration with product teams, dealing with potential research interest mismatch between individuals and the company, managing publications, hiring new researchers, and diversity and inclusion."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F826092313&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner, Waleed Ammar and Pradeep Dasigi.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:09">

Okay. Today our guest is Fernando Pereira. Fernando is a distinguished engineer and vice-president
heading NLP research among other areas at Google research. Welcome to the program. Fernando.

</turn>


<turn speaker="Fernando Pereira" timestamp="00:20">

Thank you for having me. It's kinda interesting to have this conversation. We had planned it for
quite a while and then schedules interfered, but and now we have to do it remotely whether we want
it or not. So it's a new world for all of us and try to make sure that our audio equipment works
reasonably for so that we can do our work and interact with each other professionally as before. So
it's a, yeah, it's a new normal at least for awhile.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:53">

Yeah. It is surprising how much work we can get done even with all these constraints.

</turn>


<turn speaker="Fernando Pereira" timestamp="00:57">

Yeah. Yes, that's right. I've been in a video conferences since 7:00 AM. One of the things I've been
doing since we have had our restrictions for working at home and so on. Is is having these virtual
coffee times with members of my team across the world. So I have a couple of those at 7:00 AM and
then I'll have others at 11:00 AM during the workweek so that we can just chat about, you know,
what's going on, you know, how we are feeling about this situation, any new interesting ideas,
project. So it's just a very informal thing that we've been doing, which has been a lot of fun
actually. And I'll continue it after this is over cause our team being distributed all over the
world makes it a really difficult to keep in touch with the, you know, the diverse team that we
have.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:50">

Totally. Well speaking of the size of your team, my first question for you is, you've been at Google
for 12 years now. How did the research organization evolve over these years?

</turn>


<turn speaker="Fernando Pereira" timestamp="02:04">

Yeah. So I came to Google a bit over 12 years ago and my hypothesis when I considered coming over
was natural language technology, NLP technology had been making quite a bit of progress through the
use of statistical methods and machine learning. And this was the time to try to see how it could
help on a user facing role in a big way, which is particularly in search, how can we understand what
users are looking for better, what documents contain better so that we could provide better search
results. So that was the ambition. It was a bit crazy to think about it because the techniques we
had 12-13 years ago were very primitive compared to with what we have today. But yet I thought that
it was a time to try to do this now at the time search was essentially done through information
retrieval techniques very successfully, but basically not relying so much on the actual structure of
a query say, but mainly on the keywords on the unigrams bigrams in that query and different ranking
functions that took into account frequency, inverse document frequency.

</turn>


<turn speaker="Fernando Pereira" timestamp="03:19">

All these usual things that people in IR had developed very successfully. And so it took quite a
while for us to figure out where we could have initial impact by using the state-of-the-art in
natural language processing in particular in things like parts of speech tagging and dependency
parsing to try to get a bit more of the structure of queries and how they relate to document. So
there were a bunch of experiments and false starts but we got enough traction in first few years
that it gave us confidence that we could continue to build the effort and it gave confidence to
those that provided the resources to continue to grow the teams in. And we continued to do more
interesting work over time that has had very large impact on, you know, on search and other
products.

</turn>


<turn speaker="Fernando Pereira" timestamp="04:15">

And this is the natural language side. I've managed a number of large scale machine learning
projects over the years and a variety of other things. But I think we should focus here on the
natural language side. So the difference, I mean the big difference is that we started with a really
small team and we have a much, much larger, much more distributed team now working on the wider much
wider range of questions. You know, like with everybody, the development of deep learning methods
using either the availability of the computation has made a big difference to how fast we can move
and how much impact we can have. So, you know, that's kind of the story of our progress from making
certain, you know, small improvements. For instance in query processing or multilingual query
process, you know processing in particular international, you know, ways to internationalize
different systems to being able to deliver major changes in how search does ranking and question
answering that, you know, so it's going start from incremental valuable improvements to pretty
radical changes of how the whole machinery operates.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:37">

Would you say that the ability for the research work to grow within Google had something had more to
do with how successful it has been in impacting the products or in like actually attracting the
right talent?

</turn>


<turn speaker="Fernando Pereira" timestamp="05:52">

It's a combination. I think this is basically a kind of feedback, positive feedback, right? So if
you are successful in certain areas, then naturally there's more ability to reach, to have the kinds
of conversations about resources that lead to the potential to create, for instance, longer term
research efforts and to hire researchers who may be looking at working on longer term problems and
so have built on the foundation that is to some extent apply, but still trying to, you know, develop
the state-of-the-art to one where we have fairly substantial efforts to really do longer term work
that is not directly tied to product, but is still always motivated. It's always motivated by
questions like; Hey, why am I at Google? Well, I am at Google because I care about understanding
what users want to accomplish through say a search query.

</turn>


<turn speaker="Fernando Pereira" timestamp="07:06">

Because I see that as a sort of the ultimate demonstration of language understanding is when we can
actually answer correctly, accurately, in a timely manner. The variety information needs of users
across hundreds of different languages. That's when we'll know we have sort of arrived. We are not
there yet by any means. So that big goal then connects to all of the research that we do both, you
know, it connects effectively to a lot of the research that people do outside Google and that's why
we can have a really healthy relationship between our work and the work going on in the academic
world.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:47">

So you mentioned contributions to product, but also longer term research. So what are the different
ways you consider to be kind of like the different kinds of impact that research teams at Google
achieve?

</turn>


<turn speaker="Fernando Pereira" timestamp="08:02">

Well, it's, I think the two main ones. And then there are lots of different details, but at one
level can we really rethink how we do major parts of our, the user-facing process we have, whether
it is in say advancing machine translation or doing better question answering contributions to those
efforts that are significant. Measurable are one way that our impact is measured. On the other hand,
creating new new approaches, you know, developing new models, new ways of new algorithms that we
publish is another form of impact, ideally the two meet somewhere where when we are super and we are
not always super successful, but when we are we have something that's both a substantial research
contribution and something that changes how our products operate for the better.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:07">

Yeah, that makes sense. Do you find often some friction between these two goals? Like for example
finding patterns or whether or not to open source a certain project?

</turn>


<turn speaker="Fernando Pereira" timestamp="09:17">

Well, I wouldn't say conflict. I think we have to be thoughtful about clearly, I mean we are part of
a company that is we would like to be successful and continue to develop the best possible product
in the long run. So, we have to protect its business interests. But on the other hand, we understand
that the conversation with the outside world and in particular researchers, students even other
companies is really important. So we try to maximize the communication bandwidth, but we also have
to be very careful about certain areas where we are dealing with sort of ethical or privacy matters.
So it's one thing to develop a new say question answering algorithm is a very different in requires
a lot more thought to for instance, release that data set like we did with natural questions and
that required extreme care to ensure that the data we released, which is based on actual user
queries, protects user privacy and is compliant with all the applicable policies. So the degree to
which we can be open about what we do depends to some extent to not just the business interests but
also ethical and you know, privacy and regulatory requirements.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:46">

Yep. That makes sense. So I would like to move on to another question about like planning research.
So, you know, like top down planning sometimes make sense in certain products in research. Do you
consider top-down? Like how do you see the difference between top-down planning and bottom-up? How
do they go hand in hand?

</turn>


<turn speaker="Fernando Pereira" timestamp="11:07">

Well, so, I think that this goes back to the question, why are we at Google, right? Or we are here
because I think ultimately you want to care about the mission of the place you are in. If you are in
academia, you care about the education, you should care about educational mission, you should care
about training students, about creating knowledge and expanding it. If you are at Google, you should
also care about the fundamental mission, which is organize the world's information, make it
accessible and useful to everybody. So if you care about that mission, that's the main top-down
drive we have, right? It's, think about that mission. Think about the problems that brings up, for
instance, problems in language, understanding for user queries, for document understanding, problems
of modeling trust in information. So not all sources of information are equally attested.

</turn>


<turn speaker="Fernando Pereira" timestamp="12:08">

Has equal support. In a situation like the present situation with COVID-19. Clearly it's extremely
important that we give people the best possible health information. All of those questions are
extremely hard, natural language understanding matters, but they are also scientifically extremely
interesting. So there is no contradiction there. And if most of our work, our research work is
driven by those high level goals, then even though people might have very diverse ways of
approaching the problems, we'll have enough options to have impact. Some of those ideas will pay off
and they will become ideas we can engineer into our products. And and that I think is the, sort of
the ideal state of our research enterprise is to have these very high level goals and then this way
of turning the individual creativity of researchers and connecting it to this goal. So that's my
job. You know, my job and the job with my leadership team is to try to draw those connections,
identify the opportunities, help researchers find the path to success within this very broad framing
organizational goals that are tied to the Google's mission.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:29">

Yeah, I mean that makes us that this has been my experience at Google so far. So I would like to
switch to, instead of like focusing on Google research, let's pretend that you have a friend who's
starting a successful tech company just finished raising $30 million in a series A fund, something
like Cora or Stack Overflow a few years ago, just for a frame of reference. Now this friend, her
employees have been trying to catch up with research and implement the relevant methods, but she's
starting to think about growing research team to help ensure the longterm success of the company. So
what criteria would you use to assess if the company is ready to have, to invest in a research team?

</turn>


<turn speaker="Fernando Pereira" timestamp="14:15">

So actually I have done this in a specific cases. I have friends who have started companies and I
have advised them in this specific way. I think the advice I give is think of the problems you're
trying to solve. Don't think about, Oh, should I have a research team or not? You should think about
what problem do I need to solve that my current engineering team is struggling with and what is the
kind of expertise that is most likely to help us advance that or find alternatives to that. You
know, maybe not necessarily to solve that particular problem and find ways around that problem. Do I
need someone who has a different expertise say in multilingual language processing or a different
expertise in applied machine learning? That's I think the way to approach this. The approach is not,
Oh I need a research team.

</turn>


<turn speaker="Fernando Pereira" timestamp="15:14">

Let's go and find some researchers that happen to be available. You have to find people who are
motivated to come and solve the problems that you have. They have to be motivated by the mission of
the company, by the vision of where the company is trying to go and have the right experience, the
right mindset to come and help you solve those problems. And it could be that the solutions they'll
come up with are not necessarily cutting edge state-of-the-art cause very often the best thing a
researcher can do for an engineering and product team is to know very well the solutions of 10 years
ago that are very practical now. This is actually one challenge of our current AI education in NLP
education is people are so fixated on the last three years of research and the state-of the-art race
that often they don't know much of what was done in the past that could be very relevant.

</turn>


<turn speaker="Fernando Pereira" timestamp="16:16">

One example I'll give you is that there are many problems that people face that have to do
essentially estimating uncertainty and yet most of the students that we see at an interview that
have not done the graphical models, a graduate class or any kind of, they don't actually have a
strong probability background, which 10 years ago of course everybody did. So in a situation like
this you might say, Oh, what I really need, let me give you an example. Suppose that I am a Cora
type company or Stack Overflow and I need to have some crowd-sourced data and I need to deal with
inter annotator agreement and the model, the process of annotation and the annotated biases and so
on. How do I do that? I need to actually go get someone who understand probabilistic models and
think of maybe think of the problem as a latent variable model where there is sort of a true label
that these people are approximating and that each individual has some false positive or false
negative rate and which has to be estimated and you will naturally do a problem like that getting to
either, you know, if you just estimating getting a point estimate to an EM type algorithm or if you
kind of have some Bayesian background, you might do something maybe even a bit better using Bayesian
modeling of the situation.

</turn>


<turn speaker="Fernando Pereira" timestamp="17:46">

But that's what you'd need for that case. Right. But yet if we just say, I will go and hire some
fashionable researcher, they might not have the skill to solve the problem that you really care
about.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:58">

Yeah. Thank you. That makes a lot of sense. That also answers like who would you want to hire? Like
you look for the people who would actually be equipped to answer these questions that you're
struggling with.

</turn>


<turn speaker="Fernando Pereira" timestamp="18:09">

Yeah, that can. I mean I have my interview questions made, right? You know, it's a, Hey here I have
this problem, walk me through approaches to addressing it and you're not going to get a solution,
but you get the thinking process whether those people are senior researchers or junior researchers,
we don't know. I mean you have to focus on the problem you're trying to solve. Not on this notion of
Oh, I need a research team, like a essentially as some kind of a badge of honor or something.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:43">

So now a few years later your friend managed to like hire the right people, make progress. And a
couple of researchers she hired kept like the team kept growing until it's maybe it's like 20
people, like maybe half of them are researchers, half are engineers working together on solving the
problems that matter for the company. But you know like it's kind of inevitable if you're hiring
researchers that they would be also interested in maintaining, you know, a strong publication record
and maybe thinking about problems that are not directly related to what, like it's not the study of
the top priority for the company. I think this often happens in research groups. How do you balance
between the interests of researchers and the interests of the company?

</turn>


<turn speaker="Fernando Pereira" timestamp="19:31">

So the first thing to keep in mind is that if this is a problem about, you know, talking about
essentially a recruiting problem to start with, which is if this problem becomes a real issue.
There's mismatch between the researchers' interests and the needs of the company, then you probably
did something a little bit wrong in hiring right. Clearly you have to understand that there's a
variety of motivations among people. And you need to mix. And you want to have a mix of talent and a
diversity of talent. And some people are going to be a little bit more motivated by one type of
incentive and one type of work and others by others. But on average you should have a collection of
people in your team that are overall aligned with the direction you need to go in that you believe
is the direction of the company.

</turn>


<turn speaker="Fernando Pereira" timestamp="20:30">

So clearly with respect to publication record, I would say there's a difference between publishing
some, continue to publish incremental results. You know, again, another epsilon in the state-of-the-
art of set benchmark versus making a big change on how people think about the problem. And what I
constantly have this conversations is it's quality, not quantity. When I was a professor, I had this
conversation with my students as well, and when the conference deadline, the ACL deadline was
approaching or the ICML deadline, you know, you have everybody trying to push this new result or
this paper out. And I often served as a sort of a bit of a filter in the friction say, look, this is
not ready. If you want to send this, don't put my name on it. Basically even if I had contributed
and the reason is because I think that the incentives in the current academic or research culture
are distorting of not just what's valuable to a company but towards the valuable to society and
science in general. And so actually I think that you think carefully about what's really valuable.
There is less of a conflict between publishing really top work and also achieving high impact
results then people think. I think it's a false opposition.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:00">

Yeah. Thank you for bringing this up. This problem of like how valuable are the research that we
publish and like how significant is the result needs to be before we publish it. And the incentives
in academia is a really important one. I wonder if you have any thoughts on how to improve the
current, you know, the current, how do I say it?

</turn>


<turn speaker="Fernando Pereira" timestamp="22:23">

Well, I don't know. I was having a conversation earlier today about this. So it's a very hard
mechanism design problem. I have tried to address it locally by having multiple layers of a
discussion and, you know, constructive criticism about lines of work and about, I mean in the end
this is a distributed problem. I mean there's not going to be a law that from above that says
research should be done this way. Right. I think that in the end, it's people like me and people,
the senior people in my team and certainly people in other, in the different academic roles who have
some influence on how we carry out this activity and try to incentivize really transformational work
doesn't mean look, not everything succeeds, right? That's okay. But I think that you know, running
after incremental gains, and that's true by the way, on the product side as well.

</turn>


<turn speaker="Fernando Pereira" timestamp="23:28">

One of the things I keep telling people often is a quit while you are ahead if you are working on
the project, which has had the big success, but now the incremental successes are smaller and
smaller because there's diminishing returns in that particular technique then before you really
start slowing down [is] the time to come up with the next thing to do. And that's true in research.
That's true in product impact as well. The greatest value of a research team is to be able to jump
to new ideas that could have much greater leverage than the ideas that you're working on now. But
you can only do that if you are willing to abandon something that's still yielding results before
it's completely exhausted. So that is, balancing that whether it's on the science side or in the
product impact side is I think the critical part of the certainly the job I do. And I'm not saying
that I have a magic recipe, but I say that this is something that I'm always paying attention to.
This diminishing returns effect that happens across all areas of science and engineering.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:45">

Yeah, I definitely remember having discussions with Matt and other people at the AI-2 on this topic.
And like one consensus I feel is that it's a lot easier to do this with a more senior person or like
someone who finished their degree, maybe have been already like out of their PhD for a few years and
they can, this like this is the feeling that as a student, as a PhD student there is more of a rush
to publish because you are going to be compared to other people and people who are hiring or looking
for like easy ways of evaluating candidates will always be looking for like easy metrics to look at,
like number of papers, things like this.

</turn>


<turn speaker="Fernando Pereira" timestamp="25:29">

Okay. So actually looking at your set of questions, right. And, you talk lower towards the end about
diversity and inclusion and I think what you just said is extremely deeply connected with our lack
of diversity in a lack of inclusion. I think that the sort of bean counting approach to recruiting
and to valuing people, this counts the value of people with diverse experiences that have had
different career paths that may be were trained in a different discipline. And as a result it limits
our ability to find creativity, innovation, alternative perspectives outside our comfort zone, the
comfort zone of, you know, just looking, Oh you did everything by the book, you got your N papers in
ACL and your N papers in NeurIPS. So you are a good person. I mean, which is I think is extremely
destructive to the health and wellbeing of our field.

</turn>


<turn speaker="Fernando Pereira" timestamp="26:33">

Back to when I was a professor at Penn and a department chair, and one of the things that I observed
when I started there with respect to diversity in the undergraduate program, is exactly this.
Everybody that was allowed into the program tended to be exactly the same kind of person that had
had a computer since they were eight year olds. And they tended to be male. They tended to be well
off. They tended to be from certain locations in the United States and that was very destructive.
You had sort of a monolithic view of what is success in computer science and when I started programs
in the department to open doors for people with different backgrounds, different experience to
discover whether they actually are as excited about the field that was quite successful. We
increased diversity in our program very substantially.

</turn>


<turn speaker="Fernando Pereira" timestamp="27:30">

And the main thing was not to assume that the way that I am is the way that everybody should be. And
that's true about the whole process of hiring in our organizations. I don't need to just have
another machine learning person. For instance, I need to have linguists I have all people that have
a strong linguistics background and guess what? They tend to be more diverse than your computer
science, your typical computer scientist and so on, so forth. I mean, so bringing from the social
sciences, bringing from the life sciences, I mean one of the things that we have been trying to do
with our AI resident program is to bring people from different areas, from life sciences, from
social science, from economics, from physics. And again, it's a more varied, more diverse set of
talent than we get if we just look at the standard computer science pipeline.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:25">

Yeah. It's probably going to be a number of years before the culture. This culture becomes more you
know, like common in other places as well. And people start feeling.

</turn>


<turn speaker="Fernando Pereira" timestamp="28:35">

So the reality is that this is something I fight constantly. I've had many conversations about
hiring and about evaluating candidates. That always the kind, Oh, but X does not have as many papers
as Y. And the one question might be, well, they maybe have different career trajectory. Maybe they
had some issues in their life that got the way of essentially being able to meet every single ACL
deadline. Let's look at what the fundamental contribute information we have about their talent and
about their creativity, about their interest in solving real problems. And you often find that if
you look at it, not from the point of view of did you kind of tick this various check boxes, but
rather did you bring a new perspective to what we need to do because we don't have any problem in
hiring more people like the people we have already, but that's not really where it's at. Where it's
at is to hire new people, more people when we would hire hire people that are different, they're
fundamentally different than have other dimension had a critical look at what we do that can change
for the better. What we do.

</turn>


<turn speaker="Matt Gardner" timestamp="29:51">

So say you are a person who is screening resumes for an internship or for a new research scientist
or whatever. I've been in this position recently. What recommendations do you have for someone who
is doing this? Given that basically all you have is a resume, how do you get the information that
you're talking about? Do you have any advice?

</turn>


<turn speaker="Fernando Pereira" timestamp="30:10">

Yeah, so I mean I have not been doing that myself so I cannot give you a sort of procedurals answer.
What I will, ask you is for instance, does this person have a life experience, work experience for
instance, academic experience that is different in interesting ways from what we have already an
adds some dimension for instance, someone was like, look at the resume and say maybe it's not
someone who has a computer science degree, but they were a field linguist in West Africa that would
wake me. I would immediately be say, Whoa, this is very interesting. This is maybe someone who will
have a much better perspective on how we think about different languages and dialects in our
products and so on and so forth. I mean you have to look at the specific cases.

</turn>


<turn speaker="Fernando Pereira" timestamp="31:03">

You can not have some kind of general recipe, but you have to think of it from the point perspective
of that when you build something like a search engine, you're building something for, you know,
hopefully form the greatest number of people and therefore they have different techniques, different
experiences, different expectations. If you only have a very narrow range of people in your team,
you're going to forget, not ask these questions for instance, about different dialectal variation
areas like, you know, code switching, like the fact that most people are multilingual outside the
United States. In fact, the United States have a lot more multilingual people than people think
about. And so all of these factors, you know, if you go at the screening resumes with an open mind,
you'll see there is interesting different people in that with different experiences. You'll want to
interview them. You don't you know, you clearly, you want them to be able to work in your
environment reasonably well. But you know, if they don't necessarily know the fine, all the fine
points of of sorting algorithms that's not here or not there, right?

</turn>


<turn speaker="Fernando Pereira" timestamp="32:18">

It's a, we have enough of those people, but someone who really understands you know, for instance,
you know, that has a socio-linguistics background, or sort of neuroscience background could be
incredibly illuminating to your, to the work you do and guess what, they might well be different in
the backgrounds in ways that are also very interesting from the point of view of the dynamics of
your organization. So I cannot say a specific recipe, but this is the way that what I recommended,
and what I constantly tell. In fact, we changed our hiring guidelines for research scientists. I
pushed for this and then we did it a few years ago to get away from the idea that all research
scientists have to be computer scientists. And I said, no, I, you know it could be research
linguists, it could be a research biologist. We need these people, depending on the goals we have
for particular team, for particular project, you need a wide diversity of talent.

</turn>


<turn speaker="Fernando Pereira" timestamp="33:17">

And for instance, we have an intern longterm intern in our team who's a biologist by training and
she's working on our biomedical information retrieval with Ryan McDonald and Keith Hall and others.
And that's a very important role for us is have someone who understands the domain and has this, can
learn where they can learn more about the say the machine learning and natural language
understanding and we can learn more about what matters from, people doing biomedical research so
that at that two way street is what we're trying to build.

</turn>


<turn speaker="Matt Gardner" timestamp="33:59">

Yeah, that's good advice. I guess I feel like it's easy in a small company where you're the one who
is doing research and screening resumes to latch on to like easy signals, but that can be pretty
damaging. It's good to hear these reminders.

</turn>


<turn speaker="Fernando Pereira" timestamp="34:13">

Yeah, I mean, look, I can only do the job of trying to persuade, try to nudge people in this
direction. We're not perfect by any means. We, have, it's easy to fall into the, because you are in
a hurry, and you have lots of resumes to look at. So it's easy to fall into these sort of standard
patterns, part of the job of research manager is to make research more interesting by kind of
getting in way of routine, asking questions, you know, why are we doing it still this way, whether
it's the science or the engineering or the recruiting or the, you know, all of these things have to
be challenged in a positive way, but they have to be challenged. So that's, I mean, my response to
this question about diversity and inclusion is not, I mean unfortunately is not something I can give
some fantastic metrics on. It's just a question of having my personal experience, both as, as a
faculty member before and now as an industry research manager is you have to challenge your own
assumptions about what's important. And one of them is what's important is all of us did this for
the same deep learning course in the same top 10 universities.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:33">

Okay. So I would like to pick your mind on like the collaboration styles between research groups and
product groups. So they're kind of like two like common ways of doing this is; the first like in
some research groups the researchers would develop some method as inspired by certain problems that
matter to the company. Implement prototypes, show results on some academic datasets and only then
collaborate and reach out to product teams who will assess whether this is useful for them or not.
And oftentimes this means like re-implementing the library or the method to be more consistent with
the existing code base, another like way is to actually embed research groups within the engineering
teams and like work side by side to develop these methods and become like basically you don't need
to implement anything at the end. Do you see like what are your thoughts on this pros and cons or if
you have a preference?

</turn>


<turn speaker="Fernando Pereira" timestamp="36:29">

Well it really depends on the type of problem. I mean, I think we've been very successful and in
fact most of the biggest successes have been when the research results are in the form that are kind
of easy to communicate and to collaborate on with the product team. If the notion of, Oh, here's
research, they build a prototype and now there's some kind of a set of developers in a product
that's going to take the prototype and rewrite it from scratch. That model, I've not seen it succeed
much at Google. I think it doesn't mean that the researchers are not independent. They are, but I
think that the successful efforts always involve one or more of the researchers being very engaged
in the collaboration at the level of we [are] sharing the code, we [are] doing the experiments
together, we [are] looking at the results together.

</turn>


<turn speaker="Fernando Pereira" timestamp="37:31">

You teach me what's important from a product point of view. I teach you what I've learned about
different ways of modeling this problem. So because otherwise you get off, when the failed mode I've
observed is someone will ask a research product group, Oh, you have such and such a problem, let's
say a spam classification problem example I give and what do you want? Oh, I want hyper say 95%
precision at 80% recall just making up some numbers and researcher goes away, trains a model on some
of the data. Maybe there's some gold labeled data and Oh, oh, I can get this, but then product team
takes the model and retrains it on the real data they have and the quality is much worse. Oh, wait a
minute. Why is that? Oh, except the fact is that the actual, you don't have much gold label data.

</turn>


<turn speaker="Fernando Pereira" timestamp="38:29">

Most of your label data is noisy because the humans who are labeling it are in a hurry and or get
tired and they make mistakes. Oh, you didn't tell me that. Well, I mean clearly this is not going in
that well. Right, because I did all my work. I got the numbers you told me and now you are telling
me that my work doesn't matter. This is a failure mode that is not uncommon. And that we try to
avoid by asking the question, what is the real problem you're trying to solve? It's not to get the
classifier with some precision recall. You so have a system that is embedded in a product that is
going to use the information that the product can collect. It might be noisy labels for example. So
actually the problem of creating something that handles noisy labels is much more interesting. It's
actually from a research point of view, it's a much more challenging one and one where the
researcher can learn a lot from practice. So creating those early relationships and those early
conversations is what avoids the kind of failure that I described. It also makes the research much
more interesting. So that's the model that I try to encourage. That's the model that we've
succeeded. Our biggest successes have all been under that model.

</turn>


<turn speaker="Waleed Ammar" timestamp="39:48">

Yeah. Thank you for sharing your thoughts on this, I think we're almost out of time. So I wanted to
ask if you have any final remarks or advice you'd like to share with researchers or research
managers?

</turn>


<turn speaker="Fernando Pereira" timestamp="40:00">

Well, years its for molding for researchers wondering should I consider a role in industry, whether
in you know, small company in a startup or a large company and they think the answer is you
shouldn't think of it as a better payed academic job. I think that's a very self-defeating way of
proceeding, even though it might be more profitable in short runs. I think that people should think
it as what are the problems that this company's trying to solve or these problems I care about. Does
it have a function that I share, a function in society that I am aligned with and if so, and if I
think that can contribute to solving those problems and creating those results, that will be a value
in the ways that my own value system operates, then that's where I should go in this direction as
opposed to, you know, the more natural for someone who's had a graduate degree to continue to be in
academe.

</turn>


<turn speaker="Fernando Pereira" timestamp="41:03">

But that's even true if someone wants to be in academia but then doesn't care about teaching, it's
again a misalignment of values that is problematic. So decide to do the research and join the
organization that aligns with your values of what you're looking for in your future. Don't decide it
on the basis of, Oh, they have a big research group, so I want to join because there's all these
successful people there that's not a good longterm recipe for wellbeing and for impact and
satisfaction in your career. Do something that you feel really committed to as in terms of the, your
curiosity, your personal values, where you think you can help make a difference.

</turn>


<turn speaker="Waleed Ammar" timestamp="41:54">

Yeah. And honestly we're very fortunate in this, in NLP and also computer science at large in having
many choices. So I think, we do have a lot of choices to make and we can align it so that we, like
we're pursuing the thing that we actually care about.

</turn>


<turn speaker="Fernando Pereira" timestamp="42:10">

Well, thank you for talking to me. Hope that the recording is acceptable to your podcast. I look
forward to seeing it.

</turn>


<turn speaker="Waleed Ammar" timestamp="42:19">

Yeah. Thank you so much. This was fun.

</turn>
