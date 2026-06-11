import { useState } from 'react'
import { ArrowLeft, Play, Check, X, Zap, Star, Shield } from 'lucide-react'

// ═══════════════════════════════════════════════
// YOUTUBE ВИДЕО по языкам
// ═══════════════════════════════════════════════
const VIDEOS = {
  1: { // Модуль 1 — Пароли
    ru: 'https://youtu.be/gIqA7pcDYrw',
    kz: 'https://youtu.be/QlRPPrrAk4I',
    en: 'https://youtu.be/aGLEAmh24uY',
  },
  2: { // Модуль 2 — Фишинг
    ru: 'https://youtu.be/pbX_LHuY3Kw',
    kz: 'https://youtu.be/3wk8f-W0MBU',
    en: 'https://youtu.be/zZ8LYGF-yiE',
  }
}

function getYouTubeId(url) {
  const match = url.match(/youtu\.be\/([^?]+)/)
  return match ? match[1] : null
}

// ═══════════════════════════════════════════════
// ДАННЫЕ УРОКОВ
// ═══════════════════════════════════════════════
const lessonData = {
  1: {
    1: {
      title: { ru: 'Реальность которую ты не знал', kz: 'Сен білмеген шындық', en: "Reality you didn't know" },
      steps: [
        {
          type: 'video',
          title: { ru: 'Вводное видео', kz: 'Кіріспе бейне', en: 'Intro video' },
          content: { ru: '', kz: '', en: '' },
          energyCost: 1
        },
        { type: 'card', title: { ru: 'Твой пароль — это ключ', kz: 'Сенің құпия сөзің — сенің кілтің', en: 'Your password is a key' }, content: { ru: 'Email = ключ от всего.\nКто взломал email — взломал всё остальное.\nВосстановление паролей всегда идёт через email.', kz: 'Email = барлығының кілті.\nEmail бұзылса, қалғанының бәрі тез бұзылады.\nҚұпия сөздерді қалпына келтіру әрқашан email арқылы жүреді.', en: 'Email = key to everything.\nWhoever hacks your email — hacks everything.\nPassword recovery always goes through email.' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Как работают хакеры', kz: 'Хакерлер қалай жұмыс істейді', en: 'How hackers work' }, content: { ru: 'Хакерские программы проверяют миллиарды паролей в секунду.\n\nОни знают что люди используют:\n→ Имя + дата рождения\n→ Слова из словаря\n→ Очевидные замены (а→@)\n→ 123 в конце любого слова', kz: 'Хакерлік бағдарламалар секундына миллиардтаған құпия сөздерді тексереді.\n\nОлар адамдардың осы сияқты құпия сөздерді жиі қолданатынын біледі:\n→ Аты + туған күні\n→ Сөздіктегі сөздер\n→ Айқын ауыстырулар (а→@)\n→ Сөздің соңындағы 123', en: 'Hacker programs check billions of passwords per second.\n\nThey know people use:\n→ Name + date of birth\n→ Dictionary words\n→ Obvious substitutions (a→@)\n→ 123 at the end of any word' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Один пароль везде = опасность', kz: 'Барлық жерде бір құпия сөз = қауіп', en: 'One password everywhere = danger' }, content: { ru: 'Один пароль везде =\nодна точка провала.\n\nВзломали один сайт →\nполучили доступ ко всему.\n\nЭто называется\n"цепная реакция взлома"', kz: 'Барлық жерде бір құпия сөз =\nбір сәтсіздік нүктесі.\n\nБір сайтты бұзса →\nбарлық ақпаратқа қол жеткізеді.\n\nБұл "бұзудың тізбекті реакциясы" деп аталады', en: 'One password everywhere =\none point of failure.\n\nHacked one site →\ngot access to everything.\n\nThis is called\n"chain reaction hacking"' }, energyCost: 0 },
        { type: 'truefalse', question: { ru: '"Мне нечего скрывать — хакеры не будут взламывать именно меня"', kz: '"Менің жасырар ештеңем жоқ — хакерлер дәл мені бұзбайды"', en: '"I have nothing to hide — hackers won\'t hack me specifically"' }, answer: false, explanation: { ru: 'Хакеры не выбирают жертв вручную. Программы атакуют всех подряд автоматически.', kz: 'Хакерлер кімді бұзуды қолмен таңдамайды. Бағдарламалар барлығына автоматты түрде шабуыл жасайды.', en: "Hackers don't choose victims manually. Programs attack everyone automatically." }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"Если пароль длиннее 6 символов — он уже надёжный"', kz: '"Егер құпия сөз 6 таңбадан ұзын болса — ол сенімді"', en: '"If a password is longer than 6 characters — it\'s already reliable"' }, answer: false, explanation: { ru: '"aaaaaaaaa" — 9 символов, но взламывается мгновенно. Важна и длина, и разнообразие.', kz: '"aaaaaaaaa" — 9 таңба, бірақ бірден бұзылады. Ұзындық та, әртүрлілік те маңызды.', en: '"aaaaaaaaa" — 9 characters but hacked instantly. Both length and variety matter.' }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"Email — самый важный аккаунт которому нужна максимальная защита"', kz: '"Email — максималды қорғауды қажет ететін ең маңызды аккаунт"', en: '"Email is the most important account that needs maximum protection"' }, answer: true, explanation: { ru: 'Через email восстанавливаются все остальные пароли.', kz: 'Email арқылы қалған барлық құпия сөздер қалпына келтіріледі.', en: 'All other passwords are recovered through email.' }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"Можно дать пароль лучшему другу — ему я доверяю"', kz: '"Жақын досыма құпия сөзімді беруге болады — мен оған сенемін"', en: '"I can give my password to my best friend — I trust him"' }, answer: false, explanation: { ru: 'Дело не в доверии. Он может не защитить пароль — записать, не выйти с чужого устройства.', kz: 'Мәселе сенімде емес. Ол құпия сөзді жазып қою немесе басқа құрылғыдан шықпау арқылы оны қорғамауы мүмкін.', en: "It's not about trust. He may not protect it — write it down, forget to log out elsewhere." }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"Хакерские программы начинают перебор с самых очевидных паролей"', kz: '"Хакерлік бағдарламалар ең оңай және жиі қолданылатын құпия сөздерден бастайды"', en: '"Hacker programs start by trying the most obvious passwords"' }, answer: true, explanation: { ru: 'Словари популярных паролей, имена, даты — первое что проверяют программы.', kz: 'Танымал құпия сөздер сөздігі, аттар, күндер — бағдарлама бірінші тексеретін нәрсе.', en: 'Dictionaries of popular passwords, names, dates — the first thing programs check.' }, energyCost: 1 },
      ]
    },
    2: {
      title: { ru: 'Как думает хакер', kz: 'Хакер қалай ойлайды', en: 'How a hacker thinks' },
      steps: [
        { type: 'card', title: { ru: 'Методы взлома', kz: 'Бұзу әдістері', en: 'Hacking methods' }, content: { ru: 'Словарная атака — перебор слов из словаря.\n\nБрутфорс — перебор всех комбинаций.\n\nУтечка базы — твой пароль уже может быть в открытом доступе.', kz: 'Сөздік шабуылы — сөздіктегі сөздерді теріп табу.\n\nБрутфорс — барлық комбинацияны теру.\n\nДеректер ағуы — сенің құпия сөзің ашық түрде қолжетімді болуы мүмкін.', en: 'Dictionary attack — trying words from a dictionary.\n\nBrute force — trying all combinations.\n\nData breach — your password may already be public.' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Предсказуемые шаблоны', kz: 'Болжамды үлгілер', en: 'Predictable patterns' }, content: { ru: 'Хакеры знают как думают люди:\n→ имя + год → sana2026\n→ слово + 123 → basketball123\n→ Слово + ! → Password!\n→ замены букв → е на 3, а на @', kz: 'Хакерлер адамның қалай ойлайтынын жақсы біледі:\n→ аты + жыл → sana2026\n→ сөз + 123 → basketball123\n→ Сөз + ! → Password!\n→ әріп ауыстыру → е орнына 3, а орнына @', en: 'Hackers know how people think:\n→ name + year → sana2026\n→ word + 123 → basketball123\n→ Word + ! → Password!\n→ letter swaps → 3 for e, @ for a' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Credential stuffing', kz: 'Credential stuffing', en: 'Credential stuffing' }, content: { ru: 'Хакер взломал один сайт и получил твой логин и пароль.\n\nЗатем пробует ту же пару на других сайтах.\n\nЕсли пароль везде одинаковый — взломано всё.', kz: 'Хакер бір сайтты бұзып, логин мен құпия сөзіңді алды.\n\nСосын сол жұпты басқа сайттарда сынайды.\n\nҚұпия сөз барлық жерде бірдей болса — бәрі бұзылды.', en: 'A hacker breached one site and got your login and password.\n\nThen tries the same pair on other sites.\n\nIf the password is the same everywhere — everything is hacked.' }, energyCost: 0 },
        {
          type: 'passwordrank',
          title: { ru: '🎯 Угадай — какой пароль взломают первым?', kz: '🎯 Болжа — қай құпия сөзді алдымен бұзады?', en: '🎯 Guess — which password gets hacked first?' },
          energyCost: 1,
          passwords: [
            { pw: '123456', strength: 1, label: { ru: '💀 Мгновенно (< секунды)', kz: '💀 Бірден (< секунд)', en: '💀 Instantly (< second)' } },
            { pw: 'Sana2008!', strength: 2, label: { ru: '⚠️ За несколько дней', kz: '⚠️ Бірнеше күнде', en: '⚠️ In a few days' } },
            { pw: 'qwerty123', strength: 1, label: { ru: '💀 Мгновенно (в словаре)', kz: '💀 Бірден (сөздікте бар)', en: '💀 Instantly (in dictionary)' } },
            { pw: 'ТауБөріАлматы#88', strength: 5, label: { ru: '🛡️ Сотни лет', kz: '🛡️ Жүздеген жыл', en: '🛡️ Hundreds of years' } },
            { pw: 'P@ssw0rd', strength: 2, label: { ru: '⚠️ За несколько часов', kz: '⚠️ Бірнеше сағатта', en: '⚠️ In a few hours' } },
          ]
        },
        { type: 'quiz', question: { ru: 'Твой пароль «music2009!» утёк. Что делаешь первым?', kz: '«music2009!» құпия сөзің ағып кетті. Алдымен не істейсің?', en: 'Your password "music2009!" leaked. What do you do first?' }, options: { ru: ['Жду пока сайт исправит', 'Меняю только на том сайте', 'Меняю на всех сайтах где использовался', 'Удаляю аккаунт'], kz: ['Сайт түзеткенше күтемін', 'Тек сол сайтта ауыстырамын', 'Барлық сайтта ауыстырамын', 'Аккаунтты жоямын'], en: ['Wait for the site', 'Change only on that site', 'Change on every site it was used', 'Delete the account'] }, correct: 2, explanation: { ru: 'Один утёкший пароль нужно менять везде.', kz: 'Ағып кеткен құпия сөзді барлық жерде ауыстыру керек.', en: 'A leaked password must be changed everywhere.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Почему «P@ssw0rd» слабый несмотря на символы?', kz: 'Неліктен «P@ssw0rd» таңбалар болса да әлсіз?', en: 'Why is "P@ssw0rd" weak despite having symbols?' }, options: { ru: ['Слишком короткий', 'Один из самых известных — хакеры проверяют его первым', 'Нет цифр', 'Нет заглавных'], kz: ['Тым қысқа', 'Ең танымал — хакерлер бірінші тексереді', 'Цифрлар жоқ', 'Бас әріптер жоқ'], en: ['Too short', 'One of the most famous — hackers check it first', 'No digits', 'No capitals'] }, correct: 1, explanation: { ru: 'Популярность делает пароль слабым. Хакеры знают все замены.', kz: 'Танымалдық оны әлсіз етеді. Хакерлер барлық ауыстыруларды біледі.', en: 'Popularity makes it weak. Hackers know all swaps.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Сана придумала «SanaTheCat!». Что не так?', kz: 'Сана «SanaTheCat!» ойлап тапты. Не дұрыс емес?', en: 'Sana made "SanaTheCat!". What is wrong?' }, options: { ru: ['Слишком длинный', 'Имя + предсказуемое слово — легко угадать', 'Нужна цифра', 'Всё хорошо'], kz: ['Тым ұзын', 'Есім + болжамды сөз — оңай табылады', 'Цифр керек', 'Бәрі жақсы'], en: ['Too long', 'Name + predictable word — easy to guess', 'Needs a digit', 'All fine'] }, correct: 1, explanation: { ru: 'Имя и понятные слова делают пароль предсказуемым.', kz: 'Есім мен түсінікті сөздер болжамды етеді.', en: 'A name and obvious words make it predictable.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Как называется атака с украденными паролями с других сайтов?', kz: 'Басқа сайттардан ұрланған құпия сөздермен шабуыл қалай аталады?', en: 'What is the attack using stolen passwords from other sites?' }, options: { ru: ['Брутфорс', 'Словарная атака', 'Credential stuffing', 'Фишинг'], kz: ['Брутфорс', 'Сөздік шабуылы', 'Credential stuffing', 'Фишинг'], en: ['Brute force', 'Dictionary attack', 'Credential stuffing', 'Phishing'] }, correct: 2, explanation: { ru: 'Credential stuffing — автоматическая подстановка украденных пар на разных сайтах.', kz: 'Credential stuffing — ұрланған жұпты әртүрлі сайтта автоматты қою.', en: 'Credential stuffing is automatically trying stolen pairs across sites.' }, energyCost: 1 },
      ]
    },
    3: {
      title: { ru: 'Создай надёжный пароль', kz: 'Сенімді құпия сөз жаса', en: 'Create a strong password' },
      steps: [
        { type: 'card', title: { ru: 'Длина — главное оружие', kz: 'Ұзындық — басты қару', en: 'Length is the main weapon' }, content: { ru: '8 символов → взлом за часы\n10 символов → недели\n12 символов → годы\n16+ символов → века\n\nКаждый символ умножает время взлома.', kz: '8 таңба → сағаттарда бұзылады\n10 таңба → апталар\n12 таңба → жылдар\n16+ таңба → ғасырлар\n\nӘр таңба бұзу уақытын еселейді.', en: '8 characters → cracked in hours\n10 characters → weeks\n12 characters → years\n16+ characters → centuries\n\nEvery character multiplies crack time.' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Формула надёжного пароля', kz: 'Сенімді құпия сөз формуласы', en: 'Strong password formula' }, content: { ru: 'Длина (12+)\n+ заглавные буквы\n+ строчные буквы\n+ цифры\n+ символы (!@#$%^&*)\n+ уникальность для каждого сайта\n= неуязвимый пароль', kz: 'Ұзындық (12+)\n+ бас әріптер\n+ кіші әріптер\n+ цифрлар\n+ таңбалар (!@#$%^&*)\n+ әр сайтқа бірегей\n= бұзылмайтын құпия сөз', en: 'Length (12+)\n+ uppercase\n+ lowercase\n+ digits\n+ symbols (!@#$%^&*)\n+ unique per site\n= unbreakable password' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Метод парольной фразы', kz: 'Сөз тіркесі әдісі', en: 'Passphrase method' }, content: { ru: 'Возьми 3-4 несвязанных слова + цифры + символ:\n\nТауКөлікАлматы#77\nҚысПиццаБөрі$88\n\nЛегко запомнить — почти невозможно взломать.', kz: '3-4 байланыссыз сөз + цифр + таңба:\n\nТауКөлікАлматы#77\nҚысПиццаБөрі$88\n\nЕсте сақтау оңай — бұзу мүмкін емес.', en: '3-4 unrelated words + digits + symbol:\n\nMountainCarAlmaty#77\nWinterPizzaWolf$88\n\nEasy to remember — almost impossible to crack.' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Что НИКОГДА не использовать', kz: 'ЕШҚАШАН қолданбаңыз', en: 'What to NEVER use' }, content: { ru: '✗ Личные данные (имя, дата, город)\n✗ Слова из словаря без изменений\n✗ Очевидные замены (а→@)\n✗ Последовательности (123, abc)\n✗ Повторения (aaaa, 1111)\n✗ Один пароль на нескольких сайтах', kz: '✗ Жеке деректер (есім, күн, қала)\n✗ Сөздіктегі сөздер өзгеріссіз\n✗ Айқын ауыстырулар (а→@)\n✗ Тізбектер (123, abc)\n✗ Қайталаулар (aaaa, 1111)\n✗ Бірнеше сайтта бір құпия сөз', en: '✗ Personal data (name, date, city)\n✗ Plain dictionary words\n✗ Obvious swaps (a→@)\n✗ Sequences (123, abc)\n✗ Repeats (aaaa, 1111)\n✗ One password on several sites' }, energyCost: 0 },
        { type: 'simulator', title: { ru: 'Создай неуязвимый пароль', kz: 'Бұзылмайтын құпия сөз жаса', en: 'Create an unbreakable password' }, energyCost: 1 },
        { type: 'quiz', question: { ru: '«Qwerty!23» — надёжный?', kz: '«Qwerty!23» — сенімді ме?', en: '"Qwerty!23" — reliable?' }, options: { ru: ['Да — все требования', 'Нет — короткий и предсказуемый', 'Да — есть символ', 'Нормально для соцсетей'], kz: ['Иә — барлық талап', 'Жоқ — қысқа әрі болжамды', 'Иә — таңба бар', 'Әлеуметтік желіге жарайды'], en: ['Yes — all requirements', 'No — short and predictable', 'Yes — has symbol', 'Fine for social media'] }, correct: 1, explanation: { ru: 'Короткий и предсказуемый остаётся слабым.', kz: 'Қысқа әрі болжамды әлсіз болып қала береді.', en: 'Short and predictable stays weak.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Какой пароль продержится дольше?', kz: 'Қай құпия сөз ұзақ төтеп береді?', en: 'Which password lasts longest?' }, options: { ru: ['Tr0ub4dor&3', 'ТауКөлікАлматы#77', 'X9#kL2!mQ', 'SuperSecurePassword1!'], kz: ['Tr0ub4dor&3', 'ТауКөлікАлматы#77', 'X9#kL2!mQ', 'SuperSecurePassword1!'], en: ['Tr0ub4dor&3', 'MountainCarAlmaty#77', 'X9#kL2!mQ', 'SuperSecurePassword1!'] }, correct: 1, explanation: { ru: 'Длинная фраза надёжнее короткого сложного пароля.', kz: 'Ұзын сөз тіркесі күрделі қысқа паролден сенімдірек.', en: 'A long passphrase beats a short complex password.' }, energyCost: 1 },
      ]
    },
    4: {
      title: { ru: 'Менеджер паролей', kz: 'Құпия сөз менеджері', en: 'Password manager' },
      steps: [
        { type: 'card', title: { ru: 'Что такое менеджер паролей', kz: 'Құпия сөз менеджері дегеніміз не', en: 'What is a password manager' }, content: { ru: 'Менеджер паролей — это сейф для всех твоих паролей.\n\nТы помнишь ОДИН мастер-пароль, а программа хранит все остальные — длинные и уникальные.', kz: 'Құпия сөз менеджері — барлық құпия сөздерге арналған сейф.\n\nСен БІР мастер-құпия сөзді есте сақтайсың, ал бағдарлама қалғанын сақтайды.', en: 'A password manager is a safe for all your passwords.\n\nYou remember ONE master password, and the app stores the rest.' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Почему это безопасно', kz: 'Неліктен бұл қауіпсіз', en: 'Why it is safe' }, content: { ru: '→ Создаёт случайные пароли (40+ символов)\n→ Хранит их в зашифрованном виде\n→ Сам подставляет пароль на сайтах\n→ Тебе не нужно ничего запоминать', kz: '→ Кездейсоқ құпия сөздер жасайды (40+ таңба)\n→ Оларды шифрланған түрде сақтайды\n→ Сайттарда құпия сөзді өзі қояды\n→ Саған ештеңе есте сақтаудың қажеті жоқ', en: '→ Generates random passwords (40+ chars)\n→ Stores them encrypted\n→ Auto-fills passwords on sites\n→ You don\'t need to remember anything' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Популярные менеджеры', kz: 'Танымал менеджерлер', en: 'Popular managers' }, content: { ru: 'Bitwarden — бесплатный и открытый\nGoogle Менеджер паролей — встроен в браузер\nKeePass — хранит пароли на твоём устройстве\n\nГлавное правило: мастер-пароль должен быть очень надёжным!', kz: 'Bitwarden — тегін әрі ашық кодты\nGoogle құпия сөз менеджері — браузерге кірістірілген\nKeePass — құпия сөзді құрылғыңда сақтайды\n\nБасты ереже: мастер-құпия сөз өте сенімді болуы керек!', en: 'Bitwarden — free and open-source\nGoogle Password Manager — built into browser\nKeePass — stores on your device\n\nMain rule: master password must be very strong!' }, energyCost: 0 },
        { type: 'quiz', question: { ru: 'Сколько паролей запоминать при менеджере?', kz: 'Менеджер пайдаланғанда неше құпия сөз есте сақтау керек?', en: 'How many passwords to remember with a manager?' }, options: { ru: ['Все как обычно', 'Только один — мастер-пароль', 'Ни одного', 'По одному на сайт'], kz: ['Бәрін', 'Тек біреуін — мастер-құпия сөзді', 'Бірде-біреуін', 'Әр сайтқа біреуден'], en: ['All as usual', 'Only one — master password', 'None', 'One per site'] }, correct: 1, explanation: { ru: 'Только мастер-пароль.', kz: 'Тек мастер-құпия сөз.', en: 'Only the master password.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Каким должен быть мастер-пароль?', kz: 'Мастер-құпия сөз қандай болуы керек?', en: 'What should the master password be like?' }, options: { ru: ['Простым чтобы не забыть', 'Очень надёжным — он защищает всё', 'Таким же как на почте', 'Коротким'], kz: ['Қарапайым ұмытпау үшін', 'Өте сенімді — ол бәрін қорғайды', 'Поштадағыдай', 'Қысқа'], en: ['Simple to not forget', 'Very strong — protects everything', 'Same as email', 'Short'] }, correct: 1, explanation: { ru: 'Мастер-пароль — ключ ко всему сейфу.', kz: 'Мастер-құпия сөз — бүкіл сейфтің кілті.', en: 'Master password is the key to the whole safe.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Сана пишет пароли в заметки. Хорошо?', kz: 'Сана парольдерді жазбаларға жазады. Жақсы ма?', en: 'Sana writes passwords in notes app. Good?' }, options: { ru: ['Да удобно', 'Нет — заметки не зашифрованы', 'Да если с паролем', 'Нормально'], kz: ['Иә ыңғайлы', 'Жоқ — жазбалар шифрланбаған', 'Иә телефонда пароль болса', 'Қалыпты'], en: ['Yes convenient', 'No — notes not encrypted', 'Yes if phone locked', 'Fine'] }, correct: 1, explanation: { ru: 'Заметки не зашифрованы. Менеджер хранит в сейфе.', kz: 'Жазбалар шифрланбаған. Менеджер сейфте сақтайды.', en: 'Notes not encrypted. Manager keeps in a safe.' }, energyCost: 1 },
      ]
    },
    5: {
      title: { ru: 'Финальный тест', kz: 'Қорытынды тест', en: 'Final test' },
      steps: [{ type: 'finaltest', energyCost: 0, questions: [
        { q: { ru: 'Письмо: «Аккаунт взломан! Введи пароль по ссылке». Что делаешь?', kz: 'Хат: «Аккаунт бұзылды! Сілтеме арқылы құпия сөзді енгіз». Не істейсің?', en: 'Email: "Account hacked! Enter password via link". What do you do?' }, options: { ru: ['Ввожу пароль', 'Захожу на сайт сам', 'Пересылаю друзьям', 'Отвечаю данными'], kz: ['Енгіземін', 'Сайтқа өзім кіремін', 'Достарға жіберемін', 'Деректеріммен жауап беремін'], en: ['Enter password', 'Go to site myself', 'Forward to friends', 'Reply with data'] }, correct: 1, explanation: { ru: 'Это фишинг. Заходи на сайт сам.', kz: 'Бұл фишинг. Сайтқа өзің кір.', en: 'This is phishing. Go to the site yourself.' } },
        { q: { ru: 'Какой аккаунт защищать важнее всего?', kz: 'Қай аккаунтты қорғау ең маңызды?', en: 'Which account is most important?' }, options: { ru: ['Игровой', 'Email', 'Заметки', 'Все одинаковы'], kz: ['Ойын', 'Email', 'Жазбалар', 'Бәрі бірдей'], en: ['Gaming', 'Email', 'Notes', 'All equal'] }, correct: 1, explanation: { ru: 'Через email восстанавливают все пароли.', kz: 'Email арқылы барлық пароль қалпына келтіріледі.', en: 'Email recovers all other passwords.' } },
        { q: { ru: 'Один пароль везде — чем опасно?', kz: 'Барлық жерде бір пароль — неліктен қауіпті?', en: 'Same password everywhere — why dangerous?' }, options: { ru: ['Ничем если сложный', 'Взлом одного = все остальные', 'Сайты грузятся медленнее', 'Не опасно'], kz: ['Ешнәрсе', 'Бірі бұзылса — барлығы', 'Сайттар баяу жүктеледі', 'Қауіпсіз'], en: ['Nothing if complex', 'One breach = all others', 'Sites load slower', 'Not dangerous'] }, correct: 1, explanation: { ru: 'Один пароль = одна точка провала.', kz: 'Бір пароль = бір сәтсіздік нүктесі.', en: 'One password = one point of failure.' } },
        { q: { ru: 'Самый надёжный пароль?', kz: 'Ең сенімді пароль?', en: 'Strongest password?' }, options: { ru: ['12345678', 'Sana2008', 'ТауКөлікАлматы#77', 'qwerty123'], kz: ['12345678', 'Sana2008', 'ТауКөлікАлматы#77', 'qwerty123'], en: ['12345678', 'Sana2008', 'MountainCarAlmaty#77', 'qwerty123'] }, correct: 2, explanation: { ru: 'Длинная фраза с цифрами и символом.', kz: 'Цифр мен таңбасы бар ұзын сөз тіркесі.', en: 'Long passphrase with digits and symbol.' } },
        { q: { ru: 'Что влияет на надёжность пароля?', kz: 'Құпия сөздің беріктігіне не әсер етеді?', en: 'What affects password strength?' }, options: { ru: ['Длина и разнообразие', 'Имя', 'Год рождения', 'Чем короче'], kz: ['Ұзындық пен әртүрлілік', 'Есім', 'Туған жыл', 'Қысқа'], en: ['Length and variety', 'Name', 'Birth year', 'Shorter better'] }, correct: 0, explanation: { ru: 'Длина и разные типы символов.', kz: 'Ұзындық пен таңба түрлері.', en: 'Length and varied character types.' } },
        { q: { ru: '«P@ssw0rd» надёжный после замен?', kz: '«P@ssw0rd» ауыстырғаннан кейін сенімді ме?', en: '"P@ssw0rd" strong after swaps?' }, options: { ru: ['Да символы спасают', 'Нет — замены известны хакерам', 'Да если добавить !', 'Да стал уникальным'], kz: ['Иә таңбалар құтқарады', 'Жоқ — ауыстырулар хакерлерге таныс', 'Иә ! қоссаң', 'Иә бірегей болды'], en: ['Yes symbols save it', 'No — swaps known to hackers', 'Yes if add !', 'Yes became unique'] }, correct: 1, explanation: { ru: 'Замены давно в словарях хакеров.', kz: 'Ауыстырулар хакер сөздіктерінде бар.', en: 'Swaps are long in hacker dictionaries.' } },
        { q: { ru: 'Зачем менеджер паролей?', kz: 'Пароль менеджері не үшін?', en: 'What is a manager for?' }, options: { ru: ['Не запоминать десятки паролей', 'Ускорить интернет', 'Удалять вирусы', 'Хранить фото'], kz: ['Ондаған парольді есте сақтамау', 'Интернетті жылдамдату', 'Вирустарды жою', 'Фото сақтау'], en: ['Not memorize dozens', 'Speed internet', 'Remove viruses', 'Store photos'] }, correct: 0, explanation: { ru: 'Уникальные пароли без запоминания.', kz: 'Есте сақтамай бірегей пароль.', en: 'Unique passwords without memorizing.' } },
        { q: { ru: 'Мастер-пароль должен быть...', kz: 'Мастер-пароль қандай болуы керек?', en: 'Master password should be...' }, options: { ru: ['Простым', 'Очень надёжным — защищает всё', 'Как на почте', '4 цифры'], kz: ['Қарапайым', 'Өте сенімді — бәрін қорғайды', 'Поштадағыдай', '4 цифр'], en: ['Simple', 'Very strong — protects everything', 'Same as email', '4 digits'] }, correct: 1, explanation: { ru: 'Он открывает весь сейф.', kz: 'Ол бүкіл сейфті ашады.', en: 'It opens the whole safe.' } },
        { q: { ru: 'Пароль в утечке. Первый шаг?', kz: 'Пароль ағып кетті. Бірінші қадам?', en: 'Password in breach. First step?' }, options: { ru: ['Ничего', 'Сменить везде где использовался', 'Написать хакеру', 'Отключить интернет'], kz: ['Ештеңе', 'Қолданған барлық жерде ауыстыру', 'Хакерге жазу', 'Интернетті өшіру'], en: ['Nothing', 'Change everywhere it was used', 'Message hacker', 'Disconnect internet'] }, correct: 1, explanation: { ru: 'Срочно сменить везде.', kz: 'Барлық жерде дереу ауыстыру.', en: 'Change everywhere right away.' } },
        { q: { ru: 'Где хранить пароли безопаснее всего?', kz: 'Парольдерді қайда сақтаған қауіпсіз?', en: 'Safest place to store passwords?' }, options: { ru: ['Заметки', 'Бумажка на мониторе', 'Менеджер паролей', 'Переписка с собой'], kz: ['Жазбалар', 'Монитордағы қағаз', 'Пароль менеджері', 'Өзіммен жазысу'], en: ['Notes', 'Sticky note', 'Password manager', 'Chat with yourself'] }, correct: 2, explanation: { ru: 'Только менеджер в зашифрованном сейфе.', kz: 'Тек менеджер шифрланған сейфте.', en: 'Only manager in an encrypted safe.' } },
      ]}]
    }
  },

  2: {
    1: {
      title: { ru: 'Что такое фишинг?', kz: 'Фишинг дегеніміз не?', en: 'What is phishing?' },
      steps: [
        { type: 'video', title: { ru: 'Вводное видео', kz: 'Кіріспе бейне', en: 'Intro video' }, content: { ru: '', kz: '', en: '' }, energyCost: 1 },
        { type: 'card', title: { ru: 'Что такое фишинг?', kz: 'Фишинг дегеніміз не?', en: 'What is phishing?' }, content: { ru: 'Фишинг — это вид социальной инженерии.\n\nМошенник не ломает систему — он обманывает тебя.\n\nЦели:\n→ Логин и пароль\n→ Данные карты\n→ Личная информация', kz: 'Фишинг — бұл әлеуметтік инженерияның бір түрі.\n\nАлаяқ жүйені бұзбайды — ол сені алдайды.\n\nМақсаты:\n→ Логин мен пароль\n→ Карта деректері\n→ Жеке ақпарат', en: 'Phishing is social engineering.\n\nScammer does not hack — they trick you.\n\nTargets:\n→ Login and password\n→ Card details\n→ Personal info' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Три формы фишинга', kz: 'Фишингтің үш түрі', en: 'Three forms of phishing' }, content: { ru: 'Email-фишинг\nПоддельные письма от банков и соцсетей.\n\nСмишинг (SMS)\n«Ты выиграл!», «Посылка задержана».\n\nВишинг (голос)\nЗвонок от «службы безопасности».', kz: 'Email-фишинг\nБанктар мен желілерден жалған хаттар.\n\nСмишинг (SMS)\n«Ұтып алдың!», «Посылка кідіртілді».\n\nВишинг (дауыс)\n«Қауіпсіздік қызметінен» қоңырау.', en: 'Email phishing\nFake emails from banks and social networks.\n\nSmishing (SMS)\n"You won!", "Parcel delayed".\n\nVishing (voice)\nCall from "security service".' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Почему фишинг работает', kz: 'Фишинг неліктен жұмыс істейді', en: 'Why phishing works' }, content: { ru: 'Три психологических триггера:\n\nСтрах — «Аккаунт заблокирован!»\nДавит на страх потери.\n\nСрочность — «Осталось 24 часа!»\nНе даёт времени подумать.\n\nЖадность — «Ты выиграл iPhone!»\nОтключает критическое мышление.', kz: 'Үш психологиялық триггер:\n\nҚорқыныш — «Аккаунт бұғатталды!»\nЖоғалту қорқынышы.\n\nШұғылдық — «24 сағат қалды!»\nОйлауға уақыт бермейді.\n\nАшкөздік — «iPhone ұтып алдың!»\nСыни ойлауды өшіреді.', en: 'Three psychological triggers:\n\nFear — "Account blocked!"\nFear of loss.\n\nUrgency — "24 hours left!"\nNo time to think.\n\nGreed — "You won iPhone!"\nTurns off critical thinking.' }, energyCost: 0 },
        { type: 'truefalse', question: { ru: '"Фишинг — это вирус через Wi-Fi"', kz: '"Фишинг — Wi-Fi арқылы вирус"', en: '"Phishing is a virus via Wi-Fi"' }, answer: false, explanation: { ru: 'Фишинг — обман, а не вирус. Мошенники заставляют тебя самого отдать данные.', kz: 'Фишинг — алдау, вирус емес. Деректерді өзің беруге мәжбүр етеді.', en: 'Phishing is deception, not a virus. They trick you into giving data.' }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"Банк никогда не попросит номер карты через SMS"', kz: '"Банк SMS арқылы карта нөмірін сұрамайды"', en: '"Bank never asks for card number via SMS"' }, answer: true, explanation: { ru: 'Банки не запрашивают данные карты через сообщения.', kz: 'Банктер хабарламалар арқылы карта деректерін сұрамайды.', en: 'Banks never request card details through messages.' }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"Срочность и страх — признаки фишинга"', kz: '"Шұғылдық пен қорқыныш — фишинг белгісі"', en: '"Urgency and fear are phishing signs"' }, answer: true, explanation: { ru: 'Настоящие организации не угрожают и не создают срочность.', kz: 'Нақты ұйымдар қорқытпайды.', en: 'Real organisations do not threaten or create urgency.' }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"Нажал на фишинг но не вводил — всё безопасно"', kz: '"Фишингке бастым бірақ деректер енгізбедім — қауіпсіз"', en: '"Clicked phishing but entered nothing — safe"' }, answer: false, explanation: { ru: 'Некоторые сайты устанавливают вредоносное ПО при открытии.', kz: 'Кейбір сайттар ашылуда зиянды бағдарлама орнатады.', en: 'Some sites install malware just by opening.' }, energyCost: 1 },
      ]
    },
    2: {
      title: { ru: 'Как распознать мошенничество', kz: 'Алаяқтықты қалай анықтауға болады', en: 'How to recognise a scam' },
      steps: [
        { type: 'card', title: { ru: '5 признаков фишинга', kz: 'Фишингтің 5 белгісі', en: '5 signs of phishing' }, content: { ru: '1. Срочность и угрозы\n«Аккаунт будет удалён!»\n\n2. Подозрительный адрес\nsupport@paypa1.com\n\n3. Ссылка ведёт не туда\nТекст одно — реальный адрес другой\n\n4. Просьба ввести пароль\nЛегитимный сервис не просит\n\n5. Грамматические ошибки', kz: '1. Шұғылдық пен қорқыту\n«Аккаунт жойылады!»\n\n2. Күдікті мекенжай\nsupport@paypa1.com\n\n3. Сілтеме дұрыс жерге апармайды\n\n4. Пароль сұрату\nЗаңды сервис сұрамайды\n\n5. Грамматикалық қателер', en: '1. Urgency and threats\n"Account will be deleted!"\n\n2. Suspicious address\nsupport@paypa1.com\n\n3. Link goes elsewhere\n\n4. Request for password\nNo legit service asks\n\n5. Grammar mistakes' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Как проверить ссылку', kz: 'Сілтемені қалай тексеру керек', en: 'How to check a link' }, content: { ru: 'Наведи курсор на ссылку.\nВнизу браузера появится реальный адрес.\n\nНастоящий: instagram.com/login\nПоддельный: instagram-verify.xyz/login\n\nОбманчивые приёмы:\n→ paypa1.com, g00gle.com\n→ instagram-support.com\n→ .xyz вместо .com', kz: 'Сілтемеге курсор апар.\nБраузердің төменінде нақты мекенжай пайда болады.\n\nНақты: instagram.com/login\nЖалған: instagram-verify.xyz/login\n\nАлдамшы тәсілдер:\n→ paypa1.com, g00gle.com\n→ instagram-support.com\n→ .xyz', en: 'Hover cursor over the link.\nReal address appears at bottom of browser.\n\nReal: instagram.com/login\nFake: instagram-verify.xyz/login\n\nDeceptive tricks:\n→ paypa1.com, g00gle.com\n→ instagram-support.com\n→ .xyz instead of .com' }, energyCost: 0 },
        {
          type: 'phishingdetect',
          title: { ru: '🔍 Найди признаки фишинга!', kz: '🔍 Фишинг белгілерін тап!', en: '🔍 Find the phishing signs!' },
          energyCost: 2,
          email: {
            from: { ru: 'support@kaspi-bank-help.com', kz: 'support@kaspi-bank-help.com', en: 'support@kaspi-bank-help.com' },
            subject: { ru: '⚠️ Ваш аккаунт будет заблокирован через 24 часа!!!', kz: '⚠️ Аккаунтыңыз 24 сағаттан кейін бұғатталады!!!', en: '⚠️ Your account will be blocked in 24 hours!!!' },
            body: {
              ru: 'Уважаемый пользователь!\n\nМы обнаружели подозрительную активность на вашем аккаунте. Вы должны срочно подтвердить свою личность иначе аккаунт будет удалён НАВСЕГДА.\n\nНажмите кнопку ниже и введите пароль:\n[ВОЙТИ СЕЙЧАС] → kaspi-secure-login.xyz\n\nОсталось времени: 24 ЧАСА!!!\n\nС уважением, Служба безопасности Kaspi',
              kz: 'Құрметті пайдаланушы!\n\nБіз аккаунтыңызда күдікті белсенділік таптық. Жеке басыңызды дереу растауыңыз керек, әйтпесе аккаунт МӘҢГІГЕ жойылады.\n\nТөмендегі батырмаға басып, парольді енгізіңіз:\n[ҚАЗІР КІР] → kaspi-secure-login.xyz\n\nҚалған уақыт: 24 САҒАТ!!!\n\nҚұрметпен, Kaspi қауіпсіздік қызметі',
              en: 'Dear user!\n\nWe have detected suspicious activity on your account. You must urgently verify your identity otherwise the account will be deleted FOREVER.\n\nClick the button below and enter your password:\n[LOGIN NOW] → kaspi-secure-login.xyz\n\nTime remaining: 24 HOURS!!!\n\nRegards, Kaspi Security Service'
            },
            clues: [
              { id: 'sender', zone: 'from', label: { ru: '🚩 Подозрительный отправитель', kz: '🚩 Күдікті жіберуші', en: '🚩 Suspicious sender' }, hint: { ru: 'kaspi-bank-help.com — НЕ официальный домен Kaspi! Настоящий: kaspi.kz', kz: 'kaspi-bank-help.com — Kaspi-нің ресми домені ЕМЕС! Нақтысы: kaspi.kz', en: 'kaspi-bank-help.com is NOT the official Kaspi domain! Real: kaspi.kz' } },
              { id: 'urgency', zone: 'subject', label: { ru: '🚩 Срочность и угроза', kz: '🚩 Шұғылдық пен қорқыту', en: '🚩 Urgency and threat' }, hint: { ru: '«24 часа» + «!!!» — классический приём давления. Настоящие сервисы так не пишут!', kz: '«24 сағат» + «!!!» — классикалық қысым тәсілі. Нақты сервистер бұлай жазбайды!', en: '"24 hours" + "!!!" — classic pressure tactic. Real services never write like this!' } },
              { id: 'link', zone: 'body', label: { ru: '🚩 Поддельная ссылка', kz: '🚩 Жалған сілтеме', en: '🚩 Fake link' }, hint: { ru: 'kaspi-secure-login.xyz — НЕ настоящий Kaspi! Настоящий: kaspi.kz', kz: 'kaspi-secure-login.xyz — нақты Kaspi ЕМЕС! Нақтысы: kaspi.kz', en: 'kaspi-secure-login.xyz is NOT real Kaspi! Real: kaspi.kz' } },
              { id: 'typo', zone: 'body', label: { ru: '🚩 Грамматическая ошибка', kz: '🚩 Грамматикалық қате', en: '🚩 Grammar mistake' }, hint: { ru: '«обнаружели» вместо «обнаружили» — мошенники часто делают ошибки!', kz: 'Орфографиялық қате — алаяқтар жиі қате жасайды!', en: '"Detected" misspelled — scammers often make mistakes!' } },
            ]
          }
        },
        { type: 'quiz', question: { ru: 'Подозрительный email адрес?', kz: 'Күдікті email мекенжай?', en: 'Suspicious email address?' }, options: { ru: ['noreply@kaspi.kz', 'security@accounts.google.com', 'support@kaspi-bank-help.com', 'info@instagram.com'], kz: ['noreply@kaspi.kz', 'security@accounts.google.com', 'support@kaspi-bank-help.com', 'info@instagram.com'], en: ['noreply@kaspi.kz', 'security@accounts.google.com', 'support@kaspi-bank-help.com', 'info@instagram.com'] }, correct: 2, explanation: { ru: 'kaspi-bank-help.com не принадлежит Kaspi.', kz: 'kaspi-bank-help.com Kaspi-ге тиесілі емес.', en: 'kaspi-bank-help.com does not belong to Kaspi.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Что значит «создание срочности» в фишинге?', kz: 'Фишингте «шұғылдық тудыру» дегеніміз не?', en: 'What is "creating urgency" in phishing?' }, options: { ru: ['Ночью пишут', 'Ограничивают время чтобы не проверить', 'Быстро отправляют', 'Ссылка работает пару часов'], kz: ['Түнде жазады', 'Тексермес үшін уақытты шектейді', 'Тез жіберіледі', 'Сілтеме бірнеше сағат жұмыс істейді'], en: ['Night messages', 'Limit time so you cannot verify', 'Sent quickly', 'Link works hours'] }, correct: 1, explanation: { ru: 'Давят на страх — нет времени думать.', kz: 'Қорқынышқа қысым — ойлауға уақыт жоқ.', en: 'Presses on fear — no time to think.' }, energyCost: 1 },
      ]
    },
    3: {
      title: { ru: 'Симулятор фишинга', kz: 'Фишинг симуляторы', en: 'Phishing simulator' },
      steps: [
        { type: 'card', title: { ru: 'Как действовать при атаке', kz: 'Шабуыл кезінде қалай әрекет ету', en: 'How to act under attack' }, content: { ru: 'Письмо с угрозой блокировки\n→ Зайди вручную, не по ссылке\n\nЗвонок от «банка» — назвать код\n→ Положи трубку, позвони сам\n\nСообщение от «друга»\n→ Проверь по звонку напрямую\n\nНикогда не спеши!', kz: 'Бұғаттау қаупі бар хат\n→ Сілтеме арқылы емес, қолмен кір\n\n«Банктен» код сұраған қоңырау\n→ Тұтқаны қой, өзің қоңырау шал\n\n«Достан» хабарлама\n→ Тікелей қоңырау арқылы тексер\n\nЕшқашан асықпа!', en: 'Threatening email\n→ Go manually, not via link\n\nCall asking for code\n→ Hang up, call yourself\n\nMessage from "friend"\n→ Verify by calling directly\n\nNever rush!' }, energyCost: 0 },
        {
          type: 'callsimulator',
          title: { ru: '📞 Симулятор звонка мошенника', kz: '📞 Алаяқ қоңырауының симуляторы', en: '📞 Scam call simulator' },
          energyCost: 2,
          scenarios: [
            {
              caller: { ru: '"Служба безопасности Kaspi"', kz: '"Kaspi қауіпсіздік қызметі"', en: '"Kaspi Security Service"' },
              avatar: '🏦',
              message: { ru: 'Здравствуйте! С вашего аккаунта пытаются снять 50 000 тг. Чтобы остановить транзакцию, пожалуйста, назовите мне SMS-код который сейчас придёт на ваш телефон.', kz: 'Сәлем! Сіздің аккаунтыңыздан 50 000 тг алынуға тырысылуда. Транзакцияны тоқтату үшін телефоныңызға қазір келетін SMS-кодты айтыңыз.', en: 'Hello! Someone is trying to withdraw 50,000 KZT from your account. To stop the transaction, please tell me the SMS code that will arrive on your phone now.' },
              options: [
                { text: { ru: '📢 Называю код — хочу остановить транзакцию!', kz: '📢 Кодты айтамын — транзакцияны тоқтатқым келеді!', en: '📢 Tell the code — want to stop the transaction!' }, correct: false, feedback: { ru: '❌ ОШИБКА! Это мошенник! Банки НИКОГДА не звонят и не просят SMS-код. Ты только что дал доступ к аккаунту!', kz: '❌ ҚАТЕ! Бұл алаяқ! Банктер ешқашан қоңырау шалып SMS-кодты СҰРАМАЙДЫ. Сен аккаунтқа кіруге жол аштың!', en: '❌ WRONG! This is a scammer! Banks NEVER call and ask for SMS codes. You just gave access to your account!' } },
                { text: { ru: '⏸️ Прошу подождать — позвоню сам в Kaspi', kz: '⏸️ Күтуін сұраймын — Kaspi-ге өзім қоңырау шаламын', en: '⏸️ Ask to wait — I will call Kaspi myself' }, correct: false, feedback: { ru: '⚠️ Лучше чем дать код, но не идеально. Мошенник будет ждать пока ты не передумаешь. Правильнее — сразу повесить трубку!', kz: '⚠️ Кодты беруден жақсы, бірақ мінсіз емес. Алаяқ ойыңды өзгертпегенше күтеді. Дұрысы — тұтқаны дереу қою!', en: '⚠️ Better than giving code, but not perfect. Scammer will wait until you change your mind. Correct — hang up immediately!' } },
                { text: { ru: '✅ Кладу трубку и сам звоню в Kaspi по номеру на карте', kz: '✅ Тұтқаны қойып Kaspi-ге карточкадағы нөмірмен өзім қоңырау шаламын', en: '✅ Hang up and call Kaspi myself via number on my card' }, correct: true, feedback: { ru: '✅ ПРАВИЛЬНО! Повесь трубку и перезвони по официальному номеру. Настоящий Kaspi никогда не просит SMS-код по телефону!', kz: '✅ ДҰРЫС! Тұтқаны қойып ресми нөмірге өзің қоңырау шал. Нақты Kaspi телефон арқылы SMS-кодты ешқашан сұрамайды!', en: '✅ CORRECT! Hang up and call back via official number. Real Kaspi never asks for SMS code over the phone!' } },
                { text: { ru: '❓ Спрашиваю как они узнали мой номер', kz: '❓ Нөмірімді қалай білгенін сұраймын', en: '❓ Ask how they got my number' }, correct: false, feedback: { ru: '❌ Не трать время! Мошенники покупают базы номеров телефонов. Просто повесь трубку!', kz: '❌ Уақытты босқа өткізбе! Алаяқтар телефон нөмірлерінің базасын сатып алады. Тұтқаны қой!', en: '❌ Do not waste time! Scammers buy phone number databases. Just hang up!' } },
              ]
            },
            {
              caller: { ru: 'Неизвестный номер', kz: 'Белгісіз нөмір', en: 'Unknown number' },
              avatar: '❓',
              message: { ru: 'Привет! Я из Министерства образования. Поздравляю! Вы выиграли грант на обучение — 200 000 тенге. Для получения нужно только назвать данные карты: номер, срок и CVV.', kz: 'Сәлем! Мен Білім министрлігінен. Құттықтаймын! Сіз оқуға арналған грант ұтып алдыңыз — 200 000 теңге. Алу үшін карта деректерін айту жеткілікті: нөмірі, мерзімі және CVV.', en: 'Hi! I am from the Ministry of Education. Congratulations! You won an education grant — 200,000 tenge. To receive it, just tell me your card details: number, expiry and CVV.' },
              options: [
                { text: { ru: '💳 Называю данные карты — это же деньги!', kz: '💳 Карта деректерін айтамын — бұл ақша ғой!', en: '💳 Tell card details — it is money after all!' }, correct: false, feedback: { ru: '❌ CVV и номер карты — это прямой доступ к твоим деньгам! Никогда не называй их незнакомым людям!', kz: '❌ CVV мен карта нөмірі — ақшаңа тікелей кіру! Оларды бейтаныс адамдарға ешқашан айтпа!', en: '❌ CVV and card number give direct access to your money! Never tell them to strangers!' } },
                { text: { ru: '✅ Вешаю трубку — никакого гранта не ожидал', kz: '✅ Тұтқаны қоямын — ешқандай грант күтпедім', en: '✅ Hang up — did not expect any grant' }, correct: true, feedback: { ru: '✅ ПРАВИЛЬНО! Неожиданные призы и гранты по телефону — классическое мошенничество. Вешай трубку!', kz: '✅ ДҰРЫС! Телефон арқылы күтпеген сыйлықтар мен гранттар — классикалық алаяқтық. Тұтқаны қой!', en: '✅ CORRECT! Unexpected prizes and grants over phone — classic scam. Hang up!' } },
                { text: { ru: '❓ Спрашиваю почему нужен CVV', kz: '❓ CVV не үшін керек деп сұраймын', en: '❓ Ask why they need CVV' }, correct: false, explanation: { ru: 'Объяснение будет убедительным — мошенники обучены на это. Лучше сразу повесить трубку!', kz: 'Түсіндірмесі сенімді болады — алаяқтар бұған үйретілген. Тұтқаны дереу қою жақсы!', en: 'Explanation will be convincing — scammers are trained for this. Better to hang up right away!' }, feedback: { ru: '❌ Ни одна организация в мире не просит CVV для ПОЛУЧЕНИЯ денег. Это 100% мошенничество!', kz: '❌ Дүниежүзінде ешбір ұйым ақша АЛУ үшін CVV сұрамайды. Бұл 100% алаяқтық!', en: '❌ No organisation in the world asks for CVV to RECEIVE money. This is 100% fraud!' } },
              ]
            }
          ]
        },
        { type: 'quiz', question: { ru: '«Арман» просит логин ВКонтакте. Что делаешь?', kz: '«Арман» ВКонтакте логинін сұрайды. Не істейсің?', en: '"Arman" asks for VK login. What do you do?' }, options: { ru: ['Ввожу — помогу другу', 'Пишу Арману напрямую другим способом', 'Удаляю сообщение', 'Захожу посмотреть'], kz: ['Енгіземін — досыма көмектесемін', 'Арманға тікелей басқа жолмен жазамын', 'Хабарламаны жоямын', 'Сайтты қарауға өтемін'], en: ['Enter — help friend', 'Write to Arman directly via another way', 'Delete message', 'Go to see'] }, correct: 1, explanation: { ru: 'Аккаунт мог быть взломан. Проверяй через другой канал — позвони или напиши напрямую.', kz: 'Аккаунт бұзылған болуы мүмкін. Басқа арна арқылы тексер — қоңырау шал немесе тікелей жаз.', en: 'Account may be hacked. Verify through another channel — call or message directly.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Незнакомый просит SMS-код от Kaspi. Что делаешь?', kz: 'Бейтаныс Kaspi SMS кодын сұрайды. Не істейсің?', en: 'Unknown asks Kaspi SMS code. What do you do?' }, options: { ru: ['Диктую — спасу деньги', 'Кладу трубку, звоню в банк сам', 'Прошу подождать', 'Записываю'], kz: ['Айтамын — ақшаны құтқарамын', 'Тұтқаны қойып, банкке өзім қоңырау шаламын', 'Күтуін сұраймын', 'Жазып аламын'], en: ['Read it — save money', 'Hang up, call bank myself', 'Ask to wait', 'Record it'] }, correct: 1, explanation: { ru: 'Банки НИКОГДА не просят SMS-код. Это вишинг.', kz: 'Банктер SMS кодын ЕШҚАШАН сұрамайды. Бұл вишинг.', en: 'Banks NEVER ask for SMS codes. This is vishing.' }, energyCost: 1 },
      ]
    },
    4: {
      title: { ru: 'Финальный тест — Фишинг', kz: 'Қорытынды тест — Фишинг', en: 'Final test — Phishing' },
      steps: [{ type: 'finaltest', energyCost: 0, questions: [
        { q: { ru: 'TikTok: «Нарушил правила, перейди по ссылке». Что делаешь?', kz: 'TikTok: «Ережелерді бұздың, сілтемеге өт». Не істейсің?', en: 'TikTok: "Violated rules, go via link". What do you do?' }, options: { ru: ['Перехожу', 'Удаляю и захожу напрямую на TikTok', 'Пересылаю другу', 'Отвечаю'], kz: ['Өтемін', 'Жоямын да TikTok-қа тікелей кіремін', 'Достыма жіберемін', 'Жауап беремін'], en: ['Go', 'Delete and go directly to TikTok', 'Forward to friend', 'Reply'] }, correct: 1, explanation: { ru: 'Всегда заходи напрямую — никогда по ссылкам из сообщений.', kz: 'Әрқашан тікелей кір — хабарламалардағы сілтемелер арқылы ешқашан.', en: 'Always go directly — never via links from messages.' } },
        { q: { ru: 'Незнакомый говорит карта заблокирована, просит SMS-код. Твои действия?', kz: 'Бейтаныс карта бұғатталды дейді, SMS код сұрайды. Не істейсің?', en: 'Unknown says card blocked, asks SMS code. What do you do?' }, options: { ru: ['Диктую', 'Говорю перезвоню', 'Кладу трубку, звоню в банк', 'Жду'], kz: ['Айтамын', 'Қайта қоңырау шаламын деймін', 'Тұтқаны қойып банкке қоңырау шаламын', 'Күтемін'], en: ['Read it', 'Say I will call back', 'Hang up, call bank', 'Wait'] }, correct: 2, explanation: { ru: 'Банки не просят SMS-код. Перезванивай по официальному номеру.', kz: 'Банктер SMS код сұрамайды. Ресми нөмірге өзің қоңырау шал.', en: 'Banks never ask for SMS code. Call official number yourself.' } },
        { q: { ru: 'Подозрительный адрес отправителя?', kz: 'Күдікті жіберуші мекенжайы?', en: 'Suspicious sender address?' }, options: { ru: ['noreply@kaspi.kz', 'security@accounts.google.com', 'support@kaspi-bank-help.com', 'info@instagram.com'], kz: ['noreply@kaspi.kz', 'security@accounts.google.com', 'support@kaspi-bank-help.com', 'info@instagram.com'], en: ['noreply@kaspi.kz', 'security@accounts.google.com', 'support@kaspi-bank-help.com', 'info@instagram.com'] }, correct: 2, explanation: { ru: 'kaspi-bank-help.com не принадлежит Kaspi. Настоящий домен: kaspi.kz', kz: 'kaspi-bank-help.com Kaspi-ге тиесілі емес. Нақты домен: kaspi.kz', en: 'kaspi-bank-help.com does not belong to Kaspi. Real domain: kaspi.kz' } },
        { q: { ru: '«Ты 1000-й посетитель! Нажми для приза!»', kz: '«Сен 1000-шы келуші! Сыйлық үшін бас!»', en: '"You are 1000th visitor! Press for prize!"' }, options: { ru: ['Честная акция', 'Классический фишинг', 'Возможно настоящее', 'Зависит от суммы'], kz: ['Адал акция', 'Классикалық фишинг', 'Мүмкін нақты', 'Сомаға байланысты'], en: ['Fair promotion', 'Classic phishing', 'Possibly real', 'Depends'] }, correct: 1, explanation: { ru: 'Неожиданные призы — классический фишинговый приём.', kz: 'Күтпеген сыйлықтар — классикалық фишинг тәсілі.', en: 'Unexpected prizes are a classic phishing tactic.' } },
        { q: { ru: 'Сана прислала «Смотри что про тебя» + ссылка. Что делаешь?', kz: 'Сана «Сен туралы қара» + сілтеме жіберді. Не істейсің?', en: 'Sana sent "Look what they wrote" + link. What do you do?' }, options: { ru: ['Перехожу', 'Только если близкий друг', 'Спрашиваю Сану напрямую другим способом', 'Блокирую'], kz: ['Өтемін', 'Тек жақын дос болса', 'Санадан басқа жолмен тікелей сұраймын', 'Бұғаттаймын'], en: ['Go', 'Only if close friend', 'Ask Sana directly via another way', 'Block'] }, correct: 2, explanation: { ru: 'Аккаунт Саны мог быть взломан. Проверяй через другой канал — позвони.', kz: 'Сананың аккаунты бұзылған болуы мүмкін. Басқа арна арқылы тексер — қоңырау шал.', en: "Sana's account may be hacked. Verify through another channel — call." } },
        { q: { ru: 'Чем опасны bit.ly в подозрительных сообщениях?', kz: 'Күдікті хабарламалардағы bit.ly неліктен қауіпті?', en: 'Why dangerous bit.ly in suspicious messages?' }, options: { ru: ['Медленнее загружаются', 'Скрывают реальный адрес сайта', 'Только на телефоне работают', 'Не опасны'], kz: ['Баяу жүктеледі', 'Нақты сайт мекенжайын жасырады', 'Тек телефонда жұмыс істейді', 'Қауіпсіз'], en: ['Load slower', 'Hide real site address', 'Phone only', 'Not dangerous'] }, correct: 1, explanation: { ru: 'Укороченные ссылки скрывают настоящий URL — можно попасть на фишинговый сайт.', kz: 'Қысқартылған сілтемелер нақты URL-ді жасырады — фишинг сайтына түсуге болады.', en: 'Shortened links hide the real URL — you can end up on a phishing site.' } },
        { q: { ru: 'Что такое «вишинг»?', kz: '«Вишинг» дегеніміз не?', en: 'What is "vishing"?' }, options: { ru: ['Фишинг через Wi-Fi', 'Телефонное мошенничество голосом', 'Взлом через видео', 'Фишинг через SMS'], kz: ['Wi-Fi арқылы фишинг', 'Дауыспен телефондық алаяқтық', 'Видео арқылы бұзу', 'SMS арқылы фишинг'], en: ['Phishing via Wi-Fi', 'Voice telephone fraud', 'Hacking via video', 'Phishing via SMS'] }, correct: 1, explanation: { ru: 'Вишинг — мошенничество через голосовые телефонные звонки.', kz: 'Вишинг — дауыстық телефон қоңыраулары арқылы алаяқтық.', en: 'Vishing — fraud via voice telephone calls.' } },
        { q: { ru: 'Подозрительное письмо от банка — куда обращаться?', kz: 'Банктен күдікті хат — қайда жүгіну?', en: 'Suspicious email from bank — where to go?' }, options: { ru: ['Ответить в письмо', 'По номеру из письма', 'По официальному номеру с сайта банка или карты', 'Удалить'], kz: ['Хатқа жауап беру', 'Хаттағы нөмір', 'Банктің сайтынан немесе карточкадан ресми нөмір', 'Жою'], en: ['Reply to email', 'Number from email', 'Official number from bank website or card', 'Delete'] }, correct: 2, explanation: { ru: 'Только официальные контакты банка — с обратной стороны карты или официального сайта.', kz: 'Тек банктің ресми байланыс деректері — карточканың артынан немесе ресми сайттан.', en: 'Only official bank contacts — from back of card or official website.' } },
        { q: { ru: 'Дина ввела пароль на поддельном сайте. Первое что делать?', kz: 'Дина жалған сайтқа пароль енгізді. Алдымен не?', en: 'Dina entered password on fake site. First thing?' }, options: { ru: ['Подождать и посмотреть', 'Сменить пароль на настоящем сайте и включить 2FA', 'Написать на поддельный сайт', 'Поменять email'], kz: ['Күтіп қарау', 'Нақты сайтта паролін ауыстырып 2FA қосу', 'Жалған сайтқа жазу', 'Email ауыстыру'], en: ['Wait and see', 'Change password on real site and enable 2FA', 'Write to fake site', 'Change email'] }, correct: 1, explanation: { ru: 'Срочно смени пароль на настоящем сайте. 2FA добавит дополнительную защиту.', kz: 'Нақты сайтта парольді дереу ауыстыр. 2FA қосымша қорғаныс береді.', en: 'Urgently change password on real site. 2FA adds extra protection.' } },
        { q: { ru: 'Нажал на подозрительную ссылку. Что делать?', kz: 'Күдікті сілтемеге бастым. Не істеу керек?', en: 'Clicked suspicious link. What to do?' }, options: { ru: ['Ничего если не вводил данные', 'Подождать несколько дней', 'Закрыть вкладку, ничего не вводить, проверить антивирусом', 'Перезагрузить браузер'], kz: ['Ештеңе — деректер енгізбедім', 'Бірнеше күн күту', 'Қосымшаны жауып, ештеңе енгізбей, антивируспен тексеру', 'Браузерді қайта жүктеу'], en: ['Nothing if entered no data', 'Wait a few days', 'Close tab, enter nothing, run antivirus', 'Reload browser'] }, correct: 2, explanation: { ru: 'Некоторые сайты устанавливают вирусы просто при открытии. Сразу закрой и проверь.', kz: 'Кейбір сайттар тек ашылуда вирус орнатады. Дереу жауып тексер.', en: 'Some sites install malware just by opening. Close immediately and scan.' } },
      ]}]
    }
  },

  3: {
    1: {
      title: { ru: 'Что опасно публиковать', kz: 'Не жариялау қауіпті', en: 'What is dangerous to publish' },
      steps: [
        { type: 'card', title: { ru: 'Цифровой след', kz: 'Цифрлық із', en: 'Digital footprint' }, content: { ru: 'Всё что ты публикуешь — остаётся навсегда.\n\nДаже если удалишь пост — кто-то уже сделал скриншот.\nДаже если аккаунт закрытый — данные могут утечь.\n\nТвой цифровой след формируется каждый день.', kz: 'Жариялаған барлық нәрсе — мәңгіге қалады.\n\nПостты жойсаң да — кімдір скриншот жасап үлгерді.\nАккаунт жабық болса да — деректер ағуы мүмкін.\n\nЦифрлық ізің күн сайын қалыптасады.', en: 'Everything you publish stays forever.\n\nEven if you delete a post — someone already screenshotted it.\nEven if account is private — data can leak.\n\nYour digital footprint forms every day.' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Что НЕЛЬЗЯ публиковать', kz: 'Не жариялауға БОЛМАЙДЫ', en: 'What NOT to publish' }, content: { ru: '✗ Домашний адрес и адрес школы\n✗ Расписание — когда тебя нет дома\n✗ Фото документов\n✗ Геолокация в реальном времени\n✗ Номер телефона в открытом доступе\n✗ Фото с чужими без разрешения', kz: '✗ Үй мекенжайы мен мектеп мекенжайы\n✗ Сабақ кестесі — үйде жоқ кезіңді көрсетеді\n✗ Құжаттардың суреттері\n✗ Нақты уақыттағы геолокация\n✗ Ашық қолжетімді телефон нөмірі\n✗ Рұқсатсыз басқалардың суреттері', en: '✗ Home address and school address\n✗ Schedule — when you are away\n✗ Photos of documents\n✗ Real-time geolocation\n✗ Phone number in public profile\n✗ Photos of others without permission' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Геолокация — скрытая угроза', kz: 'Геолокация — жасырын қауіп', en: 'Geolocation — hidden threat' }, content: { ru: 'Фото могут содержать точные координаты.\n\nПо геотегу можно узнать:\n→ Где ты живёшь (домашние фото)\n→ Где учишься (фото со школы)\n→ Твой привычный маршрут\n\nВсегда отключай геолокацию для камеры!', kz: 'Суреттерде нақты координаттар болуы мүмкін.\n\nГеотег арқылы білуге болады:\n→ Қайда тұрасың (үй суреттері)\n→ Қайда оқисың (мектеп суреттері)\n→ Қандай маршрутпен жүресің\n\nКамераның геолокациясын әрқашан өшір!', en: 'Photos may contain exact coordinates.\n\nFrom geotag can learn:\n→ Where you live (home photos)\n→ Where you study (school photos)\n→ Your usual route\n\nAlways turn off geolocation for camera!' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Правило перед публикацией', kz: 'Жариялаудан бұрынғы ереже', en: 'Rule before publishing' }, content: { ru: 'Перед публикацией задай 3 вопроса:\n\n1. Могут ли эти данные помочь незнакомцу найти меня?\n2. Комфортно ли мне если это увидят все?\n3. Не навредит ли это мне через год?\n\nЕсли сомневаешься — не публикуй.', kz: 'Жарияламас бұрын 3 сұрақ қой:\n\n1. Бұл ақпарат бейтаныс адамға мені табуға көмектесе ме?\n2. Бұны барлығы көрсе, өзімді жайсыз сезінемін бе?\n3. Бір жылдан кейін бұл маған зиян келтіруі мүмкін бе?\n\nКүмәндансаң — жариялама.', en: 'Before publishing ask 3 questions:\n\n1. Can this data help a stranger find me?\n2. Am I comfortable if everyone sees this?\n3. Will this hurt me in a year?\n\nIf you doubt — do not publish.' }, energyCost: 0 },
        { type: 'safepublish', title: { ru: 'Безопасно или опасно?', kz: 'Қауіпсіз бе әлде қауіпті ме?', en: 'Safe or dangerous?' }, energyCost: 2, items: [
          { text: { ru: '📸 Фото еды в кафе без геотега', kz: '📸 Геотегсіз кафедегі тамақ суреті', en: '📸 Food photo in cafe without geotag' }, safe: true, explanation: { ru: 'Фото еды без геотега не раскрывает личную информацию.', kz: 'Геотегсіз тамақ суреті жеке ақпаратты ашпайды.', en: 'Food photo without geotag reveals no personal info.' } },
          { text: { ru: '🏠 «Наш новый дом!» с видом улицы', kz: '🏠 «Жаңа үйіміз!» көше көрінісімен', en: '🏠 "Our new home!" with street view' }, safe: false, explanation: { ru: 'По фасаду здания и вывескам можно определить точный адрес.', kz: 'Ғимарат фасады мен жарнамалар бойынша нақты мекенжайды анықтауға болады.', en: 'Building facade and signs can reveal exact address.' } },
          { text: { ru: '⏰ «Иду в школу в 8:00 как всегда»', kz: '⏰ «Мектепке 8:00-де бара жатырмын»', en: '⏰ "Going to school at 8:00 as always"' }, safe: false, explanation: { ru: 'Расписание показывает когда тебя нет дома.', kz: 'Кесте үйде жоқ кезді көрсетеді.', en: 'Schedule shows when you are away.' } },
          { text: { ru: '🌅 Закат без указания места', kz: '🌅 Орын белгіленбеген күн батысы', en: '🌅 Sunset without location' }, safe: true, explanation: { ru: 'Природные фото без геотега и деталей раскрывающих место — безопасны.', kz: 'Орынды ашатын геотег пен мәліметтерсіз табиғат фотолары қауіпсіз.', en: 'Nature photos without geotag or identifying details are safe.' } },
          { text: { ru: '📋 Фото школьного расписания на неделю', kz: '📋 Апталық мектеп кестесінің фотосы', en: '📋 Photo of weekly school schedule' }, safe: false, explanation: { ru: 'Расписание раскрывает твоё местонахождение по времени.', kz: 'Кесте уақыт бойынша орналасқан жерді ашады.', en: 'Schedule reveals your location by time.' } },
          { text: { ru: '🎨 Свой рисунок без личных данных', kz: '🎨 Жеке деректерсіз өз суретің', en: '🎨 Own drawing without personal data' }, safe: true, explanation: { ru: 'Творческий контент без личной информации абсолютно безопасен.', kz: 'Жеке ақпаратсыз шығармашылық мазмұн мүлде қауіпсіз.', en: 'Creative content without personal info is completely safe.' } },
        ]},
        { type: 'truefalse', question: { ru: '"Если аккаунт закрытый — можно публиковать любую личную информацию"', kz: '"Аккаунт жабық болса — кез келген жеке ақпаратты жариялауға болады"', en: '"If account is private — can publish any personal info"' }, answer: false, explanation: { ru: 'Подписчики могут сделать скриншот и распространить информацию дальше.', kz: 'Жазылушылар скриншот жасап, ақпаратты таратуы мүмкін.', en: 'Followers can screenshot and spread the information.' }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"Удалённый пост исчезает навсегда"', kz: '"Жойылған пост мәңгіге жоғалады"', en: '"Deleted post disappears forever"' }, answer: false, explanation: { ru: 'Скриншоты, кэш и архивы сохраняют удалённый контент.', kz: 'Скриншоттар, кэш және мұрағаттар жойылған мазмұнды сақтайды.', en: 'Screenshots, cache and archives save deleted content.' }, energyCost: 1 },
      ]
    },
    2: {
      title: { ru: 'Настройки приватности', kz: 'Құпиялылық параметрлері', en: 'Privacy settings' },
      steps: [
        { type: 'card', title: { ru: 'Зачем нужны настройки приватности', kz: 'Неліктен құпиялылық параметрлері маңызды', en: 'Why privacy settings matter' }, content: { ru: 'Соцсети по умолчанию показывают профиль всем.\n\nТы сам решаешь кто видит:\n→ Твои посты и сторис\n→ Список друзей\n→ Номер телефона и email\n→ Геолокацию\n\nПроверь настройки прямо сейчас!', kz: 'Әлеуметтік желілер профильді барлығына көрсетеді.\n\nСен өзің шешесің кім көреді:\n→ Посттарыңды және сторисіңді\n→ Достар тізімін\n→ Телефон нөмірі мен email\n→ Геолокация\n\nЕнді параметрлерді тексер!', en: 'Social media shows your profile to everyone by default.\n\nYou decide who sees:\n→ Your posts and stories\n→ Friends list\n→ Phone number and email\n→ Location\n\nCheck settings right now!' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Незнакомцы в личке', kz: 'Жеке хаттардағы бейтаныстар', en: 'Strangers in DMs' }, content: { ru: 'Красные флаги от незнакомца:\n→ Сразу просит номер или адрес\n→ Предлагает деньги или призы\n→ Торопит и давит\n→ Просит держать переписку в тайне\n\nПравило: если что-то кажется странным — это странно.\nЗаблокируй и расскажи взрослому.', kz: 'Бейтаныстан қызыл жалаулар:\n→ Бірден нөмір немесе мекенжай сұрайды\n→ Ақша немесе сыйлық ұсынады\n→ Асықтырады және қысым жасайды\n→ Хат алмасуды жасырын ұстауды сұрайды\n\nЕреже: бірдеңе бөтен көрінсе — бөтен.\nБұғаттап, үлкенге айт.', en: 'Red flags from strangers:\n→ Immediately asks for number or address\n→ Offers money or prizes\n→ Rushes and pressures\n→ Asks to keep chat secret\n\nRule: if something seems strange — it is strange.\nBlock and tell a trusted adult.' }, energyCost: 0 },
        {
          type: 'privacysetup',
          title: { ru: '🔒 Настрой профиль Instagram правильно!', kz: '🔒 Instagram профилін дұрыс орнат!', en: '🔒 Set up your Instagram profile correctly!' },
          energyCost: 2,
          settings: [
            { label: { ru: '🔒 Закрытый аккаунт', kz: '🔒 Жабық аккаунт', en: '🔒 Private account' }, correct: true, hint: { ru: 'Только одобренные подписчики видят твои посты и сторис.', kz: 'Тек бекітілген жазылушылар посттарыңды және сторисіңді көреді.', en: 'Only approved followers see your posts and stories.' } },
            { label: { ru: '👥 Принимать заявки от всех незнакомцев', kz: '👥 Барлық бейтаныстардан өтінімді қабылдау', en: '👥 Accept requests from all strangers' }, correct: false, hint: { ru: 'Принимай заявки только от людей которых знаешь лично!', kz: 'Тек жеке таныс адамдардан ғана өтінімді қабылда!', en: 'Accept requests only from people you know personally!' } },
            { label: { ru: '📍 Геолокация камеры — ВЫКЛЮЧЕНА', kz: '📍 Камера геолокациясы — ӨШІРУЛІ', en: '📍 Camera geolocation — OFF' }, correct: true, hint: { ru: 'Геотеги в фото раскрывают точное место съёмки. Отключи!', kz: 'Фотодағы геотегтер түсіру орнын ашады. Өшір!', en: 'Geotags in photos reveal exact shooting location. Turn off!' } },
            { label: { ru: '📱 Номер телефона виден всем', kz: '📱 Телефон нөмірі барлығына көрінеді', en: '📱 Phone number visible to everyone' }, correct: false, hint: { ru: 'Телефон должен быть скрыт — его могут использовать мошенники!', kz: 'Телефон жасырын болуы керек — алаяқтар пайдалана алады!', en: 'Phone should be hidden — scammers can use it!' } },
            { label: { ru: '💬 Личные сообщения только от подписчиков', kz: '💬 Жеке хаттар тек жазылушылардан', en: '💬 DMs only from followers' }, correct: true, hint: { ru: 'Незнакомцы не должны иметь возможность писать тебе напрямую.', kz: 'Бейтаныстардың саған тікелей жаза алуы мүмкін болмауы керек.', en: 'Strangers should not be able to message you directly.' } },
            { label: { ru: '👁️ Статус «онлайн» виден всем', kz: '👁️ «Онлайн» мәртебесі барлығына көрінеді', en: '👁️ Online status visible to everyone' }, correct: false, hint: { ru: 'Статус онлайн показывает мошенникам когда ты активен в сети.', kz: 'Онлайн мәртебесі алаяқтарға желідегі белсенді кезіңді көрсетеді.', en: 'Online status shows scammers when you are active online.' } },
            { label: { ru: '📸 Геолокация при публикации — ВЫКЛЮЧЕНА', kz: '📸 Жариялауда геолокация — ӨШІРУЛІ', en: '📸 Geolocation on publish — OFF' }, correct: true, hint: { ru: 'Не добавляй геотег к постам — это раскрывает твоё местоположение!', kz: 'Посттарға геотег қоспа — бұл орналасқан жерді ашады!', en: 'Do not add geotag to posts — it reveals your location!' } },
            { label: { ru: '🌐 Профиль виден в поиске Google', kz: '🌐 Профиль Google іздеуінде көрінеді', en: '🌐 Profile visible in Google search' }, correct: false, hint: { ru: 'Закрой профиль от поиска — это дополнительная приватность!', kz: 'Профильді іздеуден жап — бұл қосымша құпиялылық!', en: 'Close profile from search — extra privacy!' } },
          ]
        },
        { type: 'quiz', question: { ru: 'Незнакомец пишет: «Ты красивая, напиши номер». Что делаешь?', kz: 'Бейтаныс жазады: «Сен сұлусың, нөміріңді жаз». Не істейсің?', en: 'Stranger writes: "You\'re pretty, write your number". What do you do?' }, options: { ru: ['Пишу — просто дружба', 'Игнорирую', 'Блокирую и рассказываю взрослому', 'Спрашиваю зачем'], kz: ['Жазамын — тек достық', 'Елемеймін', 'Бұғаттап, үлкенге айтамын', 'Не үшін деп сұраймын'], en: ['Write — just friendship', 'Ignore', 'Block and tell trusted adult', 'Ask why'] }, correct: 2, explanation: { ru: 'Незнакомцы не должны получать твой номер. Блокировка — правильное решение.', kz: 'Бейтаныстар нөміріңді алмауы керек. Бұғаттау — дұрыс шешім.', en: 'Strangers should not get your number. Blocking is the right decision.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Главный риск открытого аккаунта?', kz: 'Ашық аккаунттың басты қаупі?', en: 'Main risk of an open account?' }, options: { ru: ['Посты хуже выглядят', 'Любой человек видит личную информацию', 'Телефон разряжается', 'Аккаунт заблокируют'], kz: ['Посттар нашар көрінеді', 'Кез келген адам жеке ақпаратты көреді', 'Телефон зарядсызданады', 'Аккаунт бұғатталады'], en: ['Posts look worse', 'Anyone can see personal info', 'Phone drains', 'Account gets blocked'] }, correct: 1, explanation: { ru: 'Открытый аккаунт — данные доступны всем включая мошенников.', kz: 'Ашық аккаунт — деректер барлығына, соның ішінде алаяқтарға қолжетімді.', en: 'Open account — data accessible to everyone including scammers.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Что делать с геолокацией телефона?', kz: 'Телефон геолокациясымен не істеу керек?', en: 'What to do with phone geolocation?' }, options: { ru: ['Включить для всех приложений', 'Отключить для соцсетей и камеры', 'Оставить как есть', 'Не влияет на безопасность'], kz: ['Барлық қосымшаға қосу', 'Әлеуметтік желілер мен камера үшін өшіру', 'Өзгеріссіз қалдыру', 'Қауіпсіздікке әсер етпейді'], en: ['Enable for all apps', 'Disable for social media and camera', 'Leave as is', 'Does not affect security'] }, correct: 1, explanation: { ru: 'Геотеги в фото показывают точные координаты. Обязательно отключи геолокацию для камеры.', kz: 'Фотодағы геотегтер нақты координаттарды көрсетеді. Камера геолокациясын өшір.', en: 'Geotags show exact coordinates. Make sure to disable geolocation for camera.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Сана приняла заявку от незнакомца с красивым профилем. Правильно?', kz: 'Сана әдемі профильді бейтаныстан өтінімді қабылдады. Дұрыс па?', en: 'Sana accepted request from stranger with nice profile. Correct?' }, options: { ru: ['Да — много подписчиков = надёжный', 'Нет — красивый профиль легко подделать', 'Да если не пишет в личку', 'Нормально при закрытом аккаунте'], kz: ['Иә — көп жазылушы = сенімді', 'Жоқ — әдемі профильді оңай жасанды жасауға болады', 'Иә жеке хат жазбаса', 'Жабық аккаунтта қалыпты'], en: ['Yes — many followers = trustworthy', 'No — nice profile is easy to fake', 'Yes if no DMs', 'Fine with private account'] }, correct: 1, explanation: { ru: 'Красивый профиль легко подделать. Принимай заявки только от людей которых знаешь лично.', kz: 'Әдемі профильді оңай жасанды жасауға болады. Тек жеке таныстардан өтінімді қабылда.', en: 'Nice profile is easy to fake. Accept only from people you know personally.' }, energyCost: 1 },
      ]
    },
    3: {
      title: { ru: 'Кибербуллинг', kz: 'Кибербуллинг', en: 'Cyberbullying' },
      steps: [
        { type: 'card', title: { ru: 'Что такое кибербуллинг', kz: 'Кибербуллинг дегеніміз не', en: 'What is cyberbullying' }, content: { ru: 'Кибербуллинг — систематическое преследование через интернет.\n\nФормы:\n→ Оскорбительные сообщения\n→ Распространение слухов и лжи\n→ Унизительные фото без согласия\n→ Намеренное исключение из групп\n→ Фейковые аккаунты для травли', kz: 'Кибербуллинг — интернет арқылы жүйелі түрде қудалау.\n\nТүрлері:\n→ Қорлайтын хабарламалар\n→ Өсек пен жалған ақпарат тарату\n→ Келісімсіз ұятты суреттер\n→ Топтардан әдейі шығару\n→ Травля үшін жалған аккаунттар', en: 'Cyberbullying — systematic harassment through the internet.\n\nForms:\n→ Offensive messages\n→ Spreading rumors and lies\n→ Humiliating photos without consent\n→ Intentional exclusion from groups\n→ Fake accounts for bullying' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Если ты жертва', kz: 'Егер сен жәбірленуші болсаң', en: 'If you are the victim' }, content: { ru: 'НЕ отвечай агрессору — усиливает травлю.\n\nЧто делать:\n1. Сохрани скриншоты\n2. Заблокируй обидчика\n3. Пожалуйся в соцсеть\n4. Расскажи взрослому\n5. Обратись к психологу\n\nТы не виноват в том что тебя травят.', kz: 'Агрессорға ЖАУАП БЕРМЕ — травлані күшейтеді.\n\nНе істеу керек:\n1. Скриншоттарды сақта\n2. Қорлаушыны бұғатта\n3. Әлеуметтік желіге шағым жаса\n4. Үлкенге айт\n5. Психологқа жүгін\n\nСені травляға ұшыратқаны үшін сен кінәлі емессің.', en: 'Do NOT respond to aggressor — amplifies bullying.\n\nWhat to do:\n1. Save screenshots\n2. Block the offender\n3. Report to social network\n4. Tell a trusted adult\n5. Talk to a counselor\n\nYou are not at fault for being bullied.' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Если ты свидетель', kz: 'Егер сен куәгер болсаң', en: 'If you are a witness' }, content: { ru: 'Молчание = поддержка агрессора.\n\nЧто делать:\n→ Не лайкай унизительный контент\n→ Поддержи жертву в личке\n→ Пожалуйся на публикацию\n→ Расскажи взрослому\n\nОдин человек который встанет на защиту — меняет всё.', kz: 'Үнсіздік = агрессорды қолдау.\n\nНе істеу керек:\n→ Ұятты мазмұнға лайк баспа\n→ Жеке хатта жәбірленушіні қолда\n→ Жариялымға шағым жаса\n→ Үлкенге айт\n\nҚорғауға тұрған бір адам — бәрін өзгертеді.', en: 'Silence = supporting the aggressor.\n\nWhat to do:\n→ Do not like humiliating content\n→ Support victim in DMs\n→ Report the post\n→ Tell a trusted adult\n\nOne person who stands up makes all the difference.' }, energyCost: 0 },
        { type: 'cyberbullying', title: { ru: 'Кибербуллинг или нет?', kz: 'Кибербуллинг па, жоқ па?', en: 'Cyberbullying or not?' }, energyCost: 2, items: [
          { messages: [{ from: 'Айгерим', text: { ru: 'Ты такой умный! Помог мне с задачей 😊', kz: 'Сен өте ақылдысың! Есепті шығаруға көмектестің 😊', en: 'You are so smart! Helped me with the task 😊' } }, { from: 'Данияр', text: { ru: 'Пожалуйста! Всегда рад помочь 👍', kz: 'Өтінемін! Әрқашан көмектесуге дайынмын 👍', en: 'No problem! Always happy to help 👍' } }], isBullying: false, explanation: { ru: 'Это дружеское общение и взаимопомощь — всё нормально.', kz: 'Бұл достық қарым-қатынас және өзара көмек — бәрі қалыпты.', en: 'This is friendly communication and mutual help — all normal.' } },
          { messages: [{ from: 'Аноним', text: { ru: 'Ты уродливая и тупая. Все в классе тебя ненавидят!', kz: 'Сен жексұрын және ақылсызсың. Сыныптағылар бәрі сені жек көреді!', en: 'You are ugly and stupid. Everyone in class hates you!' } }, { from: 'Аноним2', text: { ru: 'Согласен! Лучше вообще не приходи в школу', kz: 'Келісемін! Мектепке мүлде келмеген жақсы', en: 'Agreed! Better not come to school at all' } }], isBullying: true, explanation: { ru: 'Массовые оскорбления и угрозы — это кибербуллинг. Нужно сохранить скриншоты и сообщить взрослым.', kz: 'Жаппай қорлау мен қорқыту — кибербуллинг. Скриншоттарды сақтап, үлкендерге хабарлау керек.', en: 'Mass insults and threats are cyberbullying. Save screenshots and report to adults.' } },
          { messages: [{ from: 'Самира', text: { ru: 'Привет! Ты сдала домашку по математике?', kz: 'Сәлем! Математикадан үй тапсырмасын өткіздің бе?', en: 'Hi! Did you submit the math homework?' } }, { from: 'Нурия', text: { ru: 'Да, только что! А ты?', kz: 'Иә, жаңа ғана! Сен ше?', en: 'Yes, just now! And you?' } }], isBullying: false, explanation: { ru: 'Обычный нейтральный разговор о делах — это не буллинг.', kz: 'Іс туралы кәдімгі бейтарап сөйлесу — бұл буллинг емес.', en: 'A normal neutral conversation — this is not bullying.' } },
          { messages: [{ from: 'Группа «Класс»', text: { ru: 'Смотрите какое унизительное фото Азамата! Ха-ха!', kz: 'Азаматтың ұятты фотосын қараңдар! Ха-ха!', en: 'Look at this humiliating photo of Azamat! Ha-ha!' } }, { from: 'Многие', text: { ru: '😂😂 переслать всем!', kz: '😂😂 барлығына жіберіңдер!', en: '😂😂 forward to everyone!' } }], isBullying: true, explanation: { ru: 'Публикация унизительных фото без согласия — это кибербуллинг и нарушение закона.', kz: 'Келісімсіз ұятты фотоларды жариялау — кибербуллинг және заңды бұзу.', en: 'Publishing humiliating photos without consent is cyberbullying and a legal violation.' } },
          { messages: [{ from: 'Администратор', text: { ru: 'Арман удалён из чата', kz: 'Арман чаттан жойылды', en: 'Arman has been removed from chat' } }, { from: 'Кто-то', text: { ru: 'Наконец-то! Теперь обсудим его за спиной', kz: 'Ақыры! Енді оны жоқ жерде талқылайық', en: 'Finally! Now let\'s discuss him behind his back' } }], isBullying: true, explanation: { ru: 'Намеренное исключение с целью обсуждения за спиной — форма кибербуллинга.', kz: 'Жоқ жерде талқылау мақсатында чаттан шығару — кибербуллинг түрі.', en: 'Intentionally removing to discuss behind back — a form of cyberbullying.' } },
          { messages: [{ from: 'Дина', text: { ru: 'Хаха Дана ты опять в своём стиле 😄', kz: 'Хаха Дана сен тағы өз стиліңдесің 😄', en: 'Haha Dana you are in your style again 😄' } }, { from: 'Дана', text: { ru: 'Ага, я всегда такая! 😂 привыкай', kz: 'Иә, мен әрқашан осындаймын! 😂 үйрен', en: 'Yep, I am always like this! 😂 get used to it' } }], isBullying: false, explanation: { ru: 'Дружеские шутки где обе стороны смеются — это не буллинг.', kz: 'Екі жақ та күлетін достық әзілдер — буллинг емес.', en: 'Friendly jokes where both sides laugh — not bullying.' } },
        ]},
        { type: 'quiz', question: { ru: 'Тебе пишут оскорбления. Что сделаешь в первую очередь?', kz: 'Саған қорлау хаттар жазады. Алдымен не істейсің?', en: 'Someone sends insults. What do you do first?' }, options: { ru: ['Отвечу тем же', 'Скриншот, блок, расскажу взрослому', 'Удалю аккаунт', 'Попрошу друзей ответить'], kz: ['Өзіммен жауап беремін', 'Скриншот, бұғат, үлкенге айтамын', 'Аккаунтты жоямын', 'Достарымнан жауап беруін сұраймын'], en: ['Reply the same way', 'Screenshot, block, tell adult', 'Delete account', 'Ask friends to respond'] }, correct: 1, explanation: { ru: 'Скриншоты — доказательства. Блокировка останавливает контакт. Взрослый поможет.', kz: 'Скриншоттар — дәлел. Бұғаттау байланысты тоқтатады. Үлкен көмектеседі.', en: 'Screenshots are evidence. Blocking stops contact. Adult will help.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Друг прислал унизительное видео и просит переслать. Что делаешь?', kz: 'Дос ұятты видео жіберіп, таратуды сұрайды. Не істейсің?', en: 'Friend sent humiliating video and asks to forward. What do you do?' }, options: { ru: ['Пересылаю — смешно', 'Только близким', 'Не пересылаю и говорю что это травля', 'Публикую в сторис'], kz: ['Жіберемін — күлкілі', 'Тек жақындарға', 'Жібермеймін және травля деп айтамын', 'Стористе жариялаймын'], en: ['Forward — it is funny', 'Only to close ones', 'Do not forward and say it is bullying', 'Post to stories'] }, correct: 2, explanation: { ru: 'Пересылка делает тебя участником травли даже если не создавал.', kz: 'Жіберу сені жасамасаң да травляға қатысушы етеді.', en: 'Forwarding makes you part of bullying even if you did not create it.' }, energyCost: 1 },
      ]
    },
    4: {
      title: { ru: 'Финальный тест — Соцсети', kz: 'Қорытынды тест — Әлеуметтік желілер', en: 'Final test — Social Media' },
      steps: [{ type: 'finaltest', energyCost: 0, questions: [
        { q: { ru: '«Иду в школу в 8:00 как всегда» — что не так?', kz: '«Мектепке 8:00-де бара жатырмын» — не дұрыс емес?', en: '"Going to school at 8:00 as always" — what is wrong?' }, options: { ru: ['Ничего', 'Показывает расписание и маршрут', 'Нужен геотег', 'Слишком коротко'], kz: ['Ештеңе', 'Кестені және маршрутты көрсетеді', 'Геотег керек', 'Тым қысқа'], en: ['Nothing', 'Shows schedule and route', 'Needs geotag', 'Too short'] }, correct: 1, explanation: { ru: 'Расписание показывает когда тебя нет дома.', kz: 'Кесте үйде жоқ кезді көрсетеді.', en: 'Schedule shows when you are away from home.' } },
        { q: { ru: 'Как правильно настроить аккаунт?', kz: 'Аккаунтты қалай дұрыс орнату керек?', en: 'How to correctly set up an account?' }, options: { ru: ['Открытый для всех', 'Закрытый + заявки только от знакомых', 'Без фото профиля', 'Без имени'], kz: ['Барлығына ашық', 'Жабық + тек таныстардан өтінім', 'Профиль суретінсіз', 'Атсыз'], en: ['Open for everyone', 'Private + requests only from known', 'No profile photo', 'No name'] }, correct: 1, explanation: { ru: 'Закрытый аккаунт + заявки только от знакомых = базовая защита.', kz: 'Жабық аккаунт + тек таныстардан өтінімдер = негізгі қорғаныс.', en: 'Private account + requests from known only = basic protection.' } },
        { q: { ru: 'Незнакомец предлагает деньги за номер телефона. Что делаешь?', kz: 'Бейтаныс телефон нөміріне ақша ұсынады. Не істейсің?', en: 'Stranger offers money for your phone number. What do you do?' }, options: { ru: ['Даю — мне нужны деньги', 'Блокирую и не отвечаю', 'Спрашиваю сколько', 'Даю только мессенджер'], kz: ['Беремін — маған ақша керек', 'Бұғаттап, жауап бермеймін', 'Қанша деп сұраймын', 'Тек мессенджерді беремін'], en: ['Give it — I need money', 'Block and do not respond', 'Ask how much', 'Give only messenger'] }, correct: 1, explanation: { ru: 'Незнакомцы не должны получать твой номер ни при каких условиях.', kz: 'Бейтаныстар ешбір жағдайда нөміріңді алмауы керек.', en: 'Strangers should never get your number under any circumstances.' } },
        { q: { ru: 'Геолокация в фото опасна потому что...', kz: 'Фотодағы геолокация қауіпті, себебі...', en: 'Geolocation in photo is dangerous because...' }, options: { ru: ['Фото тяжелее', 'Показывает точные координаты места съёмки', 'Замедляет загрузку', 'Только для iOS'], kz: ['Фото ауыр', 'Түсіру орнының нақты координаттарын көрсетеді', 'Жүктеуді баяулатады', 'Тек iOS үшін'], en: ['Photo is heavier', 'Shows exact coordinates of location', 'Slows loading', 'iOS only'] }, correct: 1, explanation: { ru: 'Геотег — это точные GPS-координаты в метаданных фото.', kz: 'Геотег — фото метадеректеріндегі нақты GPS-координаттар.', en: 'Geotag is exact GPS coordinates in photo metadata.' } },
        { q: { ru: 'Тебе пишут оскорбления. Первый шаг?', kz: 'Саған қорлау жазады. Бірінші қадам?', en: 'Someone insults you. First step?' }, options: { ru: ['Ответить', 'Сохранить скриншот как доказательство', 'Удалить аккаунт', 'Игнорировать и ждать'], kz: ['Жауап беру', 'Дәлел ретінде скриншот сақтау', 'Аккаунтты жою', 'Елеп күту'], en: ['Reply', 'Save screenshot as evidence', 'Delete account', 'Ignore and wait'] }, correct: 1, explanation: { ru: 'Скриншоты — главные доказательства кибербуллинга.', kz: 'Скриншоттар — кибербуллингтің негізгі дәлелі.', en: 'Screenshots are the main evidence of cyberbullying.' } },
        { q: { ru: 'Что такое кибербуллинг?', kz: 'Кибербуллинг дегеніміз не?', en: 'What is cyberbullying?' }, options: { ru: ['Вирус через интернет', 'Систематическое преследование через интернет', 'Взлом аккаунта', 'Спам в личке'], kz: ['Интернет арқылы вирус', 'Интернет арқылы жүйелі қудалау', 'Аккаунтты бұзу', 'Жеке хаттағы спам'], en: ['Virus via internet', 'Systematic harassment through internet', 'Account hacking', 'Spam in DMs'] }, correct: 1, explanation: { ru: 'Кибербуллинг — систематическое преследование, оскорбления или угрозы онлайн.', kz: 'Кибербуллинг — онлайн жүйелі қудалау, қорлау немесе қорқыту.', en: 'Cyberbullying is systematic harassment, insults or threats online.' } },
        { q: { ru: 'Одноклассников массово оскорбляют онлайн. Ты...', kz: 'Сыныптасты онлайн жаппай қорлайды. Сен...', en: 'Classmates are massively insulted online. You...' }, options: { ru: ['Не вмешиваюсь', 'Поддерживаю в личке и жалуюсь', 'Лайкаю комменты', 'Жду пока само пройдёт'], kz: ['Араласпаймын', 'Жеке хатта қолдап, шағым жасаймын', 'Комментарийлерге лайк басамын', 'Өздігінен өтетінін күтемін'], en: ['Do not interfere', 'Support in DM and report', 'Like the comments', 'Wait for it to pass'] }, correct: 1, explanation: { ru: 'Свидетель должен поддержать жертву и пожаловаться на контент.', kz: 'Куәгер жәбірленушіні қолдап, мазмұнға шағым жасауы керек.', en: 'A witness should support the victim and report the content.' } },
        { q: { ru: 'Почему нельзя публиковать документы в соцсетях?', kz: 'Неліктен соцсетьтерде құжаттарды жариялауға болмайды?', en: 'Why not publish documents on social media?' }, options: { ru: ['Плохо выглядят', 'Мошенники могут использовать данные', 'Нарушает авторское право', 'Замедляет профиль'], kz: ['Нашар көрінеді', 'Алаяқтар деректерді пайдалана алады', 'Авторлық құқықты бұзады', 'Профильді баяулатады'], en: ['Look bad', 'Scammers can use the data', 'Violates copyright', 'Slows profile'] }, correct: 1, explanation: { ru: 'Данные документов используются для мошенничества и кражи личности.', kz: 'Құжат деректері алаяқтық пен жеке бастың ұрлауына қолданылады.', en: 'Document data is used for fraud and identity theft.' } },
        { q: { ru: 'Сана добавила школу и адрес в профиль. Безопасно?', kz: 'Сана профильге мектеп пен мекенжай қосты. Қауіпсіз бе?', en: 'Sana added school and address to profile. Safe?' }, options: { ru: ['Да — для друзей', 'Нет — это видят все включая незнакомцев', 'Да при закрытом аккаунте', 'Зависит от настроек'], kz: ['Иә — достар үшін', 'Жоқ — бұны бейтаныстар да көреді', 'Иә жабық аккаунтта', 'Параметрлерге байланысты'], en: ['Yes — for friends', 'No — everyone including strangers sees this', 'Yes with private account', 'Depends on settings'] }, correct: 1, explanation: { ru: 'Личную информацию в профиле видят все подписчики и потенциально незнакомцы.', kz: 'Профильдегі жеке ақпаратты бейтаныстарды қоса барлығы көреді.', en: 'Personal info in profile is visible to everyone including strangers.' } },
        { q: { ru: 'Незнакомец собирает данные подростков в чате. Что делаешь?', kz: 'Бейтаныс чатта жасөспірімдердің деректерін жинайды. Не істейсің?', en: 'Stranger collects teenager data in chat. What do you do?' }, options: { ru: ['Помогаю — безвредно', 'Покидаю чат и жалуюсь администрации', 'Даю только имя', 'Спрашиваю зачем'], kz: ['Көмектесемін — зиянсыз', 'Чаттан шығып, әкімшілікке шағым жасаймын', 'Тек есімімді беремін', 'Не үшін деп сұраймын'], en: ['Help — harmless', 'Leave and report to administration', 'Give only name', 'Ask why'] }, correct: 1, explanation: { ru: 'Покинь чат и сообщи администрации платформы и взрослым.', kz: 'Чаттан шығып, платформа әкімшілігіне және үлкендерге хабарла.', en: 'Leave and report to platform administration and trusted adults.' } },
      ]}]
    }
  },

  4: {
    1: {
      title: { ru: 'Что такое 2FA?', kz: 'Екі факторлы аутентификация дегеніміз не?', en: 'What is 2FA?' },
      steps: [
        { type: 'card', title: { ru: 'Проблема одного пароля', kz: 'Бір парольдің мәселесі', en: 'The problem with one password' }, content: { ru: 'Даже самый сложный пароль может утечь.\n\nБазы взламывают.\nФишинг ворует пароли.\nКейлоггеры записывают что вводишь.\n\nЧто если есть второй рубеж защиты?', kz: 'Тіпті ең күрделі пароль ағуы мүмкін.\n\nДеректер базалары бұзылады.\nФишинг парольдерді ұрлайды.\nКейлоггерлер не теретіңді жазып алады.\n\nЕкінші қорғаныс шебі болса ше?', en: 'Even the strongest password can leak.\n\nDatabases get hacked.\nPhishing steals passwords.\nKeyloggers record what you type.\n\nWhat if there is a second line of defense?' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Что такое 2FA', kz: '2FA дегеніміз не', en: 'What is 2FA' }, content: { ru: 'Двухфакторная аутентификация — второй шаг при входе.\n\nАналогия: аккаунт — это сейф.\nПароль — первый ключ.\n2FA — второй ключ только у тебя.\n\nДаже зная пароль — без второго ключа войти невозможно.', kz: '2FA — бұл парольден кейінгі қосымша қорғаныс қабаты.\n\nАналогия: аккаунт — сейф.\nПароль — бірінші кілт.\n2FA — тек сенде екінші кілт.\n\nПарольді білсе де — екінші кілтсіз кіру мүмкін емес.', en: 'Two-factor authentication — a second step when logging in.\n\nAnalogy: account is a safe.\nPassword — first key.\n2FA — second key only you have.\n\nEven knowing the password — cannot log in without second key.' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Как это работает', kz: 'Бұл қалай жұмыс істейді', en: 'How it works' }, content: { ru: 'Ты вводишь логин и пароль → сайт просит второй код.\n\nВторой код приходит:\n→ SMS на телефон\n→ Из приложения-аутентификатора\n→ По email\n→ Через биометрию\n\nХакер знает пароль но не имеет твой телефон. Войти не может!', kz: 'Логин мен парольді енгізесің → сайт екінші кодты сұрайды.\n\nЕкінші код келеді:\n→ Телефонға SMS\n→ Аутентификатор қосымшасынан\n→ Email арқылы\n→ Биометрия арқылы\n\nХакер парольді біледі, бірақ телефоның жоқ. Кіре алмайды!', en: 'You enter login and password → site asks for second code.\n\nSecond code comes via:\n→ SMS to phone\n→ From authenticator app\n→ By email\n→ Through biometrics\n\nHacker knows password but does not have your phone. Cannot log in!' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Насколько эффективно', kz: 'Қаншалықты тиімді', en: 'How effective' }, content: { ru: '2FA блокирует по данным Google:\n\n→ 100% автоматических атак\n→ 99% массовых фишинговых атак\n→ 66% целенаправленных атак\n\nЭто самая простая и эффективная мера защиты!', kz: 'Google деректері бойынша 2FA бұғаттайды:\n\n→ 100% автоматты шабуылдар\n→ 99% жаппай фишинг шабуылдары\n→ 66% мақсатты шабуылдар\n\nБұл ең қарапайым әрі тиімді қорғаныс шарасы!', en: 'According to Google, 2FA blocks:\n\n→ 100% of automated attacks\n→ 99% of mass phishing attacks\n→ 66% of targeted attacks\n\nThis is the simplest and most effective security measure!' }, energyCost: 0 },
        {
          type: 'accountcheck',
          title: { ru: '🛡️ Взломают или нет?', kz: '🛡️ Бұзыла ма, жоқ па?', en: '🛡️ Will it get hacked or not?' },
          energyCost: 2,
          accounts: [
            {
              name: { ru: 'Аккаунт Азамата', kz: 'Азаматтың аккаунты', en: "Azamat's account" },
              details: { ru: '🔑 Пароль: azamat2009\n📱 2FA: выключено\n📧 Email: общий с другом\n🔒 Один пароль везде', kz: '🔑 Пароль: azamat2009\n📱 2FA: өшірулі\n📧 Email: досымен ортақ\n🔒 Барлық жерде бір пароль', en: '🔑 Password: azamat2009\n📱 2FA: off\n📧 Email: shared with friend\n🔒 Same password everywhere' },
              willBeHacked: true,
              explanation: { ru: '❌ Взломают! Слабый пароль (имя+год), нет 2FA, общий email — всё открыто!', kz: '❌ Бұзады! Әлсіз пароль (есім+жыл), 2FA жоқ, ортақ email — бәрі ашық!', en: '❌ Will be hacked! Weak password (name+year), no 2FA, shared email — all open!' }
            },
            {
              name: { ru: 'Аккаунт Дины', kz: 'Динаның аккаунты', en: "Dina's account" },
              details: { ru: '🔑 Пароль: ТауБөріАлматы#99\n📱 2FA: приложение\n📧 Email: личный\n🔒 Уникальный для каждого сайта', kz: '🔑 Пароль: ТауБөріАлматы#99\n📱 2FA: қосымша арқылы\n📧 Email: жеке\n🔒 Әр сайтқа бірегей', en: '🔑 Password: MountainWolfAlmaty#99\n📱 2FA: via app\n📧 Email: personal\n🔒 Unique per site' },
              willBeHacked: false,
              explanation: { ru: '✅ Защищена! Сильный длинный пароль + 2FA через приложение + личный email = отличная защита!', kz: '✅ Қорғалған! Күшті ұзын пароль + қосымша арқылы 2FA + жеке email = керемет қорғаныс!', en: '✅ Protected! Strong long password + 2FA via app + personal email = excellent protection!' }
            },
            {
              name: { ru: 'Аккаунт Арлана', kz: 'Арланның аккаунты', en: "Arlan's account" },
              details: { ru: '🔑 Пароль: Football2010!\n📱 2FA: SMS\n📧 Email: личный\n🔒 Разные пароли на сайтах', kz: '🔑 Пароль: Football2010!\n📱 2FA: SMS арқылы\n📧 Email: жеке\n🔒 Сайттарда әртүрлі парольдер', en: '🔑 Password: Football2010!\n📱 2FA: via SMS\n📧 Email: personal\n🔒 Different passwords on sites' },
              willBeHacked: false,
              explanation: { ru: '✅ Относительно защищён! Пароль слабоват, но 2FA и уникальные пароли дают неплохую защиту. Лучше усилить пароль!', kz: '✅ Салыстырмалы түрде қорғалған! Пароль әлсізірек, бірақ 2FA мен бірегей парольдер жақсы қорғаныс береді. Парольді күшейткен жақсы!', en: '✅ Relatively protected! Password is weak, but 2FA and unique passwords give decent protection. Better to strengthen password!' }
            },
          ]
        },
        { type: 'truefalse', question: { ru: '"Если есть сложный пароль — 2FA не нужна"', kz: '"Күрделі пароль болса — 2FA қажет емес"', en: '"If I have a strong password — 2FA is not needed"' }, answer: false, explanation: { ru: 'Даже сложный пароль может утечь при взломе базы данных. 2FA защищает даже в этом случае.', kz: 'Тіпті күрделі пароль деректер базасы бұзылған кезде ағуы мүмкін. 2FA мұндай жағдайда да қорғайды.', en: 'Even a strong password can leak in a database breach. 2FA protects even in this case.' }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"При включённой 2FA хакер не войдёт зная только пароль"', kz: '"2FA қосылған болса, хакер тек парольді білсе кіре алмайды"', en: '"With 2FA enabled hacker cannot log in knowing only the password"' }, answer: true, explanation: { ru: 'Без второго фактора — кода из SMS или приложения — войти невозможно.', kz: 'Екінші фактор — SMS немесе қосымшадан код — болмаса кіру мүмкін емес.', en: 'Without the second factor — code from SMS or app — logging in is impossible.' }, energyCost: 1 },
        { type: 'truefalse', question: { ru: '"Если получил код 2FA которого не запрашивал — это нормально"', kz: '"Сұратпаған 2FA коды келсе — бұл қалыпты"', en: '"If you received a 2FA code you did not request — it is normal"' }, answer: false, explanation: { ru: 'Незапрошенный код 2FA = кто-то знает твой пароль и пытается войти. Срочно меняй пароль!', kz: 'Сұратылмаған 2FA коды = біреу парольіңді біледі және кіруге тырысады. Парольді дереу ауыстыр!', en: 'Unrequested 2FA code = someone knows your password and tries to log in. Change password immediately!' }, energyCost: 1 },
      ]
    },
    2: {
      title: { ru: 'Виды 2FA', kz: '2FA түрлері', en: 'Types of 2FA' },
      steps: [
        { type: 'card', title: { ru: 'SMS-код', kz: 'SMS-код', en: 'SMS code' }, content: { ru: 'Самый распространённый вид.\n\nПлюсы:\n→ Просто настроить\n→ Не нужно приложение\n\nМинусы:\n→ Уязвим для SIM-swap атаки\n→ Не работает без сигнала\n→ Медленнее приложения', kz: 'Ең кең таралған түрі.\n\nАртықшылықтары:\n→ Орнату қарапайым\n→ Қосымша қажет емес\n\nКемшіліктері:\n→ SIM-swap шабуылына осал\n→ Сигналсыз жұмыс істемейді\n→ Қосымшадан баяу', en: 'Most common type.\n\nPros:\n→ Easy to set up\n→ No app needed\n\nCons:\n→ Vulnerable to SIM-swap attack\n→ Does not work without signal\n→ Slower than app' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Приложение-аутентификатор', kz: 'Аутентификатор қосымшасы', en: 'Authenticator app' }, content: { ru: 'Генерирует код каждые 30 секунд прямо на телефоне.\n\nПопулярные: Google Authenticator, Aegis\n\nПлюсы:\n→ Работает без интернета\n→ Защищён от SIM-swap\n→ Один код для многих сервисов\n\nМинусы:\n→ Нужно устанавливать\n→ При потере нужны резервные коды', kz: 'Телефонда 30 секунд сайын код жасайды.\n\nТанымалдары: Google Authenticator, Aegis\n\nАртықшылықтары:\n→ Интернетсіз жұмыс істейді\n→ SIM-swap-тан қорғалған\n→ Бір қосымша — көп сервис\n\nКемшіліктері:\n→ Орнату қажет\n→ Жоғалтқанда резервтік кодтар керек', en: 'Generates code every 30 seconds on your phone.\n\nPopular: Google Authenticator, Aegis\n\nPros:\n→ Works without internet\n→ Protected from SIM-swap\n→ One app for many services\n\nCons:\n→ Needs installation\n→ Need backup codes if lost' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Биометрия и резервные коды', kz: 'Биометрия және резервтік кодтар', en: 'Biometrics and backup codes' }, content: { ru: 'Биометрия: отпечаток пальца, Face ID\n→ Самый удобный вид\n→ Сложно скопировать\n\nРезервные коды — сохраняй всегда!\n→ Одноразовые коды на случай потери телефона\n→ Распечатай и положи в надёжное место\n→ Никогда не храни в заметках телефона!', kz: 'Биометрия: саусақ ізі, Face ID\n→ Ең ыңғайлы түрі\n→ Көшіру қиын\n\nРезервтік кодтар — әрқашан сақта!\n→ Телефонды жоғалтқан жағдайға арналған бір реттік кодтар\n→ Басып шығарып, сенімді жерге қой\n→ Телефон жазбаларында ешқашан сақтама!', en: 'Biometrics: fingerprint, Face ID\n→ Most convenient type\n→ Hard to copy\n\nBackup codes — always save!\n→ One-time codes in case phone is lost\n→ Print and keep in safe place\n→ Never store in phone notes!' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Что такое SIM-swap', kz: 'SIM-swap дегеніміз не', en: 'What is SIM-swap' }, content: { ru: 'SIM-swap — мошенник убеждает оператора перевыпустить твою SIM на себя.\n\nПосле этого:\n→ Все SMS приходят мошеннику\n→ Включая коды 2FA\n→ Он входит в твои аккаунты\n\nЗащита: используй приложение-аутентификатор вместо SMS!', kz: 'SIM-swap — алаяқ операторды SIM-ты өзіне қайта шығаруға сендіреді.\n\nОдан кейін:\n→ Барлық SMS алаяққа келеді\n→ 2FA кодтары да\n→ Ол аккаунттарыңа кіреді\n\nҚорғаныс: SMS орнына аутентификатор қосымшасын пайдалан!', en: 'SIM-swap — scammer convinces carrier to reissue your SIM to themselves.\n\nAfter that:\n→ All SMS go to scammer\n→ Including 2FA codes\n→ They log into your accounts\n\nProtection: use authenticator app instead of SMS!' }, energyCost: 0 },
        { type: 'realorfake', title: { ru: 'Настоящий код или фишинг?', kz: 'Нақты код па әлде фишинг па?', en: 'Real code or phishing?' }, energyCost: 2, items: [
          { sender: 'Kaspi Bank', message: { ru: '🔐 Выплата одобрена! Получите 50 000 тг. Подтвердите: bit.ly/kaspi-prize', kz: '🔐 Төлем бекітілді! 50 000 тг алыңыз. Растаңыз: bit.ly/kaspi-prize', en: '🔐 Payment approved! Get 50,000 KZT. Confirm: bit.ly/kaspi-prize' }, isReal: false, explanation: { ru: 'Kaspi не рассылает призы через SMS. Укороченная ссылка скрывает фишинговый сайт.', kz: 'Kaspi SMS арқылы сыйлық таратпайды. Қысқартылған сілтеме фишинг сайтын жасырады.', en: 'Kaspi does not send prizes via SMS. Shortened link hides a phishing site.' } },
          { sender: 'Google', message: { ru: 'Код подтверждения Google: 847291. Не сообщайте никому, включая сотрудников Google.', kz: 'Google растау коды: 847291. Google қызметкерлерін қоса ешкімге айтпаңыз.', en: 'Your Google verification code is 847291. Do not share it with anyone, including Google employees.' }, isReal: true, explanation: { ru: 'Настоящий код Google — официальный домен, предупреждение не делиться кодом, без ссылок.', kz: 'Google-дің нақты коды — ресми домен, кодты бөлісуге болмайды деген ескерту, сілтемелер жоқ.', en: 'Real Google code — official domain, warning not to share code, no links.' } },
          { sender: 'instagram-verify-kz.com', message: { ru: '⚠️ Ваш аккаунт требует верификации! Введите код: 123456 на нашем сайте', kz: '⚠️ Аккаунтыңыз верификация қажет! Кодты біздің сайтта енгізіңіз: 123456', en: '⚠️ Your account requires verification! Enter code: 123456 on our site' }, isReal: false, explanation: { ru: 'Домен instagram-verify-kz.com не принадлежит Instagram. Это фишинг.', kz: 'instagram-verify-kz.com домені Instagram-ға тиесілі емес. Бұл фишинг.', en: 'Domain instagram-verify-kz.com does not belong to Instagram. This is phishing.' } },
          { sender: 'Kaspi Bank', message: { ru: 'Код для входа: 294817. Если вы не запрашивали вход — позвоните в банк.', kz: 'Кіру коды: 294817. Кірісті сұрамаған болсаңыз — банкке қоңырау шалыңыз.', en: 'Login code: 294817. If you did not request login — call the bank.' }, isReal: true, explanation: { ru: 'Настоящий код Kaspi — официальный отправитель, без ссылок, предупреждение позвонить если не ты.', kz: 'Нақты Kaspi коды — ресми жіберуші, сілтемелер жоқ, өзің болмаса қоңырау шал деген ескерту.', en: 'Real Kaspi code — official sender, no links, warning to call if not you.' } },
          { sender: 'Служба безопасности', message: { ru: '🚨 СРОЧНО! Ваш аккаунт взломан! Назовите код из SMS оператору: +7-XXX-XXX', kz: '🚨 ШҰҒЫЛ! Аккаунтыңыз бұзылды! Операторға SMS кодын айтыңыз: +7-XXX-XXX', en: '🚨 URGENT! Your account is hacked! Tell the code from SMS to operator: +7-XXX-XXX' }, isReal: false, explanation: { ru: 'Никакая служба безопасности не просит назвать код из SMS по телефону. Это вишинг.', kz: 'Ешбір қауіпсіздік қызметі телефон арқылы SMS кодын айтуды сұрамайды. Бұл вишинг.', en: 'No security service asks you to say SMS code over the phone. This is vishing.' } },
          { sender: 'Google', message: { ru: 'Выполнен новый вход в ваш аккаунт с устройства iPhone в Алматы. Это были вы?', kz: 'Алматыдағы iPhone құрылғысынан аккаунтыңызға жаңа кіріс жасалды. Бұл сіз болдыңыз ба?', en: 'A new sign-in to your account from iPhone in Almaty. Was this you?' }, isReal: true, explanation: { ru: 'Настоящее уведомление Google — описание устройства и места, без кодов и ссылок для ввода данных.', kz: 'Google-дің нақты хабарландыруы — құрылғы мен орын сипаттамасы, деректерді енгізу үшін код пен сілтемелер жоқ.', en: 'Real Google notification — device and location description, no codes or links to enter data.' } },
        ]},
        { type: 'quiz', question: { ru: 'Почему приложение-аутентификатор безопаснее SMS?', kz: 'Неліктен аутентификатор қосымшасы SMS-тен қауіпсізірек?', en: 'Why is authenticator app safer than SMS?' }, options: { ru: ['Красивее выглядит', 'SMS перехватывают через SIM-swap, приложение работает локально', 'Быстрее загружается', 'SMS платный'], kz: ['Әдемірек', 'SMS-ті SIM-swap арқылы ұстайды, қосымша жергілікті жұмыс істейді', 'Тезірек жүктеледі', 'SMS ақылы'], en: ['Looks nicer', 'SMS intercepted via SIM-swap, app works locally', 'Loads faster', 'SMS costs money'] }, correct: 1, explanation: { ru: 'SIM-swap позволяет перехватить SMS. Приложение-аутентификатор работает только на твоём устройстве.', kz: 'SIM-swap SMS-ті ұстауға мүмкіндік береді. Аутентификатор қосымшасы тек сенің құрылғыңда жұмыс істейді.', en: 'SIM-swap allows intercepting SMS. Authenticator app works only on your device.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Зачем сохранять резервные коды при настройке 2FA?', kz: '2FA орнатқанда неліктен резервтік кодтарды сақтау керек?', en: 'Why save backup codes when setting up 2FA?' }, options: { ru: ['Делиться с друзьями', 'Восстановить доступ если потерял телефон', 'Обойти 2FA', 'Только для IT'], kz: ['Достармен бөлісу', 'Телефонды жоғалтса қолжетімділікті қалпына келтіру', '2FA-ны айналып өту', 'Тек IT үшін'], en: ['Share with friends', 'Restore access if phone is lost', 'Bypass 2FA', 'IT only'] }, correct: 1, explanation: { ru: 'Резервные коды — единственный способ войти если потерял телефон с 2FA.', kz: 'Резервтік кодтар — 2FA бар телефонды жоғалтса кіре алатын жалғыз жол.', en: 'Backup codes are the only way to log in if phone with 2FA is lost.' }, energyCost: 1 },
      ]
    },
    3: {
      title: { ru: 'Как включить 2FA', kz: '2FA қалай қосуға болады', en: 'How to enable 2FA' },
      steps: [
        { type: 'card', title: { ru: '2FA в Instagram', kz: 'Instagram-да 2FA', en: '2FA in Instagram' }, content: { ru: 'Настройки → Центр аккаунтов → Пароль и безопасность → Двухфакторная аутентификация\n\nВыбери метод:\n1. Приложение для аутентификации (рекомендуется)\n2. SMS\n3. WhatsApp\n\nСохрани резервные коды!', kz: 'Параметрлер → Аккаунттар орталығы → Пароль және қауіпсіздік → Екі факторлы аутентификация\n\nӘдісті таңда:\n1. Аутентификация қосымшасы (ұсынылады)\n2. SMS\n3. WhatsApp\n\nРезервтік кодтарды сақта!', en: 'Settings → Accounts Center → Password and Security → Two-Factor Authentication\n\nChoose method:\n1. Authentication app (recommended)\n2. SMS\n3. WhatsApp\n\nSave backup codes!' }, energyCost: 0 },
        { type: 'card', title: { ru: '2FA в Google', kz: 'Google-да 2FA', en: '2FA in Google' }, content: { ru: 'myaccount.google.com → Безопасность → Двухэтапная аутентификация\n\nВарианты:\n→ Подсказки Google (удобно)\n→ Приложение-аутентификатор\n→ SMS\n\nGoogle предлагает passkeys — современная замена паролям!', kz: 'myaccount.google.com → Қауіпсіздік → Екі қадамды аутентификация\n\nТаңдаулар:\n→ Google нұсқаулары (ыңғайлы)\n→ Аутентификатор қосымшасы\n→ SMS\n\nGoogle passkeys ұсынады — парольдердің заманауи баламасы!', en: 'myaccount.google.com → Security → Two-Step Verification\n\nOptions:\n→ Google prompts (convenient)\n→ Authenticator app\n→ SMS\n\nGoogle offers passkeys — modern replacement for passwords!' }, energyCost: 0 },
        { type: 'card', title: { ru: 'Общие правила после включения 2FA', kz: '2FA қосқаннан кейінгі жалпы ережелер', en: 'General rules after enabling 2FA' }, content: { ru: '✓ Никогда не передавай код 2FA по телефону\n✓ Банки не просят код 2FA первыми\n✓ Незапрошенный код = кто-то пытается войти\n✓ Сохрани резервные коды\n✓ Включи 2FA везде: email, банк, соцсети', kz: '✓ 2FA кодын телефон арқылы ешқашан берме\n✓ Банктер 2FA кодын бірінші сұрамайды\n✓ Сұратылмаған код = кімдір кіруге тырысады\n✓ Резервтік кодтарды сақта\n✓ Барлық жерде 2FA қос: email, банк, желілер', en: '✓ Never give 2FA code over the phone\n✓ Banks do not ask for 2FA code first\n✓ Unrequested code = someone trying to log in\n✓ Save backup codes\n✓ Enable 2FA everywhere: email, bank, social media' }, energyCost: 0 },
        { type: 'securitysetup', title: { ru: 'Настрой защиту аккаунта', kz: 'Аккаунт қорғанысын орнат', en: 'Set up account security' }, energyCost: 2, settings: [
          { label: { ru: 'Закрытый аккаунт', kz: 'Жабық аккаунт', en: 'Private account' }, correct: true, hint: { ru: 'Закрытый аккаунт — только одобренные подписчики видят твои посты.', kz: 'Жабық аккаунт — тек бекітілген жазылушылар посттарыңды көреді.', en: 'Private account — only approved followers see your posts.' } },
          { label: { ru: 'Принимать заявки от всех незнакомцев', kz: 'Барлық бейтаныстардан өтінімді қабылдау', en: 'Accept requests from all strangers' }, correct: false, hint: { ru: 'Принимай заявки только от людей которых знаешь лично.', kz: 'Тек жеке таныстардан өтінімді қабылда.', en: 'Only accept requests from people you know personally.' } },
          { label: { ru: 'Показывать статус «онлайн» всем', kz: '«Онлайн» мәртебесін барлығына көрсету', en: 'Show "online" status to everyone' }, correct: false, hint: { ru: 'Статус онлайн помогает мошенникам определить когда ты активен.', kz: '«Онлайн» мәртебесі алаяқтарға белсенді кезіңді анықтауға көмектеседі.', en: 'Online status helps scammers determine when you are active.' } },
          { label: { ru: 'Двухфакторная аутентификация', kz: 'Екі факторлы аутентификация', en: 'Two-factor authentication' }, correct: true, hint: { ru: '2FA — второй рубеж защиты даже если пароль известен хакеру.', kz: '2FA — пароль хакерге белгілі болса да екінші қорғаныс шебі.', en: '2FA — second line of defense even if password is known to hacker.' } },
          { label: { ru: 'Геолокация для камеры включена', kz: 'Камера геолокациясы қосылған', en: 'Camera geolocation enabled' }, correct: false, hint: { ru: 'Геотеги в фото раскрывают точное место съёмки.', kz: 'Фотодағы геотегтер түсіру орнын ашады.', en: 'Geotags in photos reveal exact location of shooting.' } },
          { label: { ru: 'Сохранять резервные коды 2FA', kz: '2FA резервтік кодтарын сақтау', en: 'Save 2FA backup codes' }, correct: true, hint: { ru: 'Резервные коды — единственный способ войти если потерял телефон.', kz: 'Резервтік кодтар — телефонды жоғалтса кіре алатын жалғыз жол.', en: 'Backup codes are the only way in if you lose your phone.' } },
          { label: { ru: 'Хранить пароли в заметках телефона', kz: 'Парольдерді телефон жазбаларында сақтау', en: 'Store passwords in phone notes' }, correct: false, hint: { ru: 'Заметки не зашифрованы. Используй менеджер паролей.', kz: 'Жазбалар шифрланбаған. Пароль менеджерін пайдалан.', en: 'Notes are not encrypted. Use a password manager.' } },
          { label: { ru: 'Уведомления о каждом входе в аккаунт', kz: 'Аккаунтқа әр кіріс туралы хабарландырулар', en: 'Notifications for every account login' }, correct: true, hint: { ru: 'Уведомления о входах помогают сразу заметить несанкционированный доступ.', kz: 'Кіріс туралы хабарландырулар рұқсатсыз кіруді бірден байқауға көмектеседі.', en: 'Login notifications help immediately notice unauthorized access.' } },
        ]},
        { type: 'quiz', question: { ru: '«Служба безопасности Google» просит код из приложения. Что делаешь?', kz: '«Google қауіпсіздік қызметі» қосымшадан кодты сұрайды. Не істейсің?', en: '"Google security service" asks for code from app. What do you do?' }, options: { ru: ['Называю — Google же', 'Кладу трубку — Google не звонит и не просит коды', 'Называю первые три цифры', 'Жду'], kz: ['Айтамын — Google ғой', 'Тұтқаны қоямын — Google қоңырау шалмайды', 'Алғашқы үш цифрды айтамын', 'Күтемін'], en: ['Tell it — it is Google', 'Hang up — Google never calls or asks for codes', 'Tell first three digits', 'Wait'] }, correct: 1, explanation: { ru: 'Google никогда не звонит и не просит коды 2FA. Это мошенники.', kz: 'Google ешқашан қоңырау шалмайды және 2FA кодтарын сұрамайды. Бұл алаяқтар.', en: 'Google never calls or asks for 2FA codes. These are scammers.' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Пришёл код 2FA от Instagram но ты не входил. Что это значит?', kz: 'Instagram-дан 2FA коды келді, бірақ сен кіргенің жоқ. Бұл не дегені?', en: 'Got 2FA code from Instagram but you did not log in. What does this mean?' }, options: { ru: ['Ничего — Instagram рассылает случайно', 'Кто-то знает пароль и пытается войти', 'Instagram обновился', 'Телефон сломан'], kz: ['Ештеңе — Instagram кездейсоқ жібереді', 'Біреу парольді біледі де кіруге тырысады', 'Instagram жаңартылды', 'Телефон сынған'], en: ['Nothing — Instagram sends randomly', 'Someone knows password and tries to log in', 'Instagram updated', 'Phone broken'] }, correct: 1, explanation: { ru: 'Незапрошенный код = кто-то знает пароль. Немедленно смени пароль!', kz: 'Сұратылмаған код = біреу парольді біледі. Парольді дереу ауыстыр!', en: 'Unrequested code = someone knows password. Change password immediately!' }, energyCost: 1 },
        { type: 'quiz', question: { ru: 'Какой вид 2FA рекомендуется для максимальной защиты?', kz: 'Максималды қорғаныс үшін 2FA-ның қай түрі ұсынылады?', en: 'Which type of 2FA is recommended for maximum protection?' }, options: { ru: ['SMS', 'Приложение-аутентификатор', 'Код по email', 'Секретный вопрос'], kz: ['SMS', 'Аутентификатор қосымшасы', 'Email арқылы код', 'Құпия сұрақ'], en: ['SMS', 'Authenticator app', 'Email code', 'Secret question'] }, correct: 1, explanation: { ru: 'Приложение работает без интернета и защищено от SIM-swap.', kz: 'Қосымша интернетсіз жұмыс істейді және SIM-swap-тан қорғалған.', en: 'App works without internet and protected from SIM-swap.' }, energyCost: 1 },
      ]
    },
    4: {
      title: { ru: 'Финальный тест — 2FA', kz: 'Қорытынды тест — 2FA', en: 'Final test — 2FA' },
      steps: [{ type: 'finaltest', energyCost: 0, questions: [
        { q: { ru: 'Хакер знает пароль. Но есть 2FA через приложение. Войдёт?', kz: 'Хакер парольді біледі. Бірақ 2FA қосымша арқылы бар. Кіре ала ма?', en: 'Hacker knows password. But 2FA via app exists. Can they log in?' }, options: { ru: ['Да — пароль главное', 'Нет — без кода из приложения невозможно', 'Да если попробует много раз', 'Зависит от пароля'], kz: ['Иә — пароль негізгі', 'Жоқ — қосымшадан кодсыз мүмкін емес', 'Иә, көп рет тырысса', 'Парольге байланысты'], en: ['Yes — password is main', 'No — without app code impossible', 'Yes if tries many times', 'Depends on password'] }, correct: 1, explanation: { ru: 'Без второго фактора войти невозможно даже зная пароль.', kz: 'Екінші фактор болмаса парольді білсе де кіру мүмкін емес.', en: 'Without second factor login is impossible even knowing password.' } },
        { q: { ru: 'Что такое двухфакторная аутентификация?', kz: 'Екі факторлы аутентификация дегеніміз не?', en: 'What is two-factor authentication?' }, options: { ru: ['Два пароля', 'Второй шаг подтверждения помимо пароля', 'Сложный пароль', 'Шифрование'], kz: ['Екі пароль', 'Парольден басқа екінші растау қадамы', 'Күрделі пароль', 'Шифрлау'], en: ['Two passwords', 'Second confirmation step beyond password', 'Complex password', 'Encryption'] }, correct: 1, explanation: { ru: '2FA — второй рубеж защиты после пароля.', kz: '2FA — парольден кейінгі екінші қорғаныс шебі.', en: '2FA — second line of defense after password.' } },
        { q: { ru: 'Пришёл SMS-код от банка которого не запрашивал. Что делаешь?', kz: 'Сұратылмаған банк SMS-коды келді. Не істейсің?', en: 'Unrequested SMS code from bank arrived. What do you do?' }, options: { ru: ['Ничего — бывает', 'Сменить пароль и позвонить в банк', 'Написать на сайт банка', 'Подождать'], kz: ['Ештеңе — болады', 'Пароль ауыстырып, банкке қоңырау шалу', 'Банктің сайтына жазу', 'Күту'], en: ['Nothing — it happens', 'Change password and call bank', 'Write to bank site', 'Wait'] }, correct: 1, explanation: { ru: 'Незапрошенный код = попытка входа. Срочно меняй пароль и звони в банк.', kz: 'Сұратылмаған код = кіруге тырысу. Парольді дереу ауыстыр және банкке қоңырау шал.', en: 'Unrequested code = login attempt. Change password urgently and call bank.' } },
        { q: { ru: 'Почему нельзя называть код 2FA по телефону?', kz: 'Неліктен 2FA кодын телефон арқылы айтуға болмайды?', en: 'Why should you not say 2FA code over phone?' }, options: { ru: ['Можно — если это банк', 'Легитимные сервисы никогда не просят коды по телефону', 'Только незнакомым нельзя', 'Если просят — надо дать'], kz: ['Болады — банк болса', 'Заңды сервистер телефон арқылы ешқашан код сұрамайды', 'Тек бейтаныстарға болмайды', 'Сұраса — беру керек'], en: ['OK if it is bank', 'Legit services never ask codes over phone', 'Only strangers not allowed', 'If asked — must give'] }, correct: 1, explanation: { ru: 'Ни один легитимный сервис не попросит код 2FA по телефону. Это всегда мошенники.', kz: 'Ешбір заңды сервис телефон арқылы 2FA кодын сұрамайды. Бұл әрқашан алаяқтар.', en: 'No legitimate service asks for 2FA code over phone. This is always scammers.' } },
        { q: { ru: 'Главное преимущество приложения-аутентификатора перед SMS?', kz: 'Аутентификатор қосымшасының SMS-тен басты артықшылығы?', en: 'Main advantage of authenticator app over SMS?' }, options: { ru: ['Красивее', 'Работает без интернета и защищён от SIM-swap', 'Быстрее', 'Бесплатный'], kz: ['Әдемірек', 'Интернетсіз жұмыс істейді және SIM-swap-тан қорғалған', 'Тезірек', 'Тегін'], en: ['Nicer', 'Works without internet and protected from SIM-swap', 'Faster', 'Free'] }, correct: 1, explanation: { ru: 'Приложение работает локально и не подвержено SIM-swap атакам.', kz: 'Қосымша жергілікті жерде жұмыс істейді және SIM-swap шабуылдарына ұшырамайды.', en: 'App works locally and is not susceptible to SIM-swap attacks.' } },
        { q: { ru: 'Где правильно хранить резервные коды 2FA?', kz: '2FA резервтік кодтарын қайда дұрыс сақтау керек?', en: 'Where to correctly store 2FA backup codes?' }, options: { ru: ['В заметках', 'Распечатать или в менеджер паролей', 'В email', 'Не нужно'], kz: ['Жазбаларда', 'Басып шығару немесе пароль менеджерінде', 'Email-де', 'Қажет емес'], en: ['In notes', 'Print or in password manager', 'In email', 'Not needed'] }, correct: 1, explanation: { ru: 'Распечатать и хранить в надёжном месте или в зашифрованном менеджере паролей.', kz: 'Басып шығарып сенімді жерде немесе шифрланған пароль менеджерінде сақтау.', en: 'Print and keep in safe place or in encrypted password manager.' } },
        { q: { ru: 'Сана звонят и просят назвать код аутентификатора. Что делать?', kz: 'Санаға қоңырау шалып аутентификатор кодын сұрайды. Не істеу керек?', en: 'Sana is called and asked to say authenticator code. What to do?' }, options: { ru: ['Назвать — если просят вежливо', 'Положить трубку — никто не должен знать этот код', 'Назвать если официальный номер', 'Подождать и решить'], kz: ['Айту — жұпар сұраса', 'Тұтқаны қою — бұл кодты ешкім білмеуі керек', 'Ресми нөмір болса айту', 'Күтіп шешу'], en: ['Tell — if asked politely', 'Hang up — nobody should know this code', 'Tell if official number', 'Wait and decide'] }, correct: 1, explanation: { ru: 'Код аутентификатора — только для тебя. Никто не должен его знать.', kz: 'Аутентификатор коды — тек сен үшін. Ешкім білмеуі керек.', en: 'Authenticator code is only for you. Nobody should know it.' } },
        { q: { ru: 'На каком этапе входа запрашивается код 2FA?', kz: 'Кіру процесінің қай кезеңінде 2FA коды сұралады?', en: 'At what stage of login is 2FA code requested?' }, options: { ru: ['До пароля', 'После правильного ввода логина и пароля', 'Вместо пароля', 'Только при первом входе'], kz: ['Парольге дейін', 'Логин мен пароль дұрыс енгізілгеннен кейін', 'Пароль орнына', 'Тек бірінші кіруде'], en: ['Before password', 'After correct login and password', 'Instead of password', 'Only on first login'] }, correct: 1, explanation: { ru: 'Сначала логин + пароль, потом второй фактор — код 2FA.', kz: 'Алдымен логин + пароль, содан кейін екінші фактор — 2FA коды.', en: 'First login + password, then second factor — 2FA code.' } },
        { q: { ru: '«2FA неудобная». Как ответить?', kz: '«2FA ыңғайсыз». Қалай жауап бересің?', en: '"2FA inconvenient". How to reply?' }, options: { ru: ['Ты прав — лучше без нее', 'Небольшое неудобство стоит того — 2FA блокирует большинство атак', 'Можно отключить', 'Только для банков'], kz: ['Дұрыс айтасың — ол жоқ жақсы', 'Шамалы ыңғайсыздық тұрарлық — 2FA шабуылдардың көпшілігін бұғаттайды', 'Өшіруге болады', 'Тек банктерге'], en: ['You are right — better without', 'Small inconvenience worth it — 2FA blocks most attacks', 'Can be disabled', 'Banks only'] }, correct: 1, explanation: { ru: 'Секунда неудобства ради надёжной защиты — правильный выбор.', kz: 'Сенімді қорғаныс үшін бір секунд ыңғайсыздық — дұрыс таңдау.', en: 'A second of inconvenience for reliable protection — the right choice.' } },
        { q: { ru: 'Незапрошенный код 2FA означает...', kz: 'Сұратылмаған 2FA коды нені білдіреді...', en: 'Unrequested 2FA code means...' }, options: { ru: ['Сервис обновился', 'Кто-то знает пароль — срочно смени', 'Ошибка системы', 'Всё нормально'], kz: ['Сервис жаңартылды', 'Біреу парольді біледі — дереу ауыстыр', 'Жүйе қателігі', 'Бәрі қалыпты'], en: ['Service updated', 'Someone knows password — change immediately', 'System error', 'All fine'] }, correct: 1, explanation: { ru: 'Незапрошенный код = попытка взлома. Немедленно меняй пароль!', kz: 'Сұратылмаған код = бұзу әрекеті. Парольді дереу ауыстыр!', en: 'Unrequested code = hacking attempt. Change password immediately!' } },
      ]}]
    }
  }
}
// ═══ УТИЛИТЫ ПАРОЛЕЙ ═══
const STRENGTH = [
  { ru: 'Критически слабый', kz: 'Өте әлсіз', en: 'Critically weak', color: '#ef4444' },
  { ru: 'Слабый', kz: 'Әлсіз', en: 'Weak', color: '#f97316' },
  { ru: 'Средний', kz: 'Орташа', en: 'Medium', color: '#f59e0b' },
  { ru: 'Хороший', kz: 'Жақсы', en: 'Good', color: '#84cc16' },
  { ru: 'Неуязвимый', kz: 'Бұзылмайтын', en: 'Unbreakable', color: '#22c55e' },
]
function pwScore(pw) {
  let s = 0
  if (pw.length >= 8) s++
  if (pw.length >= 12) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}
function pwChecks(pw) {
  return { length: pw.length >= 12, upper: /[A-Z]/.test(pw), digit: /[0-9]/.test(pw), special: /[^A-Za-z0-9]/.test(pw) }
}
function pwCrackTime(pw, lang) {
  const L = { none: { ru: '—', kz: '—', en: '—' }, instant: { ru: 'мгновенно', kz: 'бірден', en: 'instantly' }, seconds: { ru: 'секунды', kz: 'секундтар', en: 'seconds' }, minutes: { ru: 'минуты', kz: 'минуттар', en: 'minutes' }, hours: { ru: 'часы', kz: 'сағаттар', en: 'hours' }, days: { ru: 'дни', kz: 'күндер', en: 'days' }, years: { ru: 'годы', kz: 'жылдар', en: 'years' }, centuries: { ru: 'века', kz: 'ғасырлар', en: 'centuries' } }
  if (!pw) return L.none[lang]
  let pool = 0
  if (/[a-z]/.test(pw)) pool += 26
  if (/[A-Z]/.test(pw)) pool += 26
  if (/[0-9]/.test(pw)) pool += 10
  if (/[^A-Za-z0-9]/.test(pw)) pool += 32
  if (pool === 0) pool = 1
  const log10sec = pw.length * Math.log10(pool) - Math.log10(2) - 10
  if (log10sec < 0) return L.instant[lang]
  if (log10sec < 1.78) return L.seconds[lang]
  if (log10sec < 3.56) return L.minutes[lang]
  if (log10sec < 4.94) return L.hours[lang]
  if (log10sec < 7.5) return L.days[lang]
  if (log10sec < 9.5) return L.years[lang]
  return L.centuries[lang]
}

// ═══════════════════════════════════════════════
// ИГРА 1: М1.2 — Угадай какой пароль взломают первым
// ═══════════════════════════════════════════════
function PasswordRankGame({ step, lang, onComplete }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const strengthColors = { 1: '#ef4444', 2: '#f97316', 3: '#f59e0b', 4: '#84cc16', 5: '#22c55e' }
  const weakestIdx = step.passwords.reduce((minI, p, i) => p.strength < step.passwords[minI].strength ? i : minI, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <p style={{ color: '#aaa', fontSize: '14px', margin: 0, textAlign: 'center' }}>
        {lang === 'ru' ? '👇 Нажми на пароль который взломают ПЕРВЫМ:' : lang === 'kz' ? '👇 Алдымен бұзылатын парольді таңда:' : '👇 Tap the password that gets hacked FIRST:'}
      </p>
      {step.passwords.map((p, i) => {
        let bg = '#1a1a2e', border = '#2a2a4a', textColor = '#fff', extra = null
        if (revealed) {
          if (i === weakestIdx) {
            bg = 'rgba(239,68,68,0.15)'; border = '#ef4444'; textColor = '#ef4444'
          } else {
            bg = 'rgba(34,197,94,0.06)'; border = '#22c55e33'; textColor = '#666'
          }
        } else if (selected === i) {
          bg = 'rgba(79,70,229,0.2)'; border = '#4f46e5'
        }
        return (
          <div key={i} onClick={() => { if (!revealed) setSelected(i) }}
            style={{ background: bg, border: `2px solid ${border}`, borderRadius: '12px', padding: '16px', cursor: revealed ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s' }}>
            <span style={{ color: textColor, fontFamily: 'monospace', fontSize: '17px', fontWeight: '700' }}>{p.pw}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {revealed && (
                <>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: strengthColors[p.strength] }} />
                  <span style={{ color: strengthColors[p.strength], fontSize: '12px', fontWeight: '700' }}>{p.label[lang]}</span>
                </>
              )}
              {!revealed && selected === i && <span style={{ color: '#4f46e5', fontSize: '20px' }}>●</span>}
            </div>
          </div>
        )
      })}

      {!revealed ? (
        <button onClick={() => { if (selected !== null) setRevealed(true) }}
          disabled={selected === null}
          style={{ background: selected !== null ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#2a2a4a', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: selected !== null ? 'pointer' : 'default', opacity: selected !== null ? 1 : 0.5 }}>
          {lang === 'ru' ? '🔍 Показать результат' : lang === 'kz' ? '🔍 Нәтижені көрсету' : '🔍 Show result'}
        </button>
      ) : (
        <>
          <div style={{ background: selected === weakestIdx ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${selected === weakestIdx ? '#22c55e' : '#ef4444'}`, borderRadius: '14px', padding: '16px' }}>
            <p style={{ color: selected === weakestIdx ? '#22c55e' : '#ef4444', fontWeight: '700', margin: '0 0 8px 0', fontSize: '15px' }}>
              {selected === weakestIdx
                ? (lang === 'ru' ? '✅ Правильно! Ты видишь слабые пароли!' : lang === 'kz' ? '✅ Дұрыс! Әлсіз парольдерді көресің!' : '✅ Correct! You spot weak passwords!')
                : (lang === 'ru' ? `❌ Не совсем! Самый слабый: ${step.passwords[weakestIdx].pw}` : lang === 'kz' ? `❌ Дәл емес! Ең әлсізі: ${step.passwords[weakestIdx].pw}` : `❌ Not quite! Weakest: ${step.passwords[weakestIdx].pw}`)}
            </p>
            <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>{step.passwords[weakestIdx].label[lang]}</p>
          </div>
          <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '14px' }}>
            <p style={{ color: '#a5b4fc', fontSize: '13px', margin: '0 0 8px 0', fontWeight: '700' }}>
              {lang === 'ru' ? '💡 Почему такой порядок?' : lang === 'kz' ? '💡 Неліктен бұндай тәртіп?' : '💡 Why this order?'}
            </p>
            <p style={{ color: '#888', fontSize: '12px', margin: 0, lineHeight: '1.6' }}>
              {lang === 'ru' ? '123456 и qwerty123 — первые в словарях хакеров. P@ssw0rd — известный несмотря на символы. Sana2008! — предсказуемый шаблон. ТауБөріАлматы#88 — длинная фраза почти невозможна для взлома!'
                : lang === 'kz' ? '123456 және qwerty123 — хакерлер сөздіктерінде бірінші. P@ssw0rd — таңбаларына қарамастан танымал. Sana2008! — болжамды үлгі. ТауБөріАлматы#88 — ұзын сөз тіркесін бұзу мүмкін емес!'
                : '123456 and qwerty123 — first in hacker dictionaries. P@ssw0rd — famous despite symbols. Sana2008! — predictable pattern. MountainWolfAlmaty#88 — long passphrase nearly impossible to crack!'}
            </p>
          </div>
          <button onClick={onComplete} style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            {lang === 'ru' ? 'Продолжить →' : lang === 'kz' ? 'Жалғастыру →' : 'Continue →'}
          </button>
        </>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════
// ИГРА 2: М2.2 — Найди признаки фишинга
// ═══════════════════════════════════════════════
function PhishingDetectGame({ step, lang, onComplete }) {
  const [found, setFound] = useState([])
  const [checked, setChecked] = useState(false)
  const allClues = step.email.clues

  const toggle = (id) => {
    if (checked) return
    setFound(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ background: '#0f1a2e', border: '1px solid #1e3a5f', borderRadius: '14px', overflow: 'hidden' }}>
        {/* Email header */}
        <div style={{ background: '#0d1b2e', borderBottom: '1px solid #1e3a5f', padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ color: '#64748b', fontSize: '12px', width: '50px' }}>{lang === 'ru' ? 'От:' : lang === 'kz' ? 'Кімнен:' : 'From:'}</span>
            <span
              onClick={() => toggle('sender')}
              style={{
                color: found.includes('sender') ? '#ef4444' : '#f97316',
                fontSize: '13px', cursor: 'pointer', fontWeight: '600',
                background: found.includes('sender') ? 'rgba(239,68,68,0.15)' : checked ? 'rgba(239,68,68,0.1)' : 'transparent',
                padding: '2px 6px', borderRadius: '4px', border: found.includes('sender') || checked ? '1px solid #ef444466' : '1px dashed #f9731688',
                textDecoration: 'underline dotted'
              }}>
              {step.email.from[lang]}
            </span>
            {(found.includes('sender') || checked) && <span style={{ color: '#ef4444', fontSize: '11px' }}>🚩</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ color: '#64748b', fontSize: '12px', width: '50px', paddingTop: '2px' }}>{lang === 'ru' ? 'Тема:' : lang === 'kz' ? 'Тақырып:' : 'Subject:'}</span>
            <span
              onClick={() => toggle('urgency')}
              style={{
                color: found.includes('urgency') ? '#ef4444' : '#fbbf24',
                fontSize: '13px', cursor: 'pointer', fontWeight: '600',
                background: found.includes('urgency') ? 'rgba(239,68,68,0.15)' : checked ? 'rgba(239,68,68,0.1)' : 'transparent',
                padding: '2px 6px', borderRadius: '4px', border: found.includes('urgency') || checked ? '1px solid #ef444466' : '1px dashed #fbbf2488',
                textDecoration: 'underline dotted'
              }}>
              {step.email.subject[lang]}
            </span>
            {(found.includes('urgency') || checked) && <span style={{ color: '#ef4444', fontSize: '11px' }}>🚩</span>}
          </div>
        </div>
        {/* Email body */}
        <div style={{ padding: '14px', position: 'relative' }}>
          <pre style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7', margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
            {step.email.body[lang].split('kaspi-secure-login.xyz').map((part, i, arr) => (
              <span key={i}>
                {part.includes('обнаружели') || part.includes('обнаружели') ? (
                  <>
                    {part.split('обнаружели').map((p2, j, arr2) => (
                      <span key={j}>
                        {p2}
                        {j < arr2.length - 1 && (
                          <span
                            onClick={() => toggle('typo')}
                            style={{
                              color: found.includes('typo') ? '#ef4444' : '#fb923c',
                              cursor: 'pointer', fontWeight: '700',
                              background: found.includes('typo') ? 'rgba(239,68,68,0.2)' : checked ? 'rgba(239,68,68,0.1)' : 'rgba(251,146,60,0.15)',
                              padding: '1px 4px', borderRadius: '3px',
                              border: found.includes('typo') || checked ? '1px solid #ef444466' : '1px dashed #fb923c88',
                            }}>обнаружели</span>
                        )}
                      </span>
                    ))}
                  </>
                ) : part}
                {i < arr.length - 1 && (
                  <span
                    onClick={() => toggle('link')}
                    style={{
                      color: found.includes('link') ? '#ef4444' : '#60a5fa',
                      cursor: 'pointer', fontWeight: '700',
                      background: found.includes('link') ? 'rgba(239,68,68,0.2)' : checked ? 'rgba(239,68,68,0.1)' : 'rgba(96,165,250,0.15)',
                      padding: '1px 6px', borderRadius: '3px',
                      border: found.includes('link') || checked ? '1px solid #ef444466' : '1px dashed #60a5fa88',
                    }}>kaspi-secure-login.xyz</span>
                )}
              </span>
            ))}
          </pre>
          {checked && (
            <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239,68,68,0.9)', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', color: '#fff', fontWeight: '700' }}>
              ⚠️ {lang === 'ru' ? 'ФИШИНГ' : lang === 'kz' ? 'ФИШИНГ' : 'PHISHING'}
            </div>
          )}
        </div>
      </div>

      <p style={{ color: '#666', fontSize: '12px', margin: 0, textAlign: 'center' }}>
        {lang === 'ru' ? '👆 Нажимай на подозрительные части письма чтобы отметить их' : lang === 'kz' ? '👆 Күдікті бөліктерді белгілеу үшін оларды басыңыз' : '👆 Tap suspicious parts of the email to mark them'}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {allClues.map(clue => (
          <div key={clue.id} onClick={() => toggle(clue.id)}
            style={{
              background: found.includes(clue.id) ? 'rgba(239,68,68,0.15)' : '#1a1a2e',
              border: `1px solid ${found.includes(clue.id) ? '#ef4444' : '#2a2a4a'}`,
              borderRadius: '8px', padding: '6px 12px', cursor: checked ? 'default' : 'pointer',
              color: found.includes(clue.id) ? '#ef4444' : '#888', fontSize: '12px', fontWeight: '600',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
            {found.includes(clue.id) ? <Check size={12} /> : <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '1px solid #444' }} />}
            {clue.label[lang]}
          </div>
        ))}
      </div>

      {checked && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {allClues.map(clue => (
            <div key={clue.id} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid #ef444433', borderRadius: '10px', padding: '10px 14px' }}>
              <p style={{ color: '#ef4444', fontSize: '12px', fontWeight: '700', margin: '0 0 4px 0' }}>{clue.label[lang]}</p>
              <p style={{ color: '#ccc', fontSize: '12px', margin: 0 }}>{clue.hint[lang]}</p>
            </div>
          ))}
        </div>
      )}

      {!checked ? (
        <button onClick={() => setChecked(true)} disabled={found.length === 0}
          style={{ background: found.length > 0 ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : '#2a2a4a', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: found.length > 0 ? 'pointer' : 'default', opacity: found.length > 0 ? 1 : 0.5 }}>
          {lang === 'ru' ? `🔍 Проверить (найдено: ${found.length})` : lang === 'kz' ? `🔍 Тексеру (табылды: ${found.length})` : `🔍 Check (found: ${found.length})`}
        </button>
      ) : (
        <>
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#ef4444', fontWeight: '700', fontSize: '16px', margin: '0 0 6px 0' }}>
              🎯 {lang === 'ru' ? `Все ${allClues.length} признака разобраны!` : lang === 'kz' ? `Барлық ${allClues.length} белгі қарастырылды!` : `All ${allClues.length} signs analyzed!`}
            </p>
            <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>
              {lang === 'ru' ? 'Теперь ты знаешь как выглядит фишинг!' : lang === 'kz' ? 'Енді фишинг қандай болатынын білесің!' : 'Now you know what phishing looks like!'}
            </p>
          </div>
          <button onClick={onComplete} style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            {lang === 'ru' ? 'Продолжить →' : lang === 'kz' ? 'Жалғастыру →' : 'Continue →'}
          </button>
        </>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════
// ИГРА 3: М2.3 — Симулятор звонка мошенника
// ═══════════════════════════════════════════════
function CallSimulatorGame({ step, lang, onComplete }) {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [done, setDone] = useState(false)
  const scenario = step.scenarios[scenarioIdx]

  const handleNext = () => {
    if (scenarioIdx < step.scenarios.length - 1) { setScenarioIdx(s => s + 1); setSelectedOption(null) }
    else setDone(true)
  }
  if (done) { onComplete(); return null }

  const opt = selectedOption !== null ? scenario.options[selectedOption] : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <p style={{ color: '#666', fontSize: '13px', textAlign: 'center', margin: 0 }}>
        {lang === 'ru' ? `Звонок ${scenarioIdx + 1} из ${step.scenarios.length}` : lang === 'kz' ? `${scenarioIdx + 1}/${step.scenarios.length} қоңырау` : `Call ${scenarioIdx + 1} of ${step.scenarios.length}`}
      </p>

      {/* Phone mockup */}
      <div style={{ background: '#1a1a2e', border: '2px solid #2a2a4a', borderRadius: '20px', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', padding: '20px 16px', textAlign: 'center', borderBottom: '1px solid #2a2a4a' }}>
          <div style={{ fontSize: '44px', marginBottom: '8px' }}>{scenario.avatar}</div>
          <p style={{ color: '#fff', fontSize: '16px', fontWeight: '700', margin: '0 0 4px 0' }}>{scenario.caller[lang]}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1s infinite' }} />
            <p style={{ color: '#22c55e', fontSize: '12px', margin: 0, fontWeight: '600' }}>
              {lang === 'ru' ? '📞 Входящий звонок' : lang === 'kz' ? '📞 Кіріс қоңырау' : '📞 Incoming call'}
            </p>
          </div>
        </div>
        <div style={{ padding: '16px', background: '#0f0f1a' }}>
          <div style={{ background: '#1a2744', borderRadius: '10px', padding: '14px', borderLeft: '3px solid #3b82f6' }}>
            <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
              «{scenario.message[lang]}»
            </p>
          </div>
        </div>
        {/* Action buttons visual */}
        {selectedOption === null && (
          <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-around', background: '#0a0a16', borderTop: '1px solid #2a2a4a' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.4 }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📵</div>
              <span style={{ color: '#888', fontSize: '10px' }}>{lang === 'ru' ? 'Отклонить' : lang === 'kz' ? 'Бас тарту' : 'Decline'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', opacity: 0.4 }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📞</div>
              <span style={{ color: '#888', fontSize: '10px' }}>{lang === 'ru' ? 'Принять' : lang === 'kz' ? 'Қабылдау' : 'Accept'}</span>
            </div>
          </div>
        )}
      </div>

      <p style={{ color: '#a5b4fc', fontSize: '13px', textAlign: 'center', fontWeight: '600', margin: 0 }}>
        {lang === 'ru' ? '💬 Выбери свой ответ:' : lang === 'kz' ? '💬 Жауабыңды таңда:' : '💬 Choose your response:'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {scenario.options.map((o, i) => {
          let bg = '#1a1a2e', border = '#2a2a4a', color = '#fff'
          if (selectedOption !== null && i === selectedOption) {
            bg = o.correct ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'
            border = o.correct ? '#22c55e' : '#ef4444'
            color = o.correct ? '#22c55e' : '#ef4444'
          }
          return (
            <button key={i} onClick={() => { if (selectedOption === null) setSelectedOption(i) }} disabled={selectedOption !== null}
              style={{ background: bg, border: `2px solid ${border}`, borderRadius: '10px', padding: '12px 14px', color, fontSize: '14px', fontWeight: '500', cursor: selectedOption === null ? 'pointer' : 'default', textAlign: 'left', lineHeight: '1.5', transition: 'all 0.2s' }}>
              {o.text[lang]}
            </button>
          )
        })}
      </div>

      {selectedOption !== null && opt && (
        <>
          <div style={{ background: opt.correct ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${opt.correct ? '#22c55e' : '#ef4444'}`, borderRadius: '12px', padding: '14px' }}>
            <p style={{ color: opt.correct ? '#22c55e' : '#ef4444', fontSize: '14px', margin: 0, lineHeight: '1.6', fontWeight: '500' }}>{opt.feedback[lang]}</p>
          </div>
          <button onClick={handleNext} style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            {scenarioIdx < step.scenarios.length - 1 ? (lang === 'ru' ? 'Следующий звонок →' : lang === 'kz' ? 'Келесі қоңырау →' : 'Next call →') : (lang === 'ru' ? 'Завершить ✓' : lang === 'kz' ? 'Аяқтау ✓' : 'Finish ✓')}
          </button>
        </>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════
// ИГРА 4: М3.2 — Настрой приватность Instagram
// ═══════════════════════════════════════════════
function PrivacySetupGame({ step, lang, onComplete }) {
  const [toggles, setToggles] = useState(step.settings.map(() => false))
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)

  const handleToggle = (i) => {
    if (checked) return
    setToggles(prev => { const next = [...prev]; next[i] = !next[i]; return next })
  }
  const handleCheck = () => {
    let s = 0
    step.settings.forEach((setting, i) => { if (toggles[i] === setting.correct) s++ })
    setScore(s)
    setChecked(true)
  }
  const allCorrect = score === step.settings.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Instagram-style header */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #f77737)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '24px' }}>📸</div>
          <div>
            <p style={{ color: '#fff', fontWeight: '700', fontSize: '14px', margin: 0 }}>Instagram</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', margin: 0 }}>
              {lang === 'ru' ? 'Конфиденциальность и безопасность' : lang === 'kz' ? 'Құпиялылық және қауіпсіздік' : 'Privacy and Security'}
            </p>
          </div>
          {checked && (
            <div style={{ marginLeft: 'auto', background: allCorrect ? '#22c55e' : '#f59e0b', borderRadius: '8px', padding: '4px 10px', fontSize: '12px', color: '#fff', fontWeight: '700' }}>
              {allCorrect ? (lang === 'ru' ? '✓ Защищён' : lang === 'kz' ? '✓ Қорғалған' : '✓ Protected') : `${score}/${step.settings.length}`}
            </div>
          )}
        </div>
        <div>
          {step.settings.map((setting, i) => {
            let rowBg = 'transparent', leftBorder = 'transparent'
            if (checked) {
              if (toggles[i] === setting.correct) { rowBg = 'rgba(34,197,94,0.06)'; leftBorder = '#22c55e' }
              else { rowBg = 'rgba(239,68,68,0.08)'; leftBorder = '#ef4444' }
            }
            return (
              <div key={i} onClick={() => handleToggle(i)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', background: rowBg, borderLeft: `3px solid ${leftBorder}`, borderBottom: '1px solid #2a2a4a22', cursor: checked ? 'default' : 'pointer' }}>
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  <p style={{ color: '#fff', fontSize: '13px', margin: 0, fontWeight: '500' }}>{setting.label[lang]}</p>
                  {checked && toggles[i] !== setting.correct && (
                    <p style={{ color: '#fca5a5', fontSize: '11px', margin: '4px 0 0 0' }}>{setting.hint[lang]}</p>
                  )}
                </div>
                <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: toggles[i] ? '#833ab4' : '#2a2a4a', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: '2px', left: toggles[i] ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {!checked ? (
        <button onClick={handleCheck}
          style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d)', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
          {lang === 'ru' ? '🔍 Проверить настройки' : lang === 'kz' ? '🔍 Параметрлерді тексеру' : '🔍 Check settings'}
        </button>
      ) : (
        <>
          <div style={{ background: allCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${allCorrect ? '#22c55e' : '#f59e0b'}`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
            <p style={{ color: allCorrect ? '#22c55e' : '#f59e0b', fontWeight: '700', margin: '0 0 4px 0', fontSize: '16px' }}>
              {allCorrect
                ? (lang === 'ru' ? '🎉 Профиль максимально защищён!' : lang === 'kz' ? '🎉 Профиль максималды қорғалды!' : '🎉 Profile maximally protected!')
                : (lang === 'ru' ? `${score}/${step.settings.length} правильно — исправь красные!` : lang === 'kz' ? `${step.settings.length}-нан ${score} дұрыс — қызылдарды түзет!` : `${score}/${step.settings.length} correct — fix the red ones!`)}
            </p>
            <img src="/sana_mascot.png" alt="Сана" style={{ width: '48px', height: '48px', objectFit: 'contain', marginTop: '8px' }} />
          </div>
          <button onClick={onComplete}
            style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            {lang === 'ru' ? 'Продолжить →' : lang === 'kz' ? 'Жалғастыру →' : 'Continue →'}
          </button>
        </>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════
// ИГРА 5: М4.1 — Взломают или нет?
// ═══════════════════════════════════════════════
function AccountCheckGame({ step, lang, onComplete }) {
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [done, setDone] = useState(false)
  const account = step.accounts[index]

  const handleNext = () => {
    if (index < step.accounts.length - 1) { setIndex(i => i + 1); setAnswer(null) }
    else setDone(true)
  }
  if (done) { onComplete(); return null }
  const isCorrect = answer === account.willBeHacked

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <p style={{ color: '#666', fontSize: '13px', textAlign: 'center', margin: 0 }}>
        {lang === 'ru' ? `Аккаунт ${index + 1} из ${step.accounts.length}` : lang === 'kz' ? `${index + 1}/${step.accounts.length} аккаунт` : `Account ${index + 1} of ${step.accounts.length}`}
      </p>
      <div style={{ background: '#1a1a2e', border: '2px solid #2a2a4a', borderRadius: '16px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👤</div>
          <div>
            <p style={{ color: '#a5b4fc', fontSize: '11px', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {lang === 'ru' ? 'Профиль' : lang === 'kz' ? 'Профиль' : 'Profile'}
            </p>
            <p style={{ color: '#fff', fontSize: '17px', fontWeight: '700', margin: 0 }}>{account.name[lang]}</p>
          </div>
        </div>
        <div style={{ background: '#0f0f1a', borderRadius: '12px', padding: '16px' }}>
          <pre style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '2', margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
            {account.details[lang]}
          </pre>
        </div>
      </div>

      <p style={{ color: '#aaa', fontSize: '14px', textAlign: 'center', fontWeight: '600', margin: 0 }}>
        {lang === 'ru' ? '❓ Смогут ли хакеры взломать этот аккаунт?' : lang === 'kz' ? '❓ Хакерлер бұл аккаунтты бұза ала ма?' : '❓ Can hackers break into this account?'}
      </p>

      {answer === null ? (
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setAnswer(true)}
            style={{ flex: 1, background: 'rgba(239,68,68,0.1)', border: '2px solid #ef4444', borderRadius: '12px', padding: '18px', color: '#ef4444', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            💀 {lang === 'ru' ? 'Взломают!' : lang === 'kz' ? 'Бұзады!' : 'Will hack!'}
          </button>
          <button onClick={() => setAnswer(false)}
            style={{ flex: 1, background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e', borderRadius: '12px', padding: '18px', color: '#22c55e', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            🛡️ {lang === 'ru' ? 'Защищён!' : lang === 'kz' ? 'Қорғалған!' : 'Protected!'}
          </button>
        </div>
      ) : (
        <>
          <div style={{ background: isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`, borderRadius: '14px', padding: '16px' }}>
            <p style={{ color: isCorrect ? '#22c55e' : '#ef4444', fontWeight: '700', margin: '0 0 8px 0', fontSize: '15px' }}>
              {isCorrect ? (lang === 'ru' ? '✅ Правильно!' : lang === 'kz' ? '✅ Дұрыс!' : '✅ Correct!') : (lang === 'ru' ? '❌ Неверно!' : lang === 'kz' ? '❌ Қате!' : '❌ Wrong!')}
            </p>
            <p style={{ color: '#ccc', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>{account.explanation[lang]}</p>
          </div>
          <button onClick={handleNext}
            style={{ background: 'linear-gradient(135deg, #059669, #10b981)', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
            {index < step.accounts.length - 1 ? (lang === 'ru' ? 'Следующий аккаунт →' : lang === 'kz' ? 'Келесі аккаунт →' : 'Next account →') : (lang === 'ru' ? 'Завершить ✓' : lang === 'kz' ? 'Аяқтау ✓' : 'Finish ✓')}
          </button>
        </>
      )}
    </div>
  )
}

// ═══ СУЩЕСТВУЮЩИЕ ИГРЫ (SafePublish, Cyberbullying, RealOrFake, SecuritySetup) ═══
function SafePublishGame({ step, lang, onComplete, onAddPoints, streakBonus, setStreakBonus, correctStreak, setCorrectStreak }) {
  const [index, setIndex] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [done, setDone] = useState(false)
  const item = step.items[index]
  const handleAnswer = (safe) => {
    if (answered !== null) return
    const isCorrect = safe === item.safe
    setAnswered(safe)
    if (isCorrect) {
      const newStreak = correctStreak + 1; setCorrectStreak(newStreak)
      if (newStreak % 5 === 0) { onAddPoints(3); setStreakBonus(true) }
    } else { setCorrectStreak(0) }
  }
  const handleNext = () => {
    if (index < step.items.length - 1) { setIndex(p => p + 1); setAnswered(null); setStreakBonus(false) }
    else { onComplete(); }
  }
  if (done) return null
  const isCorrect = answered === item.safe
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #e879f9, #a855f7)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fff' }}>А</div>
          <span style={{ color: '#fff', fontWeight: '700', fontSize: '13px' }}>@user_{index + 1}</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginLeft: 'auto' }}>{lang === 'ru' ? 'только что' : lang === 'kz' ? 'жаңа ғана' : 'just now'}</span>
        </div>
        <div style={{ padding: '18px', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontSize: '18px', margin: 0, lineHeight: '1.5' }}>{item.text[lang]}</p>
        </div>
        <div style={{ padding: '0 14px 12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {['❤️', '💬', '📤'].map(e => <span key={e} style={{ fontSize: '18px', opacity: 0.4 }}>{e}</span>)}
        </div>
      </div>
      <p style={{ color: '#666', fontSize: '12px', textAlign: 'center', margin: 0 }}>
        {lang === 'ru' ? `${index + 1} / ${step.items.length}` : `${index + 1} / ${step.items.length}`}
      </p>
      {answered === null ? (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleAnswer(true)} style={{ flex: 1, background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e', borderRadius: '12px', padding: '14px', color: '#22c55e', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
            ✅ {lang === 'ru' ? 'Безопасно' : lang === 'kz' ? 'Қауіпсіз' : 'Safe'}
          </button>
          <button onClick={() => handleAnswer(false)} style={{ flex: 1, background: 'rgba(239,68,68,0.1)', border: '2px solid #ef4444', borderRadius: '12px', padding: '14px', color: '#ef4444', fontSize: '14px', fontWeight: '700', cursor:
          'pointer' }}>
⚠️ {lang === 'ru' ? 'Опасно' : lang === 'kz' ? 'Қауіпті' : 'Dangerous'}
</button>
</div>
) : (
<>
<div style={{ background: isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`, borderRadius: '14px', padding: '14px' }}>
<p style={{ color: isCorrect ? '#22c55e' : '#ef4444', fontWeight: '700', margin: '0 0 6px 0' }}>
{isCorrect ? (streakBonus ? '🔥 Серия из 5! +3 очка' : (lang === 'ru' ? '✅ Правильно!' : lang === 'kz' ? '✅ Дұрыс!' : '✅ Correct!')) : (lang === 'ru' ? '❌ Неверно!' : lang === 'kz' ? '❌ Қате!' : '❌ Wrong!')}
</p>
<p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>{item.explanation[lang]}</p>
</div>
<button onClick={handleNext} style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', border: 'none', borderRadius: '12px', padding: '13px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
{index < step.items.length - 1 ? (lang === 'ru' ? 'Следующий пост →' : lang === 'kz' ? 'Келесі пост →' : 'Next →') : (lang === 'ru' ? 'Завершить ✓' : lang === 'kz' ? 'Аяқтау ✓' : 'Finish ✓')}
</button>
</>
)}
</div>
)
}
function CyberbullyingGame({ step, lang, onComplete, onAddPoints, streakBonus, setStreakBonus, correctStreak, setCorrectStreak }) {
const [index, setIndex] = useState(0)
const [answered, setAnswered] = useState(null)
const [done, setDone] = useState(false)
const item = step.items[index]
const handleAnswer = (isBullying) => {
if (answered !== null) return
const isCorrect = isBullying === item.isBullying
setAnswered(isBullying)
if (isCorrect) {
const newStreak = correctStreak + 1; setCorrectStreak(newStreak)
if (newStreak % 5 === 0) { onAddPoints(3); setStreakBonus(true) }
} else { setCorrectStreak(0) }
}
const handleNext = () => {
if (index < step.items.length - 1) { setIndex(p => p + 1); setAnswered(null); setStreakBonus(false) }
else { onComplete() }
}
if (done) return null
const isCorrect = answered === item.isBullying
const colors = ['#a855f7','#3b82f6','#ef4444','#f59e0b','#22c55e','#ec4899']
return (
<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
<p style={{ color: '#666', fontSize: '12px', textAlign: 'center', margin: 0 }}>{index + 1} / {step.items.length}</p>
<div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
{item.messages.map((msg, i) => (
<div key={i} style={{ display: 'flex', gap: '8px', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}>
{i % 2 === 0 && <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: colors[index % colors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: '700', color: '#fff' }}>{msg.from[0]}</div>}
<div style={{ maxWidth: '75%' }}>
{i % 2 === 0 && <p style={{ color: '#666', fontSize: '10px', margin: '0 0 2px 4px' }}>{msg.from}</p>}
<div style={{ background: i % 2 === 0 ? '#2a2a4a' : '#7c3aed', borderRadius: i % 2 === 0 ? '4px 14px 14px 14px' : '14px 4px 14px 14px', padding: '9px 13px' }}>
<p style={{ color: '#fff', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>{msg.text[lang]}</p>
</div>
</div>
{i % 2 !== 0 && <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: '700', color: '#fff' }}>{msg.from[0]}</div>}
</div>
))}
</div>
{answered === null ? (
<div style={{ display: 'flex', gap: '10px' }}>
<button onClick={() => handleAnswer(true)} style={{ flex: 1, background: 'rgba(239,68,68,0.1)', border: '2px solid #ef4444', borderRadius: '12px', padding: '13px', color: '#ef4444', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
😡 {lang === 'ru' ? 'Кибербуллинг' : lang === 'kz' ? 'Кибербуллинг' : 'Cyberbullying'}
</button>
<button onClick={() => handleAnswer(false)} style={{ flex: 1, background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e', borderRadius: '12px', padding: '13px', color: '#22c55e', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
💬 {lang === 'ru' ? 'Норм общение' : lang === 'kz' ? 'Қалыпты' : 'Normal'}
</button>
</div>
) : (
<>
<div style={{ background: isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`, borderRadius: '12px', padding: '13px' }}>
<p style={{ color: isCorrect ? '#22c55e' : '#ef4444', fontWeight: '700', margin: '0 0 5px 0' }}>
{isCorrect ? (lang === 'ru' ? '✅ Правильно!' : '✅ Дұрыс!') : (lang === 'ru' ? '❌ Неверно!' : '❌ Қате!')}
</p>
<p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>{item.explanation[lang]}</p>
</div>
<button onClick={handleNext} style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', border: 'none', borderRadius: '12px', padding: '13px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
{index < step.items.length - 1 ? '→' : (lang === 'ru' ? 'Завершить ✓' : 'Аяқтау ✓')}
</button>
</>
)}
</div>
)
}
function RealOrFakeGame({ step, lang, onComplete, onAddPoints, streakBonus, setStreakBonus, correctStreak, setCorrectStreak }) {
const [index, setIndex] = useState(0)
const [answered, setAnswered] = useState(null)
const [done, setDone] = useState(false)
const item = step.items[index]
const handleAnswer = (isReal) => {
if (answered !== null) return
const isCorrect = isReal === item.isReal
setAnswered(isReal)
if (isCorrect) {
const newStreak = correctStreak + 1; setCorrectStreak(newStreak)
if (newStreak % 5 === 0) { onAddPoints(3); setStreakBonus(true) }
} else { setCorrectStreak(0) }
}
const handleNext = () => {
if (index < step.items.length - 1) { setIndex(p => p + 1); setAnswered(null); setStreakBonus(false) }
else { onComplete() }
}
if (done) return null
const isCorrect = answered === item.isReal
return (
<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
<p style={{ color: '#666', fontSize: '12px', textAlign: 'center', margin: 0 }}>{index + 1} / {step.items.length}</p>
<div style={{ background: '#1a1a2e', border: '2px solid #2a2a4a', borderRadius: '14px', overflow: 'hidden' }}>
<div style={{ background: '#0f0f1a', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #2a2a4a' }}>
<div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #374151, #1f2937)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>📱</div>
<div>
<p style={{ color: '#fff', fontSize: '13px', fontWeight: '700', margin: 0 }}>{item.sender}</p>
<p style={{ color: '#555', fontSize: '10px', margin: 0 }}>SMS</p>
</div>
<span style={{ marginLeft: 'auto', color: '#555', fontSize: '10px' }}>{lang === 'ru' ? 'сейчас' : 'қазір'}</span>
</div>
<div style={{ padding: '16px 14px' }}>
<p style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.message[lang]}</p>
</div>
</div>
{answered === null ? (
<div style={{ display: 'flex', gap: '10px' }}>
<button onClick={() => handleAnswer(true)} style={{ flex: 1, background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e', borderRadius: '12px', padding: '13px', color: '#22c55e', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
✅ {lang === 'ru' ? 'Настоящее' : lang === 'kz' ? 'Нақты' : 'Real'}
</button>
<button onClick={() => handleAnswer(false)} style={{ flex: 1, background: 'rgba(239,68,68,0.1)', border: '2px solid #ef4444', borderRadius: '12px', padding: '13px', color: '#ef4444', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
🚨 {lang === 'ru' ? 'Фишинг' : lang === 'kz' ? 'Фишинг' : 'Phishing'}
</button>
</div>
) : (
<>
<div style={{ background: isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`, borderRadius: '12px', padding: '13px' }}>
<p style={{ color: isCorrect ? '#22c55e' : '#ef4444', fontWeight: '700', margin: '0 0 5px 0' }}>
{isCorrect ? (lang === 'ru' ? '✅ Правильно!' : '✅ Дұрыс!') : (lang === 'ru' ? '❌ Неверно!' : '❌ Қате!')}
</p>
<p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>{item.explanation[lang]}</p>
</div>
<button onClick={handleNext} style={{ background: 'linear-gradient(135deg, #059669, #10b981)', border: 'none', borderRadius: '12px', padding: '13px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
{index < step.items.length - 1 ? (lang === 'ru' ? 'Следующее →' : 'Келесі →') : (lang === 'ru' ? 'Завершить ✓' : 'Аяқтау ✓')}
</button>
</>
)}
</div>
)
}
function SecuritySetupGame({ step, lang, onComplete }) {
const [toggles, setToggles] = useState(step.settings.map(() => false))
const [checked, setChecked] = useState(false)
const [score, setScore] = useState(0)
const handleToggle = (i) => { if (checked) return; setToggles(prev => { const next = [...prev]; next[i] = !next[i]; return next }) }
const handleCheck = () => {
let s = 0; step.settings.forEach((setting, i) => { if (toggles[i] === setting.correct) s++ }); setScore(s); setChecked(true)
}
const allCorrect = score === step.settings.length
return (
<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
<div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '16px', overflow: 'hidden' }}>
<div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', padding: '13px 14px' }}>
<p style={{ color: '#fff', fontWeight: '700', fontSize: '14px', margin: 0 }}>🔒 {lang === 'ru' ? 'Настройки безопасности' : lang === 'kz' ? 'Қауіпсіздік параметрлері' : 'Security Settings'}</p>
</div>
{step.settings.map((setting, i) => {
let rowBg = 'transparent', leftBorder = 'transparent'
if (checked) {
if (toggles[i] === setting.correct) { rowBg = 'rgba(34,197,94,0.07)'; leftBorder = '#22c55e' }
else { rowBg = 'rgba(239,68,68,0.07)'; leftBorder = '#ef4444' }
}
return (
<div key={i} onClick={() => handleToggle(i)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', background: rowBg, borderLeft: `3px solid ${leftBorder}`, borderBottom: '1px solid #2a2a4a22', cursor: checked ? 'default' : 'pointer' }}>
<div style={{ flex: 1, paddingRight: '12px' }}>
<p style={{ color: '#fff', fontSize: '13px', margin: 0 }}>{setting.label[lang]}</p>
{checked && toggles[i] !== setting.correct && <p style={{ color: '#fca5a5', fontSize: '11px', margin: '3px 0 0 0' }}>{setting.hint[lang]}</p>}
</div>
<div style={{ width: '44px', height: '24px', borderRadius: '12px', background: toggles[i] ? '#059669' : '#2a2a4a', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
<div style={{ position: 'absolute', top: '2px', left: toggles[i] ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
</div>
</div>
)
})}
</div>
{!checked ? (
<button onClick={handleCheck} style={{ background: 'linear-gradient(135deg, #059669, #10b981)', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
{lang === 'ru' ? '🔍 Проверить настройки' : lang === 'kz' ? '🔍 Параметрлерді тексеру' : '🔍 Check settings'}
</button>
) : (
<>
<div style={{ background: allCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${allCorrect ? '#22c55e' : '#f59e0b'}`, borderRadius: '13px', padding: '13px' }}>
<p style={{ color: allCorrect ? '#22c55e' : '#f59e0b', fontWeight: '700', margin: 0 }}>
{allCorrect ? (lang === 'ru' ? '🎉 Идеально!' : '🎉 Тамаша!') : (lang === 'ru' ? `${score}/${step.settings.length} правильно` : `${step.settings.length}-нан ${score} дұрыс`)}
</p>
</div>
<button onClick={onComplete} style={{ background: 'linear-gradient(135deg, #059669, #10b981)', border: 'none', borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
{lang === 'ru' ? 'Продолжить →' : lang === 'kz' ? 'Жалғастыру →' : 'Continue →'}
</button>
</>
)}
</div>
)
}

// ═══════════════════════════════════════════════
// КОМПОНЕНТ ВИДЕО (YouTube)
// ═══════════════════════════════════════════════
function VideoPlayer({ moduleId, lang, modColor }) {
  const videoUrl = VIDEOS[moduleId]?.[lang]
  const videoId = videoUrl ? getYouTubeId(videoUrl) : null

  if (!videoId) {
    return (
      <div style={{ background: '#1a1a2e', border: `2px dashed ${modColor}`, borderRadius: '16px', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Play size={48} color={modColor} />
        <p style={{ color: '#aaa', fontSize: '16px', textAlign: 'center', margin: 0 }}>
          {lang === 'ru' ? 'Видео скоро появится' : lang === 'kz' ? 'Бейне жақында қосылады' : 'Video coming soon'}
        </p>
      </div>
    )
  }

  return (
    <div style={{ borderRadius: '16px', overflow: 'hidden', border: `2px solid ${modColor}44`, position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="CyberOqu Video"
      />
    </div>
  )
}

// ═══════════════════════════════════════════════
// ГЛАВНЫЙ КОМПОНЕНТ УРОКА
// ═══════════════════════════════════════════════
export default function LessonPage({ user, updateUser, onBack, onComplete, lang = 'ru', moduleId = 1, levelId = 1 }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [tfAnswer, setTfAnswer] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctStreak, setCorrectStreak] = useState(0)
  const [streakBonus, setStreakBonus] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [completed, setCompleted] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [ftIndex, setFtIndex] = useState(0)
  const [ftSelected, setFtSelected] = useState(null)
  const [ftCorrect, setFtCorrect] = useState(0)
  const [ftDone, setFtDone] = useState(false)
  const [ftAwarded, setFtAwarded] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  const lesson = lessonData[moduleId]?.[levelId]
  if (!lesson) return (
    <div style={styles.completedWrap}>
      <h2 style={styles.completedTitle}>Урок скоро появится 🚧</h2>
      <button onClick={onBack} style={styles.backBtn}>Назад</button>
    </div>
  )

  const steps = lesson.steps
  const step = steps[currentStep]
  const isInteractive = step.type === 'truefalse' || step.type === 'quiz'
  const isFinalTest = step.type === 'finaltest'
  const isGame = ['safepublish','cyberbullying','realorfake','securitysetup','passwordrank','phishingdetect','callsimulator','privacysetup','accountcheck'].includes(step.type)
  const ftQuestions = isFinalTest ? step.questions : []
  const ftQ = ftQuestions[ftIndex]
  const progress = isFinalTest ? (ftDone ? 100 : (ftIndex / ftQuestions.length) * 100) : (currentStep / steps.length) * 100
  const simScore = pwScore(pwInput)
  const simChecks = pwChecks(pwInput)
  const simInfo = STRENGTH[simScore <= 1 ? 0 : simScore - 1]
  const filledBars = pwInput ? (simScore <= 1 ? 1 : simScore) : 0
  const simBlocked = step.type === 'simulator' && simScore < 4

  const moduleColors = { 1: '#4f46e5', 2: '#dc2626', 3: '#7c3aed', 4: '#059669' }
  const moduleBadges = {
    1: { ru: '🏆 Бейдж «Цифровой защитник»', kz: '🏆 «Цифрлық қорғаушы» бейджі', en: '🏆 Badge "Digital Defender"' },
    2: { ru: '🏆 Бейдж «Охотник на фишинг 🎣»', kz: '🏆 «Фишинг аңшысы 🎣» бейджі', en: '🏆 Badge "Phishing Hunter 🎣"' },
    3: { ru: '🏆 Бейдж «Страж соцсетей 📱»', kz: '🏆 «Әлеуметтік желілер сақшысы 📱» бейджі', en: '🏆 Badge "Social Media Guardian 📱"' },
    4: { ru: '🏆 Бейдж «Мастер защиты 🔒»', kz: '🏆 «Қорғаныс шебері 🔒» бейджі', en: '🏆 Badge "Security Master 🔒"' },
  }
  const modColor = moduleColors[moduleId] || '#4f46e5'

  const spendEnergy = (amount) => {
    if (user.energy < amount) return false
    updateUser({ energy: user.energy - amount })
    return true
  }
  const addPoints = (points) => {
    updateUser({ points: user.points + points })
    setEarnedPoints(prev => prev + points)
  }

  const handleNext = () => {
    if (step.energyCost > 0 && !isInteractive && !isGame) {
      if (!spendEnergy(step.energyCost)) return
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      setTfAnswer(null); setSelectedOption(null); setShowExplanation(false)
      setStreakBonus(false); setPwInput(''); setGameCompleted(false)
    } else {
      setCompleted(true); addPoints(20)
      if (onComplete) onComplete(moduleId, levelId)
    }
  }
  const registerAnswer = (isCorrect) => {
    setShowExplanation(true); spendEnergy(step.energyCost || 1)
    if (isCorrect) {
      const newStreak = correctStreak + 1; setCorrectStreak(newStreak)
      if (newStreak % 5 === 0) { addPoints(3); setStreakBonus(true) }
    } else { setCorrectStreak(0) }
  }
  const handleTrueFalse = (answer) => { if (showExplanation) return; setTfAnswer(answer); registerAnswer(answer === step.answer) }
  const handleQuiz = (index) => { if (showExplanation) return; setSelectedOption(index); registerAnswer(index === step.correct) }
  const handleFtAnswer = (i) => { if (ftSelected !== null) return; setFtSelected(i); if (i === ftQ.correct) setFtCorrect(prev => prev + 1) }
  const handleFtNext = () => {
    if (ftIndex < ftQuestions.length - 1) { setFtIndex(prev => prev + 1); setFtSelected(null) }
    else {
      if (ftCorrect >= 8 && !ftAwarded) { addPoints(150); if (onComplete) onComplete(moduleId, levelId); setFtAwarded(true) }
      setFtDone(true)
    }
  }
  const handleFtRetry = () => { setFtIndex(0); setFtSelected(null); setFtCorrect(0); setFtDone(false) }
  const handleGameComplete = () => { spendEnergy(step.energyCost || 2); setGameCompleted(true) }

  if (completed) return (
    <div style={styles.completedWrap}>
      <img src="/sana_mascot.png" alt="Сана" style={styles.completedCat} />
      <h2 style={styles.completedTitle}>{lang === 'ru' ? 'Подтема пройдена!' : lang === 'kz' ? 'Бөлімше аяқталды!' : 'Topic completed!'}</h2>
      <p style={styles.completedSub}>{lang === 'ru' ? `Сана: "Отличная работа! +${earnedPoints} очков!"` : lang === 'kz' ? `Сана: "Керемет жұмыс! +${earnedPoints} ұпай!"` : `Sana: "Great job! +${earnedPoints} points!"`}</p>
      <div style={styles.completedStats}>
        <div style={styles.completedStat}><Star size={20} color="#f59e0b" /><span>+{earnedPoints}</span></div>
        <div style={styles.completedStat}><Zap size={20} color="#f97316" /><span>{user.energy}/{user.maxEnergy || 15}</span></div>
      </div>
      <button onClick={onBack} style={styles.backBtn}>{lang === 'ru' ? 'Вернуться к модулям' : lang === 'kz' ? 'Модульдерге оралу' : 'Back to modules'}</button>
    </div>
  )

  if (isFinalTest && ftDone) {
    const total = ftQuestions.length, percent = Math.round((ftCorrect / total) * 100), passed = ftCorrect >= 8
    return (
      <div style={styles.completedWrap}>
        <img src="/sana_mascot.png" alt="Сана" style={styles.completedCat} />
        <h2 style={styles.completedTitle}>{passed ? (lang === 'ru' ? 'Тест пройден! 🎉' : lang === 'kz' ? 'Тест аяқталды! 🎉' : 'Test passed! 🎉') : (lang === 'ru' ? 'Почти получилось!' : lang === 'kz' ? 'Сәл қалды!' : 'Almost there!')}</h2>
        <p style={styles.completedSub}>{lang === 'ru' ? `Результат: ${ftCorrect} из ${total} (${percent}%)` : lang === 'kz' ? `Нәтиже: ${ftCorrect}/${total} (${percent}%)` : `Score: ${ftCorrect}/${total} (${percent}%)`}</p>
        {passed ? (
          <>
            <div style={{ ...styles.badgeWin, background: `linear-gradient(135deg, ${modColor}, ${modColor}aa)` }}><Shield size={40} color="#fff" /></div>
            <p style={styles.badgeWinName}>{moduleBadges[moduleId][lang]}</p>
            <div style={styles.completedStats}><div style={styles.completedStat}><Star size={20} color="#f59e0b" /><span>+150</span></div></div>
            <button onClick={onBack} style={{ ...styles.backBtn, background: `linear-gradient(135deg, ${modColor}, ${modColor}cc)` }}>{lang === 'ru' ? 'Вернуться к модулям' : lang === 'kz' ? 'Модульдерге оралу' : 'Back to modules'}</button>
          </>
        ) : (
          <>
            <p style={styles.completedSub}>{lang === 'ru' ? 'Нужно 8 из 10. Попробуй ещё!' : lang === 'kz' ? '10-нан 8 керек. Тағы көр!' : 'Need 8 of 10. Try again!'}</p>
            <button onClick={handleFtRetry} style={styles.backBtn}>{lang === 'ru' ? 'Пройти заново' : lang === 'kz' ? 'Қайта өту' : 'Try again'}</button>
            <button onClick={onBack} style={{ ...styles.backBtn, background: 'transparent', border: '1px solid #4f46e5', marginTop: '8px' }}>{lang === 'ru' ? 'Выйти' : lang === 'kz' ? 'Шығу' : 'Exit'}</button>
          </>
        )}
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn2}><ArrowLeft size={20} color="#fff" /></button>
        <div style={styles.progressWrap}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%`, background: `linear-gradient(90deg, ${modColor}, ${modColor}aa)` }} />
          </div>
        </div>
        <div style={styles.energyBadge}><Zap size={14} color="#f97316" /><span style={styles.energyText}>{user.energy}</span></div>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        {/* VIDEO */}
        {step.type === 'video' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{step.title[lang]}</h2>
            <VideoPlayer moduleId={moduleId} lang={lang} modColor={modColor} />
            <div style={styles.sanaTip}>
              <img src="/sana_mascot.png" alt="Сана" style={styles.sanaSmall} />
              <div style={{ ...styles.sanaBubble, borderColor: modColor }}>
                <p style={styles.sanaBubbleText}>{lang === 'ru' ? '🎬 Смотри внимательно — после будут вопросы!' : lang === 'kz' ? '🎬 Мұқият қара — кейін сұрақтар болады!' : '🎬 Watch carefully — questions follow!'}</p>
              </div>
            </div>
          </div>
        )}

        {/* CARD */}
        {step.type === 'card' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{step.title[lang]}</h2>
            <div style={styles.cardContent}>
              {step.content[lang].split('\n').map((line, i) => (
                <p key={i} style={{ ...styles.cardText, color: line.startsWith('→') || line.startsWith('✓') ? '#a5b4fc' : line.startsWith('✗') ? '#fca5a5' : '#fff', marginBottom: line === '' ? '8px' : '4px' }}>{line || ' '}</p>
              ))}
            </div>
            <div style={styles.sanaTip}>
              <img src="/sana_mascot.png" alt="Сана" style={styles.sanaSmall} />
              <div style={{ ...styles.sanaBubble, borderColor: modColor }}>
                <p style={styles.sanaBubbleText}>{lang === 'ru' ? 'Запомни это — пригодится!' : lang === 'kz' ? 'Мұны есте сақта — керек болады!' : 'Remember this — it helps!'}</p>
              </div>
            </div>
          </div>
        )}

        {/* SIMULATOR */}
        {step.type === 'simulator' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{step.title[lang]}</h2>
            <input type="text" value={pwInput} onChange={e => setPwInput(e.target.value)}
              placeholder={lang === 'ru' ? 'Введи пароль...' : lang === 'kz' ? 'Құпия сөз енгіз...' : 'Type a password...'}
              style={styles.simInput} />
            <div style={styles.meterWrap}>{[0,1,2,3,4].map(i => <div key={i} style={{ ...styles.meterBar, background: i < filledBars ? simInfo.color : '#2a2a4a' }} />)}</div>
            <p style={{ ...styles.simStrength, color: pwInput ? simInfo.color : '#555' }}>{pwInput ? simInfo[lang] : (lang === 'ru' ? 'Начни вводить' : lang === 'kz' ? 'Енгізе баста' : 'Start typing')}</p>
            <div style={styles.simChecks}>
              {[{ ok: simChecks.length, ru: '12+ символов', kz: '12+ таңба', en: '12+ chars' }, { ok: simChecks.upper, ru: 'Заглавная буква', kz: 'Бас әріп', en: 'Uppercase' }, { ok: simChecks.digit, ru: 'Цифра', kz: 'Цифр', en: 'Digit' }, { ok: simChecks.special, ru: 'Спецсимвол', kz: 'Таңба', en: 'Symbol' }].map((c, i) => (
                <div key={i} style={{ ...styles.simCheck, color: c.ok ? '#22c55e' : '#ef4444' }}>{c.ok ? <Check size={16} /> : <X size={16} />}<span>{c[lang]}</span></div>
              ))}
            </div>
            <div style={styles.crackBox}>
              <span style={styles.crackLabel}>{lang === 'ru' ? 'Время взлома:' : lang === 'kz' ? 'Бұзу уақыты:' : 'Time to crack:'}</span>
              <span style={{ ...styles.crackValue, color: pwInput ? simInfo.color : '#555' }}>{pwCrackTime(pwInput, lang)}</span>
            </div>
            <div style={styles.sanaTip}>
              <img src="/sana_mascot.png" alt="Сана" style={styles.sanaSmall} />
              <div style={styles.sanaBubble}>
                <p style={styles.sanaBubbleText}>{simScore >= 4 ? (lang === 'ru' ? 'Вот это защита! 😎' : lang === 'kz' ? 'Міне қорғаныс! 😎' : "That's protection! 😎") : simScore === 3 ? (lang === 'ru' ? 'Уже лучше! Добавь символ' : lang === 'kz' ? 'Жақсарды! Таңба қос' : 'Better! Add a symbol') : (lang === 'ru' ? 'Сделай пароль сильнее 💪' : lang === 'kz' ? 'Күштірек жаса 💪' : 'Make it stronger 💪')}</p>
              </div>
            </div>
            {simBlocked && pwInput && <p style={styles.simHint}>{lang === 'ru' ? 'Доведи до «Хорошего» или «Неуязвимого»' : lang === 'kz' ? '«Жақсы» немесе «Бұзылмайтын» дәрежесіне жет' : 'Reach "Good" or "Unbreakable"'}</p>}
          </div>
        )}

        {/* ИГРА: PasswordRank */}
        {step.type === 'passwordrank' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{step.title[lang]}</h2>
            {!gameCompleted ? (
              <PasswordRankGame step={step} lang={lang} onComplete={() => { setGameCompleted(true); spendEnergy(step.energyCost || 1) }} />
            ) : (
              <div style={{ background: 'rgba(79,70,229,0.1)', border: '1px solid #4f46e5', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <p style={{ color: '#a5b4fc', fontWeight: '700', fontSize: '16px', margin: 0 }}>🎯 {lang === 'ru' ? 'Отлично! Ты знаешь слабые пароли!' : lang === 'kz' ? 'Тамаша! Әлсіз парольдерді білесің!' : 'Great! You know weak passwords!'}</p>
              </div>
            )}
          </div>
        )}

        {/* ИГРА: PhishingDetect */}
        {step.type === 'phishingdetect' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{step.title[lang]}</h2>
            <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>{lang === 'ru' ? '🔍 Нажимай на подозрительные части письма:' : lang === 'kz' ? '🔍 Хаттың күдікті бөліктерін басыңыз:' : '🔍 Tap suspicious parts of the email:'}</p>
            {!gameCompleted ? (
              <PhishingDetectGame step={step} lang={lang} onComplete={() => { setGameCompleted(true); spendEnergy(step.energyCost || 2) }} />
            ) : (
              <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <p style={{ color: '#fca5a5', fontWeight: '700', fontSize: '16px', margin: 0 }}>🎯 {lang === 'ru' ? 'Ты видишь фишинг!' : lang === 'kz' ? 'Сен фишингті көресің!' : 'You can spot phishing!'}</p>
              </div>
            )}
          </div>
        )}

        {/* ИГРА: CallSimulator */}
        {step.type === 'callsimulator' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{step.title[lang]}</h2>
            <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>{lang === 'ru' ? 'Тебе звонит мошенник — что ответишь?' : lang === 'kz' ? 'Саған алаяқ қоңырау шалды — не дейсің?' : 'A scammer is calling you — what do you say?'}</p>
            {!gameCompleted ? (
              <CallSimulatorGame step={step} lang={lang} onComplete={() => { setGameCompleted(true); spendEnergy(step.energyCost || 2) }} />
            ) : (
              <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <p style={{ color: '#fca5a5', fontWeight: '700', fontSize: '16px', margin: 0 }}>📞 {lang === 'ru' ? 'Ты знаешь как отвечать мошенникам!' : lang === 'kz' ? 'Алаяқтарға қалай жауап беруді білесің!' : 'You know how to respond to scammers!'}</p>
              </div>
            )}
          </div>
        )}

        {/* ИГРА: PrivacySetup */}
        {step.type === 'privacysetup' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{step.title[lang]}</h2>
            <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>{lang === 'ru' ? 'Включи/выключи правильные настройки:' : lang === 'kz' ? 'Дұрыс параметрлерді қос/өшір:' : 'Toggle the correct settings:'}</p>
            {!gameCompleted ? (
              <PrivacySetupGame step={step} lang={lang} onComplete={() => { setGameCompleted(true); spendEnergy(step.energyCost || 2) }} />
            ) : (
              <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid #7c3aed', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <p style={{ color: '#c4b5fd', fontWeight: '700', fontSize: '16px', margin: 0 }}>🔒 {lang === 'ru' ? 'Профиль настроен правильно!' : lang === 'kz' ? 'Профиль дұрыс орнатылды!' : 'Profile set up correctly!'}</p>
              </div>
            )}
          </div>
        )}

        {/* ИГРА: AccountCheck */}
        {step.type === 'accountcheck' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{step.title[lang]}</h2>
            <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>{lang === 'ru' ? 'Изучи профиль и реши — взломают или нет?' : lang === 'kz' ? 'Профильді зерттеп шеш — бұзыла ма, жоқ па?' : 'Study the profile and decide — hackable or not?'}</p>
            {!gameCompleted ? (
              <AccountCheckGame step={step} lang={lang} onComplete={() => { setGameCompleted(true); spendEnergy(step.energyCost || 2) }} />
            ) : (
              <div style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <p style={{ color: '#6ee7b7', fontWeight: '700', fontSize: '16px', margin: 0 }}>🛡️ {lang === 'ru' ? 'Ты знаешь что делает аккаунт уязвимым!' : lang === 'kz' ? 'Аккаунтты осалдайтынды білесің!' : 'You know what makes an account vulnerable!'}</p>
              </div>
            )}
          </div>
        )}

        {/* SAFEPUBLISH */}
        {step.type === 'safepublish' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{lang === 'ru' ? '📱 Безопасно или опасно?' : lang === 'kz' ? '📱 Қауіпсіз бе әлде қауіпті ме?' : '📱 Safe or dangerous?'}</h2>
            {!gameCompleted ? (
              <SafePublishGame step={step} lang={lang} onComplete={handleGameComplete} onAddPoints={addPoints} streakBonus={streakBonus} setStreakBonus={setStreakBonus} correctStreak={correctStreak} setCorrectStreak={setCorrectStreak} />
            ) : (
              <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid #7c3aed', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <p style={{ color: '#c4b5fd', fontWeight: '700', fontSize: '16px', margin: 0 }}>🎉 {lang === 'ru' ? 'Игра пройдена!' : lang === 'kz' ? 'Ойын аяқталды!' : 'Game completed!'}</p>
              </div>
            )}
          </div>
        )}

        {/* CYBERBULLYING */}
        {step.type === 'cyberbullying' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{lang === 'ru' ? '💬 Кибербуллинг или нет?' : lang === 'kz' ? '💬 Кибербуллинг па, жоқ па?' : '💬 Cyberbullying or not?'}</h2>
            {!gameCompleted ? (
              <CyberbullyingGame step={step} lang={lang} onComplete={handleGameComplete} onAddPoints={addPoints} streakBonus={streakBonus} setStreakBonus={setStreakBonus} correctStreak={correctStreak} setCorrectStreak={setCorrectStreak} />
            ) : (
              <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid #7c3aed', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <p style={{ color: '#c4b5fd', fontWeight: '700', fontSize: '16px', margin: 0 }}>🎉 {lang === 'ru' ? 'Игра пройдена!' : lang === 'kz' ? 'Ойын аяқталды!' : 'Game completed!'}</p>
              </div>
            )}
          </div>
        )}

        {/* REALORFAKE */}
        {step.type === 'realorfake' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{lang === 'ru' ? '📱 Настоящий или фишинг?' : lang === 'kz' ? '📱 Нақты ма, фишинг па?' : '📱 Real or phishing?'}</h2>
            {!gameCompleted ? (
              <RealOrFakeGame step={step} lang={lang} onComplete={handleGameComplete} onAddPoints={addPoints} streakBonus={streakBonus} setStreakBonus={setStreakBonus} correctStreak={correctStreak} setCorrectStreak={setCorrectStreak} />
            ) : (
              <div style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <p style={{ color: '#6ee7b7', fontWeight: '700', fontSize: '16px', margin: 0 }}>🎉 {lang === 'ru' ? 'Игра пройдена!' : lang === 'kz' ? 'Ойын аяқталды!' : 'Game completed!'}</p>
              </div>
            )}
          </div>
        )}

        {/* SECURITYSETUP */}
        {step.type === 'securitysetup' && (
          <div style={styles.stepWrap}>
            <h2 style={styles.cardTitle}>{lang === 'ru' ? '🔒 Настрой защиту аккаунта' : lang === 'kz' ? '🔒 Аккаунт қорғанысын орнат' : '🔒 Set up account security'}</h2>
            {!gameCompleted ? (
              <SecuritySetupGame step={step} lang={lang} onComplete={handleGameComplete} />
            ) : (
              <div style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                <p style={{ color: '#6ee7b7', fontWeight: '700', fontSize: '16px', margin: 0 }}>🎉 {lang === 'ru' ? 'Аккаунт настроен!' : lang === 'kz' ? 'Аккаунт орнатылды!' : 'Account configured!'}</p>
              </div>
            )}
          </div>
        )}

        {/* TRUE/FALSE */}
        {step.type === 'truefalse' && (
          <div style={styles.stepWrap}>
            <p style={styles.tfLabel}>{lang === 'ru' ? 'Правда или ложь?' : lang === 'kz' ? 'Рас па әлде жалған ба?' : 'True or False?'}</p>
            <div style={styles.tfQuestion}><p style={styles.tfQuestionText}>{step.question[lang]}</p></div>
            {!showExplanation && (
              <div style={styles.tfButtons}>
                <button onClick={() => handleTrueFalse(true)} style={styles.tfTrue}>✓ {lang === 'ru' ? 'Правда' : lang === 'kz' ? 'Рас' : 'True'}</button>
                <button onClick={() => handleTrueFalse(false)} style={styles.tfFalse}>✗ {lang === 'ru' ? 'Ложь' : lang === 'kz' ? 'Жалған' : 'False'}</button>
              </div>
            )}
            {showExplanation && (
              <div style={{ ...styles.explanation, background: tfAnswer === step.answer ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${tfAnswer === step.answer ? '#22c55e' : '#ef4444'}` }}>
                <div style={styles.explanationHeader}>
                  {tfAnswer === step.answer
                    ? <><Check size={20} color="#22c55e" /><span style={{ color: '#22c55e', fontWeight: '700' }}>{streakBonus ? '🔥 Серия из 5! +3' : (lang === 'ru' ? 'Правильно!' : lang === 'kz' ? 'Дұрыс!' : 'Correct!')}</span></>
                    : <><X size={20} color="#ef4444" /><span style={{ color: '#ef4444', fontWeight: '700' }}>{lang === 'ru' ? 'Неверно!' : lang === 'kz' ? 'Қате!' : 'Wrong!'}</span></>}
                </div>
                <p style={styles.explanationText}>{step.explanation[lang]}</p>
                <div style={styles.sanaTip}>
                  <img src="/sana_mascot.png" alt="Сана" style={styles.sanaSmall} />
                  <div style={{ ...styles.sanaBubble, borderColor: modColor }}>
                    <p style={styles.sanaBubbleText}>{tfAnswer === step.answer ? (lang === 'ru' ? 'Молодец! 🎉' : lang === 'kz' ? 'Жарайсың! 🎉' : 'Well done! 🎉') : (lang === 'ru' ? 'Запомни! 💪' : lang === 'kz' ? 'Есте сақта! 💪' : 'Remember! 💪')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* QUIZ */}
        {step.type === 'quiz' && (
          <div style={styles.stepWrap}>
            <p style={styles.tfLabel}>{lang === 'ru' ? 'Выбери правильный ответ' : lang === 'kz' ? 'Дұрыс жауапты таңда' : 'Choose the correct answer'}</p>
            <div style={styles.tfQuestion}><p style={styles.tfQuestionText}>{step.question[lang]}</p></div>
            <div style={styles.options}>
              {step.options[lang].map((opt, i) => {
                const isCorrect = i === step.correct, isSelected = selectedOption === i
                let bg = '#1a1a2e', border = '#2a2a4a', color = '#fff'
                if (showExplanation) {
                  if (isCorrect) { bg = 'rgba(34,197,94,0.12)'; border = '#22c55e'; color = '#22c55e' }
                  else if (isSelected) { bg = 'rgba(239,68,68,0.12)'; border = '#ef4444'; color = '#ef4444' }
                }
                return <button key={i} onClick={() => handleQuiz(i)} disabled={showExplanation} style={{ ...styles.optionBtn, background: bg, border: `2px solid ${border}`, color, cursor: showExplanation ? 'default' : 'pointer' }}>
                  <span style={styles.optionLetter}>{['А','Б','В','Г'][i]}</span><span>{opt}</span>
                </button>
              })}
            </div>
            {showExplanation && (
              <div style={{ ...styles.explanation, background: selectedOption === step.correct ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${selectedOption === step.correct ? '#22c55e' : '#ef4444'}` }}>
                <div style={styles.explanationHeader}>
                  {selectedOption === step.correct
                    ? <><Check size={20} color="#22c55e" /><span style={{ color: '#22c55e', fontWeight: '700' }}>{streakBonus ? '🔥 Серия! +3' : (lang === 'ru' ? 'Правильно!' : lang === 'kz' ? 'Дұрыс!' : 'Correct!')}</span></>
                    : <><X size={20} color="#ef4444" /><span style={{ color: '#ef4444', fontWeight: '700' }}>{lang === 'ru' ? 'Неверно!' : lang === 'kz' ? 'Қате!' : 'Wrong!'}</span></>}
                </div>
                <p style={styles.explanationText}>{step.explanation[lang]}</p>
                <div style={styles.sanaTip}>
                  <img src="/sana_mascot.png" alt="Сана" style={styles.sanaSmall} />
                  <div style={{ ...styles.sanaBubble, borderColor: modColor }}>
                    <p style={styles.sanaBubbleText}>{selectedOption === step.correct ? (lang === 'ru' ? 'Отлично! 🎉' : lang === 'kz' ? 'Керемет! 🎉' : 'Great! 🎉') : (lang === 'ru' ? 'Бывает! Запомни 💪' : lang === 'kz' ? 'Болады! Есте сақта 💪' : 'Happens! Remember 💪')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FINAL TEST */}
        {step.type === 'finaltest' && ftQ && (
          <div style={styles.stepWrap}>
            <p style={styles.tfLabel}>{lang === 'ru' ? `Вопрос ${ftIndex + 1} из ${ftQuestions.length}` : lang === 'kz' ? `${ftIndex + 1}/${ftQuestions.length} сұрақ` : `Question ${ftIndex + 1} of ${ftQuestions.length}`}</p>
            <div style={styles.tfQuestion}><p style={styles.tfQuestionText}>{ftQ.q[lang]}</p></div>
            <div style={styles.options}>
              {ftQ.options[lang].map((opt, i) => {
                const isCorrect = i === ftQ.correct, isSelected = ftSelected === i
                let bg = '#1a1a2e', border = '#2a2a4a', color = '#fff'
                if (ftSelected !== null) {
                  if (isCorrect) { bg = 'rgba(34,197,94,0.12)'; border = '#22c55e'; color = '#22c55e' }
                  else if (isSelected) { bg = 'rgba(239,68,68,0.12)'; border = '#ef4444'; color = '#ef4444' }
                }
                return <button key={i} onClick={() => handleFtAnswer(i)} disabled={ftSelected !== null} style={{ ...styles.optionBtn, background: bg, border: `2px solid ${border}`, color, cursor: ftSelected !== null ? 'default' : 'pointer' }}>
                  <span style={styles.optionLetter}>{['А','Б','В','Г'][i]}</span><span>{opt}</span>
                </button>
              })}
            </div>
            {ftSelected !== null && (
              <div style={{ ...styles.explanation, background: ftSelected === ftQ.correct ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${ftSelected === ftQ.correct ? '#22c55e' : '#ef4444'}` }}>
                <div style={styles.explanationHeader}>
                  {ftSelected === ftQ.correct
                    ? <><Check size={20} color="#22c55e" /><span style={{ color: '#22c55e', fontWeight: '700' }}>{lang === 'ru' ? 'Правильно!' : lang === 'kz' ? 'Дұрыс!' : 'Correct!'}</span></>
                    : <><X size={20} color="#ef4444" /><span style={{ color: '#ef4444', fontWeight: '700' }}>{lang === 'ru' ? 'Неверно!' : lang === 'kz' ? 'Қате!' : 'Wrong!'}</span></>}
                </div>
                <p style={styles.explanationText}>{ftQ.explanation[lang]}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        {!isFinalTest && !isGame && (!isInteractive || showExplanation) && (
          <button onClick={handleNext}
            disabled={(user.energy < (step.energyCost || 0) && !isInteractive) || simBlocked}
            style={{ ...styles.nextBtn, background: `linear-gradient(135deg, ${modColor}, ${modColor}bb)`, opacity: ((user.energy < (step.energyCost || 0) && !isInteractive) || simBlocked) ? 0.5 : 1 }}>
            {currentStep < steps.length - 1 ? (lang === 'ru' ? 'Далее →' : lang === 'kz' ? 'Келесі →' : 'Next →') : (lang === 'ru' ? 'Завершить ✓' : lang === 'kz' ? 'Аяқтау ✓' : 'Complete ✓')}
            {step.energyCost > 0 && !isInteractive && <span style={styles.energyCost}>-{step.energyCost}⚡</span>}
          </button>
        )}
        {isGame && gameCompleted && (
          <button onClick={handleNext}
            style={{ ...styles.nextBtn, background: `linear-gradient(135deg, ${modColor}, ${modColor}bb)` }}>
            {currentStep < steps.length - 1 ? (lang === 'ru' ? 'Далее →' : lang === 'kz' ? 'Келесі →' : 'Next →') : (lang === 'ru' ? 'Завершить ✓' : lang === 'kz' ? 'Аяқтау ✓' : 'Complete ✓')}
          </button>
        )}
        {isFinalTest && ftSelected !== null && (
          <button onClick={handleFtNext}
            style={{ ...styles.nextBtn, background: `linear-gradient(135deg, ${modColor}, ${modColor}bb)` }}>
            {ftIndex < ftQuestions.length - 1 ? (lang === 'ru' ? 'Следующий →' : lang === 'kz' ? 'Келесі →' : 'Next →') : (lang === 'ru' ? 'Результат ✓' : lang === 'kz' ? 'Нәтиже ✓' : 'Result ✓')}
          </button>
        )}
        {user.energy === 0 && !isFinalTest && (
          <p style={styles.noEnergy}>{lang === 'ru' ? '⚡ Энергия закончилась!' : lang === 'kz' ? '⚡ Энергия таусылды!' : '⚡ Energy is out!'}</p>
        )}
      </div>
    </div>
  )
}

// ═══ СТИЛИ ═══
const styles = {
  container: { minHeight: '100vh', background: '#0f0f1a', display: 'flex', flexDirection: 'column', color: '#fff' },
  header: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: '#1a1a2e', borderBottom: '1px solid #2a2a4a', position: 'sticky', top: 0, zIndex: 100 },
  backBtn2: { background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' },
  progressWrap: { flex: 1 },
  progressBar: { height: '8px', background: '#2a2a4a', borderRadius: '4px', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: '4px', transition: 'width 0.4s ease' },
  energyBadge: { display: 'flex', alignItems: 'center', gap: '4px', background: '#2a2a4a', borderRadius: '8px', padding: '4px 10px' },
  energyText: { color: '#f97316', fontWeight: '700', fontSize: '14px' },
  content: { flex: 1, padding: '20px 16px', overflowY: 'auto' },
  stepWrap: { maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px' },
  cardTitle: { fontSize: '21px', fontWeight: '700', color: '#fff', margin: 0, lineHeight: '1.3' },
  cardContent: { background: '#1a1a2e', borderRadius: '16px', padding: '20px', border: '1px solid #2a2a4a' },
  cardText: { margin: '0 0 4px 0', fontSize: '15px', lineHeight: '1.7' },
  sanaTip: { display: 'flex', alignItems: 'flex-end', gap: '10px' },
  sanaSmall: { width: '54px', height: '54px', objectFit: 'contain', flexShrink: 0 },
  sanaBubble: { background: '#1a1a2e', border: '1px solid #4f46e5', borderRadius: '12px', borderBottomLeftRadius: '4px', padding: '10px 14px', flex: 1 },
  sanaBubbleText: { color: '#a5b4fc', fontSize: '13px', margin: 0, lineHeight: '1.5' },
  simInput: { background: '#0f0f1a', border: '2px solid #2a2a4a', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '18px', outline: 'none', fontFamily: 'monospace', letterSpacing: '1px', textAlign: 'center' },
  meterWrap: { display: 'flex', gap: '6px' },
  meterBar: { flex: 1, height: '8px', borderRadius: '4px', transition: 'background 0.2s' },
  simStrength: { textAlign: 'center', fontSize: '16px', fontWeight: '700', margin: 0 },
  simChecks: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#1a1a2e', borderRadius: '12px', padding: '16px', border: '1px solid #2a2a4a' },
  simCheck: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600' },
  crackBox: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1a1a2e', borderRadius: '12px', padding: '14px 16px', border: '1px solid #2a2a4a' },
  crackLabel: { color: '#aaa', fontSize: '14px' },
  crackValue: { fontSize: '16px', fontWeight: '700' },
  simHint: { color: '#f59e0b', fontSize: '13px', textAlign: 'center', margin: 0 },
  tfLabel: { fontSize: '13px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 },
  tfQuestion: { background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '16px', padding: '22px' },
  tfQuestionText: { fontSize: '17px', color: '#fff', margin: 0, lineHeight: '1.6', textAlign: 'center' },
  tfButtons: { display: 'flex', gap: '12px' },
  tfTrue: { flex: 1, background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e', borderRadius: '12px', padding: '16px', color: '#22c55e', fontSize: '16px', fontWeight: '700', cursor: 'pointer' },
  tfFalse: { flex: 1, background: 'rgba(239,68,68,0.1)', border: '2px solid #ef4444', borderRadius: '12px', padding: '16px', color: '#ef4444', fontSize: '16px', fontWeight: '700', cursor: 'pointer' },
  options: { display: 'flex', flexDirection: 'column', gap: '10px' },
  optionBtn: { display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', borderRadius: '12px', padding: '13px 16px', fontSize: '14px', fontWeight: '600', lineHeight: '1.4', width: '100%' },
  optionLetter: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', fontSize: '13px', fontWeight: '700', flexShrink: 0 },
  explanation: { borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' },
  explanationHeader: { display: 'flex', alignItems: 'center', gap: '8px' },
  explanationText: { color: '#ccc', fontSize: '14px', lineHeight: '1.6', margin: 0 },
  footer: { padding: '16px', background: '#1a1a2e', borderTop: '1px solid #2a2a4a' },
  nextBtn: { width: '100%', border: 'none', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  energyCost: { background: 'rgba(0,0,0,0.2)', borderRadius: '6px', padding: '2px 8px', fontSize: '12px' },
  noEnergy: { color: '#ef4444', textAlign: 'center', fontSize: '14px', margin: '8px 0 0 0' },
  backBtn: { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', borderRadius: '12px', padding: '14px 28px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' },
  completedWrap: { minHeight: '100vh', background: '#0f0f1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '14px' },
  completedCat: { width: '140px', height: '140px', objectFit: 'contain' },
  completedTitle: { fontSize: '24px', fontWeight: '800', color: '#fff', margin: 0, textAlign: 'center' },
  completedSub: { color: '#a5b4fc', fontSize: '15px', textAlign: 'center', margin: 0 },
  completedStats: { display: 'flex', gap: '24px' },
  completedStat: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '18px', fontWeight: '700', color: '#fff' },
  badgeWin: { width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  badgeWinName: { color: '#a5b4fc', fontSize: '15px', fontWeight: '700', margin: 0, textAlign: 'center' },
}