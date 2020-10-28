---
title: "DuoRC: Towards Complex Language Understanding with Paraphrased Reading Comprehension, with Amrita Saha"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Amrita Saha"]
number: "071"
tags: []
description: "ACL 2018 paper by Amrita Saha, Rahul Aralikatte, Mitesh M. Khapra, Karthik Sankaranarayanan Amrita and colleagues at IBM Research introduced a harder dataset for \"reading comprehension\", where you have to answer questions about a given passage of text. Amrita joins us on the podcast to talk about why a new dataset is necessary, what makes this one unique and interesting, and how well initial baseline systems perform on it. Along the way, we talk about the problems with using BLEU or ROUGE as evaluation metrics for question answering systems.

https://www.semanticscholar.org/paper/DuoRC%3A-Towards-Complex-Language-Understanding-with-Saha-Aralikatte/1e70a4830840d48486ecfbc6c89b774cdd0b6399"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F513381438&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guest is, Amrita Saha who is a research engineer at IBM research in Bangalore,
India who has been there for several years working on various kinds of question answering stuff.
Thre group has put out a few interesting datasets recently and today we're talking about one of them
called DuoRC. This is a paper published in ACL this year, 2018 and the title of the paper is duoRC
towards complex language understanding with paraphrased reading comprehension. Amrita welcome to the
program.

</turn>


<turn speaker="Amrita Saha" timestamp="00:43">

Yeah, thanks Matt.

</turn>


<turn speaker="Matt Gardner" timestamp="00:44">

So it feels like there've been a whole lot of question answering data sets released recently. Can
you tell us about what's unique about this, what was your motivation was for creating this one?

</turn>


<turn speaker="Amrita Saha" timestamp="00:57">

So recently like we've seen two streams of our RC datasets one towards this factual question
answering, towards the factual passages. And the other towards the passages. So recently, like in
the beginning, the factual RC problems were mostly focused on where the question and the answers
came from the same passages. And as a result of that, there was a high lexical overlap between the
question and the passage. And because of that, there were other ways of fooling the models and it
seemed that the models did not really need to learn the language in order to answer questions. Then
people started looking at more complex ways of creating the data sets so that the question and the
passage can have a lesser overlap. And then that led to core data sets like trivia QA MS Marco, et
cetera. And in the narrative passage on the type of question answering area, they were newer data
sets coming up here movie QA and narrative QA, but otherwise certain problems again with those.

</turn>


<turn speaker="Amrita Saha" timestamp="02:01">

So movie QA, again, it had the issue of high lexical overlap between the question and the passage
and narrative QA posed two kinds of problems. So one was very similar to movie QA. And they're also,
you have plot summaries and have questions as to over the plot summaries. And because the questions
and answers came from the same plot summary again, they had a high lexical overlap, but they also
posted another very tough problem of RC, which was answering the questions from a huge book, which
has probably 60,000 tokens. And the answers actually came from the plot summary. So it has multiple
challenges. So not only RC, it has probably summarization problems. And secondly, there is a tricky
way of evaluation because the gold answers come from the plot summaries, whereas the machine is
supposed to look at the entire book and answer.

</turn>


<turn speaker="Amrita Saha" timestamp="02:54">

And these two answers may actually be input. They might be very different. So that's where we are
trying, looking at this narrative passage type of question answering problems, especially over these
comprehensions. And we write what is the way to design the data set so that we can achieve this low
lexical overlap between the question and the answer. So by design what we do is we take a movie and
we have the Wikipedia plot of the movie. We have the IMDV plot of the movie and we do this for 7,000
or roughly around 8,000 these we have this kind of plot and we gave only movies where the plot line
does more than some hundred words. So we have a significantly big comprehension to evalutate. Now
the way the annotation is being done, first we take the shorter version of the two plots, be it
Wikipedia or IMDV and we show the shorter version to annotators and the annotators job is to look at
these plots and call up with questions along with that also come up with the answer because the
question and the answer are being created from the same passage we expect this will be a simpler
task and there'll be high level of lexical overlap between the impression and the plot.

</turn>


<turn speaker="Amrita Saha" timestamp="04:09">

Next, we have gotten a few questions from this and this is actually a long thing to around 86,000
questions in our data set and we call this as the self RC. Does, which we expect to be simpler. And
we call it self RC because the question and the answer both come from the same plot. Now we taking
these 86,000 questions? We'll go to the longer version of the plot and we show different set of
annotators a longer version of the plot and the question and their job is to read the whole plot and
answer each of these. And we take a consensus of five annotators to come up with the answer. So this
particular task is challenging in multiple aspects because by design the question can have very
little overlap in terms of words and phrases with the plot and the annotator needs to put a lot of
no cognition or he needs to really know about the particular domain or the genre or sometimes he
needs to put common sense knowledge. So there are various aspects of various kinds of challenges
which are going to be addressed by this process. We leaned around hundred thousand such questions
and this, we call is the self RC task. So our notion is this, the self RC tasks should be almost
comparable to the movie QA or the simpler of the narrative QA dataset. What the paraphrase RC task
should be harder than either of these. So all of the contemporary narrative, RC datasets included
like preface RC supposed to be a tougher for each of these.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:45">

What measure of difficulty for the dataset, like how well the humans can do on it. So I was
wondering when you presented that question, the fourth step question that's already been asked about
the shorter version, how often does the answer coincide with that version of the answer that the
person who also provided a question asked?

</turn>


<turn speaker="Amrita Saha" timestamp="06:03">

Yeah, so we actually checked to an extent. So sometimes the answer might be actually very different
from the two plots. And it's true. Let's say the question is "Who killed Mr. X?" And in one place
the answer is his mother and in the other place the answer is actually the name of the person. So
both of the cases, the answers are way different and it's not just because they don't match lexical,
we should not treat that as a wrong answer. And there's also other pieces where the fact that they
don't match is indicative of the fact that one of them is probably wrong. So we just did a simple
check card overlap off how many times it matches or not. So that gave us like a rough number of
around 67 questions just before that. Also around 13% of the paraphrase, RC questions are not even
answerable from the second or the paraphrasen plot.

</turn>


<turn speaker="Amrita Saha" timestamp="06:56">

So only we can only for the remaining of the questions we can do this kind of statistics. But we had
see around roughly the overlap was around 50% in those cases where the question was really answered
and this other human baseline is a very important factor. So we actually did not have that in when
we were evaluating the models. But the way the paraphraser RC data set itself is created is by
taking consensus of five annotators. If at least two annotators agree on a particular answer, that
particular answer is considered as the correct answer. The rest of it keep on gathering annotations.
If we do not find consensus for certain and the rest of it, which are not found like 13% of it has
not been found to be answerable. That's what we do. And other than that, around 37% of these
questions are not directly there in the passage. So it might be synthesize by different annotators
and every annotator might be synthesizing it in a different way, but we'll still do some kind of
word level match to figure out whether they're talking about the same thing.

</turn>


<turn speaker="Matt Gardner" timestamp="08:08">

I guess when we talk about human performance, one way to try to get at this is like agreement
between annotators and so if, if all I take is like, yeah, having consensus to get like the final
gold annotations is good. But if you don't also measure how often there's disagreement, we're not
really getting a good human performance on this. Right? Like you kind of want an either another
person besides that to give annotations and see how much they agree or, measure how much the actual
annotators district, like the original annotators disagreed on the these to get some upper bound on
agreement with the machine. Right.

</turn>


<turn speaker="Amrita Saha" timestamp="08:45">

Right.

</turn>


<turn speaker="Matt Gardner" timestamp="08:45">

Do you have any sense of how that is?

</turn>


<turn speaker="Amrita Saha" timestamp="08:47">

Yeah. Going forward, I think yeah, we did not have this for the paper but some important points.
It's more like a skyline that we need to establish to what extent these questions are answerable,
but barring that 13% questions, all of the remaining questions that at least two annotators which
boil down to the same answer if we're not taking majority, we needed instances where at least two
annotators came up with the same answer. But I agree like we should have a separate evaluation where
we take a completely other set of annotators and see if these questions are really answered. Yeah,
that makes sense. Definitely.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:22">

Another question I had, would it make sense to have, given what you mentioned about the answer
possibly taking multiple different forms and all of them are correct, but it makes sense to include
multiple answers for this kind os asl.

</turn>


<turn speaker="Amrita Saha" timestamp="09:35">

Yeah. Actually we do have multiple answers for each of these questions. Roughly. I think we have two
to three unique answers on an average because after taking a consensus, at least unexpecting at
least two of the five answers would be the same. The rough average comes to two or three. And when
we take the blue or when we take the accuracy, we take the, we do that multiple reference blue or we
do the accuracy. At least it should match that particular answer which was given by at least two
annotators. But it does have multiple references for each multiple answers.

</turn>


<turn speaker="Matt Gardner" timestamp="10:09">

Okay. You gave a good overview at the beginning of a lot of the aspects of this work and we kind of
dove into some details on human performance on this dataset. I think it'd be nice to dig into some
more detail on some of the things that you talked about. You started off by making a distinction in
QA data sets that I hadn't really heard of before or hadn't I hadn't considered with narrative style
QA and I forget what term you used.

</turn>


<turn speaker="Amrita Saha" timestamp="10:32">

Yeah. So reason why I was talking about these two distinctions is that narrative styling and
[inaudible], it gives a very different flavor of difficulty. So one of the things like probably a
understanding in narratives, which part is fiction, which part is nonfiction? So let's say I have a
question where if there's a movie; say 12 Monkeys and there's a character called James Cole there
and the question is "James Cole lived in which city?" And the answer actually came from a word
Philadelphia. If you understand that this city is a kind of roughly conforming to the real world,
and I can talk real world facts and I can use the knowledge base like fee-based or something to
understand the Philadelphia is a city that might probably help me do the inferencing. What I should
not be using. The fact that James Cole is a person, even though let's say James Cole is really a
person in freebase, I probably should not be using information to infer something.

</turn>


<turn speaker="Amrita Saha" timestamp="11:31">

So inferring which part can be fiction, which part can be a worldly fact is one of the distinctive
factors. The other things are also this narrative question answering might bring different kinds of
event based analysis or a analysis from different genre. It literally becomes like an open domain
problem. Today you're about something, some particular genre, which is very much related to let's
say, so you need to learn something about let's say a plot setting or you need to know something
very specific about some other close world setting. So it might be actually way different in that
sense. That is one reason why we chose this narrative facet narrative kind of question answering.
But of course the main challenges which we are talking about is probably this common sense reasoning
because even if they look at each of these questions, I mean I think almost all of these questions
require this matter of common sense reasoning.

</turn>


<turn speaker="Matt Gardner" timestamp="12:32">

So I think the first problem that you mentioned of like a knowledge base for real facts versus like
fiction facts. We could probably get around that because I don't know like Harry Potter, fan fiction
has a big database of facts that you could use instead of freebase. And I think these datasets,
because we're calling them reading comprehension, whatever that term means. It's not a great term
for this, but the notion typically is that you don't need any kind of any source of external
knowledge. You should only need the text itself to answer the question. Right. So I feel like that
distinction might not be the bigger one. I do think this, the distinction that you're making between
like narrative style datasets and more factoid kinds of data sets is interesting because maybe the
question distribution that you get out from these two different kinds of datasets is different. Do
you have any sense of if that's true?

</turn>


<turn speaker="Amrita Saha" timestamp="13:24">

Yeah, it's possible. So we specifically focused on objective kind of questions. So we expected
mostly what, which kind of questions only, and very few of these very descriptive how or causal
analysis kind of questions. But yeah, it's probably possible in both the settings to determine these
a more descriptive kind of questions or more objective or fact-based questions. But one thing which
you were referencing the earlier point that whether or not we should ensure when creating or we
should ensure when we are working on this problem that the entire data set and the entire
information is going to be self contained in the passage. So I'm not sure if in real tasks when we
actually go out and do question answering or whether that will actually happen. So one of the key
motivations towards this data set was initially we wanted to have a data set which really requires
this external auxiliary knowledge and it may come from a knowledge basis. It may come from some
common sense repository or it may come from other modalities. Also. We didn't focus on that, but
that was one of the motivations looking at some of the real world tasks itself.

</turn>


<turn speaker="Matt Gardner" timestamp="14:40">

Yeah, I think that's a good point. That when constructing the dataset and when looking at the
questions, building a system, you might think, I don't really want to have anything external, but
actually what we as humans when we parse language we have a whole lot of external stuff and there's
a lot that you're going to need to really understand a paragraph. And so you can't really separate
these things particular discrete facts about people and places. Maybe some of them won't be too
useful in like a general reading comprehension facility. But knowing some general things about the
way the world works and common sense is going to be really important. And maybe those are things
that are also stored in some knowledge base too. I don't know if it's too plausible to think that
you have a bunch of common sense stored in some neural networks weights, but no one's really
thinking this out yet. Interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:26">

Another distinction in this data set is that you allow the answers to be not exact sentence from the
passage. Could you tell us a little more about this? Why is this important?

</turn>


<turn speaker="Amrita Saha" timestamp="15:35">

Yeah. So actually if you look at the self RC task, which is the simpler of the two. So around 70% of
the questions are direct spans what we did see that initially we did not have this constraint as
such, and we saw that. our annotators were coming up with questions like how many people were or how
many people witnessed this person's death, let's say in the passage. It was not really written. So
in the self RC passage, it might have been written, two people witness the death. But in the
paraphrase RC passage what happened was it probably would've written person X and person Y witness
the death, but the actual count was not written. And we thought it was interesting looking
questions. But again, like not too many of these had this particular characteristics. So we opened
up two guidelines saying that come from, let's see if you can answer it directly from the span and
then a noted like annotate that particular span.

</turn>


<turn speaker="Amrita Saha" timestamp="16:28">

But we did not enforce them to always answer from a given span. If the question was actually on. So
within the paraphrase RC comprehension but required the annotator to write down something by
inferring something from a particular span. Then that was also allowed. That was one of the reasons
why we decided to incorporate it. But in terms of test on the evaluation I see it's a different kind
of challenge that is brought about whats very awkward going into the rest of the complexity. So we
have two tests set, so one is which we call the span test, which is roughly 50% for the paraphrase
RC, probably around 70% for the self RC problem. That is specifically in subset of the test set
where the answers are directly spans.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:10">

And it seems like a more natural problem displayed, the side effects, that's going to be way harder
given that current goals, at least won't give you this ability to stitch together different pieces.
I think this is a great opportunity for us as NLP community to grow like the difficulty in
comprehension tests. I wonder if there are existing datasets that already have this kind of answers.
Are you aware of any other datasets?

</turn>


<turn speaker="Amrita Saha" timestamp="17:36">

Yeah, actually or most of these like MS Marco also claims that; so, MS Marco has had the similar
process of taking the queries from the web and the actual answers which users would have written.
And on top of that they had annotators who actually annotated parts of the, these evidence documents
are these web documents which, which according to them contain the answer and if they can't find the
answer, they actually wrote down the actual answer. That data set also has the similar
characteristics.

</turn>


<turn speaker="Matt Gardner" timestamp="18:04">

Yeah, I guess I find myself running away from any dataset that doesn't have a clear evaluation like
MS Marco narrative QA, these data sets that rely on BLUE and ROUGE for evaluation. Like I don't
trust these metrics. And so like if we don't even know how to evaluate this, then how can we claim
to make progress? And I just don't know.

</turn>


<turn speaker="Amrita Saha" timestamp="18:24">

Yeah, exactly. So we have the exact same initial thought. We initially did not want to, so we looked
at what happens when something gets BLUE-8 and BLUE-10. So a lot of these are very comparable, like
probably below BLUE-15 or event BLUE-20 data, and it's meaningless to evaluate with these metrics.
So we actually initially had ditched these methods. We were only looking at accuracy and F1 and even
if we are looking at to answer our questions, which are a lot having span based answers, we still
can see what is the simple word level overlap or something. But this BLUE gives a, I mean it's hard
to interpret. So initially we had completely ditch that thing, but so reviewers came up with some
points of later on in the resubmission we included that. But yeah, I also completely, and so I think
that probably we are not targeting the correct evaluation metrics for all of these fuzzy problems
like that. There's a whole different challenge coming up with the right metric for these fuzzy
problems.

</turn>


<turn speaker="Matt Gardner" timestamp="19:30">

Yeah. So anyone listening, if you are reviewing a paper that does question answering, do not demand
BLUE as a metric. Like no, that, that is not right. Don't do that. Please

</turn>


<turn speaker="Waleed Ammar" timestamp="19:41">

Wait. So well, how would you allow the answer to be different, yeah, of course we can do like just
substrate matching for the why do you think this is better than BLUE?

</turn>


<turn speaker="Amrita Saha" timestamp="19:49">

So just for the substrate matching or for the softer matching. We just had a F1 Score so what if I
get BLUE of 20 or 0.2, I mean if I look at the actual instances where BLUE or 30 percent has been
obtained, they might actually look very meaningless. But that's why I just feel that maybe
calibration is in our head is not really continuants towards what BLUE does because of all of these
other aspects of it like brevity and other aspects which BLUE has internally coated up that we
probably and fun is a little bit more familiar and yeah, that's just my perspective.

</turn>


<turn speaker="Matt Gardner" timestamp="20:28">

Honestly, I'm not too happy with F1 for this kind of stuff either. Span based evaluation is really,
really nice because it's clear span based question answering has its own problems. Right. But at
least we know how to evaluate it. I don't think we know how to evaluate any other kind of question
answering really. If you don't have some discrete set of options you can choose from. We don't know
how to evaluate language generation in the context of question answering and until we solve that
problem, I don't know how to make progress on any of these datasets.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:55">

I mean this is a very old problem machine translation and if we did the same and decided to work on
machine translation until we solve the evaluation problem, that will be a terrible idea.

</turn>


<turn speaker="Matt Gardner" timestamp="21:06">

I think these are very different because machine translation, it's a lot less open-ended. The
machine translation like a word level translation in machine translation, while of course it's not
great is also not horrible. So it's more like my baseline is going to, for machine translation is
going to be something a lot closer to the actual semantics that I'm looking for and what I'm, what
I'm trying to get is something that sounds more fluid and actually gets some important pieces right.
Whereas in question answering, that's not true at all. Like you have nothing to base your answer on.
And there there's, there's no way to say that my baseline is a good starting point that I need to
tweak with and BLUE can measure how well I'm tweaking that. Like we don't have that at all. It just
doesn't work. How do you know that the semantics of what I output if it has high BLUE score has any
kind of correlation to the semantics of the answer that I'm trying to give. Like we need something
that is more of a paraphrase model. Like I'm hesitant to suggest like a learned metric, but we
really want something that is much better at like saying, did I get the the same predicate argument
structure or a paraphrase of the predicate argument structure in the, in the sentence like did I
capture the same meaning not do I have lexical overlap in a few small points on this? Like really
hard to interpret scale that is BLUE.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:20">

Yeah, that makes sense. I think that when you're trying to make in all these metrics trying to
combine two things, getting the information and then putting it in the form that is expected and
these two pieces are not always separable in machine translation oftentimes. Yeah. I agree word for
word translation would solve the first role.

</turn>


<turn speaker="Matt Gardner" timestamp="22:38">

Yeah, that's, that's a good way to articulate it. That it's information versus form and machine
translation the problem is much more one of form and in QA the problem is much more one of
information and blue doesn't, doesn't measure information really.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:50">

I mean I feel like we're maybe underestimating the difficulty of finding the correct words in
translation at least its very different that the difficulty involved in finding the correct
information in Question Answering.

</turn>


<turn speaker="Matt Gardner" timestamp="23:00">

Right.

</turn>


<turn speaker="Amrita Saha" timestamp="23:02">

Well just checking dialogue for evaluating dialogue, response. They had these adversarial ways of
evaluation. Like whether the response is coming from the adversarial model or the responses coming
from the model, which can be fooled or not. So does adversary launching of evaluation, do you think
it's probably more meaningful in these question answerings being set up as well?

</turn>


<turn speaker="Matt Gardner" timestamp="23:24">

I'm not familiar enough with the, that work I need to read up on it. Waleed?

</turn>


<turn speaker="Waleed Ammar" timestamp="23:28">

Yeah, me neither.

</turn>


<turn speaker="Matt Gardner" timestamp="23:29">

Okay, great. So this has been really interesting so far. Just to summarize what we've talked about,
the problems with existing QA data sets is that by construction there's a lot of lexical overlap
between the questions in the passage. And so the questions are maybe artificially easy because it's
just detecting simple paraphrase and extracting types. And so you get around this by having two
sources of the same basic content and you ask questions about one and answer them on another. This
is an idea that some other people have had, like the who did what dataset does this, the trivia QA
dataset does something like this, but you do it with movie plots, which is nice and this is a
different genre in that there more narrative kinds of questions instead of more factoid kinds of
questions. And so maybe you can get some more interesting discourse kinds of phenomena going on
here. We talked about some challenges in how you evaluate these systems, both for human performance
and for machine performance. How do you evaluate this? This is tricky. Oh yeah. You also told us at
the beginning about how you constructed this, like your annotation tasks, which was nice. And then I
think at this point what we should talk about is the experiments that you ran. So how well do
systems run on this data set?

</turn>


<turn speaker="Amrita Saha" timestamp="24:34">

Yeah. So first let's look at the center of the two tasks, the self RC itself and for our
consideration let's only focus on this. So what happens when the answers are directly spans from the
passage. So the self RC task though it seems very similar to SQuAD complexity. It's a, we saw that
the accuracy was much lower than SQuAD even though we used just the off the shelf models by Def on
this. So one of the reasons is that the length of capacities much longer than SQuAD, SQuAD even has
around one 20 words on an average and the self RC passage was around some 500 words on an average.
So that might be one of the reasons why we have lesser accuracy on this in comparison to SQuAD. If I
just compared it to the... Say there were two models because we had answers which are corresponding
to spans and answer, which are open ended.

</turn>


<turn speaker="Amrita Saha" timestamp="25:27">

We had model just to detect the span and we had another model to generate the answer from the span.
And the generative models are performing pretty bad. Actually the performance is much worse than the
span based models performance simply because of the error cascading. And this is I think a second
level of task to look at. So first let's concentrate what happens on this span based answer base. So
what happens on the self RC as compared to what happens on the paraphrase RC. We see that the
performance immediately drops by almost 30 points. So from 46% accuracy on the self RC task it drops
to around 17% accuracy on the paraphrase RC task. Of course the test sets are very different and
output is a huge performance difference. So a couple of this low hanging fruits we tried to address
in order to bridge the gap between the paraphrase RC problem and the self RC kind of problem.

</turn>


<turn speaker="Amrita Saha" timestamp="26:20">

So we took that long passage, usually the length of a passage in the paraphrase RC cases almost
double that of those self RC case it has around 900 words on an average. So we tried to do co-
reference resolution to bring down most often the problem of multiple sentence inference, that is
one of the things and then we try to do a relevance specific extraction. So we place in RI based
techniques or semantic matches and tried to find which part of the plot is relevant for this given
question and that increased the accuracy numbers from 17% to roughly around 37% then we try to see
what happens if we move the ball answer. And we could directly extract an Oracle subplot of the same
size as them. Usually self RC task, so if I know my self RC plot is around 200 words around 500
words, then I would just extract the plot surrounding my gold answer.

</turn>


<turn speaker="Amrita Saha" timestamp="27:18">

So for, let's call it the oracle preprocessing. Let's see if this oracle preprocessing solves all my
problems in my paraphrase RC problem. That actually leads to only 2% increase beyond that rule based
prepossessing which we had at play. So it means that it still is not being able to bridge the gap
between paraphrase RC and self RC where theself RC was still standing around 46% and after doing all
of these reduction of the plot if we still come to around 29% so this was one of the things that we
saw just looking at each of these two tasks operating. The second thing which we're trying to look
at is what happens if we do some self testing and some cross testing, right? Like if we have let's
say a [inaudible] at our disposal, we have work of these two data sets. Then what combination of
training or testing actually is the hardest or what combination will give us the best results.

</turn>


<turn speaker="Amrita Saha" timestamp="28:08">

So as expected of course. So if I just train on self RC, paraphrase RC or test RC and sorry train on
self RC or paraphrase RC or the combination of self and paraphrase RC and I just simply test on self
RC or just on paraphrase RC or on this combined data set. Then the easiest is self RC of course the
medium hardness is that of the combined task. And the hardest one is when I'm only evaluating on
paraphrase RC. So this particular task was more like a sanity check just just to see whether the
intuition follows. So this is what we expected anyways. But what happens when we train on the
combinations of like either self RC or paraphrase RC on the entire data set of is around 80k
question answers question answers. So the lowest performance happens when you just train on
Parphrase RC which is also expected that you're training on the hardest problems.

</turn>


<turn speaker="Amrita Saha" timestamp="29:03">

But when you test on any of these combinations, I self RC and paraphrase RC you're doing the right
thing. And all of the pieces, this gives the lowest performance. The next level of performance are
some improvement is obtained. When you train on self RC tasks itself and you evaluate on all of
these three, but the best performance actually comes when you train on the combined data set. So it
means that this paraphrase RC is indeed bringing in something to the table. It's actually helping
the model to learn or do slightly better on some of these harder problems in the test set. So it's
not completely, if you use this the model or something even if you include that in training whether
or not the model is doing something special to attack these specific problems, it does help to some
extent. So this was a the main conclusions that we drew from the experiment.

</turn>


<turn speaker="Matt Gardner" timestamp="29:51">

Yeah, it was really interesting to me to see that when you train on just the harder version, the
paraphrase RC that you do quite poorly, but adding it to the self RC improves the performance of the
self RC. Do you have any intuition for why that might be?

</turn>


<turn speaker="Amrita Saha" timestamp="30:03">

Yeah, it's just that, I mean if that had not happened we would have been really more worried about
this data set that maybe it's bringing some negative signals. It's not even helping in the, if I
just do the same thing, like if I just test on self RC and I train on self RC as opposed to I train
it on self plus paraphrase RC. So even on this task, if it kind of dropped, I would think that it's
doing some kind of negative learning from the harder problems. Just the fact that it's not doing is
a probably a indication that it's not jeopardizing the models. But yeah, I think being more
investigation in these.

</turn>


<turn speaker="Matt Gardner" timestamp="30:38">

Yeah. I wonder what would happen if you train first on self RC and then on paraphrase RC one
hypothesis is that the self RC, the easier one is, is helping you figure out like a just basic level
of paraphrase so that you can localize stuff in the harder Corpus better you would, you would think
that you might overfit on the simple lexical matches if you're training on both of them and distract
yourself from the actual harder problem, but you need to be in a good starting place. So maybe doing
like a curriculum kind of thing might help. I don't know. I just, this is just guessing here, but
it's, it's interesting.

</turn>


<turn speaker="Amrita Saha" timestamp="31:13">

Yeah, that's, that absolutely makes sense, I could try it sometime.

</turn>


<turn speaker="Matt Gardner" timestamp="31:17">

Yeah. And, yeah, just to get, just to give a quick example from the paper, this is the first example
that shows up. The movie is called 12 Monkeys. There's a question called Peters is a board the plane
with what in the shorter version where this question was generated from the sentences is Peters
abort the plane with the virus... So this is like an obvious SQuAD style someone just like did a
copy paste and switched some words, whereas in the longer version, the only evidence you have to
answer this question is that the man who previously was referred to as a Dr. Peters, the man goes
through airport screening and manages to persuade security that his biological samples... Peters is
a board the plane with biological samples. But you've got to do a whole ton of crazy stuff to figure
out that that's what's going on here. So yeah, it's just a very different kind of problem. And you
would think training on self RC would distract you from answering this harder kind of problem? Maybe
it's just getting us like a baseline kind of like lexical matching signal in the model. I don't
know.

</turn>


<turn speaker="Waleed Ammar" timestamp="32:17">

Could it be that that improvement we're seeing just my increasing number of training samples. I'd be
interested in seeing if you can solve for the same number of examples in the training sets still
that our performance, by combining self RC or paraphrase RC.

</turn>


<turn speaker="Amrita Saha" timestamp="32:32">

Some more ablation tests would be definitely interesting to see. So one more thing I just wanted to
add the other resource which we might be overlooking in this particular task of question answering
is the fact that we, for every question, we have two parallel snippets, from two paraphrase
documents. So the, there might be a lot of paraphrase document kind of resources available. But here
we have two snippets of each of these paraphrase documents and code where given question. So whether
that kind of resource might be helpful for other problems where you try to learn paraphrases or
something insists can answer these problems.

</turn>


<turn speaker="Matt Gardner" timestamp="33:13">

Yeah, that's an interesting point. Well thanks. Amrita for coming out. This was a really interesting
discussion. Is there anything you wanted to talk about that we missed, or do you have any final
thoughts before we conclude?

</turn>


<turn speaker="Amrita Saha" timestamp="33:22">

A, No. So yeah. We are also starting to work on these problems, so I'll definitely encourage people
to work on these and augment the data set and, yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="33:35">

Great. Thanks.

</turn>
