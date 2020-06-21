# Requirements Capture

## Notice

**This file should not be edited and then pushed directly**. Any changes to this file should be raised via pull request so they can be reviewed by the team. These directly relate to the requirements of this system so need to be reviewed on every modification. **Any changes not approved via a pull request will be reverted** (unless directly made by an approved editor, not changing requirements or other exceptional circumstances described clearly in the commit message). 

[TOC]

**Business Requirements For**: Union Event Management System (UEMS)
**Document Created: ** 5 June 2020
**Author**: Ryan Delaney <ryan.delaney@xiomi.org>
**Distribution**: Ents Crew

## 0 Revision History

| Author   | Date       | Comment                        | Version Bump |
| -------- | ---------- | ------------------------------ | ------------ |
| vitineth | 05-06-2020 | Initial requirements gathering | 0.0.1        |
| vitineth | 20-06-2020 | Requirement specification cont.| 0.0.1        |

## 1 Introduction

### 1.1 Document Purpose

To outline all requirements of the Union Event Management System application(s) describing processes, technologies and requirements that need to be used and completed.

### 1.2 Intended Audience

Ents Crew developers and the stakeholders of the system for requirements gathering and development. All stakeholders should be able to verify business requirements have been met to their satisfaction and understanding

### 1.3 Project Background

The project is designed to initially replace the existing Ents Crew Event Management System which exists currently as an Google Sheet containing all details on events. This project aims to develop a bespoke solution to remove data redundancy and provide increased automation providing a greater level of control and management of events. Further to these requirements, it is intended to scale to include all management aspects of the Commercial Room Booking system that forms the Union Event Management System. This includes initial data gathering, ops planning flows and bar/catering requirements and processing. 

### 1.4 Stakeholders

* Ents Crew
  * **Direct Contact**: Ryan Delaney, Ents Convenor
  * Requirements focused on reforming the Ents Crew Event Management System with a focus on event signup and assignment with automation
* Union / DoES
  * **Direct Contact:** Mika Schmeling, Active DoES
  * **Direct Contact**: Tom Groves, Incoming DoES
  * Requirements focused on full building Event Management with a focus on ops planning and requirements gathering systems with automation

### 1.5 Dependencies on Existing Systems

As this system needs to integrate alongside the existing solutions and is not expected to replace the system completely, this software solution needs to rely on the existing MSL room booking implementation and should support gathering data from that room booking source. 

The system is currently designed to be hosted on https://xiomi.org and as such will be depending on that hosting infrastructure and systems including authentication. This will be decoupled as much as possible into the relevant micro-services, as explored later.

### 1.6 Assumptions

We assume that this system cannot be integrated with St Andrews CAS and as such will maintain its own authentication systems. 

## 2 Scope

### 2.1 In Scope

* Room Booking
* Event signups
* Requirement management
* Requirement automation
* ==TODO==

### 2.2 Excluded from Scope

* Any finance management
  * This includes any tracking of charges or venue costs, this is to be managed by DoES and Cash Office directly and not through this system at this time

## 3 Functional Requirements

### 3.1 Actor Profiles

The following actors are designed to use this system, they are broken down into specific users below for the use case specifications (3.2):

* Union Staff
  * DoES
  * Bar/Catering
  * Tech Staff
  * Reception
* Event Organisers
  * New Events
  * Existing Events
* Ents Committee
  * Convenor
  * Secretary
* Ents Volunteers

Each use case is described below.

#### 3.1.1 Union Staff

This refers to union permanent staff. Their should have two classes of account for admin and basic usage. 

##### 3.1.1.1 Admin Usage

Union staff admins should have full management options for the system (admin role) allowing the management of some users and persons (adding and revoking UEMS only permissions). They should have full control of:

* **Venues** including adding, removing and updating venues
* **Events** as above
* **Actions** as above
* **Event statuses** as above
* **Persons and Organisations**
* **Comment** moderation including flagging, hiding, deleting and marking
* Generate, retrieve and revoke **event only access (EOA)** codes for specific events
* Enter **event booking** request 

##### 3.1.1.2 Basic Usage

Union basic staff should have permissions to:

* **Events** modifying their requirement statuses, changing requirement properties
* **Comments** on all events
* **File** uploads, downloads and linking
* **Action** being performed on events
* Enter **event booking** request

#### 3.1.2 Event Organisers

Event organisers need access to their event if they are already entered without being required to authenticate fully with the system to reduce the steps. Their permissions should include

* **Commenting** on their events only
* Updating description of an **event**
* Changing an **event status** to cancelled
* **File** uploads, downloads and linking on their own events only

For people who are attempting to organise an event and require booking a space, they will need to perform the following actions without any authentication so these are assumed to be the permissions of a user who is unauthenticated (see 3.1.4 as well):

* Enter **event booking** request 

#### 3.1.3 Ents Committee

Ents committee have increased permissions, close to the user flow of the union admins (3.1.1.1):

* Creating, deleting, and modifying **events**
* Changing **event statuses** to mark events as having signups, staffed by the union or unstaffed
* Changing **tech requirements**
* Changing **signup roles**
* Changing **signups**
* **File** uploads, downloads and linking on all events
* Updating **venue** properties
* Modifying **organisation** contact details
* Generate, retrieve and revoke **event only access (EOA)** codes for specific events 
* Enter **event booking** request

#### 3.1.4 Ents Volunteers

Volunteers have the most limited permissions on the systems and are granted these permissions without authenticating fully to reduce the number of steps to getting involved. These permissions are assumed to be the permissions of a user when unauthenticated

* **Signup ** to events

### 3.2 Use Case Specifications

Use case specifications describe all possible actions that the user should be performing and able to do in the software.


#### 3.2.1 DoES

* **Venue**:
  * Creating a new venue
  * Marking a venue as deleted
  * Updating venue descriptions and capacity statistics
  * Locking and unlocking a venue for bookings
  * Fetching all bookings by venue
* **Event**
  * Edit all properties
  * Change event status
  * Retrieve all events by requirements and properties
  * Retrieve all events by date
* **Booking**
  * Request new booking
  * Approve bookings
  * Reject booking
* **Comment**
  * Comment on all events
  * Flag and hide comments
  * Mark comments
* **Files**
  * Retrieve all files on all events
  * Upload and link files to all events
  * Set confidentiality of files
* **Users**
  * Escalate and deescalate all users to any role
* **Signups**
  * Retrieve all signups


#### 3.2.2 Bar / Catering

* **Event**
  * Change catering and bar requirement status
  * Change catering and bar requirements
  * Retrieve all events by requirements and properties
  * Retrieve all events by date
* **Comment**
  * Comment on all events
* **Files**
  * Retrieve all suitable files on all events
  * Upload and link files to all events

#### 3.2.3 Tech Staff

* **Event**
  * Change tech requirements
  * Change event status
  * Retrieve all events by requirements and properties
  * Retrieve all events by date
* **Comment**
  * Comment on all events
* **Files**
  * Retrieve all suitable files on all events
  * Upload and link files to all events
* **Signups**
  * Retrieve all signups
  * Remove signups
* **Venue**
  * Creating a new venue
  * Marking a venue as deleted
  * Updating venue descriptions and capacity statistics
  * Locking and unlocking a venue for bookings
  * Retrieve all bookings by venue

#### 3.2.4 Reception

* **Event**
  * Retrieve all events by requirements and properties
  * Retrieve all events by date

#### 3.2.5 Active Event Organisers

* **Files**
  * Upload and link files to their event
  * Retrieve all files on their event
* **Comment**
  * Comment on their event
* **Event**
  * Adjust event times
  * Set event description and properties
  * Retrieve all events by requirements and properties
  * Retrieve all events by date

#### 3.2.6 New Event Organisers

* **Booking**
  * Request new booking

#### 3.2.7 Convenor

* **Venue**
  * Retrieve all bookings by venue
* **Event**
  * Create new event entry
  * Change event status
  * Change tech requirements
  * Change all direct event properties
  * Retrieve all events by requirements and properties
  * Retrieve all events by date
* **Signups**
  * Set the signup roles
  * Retrieve all signups by event
  * Add and remove signups
  * Set the possible signup roles
* **Files**
  * Retrieve all files
  * Upload and link files
* **Comment**
  * Comment on all events
* **Bookings**
  * Request new booking
* **Users**
  * Escalate users from volunteer to ents committee
  * Deescalate users from ents committee to volunteer

#### 3.2.8 Secretary

Same as convenor

#### 3.2.9 Volunteers

* **Signups**
  * Sign up to an event
  * Remove their signup from event
* **Files**
  * Retrieve all files
* **Events**
  * Retrieve all events by requirements and properties
  * Retrieve all events by date

## 4 Data Requirements

### 4.1 Data Architecture

> This section describes the Data Architectural requirements part of the Business Requirements. You would normally complete the Domain Class Diagram if you are using UML (Use Cases) or the Entity Relationship Diagram if you are following the Oracle Designer approach, but rarely both. 

### 4.2 Data Conversion

> This section describes at a high-level any data conversion requirements, namely the system, data source and destination. For example: “User data will be pulled from the Active Directory System and converted to enhance the Peoplesoft HR user record.”

### 4.3 Data Retention and Archiving

### 4.4 Security and Privacy Implications

> This section describes the sensitivity levels of each class of data. The following criteria are used in determining the sensitivity level of each conceptual class/entity.
>
> * **Non-sensitive** information that would not reasonably be expected to cause injury (harm) if released to the public;
> * **Protected A**:  information that, if compromised, could reasonably be expected to cause injury (harm), e.g. loss of privacy;
> * **Protected B**: information that, if compromised, could reasonably be expected to cause serious injury (harm), e.g. the conduct of a court proceeding would be adversely affected;
> * **Protected C**: information that, if compromised, could reasonably be expected to cause extremely grave injury (harm), e.g. loss of life.

## 5 Non Functional Requirements

> This section describes the non-functional requirements part of the Business Requirements. A non-functional requirement is typically a special requirement that is not easily or naturally specified in the text of the Use Case’s or function’s event flow. Examples of non-functional requirements include legal and regulatory requirements, application standards, and quality attributes of the system to be built including usability, reliability, performance or supportability requirements. 

### 5.1 Security Requirements

#### 5.1.1 Authentication

> This section describes the Authentication requirements part of the Business Requirements

#### 5.1.2 Authorisation and Access Controls

> This section describes the Authorization and Access Control requirements part of the Business Requirements at a high-level. Authorization is the process of determining if the person/group, once identified through the “Authentication process”, is permitted to have access to certain services

### 5.2 Availability Requirements



### 5.3 Scalability Requirements

> This section describes how the system is expected to scale to new higher or lower levels. Both user and application scalability requirements are described here.

### 5.4 System Help Requirements

- New ents crew member signup process tutorial


## Epic User Stories 

> Epic user stories are broad user stories which encompass an action which a user wants to take which involves multiple parts.

- A member of the ents committee wants to add an event to the system so that members can signup.
- A member of the ents committee wishes to record users meeting requirements
- A member of the ents crew wishes to view all events coming up in the next 4 weeks so they can decide which events they are interested in taking part in.
- A member of the ents crew wishes to sign up to an event so that they can volunteer.
- Ents convenor wishes to send a list of un-manned events to the Technical Supervisor
- An event organiser wants to upload stage plans and riders for an event
- Building supervisor wishes to view all upcoming events as a calendar by venue

