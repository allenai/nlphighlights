---
title: "Brendan O'Connor"
hosts: ["Pradeep Dasigi","Matt Gardner","Waleed Ammar"]
guests: ["Brendan O'Connor"]
number: "103"
tags: []
description: "We talked to Brendan O’Connor for this episode about processing language in social media. Brendan started off by telling us about his projects that studied the linguistic and geographical patterns of African American English (AAE), and how obtaining data from Twitter made these projects possible. We then talked about how many tools built for standard English perform very poorly on AAE, and why collecting dialect-specific data is important. For the rest of the conversation, we discussed the issues involved in scraping data from social media, including ethical considerations and the biases that the data comes with. Brendan O’Connor is an Assistant Professor at the University of Massachusetts, Amherst. Warning: This episode contains explicit language (one swear word)."
type: episode
---

<turn speaker="Matt Gardner" timestamp="">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner Waleed Ammar and Pradeep Dasigi.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Today we'll be talking about analyzing social media text with Brendan O'Connor. Brendan is an
assistant professor at university of Massachusetts Amherst. He develops text analysis methods that
can help answer social science questions including political sciences and socio-linguistics. Welcome
to the program Brendan.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

All right, Hello. Thanks so much. Good to talk to you.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

So could you start with telling us an example of a social science question you've studied by
analyzing social media text?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Sure. So, lots of people are interested in analyzing social media in various ways. And one thing you
might hear about a lot is, say, market research. I want to know whether people like a particular
product or a certain idea even, or we might want to analyze a corpus of social media posts or online
chatter that might give some insight into that. So do people feel positively or negatively about
some commercial thing? For example, as a major application area, I've done a little bit of work on
trying to find overall aggregate opinion. People have about, say, how they feel about the economy by
using some simple forms of sentiment analysis in that particular work for example. And so there's
all sorts of kind of social questions you might be able to address by analyzing this type of social
media. And in my own work I also look at other types of media also.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

But social media has kind of a lot of interesting particulars to it. So that's kind of social
measurement questions. If we're trying to measure some underlying attributes that the authors have,
then maybe the psychological states of the authors or maybe even something looks more like
information extraction, like have the authors being a particular type of thing that they've reported
on. For example, you could imagine extracting all sorts of things like that from social media.
Another use that I've been working more on recently is using social media as a corpus of just how
people use language in general. And so this is work where we can find examples of people using
casual, everyday speech. So people use slang, people use creative terms, people will write in all
sorts of ways that are informal varieties of language and social media constitutes a huge written
corpus of kind of casual dialects.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

There's no editors, there's no filters, essentially fewer filters. Even you can even get data before
like auto correct. That was common. And so you know, no one teaches you how to tweet or like how to
do Facebook posts. It's very different than more formal genres of writing, which are the kind of
most common or commonly analyzed, especially in natural language processing due to the history of
what sorts of applications have been done. And so you're going to have plenty of examples of this
historically, centuries ago, there's arguably data text data from centuries ago that is actually
more informal than 20th century data in some ways. But it depends a lot what corpus, what genre,
etc. But social media just has all this amazing linguistic and creative diversity. People are
combining ideas all sorts of ways. And so there's just a lot going on. And of course social media is
important in our daily lives or even is important social force also. So, it's inherently important
in some ways if you know you care about social media's effects on you know, politics or something
like that, being able to analyze language data, it can be quite helpful for doing analysis on what,
you know people want to intervene. Right. All those things could potentially be useful.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Yeah. Any interesting findings or surprising findings that you, that you found through these
studies?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Yeah, sure. So I'll talk about a project on dialect variation that we've been doing here at UMass
Amherst. I was just working on some piece of it this morning, so it's been on my mind. And so, we
wrote a paper at EMNLP in 2016 a few years ago now. This was with my student, Su Lin Blodgette and
my colleague in linguistics, Lisa Green. And we took the view of analyzing social media as a corpus
of kind of vernacular everyday language. And specifically we tried to analyze it to find language
that's used in the United States that is more commonly used by people of certain ethnicities and so
we focus a lot on African-Americans in the United States and linguists know of and have established
a lot of research on a major variety of English called African American English and African American
English has certain views of it in culture but also has lots of very marked linguistic properties.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

So for example, null copula, you can drop the to be verb under certain conditions. There's different
types of preferrable markers, different tense systems. There's all sorts of interesting things going
on and of course something is interesting about it is that in terms of the corpus evidence for it,
the standard written dialect of American English is not African American English, it's called
standard or mainstream American English and lots of constructions in African American English are
normatively frowned upon. And so speakers who speak it natively will use a more mainstream dialect
if you know at work or in certain educational environments. All sorts of other, depends what type of
world or people you're interacting with, what dialect you're going to use. And so there's not
necessarily a ton of written corpus data for, there is some, but it's much, much less mainstream
than American English. And so in this study we asked the question, can we use a social media corpus
of public available posts, in particular we use Twitter and geo located tweets.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And we wanted to see if we could extract a corpus of African American English from it. And so it
turns out there's just a ton of African American English on Twitter, lots and lots and lots. It's
even self acknowledged. There's a thing called Black Twitter. You can see this hashtag of black
Twitter. If you look at demographic surveys of Twitter, especially in its earlier days, Twitter was
over-represented by non white people in the United States, actually, African Americans, Hispanics
and they all see some casual use, like sometimes in like the top, if you look at the trending
hashtags on the right side of Twitter, as long you click them and you're like, Oh wow. It's like
this is a series of comments or jokes or something and just like you look at the photos and well,
like well every person looks non white or African American or something. It's like just as kind of
anecdotal evidence seems like something's going on and so it's not a surprise, but we found lots of
examples of dialect at kind of linguistic level from Twitter and in particular we looked at tweets
that were sent by people who are writing posts where they tended to be in highly African American
neighborhoods in the United States.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And so this is using geolocated tweets that have the particular version of the data we're using
actually had latitude, longitude coordinates and cross-reference those against demographics from the
U S census for particular. We actually use the neighborhood level demographics there. And so we had
a mixed membership model that tried to learn which terms tend to be used by people who are in highly
African American neighborhoods versus people in highly white neighborhoods versus other demographic
categories. And it also learned that a model where every individual author had a mixture of a, just
an admixture, like a LDA style mix, membership model of these different unigram language models are
associated with a different demographic factors in the United States, acquire interpretive census
data and so the unigram distribution associated with African American geographic populations in the
United States contained lots and lots of terms that display all these patterns known African
American English.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And so for example, dropping the final R from a word, you can find examples of that where it's
spelled that way even in a particular word. So, you get, you know, a slightly higher probability of
the word gonna, just G O N N A but you get a lot higher probability of the word gon. So G O N
spelled in that way. And so that corresponds to a real word that people use in everyday language
associated with African American English. Another example is finna, F I N N A. That's a shorting of
fixing to, that's a pre-verbal marker that in the case becomes immediate future tense. Instead of
you saying, I'm going to eat breakfast, say I'm finna eat breakfast, you're going to eat breakfast.
But very soon or you really want to do it. And again, that's something that's, not just African
American English, but some varieties of English in the U S South.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And it's things that you don't see in the New York times, but there's just, you know, thousands,
thousands of examples of this on Twitter. And so the model really picks up on these, I mean they
have distinct geographic patterns of usage that correspond to African American populations in the U
S at least in our analysis. And so we found all this information about it and we can even extract
sub corpora from Twitter based on it. And we had a number of findings. We're looking at examples of
linguistic phenomena. So, trying to use the evidence to help do further linguistic research. We also
found examples of implications for NLP systems, a kind of fairness and bias level. So if there's a
different variety of English, which shouldn't be surprising, but tools that are typically
constructed for mainstream American English will tend to work a lot worse. So even things like
language identification, we're finding it has a higher kind of false negative rate for identifying
that these messages are English and just like a lot of the words are spelled quite differently than
in mainstream American English for example.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Yeah, that, that makes a lot of sense. I would like to elaborate on this later, but I wanted to
first ask you, in this paper, did you also study the new terms transfer geographically across
different cities in the United States?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Yeah, that was a paper that Jacob Eisenstein published in 2014. There, what we're looking at is
we're really interested in the transfer of terms. If we, when new terms are arising, where do they
tend to rise first. Or, more generally when the term is a high frequency in one geographic area,
does it tend to become high frequency in other geographic areas later? There are a number of socio-
linguistics theories of what drives language change. We're focused on seeing, for example, is it
like geographic distance that makes a big difference or is it more based on kind of demographic
similarity? So looking at like racial and ethnic and other distributions. So, that's another sort of
analysis kind of, again, more on the social linguistic side that you can do with social media
analysis. And that again takes advantage of the fact that social media is a corpus. It exists and
it's something we, we haven't had audio recordings of thousands of people and dozens of cities
across the U S like we don't really have those streams. But in social media we kind of do, they're
like noisy and complicated. They're driven by online specific phenomena. And you know, for this
analysis we actually did not want to get trending hashtags. We tried to exclude things like that.
But you know, you can do very different things with social media, of course. And of course, that
analysis also looks a lot at the time dimensions. The time dimension is quite interesting too. And
there's been lots of interesting work in different aspects of that.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

So going back to the problem with the fact that NLP tools don't work as well on African American
language and other dialects, I think that first question is how bad is this problem? And the second
question would be what can we do about it?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

How bad, you know really depends on the task. It depends what you're doing. The accuracies can be
quite a bit worse on, we looked a lot of language identification and dependency parsing are the main
things we looked at and the dependency parsing differences and like you know, 10 points of
difference or something like that. It's in the realm of the types of improvements that computational
NLP researchers typically do to improve parsers. It's just much, much larger than that. This is a
standard thing that we kind of know in NLP that like what the data is and where the data comes from.
Does the training data match the runtime data or evaluation data? Those things just matter so much.
And there are cases where, you know it's a whole bunch of the words in the tweet aren't in a
standard English dictionary. Like of course the person's going to do a terrible job, right? Like the
example that we like to use is the word AF that became really popular in English. Maybe you started
a number of years ago and it's in our data that search in the early days, it's heavily associated
with African American neighborhoods I think is more mainstream at this point. But it means like FF,
right? Can we swear on this podcast?

</turn>


<turn speaker="Waleed Ammar" timestamp="">

I think it's fine.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Yeah. If you say like, I'm tired as fuck, right? So I'm tired. AF and so AF is one word. It's one
token and it's kind of like an adverb, but it comes after, right? So it's like a little bit unusual,
but like, you know, as a full phrase, like, yeah, we all know how to do that. And you can do that
with, you know, standard English grammar, but for a like a dependency parser that hasn't seen this
word, like it thinks it's like a noun or a verb or something and it just destroys the rest of the
parse. Right. And so, you know, just like unknown words, like it's not going to be a pretty sight to
any NLP system. And so that's definitely a thing. Just unknown words. Get those right. And there are
some issues with kind of the deeper structures also.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

So a null copula like if you say he good, you can say that in African American English and some
other varieties of English. It means he is good. In African American English actually you can't
always drop the copula. There's only certain conditions. You can't use it with a first person
pronoun for example. But again, so that's the thing where it's maybe not obvious for a syntactic
parser that's trained on standard American English texts where, it's very rare to drop a copula. And
so we found that contemporary syntactic dependency parsers also make those sorts of errors. The
difference again can be quite large, especially when there's large changes, lots of unknown words.
So there's a whole bunch of things that can be done to fix the problem. In some ways the simplest
thing to do is collect a bunch of labeled data for the dialect or language variety you want to
target and then we train things.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And so we've done some small scale efforts, do some re annotation. There's been a bunch more. Now
there's a bunch of things you could do there. Another thing to do is to figure out how to use data
that is in a related language and so almost obviously like you have a whole bunch of standard
American English data, can you train on that? Then somehow adapt it to target the language variety
that's quite close to mainstream American English but far away enough that your performance is off
and then try to adapt the system to that. And so for example, we've done some experiments for just
retraining word embeddings on kind of the large basically unlabeled corpus that has a lot of AAE or
had lot of online specific language. If you incorporate those in the dependency parser, it does
improve the dependency parser. Work I did at Carnegie Mellon actually when I was a grad student
examined part of speech tagging for Twitter where it actually is word clusters back then, but
learning representations from Twitter itself instead of using word clusters from standard corpora.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And that helps a lot. And in fact that work actually, the part of speech tagger is a lot more
performant on African American English, compared to at least some, more kind of standard English
trained once. So those things all can help and they can be used in different ways. A number of
groups have done an altering sort of things. You can alter the main adaptation approaches. Some
group in Singapore has done a lot of work with the stacking first in tactic parsers to do domain
adaptation and there's lot of very relevant research and highly related languages and low research
languages where the really big problem was like it's just so expensive to get annotated data,
especially for an under-resourced language variety that you want to be able to find some ways of
doing that that don't involve, you know, collect a million labeled examples now.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

Can you give us an estimate of the data sizes? You mentioned that African American English is under
resourced, right. How many tweets do you think we can strip if we wanted to say, collect
independency parsing, is it?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

If you want just unlabeled tweets that are probably display a constructs or from authors who
typically who often use AAE. So that's closest to what I've done to. And it's just a much higher
proportion compared to what you see in news papers, you know it's like zero in newspapers, right? I
mean there probably are tens of millions of AAE speakers, like just like in the world, it's not an
obscure language. variety, it's not an obscure dialect in English, definitely not. But it's very
unbalanced in terms of the language resources available. And I mean that's what happens when you
have dialects associated with marginalized groups and marginalized communities and this happens all
over the world. All sorts of linguistic variety. You see a very similar sort of thing. You know,
like Hindi is under-resourced, like Hindi's one of the most spoken languages in the world. But the
amount of resources is drastically smaller than you would expect for the number of speakers.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

So I have a lot of examples like that. And so for, for Twitter, I'm just getting many, many
thousands. I'm going to hesitate to give you an exact order of magnitude because it's still, I
haven't nailed this question as well as I'd like, but there's just lots of data out there. And of
course people, many people have done work on, you know, Arabic dialects and all sorts of other
language varieties where getting these kind of vernacular chatter sorts of cases could give you
more. I mean the trick, your thing is if you want to create a tree bank or something of doing
annotation which requires a lot of linguistic training, it's just a handful. So university of
Washington annotated a several thousand I believe, of tweets, some of which included I think a fair
amount of AIE with universal dependencies. We annotated a small number with university dependencies
also. And so there's, it's really kind of a collection of a handful of things. In this particular
case, since I'm not aware of really large scale annotation projects, I mean it could be done, right.
There's definitely plenty of potential. So.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

So, how much of a problem is it to actually recognize which tweets contain African American language
or other varieties of English? Because you can use just certain terms that you know and look them up
or you can like look up certain users, you know speak a lot of African American English.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

We do different versions of this in different places and there've been in the research literature,
different versions have been used. So for example, there's a nice site by Anna Jergensen, Dirk Hovy
and colleagues where they kind of specified upfront here are well known markers of African American
English that we can draw from the linguistics literature because it's already been studied a fair
amount. And then look for authors that use those sorts of markers. You could do that sort of thing.
You could also use geographic indicators. So particularly geographies where a lot of African
Americans live, for example, you'd be able to analyze, you'd be able to get messages from there. And
so you can identify messages or authors in these ways. And so what we ended up doing in our work is
we use this geographic level information as the only initial real statistical indicator.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

So there's some ways in which that's a little less biased than some of these other ones. So I'd say
like, okay, well you know, you can look at the linguistics literature and get these nice feature
tables for different terms that are used, but does that really capture everything that's currently
going on? Does that capture everything of like, you know, young adults or teenagers who are
currently using social media that maybe they weren't included in the 1990 study that we're drawing
from. So, we'll say, okay, well let's let the metadata of our corpus really tell us the full story.
So we started there then to validate what the model found, we drew very heavily on the previous
literature of looking at particular combinations of phonilogical variants of particular words and
things like that. But again, this is the case where there's been a fair amount of study on African
American English seeing you take a reasonable amount of kind of preexisting linguistics literature
to look at it.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

So when you use the geographical information, the metadata, how do you isolate subpopulation that do
not speak African American?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

We don't try to infer like social identity at the individual level. Some work does, but this is
problematic for lots of reasons. It's difficult to do. You can't really get ground truth for some of
these. For some identity course categories, it's just really fuzzy. Like if you wanted to do
African-Americans, one thing, if you want do like Hispanic Americans, people have more complex non
single membership identity sometimes, right? So what we ended up doing is we override really heavily
on this kind of mixture idea. That's the idea is that, well when you're speaking or writing social
media messages, you could use multiple different language varieties, which really just for us just
means you know, ground language models. But you could be an admixture of them in different
proportions, right? So, maybe you're using 60% of variety one and 40% variety two. And you can
switch between them at the message level.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Even at the token level. So it's an, it's implicitly a code switching model. For some people it
might be 90% of one but only 10% of two. Pretty much topic models. That's exactly what the data
vector on top of model is. And so we use that, but we're not really a topic model because we're much
more supervised. But the idea is that you can get those, but then you can look at messages that the
model thinks has a higher posterior proportion of words that come from the AAE topic or unigram
language model for someone that had a very low proportion. So what you do is you look at those and
doing some validation, we compare those different sets of messages to well-known constructions that
prior linguistics like Chris already identified are part of AAE or associated with AAE.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

While we're talking about data collection and using user's data, ethical conservation comes up all
the time about when researchers use people's data. So do you have any thoughts around what are the
considerations that we should be doing as NLP researchers using Twitter data? Best practices?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

It really depends on what the use is and what the application is. For sure. And the expectations and
the standards around this are moving and they're moving quite fast in some cases because there are
just, you know, well known cases of companies doing social media analysis that really don't seem to
be in the interest of people. And so, you know, scandals around Cambridge Analytica for example,
which I would argue is a very different case than somethings we're talking about here, but it's
worth taking into consideration everything. And so I think we should only be studying, well I don't
want to make categories and things, but analyzing only messages that were publicly available is a
big thing. And they always have some license that maybe it's okay to study those, but it is not
entirely unproblematic. Like users may not know that their information could be destined for a
study.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

You can say things like, okay, well internally the major internet companies are doing their own
forms of analysis on these things. So what we're doing is pretty similar, but again, users off of
these messages may not be aware of that. And there's real questions if like if someone does post a
message publicly, like what sorts of research analysis can you do with it? And so one very rough
consensus is doing arrogant analyses of publicly available data makes a lot of sense. But if you're,
you know, writing a paper and pulling out individual messages, it's maybe not as good to single out
a certain person's message and especially don't do it showing the East Green name, for example, or
the name of the author. And that seems to be kind of a reasonable standard. And again, more recent
that's kind of come about I think. But there's, there's different standards.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

I mean some folks who work on social media and kind of the computer mediated communication
literature somewhere. If you think about people more like communications departments doing more
qualitative analysis or you know socio-linguistics in some cases there are some standards like,
well, you should not even ever publish or use in a presentation, the actual complete text of a
tweet, you should make sure to change a few words so that person can't be looked up. So that's also
a reasonable standard. But if you're thinking about, you know, large scale data analysis or even
large scale data release, that's maybe less feasible. And I think we don't know how to do that at a
larger scale. But for something like presentations like it seems like a reasonable thing to do. When
I was first working on this, there were not a lot of concerns about the privacy of messages that
were originally posted publicly.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And like I really wasn't aware that, you know, this could be a a better way of doing things. So,
this is the case that's definitely changed. There's also ethical considerations to just what
research has done. So, some research just like sounds creepier, right? And like this is different.
And so I think people seem to be willing to give us benefit of the doubt that we're doing something
that looks more like scientific linguistics research or scientific socio-linguistics research. But
every social media application you can imagine much more nefarious or problematic versions of it,
and so you'll demographic prediction is like all that is just to sell ads to more people for
example. Or maybe to do like social scientific studies of like population in the United States.
Right, right? There's a lot of questions there and they are seeing people work through these in
different ways right now. And so there's a lot of questions there. I feel like I don't have great
answers for all of that.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Have you ever personally received any of angry emails or communication from people who like thought
that your work was unethical in certain ways?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Not about this. No. Nothing like this. But I mean, I don't know that that doesn't really tell you
much. Right? Cause you just like no one's reading our papers. You never know. Right.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Well, the other thing I was wondering about, so I remember seeing on your homepage, just at least
something about recent research about quantifying police brutality and this is the kind of thing
that I imagine a lot of people would be angry about and you'd be receiving angry emails or
communications.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

I think there's a lot of randomness in how these things go out. Like I know of some studies in
social media, areas of hitting political topics that if they get into the press in the right place,
a lot of people get mad about it. You can find equally potentially problematic things that just
never hit that. And so this police killings worked out and so the police comes work I should say,
does not use any social media data at all. It is all just mainstream and news sources. So I think it
doesn't hit any of these privacy sorts of concerns. But that was a project to use information
extraction. So find instances of police killing civilians. So very concrete, I guess not so simple
but concrete event extraction, a sort of knowledge based population task.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Even that. So, aside from the ethical side of collecting data from Twitter or social media, I
imagine some people still have a lot of feelings about like the findings in a paper like this.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Right? Right. Definitely. so the area of African American English I guess we kind of, I didn't
mention too much of the history of it, but there's a, you know, a long politically charged series of
arguments and controversies around it based on, I think what linguists would consider
misunderstandings of what language variety is. So, it's like these kids aren't speaking English
wrong. There's no structure to so-called African-American English. It's just random words. And it's
like those things are all false, right? This is a real language variety, it has grammar and it's
interesting because it's like different than mainstream American English, but because of the social
perceptions of it, there's definitely, people can get mad about policies that evolved from this
research. And so there've been controversial examples about, you know, what is the role of AAE in
education, for example. And so there's this certain strains of language conservatism that say like,
well we should not promote these dialects of English that I as a language conservative think are
normatively bad or should not be promulgated more.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

There's a certain extent, this always occurs to a certain extent, like the point of a mainstream
language variety is force everyone to use it so we can all communicate with each other and all
countries do this in different degrees in different ways, right? But there's lot of normative, they
turn what scientifically from a linguistics perspective are very descriptive questions about
language. Very easily turn into normative ones. You run into times when you're talking about things
like policy, right? Cause you know they're very good cases to me like, well you should be all
students should be learning the mainstream variety you need it to like do well in the world. But the
question is what is the level of say, promotion or even respect for a minority language dialect. And
this gets into questions of how do we want to engage with language in the world.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And so research on African American English, not not my research, but other people's research
definitely has gotten caught up in political stuff sometimes. And so that could be a form of ethical
consideration you could think about from natural language processing perspective. We haven't seen
too much of this yet. I do wonder, there's so many social assumptions embedded in these NLP systems
that we could think are in a very complete technical way. So just like, you know, like a machine
translation service does really badly on languages of some speakers of the world. And like those
things correlate to social factors by like are you a speaker of a language from one of the countries
that was colonizing the world a few centuries ago? What are the countries that was being colonized?
That really correlates the accuracy of the trends. Like machine translation you have,

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

You can translate between French and English great. Like there's, there's a reason there's
historical reason for that case, right? You could also think of machine translation as a purely
technical problem, right? But at the same time it's being built upon this data that has all this
kind of social source and you know, we only say you parliament or something's a little distant from
that. And social media is much more immediate that people with all their different attributes are
there. But I really think the same things are going on in all forms of NLP and how it connects to
social stuff in general. And so that's why I'm very very interested in this area of computational
social science. And so we could use computers to understand society, but also this kind of emerging
thread of thinking about findings from the social sciences, but ways of doing social analysis or
social policy, they can help inform how we want to create artificial intelligence or language
technologies. I think about what sorts of biases we're going to get in our data, for example, or for
what the eventual uses are. How is that going to affect them?

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Totally. So digging a little more about the biases, any data that we use in order to do any sort of
analysis, will have some biases and I wonder what kind of biases do you think we should be thinking
about when we're using social media data to answer or to attempt an answer for social science
questions.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Oh yeah. Yeah. So if you want to do like figure out people's opinion about X, the big bias that
everyone points to immediately that is always very major is just who the heck are the authors that
you're analyzing? Especially, when you're dealing with a system. Twitter's like this where you don't
necessarily know very much about the authors. Arguably this is why malicious actors can push
misinformation. Like you can totally create a bunch of fake accounts that sound plausible enough
that we'll engage with people and people can retweet their stuff. Right? But if you're thinking
about it from me wanting to do market research, me wanting to do political science research, you
have the same sort of questions, just like how real are these people? What exactly are these people
doing and what does it mean? And that is a huge form of bias. It's a bias in the sense you want to
relate to, you know, the overall population distribution for a particular country or something like
that.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

The huge thing, right? So that's like one source of bias. You always have to think about where you
analyze social media. And so the second one, which I guess my work we were talking about earlier has
something more to do with is bias from the language analysis system. So like if you have a language
pipeline that throws out everything that's non-English, and then you say, okay, let's you send me
analysis on things. My language, I thought, was English, it's like, okay, well, if your language ID
was biased, you're going to get a biased result, right? And so I personally am very interested, in
this kind of like, I want to figure out, you know, the statistical prevalence of, you know, positive
versus negative sentiment around something. And so this would affect that. But even more basic
thing, it's like, okay, well I want to analyze what Americans think.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

It's like, well, I just throw out all Spanish speakers if I did that, right. That's almost like too
obvious. Even some of these things there's like major World language cononical form of Spanish. It's
like, well you need to analyze that also. And I think we don't know at a technical level what's a
good way of combining multi-lingual sentiment for example? Or what does that mean to do that fairly
is a really interesting question I think. And there's many different ways to uncode fairness there
and you have to be really careful about explaining what exactly you want. But there seems to be some
need about, there's you know, many different social groups, different social perspectives you want
to represent in some way. And so I think that's a really big thing. Different types of language,
different language variability and what language resources are you using? So if you have a, so you
know, lexicon based sentiment classifiers are pretty popular among researchers, usually more outside
NLP who are doing sentiment analysis and want something quick that works.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Works reasonably well. An interesting question is, does a particular lexicon work that well on
social media or does it work well on a particular sub slice of social media you care about? This
isn't quite biased, but unknown sources of variability when you just don't know your corpus very
well. And so you know, I can give you some guesses about what the EU parliament sort of proceedings
are going to look like. But if you give me a random set of tweets that were filtered in some way, I
usually don't have a good idea of what I'm going to see from them. And it's like maybe these are
messages from young adults who are coordinating what they're going to do later in the day for fun.
Or is it people who are making like strident political arguments about something or there's just a
thousand different sub communities or sub slices of the world on social media.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

There's like very official communications, there's very casual communication, there's creativity
that follows particular trends. There's people who just kind of say mundane things, but they're
happening in the day and all these things are kind of mixed together on a social media corpus in a
way that I think is a little different from other genres like news or novels where you can expect a
little bit more about even just what the communication act, the speech acts are and those things.
And so that is a form of, I guess you call it bias, but just like the kind of unknown variability,
you don't really know what we're going to get out. It makes it really hard to interpret aggregated
statistics in some ways. And so I think these are all potential sources of you call them bias or
kind of social effects that you really need to think about and that's going to affect how you
interpret your natural language processing and things like that.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

Also collecting data from Twitter probably come with an inherent sampling bias too, right? I mean,
not everyone has access to Twitter and maybe not everything is in Twitter.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Yeah. Yeah, absolutely.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

So how do you ensure how you connect on to that.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

I think being aware of what sorts of just makeup of the population that you can expect. The very
basic one is different online services have different distributions of demographics and are even
just, which countries the populations come from. And there is basic aggregate level statistical data
about this. It's a lot of us who work in this area usually cite a number of surveys done by the Pew
center in the United States on demographic characteristics of all of the social media services. They
can say, okay, that, that's why I know that, you know, non-white minorities are overrepresented in
Twitter a lot in the early days, but now it's more even, right? They just ask people what is, are
you black, are you white or what? And whether you use Twitter with Instagram, with YouTube, et
cetera, et cetera. So getting those statistics actually helps a lot.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And this is, I think explains a lot about kind of, you know, creative, nonstandard linguistic
behavior we see on Twitter. Those statistics also show that like Facebook is a lot more
representative than Twitter. It's a larger percentage of Americans, at least. I know certain
countries, like Russia doesn't use Facebook, they have a different system, but Facebook is the major
in a whole bunch of other countries. And of course the systems of China are complete different than
the others. And you just have to like know these things or you can know about them, they can give
some context to the work. Beyond that, there's just very specific things for whatever you're
analyzing. Like maybe you just want to analyze immigrant communities in Queens, New York or
something. And it's like, well that's just its own world. Like every, every little sub slice is
going to be its world.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

May you only want to analyze what people are saying about gun shooting episodes in the United
States. So there's a nice paper from the Stanford group about this a year ago or so, and there's,
you're connecting more to kind of mainstream political discourse there, but there's going to be all
sort of different biases. But who's speaking? Who's participating? I mean Twitter has reputation for
like younger, more liberal people, but depends what corner of Twitter you're looking at, what
authors you're looking at, et cetera. You can select them in very different ways and get very
different results. And so I think that's all just really important to look at. And this is kind of
saying you were in natural language processing as you know, one tool in the toolkit. But if you kind
of want to analyze, you know, overall social analysis, a whole overall social system, there's all
this other stuff going on at the same time. And so I think it's a lot of exciting research problems.
Like you want to intermix all these things, but if you want to kind of hammer down the particular
social analysis you might have to make, you know, rough and ready decisions about some of these,
some of these factors.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Yeah. So with all these biases in mind, there's an argument that it's pointless to try to do
computational social science on social media text because of all these biases that we know of. Are
there in your mind certain questions that are easier to answer, what are the characteristics of a
problem or question that has to do with social science that is easier to answer through social media
text?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Anything where you can reliably establish kind of a subpopulation of authors or types of messages
from a particular social media system and knowing something about that little world could be of
interest then then it's going to work. If you want to know something about the overall distribution
of all people in the United States, that's going to be difficult just because it reaches different
groups and there's interesting research on how to do that. Maybe you could freeweight by
demographics or something and there's questions about how to do this. They'd argue that online
surveys have similar issues, but that's always going to be hard.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

So you're saying the more we can target a certain, a narrower criteria and if we can like capture
lots of users on social media who exhibit this criteria, then our analysis will be probably easier
to do using this data compared to trying to find these people in the wild.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

What I've noticed is I get the impression that a lot of the studies have moved more in the direction
of analyze a phenomena that are kind of specific to online systems. You know, in the real world, we
know that social media might affect politics and so therefore it's interesting to analyze how
politics is treated on social media and whether it represents the larger population is almost a
separate question in some ways. It's just like how are the dynamics of political misinformation, for
example, how do they work on social media? That's an interesting question. There's a lot of research
questions, social scientific questions about that and if you're analyzing that and like, okay,
that's that, that's a thing you can do, right? Use it as a data source for all social sciences. I
really think it's just one piece of the puzzle. There's a lot of different data sources, social
science is just so broad, right?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Like are we talking about health policy? Are we talking about international relations? Are we
talking about economics? There's just so many things going on? For anything, it's like sometimes
you'll find something interesting social media, but sometimes you may not. And it's not so good to
kind of track yourself into it. And so like a lot of my research as often, usually just mainstream
news, right? You can use a lots of different data sources for different things for sure. You know,
in comptational social sciences. I mean there's so many, computational social science even specific
to text analysis, the way that its really done from kind of social science perspective is just
researchers who are interested in particular area are going to choose corpora. That could be
interesting for that. As it went from the other direction of like, we have social media, here are
things we can try to apply it to, I think it's a little less, I mean, there's a reason people do it
of course. And you know, I've tried to do a little bit of this also, but it's like, you know, if you
care a lot about political documents, like maybe you should analyze those if you already have a
reason to care about them. Right? And so, you know, humanists analyzing, you know historical corpora
of books for example, like there's research questions tied specifically to those. The broader
question I'm interested in is we think about using natural language processing as kind of a
methodology to answer social science question. So many things like sentiment analysis, basically,
like narrative analysis, just all sorts of things. How do we do that in broad ways that can work on
lots of different corpora? And so social media I think is kind of an interesting and important
example of the text genre that is relatively new. And so we're still learning a lot about it but it
can be useful in lots of settings cause we're getting a lot of kind of casual, unfiltered or less
filtered conversations from everyday people. And that's kind of an exciting thing about it. So
there's a lot to do.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Yeah. Thank you for explaining this. So that's all I had. Did you have any other thoughts that you
wanted to share on the, on this episode?

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

I think, yeah, I mean more people should work in social media and it just raises so many questions.
There's so many, like if you look at work, like how do you do word segmentation for hashtags? Like
that's hard, word segmentation is hard, right? But like people said, all these creative and
different forms of writing things and it's like, well, but people are language users so people can
understand and invent and interpret new types of conventions all the time and if you just like like
take a random sample of tweets, you'll just find so many of these things and there's lots of
interesting computational questions that are raised by them and there are lots of interconnections
to kind of a social context around authoring of messages, which it's just very obvious in social
media context, but to some extent it's important for all of language, all of language is a social
context, all our use of language is for communication or debatably a large part of it.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

And these things are really important. And social media, they kind of come to the forefront. And so
I think there's a lot of problems that are kind of exciting and hard on social media. How does
conversation context come into play? How people present themselves differently to other people, like
all sorts of things. It's a very rich area, really exciting and there's just like tons of things to
do. So things are very computational in nature. How do you deal with network structure and an
algorithm because networks aren't really important for social structure to these kind of these more
social side questions. How do power dynamics affect how people talk about each other? Can we get
evidence of this from social media? So just all, all sorts of things. I think it's a great area.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Yeah. A few years ago I think there was a surge in work in NLP like focusing on social media, but I
think it didn't sustain for very long. I'm not sure why. Maybe people thought it's not as much
appreciated by other researchers in the area. Like,

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Yeah, so like we think it's cool, I don't know, I'm supposed to be looking at it. I mean there's
always social media tracks at the main NLP conferences now. There are really social media centric
research tends to be in, you know, different conferences that focus more on that. ICWSM has social
media in the title. So therefore it has the most, it's the most centric kind of like WEB or HCI or
those sorts of communities. But the lots of NLP specific problems that are raised by social media
data that you need to tackle in order to do social media analysis. So that tends to be more of what
you see at the main NLP conferences and so yeah. So this year ACL has this social media and
computational social science is the area. And so that has, I think that's a good combination to put
these things in.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

So there should be more of that. Some years we have it as a full area, some years not, but it's
pretty consistent now. There's a lot of workshops looking at different aspects of it cause you can
think of it as a noisier form of text. It's kind of like well edited text, but it has, it has like
misspellings and just straight out typos. Right. At the same time. Sometimes those things that look
like misspellings are really alternate spellings or something else that's going on. These phenomenon
kind of like happen next to each other; you have to deal with them all at once. You need models that
can deal with non-canonical word variants. I guess we'd put everything in embedding spaces now. It's
made this a little bit easier, but you need to deal with a lot of variability, a lot of very
different things, and these settings are, they're just always harder for natural language processing
technologies. It's always harder for them to analyze these, this sort of higher variability
language. So it's a lot of great challenges, I think.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

Yeah. There are a lot of under-studied problems there, so thank you for sharing your thoughts on
this topic. It's been a pleasure talking to you.

</turn>


<turn speaker="Brendan O'Connor" timestamp="">

Yeah, thanks so much. Take care.

</turn>
