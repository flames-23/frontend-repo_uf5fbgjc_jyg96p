const data = {
  meta: {
    title: 'Nalla Berozgar | 11th-Grade Student — Linux • Automation • Python/Bash/C',
    description: 'Portfolio of Nalla — an 11th-grade student learning Linux, automation, Python, Bash and C. Interactive Matrix-themed site with projects and a simulated terminal.'
  },
  copy: {
    heroHeadline: 'Welcome to the Matrix of my Code',
    heroSub: 'I’m Nalla — an 11th-grade student learning Linux, automation, and coding (Python, Bash, C).',
    aboutShort:
      "Hi — I'm Nalla, an 11th-grade student who loves problem solving and automation. I know basic Linux, and I write scripts in Python and Bash. I also learn C for understanding how computers work close to the hardware. I enjoy building small tools that save time and make repetitive tasks easier.",
  },
  skills: [
    { name: 'Python', level: 70, note: 'Scripting & small programs. Learning more every week.' },
    { name: 'Bash', level: 65, note: 'Shell scripts and automating tasks on Linux.' },
    { name: 'C', level: 40, note: 'Basic programs and understanding fundamentals.' },
    { name: 'Linux Basics', level: 60, note: 'Terminal commands, file permissions, packages.' },
    { name: 'Automation Concepts', level: 60, note: 'cron, scripts, simple task automation.' },
  ],
  projects: [
    {
      slug: 'auto-backup',
      title: 'Auto Backup Script',
      description:
        'A bash script that copies important files to a backup folder and logs progress. Useful for simple backups on Linux.',
      tags: ['Bash', 'Linux', 'Automation'],
      simOutput: '[log] Copying files...\n[ok] 124 files copied to ~/backup.\n[done] Backup finished.',
      sample:
        '#!/usr/bin/env bash\nSRC="$HOME/Documents"\nDST="$HOME/backup"\nmkdir -p "$DST"\nrsync -av --delete "$SRC/" "$DST/" | tee -a "$DST/backup.log"\necho "Backup done."',
    },
    {
      slug: 'study-timer',
      title: 'Study Timer (Python)',
      description:
        'A small Python app that uses a Pomodoro timer and logs study sessions to a text file.',
      tags: ['Python', 'Automation'],
      simOutput: 'Pomodoro: 25 minutes focus → 5 minutes break.\n[log] Session saved to study_log.txt',
      sample:
        'import time\nfor i in range(25,0,-1):\n    time.sleep(1)\n    print(f"Focus: {i} min left")\nprint("Break time!")',
    },
    {
      slug: 'mini-c-calculator',
      title: 'Mini C Calculator',
      description:
        'A console calculator written in C to practice basics like loops and conditionals.',
      tags: ['C', 'Learning'],
      simOutput: 'calc> 2 + 2\n4',
      sample:
        '#include <stdio.h>\nint main(){int a,b; char op; if(scanf("%d %c %d", &a, &op, &b)!=3) return 0; if(op==\'+\') printf("%d\\n", a+b); else if(op==\'-\') printf("%d\\n", a-b); else if(op==\'*\') printf("%d\\n", a*b); else if(op==\'/\' && b) printf("%d\\n", a/b); else printf("?\\n"); return 0; }',
    },
  ],
  snippets: [
    {
      id: 'bash-backup',
      title: 'Bash: Quick Backup',
      code:
        '# backup Documents to ~/backup\nmkdir -p ~/backup\nrsync -av --delete ~/Documents/ ~/backup/',
      simulate:
        '[simulate]\nchecking files...\ncopying...\n✓ backup complete (dry run)'
    },
    {
      id: 'python-timer',
      title: 'Python: Mini Timer',
      code:
        'import time\nfor i in range(3,0,-1):\n    print(i)\n    time.sleep(1)\nprint("Go!")',
      simulate: '3\n2\n1\nGo!'
    },
    {
      id: 'c-hello',
      title: 'C: Hello',
      code:
        '#include <stdio.h>\nint main(){ printf("Hello, world\\n"); return 0; }',
      simulate: 'Hello, world'
    }
  ]
};

export default data;
