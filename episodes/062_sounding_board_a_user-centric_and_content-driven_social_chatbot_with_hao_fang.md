---
title: "Sounding Board: A User-Centric and Content-Driven Social Chatbot, with Hao Fang"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Hao Fang","New Speaker"]
number: "062"
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


<Turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guest is Hao Fang, who is a PhD student at the University of Washington working
with Mari Ostendorf. Hao is finishing his PhD soon and is on the job market. So get in contact with
him Hao it's good to have you on the program. Welcome.

</Turn>


<Turn speaker="Hao Fang" timestamp="00:26">

Yeah. Thank you. I'm happy to be here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:29">

Today we're going to talk about a paper that Hao posted to archive a few months ago called Sounding
Board: A User-Centric and Content-Driven Social Chatbot. This paper describes the winning entry into
the Amazon Alexa prize. Congratulations Hao on winning that prize. Can you tell us what this prize
was about?

</Turn>


<Turn speaker="Hao Fang" timestamp="00:46">

Yeah, so this prize is hosted by Amazon. So they wanted university students to build a social bot
that can talk with human users on popular topics or recent news.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:00">

So how do you evaluate these systems?

</Turn>


<Turn speaker="Hao Fang" timestamp="01:02">

Yes. So the system evaluation. So everyone has their own ways to evaluate this in the complication.
So why don't we, they do is, the system is available to the Alexa users. So what happens is they
have a conversation with the bot, they will give a rating from one to five for the bot. But in the
finals they actually invite people with different backgrounds to talk with the bot. And then there
are judges sitting in the background to see that, to listen to the conversation and what they think
the conversation is no longer interesting. They will stop the conversation and give a rating also
from one to five.

</Turn>


<Turn speaker="Hao Fang" timestamp="01:39">

So that's the way they give a rating for these bots. And internally they actually also do some
analysis on like the coherence and the randomness of the response and also like the speech
experience, that falls in that space. And for us, we also did some study on correlation the user
reactions to the final user ratings. And they see that for example, there's how we propose topics
and accept or reject topics correlated with the final user ratings. So there are lots of different
ways to try to manage the system and by the URA itself is a very challenging problems. As you can
see the whole system involves a lot of modules. Then the aides, they actually work together as the
about like escalators, modules. So we need to be able to take all factors into account.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:33">

So your system was selected based on the judge's criteria, combined criteria for new students?

</Turn>


<Turn speaker="Hao Fang" timestamp="02:39">

Yeah. So, in the semifinals the system is actually based on the user ratings. And in the finals they
make the selection based on the judge's criteria.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:50">

And how many systems in total were participating.

</Turn>


<Turn speaker="Hao Fang" timestamp="02:52">

So last year they're at 15 human systems and for the hole competition and the for the finals there
were three systems. And also this year they also have eight system. Now.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:03">

So were these arbitrary conversations, what, what kind of conversation are we talking about here
with this chat bot?

</Turn>


<Turn speaker="Hao Fang" timestamp="03:09">

So they don't give very strict constraints cause you can think of what the user want to talk about
anything. But the initial guidance is to talk about the popular topics. Like they gave us 8 topics
like sports, politics, entertainment and science, technology, all kinds of these things. And but you
can imagine the way to invoke the bot is use the current Echo device and say like "let's chat" so
they can chat about anything. They tend like chat about a specific movie they can chat about maybe
your, what's your favorite color, all kinds of things. So while you need to handle all these kind of
user utterances you also want to turn or even drive the conversation back to talk about some recent
news or popular topics.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:01">

What's the user's goal in having these kinds of conversations? Are they just like trying to fill
time? Was the guidance there?

</Turn>


<Turn speaker="Hao Fang" timestamp="04:08">

Yeah, I think there is a very interesting problem where they user guides are not very specific. When
they talk with the task scoring system, they will have very clear goal like they want to set an
alarm or book a flight. But when they come to talk with a social bot, like just the live chat, they
may not know what they want actually. So the user goal is not very specific. So there, but that's a
very important part of our part is to try to elicit the users goal during the conversation, like try
to discover whether they user wants to talk about some maybe with the news and also we want to
present some popular topics the user, that is potentially what the user wants to talk about. And so
the user may start to do this by like entertainment for entertainment. Also they can become a way to
acquire information, like to know what is recent events and also what are popular discussions
online.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:06">

Okay. One other point that people might be thinking of, there are touring tests, right? Where you're
trying to tell if, if a bot is distinguishable from a person, is that what's going on here? Are
there touring test elements or is this something different?

</Turn>


<Turn speaker="Hao Fang" timestamp="05:21">

No, we, so in our system we actually think we are. So our goal is not to pass the touring test, but
to like you give a very good user experience. So the user, we think the user should know that they
are talking to a bot. And because you can imagine when they user to talk, they actually have the
imagination like this is the bot. So we do not pretend we're a human. In the background. On the
other hand we need to have a human, like conversations like to have a very natural, like using their
language as the way to communicate between us and the user so that we are not trying to fool the
user, that we are like a human not bot.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:08">

So let me ask a related but different question. Do you think any of the users actually thought that
we were talking to a human and for how long?

</Turn>


<Turn speaker="Hao Fang" timestamp="06:18">

So I don't think the user is knowing, not much users think they're talking to a human and so they a
common question you get of course it's like who are you and where are you from. So we specifically
say we are a social bot, we are from a university. So one thing I should mention that is that when
the user starts saying lets chat platform, they will start saying like this, like a social bot. So
that's also a way to like tell the, you said this, the bot of the human, but of course I'm shooting,
they might still think this is the human to some extent. But I would say most people know that this
is a bot.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:03">

What if, this like a warnings or like disclaimers were not here, then do you think the users might
think, I think the question I am interested in is, how long does the conversation needs to be for a
human to tell that this is not a human,

</Turn>


<Turn speaker="Hao Fang" timestamp="07:20">

it won't take too long because like in the conversation you want to kind of guide the user, like how
to navigate the conversation. So you might provide some commands like you can say next and can say
continue or say cancel. So this is very clear like computers, right? So this is like a mixture of
like human language. But also there's like more like controllable commands.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:47">

So, okay. So I think at this point it'd be really helpful to get an actual example of the
conversation. And conveniently you have a nice one in your paper. Top right. Figure on page one. So
Waleed and Hao do you want to read through this as if you're the user and the chat bot.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:04">

Let me be the user.

</Turn>


<Turn speaker="New Speaker" timestamp="08:05">

Okay. So I will be the chat bot.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:08">

user. Let's chat.

</Turn>


<Turn speaker="Hao Fang" timestamp="08:09">

Hi! This is an Alexa Prize socialbot. How's your day?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:13">

I am five.

</Turn>


<Turn speaker="Hao Fang" timestamp="08:15">

Glad to hear it. We could chat about robots, Batman or Superman say next to chat about something
else.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:22">

Superman.

</Turn>


<Turn speaker="Hao Fang" timestamp="08:24">

So It looks like you wanna chat about Superman. I was high up in the cloud when I realized: If
people don't recognize Clark Kent as Superman because of his glasses, does his eye doctor know his
true identity?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:24">

I guess so.

</Turn>


<Turn speaker="Hao Fang" timestamp="08:24">

Did you know that Henry Cavill almost missed the call for the role of Superman cause he was playing
"World of Warcraft" .

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:24">

Really, I didn't know that.

</Turn>


<Turn speaker="Hao Fang" timestamp="08:24">

Weird, right? Speaking of Superman, Did you see: Superman? It was released in 1997. It's a comedy. .

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:24">

Yes, it was hilarious.

</Turn>


<Turn speaker="Hao Fang" timestamp="08:24">

I'm glad you feel this is hilarious. Which part do you like best about this movie? .

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:24">

The part when he met Lewis Leah. .

</Turn>


<Turn speaker="Hao Fang" timestamp="08:24">

Interesting. Meccartin and Raffi co-directed this film. The movie has a 6.3 out of 10 on IMDB. which
seems pretty good! do you like the movie's director?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:05">

So that's the end of the conversation.

</Turn>


<Turn speaker="Hao Fang" timestamp="09:26">

Yeah. So that's actually the conversation goes on but this just a very short example how we carry
out the conversation with the user,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:36">

Nice, and would you say this is an average conversation or is it like one of the better?

</Turn>


<Turn speaker="Hao Fang" timestamp="09:40">

I think this is about the average. So, actually there are a lot of users who will see there's lot of
use to try to break the system so they will not be very collaborative. So this one the user is
engaged in the conversation. They keep like express their opinions or yeah, like very react with the
same but definitely users sometimes will be just mildly interesting. Like say, okay, continue,
continue. So this is the kind of average and then the below average you would be like the users
become angry about like the, I don't know whether you're talking about, I don't care, like these
things.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:20">

Interesting. So this sounds like, well Hao you were talking a whole lot more than Waleed was when we
were reading through that. Right? So the, the chat bot is talking a lot more than the user and
mostly seems like the chat bots, like spitting out information and the users reacting to it quickly
and then the system moves on and says other kinds of facts. Is that a fair characterization of
what's going on?

</Turn>


<Turn speaker="Hao Fang" timestamp="10:43">

So I think there is different types of users. So in a normal conversation the user will switch
between the normal speaker and the listener so that when they want to like initiate topics, so lead
the conversation, they will start using like a command or like or a topic of informing tends to lead
the conversation. But most of the time the system really tries to present information to the user
acting as the users guide. So the project is actually recommending something new to the user, but
also the type of user who will be very talkative. They want to keep saying where something that is
very long and very complex. So this actually makes the system a little bit harder for in terms of
long term understanding. So we still see that kind of user in our system. But you can imagine that
because if the [inaudible] I understand it become harder. So like sometimes we will fail. And then
the user will say something short actually.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:47">

Interesting. So given that this is how the system works, what do you think the best case use for
this is? Like when, when would someone actually want to come to the system and use it?

</Turn>


<Turn speaker="Hao Fang" timestamp="11:58">

Yeah, so I think, I want to think the thing we're on two perspectives, one perspective is in the
application of social bot where you want to only talk about news or popular topics. So that's
actually serve that as a conversation gate way to online content. So we are familiar with, it's like
a database or the search engines which helps us to access all the information online. Just there are
much more information we can add that are available nowadays for humans to digest and then later on
we have this recommender system where like you use Amazon or Netflix you can start in the system,
we'll recommend something to you, although you're not like intentionally to search for them. So this
is where the news and for the online discussion and news, so you're having so many online
discussions and news that you may not be initiated the action to search for them but the system can
provide a way to recommend this thing that tailor to your inquires in a conversational way. So
that's one thing we can think about for the application. Just like a conversation on recommendation
system and thinking beyond the social bot. So we really think it will be a nice combination of this
social chat with this like task oriented a bot or category system where you can start doing
something like control your smart home devices or like to have set a car alarm or camera while you
still can have this social interactions and like to be more proactive or to be more smart in terms
of recommending, okay. If you want to book a flight, you may also want to go restaurant or something
like this.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:53">

Interesting. Okay.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="13:55">

Another case would be people who are, who can't find others to talk to and it is kind of a little
bit of a sad topic, but it's true that many people feel lonely and yeah, for various reasons. Yeah.
I wonder if this is one use case for this.

</Turn>


<Turn speaker="Hao Fang" timestamp="14:12">

That's definitely important to the part of the application in the social bot. So there are a lot of
things that you can imagine like this companionship or there's also the education purpose that you
want to make people more aware of the things that are also for people who cannot read or they have,
visual problems so they need voice-based interactions to learn about this like, online discussions.
So there are lot of like applications within even within the area of social bot.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:53">

So in the example that we read through, it was just the computer that was suggesting new information
and the person wasn't really asking questions. So let's say that the user had said, well I had asked
a question about Superman, would the system have been able to like respond to coherently and answer
the question?

</Turn>


<Turn speaker="Hao Fang" timestamp="15:13">

Yeah, so the, at the question answering engine in the, at the back end where if we detect there's
the question brought up by the user, we try to answer that. So there are different types of question
you can imagine. So there are like personal question that you just want to know about the bot or the
bot's opinion or this background questions like maybe when was Superman released or what was the
rating of the Superman movie. So this two types of question handled differently. So for the factual
question, we use this question answer engine, but for the personal question we have a kind of
backstory which responds back to be able to provide a coherent answer another thing we actually do
is that not everything I personally can answers though.

</Turn>


<Turn speaker="Hao Fang" timestamp="15:58">

there are lots of questions we can not give an answer but to engage the user in the conversation we
try to more proactively or to find something random to the question that the user asked to some like
maybe what the first name of some person but we don't know the answer that'll be kind of know some
news about the person. So we will bring up like okay, but we know some, here's the news about this
person. We want you to know that. So that's ways like we are not only doing a question, answering
but to try to render some relevant information to the user.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="16:32">

So this is a good segue can you tell us a little bit more about the system architecture could you
like walk us through this first at the high level?

</Turn>


<Turn speaker="Hao Fang" timestamp="16:42">

Yeah, so essentially you can think about the system has three, three big component one is the front
end which is actually the devise where they receive these audio signals and to do the speech
recognition. And then there is also the text to speech in the device where to convert the text to
audio signals. So that happens in the front end and for the backend in there's all these like APIs
or the servers where we can use, we do the parsing, we do the question answering and also the very
important part is the compartment where we store all these latest news are the popular discussions
in our content database and we all connect them as a class and so the middle end makes the
communication between the front end and the back end.

</Turn>


<Turn speaker="Hao Fang" timestamp="17:31">

So it receives these speech recognition transcript and then goes through the process to make a
decision what to say back to the user and by talking to the back end and then it returns the screen
to the front end, to be able to return to users as a speech. And so in the core part of the middle,
actually three modules that is very typical in our system. There's the level of understanding which
tries to like to convert the user utterances into a form that the system can understand like for
example, what's the intent and like what type of question that the user asks. And then there's the
double management which will run a lot of policy to see, okay, based on this user input and based on
what type of things we have in the back end. So what kind of response should I make. And then it
will specify what kinds of speech acts to say like there's the grounding act, there's the inform act
and there is the request act or the instruction act. And then in the long jump generation part, we
tread you, we realize this acts as a national language and connected them together to build our
complete response. And then we turn to the text speech synthesis.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:53">

So when you're doing the generation component, I know there are a lot of research papers on natural
language generation, but somehow I'm guessing you're not actually using any of that. Do you have
templates or like how do you generate language?

</Turn>


<Turn speaker="Hao Fang" timestamp="19:06">

So the system we use the templates but there's also consideration like we are definitely aware these
national entrepreneurial papers and we actually also tried this fit to fit model in to combine
language understanding and generation as a whole. But it's not very suitable for the social bot
command right now because first there was no data to channel at the beginning. So you had to start
to, to crawl all this relevant data that another issue is like that's not grant on the actual recent
news, our recent discussions. So, so that something we tried but we didn't use in our final system.
And so the, for the long generation or the final synthesis means mostly using the template based. So
we have templates for individual speech act and then the templates definitely have some variations.
And then we tried to use the template to give more control-ability for the generation part.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="20:08">

So this problem was a lack of training data. It's not going to be solved really by creating
templates. Right. Cause you shouldn't be like over-fitting your model on the same templates that you
defined. But I guess I wonder if like a mini talk shows where more people have conversation about
things that are popular. Yeah. And but I guess it's not large enough. It may not be large enough to
train.

</Turn>


<Turn speaker="Hao Fang" timestamp="20:36">

We actually tried to use talk show data, or interview data to train the models. So I think the thing
we did, one thing, what's missing is to try to connect the conversation data with this back end,
like real world discussions or news. So we need to first the extract the news mentioned in the talk
shows or in the conversations and then to find the source of this news. Then to and then try to
model. That's the, okay here at the like information or knowledge you want to be groggy. Oh and
here's the conversation. And then to try to generate based on these, that would be one thing I can
imagine to train this model. So I don't think we, so I feel we will not be true to try to model
based on the data we collected by the generator because it will add obvious be best to this template
and a, another thing I would add is, say, I feel it would be so wrong if you want to implement a
system that is like people, Oh for the users you met, you use the hybrid method. Like there's some
template components, but also there is the trend that trainable components. So like for example, you
can say, okay, okay, the grounding part I can use the generator to say like I've happy you like this
or I'm sorry to hear that. Or for some of these like content presentation, or rendering component
that you want to use the [inaudible] so how to balance these things of you, you would, things to
think about also to make the gap between the research system to the commercial system more at
smaller.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:27">

Yeah. On that topic. I remember seeing a lot of papers over the past several years on chatbot
research and I'm sure that you read those papers much more closely than I did. So I'm curious to
know, so what extent do you think the current state or literature in lighting systems is?

</Turn>


<Turn speaker="Hao Fang" timestamp="22:48">

So I read a lot of these papers. I think they're very good papers. But you can still notice that
actual commercial system, they are not used to these state of the art. Massive part of this is like
it does not, if you train from scratch, it's a lot of this paper that I have the system to train
from scratch and try to learn something based on data they already had. And the commercial systems,
the, there are lot of knowledge driven designs. So the bottom act is knowledge. So they will kind of
perform better initially then the trained models. So people nowadays I think people just start
thinking about how can I bootstrap a system from these like mutual system could that then use this
trainable components to improve that or vice versa. I can first train from scratch and then tried to
find some ways to inject that knowledge into the system.

</Turn>


<Turn speaker="Hao Fang" timestamp="23:51">

So I think it's, for me, I think the practical way would be combined these two system rather than go
from go to to extremes the extreme is like purely and like they had learned from scratch and it's
like purely handed to new things and for everything. So I really think these two should be combined
together to make a system more like in both from the perspective that the one hand kind of and also
from the perspective how to scale a system to or to learn from the last model data.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:29">

Yeah, that's really interesting. I think in the paper you mentioned that you had about 160,000
interactions with users, that that number seemed extremely large to me. Just thinking like, yeah, in
one month I'm thinking of thinking of that. It seems a lot more feasible I guess maybe I think
that's really large cause I'm not in some industrial lab that has access to all of Google search
logs or whatever. But it seems a lot more feasible to do this kind of like start with the knowledge,
mostly knowledge engineered system and bootstrap your way to a data driven system by interacting
with users. Do you like, did you do this? Did you actually try learning from the interactions that
you had?

</Turn>


<Turn speaker="Hao Fang" timestamp="25:13">

So we actually, so the system we have is actually a kind of a hybrid way. So initially we used a lot
of rules or knowledge engineered features but after we had the system we kind of started getting
user data. So, for example, for the, you can think about we have individual components inidour
system and we can, we actually do some annotations on like for example, when the user wants to
change the topic, she'll be like continue or like to switch things. So this annotation helps us to
train a model that I imposed, a lack of understanding and a doubt with management part. Now also for
the complement, we also need to, so rather than not, so we need to understand that like for example,
news articles or, or the online discussions in particular, we need to filter those inappropriate
content.

</Turn>


<Turn speaker="Hao Fang" timestamp="26:09">

So that's also something we need to use more machine learning driven methods rather than having
engineers say, okay, this is everything you want to exclude. The like the specifics keywords, which
is not enough to cover the actual spectrum of this inappropriate content.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="26:29">

So that sounds like the vital management component in the middle tier. Where do you think we should
invest more in learning instead of writing room.

</Turn>


<Turn speaker="Hao Fang" timestamp="26:40">

Right so I think the management and the back end, the how to acquire all the online like knowledge
or information is where I think both NLP and machine learning can make a big impact. So I think it's
for long term understandings definitely people have been working in this area for a long time. So
there's already a lot of like, like model, like data driven learning there and for management.

</Turn>


<Turn speaker="Hao Fang" timestamp="27:09">

So people, are not still working with that, like they are using reinforcement learning or using this
POMDP to model the process. But not all the commercial systems use that right now. I think there's
the trend to move towards more like this practice. To help the double management. You definitely
will bootstrap based on the like initial system that you've seen. Was the knowledge engineering,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:41">

You said not all the commercial systems use like deep learning, sorry reference learning methods are
there any that use that as far as, you know?

</Turn>


<Turn speaker="Hao Fang" timestamp="27:52">

So I don't know much details, but I know that all this like becomes their trend to explore this
method and there are also startups. They tried to implement this in the, for this customer service,
mostly the customer the rest of them tried to provide a bot that can answer some usual questions for
the customers.

</Turn>


<Turn speaker="Matt Gardner" timestamp="28:21">

So 160,000 questions or interactions in a month seems like a really high number for a university
project. Like is, is did you just get that number because you're part of the Alexa prize or is this
something that like any, any PhD student that wants to like do research on dialogue could just build
an Alexa skill and get a whole bunch of interaction and train a system that way.

</Turn>


<Turn speaker="Hao Fang" timestamp="28:45">

So I think we definitely benefit from the Alexa prize platform. It so it routes all the traffic or
if you user start using that traffic [inaudible] is path. So, and then they also do some promotions.
So I think that we get this such large number because Alexa has such a large user base and this
means we never be able to use like fully utilize all the data we get. So we get much more than we
can handle right now. And so we actually are trying to use more of this data to improve the system.
But I think for university students it will be enough to get a couple sets. So they don't need to
get the millions but they still need to get some real user data. So I think that important part is
to have your system interact with the real users and you can either recruit like users or just put
your system online to have user to talk with them.

</Turn>


<Turn speaker="Hao Fang" timestamp="29:46">

Also you can imagine that there's a lots of users who want to have kind of conversations by looking
at the data we get. Or also there's the another bot in China, by Microsoft they also get a lot of
like user actions. So it's definitely users have motivation or interest in talking or in chatting
with the bot. So that means there is potential. You can get lots of data.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="30:16">

And do you plan to continue working on this for the next year or the next Alexa pro?

</Turn>


<Turn speaker="Hao Fang" timestamp="30:21">

So we are not participating the next one, because I'm going to graduate. Right. So I definitely so
we am currently actually working on space too so that you find ways to improve the system and to
more formally formulate the idea of like the social bot or the space of social bot and discuss what
things are missing. things that we need to build or work on this infrastructure or, or working on
this component that can help this space.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:55">

Great. This was a really interesting discussion. Thanks for coming on. Hao, do you have any last
thoughts before we conclude?

</Turn>


<Turn speaker="Hao Fang" timestamp="31:00">

No, I think the context is great.

</Turn>


<Turn speaker="Matt Gardner" timestamp="31:03">

Okay, great. Hao it was nice to have you on the program. This was a really interesting conversation.

</Turn>
