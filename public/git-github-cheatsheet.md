# 🚀 Git & GitHub Beginner's Guide & Cheatsheet
**Bharati Vidyapeeth's College of Engineering, Lavale, Pune - 412115**  
**Department of Computer Engineering | Presented by BV CodeVerse**

---

## 📌 Part 1: What is Git & GitHub? (And the GUI)

Imagine writing a massive school project or coding assignment. Every time you make changes, you probably save files like `project_v1.zip`, `project_v2.zip`, or `final_final_real.zip`. It gets messy quickly!

- **What is Git?**  
  Git is like a time machine for your code. It runs on your computer and keeps track of every single change you make. If you break your code, you can instantly travel back in time to when it was working.
- **What is GitHub?**  
  If Git is the time machine on your laptop, GitHub is the cloud storage (like Google Drive or iCloud) where you upload your project so it is safe online and you can share it with others.
- **What is the GitHub GUI?**  
  GUI stands for Graphical User Interface. Instead of typing terminal commands, the GUI is GitHub’s website where you can click buttons, view files, and create projects using your mouse.

### Key GitHub GUI Actions:
1. **How to create a Repository (Repo):**  
   A "repository" is just a fancy word for a project folder. To create one:
   - Go to GitHub
   - Click the `+` icon in the top right corner
   - Select **New repository**
   - Give it a name (e.g. `BVCODEVERSE-demo`)
   - Check the box that says **"Add a README file"**
   - Click **Create repository**
2. **What is a Branch?**  
   Think of a branch as a copy of your project. The main version is called `main`. If you want to try adding a cool new feature without breaking your working project, you create a new "branch" to experiment safely.

---

## ⚙️ Part 2: Introduction to Git & Setting Up Your Computer

To use Git on your computer, you will use a tool called **Git Bash** (a terminal window where you type short commands).

### Step 1: Tell Git Who You Are (Do this once)
Open Git Bash and type these two lines (with your own name and email):
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

### Step 2: The Core Commands Cheat Sheet
When working with Git, you will use these commands over and over again:

| Command | What it does |
| :--- | :--- |
| `git init` | Turns your ordinary computer folder into a Git-tracked project |
| `git status` | Asks Git: "What files have I changed or added recently?" |
| `git add .` | Selects and "stages" your files: "Get these files ready to be saved" |
| `git commit -m "message"` | Saves staged files permanently into history (like a sticky note explaining changes) |
| `git remote add origin <link>` | Connects your local folder to your online GitHub repository |
| `git push` | Uploads your saved changes from your computer up to GitHub |
| `git pull` | Downloads the newest updates from GitHub down to your computer |

---

## 🎁 Part 3: The GitHub Student Developer Pack (Free Stuff!)

If you are a student, GitHub gives you thousands of dollars worth of professional software, tools, and website hosting completely free!

### What you get inside:
- ✅ Free website domain name (like `.me` for your personal portfolio from Namecheap)
- ✅ Free cloud server credits (Microsoft Azure $100 credits, etc.)
- ✅ Free professional coding apps & IDEs (like JetBrains tools, GitHub Copilot)

### How to get it:
1. Go to [education.github.com/pack](https://education.github.com/pack)
2. Click **Sign up for Student Developer Pack**
3. Log in with your GitHub account
4. Upload proof that you are a student (college ID card or college email address)

---

## 💻 Part 4: Live Demo — How to Push Your First Code

Let's take code from your laptop and upload it to GitHub step-by-step:

1. Create a new folder on your desktop called `my-first-project`.
2. Inside that folder, create a file named `index.html` and type:
   ```html
   <h1>Hello World</h1>
   ```
3. Open Git Bash inside that folder and type these commands one by one:
   ```bash
   git init
   git status
   git add index.html
   git commit -m "My first commit!"
   ```
4. Go to GitHub, create a new empty repository, and copy its web link. Then link it in your terminal:
   ```bash
   git remote add origin <PASTE-YOUR-GITHUB-LINK-HERE>
   git branch -M main
   git push -u origin main
   ```
5. Refresh your GitHub page — congratulations, your code is now live on the internet!

---

## 🧪 Part 5: Practice Code Link
Want to practice right now? You can use this official practice repository to test out your cloning and pushing skills:
- **Practice Repo:** [github.com/octocat/Spoon-Knife](https://github.com/octocat/Spoon-Knife)

---

## 📚 Part 6: Where to Learn More?
- **Play a Git Game:** [Learn Git Branching](https://learngitbranching.js.org/) (An interactive visual puzzle game for beginners)
- **Official Guides:** [GitHub Skills](https://skills.github.com/) (Step-by-step interactive tutorials built right into GitHub)

---
*Organized by BV CodeVerse - Bharati Vidyapeeth's College of Engineering, Lavale, Pune*
