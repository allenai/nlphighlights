---
title: "Wikipedia citations"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: 008
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

Okay. Today's paper is Finding News Citations for Wikipedia by Besnik Fetahu, Katja Markert,
Wolfgang Nejdl, and Avishek Anand at Leibniz University of Hannover and Heidelberg University in
Germany. I thought this paper was pretty interesting. It's from the conference on Information and
Knowledge Management in 2016 so it's, I guess getting close to a year and a half, a couple of years
old though it just was published on archive a month, a month or two ago. And so it was new to me
even though it's not as new as I thought originally. The point here is given some piece of text, can
we find places that reference news stories and automatically provide citations for them.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:01">

I think this is a really interesting problem in general and it's one that I thought about a bit
during my PhD, but didn't ever actually pursue. I guess not all news articles do this quite as much
as some. Like if you look at the New York times, I just opened to a random news article today and
there are not very many citations to previous New York times articles in this article that I'm
looking at. But if you go to something like ARS Technica or StarTech or a number of other news
sites, you'll very often see lots of links to previous news articles by the previous articles by the
same publication. And so you can imagine a really interesting use case where you just automatically
populate all of those links. I think that'd be a pretty interesting problem. And this is trying to
get us towards that kind of scenario.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:50">

So that's one of the things I like on Wikipedia for many of the, at least controversial things they
would add a citation and explain where this is coming from.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:00">

Yeah. And it's helpful for readers and it gives a nice source of training data for machine learning
algorithms if you want to try to do this automatically, which is pretty nice. And so this paper
breaks the problem down into three steps. The first is deciding, given a statement, does it require
a citation at all? So which statements should we even consider for linking to some other authority.
And then second, given that this thing needs a citation, what kind of source should I cite? That is
Wikipedia has lots of different kinds of sources. It has scientific articles that has new sources,
that has recipes and a few other kinds of citations that the authors list in this paper. And they're
interested just in news article classification that is they're proposing a method to search over
news articles and find news articles that should be cited for particular statements. So the first
thing they have to do, given that we know a sentence should have some citation, we need to say,
should this be from news or should I just ignore it?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:09">

I find that to be an interesting choice. Why wouldn't they try to link or cite any previous article,
whether it's news or not, or another Wikipedia page?

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:22">

I think the issue is the corpus they had available. So if you imagine that there's a citation to
some article in some Elsevier journal that is behind a paywall, they are not going to be able to
even test anything at all. Right? You, can't predict that that should be a citation because you
can't even see the article. And so they needed to restrict themselves to a domain over which they
could do retrieval to find the citation. And so they picked news. I think that's what they did.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:50">

I see. So what is it news that the data used?

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:54">

I'll get there in a minute. So the third I guess I talked about the first two sub problems in this
citation prediction task. And the third one is kind of obvious given that this should be a news
citation find the article that should be cited. And so now back to answering your question, they
used GigaWord that has a whole bunch of news articles I think their final corpus had 2 million news
articles from a particular two year span of time and they do retrieval over that set of documents to
find news articles that should be cited.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:35">

So the articles weren't professionally written with references to previous years.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:40">

Yes. So there are three sub problems as I just said. They ignore the first one, they assume it's
given which is in some sense disappointing, but because that seems to me like one of the hardest
challenges to know if there is support for particular statements in any body of texts. But to have
some practical thing as a first step to this, it's not too surprising that they dropped that
problem. So they essentially took all of the statements in Wikipedia that had citations already and
used that as their set for this first problem and split it into train test held out whole pages. So
that you didn't like so that you didn't see a training time that this entity links to this news
article. Each entity was either in train or tests.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:36">

This sounds to me like a great source of for training as well. I didn't use this for most training
and evaluation.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:47">

What do you mean didn't use it for training and evaluation?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:48">

So I thought you said there is a different source for training there is also Gigaword.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:55">

Right, right, right. So they're using Wikipedia statements as their training and evaluation data for
what type of citation does this statement require and what article does it cite? But they're using
Gigaword as the set of things they can retrieve from. As you can imagine, it's kind of unfair if I
just take all of the citations of Wikipedia articles, there's like a 22,000 articles total, and if I
only have to retrieve from that set, I've artificially given myself a huge boost. And so they get
all of the news articles in Gigaword so that they're not essentially cheating by giving themselves a
known set that they can retrieve from.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:38">

Yeah, that makes sense.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:40">

So then, given that the first problem of these three tasks is solved by assumption the second two
tasks they use essentially well engineered features. So like NLP algorithms from a few years ago,
you might think of this. So they just write some hand engineered feature extractors over the
statement and the Wikipedia page that the statement is in and then use a random forest to decide if
this statement should be a news article, sorry if the citation for the statement should be news or
science or recipe or something else. I imagine the entity type is really informative there because
if this is a page about food, you're a lot more likely to see a recipe citation. If it's a page
about Barack Obama, you're probably a lot more likely to see a news article. And if it's a page
about convolutional neural networks, you're a lot more likely to see academic papers, citations.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:36">

So in principle it seems to me that the same statement could use like different citations. So that's
what makes me a little uncomfortable with this step in this question in the three questions that you
mentioned, it's quite possible that this technique could have support from multiple sources and
choosing one of them may not be like the ideal question to ask.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:01">

I agree to some extent though. If you're looking for a fact that was stated in news, it's probably
not going to be stated in an academic journal. And so there is a pretty maybe a better way to think
of it is you're doing a multilevel, like a hierarchical kind of retrieval where the first step is
deciding what corpus to look in. And the second step is deciding what item from that corpus you
should pull out. And that's a useful model of thinking about things that people have used for a lot
of different tasks. This hierarchical kind of retrieval. And I think they didn't say it that way,
but that's essentially what the second stage is trying to do. It's the first step in this
hierarchical retrieval model.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:43">

Yup.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:45">

And for the, so I think that's a good enough description of the second step, they use a random
forest classifier on top of these hand in hand engineer features. They said they had about 6 million
training examples for this, which made me think why did they hand engineer features? Like that's
kind of the whole point of these deep neural nets. You can just give them the whole bunch of data
and let them figure it out. And it, I don't know, they don't mention anything at all about trying
this. It just makes me wonder if it would have worked because that's a lot of training data. It
probably would have with a lot less hand engineered stuff going into it.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:22">

Well that's a paper waiting for someone to write.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:24">

Indeed. so the next task, the last one is what papers should you cite? And again, they I guess they
approached this as a ranking problem, they used a search engine to get to get the top hundred news
articles from this list of 2 million news articles that they had and then used another simple random
forest on top of hand engineered features to rank those top hundred news articles. And these
features were things like find the best sentence in the news article that matches the sentence that
I'm trying to cite that provide a citation for. And also try to find the most central sentence in
the news article itself and match that to the statement so that like a news article might mention
several things and you want to provide as a citation the news article that is most focused on the
statement that you're preventing a citation for instead of one that only tangentially mentions the
the fact you're trying to cover.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:33">

Right, That problem in spirit feels similar to many other problems in NLP that especially you have
been thinking a lot about recently.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:42">

Yeah. There's a lot of people thinking now about how do we corroborate things that we see in texts.
So there have been a whole lot of papers submitted to recent conferences on this fake news problem,
which is essentially this same issue. How do we corroborate facts that we see in text? I've been
thinking a lot about answering science questions and this question answering setup, you're given
just a question that you see on an exam with maybe some answer choices and you need to find a set
like some texts typically that can it's not quite the same as corroborate but provide information
for you to answer the question. And so this problem of retrieval to find supporting information is
really important in a lot of problems and becoming increasingly more so I think.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:33">

That strikes me as perhaps a useful dataset to use for the other kinds of problems that we care
about, which have like similar feeling to them. So it might be a useful thing to train to do model
transfer where your model is maybe trained by that model or any other model, because for question
answering, assuming that the sentences which have a citation in Wikipedia are the questions and the
answer lies somewhere in the article that it references.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:08">

Yeah, I agree that this was the thing that I took away the most from this paper. It was less the
particular models that they introduced. I think they're pretty standard kinds of things. It was more
about using Wikipedia citations as a data source for doing this kind of corroboration or retrieval
task. I thought that was really interesting. That's why I liked it this paper.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:33">

That's really cool. Do you know that if the dataset is available for other people to use?

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:37">

Well, it's just Wikipedia and Gigawords, so yes, it is. I don't know if they actually,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:45">

I mean there's a little data cleaning that's usually a you need to do.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:48">

Yeah. Yeah. And I don't remember seeing anything about them, like releasing their cleaned versions
or their test set or anything. So I don't think they did. I could have missed it in the paper. But
yes, Wikipedia and Gigawords are available.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="13:04">

Thank you for presenting this paper Matt. Next time we are going to talk about the paper titled,
Learning to Generate Reviews and Discovering Sentiment by Alec Radford, Rafal Jozefowicz, and Ilya
Sutskever.

</Turn>
