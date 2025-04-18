# DATA-Hackaton-MSTU

## Разработка бизнес-модели проведения обучения пользователей Государственной информационнойсистемы

### Цель проекта
Создать бизнес-модель проведения обучения пользователей Государственной информационной системы

### Постановка задачи
Данный кейс предлагает на основе открытых данных с Росрееста (https://obrnadzor.gov.ru/otkrytoe-pravitelstvo/opendata/7701537808-fbdrl/), необходимо разработать оптимальную бизнес-модель, отвечающую требованиям по минимизации затрат на заработную плату. При следующих условиях:
* Среднее количество пользователей:
  - 1 пользователь на одну школу или организацию ДПО или ПО,
  - 2 пользователя на один колледж,
  - 3 пользователя на один ВУЗ.
* Обучение должно проходить в дневное время часового пояса, где находится основная организация.
* На одну группу из 300 пользователей приходится 2 преподавателя.
* Необходимо учесть ротацию пользователей в организациях в течение года и ротацию преподавателей на курсах подготовки пользователей.
* Время подготовки преподавателя на курсе занимает 2 недели (для учета времени подготовки преподавательского состава). Один курс на 1 группу - 1 неделю.

В качестве результирующего решения авторы кейса предлагают визуализировать на дашборде загрузку по месяцам с указанием
количества обучающих/обучаемых и др.

### Описание набора данных
Набор данных представлен в виде xml файла, в котором представленны организации имеющие лицензию на ведение образовательной деятельности, время регистрации, виды программ обучения, сроки истечения лицензии и др.

### Ход работы
#### Основная идея бизнес-модели

В качестве полезных признаков для создания бизнес-модели были взяты: юридический адресс, наличие действующей лиценции, тип образовательной организации

В первую очередь были отсеяны организации без действующей лицензии.

После определено количество пользователей ГИС для каждой организации, круговая диаграмма распределения типов образовательных организаций приведена ниже.

Анализируя полученные результаты, можно сделать вывод, что большинство организаций имееют одного пользователя, и основная их деятельность - ДПО. По причине отсутствия явной сезонности работы организаций предоставляющие услуги дополнительного образования (повышения квалификации), основная идея бизнес-модели: распределить учебный группы равномерно в течении года.

По условию кейса: Один курс на 1 группу - 1 неделю. Откуда следует что за месяц каждая пара преподавателей может обучить 4 учебных группы.

Для минимизации затрат на заработную плату было сделано решения - определить необходимое количество преподавателей, которые будут работать каждую неделю, тем самым по истечению года будет обучены все пользователи в представленных организациях

#### Класстеризация пользователей

Для определения необходимого количества преподавателей, мы произвели кластеризацию пользователей по следующим условиям:
* Разница между часовыми поясами между пользователями в кластере не больше 3 часов
* Количество пользователей в класстере должно быть приближено к числу, кратному 300, для обеспечения полноты групп
* Количество пользователей в каждом кластере примерно одинаковое

Для учета временных зон, был добавлен новый признак, по информации из: https://github.com/Gangur/Russian-Regions-And-Cities-With-Time-Zone

Для класстеризации использовали алгоритм, который заранее вычисляет теоритически возможное количество пользователей, а после добавляет организации в класстер пока это возможно.
По итогу было получено:
* 50 класстеров по 2300 пользователей (+- 1,5% рассхождение)

Что соподает с количеством свободных недель (52 недели в году - 2 недели на обучение преподавателей)

Алгоритм классеризации находится в Jupyter Notebook: main.ipynb

#### Опередение необходимого количества преподавателей

По причине того, что количество класстеров равно количеству недель, то в месяц будет обучено 4 класстера. При этои задействованы будут одни и те же преподаватели, т.к обучение одной группы (в том числе и кластера) длится 1 неделю.

Учет ротации был совершен по информации об среднем изменении количества сотрудников образовательных организаций в течении года по информации из Росстат (https://27.rosstat.gov.ru/storage/mediabank/Среднесписочная%20численность%20работников%20организаций%20по%20видам%20экономической%20деятельности%20в%202023%20году(1).pdf)
(https://27.rosstat.gov.ru/storage/mediabank/Среднесписочная%20численность%20работников%20организаций%20по%20ВЭД%202022(10)_764015.pdf)

Тем самым исходя из информации от Росстат, наибольшая численность обучения новый пользователей будет осуществлятся в июле и декабре, где также требудется большее количество преподавателей

Дашбоард распределения преподавателей и обучаемых пользователей по месяцам приведен ниже

#### Контактная информация

* Карев Валентин Витальевич, преподаватель кафедры ИБ АлтГУ

  email: krv.valentin@gmail.com
  
  тел.: +79967077873
  
  TG: @valentinkarev


