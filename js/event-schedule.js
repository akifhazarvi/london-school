/* ------------------------------------------------------------------
   EVENT SCHEDULE — "10 Days of the Future" open-house campaign
   ------------------------------------------------------------------
   Drives the dated event ribbon + event section on enroll.html so the
   landing page message-matches the Meta/WhatsApp ad creative a parent
   just clicked ("FUTURE ROBOTICS DAY — Thursday 13th August").

   HOW TO USE
   ----------
   1. Fill in a row below for each day of the campaign as the creative
      for that day is finalised. Only rows with a `title` are shown.
   2. The block auto-advances: it renders whichever event is next
      (today counts as next until midnight), and hides itself entirely
      once the last dated event has passed. No page edit needed on the
      day after, and no stale date can be left live by accident.
   3. `date` is ISO yyyy-mm-dd in Pakistan local time.

   This runs SYNCHRONOUSLY (script tag sits directly after the markup,
   no `defer`) so the correct day is painted on first render — a
   deferred patch would flash Day 3 content at a Day 5 visitor.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var PHONE_DISPLAY = '0301-0499777';
  var WA_NUMBER = '923010499777';

  /* ----------------------------------------------------------------
     THE SCHEDULE
     ----------------------------------------------------------------
     Day 3 is transcribed from the 13 Aug ad creative. Days 4-10 were
     drafted here and are AWAITING SIGN-OFF — check them against what
     the school will actually run before the matching ad goes live.

     Calendar rules baked into these dates:
       · Fri 14 Aug is Pakistan Independence Day — skipped.
       · Sun 16 Aug — school runs Mon to Sat, so skipped.
       · "Day n of 10" counts EVENT days, not calendar days.

     Every theme below maps to something the school genuinely offers
     (Robotics Lab, Cambridge Pathway to Class 7, US coding certs at
     KG, 25+ sports, emotional health counsellors, Waris Mir legacy).
     Nothing here references swimming, foreign languages, IGCSE or
     O-Level, or AI progress reports — those are brochure overstatements
     and must stay off every public surface.
     ---------------------------------------------------------------- */
  var SCHEDULE = [
    {
      day: 3,
      title: 'Future Robotics Day',
      date: '2026-08-13',
      time: '9:00 AM to 3:00 PM',
      blurb: 'A full day on campus built around our Robotics Lab. Children get hands on with real robots, try their first lines of code, and take on age-appropriate robotics challenges. Parents tour the classrooms and meet the academic team.',
      bullets: [
        'Live robotics demonstrations',
        'Discover how robots work',
        'Introduction to coding',
        'Robotics challenges for children',
        'AI and problem-solving activities',
        'Campus and classroom tour',
        'Meet our academic team',
        'Free placement assessment'
      ]
    },
    {
      day: 4,
      title: 'Young Coders Day',
      date: '2026-08-15',
      time: '9:00 AM to 3:00 PM',
      blurb: 'Children write their first real program. Block coding in Scratch, challenges set by age group, and a proper look at the two American coding certifications our students can earn from Kindergarten onwards.',
      bullets: [
        'Scratch and block coding taster',
        'Write your first program',
        'The two US coding certifications explained',
        'Coding challenges by age group',
        'Robotics Lab open session',
        'Campus and classroom tour',
        'Meet our academic team',
        'Free placement assessment'
      ]
    },
    {
      day: 5,
      title: 'Cambridge Classroom Day',
      date: '2026-08-17',
      time: '9:00 AM to 3:00 PM',
      blurb: 'See a Cambridge lesson as it actually runs. Sit in on a live class, look through the coursebooks and assessment plan, and ask our teachers how the Cambridge Pathway works from Pre-Nursery through to Class 7.',
      bullets: [
        'Sit in on a live Cambridge lesson',
        'How the Cambridge Pathway works',
        'Coursebooks and assessment walkthrough',
        'AI-integrated teaching in practice',
        'Question time with subject teachers',
        'Campus and classroom tour',
        'Meet our academic team',
        'Free placement assessment'
      ]
    },
    {
      day: 6,
      title: 'Science and Discovery Day',
      date: '2026-08-18',
      time: '9:00 AM to 3:00 PM',
      blurb: 'A campus full of experiments. Children run hands-on science activities, walk through student science fair projects, and see how curiosity and problem-solving are built into ordinary lessons here.',
      bullets: [
        'Hands-on science experiments',
        'Student science fair projects',
        'Discovery and problem-solving stations',
        'Science lab walkthrough',
        'AI and logical thinking activities',
        'Campus and classroom tour',
        'Meet our academic team',
        'Free placement assessment'
      ]
    },
    {
      day: 7,
      title: 'Sports and Activities Day',
      date: '2026-08-19',
      time: '9:00 AM to 3:00 PM',
      blurb: 'The other half of school life. Visiting children try our indoor and outdoor activities, meet the coaches, and parents see how 25+ sports and activities fit around a full Cambridge academic week.',
      bullets: [
        'Try our indoor and outdoor sports',
        '25+ sports and activities on show',
        'Meet the sports coaches',
        'Team games for visiting children',
        'How activities fit the academic week',
        'Campus and classroom tour',
        'Meet our academic team',
        'Free placement assessment'
      ]
    },
    {
      day: 8,
      title: 'Early Years Day',
      date: '2026-08-20',
      time: '9:00 AM to 3:00 PM',
      blurb: 'Built for our youngest visitors, Pre-Nursery through Kindergarten. Play-based learning stations, first steps with LEGO robotics, and an honest look at the rooms your three to five year old would spend the day in.',
      bullets: [
        'Play-based learning stations',
        'First steps with LEGO robotics',
        'Early years classrooms open',
        'Settling-in and daily routine explained',
        'Emotional wellbeing support for young children',
        'Campus and classroom tour',
        'Meet our academic team',
        'Free placement assessment'
      ]
    },
    {
      day: 9,
      title: 'Innovation and 3D Printing Day',
      date: '2026-08-21',
      time: '9:00 AM to 3:00 PM',
      blurb: 'Where the robotics path leads. Arduino boards, circuit design and live 3D printing, the projects our Classes 4 to 7 students build in their senior years with us.',
      bullets: [
        'Live 3D printing demonstrations',
        'Arduino and circuit design',
        'Sensors and automation projects',
        'Class 4 to 7 project showcase',
        'AI project walkthrough',
        'Campus and classroom tour',
        'Meet our academic team',
        'Free placement assessment'
      ]
    },
    {
      day: 10,
      title: "Mir's Vision Day",
      date: '2026-08-22',
      time: '9:00 AM to 3:00 PM',
      blurb: 'The finale of our ten day open house. The full campus is open, every lab is running, and you can meet the leadership team behind a school built on the legacy of Prof. Waris Mir.',
      bullets: [
        'Full campus open, every lab running',
        'Meet the leadership team',
        'The story of Prof. Waris Mir',
        'Robotics, coding and science showcase',
        'Admissions desk open all day',
        'Campus and classroom tour',
        'Meet our academic team',
        'Free placement assessment'
      ]
    }
  ];

  var TOTAL_DAYS = 10;

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
              'Thursday', 'Friday', 'Saturday'];

  /* Parse yyyy-mm-dd into a LOCAL midnight Date. `new Date('2026-08-13')`
     parses as UTC, which lands on the previous evening in some zones and
     would flip the event a day early. */
  function parseLocal(iso) {
    var p = iso.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  function midnightToday() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  /* "Today" / "Tomorrow" / "This Thursday" / "" — the urgency word. */
  function relativeLabel(dayDiff, dateObj) {
    if (dayDiff === 0) return 'Today';
    if (dayDiff === 1) return 'Tomorrow';
    if (dayDiff > 1 && dayDiff < 7) return 'This ' + DAYS[dateObj.getDay()];
    return '';
  }

  function formatWhen(dateObj) {
    return DAYS[dateObj.getDay()] + ', ' + dateObj.getDate() + ' ' +
           MONTHS[dateObj.getMonth()] + ' ' + dateObj.getFullYear();
  }

  function setText(sel, value, root) {
    var nodes = (root || document).querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = value;
  }

  /* Prefill the specific day into the WhatsApp message so the admissions
     team knows which creative pulled the lead without having to ask. */
  function waUrl(ev, when) {
    var msg = 'Assalamu Alaikum, I saw your ' + ev.title + ' post. ' +
              'I would like to reserve a place for my child on ' + when +
              ' (' + ev.time + ').';
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  /* Every remaining event, nearest first, each stamped with its parsed
     date and how many days out it is. */
  function upcomingEvents() {
    var today = midnightToday();
    var out = [];
    for (var i = 0; i < SCHEDULE.length; i++) {
      var ev = SCHEDULE[i];
      if (!ev.title) continue;
      var d = parseLocal(ev.date);
      /* An event stays "live" for the whole of its own day. */
      if (d.getTime() >= today.getTime()) {
        ev._date = d;
        ev._diff = Math.round((d - today) / 86400000);
        out.push(ev);
      }
    }
    return out;
  }

  /* Campaign is over (or no day has a title yet): strip the ribbon, the
     section, AND the Event schema, so the page falls back to the plain
     evergreen admissions landing with no orphaned dates anywhere. */
  function hideAll() {
    var roots = document.querySelectorAll('[data-evt-root]');
    for (var i = 0; i < roots.length; i++) roots[i].remove();
    var ld = document.getElementById('evt-jsonld');
    if (ld) ld.remove();
  }

  function render(ev) {
    var when = formatWhen(ev._date);
    var rel = relativeLabel(ev._diff, ev._date);

    setText('[data-evt="title"]', ev.title);
    setText('[data-evt="when"]', when);
    setText('[data-evt="time"]', ev.time);
    setText('[data-evt="day"]', 'Day ' + ev.day + ' of ' + TOTAL_DAYS);

    /* Urgency chip. More than a week out there is no urgency word, so
       drop the whole pill (wrapper included) rather than leave an empty
       badge floating next to the title. */
    var relNodes = document.querySelectorAll('[data-evt="rel"]');
    for (var r = 0; r < relNodes.length; r++) {
      var node = relNodes[r];
      if (rel) {
        node.textContent = rel;
      } else {
        var wrap = node.closest ? node.closest('[data-evt-rel-wrap]') : null;
        (wrap || node).remove();
      }
    }

    if (ev.blurb) setText('[data-evt="blurb"]', ev.blurb);

    var lists = document.querySelectorAll('[data-evt="bullets"]');
    for (var l = 0; l < lists.length; l++) {
      if (!ev.bullets.length) continue;
      var list = lists[l];
      list.innerHTML = '';
      for (var b = 0; b < ev.bullets.length; b++) {
        var li = document.createElement('li');
        li.textContent = ev.bullets[b];
        list.appendChild(li);
      }
    }

    var url = waUrl(ev, when);
    var waNodes = document.querySelectorAll('[data-evt-wa]');
    for (var w = 0; w < waNodes.length; w++) {
      waNodes[w].setAttribute('href', url);
      waNodes[w].setAttribute(
        'onclick', "return gtag_report_conversion('" + url + "');"
      );
    }

    /* Keep the Event JSON-LD in step with whichever day is showing, so
       a crawler never sees a date the page no longer advertises. */
    var ld = document.getElementById('evt-jsonld');
    if (ld) {
      try {
        var data = JSON.parse(ld.textContent);
        data.name = ev.title + ': Open House at London International School';
        data.startDate = ev.date + 'T09:00:00+05:00';
        data.endDate = ev.date + 'T15:00:00+05:00';
        if (ev.blurb) data.description = ev.blurb;
        ld.textContent = JSON.stringify(data);
      } catch (e) { /* malformed JSON should never blank the page */ }
    }

    /* Fire once so we can see in GA4/Vercel how much of the enroll-page
       traffic actually lands on a live event day. Pushed directly rather
       than via vercel-events.js `track()` — that file is deferred and its
       helper is IIFE-private, so it does not exist yet at this point.
       dataLayer is a queue, so GTM picks this up whenever it initialises. */
    var payload = {
      event_day: ev.day,
      event_title: ev.title,
      event_date: ev.date,
      page: 'enroll'
    };
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: 'open_house_view' }, payload));
    } catch (e) { /* silent */ }
    try {
      if (typeof window.va === 'function') {
        window.va('event', Object.assign({ name: 'open_house_view' }, payload));
      }
    } catch (e) { /* silent */ }
  }

  /* "Can't make that day?" rail. A parent who is busy on the featured
     date is still a live lead, so show the next few days with a
     per-day WhatsApp prefill rather than letting them bounce. */
  function renderUpcoming(rest) {
    var wrap = document.querySelector('[data-evt-upcoming]');
    if (!wrap) return;
    if (!rest.length) { wrap.remove(); return; }

    var list = wrap.querySelector('[data-evt-upcoming-list]');
    list.innerHTML = '';

    for (var i = 0; i < rest.length; i++) {
      var ev = rest[i];
      var when = formatWhen(ev._date);
      var url = waUrl(ev, when);

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'evt-up__item';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('onclick', "return gtag_report_conversion('" + url + "');");
      a.setAttribute('data-wa-cta', 'open-house-upcoming');
      a.setAttribute('data-wa-source', 'enroll-open-house-day-' + ev.day);

      var d = document.createElement('span');
      d.className = 'evt-up__date';
      d.textContent = DAYS[ev._date.getDay()].slice(0, 3) + ' ' +
                      ev._date.getDate() + ' ' + MONTHS[ev._date.getMonth()].slice(0, 3);

      var t = document.createElement('span');
      t.className = 'evt-up__title';
      t.textContent = ev.title;

      var n = document.createElement('span');
      n.className = 'evt-up__day';
      n.textContent = 'Day ' + ev.day;

      a.appendChild(d);
      a.appendChild(t);
      a.appendChild(n);
      li.appendChild(a);
      list.appendChild(li);
    }
    wrap.hidden = false;
  }

  var queue = upcomingEvents();
  if (queue.length) {
    render(queue[0]);
    renderUpcoming(queue.slice(1, 4));
  } else {
    hideAll();
  }

  /* Exposed so the phone CTA copy and any future page can reuse it. */
  window.LIS_EVENT = queue[0] || null;
  window.LIS_EVENT_PHONE = PHONE_DISPLAY;
})();
