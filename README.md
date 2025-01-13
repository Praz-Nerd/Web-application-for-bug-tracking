# Web-application-for-bug-tracking
A web app for bug tracking for the Webtech course

# Specifications
* The interface should include a login/sign-up form for students. If the credentials are correct, they can then choose to create or modify a project and manage bug reports (as a team member) or submit bugs (as a tester).
* When creating a project, the student can add team members, a description, and a link to the repository.
* Each project keeps track of its members and testers. Students should be able to be part of many projects, either as members or as testers. A student cannot be a member and a tester for the same project.
* Bugs issued by the testers are reviewed by team members and they can allocate themselves to fixing a bug.
* When a bug is resolved, the team member may add a link with the committed solution to the bug status.
* The user's dashoard contains both the project they participate in, as well as the bugs issued, where they can check their status.

# Project Plan
The project will be built with the following technologies:
* a relational database with tables representing students, bugs, projects and student role (as junction table)
* internal JavaScript classes, which map to the table in the database
* back-end running on Node.js
* single page front-end built with React framework
* application screens identified at this stage in the project: login/sign-up screen, dashboard screen, with project list and bugs issued list

# TODO
* testers to add bugs to projects
* project participants to update the status of a bug
* connect front-end with back-end
* create pages for login and dashboard

