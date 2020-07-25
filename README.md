# RingCentral Call Park Monitor

This is a demo application, trying to reproduce a weird call park issue.


## Use story

The app will monitor the following user extensions

  - Test User1 200501
  - Test User2 200502

Call queue number is 704-990-1015


### Testing steps

You need at least 3 devices to test:
    1. customer device
    1. ext 200501 device
    1. ext 200502 device


1. personal mobile phone called
1. ext 200501 answered
    - parked
1. ext 200502 picked up
    - parked
1. ext 200501 picked up
    - parked
1. ext 200502 picked up
    - parked
1. ext 200501 picked up
1. ext 200501 hang up


### What to monitor

Try to reproduce such an issue:

> Operator1 receives a call and parks it. Then, Operator2 picks up the parked call and then parks the same call again. Then Operator 1 picks up the parked call again, but when he picks up the Parked Call, they still see that the park extension is still available and still on hold even though its already answered. When they park another call and get it, the Park call still stays on the list of the parked calls on their system. They said that its a problem with the API not able to detect the answered park extensions.
