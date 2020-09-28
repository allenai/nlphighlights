---
title: "Question Generation, with Sudha Rao"
hosts: ["Matt Gardner","Pradeep Dasigi"]
guests: ["Sudha Rao"]
number: "105"
tags: []
description: "In this episode we invite Sudha Rao to talk about question generation. We talk about different settings where you might want to generate questions: for human testing scenarios (rare), for data augmentation (has been done a bunch for SQuAD-like tasks), for detecting missing information / asking clarification questions, for dialog uses, and others. After giving an overview of the general area, we talk about the specifics of some of Sudha's work, including her ACL 2018 best paper on ranking clarification questions using EVPI. We conclude with a discussion of evaluating question generation, which is a hard problem, and what the exciting open questions there are in this research area. Sudha's website: https://raosudha.weebly.com/"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F758410174&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner, Waleed Ammar and Pradeep Dasigi.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:08">

Hello everyone. Today for this episode we are going to talk about question generation and we have as
our guest today, Sudha Rao from Microsoft research where she's a senior researcher. She also wrote a
thesis on generating clarification questions. Welcome to the program Sudha.

</turn>


<turn speaker="Sudha Rao" timestamp="00:22">

Thank you. Thanks for inviting me.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="00:24">

As I mentioned, we wanted to chat about question generation today. There's been a lot of work in
answering questions and building systems for answering questions for various reasons, various
purposes, but there's also been a lot of work in question generation. Why do we want to generate
questions Sudha? Can you give us a brief overview of this field?

</turn>


<turn speaker="Sudha Rao" timestamp="00:42">

Sure. The area of question generation sort of started flourishing around 2010 where people were
looking at automated methods to generate questions to assist reading comprehension style question
generation. There are a lot of educational institutions that would require given a paragraph, a
question that has an answer in the given paragraph just to assess a reader's understanding of the
paragraph. So mainly like students in sat exams, et cetera, where you're seeing if a student can
understand the paragraphs. So you want to automate this process of generating a question given a
paragraph that's one of the key motivations for this task. And around 2010 there was this workshop
on question generation where the task was given a sentence or a paragraph and an answer span in the
paragraph generate a question that is answered by the span. So there've been several works from that
point where people mainly use rule-based method.

</turn>


<turn speaker="Sudha Rao" timestamp="01:40">

So, given a sentence like John loved Ann, generate a question, like who loved Anne or who did John
love and so on. So based on the answer, that you want to generate a question, and later on in 2017
there were these neural network models, for text generation, there were a lot of works on trying to
generate question using these neural network model, like the Seq2Seq models and so on. Then again,
given some context and an answer span, you want to generate a question of some sort. So that's
predominantly the area of question generation as such and apparently, there've been some other works
also going on that does not obey this exact definition of given an answer span, ask a question, but
more open endedly ask the kinds of questions that humans would ask in say dialogue setting or when
you're given some sort of a context. Do you want to ask questions about missing information or if
you're given an image you want to ask some natural questions about the image and so on. So that's
the other sort of work on question generation.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="02:43">

Yes. Right. So fundamentally there seems to be a distinction in the two kinds of question generation
research directions. There is some work which looks at question generation as an end in itself
versus this other line of work which generates questions as a means to achieving something else. Can
you tell us more about that distinction?

</turn>


<turn speaker="Sudha Rao" timestamp="03:01">

Right. The first style is the kind of work that I just spoke where you are trying to look at, "can I
automate this process of generating questions given paragraphs," or "can I look at how good the
generation models are at generating questions to evaluating language model for question initiation
and so on. The other is looking at can the question generation task heads something else. So instead
of there being two works. One is trying to increase the amount of data question answering task that
has been done quite a lot. Where what they tried to look at is can I generate questions given
paragraph using automated methods and then use these question-answer pairs to augment the dataset
that we will use for the task of question answering. So that's been one work and they've been
several works on those lines and they have observed improvements in the question answering task by
augmenting the data in this fashion.

</turn>


<turn speaker="Sudha Rao" timestamp="03:57">

And on the flip side they've also seen improvements in the question generation models by using this
question answering as a reward for improving the question generation task in itself. So that's the
one line of work. And the other is the summarization task where what the particular paper does is
use the question generation in a multitask setup while they are doing summarization. The intuition
there is the question generation will ask questions about salient information in a given document
and that fact can help the model to understand what are the salient information that I need to
generate somebody about? They did this, the two sided task, question generation and the other one
was entailment. They had a model that tried to do all three tasks simultaneously in a multitask
setup. The summarization, the entailment and the question generation and with learning to do all
three things together, what they showed that each of the individual tasks are improved.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="05:00">

I see. When you are trying to generate questions as a way of evaluating natural language,
understanding capabilities and systems, what exactly is the task that's being solved? So for
example, if you are generating questions just given answers, it can be thought of as conditional
text generation as you mentioned earlier. Right. Are there any other semantic tasks that are being
evaluated or semantic capabilities that are being evaluated there other than conditional next
generation?

</turn>


<turn speaker="Sudha Rao" timestamp="05:24">

Yeah, so the clarification question generation work that I have been sort of involved in that it's
not necessarily just looking at, can I ask a question about something that's already there in the
given context, but given a particular context, can I ask a question about something that's missing
in the context? So for example, if I'm listening to a talk, I would ask a question about something
they haven't understood just because the speaker hasn't given me enough information or enough
context to understand what the talk is and so on. So as humans tend to ask those sorts of questions
more in a natural scenario. So in the work that I've been involved in, what we looked at was given
some textual context, can a model generate a question that points at missing information in a given
context?

</turn>


<turn speaker="Pradeep Dasigi" timestamp="06:13">

Okay. So what you're saying is that the task set up here is that you just have some context and
you're generating questions for it. You don't have an answer in mind.

</turn>


<turn speaker="Sudha Rao" timestamp="06:21">

Right, exactly.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="06:23">

Does it mean that this is necessarily a harder task than generating questions when you have answewrs
in mind because you need to have a comprehensive understanding of what's actually given in the
context. Right. To figure out what's missing.

</turn>


<turn speaker="Sudha Rao" timestamp="06:34">

Right, exactly. It's a bit difficult because you need to have more of a global view of things,
right? So to understand what is a missing information in the human context as humans, what we would
do is we would think of previous contexts, like other contexts that we have experienced over time
where that information was present and when we compare it with the current context that I have, I
see that that information is missing and that's why I know that that's important and I want to ask
about it. The former approach, where you have an answer span. It's all about you know, how you ask
the question and you use a little bit of the context in the paragraph to understand what to ask,
right? But whereas in the missing information question generation scenario, the knowledge that you
wouldn't need to have is more global. And that's why I think it makes it a bit harder task. And also
it becomes difficult. Like you don't even know what's the right question. There could be multiple
good questions that you could ask and you have an answer to span. You can evaluate it a little bit
easier because you know that the generated question should be answered by the answer span. So it's a
bit more defined whereas in the missing information scenario, it's less defined because there are
several good questions that you could ask.

</turn>


<turn speaker="Matt Gardner" timestamp="07:42">

I think it'd be helpful here to give some concrete examples to nail down what we're talking about
when we talk about given an answer generated question. A lot of the times people think of SQuAD as
you've been talking about in so far in this discussion. So what's going on there is you take a
sentence for a paragraph, you replace part of it with a WH word and it's relatively easy to model
that. Maybe you do some slight paraphrasing. And that's, that's basically the question generation
tasks that people have done. It's also very related to the QASRL work that we've talked about on
this podcast previously, but I can imagine lots of other scenarios where I have a paragraph and an
answer and generating a question is much more complex. So for example, take drop, which is a dataset
that has summaries of American football games, and I might have an answer that is two and two might
show up in a few places in the paragraph.

</turn>


<turn speaker="Matt Gardner" timestamp="08:33">

It might show up nowhere in the paragraph, but there are questions that I can ask where the answer
is two and maybe the question I had in mind was what's the difference between this person's longest
and shortest field goals or how many times did the person do X? I don't feel like it's really as
constrained. Even given an answer as you were talking about earlier, it's just when we have in mind
the SQuAD problem, which is it turns out a relatively simple predicate argument structure problem
that the question generation task is actually this simple. Does this make sense?

</turn>


<turn speaker="Sudha Rao" timestamp="09:05">

Yeah. I think that's a very good point. You're right that most of the time when people think of
question they think of SQuAD, but the scenario that you just pointed out makes it much [more]
complicated because you have an explicit answer and there could be multiple occurrences of those
answers. In that case, if there are multiple occurrences of that particular answer, you could still
use the SQuAD like models, but trying to generate questions for all of these occurrences. That could
be one way of looking at it. But if the answer is something that's not explicitly there in the
context at all, if it's a more abstract answer and you're trying to generate a question, then again
it becomes more difficult.

</turn>


<turn speaker="Matt Gardner" timestamp="09:41">

Can you give a concrete example or two of what you mean by that?

</turn>


<turn speaker="Sudha Rao" timestamp="09:45">

So in the missing information scenario that we looked at, one of the datasets was an Amazon were
given a product description. I want to ask a question about something that's missing in there. So
for example, if somebody, if the product is a kitchen cookware set, then somebody could ask what are
the handles made up of? Right? That could be some information that someone needs in order to decide
whether they want to buy the product or not. So in that case, you would ask a question like what are
the handles made up of? And there will be some answer associated with that. So this is naturally
available on Amazon websites. So if you've seen those websites that are these product descriptions
and there are these FAQ is that people tend to ask over these descriptions, right? So what we did in
one of our work is use this data to have triples of some context, a question and an answer, and then
try to see given a new context, can the model generate a useful clarification question?

</turn>


<turn speaker="Sudha Rao" timestamp="10:42">

So that's one concrete example. The other that we looked at was from stock exchange forums. Where
what we observed is a lot of times when people write a post about some issue that they are facing
with, say, installing a software, et cetera. A lot of times if the original post is unclear, it goes
unanswered for a long time. So in those cases what happens is others come and ask a clarification
question in the comment section of the post and the author of the post then goes back and edits the
posts, adding that missing information, right? So if they forgot to mention what version of Ubuntu
they have, then somebody would ask what version of Ubuntu are you using? And then they would go and
update that post. So again, we used this edit history information to create a dataset where there is
some context, which is the original post that somebody had written.

</turn>


<turn speaker="Sudha Rao" timestamp="11:33">

And then there is this clarification questions that get asked in the comment section. And then there
is an answer, which is this edit that somebody has made to the post. Now given this dataset, what we
looked at this can a model try to generate such a useful question given a new post on stock exchange
or other sort question answering forums. So those are the two scenarios that we looked at. And
beyond that. I think there's other scenarios also like if there is a recipe on a website, then
people tend to ask some clarification questions, right? At what temperature should I bake it? Or
what is the type of oil that you're using of something. So there is a lot of sorts of such
clarification questions out there and the work that I'm interested in is trying to look at can we
have models that can generate such a clarification questions.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="12:23">

Another interesting aspect which you hinted at about the difference between the two kinds of
question generation is that not only is the answer not provided to the model during training time,
but also it seems like the target generated questions are actually questions written by humans who
do not know the answer. Right. So it's seems like we're focusing on a different distribution of
questions altogether.

</turn>


<turn speaker="Sudha Rao" timestamp="12:44">

Yeah, that's a good point. I did not think of it that way, but you're right. I mean as somebody
who's asking the question doesn't know the answer here. So in theory, sort of look at the possible
answers that you could generate and then use that information to see if this is a good question or
not. Then the model is trying to think of what is a good question.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="13:02">

Right. Okay. Let's talk about how we would train these models and what kinds of learning algorithms
we would use. So for the case where we had the answers available to us and we're generating
questions, we'd gendered those answers. It seems like many people have used simple Seq2Seq models.
Right. Can you give us more details on how you would go about it?

</turn>


<turn speaker="Sudha Rao" timestamp="13:22">

Sure. One of the first works that did this, what they did is they used the context and the question
as source and target and used the Seq2Seq models that have been predominantly used for machine
translation like tasks to try to see given a lot of context question pairs. Can I train a model to
just optimize the maximum likelihood, a training kind of model to see given a new context. Can I
generate a question? So that was one of the first works and then what the subsequent works try to do
is this work didn't specifically make use of the answer span information so the subsequent works
tried to incorporate that in some way. They said that, okay this is the answer span in the context
and try to pay attention to that more when you're trying to generate the question because you want
to generate a question for that particular answer span.

</turn>


<turn speaker="Sudha Rao" timestamp="14:09">

So there were these answer focused question generation models that use the attention based
mechanisms to do that. They also used pointer generation models where you are trying to point at
certain words in the source when you're trying to generate the target sequence. Also a copying
mechanism that's sort of similar. On top of that there was subsequent works that used more other
word feature based models named entity recognizers and cor-reference resolutions on top of these
basic word embeddings to try to see if that helps and the motivation of doing that was often times
when, for example, you're trying to generate a question. The WH word becomes really important,
right: what, which why, and this can be identify using NER information for example. So if it's a
person, if it's a location and so on. So these NER embeddings helped them to identify the question
type better.

</turn>


<turn speaker="Sudha Rao" timestamp="15:04">

The co-reference resolution was helpful when there was mention of pronouns and there was actual
mention of that pronoun in the entity referred to by the pronoun in an earlier section of the
paragraph. Right? So doing an explicit co-reference doesn't really help them generate more specific
questions to that answer span. So there've been several work that's sort of built on top of the
Seq2Seq model. There's other work which tries to first identify the question type and then generate
the question. So they explicitly focus on the answer span and generate the question type first and
then use this question type into the second model that actually generated the question. And so there
they looked at how can you use this question type information explicitly to generate better
questions. So there've been several works on top of the basic Seq2Seg models.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="15:54">

So to summarize that, would it be fair to say that these are essentially Seq2Seq cross entropy kind
of losses, which are augmented using the aditional information coming from say a co-reference model
or an entity type identification model or something? Right.

</turn>


<turn speaker="Sudha Rao" timestamp="16:08">

Right.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="16:08">

And for your work in generating clarification questions, given that it's essentially a different
learning problem, what kinds of learning algorithms did you use?

</turn>


<turn speaker="Sudha Rao" timestamp="16:16">

Actually in the previous work that uses reinforcement learning style reward approach where they use
this question answer-board as a way to guide a better question generation model. So it is not just
MLE but they use other sorts of reward to try to optimize their learning algorithm. So there's been
work beyond supervised learning in the question generation world and now coming to the work that I
have done on clarification questions. In the first work, what we did is we looked at the model that
tried to rank a set of questions. So the task was given a context and given some candidate questions
rank these questions in the order of usefulness to the given context. So it was basically a ranking
task instead of actual question generation tasks. So for that what we did is given a context, we
first had to retrieve these set of candidate questions.

</turn>


<turn speaker="Sudha Rao" timestamp="17:10">

So for that what we used is a retrieval model, which the high level idea that is given a context, I
will look for other contexts in my training data that are very similar to the given context I look
at the question that was paired with those contexts and those questions become my candidate
questions and then I'm going to have a model that tries to rank these candidate questions by their
relevance or sort of usefulness to the given post and to actually do that sort of ranking, we used a
neural network model where the loss function was inspired by this decision theoretic network called
expected value of perfect information. So a little bit on that. What EVPI or expected value of
perfect information tries to give us is, given a scenario and given that I can have multiple
possible actions that I could take, what I'm going to look at is for each of the actions that I
could take.

</turn>


<turn speaker="Sudha Rao" timestamp="18:07">

What are the answers that I could get? So in my case, given a context and given a question that I
could ask on this context, I'm going to look at what answers I would get and by looking at what
would be the utility of adding those answers to the given context, I'm going to define whether this
is a good question or not. By sort of looking at what answers it could generate and whether adding
that answer to my given context increases the information of that particular context that I have. So
that's the idea, which I think you were also mentioning before where you want as a human, I don't
know what answer I will get. So I will think of possible answers that I could get for this question
and that would allow me to decide if this is a good question or not. So that was the framework that
we use in order to rank a set of candidate questions that we had.

</turn>


<turn speaker="Sudha Rao" timestamp="19:01">

So that was the first model. The second paper that we worked on was actually trying to generate the
set a clarification question given a context. So for this as well, we use the whole EVPI idea or the
utility of the answer idea where what we did is given a context, we first trained a basic Seq2Seq
model that would generate a question given a context and then what we did is given this question and
the context, we had a second Seq2Seq model that generated the answer to the particular question and
then we looked at given the context that we had and this answer, whether adding this answer to the
original context increases the utility of the given context. If it does, then I will say that this
is a good question, so we also frame the learning in similar way, but now using Seq2Seq models.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="19:54">

Can you tell us again how exactly you measured the utility here?

</turn>


<turn speaker="Sudha Rao" timestamp="19:57">

Sure. The utility was in both cases, a neural network model. Again, where it was trained for a
binary classification task. Where the training data was, given a context and given the true question
that was paired with the context, I would label them as positive and I will randomly sample other
questions in my training data and label them negative and the neural network model. Given this
samples of positive and negative context question pairs would learn a model that would give me a
value between zero and one given a new context question pair, so that would be the utility model
which we'll take in the context question and also the answer. Sorry, I forgot to mention about that.
So it takes in the context question and answer and tries to tell me if this is a good question
answer pair for this context or not.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="20:47">

So, how is this any better than simply training a binary classifier.

</turn>


<turn speaker="Sudha Rao" timestamp="20:50">

It is a binary classifier, so it's a feedforward neural network, which is a binary classifier giving
me a value between zero and one. The only difference is I would use this information to guide my
question generation model if that is what you were asking?

</turn>


<turn speaker="Pradeep Dasigi" timestamp="21:04">

Right. How is this capturing the semantic nuances or whether it could capture the semantic nuances
of the information contained in a question, right? I mean if you're just training a binary
classifier on whether this pair of context or this triplet of context question and answer is a
triplet or not. And how would you even think about whether the information contained in the question
is useful or not?

</turn>


<turn speaker="Sudha Rao" timestamp="21:25">

Right. So I think the motivation was from this, the stock exchange dataset that we had where you
know, somebody edited the post to add that missing information, right? So you would say in that
case, what happened is given the original context and this added information, this post became more
complete or more clear than it was before. So that's the intuition that makes that particular answer
a good answer to the given context. Now for the bad answers, we could do better than just randomly
sampling, but that's what we did because we didn't have any other source of what are the other
questions that we could ask? But you're right, we could definitely do better than just try to have
positive and negative labels. So one thing that we did try to do is look at whether a question asked
eventually led to the resolution of the post because that would be the true definition of whether
this is a good question and the answer increase the value of the original post or not. Right?
Because if the question led to a resolution of the post, you knew that this was a good question that
was asked. So we tried to do that but then we had very little labels at that level of whether this
question or this post was resolved or not, so we couldn't use that, but there is at a high level, I
think what I'm trying to say is there could be other ways of modeling this utility better.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="22:46">

Yeah. I think it's great that you looked at real data and tried to build a system which could
actually work on real, noisy data, but then there are these limitations of this direction. The
clarification question that you actually see in the data is also dependent on what the answer knows.
Right? There is a lot of this user specific knowledge that cannot be modeled or is completely
missing here. Right. We can't really do anything about it. Correct.

</turn>


<turn speaker="Sudha Rao" timestamp="23:12">

Yeah, that's definitely true. Like there are so many different people who ask questions. So in the
stocks exchange scenario we did try to use some sort of features of the users to say whether this
was a question from an expert user or a non-expert user. Again, we couldn't get enough like it
reduced our data set too much. If you were to restrict to only those posts, where a set of user
attribute was available, but you could in theory try to use these kinds of attributes of the user to
try to categorize them into expert questions or novice questions and so on. Even on Amazon there are
people who have been answering questions for a long time who have been asking questions for a long
time and they would sort of ask more specific questions or targeted questions as opposed to other
users. So there are some user attributes that you could account for in the modeling.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="24:05">

Okay. Now going to the second paper you mentioned actually use the generated questions, right? So
can you tell us a bit more about generative model itself there?

</turn>


<turn speaker="Sudha Rao" timestamp="24:14">

Sure. So as I said, that idea was using Seq2Seq models at a lower level to generate the question
given a context. And we also had an answer generator which would generate an answer given a context
and a question. Both these were Seq2Seq models, train using MLE objective function. And now once you
have the answer, the next part would be to understand whether this answer increases the utility of
the original post or not. So for that, what we did is used reinforcement learning approach where we
considered this utility as a reward. And the utility module was trained offline. So you can imagine
there was a binary classifier using feedforward neural network. That just gives me a value between
zero and one given a context question and answer. Right? So it was trained offline and you use this
as a reward function to fine tune the original question generator that you had using reinforcement
learning approach.

</turn>


<turn speaker="Sudha Rao" timestamp="25:13">

More specifically, we used the mixer model from Facebook where the idea was instead of moving to RL
directly, you eventually move to RL from like supervised learning. So for initial epochs you would
do supervised learning for say T minus two steps and only for the last two steps you would do
reinforcement learning. So where the T is the length of your target sequence and over epochs you
would do more of your reinforcement learning in your time steps and less of supervised learning and
so on. So that was the mixer model that we use and that's how we trained to optimize this utility
function as a reward. And as a followup, what we did is instead of keeping this utility function
constant or having just an offline model, what we tried to do is look at can we also train that
utility function along with the training of the question generator model.

</turn>


<turn speaker="Sudha Rao" timestamp="26:12">

And to do that we used a generative adversarial network model where we considered the question
generator to be a generator and the utility calculator or the utility function to be our
discriminator. And the high level idea there was, okay you have a generator that will generate a
question and to be able to say whether this is a good question or not, I will have a discriminator
which knows there are some real questions and there are some model generated questions and it will
try to distinguish between the two. So it's like a game between the generator discriminator where
the generator tries to fool the discriminator by trying to generate more real like questions in our
case. And the discriminator is trying to distinguish correctly between real questions and the model
generated questions. So we use this GAN approach to model the utility function into generation.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="27:04">

Just to clarify, is the onset generator conditioned on the gender question?

</turn>


<turn speaker="Sudha Rao" timestamp="27:08">

Yes, it is conditioned on the generated question. Yeah. We never looked at the true answer. We used
the true answers only for pre-training, our answer generator. But when we move to the fine tuning
using GAN models, we always looked at generated answers.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="27:25">

I see. Okay. So let's talk about evaluation. We are actually generating things here and generator
models evaluation is generally tricky. So how did you evaluate these gendered questions and answers?

</turn>


<turn speaker="Sudha Rao" timestamp="27:35">

Sure. For the SQuAD, like question generation, since it's a generation model, predominantly the
metrics people use is like BLEU, METEOR from the machine translation world. So that's the one kind
of automatic metric that we used where you have a predicted sequence and you have multiple
references and you're trying to see if it's a good match between these multiple references. So
that's one metric that used automatic metric. And the other we looked at was diversity, which is
sort of important in our case. And also in SQuAD question generation, I would say. What happens if
you use these MLE models, they tend to generate questions very often. So in the Amazon scenario we
often saw these MLE models generate questions like, Oh, what are the dimensions? Is this product
from China? And so on because it's trying to optimize for the maximum likelihood estimation.

</turn>


<turn speaker="Sudha Rao" timestamp="28:24">

So that kind of issue is observed when you use Seq2Seq models using just the Emily's supervised
learning objectives. So diversity, what it tries to measure is how diverse is your generated
question. So it looks at trigram diversity, bigram diversity and so on. So number of unique trigram
bigrams you get in your sort of output over the entire test set, right? So that's trying to look at
how diverse are a set of questions. So those are the three automatic metrics that we used. And I
would say in our case, we found the human-based evaluation to be more useful than these automatic
metrics. More so because unlike the SQuAD question generation where you know, you're trying to
generate a question for a particular answer span. So the set of questions is limited. It's more
about how you frame the question, right? It's all about trying to ask for a particular thing.

</turn>


<turn speaker="Sudha Rao" timestamp="29:18">

Whereas in our scenario where we are trying to ask questions for missing information there could be
multiple good questions. So it's hard to evaluate the model just based on a few set of references
that you have, right? So that's why we found human based evaluation to be more useful. That what we
did is given a context and a generated question, we asked people to rate these generated questions
on different criteria. There were five criteria that we used. One was fluency, which looked at how
fluent the generated questions are. The second was relevancy, whether it's relevant to the given
context. The third was whether it's seeking new information. This is important because oftentimes we
observe that the generated questions ask for something that's already present in the context. This
makes it relevant, makes it fluent but not useful. Right? So that's why we explicitly asked whether
it's asking for new information. The fourth thing that we looked at was whether the questions are
specific to the context or generic right. To look at whether it's generated a question like what are
the dimensions?

</turn>


<turn speaker="Sudha Rao" timestamp="30:23">

That is sort of a good question for almost any product. I said the most products. So that's why you
want to look at if it's asking something specific. So "What are the handles made up of?" Would mean
that this can be asked for only kitchen appliances and so on. Right? So we asked them to read for
that. And final question was usefulness. So how useful would this question to be a potential buyer?
Would this question help somebody who's trying to decide whether to buy this product or not? So we
evaluated the generated questions for these nuances and what we found that doing this kind of
evaluation helps us distinguish generated questions better in terms of their quality.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="31:05">

Good, and according to these metrics how good were your systems doing?

</turn>


<turn speaker="Sudha Rao" timestamp="31:07">

What we found is for fluency and relevancy, most of our models were similar to the baseline models
that we looked. So the baselines in our case with some retrieval models and some generation models
using supervised learning and so on.

</turn>


<turn speaker="Sudha Rao" timestamp="31:21">

We found that all these models fair sort of equally when it comes to relevancy and fluency when it
comes to seeking new information, they actually found the retrieval models to be the best because
they are very diverse. They are asking for like new things because you're trying to retrieve from a
set of questions in terms of usefulness and specificity, we found our proposed model to be
outperforming all the baselines where we found our models to be asking questions that are more
specific that are useful to a potential buyer and so on. So I guess this idea of trying to look at
what answers you would generate and corporate that to guide your generation helps in this
specificity and usefulness criteria,

</turn>


<turn speaker="Matt Gardner" timestamp="32:03">

And how well did the reference questions do?

</turn>


<turn speaker="Sudha Rao" timestamp="32:06">

The reference questions were much better in compared to any of our models. For example, if the score
was between one to five the reference questions were more like 4.5 and so on when it comes to
specificity, whereas our models where the 3.8 and 3.7 but one thing that we observed is the
reference questions were not as good when it comes to usefulness because what happened is the
reference questions often times were specific to the user, so they would ask whether this product
would be shipped to this pin code or whether this would fit in this area of my kitchen space. Right.
People tend to ask a lot of questions that are specific to themselves. Now the specificity here is
not with respect to the context, but with respect to the user and that becomes less useful in
general to the rest of the community. I would say.

</turn>


<turn speaker="Matt Gardner" timestamp="32:59">

I guess that highlights what to me is the ill posed nature of this problem. Like if I'm trying to
model what a person would ask about a product, I need to know information about specific users.

</turn>


<turn speaker="Sudha Rao" timestamp="33:12">

Right?

</turn>


<turn speaker="Matt Gardner" timestamp="33:12">

It's hard to wrap your head around like what's the right thing to do here is is this a good metric
or not because you're right. If what I want to do is improve my product description then I want
something that's going to be generally useful to a bunch of people who see the description. But if
what I want to do is help individual users get what they need out of it, that's kind of at odds.
There are definitely people who need very specific information and so like how do you model this
variance? It's hard.

</turn>


<turn speaker="Sudha Rao" timestamp="33:38">

Your absolutely right, and that's one of the criticisms I got in my thesis work, etc. , There is no
end goal. We need to define what the end goal is. So in the stock exchange scenario, we said that
the end goal was exactly what you said. If somebody is writing a post and a scenario, we imagine
this as somebody writing the post, you can imagine there is this interface that pops these questions
in the side that lets you write a more complete post. So that was one of the goals that we had in
mind. Again, this sort of missing information that you would required depends on the user. For some
user, for an expert user, maybe some information is not necessary. For newbies, certain other
information is more necessary. So if we could model the user goal also when we are trying to
generate a question, this could be super useful. I would say. So that's what we don't do at this
point.

</turn>


<turn speaker="Matt Gardner" timestamp="34:32">

Yeah, I agree that when I saw that end goal description in your paper, I was like, yes, that's
something I can definitely buy into. It seems like it would be really helpful, but on the other hand
it's also seems very, very hard. I manage a lot of issues on GitHub in Allen NLP and some of them
are like, I don't need more information than what they're telling me because their issue is of a
particular type and I don't need their operating system or their system environment or whatever. And
other issues are very much dependent on their execution environment or whatever. And so like you
need more detail, but how do you know the difference? How do you get a machine to know that
difference? Like to suggest what things will be necessary. It seems really, really hard.

</turn>


<turn speaker="Sudha Rao" timestamp="35:13">

Yeah, really hard. Unless the machine has additional information about the involvement of the users.
Say it's more difficult in the scenario that you explained. But maybe you're writing a word document
and you need help with something. Right? So the word document involvement already knows what you're
trying to write, what you're trying to achieve. And there maybe it's easier to model what is the
user goal because you have some sort of goal of this is the document that somebody is trying to
finish or edit and so on. So if we could get some sort of user involvement information and if you
could have a way of modeling it, then you could incorporate this user goal.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="35:51">

Okay. Yeah. Going back to some of the empirical observations you made, comparing your proposed
approach to baselines, what do you think are the next steps at a high level in terms of building
better models for say, generating clarification questions for the datasets that you looked at?

</turn>


<turn speaker="Sudha Rao" timestamp="36:07">

Right. I guess one of the things that I've been trying to think about is this modeling the user end
goal in some way. You know, having a scenario where you know what the end goal is. So one of the
data that I'm looking at is the recipes that you have some sort of an end goal of completing this
dish or you know, making this dish. So you know, what is the end goal? You know, you have a recipe
and you're trying to replicate or you know you're trying to make this dish by following these steps
and say from somewhere you have a user attribute of some sort. You know they are vegetarians, they
like these vegetables more or the use these kinds of oils often and all. Then can you use that, use
that attribute in some way to generate a more user specific question of some sort.

</turn>


<turn speaker="Sudha Rao" timestamp="36:55">

So that's one thing that I've been thinking about. The other is the work that we did recently was
controlling the level of specificity of the generated questions. So what we looked at is can we have
a model where given a context and given a level of specificity. So I save it that I want the generic
question, not a specific question. Can a model generate question at that level of specificity. So
this could be vaguely useful in the sense of when you are saying the product description scenario,
when you have just started writing a product description, you want more generative questions, you
want more high level questions. Whereas you are towards the finishing ends of your product
description, you would want a more specific question. So sort of motivated by that fact we looked at
can we control the level of specificity.

</turn>


<turn speaker="Sudha Rao" timestamp="37:43">

So that's one that we looked at. The other work that we have been doing right now is sort of
interesting application of question generation. So the hypothesis there that we're trying to test
is, can missing information help identify misinformation. So there's a lot of work on identifying
whether some news article is fake or real. So there's this need of trying to identify misinformation
out there, right? So what we want to test for is if an article is missing some important
information, whether that signals, that this could be misinformation. And the reason for doing this
is what we observed is. Oftentimes these fake news articles that try to be ambiguous because they
want to slip through the fact checking, right? So if they explicitly add some information, the fact
checking systems can sort of identify and say this is incorrect and so on. But if they try to be
ambiguous, then there is less danger of, you know, being caught by the fact checking system.

</turn>


<turn speaker="Sudha Rao" timestamp="38:46">

So they tried to be very ambiguous. So they would say a reporter said something, a judge said
something, never mentioning the source of the report and never mentioning where the judge is from.
So what we looked at is given news articles can be automatically generate questions that pointed
some missing information in the article and the hope is now for a reader if along with the article,
if I show some of these questions then the reader can make a decision for themselves whether they
want to fully trust this article or not based on these are the information that could be missing in
the given article.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="39:20">

That sounds more like identification of missing information problem. I mean you don't really have to
generate questions for it, correct?

</turn>


<turn speaker="Sudha Rao" timestamp="39:26">

Sure. You don't have to, but question is just a way of phrasing the missing information and I think
in generally I'm sort of interested in looking for missing information. I feel that question
generation is just a way of sort of asking for that missing information. The task of actually
phrasing a question I believe is not a difficult task. What is more difficult is knowing what to ask
about and that's the missing information. The setting. Yeah.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="39:52">

Great. One more question I had about your evaluation setup was that you used human evaluation for
figuring out whether the generated question is useful or not, whether it's informative or whether
it's asking for the right information or not, can even think about automating that process at all.

</turn>


<turn speaker="Sudha Rao" timestamp="40:07">

It's challenging. I've been trying to think of ways to do that but I don't have a concrete answer
for the SQuAD like scenario. I've seen people use other tasks as a way of guiding or evaluating like
this is a good question if it can be answered well by this question answering model, right. That's
the kind of evaluation framework that people have been trying to look at, but in the missing
information scenario it's even more difficult. I think as Matt was saying, you have to know what the
end goal of the user is to understand whether it's a good question or not. So for now I think we
will have to rely on human evaluation for most part.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="40:46">

And did you think it was a problem? Was human evaluation fairly doable?

</turn>


<turn speaker="Sudha Rao" timestamp="40:50">

It's definitely hard. We had to annotate every generated question with at least five annotators to
be able to get some sort of agreement between them. Also, it was difficult to define what you mean
by specific to define what you mean by usefulness. Right, and we did a lot of back and forth in our
pilot testing to define, first we just gave them a value to select from one to five, and we found
that that to be very noisy because it's like how people judge what is five and one is very difficult
when it comes to specificity. So then we concretely define those levels by saying, okay, this is a
generic question. If it can be asked for almost any product in this category of home and kitchen
it's a more specific question if this can be asked only on this product and a few other products in
few similar products and so on. So we had to explicitly define those levels. Likewise for usefulness
we had to define is this useful only to this user who's asking or is this useful to multiple users
who have been using Amazon and so on. So it is difficult to do human evaluation in this scenario
because you need to sort of define what you mean by any of these criteria.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="42:02">

Great. Yeah, thanks a lot. Is there anything that you wanted to say that we didn't ask you?

</turn>


<turn speaker="Sudha Rao" timestamp="42:06">

I guess in general, the other thing that I'm interested in right now is using one of these pre-
trained big models and trying to see if we can generalize beyond domain. So most of the work that
I've done before this specific domain like question of stock exchange or Amazon, so on. So one other
thing that I'm looking into right now is can we use these big models which are very good language
models and try to fine tune them on questions, data from very domains and have a model that knows
how to ask a question very well and then use this utility information to guide it, to know what to
ask about. And that's like the missing information in that scenario. So I guess that's something
that I'm interested in.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="42:48">

Great. Thanks. This was a really fun chat. Thanks a lot for telling us about your work. Also the
work of question generation generating?

</turn>


<turn speaker="Sudha Rao" timestamp="42:56">

Yeah. I had a great time chatting as well. Thank you so much.

</turn>
