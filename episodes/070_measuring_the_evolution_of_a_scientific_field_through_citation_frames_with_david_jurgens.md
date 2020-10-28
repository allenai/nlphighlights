---
title: "Measuring the Evolution of a Scientific Field through Citation Frames, with David Jurgens"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["David Jurgens"]
number: "070"
tags: []
description: "TACL 2018 paper (presented at ACL 2018) by David Jurgens, Srijan Kumar, Raine Hoover, Daniel A. McFarland, and Daniel Jurafsky David comes on the podcast to talk to us about citation frames. We discuss the dataset they created by painstakingly annotating the \"citation type\" for all of the citations in a large collection of papers (around 2000 citations in total), then training a classifier on that data to annotate the rest of the ACL anthology. This process itself is interesting, including how exactly the citations are classified, and we talk about this for a bit. The second half of the podcast talks about the analysis that David and colleagues did using the (automatically) annotated ACL anthology, trying to gauge how the field has changed over time.

https://www.semanticscholar.org/paper/Measuring-the-Evolution-of-a-Scientific-Field-Jurgens-Kumar/65118f3a7463f54bdf9b9e5cdd655953a2488c2f"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F501772917&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists for The Allen Institute of
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

Today our guest is David Jurgens. David is an assistant professor in the university of Michigan. He
is going to talk to us about his paper Measuring the Evolution of the Scientific Field through
Citation Frames. It was published in tackle 2018. So the first part of the paper focuses on the
problem of applying papers, citations with labels such as my ground extension and future work. You
introduce a new dataset of paper citations and use it to train a state of the art classifier for
this task. In the second part, you applied this classifier to about 2000 NLP papers and observe
interesting patterns in the scientific literature. What was the main motivation behind this work and
why do you think it's an important problems to study?

</turn>


<turn speaker="David Jurgens" timestamp="00:56">

Oh, well it really started at the end of the paper. We worked backwards. I would say we were pretty
interested in how the scientific fields have evolved over time. I mean, NLP is a pretty interesting
case study in that because we started out of linguistics, I mean, you know, decades ago home, some
might argue centuries ago at this point, which it sort of straddles the boundary of a hard and soft
science, but we're very much in the computer science realm these days. And so we're curious how that
played out in terms of the community and how we behave as scientists. And so to kind of get at that
question, we said, well, it'd be nice to look at how we're citing one another. And that became a
harder question in itself. So the first half of the paper is kind of the building the scientific
tool, that lets us answer a big question. And the second part of the paper is really just trying to
answer that question from different aspects.

</turn>


<turn speaker="Matt Gardner" timestamp="01:40">

How, how do citations let us know how we switched from linguistics to computer science?

</turn>


<turn speaker="David Jurgens" timestamp="01:47">

Ah, so that, that isn't it being this a, this argument from rapid discovery science. So this is a
famous paper, but well, somewhat famous paper by Collins. So if you think about humanities and the
to somebody at the soft sciences or the social sciences, there's lots of argumentation about like
what's right or what's true. And so you can think about, you know, if you think back to the 80s,
like how do we evaluate whether a parser was good or not, you know, well, you have your data set and
I have my data set and we have to argue nonstop about which one's better, which kind of cases. But
one of the things that Collins argues is that the way to get around this is to have consensus. And
so it turns out if you run your parser on the pantry bank and you score better, well, we all agreed
that that's a better, a better parser. So you get this like building of intellectual lineage. So we
all like extending each other's tools or and you get consensus that, okay, what does it mean for us
to be progressing as a field? And so we thought that the citations would feel this for us in terms
of like how often authors sort of acknowledged versus contrasting each other's work and how they
incorporate others' works into their own.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:56">

Right. So you construct a new dataset for the task certification for citing citations, could you
elaborate on the classification scheme that you used at adaptation process?

</turn>


<turn speaker="David Jurgens" timestamp="03:06">

Sure. So, I mean, trying to figure out what exactly a citation is doing is not a new problem and
there's stuff back to the 60s and probably earlier to some degree that, that have looked at this.
Our big goal was to find something that we thought capture the motivation for the big question of
like how the scientists change their behavior. So we boiled it down to six classes that we thought a
classifier could easily distinguish between. And then we annotated around 2000 data points. So, we
ended up having background versus motivation. Like what actually drives the field. We want to look
at whether you use something or whether you extend the work. I think that one was kind of a fun one
because we often hear that like it's better not to be incremental.

</turn>


<turn speaker="David Jurgens" timestamp="03:51">

So we thought we would probably not see something in terms of extension, like no one wants to just
keep extending someone else's work. And the comparison, we had this comparison and contrast. So it's
trying to align something about your work in another's work and thought that would be useful to
think about. And then it's kind of another curious citation type that we hadn't seen before, but it
kept it popping up when we were looking at papers. In the conclusion people are always doing this
future work point or it's like, Oh, in the future we're going to do this thing. And often, you know,
it's trying to satisfy some reviewer like you wanna you wanna like point to the reviewers that, Oh,
we thought about this but we're not doing it just yet. And so we wanted to throw that in because
they thought that that might actually have some interesting implications later on. We never saw. But
we were pretty happy to include.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:35">

Yeah. you seem like useful classes. I wonder if you've seen cases where like multiple classes apply.
Especially things like uses and extension. I can see many cases where you are using that work and
also extending it at the same time.

</turn>


<turn speaker="David Jurgens" timestamp="04:52">

Yeah. So if we saw use and extension, we would lean towards extension. They were actually weren't as
many as we thought when we really boiled it down. I would say the hardest one was actually
background versus comparison or contrast. Cause sometimes it was tough to tell whether they're just
acknowledging past work or if they're trying to make some sort of implicit comparison. The danger
like as an author making a comparison or contrast statement is that the reviewer will want more from
that. Like, Oh, you should compare more. You should actually evaluate against them. Whereas if you
just sort of acknowledge them and sort of move on you can sort of get away with not doing that
comparison. However, if one of those people is the reviewer that you're acknowledging and they're
like, Oh, well, you should've said more and then it's kind of this I don't know, chicken in the egg
game, which one do you do? Or prisoner's dilemma game or something.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:41">

Right? So just to to clarify, so each element or each incident in your training set has one citation
context. So also possibly one reference may have multiple contexts and what you're really
classifying is this particular context.

</turn>


<turn speaker="David Jurgens" timestamp="05:58">

Yeah. So it's just one particular context. We definitely see that all citations get used differently
throughout the paper. The same citation. You know, you'll use it as motivation in the intro and then
you'll compare against it later and then you'll you know, maybe use some features that it uses as
well.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:12">

Right. So I've been for each of these who give them one label out of the six classes

</turn>


<turn speaker="David Jurgens" timestamp="06:18">

Yes, for each individual context, individual usage.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:21">

Right. So who did the annotations?

</turn>


<turn speaker="David Jurgens" timestamp="06:24">

Myself and let's see the third author, Raine Hoover.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:29">

All right. Yeah, that must have been a lot of fun.

</turn>


<turn speaker="David Jurgens" timestamp="06:31">

Oh man. It was a, there was a lot of back and forth. We ended up, we wanted to make sure that
dataset was like as high as quality as we could get. So we actually adjudicated every disagreement
in the dataset like we went through. Just, I mean, that helped us as annotators for sure. But like,
I, I'm really confident that our annotations are good, but he was the labor of love, I'll say that
much.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:53">

Yeah, sure. So the, what's the total, what's the output of this? So how many examples do you have?
How many papers?

</turn>


<turn speaker="David Jurgens" timestamp="06:59">

Oh, geez. I have to look back on the paper itself, but I would say, so we tried to sample uniformly
across years. I mean, certainly one of the, and universally uniformly across venues. So in order to
kind of get the diversity of what kinds of things we saw. So we didn't just want workshop papers, we
didn't want just conference papers. I want to say there's around 1,969 citations in the paper.
That's the, the number in the paper. So we had a 133 papers. Occasionally we would sample a few
extra citations. We couldn't find something. So we like we may have over sampled from conclusions
and from introductions to try and find a few extra motivation citations or future work citations
just to get a sense of where those might occur.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:44">

Right. And are these also reflected in the development of test sets or are they only represented
over represented in the training set?

</turn>


<turn speaker="David Jurgens" timestamp="07:52">

So we actually, we, didn't do atest, train and dev splits for this we just did cross validation.
However, had I done this again, I would totally have done test train dev slips thinking that it w it
would've been much better for the hyper parameter optimization. Had we done that?

</turn>


<turn speaker="Waleed Ammar" timestamp="08:07">

Yeah, I always like a struggle with this one. I'm obstructing a new data set especially when I'm
oversampling. It's not always clear whether we should include that non-natural distribution as part
of the evaluation.

</turn>


<turn speaker="David Jurgens" timestamp="08:21">

Agreed. Agreed. Yeah. So it's something that, that we looking back on, we probably should have
thought more about in terms of the dataset construction. I think because of the, the annotation
effort involved in getting each of these and the fact that it's not a large data set, we ended up
not doing the test train and depth slip, cause losing 20% of the data was like wow, they still don't
have a lot of data at that point.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:40">

Yeah. It makes a lot sense,

</turn>


<turn speaker="David Jurgens" timestamp="08:42">

But it's still a, you know, I, I do think going forward we would have taken that in that data set
size hit and done it just because I think it makes her better science doing test train and dev slip.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:51">

All right. So I'm moving on to the paper. You developed a state of the art model for classifying
citation functions. Could you say a few words about how the model works?

</turn>


<turn speaker="David Jurgens" timestamp="09:01">

Sure. So we well we thought about it from the big picture of what, what kind of features might
capture how important a citation is used. So there's been plenty of work. Simone Teufel has done
great work in her argumentation, zoning papers, looking at the lexical patterns that like, like
lexical patterns that capture that citation usages are rhetorical framing effects. So we, we built
in some of those, but then we added a bunch of stuff looking at a topical effects, topics that occur
like sections. In terms of like how the paper; where the citation occurs within the larger structure
of the paper we did some larger features. Look at how the citation is used within the field as a
whole. Like how many times does it cited with other papers?

</turn>


<turn speaker="David Jurgens" timestamp="09:49">

How central is it to the paper? You can think that the famous papers end up just sort of sucking up
a ton of citations. It's sort of guiding posts or people in the introduction. So if you see
something that's highly cited, there's a good chance to see their background or it's a a user
citation that everyone's using the same kind of data set. So we had we had these these features, we
had things about, you know, how the papers used or how the references used throughout the work. So
how many kinds of citation does it have? Is it used indirectly? So if you talk about Stanford
Cornell LP and then you keep using the word Cornell P without citing it explicitly, that can be an
indication of it's kind of intent, I'd say by far that there's a lot more lexical features in terms
of trying to capture the context around a citation in a general way. And so we, we kind of dump all
of these into a random force classifier which performed by far the, best set of all the different
methods we tried.

</turn>


<turn speaker="Matt Gardner" timestamp="10:47">

Did you have any features that looked at the cited paper?

</turn>


<turn speaker="David Jurgens" timestamp="10:51">

So that was, I would, that's the, that's the missing link for me. I would love to do some sort of
alignment between the cited paper and the citing paper. The big issue for us was getting access to
full text. So we could've looked at rough citations that were just within the ACL anthology, but I
think that this, that probably would've been under half of the total citations. So you know, famous
papers like wordNet, just not in it any time you sight word to vedh from its NIPS paper that's not,
we wouldn't have full text for that unless we went out and scraped it as well. So there's just a lot
of missing data there. But I do think that's actually, that's the most exciting like development for
me is looking at this multi, if you have two full texts doing the alignment between that, trying to
understand how they relate together.

</turn>


<turn speaker="Matt Gardner" timestamp="11:34">

Would you have abstracts for these other papers at least? Would that be enough?

</turn>


<turn speaker="David Jurgens" timestamp="11:38">

You could probably do some. I mean, I suspect that even an abstract alone would do quite well. I
dunno if we could get abstracts for all of them and some sense it boils down to getting the data
that, but yeah, that'd be interesting to see

</turn>


<turn speaker="Waleed Ammar" timestamp="11:49">

That as a, like here we can have the open Corpus that we are using at AI-2 where it does include the
abstracts for the open portal, which includes all archive obligations. But yeah, I do think that
it's, it's not an easy thing to include because oftentimes when we cite the paper we don't cite
everything in the paper we cite a specific part of it and the abstract doesn't usually capture or
doesn't necessarily capture that one.

</turn>


<turn speaker="David Jurgens" timestamp="12:15">

Yeah. I mean, I'd still be curious to try it with just abstracts. I think it's a, it's a fun
question, but thinking about how those two papers relate.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:22">

Yeah. the other things you mentioned here is that there has been a couple data sets released for
like indicating we're in the cited paper, the citation is referring to. And so it's a, it's a, it's
a task that people are currently working on. We haven't made huge progress on it, but at least
there's some data there.

</turn>


<turn speaker="David Jurgens" timestamp="12:41">

Oh, nice. I will definitely I'll check that out.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:44">

Okay. So the next part of the paper talks about doing macro analysis of the citation patterns and
NLP papers would you like to tell us a bit about what are the hypotheses that you want to test in
this part?

</turn>


<turn speaker="David Jurgens" timestamp="12:56">

Yeah. So we, we have a few different questions we wanted to get at. I mean, so the big question was
looking at how the field changes as a whole, but we also want to kind of work our way backwards from
there to, to build our confidence in the model, so to speak. So one thing we want it to last, which
is kind of the, the sanity check, which was the first experiment. How does citation usage theory by
section? So we all well, all of us, I certainly wasn't aware until I started digging into the
literature, but there's a lot of work on discourse analysis showing how authors will phrase or a
rhetorical structures to match their argument. So it's like these argumentation moves within the
sections of the paper. So we try and like lay the groundwork in the introduction and we sort of
defend our work and related work and then how we describe and present our works in the evaluation
results section. So we thought citation should vary in terms of like their function within the
sections, but no one had looked at this. So we said, Hey, let's, let's take a look at that and see
if we actually see that the citation functions match the rhetorical structure of the sections or the
expected rhetorical sections. Do you want me to go into that or talk more about that or you want me
to talk more about the hypotheses?

</turn>


<turn speaker="Waleed Ammar" timestamp="14:08">

I mean, well, yeah, we can talk about this in a bit more detailed before going to the next one.
Yeah. The, there are multiple interesting questions that, we have.

</turn>


<turn speaker="David Jurgens" timestamp="14:16">

Yeah, I mean, well, thankfully yeah, the result just falls out. It's kind of like, it's almost like
a no result because you expect it to be there and then it's just there and it matches your intuition
all the way. There was kind of a relief to be like, okay, yes, this it's actually, it works. So
yeah. You see this like big clear difference where like,

</turn>


<turn speaker="Waleed Ammar" timestamp="14:32">

No ma'am. Yeah. I mean I, I see value. I see.

</turn>


<turn speaker="David Jurgens" timestamp="14:35">

Yeah. It was nice to show that they align and you seem like it's kinda fun to think about how my own
paper, like when I write my own papers, how I'm like, okay, yeah, my motivation is in the
introduction. Maybe the one surprising thing that we saw was in related work. There's just a lot of
acknowledgement within related work. That's not like an actual comparison. It's like I can think of
papers that I've read where it's like, Oh yes, others have done this work, blah, blah, blah, blah,
blah. And it's like kind of this block of citation for that. No, like actual substantive comparison.
It's just acknowledgement. But, so that was kind of fun to see. You also see like this increasing
amount of punting future work forward as the paper goes on. So by the time you hit the conclusion,
there's like a ton of future work citations, but you see it in results in discussion where maybe you
can see authors trying to defend themselves against potential reviewers, say like, Hey, we
acknowledge this is a potential thing but we're not going to do it now. So that was, that was fun to
see as well that like that extra citation function actually played out in terms of rhetorical moves.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:27">

Yeah. Was it easy to distinguish the future from the background?

</turn>


<turn speaker="David Jurgens" timestamp="15:30">

Yeah, actually it wasn't too bad. There's, there's a pretty strong lexical signal where people do
submit, literally say in future work we will, you know, try this data set or use this method future
ends up being a very strong keyword.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:42">

Yeah. I guess you also like, this is how you, Oh, you over-sample this example.

</turn>


<turn speaker="David Jurgens" timestamp="15:47">

So for that we actually, I mean we just annotated a bunch of conclusions. So I would say that we
weren't particularly biasing towards features actually. So the thing that we, we annotated the last
three sections of papers wasn't just conclusions because otherwise we have this bias towards certain
types of things occurring in one section.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:04">

So I guess I misunderstood this. I thought what you did is you had something like 52 papers where
you annotated all the references in them and then you over sampled using some queries to get an
oversampling of the minority classes.

</turn>


<turn speaker="David Jurgens" timestamp="16:22">

Right. But it wasn't just, we didn't just annotate those the context that occurred that had those
those queries in them. And we also just looked at other kinds of like the sections, like the later
sections of the papers as well. So we didn't want to bias the classifier towards certain kinds of
queries of features.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:39">

Yeah, that sounds good.

</turn>


<turn speaker="Matt Gardner" timestamp="16:40">

So when you were annotating the data, were you reading the paper from beginning to end and finding
all the citations and annotating them?

</turn>


<turn speaker="David Jurgens" timestamp="16:48">

So we used the BRAT annotation tool, which is like a shout out to the makers of that, that saved us
so much time it's amazing. So we had like a paper open at one half of the window and then there's
annotation tool that we had already used. The parse, it extracted citations from the other from the
ACL reference Corpus in the other window. And then we sort of walked through the paper. Cause
sometimes it's not clear like where the citation is occurring, like which section is in or like
what's kind of the larger discourse around it. Sometimes it's really clear what the function is just
from the local context. But you kind of would skim the paper often you don't have to read the whole
paper.

</turn>


<turn speaker="Matt Gardner" timestamp="17:24">

Do you think there was any bias? Like I, I'm imagining like, Oh, I'm reading a related work section.
This is probably background. Like maybe this is going through my head as I'm reading. I wonder if
there was some bias in the annotation process because you were looking at the paper and not just the
citation context in isolation.

</turn>


<turn speaker="David Jurgens" timestamp="17:41">

Well we tried to focus just on the context alone as much as possible. I would say sometimes in cases
of input, like sometimes you could find that the context, like there's a preceding context. Even
that like switches at where it's like us, you know, like for comparison they might say several works
have differed explicitly how they used a certain classifier and then there's the context looks like
they're just doing a background but it's actually within this larger comparison structure. So that's
where the paper helped out. Specifically, I would say that we try to explicitly not to look at the,
the section itself in terms of like, Oh, I'm in a certain kind of section. But yeah, I, you know,
potentially that that could have biases.

</turn>


<turn speaker="Matt Gardner" timestamp="18:18">

Yeah. Annotation is hard, right?

</turn>


<turn speaker="Waleed Ammar" timestamp="18:21">

I mean there's this really like bias that we want to avoid though because accused there from the
perspective of the reader you're all, you're always going to have this bias when you're reading a
certain section, you have certain expectations and if the classifier is trying to simulate that and
it's a natural bias that we probably want to keep in.

</turn>


<turn speaker="Matt Gardner" timestamp="18:40">

All right, right. I guess, like you mentioned earlier, David, that the result you expected just kind
of fell out. I like that. That does make a lot of sense that these, that these citations would be
used this way, but you just have to worry about how was their bias. Are we just reflecting our
biases?

</turn>


<turn speaker="David Jurgens" timestamp="18:55">

Yeah, yeah. Could, could I like could we have bias the model to find this result? And like surprise.
So the thing that we did yet that I think that was a constant worry in terms of all of our stuff,
all of the experiments that like somehow we advise the model. I think going back to the annotations,
I still agree with how we constructed it. But I do think that there could be some latent bias and
that we are just not aware of. We tried our best not to do that.

</turn>


<turn speaker="Matt Gardner" timestamp="19:20">

Yeah. Yeah. You did say you explicitly tried to like not use too much of the surrounding paper only
look at the context. So I would expect that there is some, it's small. I was just curious.

</turn>


<turn speaker="David Jurgens" timestamp="19:32">

It'd be nice to try and measure that somehow to see if you, if you had the larger paper, maybe we
could actually do a pilot study to see if there's some experimentation. I'd be curious where we
would see at the most even with like a novice reader who doesn't have the expectation of like what
you expect to see in a conclusion.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:46">

Okay. All right. So the next question that you studied this part of the paper was like seeing how
different venues exhibit different citation patterns.

</turn>


<turn speaker="David Jurgens" timestamp="19:55">

Yeah. So this one we were trying to get we're thinking about framing here a little bit in terms of
like what does it mean to present yourself as good science? So having a submitted to TACL, it's
like, how do you have to justify your, argument to get into TACL. You need like lots of citations.
You need lots of comparison. And we thought about that we might see quite a bit of difference in
terms of the venues. So we actually looked at in two sub experiments here, one we looked at the high
level venues, like the different conferences, a workshop as a whole SemEval as a whole and the two
journals in the NLP field. And the other one is like so Hal has this blog posts where he talks about
workshops and the ACL is like ACL workshops for like mini conferences.

</turn>


<turn speaker="David Jurgens" timestamp="20:41">

And we said that's testable. Like I can actually test that with our method. And so we kind of talked
threw it in, we said, have workshops evolve to look more like conferences. So if workshops differ in
terms of how they present their science and a citation functions like reflect this like effort in
terms of how you do the science. And we should actually see like that workshop papers start to cite
more like a conference papers. So we ran both of those experiments. In the first one we actually, we
do see the venues different quite a bit. Probably the most shocking difference is between the
journals and the workshops. So you see that in computational linguistics and in tackle that you need
much more comparison with other work when you, even when you normalize for length. Whereas in SIM of
val, which is kind of like a big bake-off you don't have to compare against a lot of other people.

</turn>


<turn speaker="David Jurgens" timestamp="21:31">

There's, there's often you're on working on a new task. There's not a lot of people to compare
against. So you see it's much more integrative. Like we just used as much many different features or
other kinds of work as we can. So this is actually the kind of venue framing effects in terms of the
workshops though we actually did find that workshop have become more conference like and that trend
actually gets accelerated by long running workshops. So like the several workshop like, you know,
workshop on machine translation became the conference on machine translation. And so you actually
seen, you build more sort of institutional knowledge and expectations that the paper starts to look
more and more conference. Like in terms of like the, the way that they cite other works, there's
more expectation for comparison and for a substantive discussion.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:18">

I'm curious if you have also found or analized the progression for individual venues.

</turn>


<turn speaker="David Jurgens" timestamp="22:24">

Yeah, so we actually, yeah, we ran that analysis. I think somewhere in the metadata that we released
is a, an alignment from all the workshop numbers and ACLs like when it's like w 72 blah blah blah,
or sorry, it's like, you know, w 16 and there's a four digit code that corresponds to individual
workshops. So we actually aligned all the titles for all the workshops for all years. So you can
actually like see the progression because we really want to see like, could you actually see a EMNLP
and like the workshop on machine translation actually like become conference like individually. I
think we did see that it just wasn't convincing enough for us to put it in the paper. Like we just
didn't have enough data points, unfortunately.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:06">

Right. Yeah. Another one is probably ACL. You mentioned over the years that compare or contrast, a
number of comparisons have been increasing. Maybe a, I dunno,

</turn>


<turn speaker="David Jurgens" timestamp="23:20">

I actually, yeah, I think we did one at ACL although I shouldn't claim this on a podcast that I saw
that result, but I do think that we did EACL become more like NACAL and ACL in the way that it cites
though.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:35">

Yeah. And now of course the number of papers have been increasing over the years. So I think sort of
a interesting, like you probably want to, yeah, not like the number that I'm, I suppose the, the
distribution that that's currently represented is a more biased and more a more recent trends.

</turn>


<turn speaker="David Jurgens" timestamp="23:54">

Right. And there are more workshops you know, each year as well. So we had that effect for the
workshops as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:01">

Yeah. So I guess this is a natural, like a segue for the next question, which is venue evolution.
Oh, I guess we already talked about this. This is what the, how the workshops are evolving into
conference. Like,

</turn>


<turn speaker="David Jurgens" timestamp="24:16">

Yeah, we were trying, well, one of the things we were trying to, we were hoping to figure out is
what's the next workshop to become a conference? Well, we didn't have any clear results for that.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:27">

So you're not going to make a bet right now.

</turn>


<turn speaker="David Jurgens" timestamp="24:29">

Yeah, I'm not, I mean, if I, okay, if I had to make a bet I would say maybe something on multi word
expressions. They had a strong track record. What can I say?

</turn>


<turn speaker="Waleed Ammar" timestamp="24:38">

Yeah. That Nathan Schneider is going to be very happy with this. Cool. So the next one I think is
looking at can you predict the impact of our paper based on how they use a citation?

</turn>


<turn speaker="David Jurgens" timestamp="24:52">

Yeah, yeah. So maybe a little self interested here. Like how do I make my paper have more impact? So
can we predict the number of citations five years out? Like that was kind of the, like the simple
citation prediction task. And, and again, that's, we're kind of resting on this notion that if the
way that you cite is like, reflects the overall quality of your science or like how you make your
arguments, then maybe this adds information that would help you predict a citation impact. So we we
threw a bunch of like text features topical diversity year, number of authors, number citations. It
may actually do find that adding some citation information helps, so particularly works at compare
against more works and works that use or incorporate other other kinds of works, get higher
citations. So it's like things that integrate more and offer more substantive comparisons get cited
more. So that was kind of interesting to see. Like, it's really, it's a integrative science that
plays off, that it pays out, pays off in the end.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:56">

Could you say a few words about the other factors that you included in why modeling this? Because we
know they're like, this is, this answer is only as good as the, there are many like coordinates,
right? We don't think that any specific feature would be predictive of the impact. So what other
factors did you include in this study?

</turn>


<turn speaker="David Jurgens" timestamp="26:19">

Sure. So let's see. So we tried to control for a year because it suddenly, there's more citations,
more papers per year. So that increases number of citations, so that that should actually regrets
out to some degree, the number, like the size of the field. We looked for the particular topic of
the paper. So some topics are more more likely to get more citations. We looked for the diversity,
so things that integrate lots of different topics may be interdisciplinary and could receive
multiple. So you look at like the interview, the topic distribution. We look, we know that there's a
correlation between the number of authors and the end of the number of citations potentially to the,
like multiple cell citations from each of the authors. And we looked for how many citations that it
has within the paper, so that controls to some degree for length of the paper and for like how much
it's trying to do.

</turn>


<turn speaker="David Jurgens" timestamp="27:10">

And certainly this is not like the most comprehensive of all citation prediction methods, but it
seems to match with those features ended up being used by lots of other citation prediction at this.
One thing that I think we probably would improve the model that's missing is author, institution or
affiliation. That just seemed to be nearly impossible to get for with high enough quality for the,
for the whole dataset. But that ends up playing quite a bit in terms of like institutional prestige
you know, the rich getting richer sort of effect

</turn>


<turn speaker="Waleed Ammar" timestamp="27:44">

Right now, just author authors effects is also a problem.

</turn>


<turn speaker="David Jurgens" timestamp="27:49">

Yeah. Yeah. So trying to align all the authors in the paper with that information metadata with
just, we looked into it, but it just was too infeasible to for like, you know, one study of the
paper.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:00">

Well, I agree. I, yeah, I worked with a little bit of this before, at this earlier this year and it
was not easy,

</turn>


<turn speaker="David Jurgens" timestamp="28:06">

But I do think it's something that would really help improve the model. Especially if you think
about how authors, like individual authors use their different citations.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:16">

All right. So the last part of the section I think was looking at how rapid is our, NLP evolving.
You want to talk a little bit about this.

</turn>


<turn speaker="David Jurgens" timestamp="28:28">

Yeah. So this is getting back to this rapid discovery science hypothesis of like, do we actually see
increased consensus in the field and like, well, to get to be rapid discovery you need to be
increased consensus and like the development of an intellectual lineage. So, if you think about like
physics, the metaphor I like to think about as a telescope, like we still have telescopes around,
but they look very different. There's like gravitational wave telescopes instead of like optical
telescopes, although we still have those too. So if you think about like parsing, you know, back in
the day we had some like rule-based parser and now we have like sequence to sequence based parsers
or something. You know, the transformer base parses it like this incredible crazy technology. So
the, the methods there, but like the, the technology underneath it has changed. So, so we ended up
looking at how, authors have changed in terms of how they cite.

</turn>


<turn speaker="David Jurgens" timestamp="29:14">

Try to get at these, so one thing we saw was we saw increased consensus. So what we ended up
observing is that authors did this is this remarkable drop-off starting in the 90s where authors no
longer compared to other, authors. And instead they just acknowledge them. They're like, yeah, we're
good. Like other work has been done. And the thing that actually ends up taking the place of that is
this uses citation. So we all start to use more other's work more. We compare against others work
less and the things that we're actually using like soak up increasing numbers of citations. So we
think about what happened in the 90s. This is like the advent of the big datasets and the big
resources. So wordNet and tree bank, some other corporate they showed up at around that time, but
everyone starts to use these to evaluate their datasets or to evaluate their methods. So we no
longer have to compare against five other papers we just have to compare against who has the best
paper on the pentree bank the year before. And so that like significantly drops the number of
comparisons.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:17">

Quite surprising to me. I, when I look at older papers At least my impression is that we tend to
have fewer comparisons. So I wonder, do you think this might have something to do with looking at
the percentages instead of total counts?

</turn>


<turn speaker="David Jurgens" timestamp="30:37">

It's true. It could be. I want to kind of think if we'd looked at the total, I know that we looked
at the total count, but it was very early on. I do think that older papers tend to have fewer
citations overall the field was smaller so maybe there wasn't as much to compare against. So that
could potentially shift the percentage higher. But we do, I mean, so in 1980 to 1990 it's like 40%
of citations are comparison where it's in like the 2000 and 2010 it's like 17% and I don't think
that the count, the count difference would actually explain that you know, more than half of the mat
probability mat of the comparisons disappearing.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:19">

Yeah. It's a big difference. I find it very curious.

</turn>


<turn speaker="David Jurgens" timestamp="31:22">

When we saw the graph, you're like, what is going on? Like that. That's, that's a shocking trend and
not one we expected, but we definitely see in the data.

</turn>


<turn speaker="Matt Gardner" timestamp="31:30">

Did you do any kind of qualitative analysis to see like is the nature of this citation different?
Like I'm thinking of some older work that I'm familiar with that just isn't as empirical as we are
these days. And so like what does comparison and contrasting? Like what, what kind of citation is
that 40 years ago.

</turn>


<turn speaker="David Jurgens" timestamp="31:52">

Oh, so like the language. Yeah. I don't know if you looked looked at us for that particular aspect.
I mean, it could be that we talked you know, the field talked about their comparisons differently in
the eighties and early nineties. Yeah, that's a good question to think about. Whether the rhetoric
around those citations actually changed.

</turn>


<turn speaker="Matt Gardner" timestamp="32:11">

Yeah. I'm remembering papers that talked about weights in a model as like dollars and costs and
like, this isn't something you're going to actually run an experiment with you. It was arguing like
a, here's a conceptual thing. I'm going to argue for why this is a good model, but I'm not actually
gonna run any experiments. And these days we run lots of experiments. Right. at least a lot of
papers do. And I just wonder what exactly this compare or contrast means Over time and if things
have changed.

</turn>


<turn speaker="David Jurgens" timestamp="32:42">

I would say, the one funny quirk that we saw in the paper was right around like 2010 and we start to
see like a uptick again and the number of background citations. And this was because well, we were
kinda thinking like, why would this change? The ACL started allowing unlimited references and so we
started seeing like people's kind of tacking their paper a little bit more of like, well, I'm going
to try and defend against reviewers and like at least acknowledge people who might be reviewers, and
you start to see that just shift up slightly and it sort of, that ends up taking the place of more
motivation.

</turn>


<turn speaker="Waleed Ammar" timestamp="33:13">

Yeah, that's quite interesting. Like the timing of this with the allowing unlimited references are
very interesting.

</turn>


<turn speaker="David Jurgens" timestamp="33:20">

Yeah. I mean these usually like we wanted to look at it, but we weren't sure how to get at just yet.
Was the the anthology itself going online. So one thing that never made it to the papers, there were
a few volumes of the anthology that had delayed release dates like one or two years before they
ended up making it online. And if that changed how, if you never saw the paper, you wouldn't know
how to cite it. And so if you, if you looked at the citation usage for papers with the kind of
natural experiment where they just weren't online we just just never had enough data to actually get
a strong result for that. But I do think that the anthology showing up definitely changed the field
because we could actually see what others were doing. Otherwise you had to have like, you know,
Marty Harris was talking about just shipping files around to people or like, it was just this crazy
like how do we get access to the papers? Kind of problem.

</turn>


<turn speaker="Waleed Ammar" timestamp="34:13">

Absolutely. No, thank you for doing this analysis. I think it's a valuable type of analysis. We need
more of a to better understand how the scientific publishing works. Which I guess leads me to one of
my questions about scaling this to other domains. So this analysis was focused on an NLP domain,
which is an important one that we all care about, right? But there are other important ways and we
probably don't want to just like keep like a annotating a large number of annotations for each
domain because that doesn't scale very well.

</turn>


<turn speaker="David Jurgens" timestamp="34:48">

So I do think it would scale to, it would potentially work well for other domains. I think there's
probably the models would need a little more training data to learn how to generalize from NLP
jargon. I'm sure that it's picked up on some features somehow that cue certain kinds of citations.
But I do think that the general, the general structure of like the rhetorical moves, like the way
the authors present a citation there's enough that they would let it to generalize to other fields,
whether you would see like the, whether the results and the other half of the paper would hold for
other fields. I don't know. Actually that's something I'd be really curious to see. Probably the
biggest block. So if something, we actually want him to try it first. But the biggest challenge was
getting access to whole texts for a lot of different fields. And so we were like, well we know NLP,
we have a full data set for NLP. So let's go for that first.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:34">

Yeah, and NLP honestly is a, it's kind of a unique here because not very other domains have the ACL
and the equivalent of an ACL fellowship.

</turn>


<turn speaker="David Jurgens" timestamp="35:43">

Yes. I mean, I, I'm incredibly thankful for all the work that's been put into that. Like all the
folks involved deserve a big shout out for that.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:51">

Another thing that occupies my mind whenever like I'm trying to do this sort of macro analysis is
how well do we need our classifiers to perform before we can use them to make studies like this?

</turn>


<turn speaker="David Jurgens" timestamp="36:06">

Yeah. And that was a big concern on our mind. I mean, it's a hard task and like the classifier
performance isn't like 0.9 or anything like that. One of the things that that led us to say we are
confident in the results is looking at an error analysis. So even though the, I think the F1
somewhere around like .53 which sounds low and in fact it may be low, but one of the reasons for
that is if the smaller classes don't do well, it just drags down the F-1. And so what ends up
happening, what particularly dragged down our F1 was motivation there's not a ton of motivation
citations and they end up getting classified as background, which is not a terrible mistake to make.
You could probably make some claim that motivation is a kind of background citation.

</turn>


<turn speaker="David Jurgens" timestamp="36:56">

The other mistake was extends often gets classified as use. Which is again, not like it's kind of
semantically related in terms of like you're using some kind of methodology. And I think if we fixed
that we would probably have an F-1 of, you know, 0.7, 0.8. So it was just that the, there were
systematic mistakes that just dragged the whole thing down quite a bit for, so given that we saw
that, I would say that the, the trends didn't differ too much. We tried actually using a four class
model as well. And the, I would say that we saw that the same kinds of trends. So comparisons still
drops and you still see uses go up quite a bit. I forget what the performance for the four class
level was when I ran it, but that's sort of we said, okay, there's going to be systematic mistakes,
but we're probably just under counting extends and motivation and so we can go forward.

</turn>


<turn speaker="Waleed Ammar" timestamp="37:46">

Yeah. So I, I guess to come back to my question, you're saying we need to do an like a qualitative
other analysis and, and judge like there's going to be a judgment call here and we're going to have
to decide do we feel like the results of the classifier are good enough to do analysis?

</turn>


<turn speaker="David Jurgens" timestamp="38:05">

Agreed. Yeah. I think that you need, you need to some kind of qualitative analysis. Is it justified?
Like if you not perfect, what kind of mistakes are you making? And it's the, with the bias in those
mistakes affect the overall conclusions. Like is the bias in the right direction or the wrong
direction?

</turn>


<turn speaker="Matt Gardner" timestamp="38:19">

Right. And it seems important to think about domain issues. Cause I don't remember what you said.
All of your your annotations came from, but I assume it was a subset of the domains that you applied
the classifier to. And maybe there's some domain shift tat has some bias problems too, right?

</turn>


<turn speaker="David Jurgens" timestamp="38:39">

Yeah. We thought about that problem. So we tried to pull it from all the different workshops. And
all the different years. So we would capture any kind of domain or, you know, no one talked about
neural networks or the SVM was huge in the nineties. So we try to at least be requested that, but
you know, we can't cover everything. So.

</turn>


<turn speaker="Matt Gardner" timestamp="38:57">

yeah. Great.

</turn>


<turn speaker="David Jurgens" timestamp="38:58">

There could be domain effects for sure. I think if you try and generalize this to other fields, I
think that will be the hardest problem is actually, I mean like certainly like our topic features
will not work well if you run this on like the humanities or even on physics. So you actually need
to rerun, to regenerate, like how, how the domain actually talks about their citations.

</turn>


<turn speaker="Waleed Ammar" timestamp="39:18">

Okay. Alright. That was all the questions I had. Do you have any other thoughts about this work?

</turn>


<turn speaker="David Jurgens" timestamp="39:24">

I mean there's a ton of stuff that never made it into the paper. I think it's a really rich field.
So like, so anyone listening to me wants to poke around at the data. The citation network itself is
something we wanted to poke at. So these kind of network motifs of like how papers relate to one
another that just ended up being like yet another paper in itself that was too much to pack into an
already packed paper. So we were, I think we were really excited by that, but we just got even more
excited by the things that made it into the papers. So I think it's a, it's a pretty important and
rich field and also I would say that a big thanks to Simone for releasing her data. Some of the data
that we use in the paper, we actually adapted from another data set. So we've released our data,
she's released her data and I think it's a really, really wonderful when people release their data
for others to use.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:16">

Yeah, absolutely. And we're like right now sort of speaking that might be the team I'm working on is
using this dataset already, so thank you for this.

</turn>


<turn speaker="David Jurgens" timestamp="40:24">

Oh, fantastic.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:24">

All right. Thank you very much for joining us today.

</turn>


<turn speaker="David Jurgens" timestamp="40:28">

Yeah, thanks so much for having me. I mean, this podcast is a great idea. So I look forward to
hearing more of them in the future too.

</turn>
