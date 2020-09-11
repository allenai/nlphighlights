---
title: "Parsing with Traces, Jonathan Kummerfeld"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Jonathan Kummerfeld"]
number: "046"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:11">

Okay. Today our guest is Jonathan Kummerfeld who finished a PhD at Berkeley with Dan Klein about a
year and a half ago. And he, since then he's been a postdoc at the University of Michigan. His
thesis work was on Graph Parsing. He's currently developing a Conversational Academic Adviser,
Jonathan, it's great to have you with us.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="00:31">

Thanks for having me.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:32">

So today we'll, talk about your recent TACL paper called Parsing with Traces and I guess as they go
into the fourth algorithm and a structural representation. This was a, I guess you were just telling
us this was the core of your thesis work.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="00:47">

Yeah, that's right. So this is sort of the large chunk that really was half the thesis. And so I
wrapped it up and then it was published a TACL, but presented EMNLP a couple of months ago.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:00">

So the title is Parsing with Traces. What is the trace?

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:04">

Right. So first I should say a disclaimer. I am not a linguist in a sense. I took a couple of
courses during PhD, but that's it. So I'm sure there are technicalities, the definitions that I will
not get right, but the general idea is the traces capture some aspects of movement within a sentence
that we don't see in the surface form, but linguists believe is there. And to make that concrete, if
you take an example, like "I like books." Very short sentence, and then you think of if we convert
that into a question, you know, "What do I like?"

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="01:41">

You could interpret that transition from the statement to the question as being the books was
converted into this "wh" phrase. And then the "wh" phrase moved to the front of the sentence. And so
in the question form, what do I like? There's this trace of that movement from the front "what" to
the end as an argument of the word, like now that's a pretty simple example, but it can get sort of
arbitrarily complicated. I could do a similar thing with "Waleed thinks that Matt believes that
Jonathan likes books." And change that into "What does Waleed believe that Matt thinks that Jonathan
likes?" And you still have this trace, it's just going right across the entire sentence. So the idea
of this is to capture that movement and sort of express it in the structure of the parse.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:34">

But, wait a minute. If I'm like a new PhD student, maybe the only thing I've heard of is dependency
parsing. So you just get this whole tree, like what, where does this movement even show up? Like how
do you, how do you annotate this? What are you talking about?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="02:49">

Right? So yeah, so depending on which formalism you've grown up with, you'll see different things
here. Actually every formalism for syntactic representations, and apologies to linguists here, maybe
not every but have some representation of this. So if you look at universal dependencies which have
these arcs between things, they're right now adding what they call are enhanced dependencies, which
essentially create graph structures. And the thing that turns into a graph is adding these kinds of
arcs that show sort of long distance relations. If you look at the Stanford dependencies or other
dependency schemes, they are decisions they make about which dependency to keep from the graph
structure. Now of course that begs the question of what graph structure am I talking about? And most
of the sort of standard dependencies people think about come from the Penn Treebank where it was
originally a constituency representation. And there they sort of drew them explicitly in the
structure as part of the overall syntactic representation. And then when you do the conversion
dependencies, usually you throw away those bits and say, well, we're just going to get the
structural part of the parse

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:04">

Yeah, I guess if you're confused about what we're talking about to your, I would say definitely just
look at an actual Penn treebank parse. Go look at it, go look at the data and you will see sentences
where there's this crazy blank that linguists think should be there, there are good reasons for it.
But you don't see this in the dependency parse. Yup. So great.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="04:24">

I'd also add to that one thing you find there are all sorts of null phenomena that occur in the
treebank. So it's not just traces like this. You get all sorts of other things going on and the
standard step going back to Collins parse earlier in the 90s, was remove those from path's structure
and now get on with your parsing algorithm. So step one was always throw them away and essentially
what we'll be talking about is how I say, well, let's not throw them away. Let's try to actually
retain them.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:56">

Why did people throw them away in the first place?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="04:59">

So the problem these structures introduced is that they make your parses complicated in a very
particular way, which is that they break independence assumptions. So one of the things that makes
parsing efficient is we can make these very strong independence assumptions that say the structure
inside a noun phrase is independent of the structure outside it or for dependency parsing. If you
consider any arc, the structure underneath that arc between the words it covers and the words
outside it are independent. Now, once you have these non-local trace connections, those independence
assumptions break. So as a starting point, when we're looking at algorithms, it was convenient to
say let's not worry about them. Let's try and get the core structure first.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:48">

So, how does the dependency parsing formalism avoid this problem or does it?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="05:54">

So generally they avoided just by not including it. So the dependency parse is a tree and it leaves
out edges that would have created a graph structure. Now there is a decision of which edge you leave
out and either you keep kind of a structural edge, which means you get this nice protectivity or you
keep the trace edge, in which case you lose productivity but keep the tree. So people have tried
different ways of doing this and in some languages there's no way of escaping that non productivity.
But yeah, at the end of the day they make a decision and throw away part of it to get a tree.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:35">

And so what your work wants to do is instead of just giving us a tree structure, either a
constituency, parse that's removed traces or a dependency parse that is inherently just a tree. What
you want is to parse a sentence into a graph structure that preserves these trace or null elements
that linguists say are there.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="06:53">

Exactly.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:53">

So how do, how actually before we get to how you would want to do this, maybe we should talk a
little first about why. Why should we care? Like what, what could you, if you could recover this
structure, what could you do with it?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="07:05">

Right. So I should note one of the thing, you know, we've been talking about these structures, but
to give a sense, they're pretty rare in a sense. I mean, you know, 50% or so of sentences have them,
but there'll be just one edge in the sentence out of, you know, 20, 25 edges. So in terms of their
overall percentage of edges in the overall structure, they're not many, but they often encode really
useful information. So, you know, I don't be judgmental, but the edge linking the to, whatever the
noun is not such an exciting edge, but the edge linking the verb to one of its arguments is really
interesting. And that's often what's being thrown away because you have this argument that's null
for some reason or moved. So it's this case of a potentially losing representation of predicates and
the structure and essentially any downstream task in NLP may find that useful. So if you think about
information extraction, we're just not capturing all of the relations. If you think about your
question answering we're not able to structure our question as directly and we have to implicitly
get the question being asked.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:22">

Ya, so on the Aristo project here at AI2 some people built by hand, a system that takes a declare a
an interactive question that has this "wh" phrase and tries to undo "wh" movement. Let me back up a
minute. So we have multiple choice questions where you have a question plus some candidate answer.
And what we really want to do is have a declarative sentence that we can decide if this is true or
false. And then you can score these multiple choices against each other that way. But to get a
declarative sentence, you have to undo this "wh" movement.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="08:52">

Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:52">

And that actually is, maybe you could write, you can write down some rules to get you part of the
way there, but there are some complex things and if you had a trace that just told you where the
"wh" work was, it would be a whole lot easier to do to undo this movement.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="09:06">

Right, right. Yeah, no, exactly. And I mean that is sort of what we're recovering here though. Of
course, it's not easy to recover the trace either. So this is why the task is not straightforward.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:19">

Yeah. And just another, to give one other concrete example you mentioned information extraction
coordinate structures. Like if I have an "and" you want, you want to tell us what's going on with
this kind of structure,

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="09:34">

Right. So I'll just read through the, it's not a complete sentence. This is just a chunk. So "cooked
soup today and curry yesterday" Now what's going on here is that whoever is staying this clearly
cooked two dishes and they're telling you they cooked one on a certain day and the other on a
different day. And we kind of had this problem where we have to say, what should the arguments of
cooked be? And I mean, dependency representations always get into trouble when it comes to
conjunctions because it's unclear what the head of the structure should be. And what the traces
allow us to do is say that, well, cooked actually takes two arguments here. You know soup is
functioning as one of the arguments, but also curry is acting as an argument and that they're both
allowed to do that. And at the same time we're going to say that this whole conjunction soup today
and curry yesterday is also kind of functioning as an argument. And with traces you can encode all
of that information but without traces you kind of have to settle for one or the other and you get
stuck. You're leaving out some information or saying just the conjunction is the head, in which case
you've got this weird thing where you cooked and what does that even mean?

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:57">

Yeah. And this leads to some interesting problems and information extraction. So if you're trying to
recover predicate argument structure so that you can find open IE relations or something that you
can use for whatever to fill slots or something with information extraction. You have to deal with
these conjunctions and it's easy to get it wrong, but if you had trace it would be a lot easier.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="11:23">

And one other application that you know, I know less about but I think comes up is for machine
translation where in different languages you have different patterns of what gets dropped from the
sentence and how, and so you have this issue that in one sentence something gets dropped here. And
so you just don't have it in your input, but then you need to produce it on the output side or vice
versa. And if you had the null elements and their relation to the rest of the sentence, that could
potentially help you in the translation process.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:53">

Yeah, that's a good point. Great. So I guess we've talked about what we're talking about, why we
might want to parse with graphs. Your, the paper is actually quite dense and there's a lot of nice
nuggets in there. Do you want to do your best to tell us how you can do this parsing?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="12:13">

Right. This is the scary part. I suppose I would characterize this work as having a lot of little
ideas which work together to achieve this goal of trace parsing. And it's tricky when you have lots
of little ideas to sort of convey them in one hit. And you need all of them for it to work. So I'll
do my best. I think the starting place to think about this is if you go back to CKY which is the
sort of standard parsing algorithm and we think of the constituency parsing case what you have is
this table that represents at every point in the table a potential span of the sentence and what
structures could be in that span. And what we do is we say, okay, if I take items that span this
chunk of the sentence and items that are adjacent, so spanning another chunk just to there, say left
I can combine them to produce a bigger item that spans the whole chunk. And this gets back to that
independence thing I mentioned earlier where we can do this because we know that whatever's inside,
each chunk is sort of independent of what goes on outside. So we can do that optimization on each
chunk separately. So okay, that's fairly straight forward. We have one rule. The rule says take two
items that are next to each other and the constraint is they have to be adjacent and you combine
them to produce a new item at a high level.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:42">

Oh, sorry to interject real quick. So just to be totally clear, this is something like I have a rule
that says "S" a sentence goes to the "S" the non terminal, goes to NPVP maybe you would've seen this
rule and it's this rule that lets us join adjacent structures.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="13:59">

Exactly. Yes. And though we have to be careful. So there are two types of rules here. So one type of
rule is sort of grammatical rule like you just described. So "S" to NPVP now I can also say that X
goes to Y Zed and then X, Y and Zed, you know, apply extra constraints cause my have rules about
what you're allowed to combine and what you're not allowed to combine. But at a high level, from an
algorithmic perspective, it's just one type of rule that says you can combine two adjacent things to
get a new one. And then you get these extra constraints from grammar. So now what do we do to get
the graph case? Well, the problem we hear is that we want say our noun phrase to have a link to
somewhere else in the sentence. And so that independence assumption breaks, we can't do this nice
decomposition.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="14:56">

And the solution is essentially to make the items more complicated and then have additional rules
for what decides whether they can combine. So before I said the only requirement is two Items
adjacent, now I'm going to say my items rather than just having one type of item that is just, it
goes from word A word B, I'm going to say it has all these other little sort of flags on it that
describe its internal structure to some degree. And those flags go into a huge set of rules that
say, can you combine two items? So it's essentially impossible to describe the set of rules even in
a paper, even in a talk, you know, give me an hour and a whiteboard and we'll see how we go. But I
would say the core idea. So which actually the core idea was not mine.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="15:50">

It was something that I built on. This comes from Emily Pitler's work in 2012, one of the first TACL
papers actually. She had this idea that rather than having a continuous span of the sentence be your
item, you say, I'll have a continuous span plus one other point somewhere else in the sentence. And
you are allowed to have your item contain edges from that point to somewhere in the continuous span.
So this is pretty constraining. It's only letting you do certain types of structures, but it turns
out it gives you quite a lot of flexibility. Of course, it then brings up this question of, well,
okay, since I don't have just simple spans, how do I decide whether things can combine? And you get
this whole set of rules saying that, you know, if you have two continuous items, they can combine
but not if that external point is inside one of the spans.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="16:48">

And in some cases you can combine three items and in that case they have to obey these additional
constraints. And essentially it turns into a huge number of rules about these structural properties.
But at a high level, we're still doing the same CKY thing we're saying. You start out at the bottom
with just plain words and items with no structure at all and then you gradually combine them. Except
now we can combine three at a time sometimes to get more and more sophisticated items. Now the
contribution of this work is to go from the tree case to the graph case and also to add certain
properties like uniqueness to guarantee properties of the derivation. So I don't know if I want to
get into all of those right now, but that at a high level, that's kind of what we're doing and it's
how it works. In order to get a graph structure out.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:46">

So it might be helpful to give the intuition of why, why it makes sense to combine an item which has
just one word external to it. And what does it mean for this to to combine with an adjacent item in
terms of the one-endpoint space?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="18:08">

Right. Okay. So yeah, I'll explain that. So the one key idea that makes all this work, and again,
this comes from Emily Pitler's work and we've sort of built on it is this idea of one-endpoint-
crossing graphs. So when we think about dependency trees for a minute the standard dependency tree
you see is projective, meaning that none of the edges cross what one-endpoint-crossing as the name
kind of implies is we're going to consider structures that have crossing but with a particular
constraint. And the constraint works like this. Imagine you have an edge. So let's call it "E", so
you have an edge in your mind. Now look at every single edge that crosses "E" so you have some set
of edges that set of edges. They all share one-endpoint. So maybe they all start at word 16 and then
those edges go to words five, seven and nine.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="19:09">

But they all start at word 16, and they all cross your original edge "E" that's a valid one-
endpoint-crossing. If that set of crossing edges had multiple end points on both sides, then it's
not a valid one-endpoint-crossing structure. So that is a definition that you can come up with and
then it constrains the space of graphs you're considering. And this algorithm both mine and the
original from Emily Pitler say, okay, we're going to generate graphs from the space of one-endpoint-
crossing structures. So now you can start to see maybe the relation between the items I mentioned in
this space in that our items have a continuous span and one external point. And if you think about
this one-endpoint-crossing notion, that external point is the point shared by all of these, that set
of edges that go from there to somewhere in the sentence and cross your edge "E". And so with these
items, we're able to capture those structures and maintain that property of one-endpoint-crossing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="20:21">

Perfect. And I may add that the significance of this particular constraint is that it allows us to
increase the coverage of the parse trees in the tree banks that we commonly use significant to 97.
Is that a right number?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="20:38">

So the original work of Emily Pitler was looking at trees and there we do see this dramatic increase
in coverage across multiple languages well into the 90s. In our work we're focused on English. And
so I don't know exactly the numbers for other languages yet. We're also able to get it up to around
97% or 98% with some additional tweaks. And that requires one additional step, which is that in our
Penn Treebank, we don't get dependency structures. We get constituency structures. So there's this
entire second half of the paper that says, how do we take a Penn Treebank parse and represented in a
way that this dependency parsing algorithm can handle? So I don't know if we want to get into that
just yet, but essentially that's the other key. If you naively apply this calculation to the graphs,
you can get coverage as low as sort of 70%. It turns out you have to carefully choose that
transformation from the Penn Treebank to a dependency structure to get really high coverage with
one-endpoint-crossing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:51">

What kind of coverage can you get over the Penn Treebank if you don't handle any of these
phenomenon? Like if you just totally throw out no elements?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="22:01">

Right? So in that case you got 100% so no elements the entire source of all of these ones. Without
them you get projective tree structures in all as well.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:11">

Right, I meant, I meant the other way around because we're throwing that away. How much of the
actual tree bank are we miss representing?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="22:18">

I see, great. By throwing that away, we, if you do it at a sentence level, we're losing about 50% of
sentences. Now as I said, if you consider these arcs, there are only one per sentence also. So as a
percentage of arcs, it's actually extremely small. Sort of 3% or 4%. But of course that, you know,
overall the sentence is still there. Yeah, that's the trade off.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:49">

Interesting.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="22:50">

So one thing I should add then about this representation question is it's kind of interesting to see
what decisions impact this. The mechanism we're doing essentially is you take the constituency parse
and you say for every symbol in it what is the head of that phrase? For some of these it's pretty
obvious. You know, the, the noun phrase, the noun is probably the head for a verb phrase, probably
verb places where it gets tricky. Things like subordinate clauses and in you know prepositional
phrases and things like that. And some of those decisions are things that linguists actually argue
about a lot. And I don't know the details in that, but for us, we could do this simple experiment
and say, okay, if we set the head to be this or that, what happens to our coverage?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="23:41">

And a couple of things that came up. One was that if you use the auxiliary verb as the head, that
creates a lot of one-endpoint-crossing violations. So instead you want the main verb to always be
the head and that sort of gives you 10% extra coverage or something. And the other thing is the use
of complimentizers you know, setting them as they head also causes problems. So it's kind of
interesting that there are these subtle distinctions that have linguistic support for either
perspective. And here we kind of have a I don't know, mathematical I guess argument for one at least
if we believe one-endpoint-crossing is somehow a meaningful representation of language, which I
think is an open question as to whether that's the right structure.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="24:33">

Sorry, just to clarify, you're saying that in the past when we did this kind of conversion, we made
decisions that are very practical and may ignore some of the linguistic perspectives on how the
conversion should work. And now I'm extrapolating a little bit. I'm saying maybe with this with this
parser we can incorporate more linguistic input into the conversion process and say, Oh, it does
actually make sense to use the auxiliary verb as the head verb.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="25:08">

So not quiet. Again, I don't know the linguistics background in particular. I know, you know, for
example, Stanford dependencies they made a bunch of different versions with different motivations
for them. So I definitely am not an expert there. I suppose my thinking is more just this is another
data point on this question of what should the head be. One interesting thing is that I know for
example, in Collins head rules which are widely used, they made decisions mainly based on what
improved parser performance. So they ran with two different versions so that F score went up with
this one. So they kept that one. For this to work, we have to undo some of those decisions. So we
actually find that with our head rules, parsing is harder in some ways. but we can cover more of the
sentences.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="26:00">

So it's this trade off in kind of coverage versus accuracy. Of course the end of the day we want
both and there's an entire modeling question. This paper doesn't get into which would be an
important direction for future work.

</Turn>


<Turn speaker="Matt Gardner" timestamp="26:15">

Great. That was a nice high level explanation of some really complex work. Thanks for describing
this. Maybe we can talk now about how well it works,

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="26:25">

Right, so in terms of how well it works, there are a couple of different factors here. So this paper
is all about inference rather than modeling. So the numbers in terms of accuracy are not going to be
stellar. I want to prepare everyone for that. But the goal here is basically coverage. And in terms
of coverage, you know, we get up to around 97% of sentences and that's, you know, 99.5% of edges.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="26:51">

So in that sense its a success, you know, we have this extremely high coverage of the structures we
observe in the Penn Treebank and from an algorithmic perspective, we've got this end of the fourth
run time. So that's nice. The problem comes in that there's a very large constant at the front of
that big O notation. A lot is hiding in the big O. In particular the rules I mentioned, you know,
essentially we had one rule for the original version of the, you know, standard protective tree
parsing case. And I said, you know our items are more complicated so we're going to have more rules.
If you expand them all out, you end up with about 50,000 rules. So you've got a factor of 50,000
sitting in front of that end of the fourth, which is not so nice. It turns out also to have it work,
you need to encode additional information on the ends of every item to say things about structural
properties.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="27:47">

So it's actually there's an extra term of S to the fourth, which is the number of structural non
terminals on each word. And there are about a thousand of those. So, you know, we're looking at
50,000 times a thousand of the power four times N to the power of four. So it's looking pretty dire.
So getting it to actually work requires a bunch of additional ideas. One is those 50,000 rules and
needed to cover the one-endpoint-crossing graph space, but it turns out that space is still much
bigger than what we see in actual English. So if you throw out all of those rules that aren't used
during the generation of the gold structures, you get it down to something like 6 or 700. I can't
remember exact name number off the top of my head.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="28:40">

627 so you can throw away a large number, those rules and still have full coverage over the Penn
Treebank. Which of course leaves open the question of is there an even more restrictive space out
there, which could give us faster parsing. But setting that aside doing things like switching to
those rules and introducing pruning you can get that complexity down to the point where parsing is
feasible looking sort of on the order of five to 10 seconds per sentence, which is obviously not
fast but fast enough to train something. So that's sort of the inference side. The other side is
accuracy. And here as I said, we're sort of, we're running out of pages in the paper. So this is,
you know, the whole inference story. The model here is extremely simple. Essentially it's a first
order model with a bunch of surface features.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="29:36">

So this, by that I mean things like should there be an edge between these two words and here are
what the words are and their neighbors. We don't have any second order features so this edge
connects these two words and then that word is the parent of something else. So no features like
that just first order. And also we don't do any crazy fancy neural modeling or anything. This is
straight linear models. So, with all those caveats are now actually reveal numbers. So we're getting
88 or so on the standard Penn Treebank section 23 for trees. So that's quite a bit lower than sort
of the state-of-the-art systems. But still reasonable.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:18">

And, state-of-the-art systems get like 92 on this metric?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="30:22">

Right, so state-of-the-art systems get around 92. I think the best number I've seen anywhere like 94
point something with a combination of neural models running for days and things. It's very, very
complex. So yeah, so we're a fair way off the mark there. That's on the tree metric. Looking at the
question we are so interested in this question of traces as you mentioned, they're harder. So for
that we're getting around 71 on terms of F score. Now there is prior work on this and we're sort of
in between the prior work. So Mark Johnson had this system which got about 68. And that was a post
processing system. So essentially you run your standard parser and then it takes the output and
works on that. And there's a more recent piece of work, a transition-based parser from Kato and
Matsubara, which gets a 78 F1. So they're quite a bit ahead of this work. Though they're, the focus
really was on modeling and having complicated features of the transition structure and looking at
the whole tree to make these decisions. So I suppose my view is on the modeling side and we're
getting results, they're in the ballpark of reasonable, but their is certainly seems scope for
improvement.

</Turn>


<Turn speaker="Matt Gardner" timestamp="31:44">

Just to be clear on the Penn Treebank metric, you're producing a graph with no elements and so to
evaluate on the tree metric, you're doing the standard throw away all of the null elements.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="31:56">

Exactly, yes. Yeah. And one interesting thing actually is we can also run our parser with null
elements disabled. Of course. You know, you leave out some rules and if we train with the head rules
that are used for sort of the Collins those had rules that I mentioned have high accuracy but lower
recall in this space we gained back you know, about one to 1.5 points in accuracy. So you know,
clearly there is this modeling trade-off and by making the design decisions we did to improve
coverage, we have cost ourselves inaccuracy.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:35">

Interesting. So my last question then is I hear a lot these days, I don't know quite what I think
about this criticism, but I hear a lot of people say that syntax is dead. We have all, like people
have said this for a long time, I guess, and this has been an ongoing debate, but with the advent of
bi-directional LSTMs and deep neural nets, it's getting louder again with people saying, why do we
even need any of this stuff? We can just do end-to-end training to predict some end task and here
you are doing the opposite saying no dependency parses aren't good enough. We need to go further
down this linguistic rabbit hole that at least some people might call it that, and get these even
more complex structures. So what would you say to people who make these arguments?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="33:24">

So I have a few thoughts on that. I mean at a high level, I suppose my view is, you know, I'm a very
empirical person. We'll see what happens basically. I think with many of these kinds of structures
the fact that we haven't made them useful in a particular downstream task doesn't necessarily mean
they won't be, it's just, we haven't figured out how yet. So we'll see. So that's sort of a high
level thought on this particular work. One thing I should mention, we've been very focused on syntax
and sort of this particular syntactic representation, but the algorithm itself is actually pretty
general. And when I started working on this originally I was working on AMR parsing, not Penn
Treebank parsing. And the, you know, AMR is another case where you have graph structures. You have
this re entrances, which mean you know, you want to be able to get a complete graph.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="34:22">

And we see it coming off elsewhere. You look at your UCCA or if you look at the enhanced
dependencies in universal dependencies. So I would say it's not purely syntax. This sort of
algorithm has applications to any kind of structural case that has these kinds of structures, which
applies to these semantic representations too. And then of course you could say, well, maybe you
don't need AMR and you don't need any of those either. Yeah, I think the jury is out. I think in all
these cases obviously a lot of people are working on it because it does seem to abstract away from
the surface form of text in a way that could potentially be useful. And it's a challenge to the
community to figure out how to make them useful in these neural network models where having a graph
structure as input is a bit of a challenge rather than some linear form.

</Turn>


<Turn speaker="Matt Gardner" timestamp="35:19">

Yeah, I would say I'm, I said at the beginning, I wasn't really sure where I fall on this, but
actually I think I'm pretty clearly in your camp where I think this is actually useful just to give
a little straw man example, think of the undoing "wh" movement example that we talked about earlier.
Try to think about doing this in an end-to-end neural seq2seq kind of model where your input is a
question and an answer and your output is a declarative sentence. Doing a seq2seq model means you
need a bunch of labeled examples,

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="35:50">

Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="35:50">

Whereas if I can just build a parser that knows how to parse questions and leaves a trace, I don't
need any, labeled examples. I just any labeled examples of this transformation and I just need to
know what the structure of a language is and I'm done and so I actually, it'd be hard to get a an
end-to-end model here where if you have a graph parser that does the right thing, it'd be a whole
lot easier.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="36:12">

Well, and going on that idea one step further, if you wrote your system to do that, interpret the
parse that way you could then take it and apply it to other languages and have it work there too,
because the work has been done in the parser to do the like language variation and handling whatever
structure that language has. So, you know, that further suggests that maybe it'll be helpful in that
way. At the same time, you know, who knows what deep learning will come up with next you know, few
years from now, maybe, we'll just have some completely new architecture and, you know, words will go
in and magic come out the other side. We'll see.

</Turn>


<Turn speaker="Matt Gardner" timestamp="36:54">

And I guess we shouldn't, we should be a little bit careful here. It's not really a dichotomy
between structure and neural nets because in part of your work, you're using a biLSTM to predict
stuff and you could imagine using a neural net to predict the structure. It's just, it's this
ambiguous structure helpful.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="37:14">

No, that's a very good point. Yeah, that's very true. And, and I think actually the next step on
this work, and I've mentioned a few times this sort of the inference piece, which is what this paper
was about. And then there's the modeling piece. And I think the interesting direction to go would be
to look at the modeling piece here and look at some neural network architectures for this inference
algorithm. And you can imagine things like an agenda based parser, which then means you can build up
more of the structure and use that in your, in the sort of modeling stage. And actually one thing I
found, so the neural model you mentioned that was part of this the neural model that I used for
pruning was more accurate than the linear one. So that's not a big surprise. And the nice thing
about that is it improves speed cause you can prune more, but it also improves accuracy because the
pruning means you've got your fewer things that could potentially be incorrect to choose from.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="38:10">

So if we can make the modeling better, it will improve both speed and accuracy, which are the two
places where I, you know, what to go further with this work.

</Turn>


<Turn speaker="Matt Gardner" timestamp="38:18">

Great. Any last thoughts before we conclude?

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="38:25">

I suppose one of the thing on sort of a methodological point, which is a, I don't know if this will
you know, I think it's good to talk about these things. So this work actually only got in on the
third submission, so I want to say it and it improved a lot in those three submissions, but it was
rejected twice. I had great angst and pain in that process. So you know, I think just a thought that
I've been quite happy with how it turned out. And I think if you have a paper you're working on for
NAACL this coming up you know, and it doesn't get in don't lose hope.

</Turn>


<Turn speaker="Matt Gardner" timestamp="39:00">

Thanks that we all need that encouragement cause the review process can seem pretty random
sometimes.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="39:07">

Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="39:08">

Thanks. It's nice talking to you.

</Turn>


<Turn speaker="Jonathan Kummerfeld" timestamp="39:10">

You too. Thank you very much.

</Turn>
