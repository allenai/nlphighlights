---
title: "Gender Bias in Coreference Resolution: Evaluation and Debiasing Methods, with Jieyu Zhao"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Jieyu Zhao"]
number: "066"
tags: []
description: "NACL 2018 paper, by Jieyu Zhao, Tianlu Wang, Mark Yatskar, Vicente Ordonez, and Kai-Wei Chang. Jieyu comes on the podcast to talk about bias in coreference resolution models. This bias makes models rely disproportionately on gender when making decisions for whether \"she\" refers to a noun like \"secretary\" or \"physician\". Jieyu and her co-authors show that coreference systems do not actually exhibit much bias in standard evaluation settings (OntoNotes), perhaps because there is a broad document context to aid in making coreference decisions. But they then construct a really nice diagnostic dataset that isolates simple coreference decisions, and evaluates whether the model is using common sense, grammar, or gender bias to make those decisions. This dataset shows that current models are quite biased, particularly when it comes to common sense, using gender to make incorrect coreference decisions. Jieyu then tells us about some simple methods to correct the bias without much of a drop in overall accuracy. https://www.semanticscholar.org/paper/Gender-Bias-in-Coreference-Resolution%3A-Evaluation-Zhao-Wang/e4a31322ed60479a6ae05d1f2580dd0fa2d77e50 Also, there was a very similar paper also published at NAACL 2018 that used similar methodology and constructed a similar dataset: https://www.semanticscholar.org/paper/Gender-Bias-in-Coreference-Resolution-Rudinger-Naradowsky/be2c8b5ec0eee2f32da950db1b6cf8cc4a621f8f."
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:05">

This is Matt Gardener and Waleed Ammar, we are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:11">

Okay. Today our guest is Jieyu Zhao who is a PhD student at UCLA working with Kai-Wei Chang, and she
is focused recently on issues of gender bias in natural language processing systems. Jieyu, welcome
to the program. It's nice to have you.

</turn>


<turn speaker="Jieyu Zhao" timestamp="00:27">

Hi, thank you for inviting me here.

</turn>


<turn speaker="Matt Gardner" timestamp="00:30">

And today we'll be talking about a recent paper titled Gender Bias in Coreference Resolution:
Evaluation and Debiasing Methods. So first off for our listeners, can you tell us what coreference
resolution is, in case they're not familiar with this?

</turn>


<turn speaker="Jieyu Zhao" timestamp="00:47">

Yeah. So when people write articles, they usually use different ways to mention people, location, or
organizations for example, there are journalists talk about the president of the US the sentence may
begin with, The president Donald Trump and in the next sentence, he may be referred to as The
President. And in the later, maybe he just referred to using the pronoun he. So in all these cases
of president Donald Trump or The President or, He, refers to the same person. So coreference
resolutions is a search task to figure out the phrases, referring to the same entity in that given
text. So it's allow all of the fundamental steps for computer to understand the article.

</turn>


<turn speaker="Matt Gardner" timestamp="01:35">

Great. And so what, how then does gender bias play into this? All we're trying to do is decide what
things refer to which people are or which noun phrases refer to the same thing. How can this be
biased?

</turn>


<turn speaker="Jieyu Zhao" timestamp="01:47">

Yeah, so like the example I gave you above the co-reference resolution system can recognize the
gender pronoun he refers to the president and in the sentence however when they have some new
reports about, the chancellor of Germany who is a female, the model cannot link the gender pronoun
she to The Chancellor. So this is the bias we talked about in our paper. And also a concurrence of
publication by Ben's group at John Hopkins also find the same issue with the co-reference systems.

</turn>


<turn speaker="Matt Gardner" timestamp="02:20">

So to give a little bit more detail, what you mean is if I see a gendered pronoun, the fact that
it's gendered is going to affect the way my model behaves.

</turn>


<turn speaker="Jieyu Zhao" timestamp="02:31">

So yeah, so like if you have, for example The President and he in the same sentence, so the co-
reference system can make correct decision that this He refers to The President. If you kind of
change, he to she in the same context, most of the times the co-reference system will fail. They can
all link she to The President.

</turn>


<turn speaker="Matt Gardner" timestamp="02:56">

And why do you think that happens?

</turn>


<turn speaker="Jieyu Zhao" timestamp="02:58">

Yeah, so it's the co-reference systems have a lot of different things to make predictions and
sometimes it may use some features from the lexical or from your grammar, but also there is some
bias in the model, particularly in the model. So when it compared the different hint sometime it'd
get confused by the gender because like your training data set is still biased to all some external
fuzzy used is bias. The model gets confused by the gender hint so it will get confused and make
wrong decisions.

</turn>


<turn speaker="Matt Gardner" timestamp="03:36">

So how do you know that the system is actually biased? Like what if your test data also has? So
presumably as you said, I see a lot of associations between particular genders and particular nouns
like president or secretary or something. If my test data also has bias, how can I actually be sure,
like how do I actually diagnose the bias in my model? What's the metric that I can use to diagnose
this?

</turn>


<turn speaker="Jieyu Zhao" timestamp="04:07">

Yeah. So we all think about this questions like a wave. The first experiment that we did is that we
swap the gender pronoun in that test dataset. And then we want to see if there is any difference in
the performance. Because like if one model is gender neutral it should perform a similar on the
sentences with the president, He, or the president she. So if our dataset experiment on the
benchmark dataset by swapping the gender pronouns, we found that the performance on the automatic
dataset is similar so we cannot get the conclusion that the model is biased. So then we probably do
know that the model is bias because we test some specific sentences the model preformed really
differently, so we then come with our new window biased dataset, so in this dataset we ignore a lot
of other things. You just, so you either gender things all some, some grammar rules to test the
model to see if the model still biased, in our dataset.

</turn>


<turn speaker="Matt Gardner" timestamp="05:26">

Okay, great. So before we dig into the window bias data set, you introduced, can we talk about the
details of this first experiment that you ran?

</turn>


<turn speaker="Jieyu Zhao" timestamp="05:34">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="05:34">

So you, so you said you swapped the gender of pronouns in OntoNotes.

</turn>


<turn speaker="Jieyu Zhao" timestamp="05:40">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="05:41">

Does that, does that work in all cases? Like say I see someone like I see father and then I see the
pronoun he, and these are labeled as co referent. If I just swap he with she, I'm going to have a
hard time. Right? I've like changed the data.

</turn>


<turn speaker="Jieyu Zhao" timestamp="05:56">

Yeah. So before we change the data what we are first do is we anonymize the data set because we
have, like you said, the father all, we have some names like Joe or Mary can gave a hit until the
gender. So we first anonymize the data set and then we swap the gender pronoun and also some verbs
with the gender hints like waiter or waitress, then we swap on the test dataset and they want to see
if the performance of the model is very different or not.

</turn>


<turn speaker="Matt Gardner" timestamp="06:32">

I can understand the motivation for doing this with common nouns like we don't want for fairness
reasons, we don't want certain noun phrases to be associated too highly with, particular genders.
But is that also true of names? Like say, John. Like do you really want to like I would think that
it would help a co reference model to be able to associate names at least clearly gendered names
with gender. And so, why anonymize those?

</turn>


<turn speaker="Jieyu Zhao" timestamp="07:04">

Yes. We anonymize those names also.

</turn>


<turn speaker="Matt Gardner" timestamp="07:10">

Yeah. And I'm wondering if that's really desirable, like if you really should do that or not.

</turn>


<turn speaker="Jieyu Zhao" timestamp="07:16">

I think we should do that because if you don't anonymize a name, then you just, swap the gender
pronoun because the name is John we know is male, but you'll put a she in a sentence it will make
the sentence not make sense. So we want to make all the dataset kind of a large dataset I guess. So
we anonomize those names.

</turn>


<turn speaker="Matt Gardner" timestamp="07:40">

Yeah, just like if I want to actually do this for my training data, it seems like it would hurt the
performance of my system if I'm not able to use very obvious cues that like are aren't unfair to
use.

</turn>


<turn speaker="Jieyu Zhao" timestamp="07:52">

So like our experimental results also show like they did, this anonymize. We have some drops in our
performance. Yeah. It shows in our results.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:03">

So the thing that I was, I'm still not sure about is what's the like what was the intention? Like
whats the best case scenario, I guess out of the experiment. What are we trying to accomplish?

</turn>


<turn speaker="Jieyu Zhao" timestamp="08:13">

Because I know that data set is bias. We want to see if we swapped the gender pronouns, if the model
still gets similar performance, or very different preformance on the new swapped dataset.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:27">

And the assumption is if we get better performance, this means that bias is hurts. The bias that
exists, the natural biases that exist in the data hurts the overall performance of the coref system.
Is that the hypothesis?

</turn>


<turn speaker="Jieyu Zhao" timestamp="08:45">

The hypothesis is this like, we want to find a way to figure out that gender bias in the model. So
one way is like if we have a male bias dataset and a female biased dataset, if the model performs
really different on these two dataset, it's means the model is biased, so it's like it can make
correct predictions with the he and the president, but it can't link she to the president, so the
performance on these two biased data set will be very different.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:19">

And, and when you say the performance in the dataset, you mean if you change both the training tests
or just a training data or just the test data?

</turn>


<turn speaker="Jieyu Zhao" timestamp="09:27">

The test data, we just want to evaluate if the model we have now is biased or not.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:35">

So when you anonymize all the than the reference that happened before the pronoun and you keep the
he and she pronounces the same, is that right?

</turn>


<turn speaker="Jieyu Zhao" timestamp="09:50">

Oh, so it's like they anonymize those common names and then they swap the gender pronoun from he to
she, from she to he, we make that swap and then they test the performance on the original test data
set and on this swapped data set. We want to see if the performance on these co-reference system is
really different on these two datasets or not.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:17">

So the fact that it didn't change that much I think that's what you're saying. So what does this
tell us?

</turn>


<turn speaker="Jieyu Zhao" timestamp="10:24">

So it's like on the benchmark alternate data set. So there are a lot of hints for the model to make
predictions. So when there are enough hints to make the correct prediction the model is less biased
to the gender, to the gender hint. So we want to find that a way to see if we can compare the gender
hints to a smaller set, of settle other future hints.

</turn>


<turn speaker="Matt Gardner" timestamp="10:58">

So you take OntoNotes, which is a very common core reference dataset. You anonymize the test data
only you train it as normal. Is that right? Or do you, do you anonymize the training data also?

</turn>


<turn speaker="Jieyu Zhao" timestamp="11:13">

We did several things and the first thing, yeah, the first thing is the way, okay. So, so let me see
it this way. So in our paper, the results part, we trained on the anonymized training dataset.

</turn>


<turn speaker="Matt Gardner" timestamp="11:26">

Okay.

</turn>


<turn speaker="Jieyu Zhao" timestamp="11:26">

Yeah. Yeah. So a lot of my, the training and a test.

</turn>


<turn speaker="Matt Gardner" timestamp="11:30">

Okay. And, and do you swap? So, so you say you anonymize and then your gender swap including
pronouns and like gendered nouns like mother and father, you do some fancy stuff on mechanical Turk
to mine these and then you swap those two, which is pretty nice. And so do you also swap the
training data to when you test, when you test on the swap data or do you keep the training data the
same?

</turn>


<turn speaker="Jieyu Zhao" timestamp="11:59">

I keep the training data the same.

</turn>


<turn speaker="Matt Gardner" timestamp="12:01">

Okay. So, so if for instance, there's a big correlation between secretary and she in the training
data that I'm going to have, and I swap the test data so that I see secretary and he if my model
gets that wrong, then I'm going to conclude that there's some amount of bias.

</turn>


<turn speaker="Jieyu Zhao" timestamp="12:20">

Yeah. So yeah. So we'll see base results from just from the performers.

</turn>


<turn speaker="Matt Gardner" timestamp="12:25">

Okay. Yep. Okay. I think I've got a handle on this experiment so far. So you said it dropped a
little bit, how much did it drop when you did that?

</turn>


<turn speaker="Jieyu Zhao" timestamp="12:34">

Oh, you mean when we did the anonymize?

</turn>


<turn speaker="Matt Gardner" timestamp="12:37">

So when you, when you test on the gender swap diversion OntoNotes, what's the performance
difference?

</turn>


<turn speaker="Jieyu Zhao" timestamp="12:44">

Oh, so, Oh, we don't have this results on file now but I think the performance is a very similar,
these alternate test dataset. Yeah. So it's not all very good way to detect the bias in co-ref.

</turn>


<turn speaker="Matt Gardner" timestamp="12:59">

But that doesn't, it doesn't that mean that in a practical use, the model isn't actually that
biased? Am I understanding that right?

</turn>


<turn speaker="Jieyu Zhao" timestamp="13:07">

No, I don't think so. It's like the overall performance is good, but it's, the model can perform a
really bad on the minor group, on the female part because we analyze the data set. We found like in
the alternative data set about over 80% told a person entities are male. So, even though a lot of
performance rated bad on the minor group, the overall performance is still good.

</turn>


<turn speaker="Matt Gardner" timestamp="13:34">

But if I've gender swapped them, then now in my swapped version, 80% are female. But I guess you're
saying still the cases where you have an ambiguous decision that would be decided by gender are a
very small part of this data set. So you don't really see a big difference.

</turn>


<turn speaker="Jieyu Zhao" timestamp="13:48">

I guess like in the alternate dataset, they have long sentences, and they have a lot of other
features so the model can use those features to make pretty good predictions.

</turn>


<turn speaker="Matt Gardner" timestamp="14:00">

Okay. Yeah. Cool. And so then what you did next was you created a particular diagnostic dataset to
like isolate some particularly problematic cases and see what happens. So can you tell us about this
data set?

</turn>


<turn speaker="Jieyu Zhao" timestamp="14:15">

Yeah. So this dataset that we created centered around the people entities are referred to by the
occupations. So I'll review you the labor statistics from the U S departmental of labor to associate
forty different occupations where there is a typical gender. So for example, like in this survey 90%
of nurses are women, so we find that the stereotypical gender of the nurse is female. And we then
generate sentences by constructing the sentences like they contain a pair of occupation words with
different stereotypical genders. And that leaves one gender pronoun. So we generate two types of a
sentence. The first type is a pro stereotypical career path sentence for example: The physician
hired a secretary because he was overwhelmed by the clients. So in those sentences, if we want to
make practical co-ref decisions, the model needs some word knowledge.

</turn>


<turn speaker="Jieyu Zhao" timestamp="15:20">

And the second type is like the sentence the physician called the secretary and asked her to cancel
the appointment. So in this type of sentences, that gender pronoun, we always refer to the second
reference according to the grammar rule. So the model can you semantic rules to make predictions.
And for all these sentences we have two version of instances. So we call a pro stereotype version,
which mean that which means that the correct a reference will be refered to by the pronoun of the
stereotypical gender, like the nurse is refered by she. And the other version is called the anti
stereotype version, which means that the reference will be refer to by the opposite gender pronoun
like the nurse will be referred to by he. So if a system is gender neutral, it should achieve
similar results on the pro-stereotypical and anti-stereotypical dataset. And also all of these co-
reference train in those sentences are clear to people. But, and ambiguous to the model. So we want
to know if the model can use different evidence to make predictions. With these two types we want to
see how the model will leverage different signals. For example how their gender bias will influence
the model, especially with type two, they show that even though that grammar rule should be enough
to me that correct. correct predictions, the models still make mistakes due to the gender bias.

</turn>


<turn speaker="Matt Gardner" timestamp="17:01">

Yeah. That's really interesting. I liked how you set up this data set. It seems like you're pitting
three competing influences on the model. One is background knowledge. Like how well you understand
events in the world cause you're connecting two events and saying that the subject of this event a
hiring event happens because someone was overwhelmed and needed some help. So you as, as you said,
you need some background knowledge. They, you're, you're pitting that against grammar rules and
gender bias. And so you're seeing, does the bias overrule I, you could look at either way, like,
does, does the model know enough about background knowledge in order to overcome its gender bias?
Doesn't know enough about grammar to overcome it's gender bias or is the bias too strong and it
overwhelms its knowledge of background knowledge or common sense, whatever you want to call it. And
it's, it's notion of syntax, which is really interesting. And so what did you find when you
evaluated systems on this?

</turn>


<turn speaker="Jieyu Zhao" timestamp="18:04">

Yeah, so we evaluated three different systems. One is a rule based system. One is a feature based
system and a one state of the art end to end deep learning based system. So we found that all the
system show significant gender bias, as we mentioned if a system has been trained it should have
similar performance butl, then we felt like the rule based system is the most biased. The difference
on the affluent score on the pro stereotypical and anti stereotype dataset said the largest around
the 40% difference and the neural network system mad the second bias made that difference around
26%. The feature based system, the last one, is around 10% difference.

</turn>


<turn speaker="Matt Gardner" timestamp="18:53">

So just to be super clear about what, these numbers mean, that you were talking about, you said a
40% difference. So the way you've set this data set up each pronoun that you're trying to resolve
has exactly two possible antecedents. So a random guess here, gives you a 50% chance of getting it
right. So then just to make this like rule the rule based system, to make this clear on the pro
stereotypical dataset, it gets 77 or so percent correct. And on the anti stereotypical dataset, it
gets 37% correct. It does much worse than random guessing because you've set it up such that when it
relies on its biases it gets it wrong. Yeah. Interesting. So yeah, so there's difference than 77
versus 37 is about a 40% difference. So which means very clearly this, this model doesn't rely on
grammar or common sense.

</turn>


<turn speaker="Matt Gardner" timestamp="19:51">

It relies on it's gender bias to make decisions and in difficult cases, that's a pretty nice
demonstration. What I was particularly surprised because you would think a rural based system would
use a syntax tree to figure out the hard syntax constraints on matrix verbs. Right? So you would,
you would think it would be able to figure out that this sub clause has to share or can't share it
subject with the main clause. But it doesn't figure that out. Like it's, the worst bias system in
this type two setting. That seems really weird to me.

</turn>


<turn speaker="Jieyu Zhao" timestamp="20:31">

Yeah. So we also think all the models should have, because the grammar rules came, can provide
enough hint for the model to make predictions, but we found that all the modles is confused by like
gender hint, so it just, ignored all the grammar rules. So the model performed really bad, also
fount that it preformed really bad on type two dataset.

</turn>


<turn speaker="Matt Gardner" timestamp="20:57">

Yeah. I'm just surprised. I remember like reading the papers that came out for some of these
handwritten systems and I thought they would have taken into account this syntax rule first, but
maybe I'm remembering the sequence of sieves wrong like in the, in the rule based system or maybe
it's a different paper that I'm remembering that you evaluated but yeah. Anyway, I just, I just
found this a surprising result that the rule based system did so poorly on the syntax constraint. I
thought it would have done better.

</turn>


<turn speaker="Jieyu Zhao" timestamp="21:25">

Yeah. We also found this problem but yeah. We didn't do much deep dive into this direction. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="21:33">

Okay. So I guess to summarize that part then you created a new dataset that tried to balance these
three different or tried to diagnose which of these three factors the model used the most. You found
that overwhelmingly they're using their gender bias instead of relying on common sense or syntax.
And so then you introduced a method to fix the gender bias or make it less of an issue. You want to
tell us about how you did that?

</turn>


<turn speaker="Jieyu Zhao" timestamp="22:02">

Yeah. So there can be bias in the co-reference system. In our work we found that the bias can come
from the data set it's trained on some external resources they use. For the data set a bias we
created an anti bias, version with a data set. Like we said, just swapping all the gender pronouns
with opposite gender and as well as other words ways gender hints and then we then trained the model
on the union, of the original training data set and this anti biased data set. By doing this we can
reduce a significant amount of bias from all the systems and for the external resources, we tried to
neutralize them before using them for example, the deep learning based model used word embeddings
and then we conducted the post-processing method proposal by Tolga Bolukbasi and his colleagues,
2016 to reduce the bias in the word embedding and also we also combined these two method and try to
reduce the bias in our system.

</turn>


<turn speaker="Matt Gardner" timestamp="23:14">

And just to give some numbers to how well this worked, looks like you went from about a 26%
difference in the state of the art neural system to not statistically different.

</turn>


<turn speaker="Jieyu Zhao" timestamp="23:25">

Yeah. So yeah, so like we reduced the difference from 26 to 1% for the neural based system and also
for the feature based. So we reduce difference from 11 to 2% and we did a statistical analysis and
improve that. The difference after our model is no longer significant.

</turn>


<turn speaker="Matt Gardner" timestamp="23:45">

Yeah. That, that's a nice success result.

</turn>


<turn speaker="Jieyu Zhao" timestamp="23:50">

Thank you,

</turn>


<turn speaker="Matt Gardner" timestamp="23:50">

Cool. so just to wrap up this discussion, I think it's really interesting so we've talked just now
about how you can find bias in co-reference systems. You had a paper last year about finding similar
bias and language and vision kinds of datasets. How, pervasive is this problem across NLP do you
think?

</turn>


<turn speaker="Jieyu Zhao" timestamp="24:15">

Yeah, so we have evidence to show like several other NLP tasks are bias. For example the machine
translation task. For example, we want to translate Turkish to English and Turkish is a gender
neutral language. It will have the same pronoun for the male and the female. So if you translate a
sentence say the doctor in the sentence the model will translate the pronoun to he, but translate
the gender pronoun related to babysitter to she. So we show also kind of a gender bias. So if thing
and all of the other thing, there's another paper talking about gender bias in SNL dataset but, I
don't remember clearly the title of the paper. So things like the gender biases widely exist in the
NLP tasks.

</turn>


<turn speaker="Matt Gardner" timestamp="25:10">

Do you think there are general methods that can solve it once for all of these problems or do we
always have to think about this every time we build a model on some new system.

</turn>


<turn speaker="Jieyu Zhao" timestamp="25:20">

Yeah. So like we said, there could be different ways for a model to get biase maybe from the data
set or from the resources files or maybe from the model itself. So like the method we proposed
previously, like the data augmentation or the bias mitigated word embeddings, they canwork as a
generic way to reduce the bias, but also like the model itself, the bias from the model itself, we
maybe need some specific ways for those different models. So we could have some generic method but
for different models we will still need some specific ways to reduce the bias.

</turn>


<turn speaker="Matt Gardner" timestamp="26:02">

Well, great. Thanks. It was really, really nice talking to you Jieyu, you've done some really
important work. We really need to be careful about systems that we build and you've done a great job
highlighting problems, so thanks for your work.

</turn>


<turn speaker="Jieyu Zhao" timestamp="26:16">

Yeah, thank you.

</turn>


<turn speaker="Matt Gardner" timestamp="26:17">

It was nice talking to you. See ya.

</turn>


<turn speaker="Jieyu Zhao" timestamp="26:18">

Yea, see you.

</turn>
