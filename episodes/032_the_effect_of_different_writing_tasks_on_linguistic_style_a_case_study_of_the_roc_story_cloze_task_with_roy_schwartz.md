---
title: "The Effect of Different Writing Tasks on Linguistic Style: A Case Study of the ROC Story Cloze Task, with Roy Schwartz"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Roy Schwartz"]
number: "032"
tags: []
description: "CoNLL 2017 paper, by Roy Schwartz, Maarten Sap, Ioannis Konstas, Leila Zilles, Yejin Choi, and Noah A. Smith. Roy comes on to talk to us about the paper. They analyzed the ROCStories corpus, which was created with three separate tasks on Mechanical Turk. They found that there were enough stylistic differences between the text generated from each task that they could get very good performance on the ROCStories cloze task just by looking at the style, ignoring the information you're supposed to use to solve the task. Roy talks to us about this finding, and about how hard it is to generate datasets that don't have some kind of flaw (hint: they all have problems).

https://www.semanticscholar.org/paper/The-Effect-of-Different-Writing-Tasks-on-Linguisti-Schwartz-Sap/1a697d7cf187e51d5ccc23eb3ee5d2950ece5522"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F346270753&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner Waleed Ammar. We are research scientists at the Allen Institute for Artificial
Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right, so today we have as our guest on our podcast, Roy Schwartz, who is a postdoc at the
University of Washington and AI-2. He's working with Noah Smith and others at UW and he's on the
Aristo team at AI-2. And he's going to be talking to us today about some work that he did with his
UW collaborators called the The Effect of Different Writing Tasks on Linguistic Style: A Case Study
of the ROC Story Cloze Task . So thanks for joining us today, Roy.

</turn>


<turn speaker="Roy Schwartz" timestamp="00:39">

Thank you so much. I'm really excited to be here.

</turn>


<turn speaker="Matt Gardner" timestamp="00:42">

So why do you want to give us an elevator pitch of this paper?

</turn>


<turn speaker="Roy Schwartz" timestamp="00:45">

Yeah, sure. This is the paper that did they did when working with UW with a few collaborators and
Maarten Sap, Ioannis Konstas, Li Zilles, Yejin Choi, and Noah Smith. And I have to say the one line
description of the paper is that the writing tasks that you give people affects the way they wright
in terms of their writing style. And we'll talk about what the writing style means, what does the
writing task mean? But basically if I want to give you an example consider a sentence like "John
went to the movies last night." and the state, I have given you the sentence and I tell you now
write two different followup sentence. One that makes sense. Something like "It was a romantic
comedy." And another which doesn't make so much sense given the contex something like, "He had fish
and chips." And now this, these two writings in a task one the writing that makes sense and another
you write something that doesn't make sense are supposedly I mean, you would expect different
content in both of them, obviously, but you wouldn't necessarily expect them to have different
style.

</turn>


<turn speaker="Roy Schwartz" timestamp="01:50">

But what we found in this paper is that actually when you give people a such writing tasks that
their right sentences tend to be longer. They tend to contain more adjectives more conjunctions.
While the wrong sentences tend to be shorter, to have more pronouns and to have in general, more
negative language, which is I thought it would be, it's very interesting from several levels. First
of all, the cognitive level of the way, this is interesting to know where the type of things that
affects the way people are writing. I think this is a starting project to run more researchers to
answer these question in terms of how we think and how we express ourselves, but also from a NLP
perspective there at least to an interesting points to talk about.

</turn>


<turn speaker="Roy Schwartz" timestamp="02:37">

The first is basically how do we design datasets and how do we make sure that the datasets to design
do not introduce biases that makes our system not learn what we hope them to learn. And another
thing I think it could have a great potential for NLP applications. I mean, I think the obvious is
detecting fake news. If you had a way to find out which statements are true or false or, I don't
know. True or false is kind of a fuzzy notion but you get the point using a style rather than
content. And there's also been a large number of work recently of people working on trying to take a
given text and modified style and maybe normalizing it in terms of gender or other types of things
and there has been work by a Jessica Ficler and Yoav Goldberg recently has tried to control for the
style sentence and there's a few people working on a similar task. So I think this could have great
value to this work.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:42">

Interesting. So you measured the effect of these stylistic differences in the ROCstory cloze tasks.
Can you tell us a little more about this particular task?

</turn>


<turn speaker="Roy Schwartz" timestamp="03:51">

Yeah, definitely. The ROCstory cloze task was in reviews last year. The main author is Nasrin
Mostafazadeh from the University of Rochester and she had a few collaborators and ideas of these
datasets is that it is common sense datasets or event detection where the basic idea is that this,
similar to the example that I gave, you have a story graphics of four sentences and then you have a
fifth sentence which either makes sense given the perfect or doesn't make sense. And the goal of the
system is to tell the two apart. And these tasks was in groups as I said last year. And I remember
sitting at NACL in San Diego when you in for the first time I saw this paper and I was very
impressed by really the, they seemed to have done a very good job in constructing the datasets they
they made sure that there was a variety of topics in the story and the variety of temporal relations
and they made sure that the same author wrote both endings. So there wouldn't be an author effect.
And they ran I think nine different baselines on the datasets and none of them went beyond a 60% for
them. The baseline is at 50% and it really seemed like a hard task and indeed, I mean, until very
recently, maybe one year after the data's been released this, the 58% was still a state-of-the-art
on the task. And then if you compare it to other datasets, that were released roughly the same time
like a SQuAD or LAMBADA or CNN daily mail. The results improved quite drastically in a similar
amount of time.

</turn>


<turn speaker="Roy Schwartz" timestamp="05:23">

So this is really indicated it's quite a hard task. And however when we looked deeply into the way
this dataset was constructed we noticed a few interesting trends. The way the authors build the
dataset was by asking a mechanical Turk workers to write five sentence stories, which are coherent,
written as one piece. And then training the last sentence. Like the first four and then asking an
additional worker to write two competing endings, one which makes and another which doesn't. And
this made a think that asking people to to do this writing task writes on the other end, something
that makes sense. Given the preface and something it does make sense, imposes some biases on people
and we expected this would have some effects on the writing of how this is of the style that
resulted in these two sentences.

</turn>


<turn speaker="Roy Schwartz" timestamp="06:22">

So we ran and we actually didn't use very sophisticated tools. We use it a logistic regression
classifier with stylistic features, which are basically a sentence length and the character N grams
and word N grams but we even replaced the content words with their part of speech. So basically you
have sequences of the function words and part of speech. And we got I think 72% accuracy, which is
about 50% better than any of the methods we tried before, and importantly we didn't even look at the
story prefix. You just took the last two sentences compared between them without disregarding
completely the four sentences that came beforehand. And we were able to do 15% better than anybody
else on this task. So this is, I think this is interesting, but I mean I'm not I think, this is
definitely an issue with this dataset, but I think, I mean it's very easy to, to come in and find
this problem with dataset, I think that the author did an amazing job in trying to construct the
datasets. But unfortunately one small thing that was which wasn't necessarily which was hard to
think in advance would have such a large impact, but it turned out to be quite significant.

</turn>


<turn speaker="Matt Gardner" timestamp="07:40">

So what made you start looking at this dataset in the first place? Did you really come at this and
say, Oh look, I think there's some linguistic style insight that I could get from examining this
dataset. Or were you trying to like improve the state-of-the-art on this data set first and then
arrived at these style concerns what was your process?

</turn>


<turn speaker="Roy Schwartz" timestamp="07:59">

That's a great question. I mean I've worked in a group in UW with several students and they've been
working on this datasets ever since it was released. I joined relatively late and they made some
progress. I mean they have the, one of the other methods I'll talk about later when we had the nicer
language model approached, that does better than the 60% by using some nice trick with the language
model like they did, they weren't able to push it much further. And when I joined I kind of like, I
worked a bit, I mean I found this dataset to be very cool because it really felt like a hard
dataset, it didn't feel like one of these days sit where you can just do a sequence2sequence model
with a few hacks and get to basically solve the problem, like other datasets that are around
recently.

</turn>


<turn speaker="Roy Schwartz" timestamp="08:46">

And so we had like a more interesting and more challenging tasks. But when I looked at the
instruction, something felt weird and I said, I mean, there's gotta be some bias that is incurred by
asking the authors to do such different tasks. And especially, I mean, I'm not sure that the, I mean
I actually tried it on a few other datasets and the effect wasn't as strong. I'll talk about it
later. But when you, especially when you give it to a Mechanical Turk workers that basically are
paid to do one sentence in maybe 10 seconds or so, it's obvious that some biases will come up and I
mean, they have very little time to go through some heuristics and they turn out to write. Maybe, I
mean, the negative, language used by the, in the negative sentences I mean, the word hate turned out
to be a very strong feature. I mean that is when you tell the worker to write a negative sentence
they would just say "John hates apples" or whatever, I mean kind of go to these heuristics where
it's easy for them to generate a negative sentence easily. So, but I think, I mean this is in this
sense, it's kind of a more realistic case where you have, I mean people don't usually spend hours
thinking of every sentence. They say they just. I mean everyday conversation. You just speed up text
or words. And so I think this is an interesting observation.

</turn>


<turn speaker="Matt Gardner" timestamp="10:12">

Yeah. I guess it seems like with more people from the deep learning and machine learning crowds
coming to look at NLP problems, there's a lot of talk about how people just have hammers and bang on
data with them. And I guess this result shows how important it is to really think about the data
that you're working with. Someone with an ML hammer would not have come to these conclusions. Right.
And it's only because you thought about this from like a psycho linguistic style or kind of
perspective that you came up with this particular model that turned out to work really well.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:49">

Are there like interpretable differences that you can tell us like conclusions of the stylistic
differences?

</turn>


<turn speaker="Roy Schwartz" timestamp="10:56">

Yeah, definitely. I mean, when we look at, we started this paper by doing kind of a surface analysis
when we just counted the number of frequent part of speech tag with frequent words in both cases, in
the positive versus negative cases. And we found, first of all that the positive sentences were just
simply longer. I mean by maybe a half a word or so, but they're longer than the negative ones, we
found that a, I'm not sure if positive and negative is the right term. I think we used coherent or
incoherent or right or wrong. I mean, it's a bit confusing even for me. What's the right term to
use?

</turn>


<turn speaker="Waleed Ammar" timestamp="11:36">

Well, I'm also surprised as you said that negative ones. The Turkers use the word hate a lot. So if
they're asking to write an incoherent completion doesn't seem like hate is a very obvious choice.

</turn>


<turn speaker="Roy Schwartz" timestamp="11:53">

Yeah, I mean, you can look at the first example I think we have hate here. No, it's not here. I mean
basically when the, it's hard to do this task and it's definitely hard to control for the task would
come out eventually. But think of kind of the story that goes on someone does something then it's
another person does another thing and you want to do something that doesn't make sense at all.
Suddenly throw out. Yeah. "John hates apples." It's kind of, I mean, where did this come from? So I
think this is one of the heuristics the Turkers use was very, if you look at the table here, I think
you'd see it was used exclusively in the negative examples. It wasn't a very popular feature, but it
was very strong one. Once you started word hate, it was pretty classifier had a very easy decision.
Other types of features. I mean coordinations was used or coordination or adjectives were used more
in the positive cases. It's kind of indicated when you want to write more. When you want to write
something positive, you write, you describe it more, you add more details while you're kind of tend
to be more concise when you're generating the negative text. Another example was a writing with the
exclamation mark kind of enthusiastic, which was more more in the coherent version.

</turn>


<turn speaker="Matt Gardner" timestamp="13:15">

And you also mentioned or cited some work in the paper about how your findings correlate at least a
little bit with deceptive text, like things that, things that people have found when studying
deceptive text and deceptive speech.

</turn>


<turn speaker="Roy Schwartz" timestamp="13:30">

Yup. This is a, I mean this is [does] not the work for measuring style cases obviously, I mean the
features we used in our findings correlate with the feature from previous works. And specifically I
think the most relevant tasks, the task of the deception detection. I mean even the text, whether it
is true or false and indeed many of the findings that we found that especially with the part of
speech distribution, using more pronouns in the coherent text. And also in right texts in the
deceptive case versus using more proper nouns in the incoherent or wrong or deceptive text. I'm
hoping it's making sense.

</turn>


<turn speaker="Matt Gardner" timestamp="14:16">

It's really interesting. You mentioned earlier a language model. Can you tell me about this?

</turn>


<turn speaker="Roy Schwartz" timestamp="14:23">

Yeah, so I mean our first and then I think most interesting finding was that the really using just
style features, while ignoring completely the the story prefix got us 72%. And while we were working
on it, it was a shared task we submitted it in February to the LSTM shared tasking with NACL in
Valencia and we thought about some meeting in it and our system. And then we thought of some people
who've gotten high results in roughly the same time. So we wanted to combine the approaches this
approach with the other approaches that I talked about earlier to people in UW have been working on
and before I came and there the idea is very different, but I think it's also interesting, on its
own.

</turn>


<turn speaker="Roy Schwartz" timestamp="15:09">

The system for solving this task was based on a language model, which was trained on I forgot to
mention it in the, there the ROCStory Corpus also had an additional corpus, which was much larger of
about the 50,000 or later date which extended to 100,000 just positive examples, a five sentence
story written by the same author and without completing endings. So most systems use this as a
training set and then try to build it to solve the test sets and our language also, we trained it on
that corpus and we tested it by running it over our, each of the positive or negative examples and,
and seeing which one has a lower perplexity or a lower conditional probability conditional
probability in the story prefix And when we did that, we got relatively low results, maybe 50
exclusive without our staff features.

</turn>


<turn speaker="Roy Schwartz" timestamp="16:09">

We got maybe 54% or so, if I'm not mistaken. But then when we looked more deeply into it and we
noticed that some of the reasons that's some of the sentence endings tended to have higher
probability on their own, disregarding the prefix. So we normalized our condition probability with
the probability of the ending itself, which basically resulted in the 0.1 meter information between
the context and the ending. And when we took this measure, you can see it in the page, equation one
in the paper where we get into something normalized the probability of this ending human story with
a probability of ending this jumped from about 54 to 67%. These had a really significant effect on
our results. And when we combine these as a feature in our linguistic progression, we got three more
percent improvement, which got us to state-of-the-art and to first place in that shared task.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:15">

So these are the current best results for this shared task?

</turn>


<turn speaker="Roy Schwartz" timestamp="17:20">

I think in parallel to our work, there've been a few groups that seem to reach a similar conclusion.
One group in TCI. Yeah. Kai-Wei Chang was the first author and they reached roughly the same result
and they had a short paper at ACL. I think our numbers are virtually the same up to a half a point
or less. And I think recently a group in Dan Roth's group University of Illinois in Urbana-
Champaign, now in UPenn I think they even published results a bit better, maybe 77%, maybe 2%
better. But they also were both works, kind of relied on the same findings that we did.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:10">

Interesting. So if you were to fix this dataset or if you were to design a new dataset and you want
to control for this stylistic difference, how would you do it?

</turn>


<turn speaker="Roy Schwartz" timestamp="18:22">

That's a great question. I mean, I think it's always a problem. And once you want to solve one
problem, you're probably risking introducing new problems. But we did find one example that was
interesting. We ran our system on two other datasets. We only report one in the paper. The first one
was the COPA dataset. This was the dataset by Roemmele et al. from 2011. It was I think that the
dataset came way before its time because it was back in the days, it's 2011 nobody would think about
tackling such stats because how would you tackle it? So they had a similar idea where you have I
think one sentence prefix and then two competing endings. And again, the same tasks of telling the
two apart, but there they specifically have annotation instructions that forced the text to be more
consistent or more controlled for, specifically they told the author to write as briefly as possible
and to avoid proper names to avoid slang and to avoid any kind of, to use a very simple language.
And this resulted in our classier doing only 53% on this datasets compared to 72%. Now this dataset
is quite smaller and just about to one quarter of the size of our dataset. So there are other
compounding factors, but basically I think this gives an intuition that you think simple
instructions to the authors kind of to limit their style variability can in many ways alleviate many
of the things that we've seen here and others, they just did an experiment with just the, I'm
working here at AI-2 in a research team where we try to solve the science questions and one of our
main data sets is a multi-choice science datasets where you have a question and four different
answers.

</turn>


<turn speaker="Roy Schwartz" timestamp="20:30">

And I was wondering whether you'd find different styles between the different answers and there
maybe not surprisingly, I found that I didn't get any, anything even remotely above a random
baseline. And I think it wasn't that surprising because if you compare kind of the two extremes of
giving it to a turker that has 10 seconds to write and just scribble something compared to a dataset
we use here that are written by professionals, who spend hours debating on each question and kind of
a spending substantial amount of time to make sure that these questions cannot be hacked by simple
rules. It doesn't, it's not surprising that you don't see these effects. So I mean, there are ways
to overcome this. That's obviously it's not trivial. I mean every day comes with it's own problem.

</turn>


<turn speaker="Matt Gardner" timestamp="21:19">

Yeah. The reason that I liked this paper a lot is it fits into a line of work around really
analyzing datasets and figuring out what it is that datasets tests and what they're good for. So
Danqi Chen and folks at Stanford had a paper, I guess a year ago on analyzing a popular reading
comprehension dataset at the time, the CNN daily mail dataset that was released by Google. And
showing issues with this dataset, not that the data's that was bad. Just that when you want to
evaluate on this, when you went to evaluate on this, there are, there are issues and you need to be
aware of them. Similarly Robin Jia had a paper at EMNLP on adversarial examples for SQuAD another
popular or currently popular reading comprehension dataset, showing that really simple tweaks can
make almost any model, basically any model that was trained on SQuAD fail pretty easily. And this
work also just shows the issues that can arise when we try to over claim what datasets do not that
the ROCStories corpus is bad. Like I guess it highlights the building datasets is hard, right? And
we need to think carefully about what exactly the dataset is testing. And these kinds of works are
really useful. I guess I like to batch or I have batched on the BAbi dataset. It is useful for some
things, right? It's just not doing everything that it claims to. Right. And we need to be careful
about what exactly the datasets that we're using are testing.

</turn>


<turn speaker="Roy Schwartz" timestamp="22:57">

Exactly. I mean, you want to make sure that your model is doing some sort of, I mean, you wanna kind
of understand what your model is doing and not think that it's doing one thing when it's actually
counting character n grams and this is not something that is not why we're working here. And another
example that I think is a few analysis papers on the visual QA dataset which show that basically in
order to solve where you have an image and a question and you they showed it to in order to solve
it, you basically can only look at the text and look only at an image and get roughly the same
results. But I mean, yeah, the same line of papers. It's hard to build datasets. I think. I mean,
personally I did this work and I think it's important to, first of all know the limitations of these
works.

</turn>


<turn speaker="Roy Schwartz" timestamp="23:43">

I mean, I think I am still planning at some point to continue working on this ROCStory corpus. I
think it's a great dataset, just the baseline is about roughly 72 or 75 and not 50%. I mean, this is
what you would do without, and just with the style features and there's a long of way, and there's a
very long way to get to a hundred from here. So it's important to know that the thing is more than
to know that then when you're designing your next datasets to know the things to pay attention to.
And yeah, these datasets are obviously improve the state of our technologies quite, quite a bit in
the last few years.

</turn>


<turn speaker="Matt Gardner" timestamp="24:19">

Great. Thanks for coming to talk to us, Roy.

</turn>


<turn speaker="Roy Schwartz" timestamp="24:21">

Yeah. Thank you.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:22">

Thank you!

</turn>
