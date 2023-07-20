--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: equipments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipments (
    id bigint NOT NULL,
    description character varying(255),
    image character varying(255),
    manufacturer character varying(255),
    name character varying(255),
    type character varying(255)
);


ALTER TABLE public.equipments OWNER TO postgres;

--
-- Name: equipments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.equipments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.equipments_id_seq OWNER TO postgres;

--
-- Name: equipments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipments_id_seq OWNED BY public.equipments.id;


--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedbacks (
    id bigint NOT NULL,
    content character varying(255),
    stars integer NOT NULL,
    gym_id bigint,
    member_id bigint,
    CONSTRAINT feedbacks_stars_check CHECK (((stars <= 5) AND (stars >= 1)))
);


ALTER TABLE public.feedbacks OWNER TO postgres;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedbacks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedbacks_id_seq OWNER TO postgres;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feedbacks_id_seq OWNED BY public.feedbacks.id;


--
-- Name: gym_equipments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_equipments (
    gym_id bigint NOT NULL,
    equipment_id bigint NOT NULL
);


ALTER TABLE public.gym_equipments OWNER TO postgres;

--
-- Name: gyms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gyms (
    id bigint NOT NULL,
    address character varying(255),
    email character varying(255),
    hotline character varying(255),
    image character varying(255),
    name character varying(255)
);


ALTER TABLE public.gyms OWNER TO postgres;

--
-- Name: gyms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gyms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gyms_id_seq OWNER TO postgres;

--
-- Name: gyms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gyms_id_seq OWNED BY public.gyms.id;


--
-- Name: member_memberships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.member_memberships (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    has_activated boolean,
    valid_from date,
    valid_until date,
    member_id bigint,
    membership_id bigint
);


ALTER TABLE public.member_memberships OWNER TO postgres;

--
-- Name: member_memberships_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.member_memberships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.member_memberships_id_seq OWNER TO postgres;

--
-- Name: member_memberships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.member_memberships_id_seq OWNED BY public.member_memberships.id;


--
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.members (
    id bigint NOT NULL,
    address character varying(255),
    avatar character varying(255),
    banned_reason character varying(255),
    date_of_birth date,
    first_name character varying(255),
    gender integer,
    health_condition character varying(255),
    is_banned boolean,
    joined_date date,
    last_name character varying(255),
    note character varying(255),
    phone_number character varying(255),
    weight double precision,
    user_id bigint,
    CONSTRAINT members_gender_check CHECK (((gender <= 1) AND (gender >= 0)))
);


ALTER TABLE public.members OWNER TO postgres;

--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.members_id_seq OWNER TO postgres;

--
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;


--
-- Name: membership_activity_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membership_activity_logs (
    id bigint NOT NULL,
    note character varying(255),
    period_of_months bigint,
    type integer,
    member_membership_id bigint,
    payment_id bigint,
    CONSTRAINT membership_activity_logs_period_of_months_check CHECK ((period_of_months >= 1)),
    CONSTRAINT membership_activity_logs_type_check CHECK (((type <= 1) AND (type >= 0)))
);


ALTER TABLE public.membership_activity_logs OWNER TO postgres;

--
-- Name: membership_activity_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membership_activity_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.membership_activity_logs_id_seq OWNER TO postgres;

--
-- Name: membership_activity_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membership_activity_logs_id_seq OWNED BY public.membership_activity_logs.id;


--
-- Name: memberships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.memberships (
    id bigint NOT NULL,
    description character varying(255),
    max_num_of_members integer,
    monthly_price bigint,
    name character varying(255),
    created_by bigint NOT NULL,
    CONSTRAINT memberships_max_num_of_members_check CHECK (((max_num_of_members <= 50) AND (max_num_of_members >= 0))),
    CONSTRAINT memberships_monthly_price_check CHECK ((monthly_price >= 100000))
);


ALTER TABLE public.memberships OWNER TO postgres;

--
-- Name: memberships_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.memberships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.memberships_id_seq OWNER TO postgres;

--
-- Name: memberships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.memberships_id_seq OWNED BY public.memberships.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id bigint NOT NULL,
    amount bigint,
    invoice_number character varying(255),
    method character varying(255),
    CONSTRAINT payments_amount_check CHECK ((amount >= 100000))
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: replies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.replies (
    id bigint NOT NULL,
    content character varying(255),
    feedback_id bigint,
    posted_by bigint
);


ALTER TABLE public.replies OWNER TO postgres;

--
-- Name: replies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.replies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.replies_id_seq OWNER TO postgres;

--
-- Name: replies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.replies_id_seq OWNED BY public.replies.id;


--
-- Name: staffs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staffs (
    id bigint NOT NULL,
    address character varying(255),
    avatar character varying(255),
    date_of_birth date,
    employment_status integer,
    first_name character varying(255),
    gender integer,
    hired_date date,
    last_name character varying(255),
    note character varying(255),
    phone_number character varying(255),
    "position" character varying(255),
    salary bigint,
    user_id bigint,
    CONSTRAINT staffs_employment_status_check CHECK (((employment_status <= 3) AND (employment_status >= 1))),
    CONSTRAINT staffs_gender_check CHECK (((gender <= 1) AND (gender >= 0))),
    CONSTRAINT staffs_salary_check CHECK ((salary >= 1000000))
);


ALTER TABLE public.staffs OWNER TO postgres;

--
-- Name: staffs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.staffs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.staffs_id_seq OWNER TO postgres;

--
-- Name: staffs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.staffs_id_seq OWNED BY public.staffs.id;


--
-- Name: usage_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usage_logs (
    id bigint NOT NULL,
    date_time timestamp(6) without time zone,
    note character varying(255),
    member_membership_id bigint
);


ALTER TABLE public.usage_logs OWNER TO postgres;

--
-- Name: usage_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usage_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usage_logs_id_seq OWNER TO postgres;

--
-- Name: usage_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usage_logs_id_seq OWNED BY public.usage_logs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(255),
    password_digest character varying(255),
    role integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: equipments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipments ALTER COLUMN id SET DEFAULT nextval('public.equipments_id_seq'::regclass);


--
-- Name: feedbacks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks ALTER COLUMN id SET DEFAULT nextval('public.feedbacks_id_seq'::regclass);


--
-- Name: gyms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gyms ALTER COLUMN id SET DEFAULT nextval('public.gyms_id_seq'::regclass);


--
-- Name: member_memberships id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_memberships ALTER COLUMN id SET DEFAULT nextval('public.member_memberships_id_seq'::regclass);


--
-- Name: members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);


--
-- Name: membership_activity_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_activity_logs ALTER COLUMN id SET DEFAULT nextval('public.membership_activity_logs_id_seq'::regclass);


--
-- Name: memberships id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memberships ALTER COLUMN id SET DEFAULT nextval('public.memberships_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: replies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies ALTER COLUMN id SET DEFAULT nextval('public.replies_id_seq'::regclass);


--
-- Name: staffs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staffs ALTER COLUMN id SET DEFAULT nextval('public.staffs_id_seq'::regclass);


--
-- Name: usage_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usage_logs ALTER COLUMN id SET DEFAULT nextval('public.usage_logs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: equipments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipments (id, description, image, manufacturer, name, type) FROM stdin;
1	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Tạ
2	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Máy chạy
3	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy chạy
4	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
5	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Máy tập chân
6	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Máy tập chân
7	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Máy chạy
8	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
9	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy chạy
10	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy chạy
11	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Máy chạy
12	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Máy tập chân
13	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Máy chạy
14	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Tạ
15	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy chạy
16	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
17	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Máy chạy
18	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Máy tập chân
19	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
20	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Máy tập chân
21	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Tạ
22	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy chạy
23	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Tạ
24	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
25	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Máy chạy
26	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
27	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
28	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Tạ
29	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy chạy
30	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Tạ
31	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
32	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Tạ
33	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Tạ
34	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Máy chạy
35	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Máy tập chân
36	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Máy chạy
37	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
38	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy tập chân 2 cân	Tạ
39	giúp săn chắc, giảm mỡ cơ	\N	H&K	Tạ 2 cân	Máy tập chân
40	giúp săn chắc, giảm mỡ cơ	\N	H&K	Máy chạy 2 cân	Máy chạy
\.


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedbacks (id, content, stars, gym_id, member_id) FROM stdin;
1	Voluptatem velit et.	4	6	96
2	Consequatur quo unde nihil eum error qui magnam.	2	4	37
3	Iste omnis quo nulla eum fugit sunt.	1	4	6
4	Architecto in sed expedita.	5	8	34
5	Quia eos ex recusandae quia laborum.	2	8	66
6	Ut repudiandae sint porro sapiente omnis sed.	4	10	67
7	Hic corrupti natus dolore architecto quia non nesciunt.	4	10	72
8	Quia nobis aut quia fugiat ipsum error.	5	9	23
9	Ad quia non et officia perferendis ut.	1	4	29
10	Autem est harum quod molestiae mollitia quam.	4	8	7
11	Necessitatibus alias corporis ad alias.	3	3	37
12	Reprehenderit saepe sapiente.	5	8	79
13	Quod suscipit maxime.	5	2	83
14	Occaecati debitis enim asperiores veniam.	3	7	8
15	Incidunt tempora a repudiandae et.	4	9	18
16	Et illum et fuga sit repudiandae.	2	8	56
17	Veniam voluptatum fugit nam.	5	1	8
18	Velit et officiis sequi dignissimos omnis sit voluptatum.	3	8	13
19	Iusto distinctio natus aut.	5	5	31
20	Quisquam nisi tempora aut.	2	9	17
21	Provident mollitia amet modi nihil.	1	2	3
22	Necessitatibus distinctio rerum ut autem ut delectus est.	4	8	51
23	Aut et modi.	3	8	61
24	Iste adipisci voluptatum.	1	8	34
25	Et porro quae.	4	9	55
26	Alias eveniet vero.	2	9	7
27	Officiis id et voluptatem consequuntur.	2	4	67
28	Repellat consequatur quia nemo laudantium mollitia aperiam commodi.	3	4	86
29	Provident aliquam voluptatem nisi.	2	2	32
30	Distinctio voluptatibus libero.	2	2	83
31	Laudantium molestiae sit autem nisi voluptatem doloribus.	5	8	9
32	Consequatur possimus quibusdam odio distinctio nobis.	5	5	10
33	Mollitia exercitationem illo.	5	6	13
34	Aperiam alias aliquid quia ipsam.	1	8	6
35	Eveniet magni quo.	4	5	89
36	Ab ipsa quibusdam ea quasi alias eaque minima.	3	10	92
37	Itaque saepe qui et.	2	10	3
38	In voluptas neque tempore amet et quia.	3	8	9
39	Consequatur expedita laudantium odio quis repudiandae.	3	9	91
40	Aut ut veritatis illum eos inventore.	4	5	9
41	Autem et rerum.	1	3	93
42	Nisi qui qui libero.	4	3	82
43	Impedit et optio qui.	5	1	42
44	Eius sit iste ducimus voluptatem sit et.	4	6	89
45	Maiores eligendi dignissimos perferendis eos non.	1	3	61
46	Nemo tenetur fugiat maiores vitae.	1	10	72
47	Numquam sed dolor.	5	1	54
48	Nostrum itaque est unde.	4	1	50
49	Est quis et totam.	5	5	17
50	Cupiditate dicta quaerat perspiciatis harum natus officiis ipsa.	4	4	97
51	Perferendis aut nam cum eveniet repellat.	3	2	69
52	Nesciunt et libero repellendus hic neque consequatur.	2	8	19
53	Et aperiam quis sed et.	3	9	35
54	Eos mollitia labore voluptas eos iste.	4	8	14
55	Consequatur nesciunt voluptatibus excepturi in tempore.	1	5	74
56	Rerum quas voluptas odit placeat.	2	10	74
57	Dolor illum et architecto aliquid eius dolores.	4	7	32
58	Doloribus sint quasi deleniti rerum et.	5	8	23
59	Iusto eos iste ut non aut.	3	8	45
60	Similique sit exercitationem et velit.	4	8	64
61	Molestiae assumenda dolor delectus quis saepe.	3	5	2
62	Porro excepturi accusamus odio consequuntur alias.	2	9	31
63	In voluptatem voluptatem eligendi sit.	1	8	1
64	Illo totam dolorem dolores rem voluptatem in.	3	8	27
65	Nostrum ut sapiente iste voluptatem est assumenda.	1	7	66
66	Ut magnam voluptates eum laudantium quas corrupti molestiae.	4	1	66
67	Ut eum magni sit unde eos eos.	5	3	32
68	Cum temporibus eaque ut aliquam vero incidunt rerum.	1	4	56
69	Quo nisi repellat.	4	4	56
70	Eum harum ipsa sint autem ex.	3	6	4
71	Excepturi dolores nam dolorem.	1	3	83
72	Debitis omnis excepturi molestias nihil quam aut doloribus.	2	6	82
73	Esse aut magnam amet vitae beatae.	4	7	49
74	Maiores in quam porro reprehenderit quas assumenda sit.	1	7	50
75	Nobis quibusdam corrupti non commodi non.	3	4	59
76	Illum ducimus error laborum excepturi et.	5	7	85
77	Voluptatem quos voluptatem ullam libero aut est.	2	7	77
78	Commodi temporibus libero laboriosam est est ut ea.	4	3	51
79	Et tempora autem quis sint nesciunt dolorum doloribus.	3	9	35
80	Laudantium et saepe eos quas accusamus.	2	2	66
81	Sed minima saepe voluptatem et error mollitia.	5	9	93
82	Totam corporis illum sunt tempora.	3	9	80
83	Repudiandae laborum explicabo dolor minus veniam deserunt.	2	2	37
84	Vitae repudiandae repellendus nam repellendus qui.	1	5	50
85	Eius ab ut molestias.	5	1	8
86	Optio natus sunt enim aut.	1	3	44
87	Dolores facilis error ut quia consequatur.	4	8	32
88	In enim molestiae autem nemo ullam voluptatem.	3	1	79
89	Autem vel voluptatem voluptatibus qui.	5	2	19
90	Placeat quibusdam necessitatibus aspernatur.	3	4	25
91	Impedit incidunt non magni et beatae rerum.	5	9	27
92	Sequi aut asperiores.	1	1	47
93	Ipsam aut corporis iure nihil beatae est dolorem.	5	10	32
94	Sit rerum quae ut.	2	2	7
95	Voluptatem laboriosam nulla placeat aut assumenda atque quis.	2	7	64
96	Vel maiores reprehenderit.	2	10	49
97	Doloribus quasi voluptas voluptatibus nihil natus vel.	5	3	91
98	Ad omnis molestiae omnis dignissimos tempora repellendus.	1	3	58
99	Quia esse dicta porro aliquam beatae.	5	10	70
100	Sed sapiente suscipit voluptatem distinctio ad.	3	10	44
\.


--
-- Data for Name: gym_equipments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gym_equipments (gym_id, equipment_id) FROM stdin;
1	4
1	1
1	3
1	2
2	6
2	7
2	8
2	5
3	9
3	12
3	10
3	11
4	14
4	16
4	15
4	13
5	19
5	18
5	17
5	20
6	23
6	22
6	24
6	21
7	27
7	26
7	28
7	25
8	29
8	31
8	32
8	30
9	33
9	36
9	34
9	35
10	40
10	38
10	39
10	37
\.


--
-- Data for Name: gyms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gyms (id, address, email, hotline, image, name) FROM stdin;
1	1427 Pansy Fork	deeann.ohara@example.com	211.343.5371 x4651	\N	Phòng gym số 3
2	36152 Kovacek Ridges	santa.ratke@example.com	840.186.0085 x8538	\N	Phòng gym số 16
3	667 Nikolaus Ridge	gala.buckridge@example.com	511.414.3509 x4542	\N	Phòng gym số 18
4	6260 Ja Mall	blaine.schmeler@example.com	(164) 732-2256	\N	Phòng gym số 16
5	75349 Renner Brook	silvia.grant@example.com	442-104-9413 x6038	\N	Phòng gym số 1
6	1740 Greenfelder Ways	lashay.hamill@example.com	890-966-6381 x68544	\N	Phòng gym số 18
7	562 Bud Overpass	norman.keebler@example.com	344-514-0510	\N	Phòng gym số 9
8	80963 Paula Corners	mayra.terry@example.com	1-165-651-1146 x050	\N	Phòng gym số 11
9	2815 Russel Circle	mauricio.prohaska@example.com	771.192.3632 x248	\N	Phòng gym số 8
10	661 Pam Run	jack.mueller@example.com	428-839-1198 x254	\N	Phòng gym số 16
\.


--
-- Data for Name: member_memberships; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.member_memberships (id, created_at, has_activated, valid_from, valid_until, member_id, membership_id) FROM stdin;
1	2023-07-10 12:44:57.267188	f	2023-07-05	2023-09-05	40	1
2	2023-07-10 12:44:57.289251	f	2023-07-07	2023-09-07	39	1
3	2023-07-10 12:44:57.303363	f	2023-07-05	2023-09-05	13	1
4	2023-07-10 12:44:57.311357	f	2023-07-08	2023-09-08	34	1
5	2023-07-10 12:44:57.317093	f	2023-07-04	2023-09-04	25	1
6	2023-07-10 12:44:57.324078	f	2023-07-02	2023-09-02	25	1
7	2023-07-10 12:44:57.333003	f	2023-07-09	2023-09-09	39	1
8	2023-07-10 12:44:57.338008	f	2023-07-03	2023-09-03	47	1
9	2023-07-10 12:44:57.343006	f	2023-07-06	2023-09-06	90	1
10	2023-07-10 12:44:57.348002	f	2023-07-04	2023-09-04	50	1
11	2023-07-10 12:44:57.362002	f	2023-07-02	2023-09-02	42	2
12	2023-07-10 12:44:57.36804	f	2023-07-08	2023-09-08	66	2
13	2023-07-10 12:44:57.373061	f	2023-07-02	2023-09-02	49	2
14	2023-07-10 12:44:57.379034	f	2023-07-06	2023-09-06	97	2
15	2023-07-10 12:44:57.386007	f	2023-07-08	2023-09-08	40	2
16	2023-07-10 12:44:57.392006	f	2023-07-09	2023-09-09	52	2
17	2023-07-10 12:44:57.396228	f	2023-07-05	2023-09-05	46	2
18	2023-07-10 12:44:57.401268	f	2023-07-09	2023-09-09	68	2
19	2023-07-10 12:44:57.406264	f	2023-07-07	2023-09-07	97	2
20	2023-07-10 12:44:57.410296	f	2023-07-06	2023-09-06	71	2
21	2023-07-10 12:44:57.417491	f	2023-07-04	2023-09-04	49	3
22	2023-07-10 12:44:57.426478	f	2023-07-02	2023-09-02	8	3
23	2023-07-10 12:44:57.432691	f	2023-07-05	2023-09-05	45	3
24	2023-07-10 12:44:57.438693	f	2023-07-02	2023-09-02	74	3
25	2023-07-10 12:44:57.443699	f	2023-07-08	2023-09-08	82	3
26	2023-07-10 12:44:57.44871	f	2023-07-06	2023-09-06	4	3
27	2023-07-10 12:44:57.453692	f	2023-07-03	2023-09-03	63	3
28	2023-07-10 12:44:57.458696	f	2023-07-02	2023-09-02	85	3
29	2023-07-10 12:44:57.463827	f	2023-07-04	2023-09-04	79	3
30	2023-07-10 12:44:57.467829	f	2023-07-05	2023-09-05	85	3
31	2023-07-10 12:44:57.48006	f	2023-07-06	2023-09-06	10	4
32	2023-07-10 12:44:57.489076	f	2023-07-04	2023-09-04	89	4
33	2023-07-10 12:44:57.497066	f	2023-07-02	2023-09-02	56	4
34	2023-07-10 12:44:57.504071	f	2023-07-06	2023-09-06	15	4
35	2023-07-10 12:44:57.512073	f	2023-07-08	2023-09-08	97	4
36	2023-07-10 12:44:57.517631	f	2023-07-08	2023-09-08	46	4
37	2023-07-10 12:44:57.525628	f	2023-07-06	2023-09-06	18	4
38	2023-07-10 12:44:57.532699	f	2023-07-04	2023-09-04	41	4
39	2023-07-10 12:44:57.542129	f	2023-07-04	2023-09-04	50	4
40	2023-07-10 12:44:57.548147	f	2023-07-02	2023-09-02	18	4
41	2023-07-10 12:44:57.560162	f	2023-07-03	2023-09-03	58	5
42	2023-07-10 12:44:57.571917	f	2023-07-03	2023-09-03	41	5
43	2023-07-10 12:44:57.577919	f	2023-07-04	2023-09-04	80	5
44	2023-07-10 12:44:57.584928	f	2023-07-08	2023-09-08	48	5
45	2023-07-10 12:44:57.591914	f	2023-07-04	2023-09-04	40	5
46	2023-07-10 12:44:57.601366	f	2023-07-03	2023-09-03	54	5
47	2023-07-10 12:44:57.614507	f	2023-07-05	2023-09-05	80	5
48	2023-07-10 12:44:57.623101	f	2023-07-08	2023-09-08	84	5
49	2023-07-10 12:44:57.634347	f	2023-07-04	2023-09-04	61	5
50	2023-07-10 12:44:57.645351	f	2023-07-03	2023-09-03	52	5
51	2023-07-10 12:44:57.662823	f	2023-07-06	2023-09-06	60	6
52	2023-07-10 12:44:57.672837	f	2023-07-06	2023-09-06	7	6
53	2023-07-10 12:44:57.680994	f	2023-07-02	2023-09-02	4	6
54	2023-07-10 12:44:57.690001	f	2023-07-06	2023-09-06	98	6
55	2023-07-10 12:44:57.700016	f	2023-07-08	2023-09-08	14	6
56	2023-07-10 12:44:57.710271	f	2023-07-03	2023-09-03	1	6
57	2023-07-10 12:44:57.718677	f	2023-07-03	2023-09-03	63	6
58	2023-07-10 12:44:57.726678	f	2023-07-07	2023-09-07	51	6
59	2023-07-10 12:44:57.734676	f	2023-07-08	2023-09-08	55	6
60	2023-07-10 12:44:57.742683	f	2023-07-06	2023-09-06	7	6
61	2023-07-10 12:44:57.758016	f	2023-07-02	2023-09-02	11	7
62	2023-07-10 12:44:57.769012	f	2023-07-08	2023-09-08	49	7
63	2023-07-10 12:44:57.777008	f	2023-07-02	2023-09-02	18	7
64	2023-07-10 12:44:57.785008	f	2023-07-08	2023-09-08	5	7
65	2023-07-10 12:44:57.793032	f	2023-07-06	2023-09-06	75	7
66	2023-07-10 12:44:57.801063	f	2023-07-08	2023-09-08	31	7
67	2023-07-10 12:44:57.80905	f	2023-07-02	2023-09-02	50	7
68	2023-07-10 12:44:57.81778	f	2023-07-09	2023-09-09	99	7
69	2023-07-10 12:44:57.82777	f	2023-07-02	2023-09-02	86	7
70	2023-07-10 12:44:57.836775	f	2023-07-04	2023-09-04	5	7
71	2023-07-10 12:44:57.845953	f	2023-07-03	2023-09-03	47	8
72	2023-07-10 12:44:57.851956	f	2023-07-08	2023-09-08	10	8
73	2023-07-10 12:44:57.855942	f	2023-07-06	2023-09-06	92	8
74	2023-07-10 12:44:57.85995	f	2023-07-03	2023-09-03	1	8
75	2023-07-10 12:44:57.86611	f	2023-07-07	2023-09-07	2	8
76	2023-07-10 12:44:57.870124	f	2023-07-02	2023-09-02	75	8
77	2023-07-10 12:44:57.876106	f	2023-07-07	2023-09-07	36	8
78	2023-07-10 12:44:57.882105	f	2023-07-09	2023-09-09	46	8
79	2023-07-10 12:44:57.889099	f	2023-07-03	2023-09-03	16	8
80	2023-07-10 12:44:57.892118	f	2023-07-02	2023-09-02	77	8
81	2023-07-10 12:44:57.900117	f	2023-07-04	2023-09-04	5	9
82	2023-07-10 12:44:57.905153	f	2023-07-09	2023-09-09	81	9
83	2023-07-10 12:44:57.911128	f	2023-07-06	2023-09-06	97	9
84	2023-07-10 12:44:57.915743	f	2023-07-04	2023-09-04	89	9
85	2023-07-10 12:44:57.921758	f	2023-07-07	2023-09-07	33	9
86	2023-07-10 12:44:57.929754	f	2023-07-09	2023-09-09	5	9
87	2023-07-10 12:44:57.936754	f	2023-07-07	2023-09-07	62	9
88	2023-07-10 12:44:57.94276	f	2023-07-02	2023-09-02	49	9
89	2023-07-10 12:44:57.948018	f	2023-07-05	2023-09-05	58	9
90	2023-07-10 12:44:57.953032	f	2023-07-05	2023-09-05	77	9
91	2023-07-10 12:44:57.961011	f	2023-07-03	2023-09-03	84	10
92	2023-07-10 12:44:57.969055	f	2023-07-02	2023-09-02	86	10
93	2023-07-10 12:44:57.977006	f	2023-07-09	2023-09-09	93	10
94	2023-07-10 12:44:57.982018	f	2023-07-06	2023-09-06	31	10
95	2023-07-10 12:44:57.988033	f	2023-07-04	2023-09-04	26	10
96	2023-07-10 12:44:57.994009	f	2023-07-03	2023-09-03	44	10
97	2023-07-10 12:44:57.998012	f	2023-07-03	2023-09-03	70	10
98	2023-07-10 12:44:58.002185	f	2023-07-02	2023-09-02	34	10
99	2023-07-10 12:44:58.007427	f	2023-07-05	2023-09-05	60	10
100	2023-07-10 12:44:58.012488	f	2023-07-05	2023-09-05	38	10
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.members (id, address, avatar, banned_reason, date_of_birth, first_name, gender, health_condition, is_banned, joined_date, last_name, note, phone_number, weight, user_id) FROM stdin;
1	Apt. 061 690 Jaskolski Viaduct, East Mariano, AK 99128	\N	\N	1965-05-09	Berna	1	Id error aut consectetur eveniet nemo excepturi voluptatem.	f	1997-06-01	Leannon	Aut accusamus qui harum amet.	1-748-516-3449	0.9687155822638619	1
2	Apt. 158 0872 O'Keefe Bridge, Randyhaven, SC 27709	\N	\N	1980-04-20	Denisse	0	Explicabo veritatis aut repellendus iusto inventore error.	f	1998-07-27	Morar	Doloremque est aut autem voluptatem.	(279) 126-7885	0.9677897287318933	2
3	Apt. 164 9511 Hartmann Fields, Port Cameronhaven, NY 74089-8893	\N	\N	1989-11-16	Katia	0	Et aspernatur voluptatem culpa beatae omnis veritatis dolore.	f	1974-09-13	Simonis	Voluptas voluptatem et.	695.452.4485	0.019544675828297664	3
4	15209 Branden Mission, Lake Leonel, KS 59666	\N	\N	1969-04-12	Jonas	0	Quo est rerum quisquam mollitia doloribus alias explicabo.	f	1960-09-25	Parisian	Eaque necessitatibus cumque quasi culpa.	(663) 210-3902	0.4641000229672967	4
5	5680 Kira Rapid, Rufinastad, WY 47385-3358	\N	\N	1973-07-05	Cliff	1	Nihil ut perspiciatis voluptatibus laudantium.	f	1983-07-05	Hyatt	Quaerat ut et quod aspernatur aut.	(799) 319-2348	0.7979021479616154	5
6	Apt. 641 8174 Rubin Passage, Fredrickastad, OK 14065-6873	\N	\N	1965-12-23	Humberto	0	Quas velit maiores earum.	f	1967-02-07	Christiansen	Possimus iure quam.	(414) 759-8565	0.40938244440776816	6
7	6394 Bryon Center, West Domenicamouth, OK 51305-5987	\N	\N	1986-12-20	Dionna	0	A in ab suscipit vel.	f	1996-12-18	Kuhic	Tempora asperiores saepe perspiciatis.	475.727.6682	0.3980988314047038	7
8	Suite 573 2590 Bergnaum Roads, Lake Lady, FL 13954	\N	\N	1980-11-08	Rodrick	0	Nihil eaque sint consequatur.	f	2001-08-23	Franecki	Quia laborum praesentium.	836-741-0034	0.046746345409207746	8
9	Suite 993 3110 Suzie Coves, Evieberg, OK 37369-1333	\N	\N	1991-06-01	Minta	1	Ex adipisci est dolores iste qui illo eius.	f	1962-09-08	Mills	Modi ad expedita reprehenderit cum consequatur.	826.451.6566	0.6047496486344085	9
10	Suite 090 7794 Kandy Knolls, Lueilwitzfurt, SD 54841	\N	\N	2004-02-26	Rosaria	0	Illo quasi molestias voluptatibus aperiam.	f	1972-01-20	Quigley	Cumque sapiente quasi harum cumque aspernatur animi minima.	342.895.0851	0.33454686544811685	10
11	2313 Hal Circles, Kautzerfort, WY 50010-2422	\N	\N	1996-07-30	Franklyn	1	Quia ut qui rem eos totam et fugit.	f	1991-10-08	Nitzsche	Magnam laudantium omnis delectus occaecati pariatur.	1-194-076-2863	0.4547601091329596	11
12	6067 Curt Circles, Goyettefurt, DE 22456	\N	\N	1966-12-29	Tony	0	Error aut recusandae fuga debitis similique quidem.	f	1984-01-04	Ferry	Aut sequi aut ullam velit est.	(194) 941-2777	0.7272373987700939	12
13	Apt. 539 2494 Brekke Club, Nevillechester, IN 71647	\N	\N	1971-04-21	Elden	0	Atque labore molestiae excepturi.	f	1990-12-09	Turner	Officia voluptas blanditiis in.	803.476.4195	0.4198628061549776	13
14	61301 Botsford Causeway, Jacobsborough, MO 88214	\N	\N	1964-04-22	Floyd	0	Culpa id itaque at tempora ea.	f	1986-08-25	Pfannerstill	Id enim corporis.	012.286.4074	0.3042109295927763	14
15	Apt. 876 0229 Juliet Hill, East Denver, MD 29743	\N	\N	1974-08-21	Andreas	0	Alias sed ut voluptatibus quia inventore.	f	1970-08-18	Crona	Sit iure ut tenetur.	1-862-249-7341	0.9270907902798171	15
16	1998 Carter Squares, Lake Argentina, AK 06274-8955	\N	\N	1978-06-26	Tanesha	0	Qui tempore et.	f	1969-05-14	Abbott	Exercitationem quas mollitia repellat quisquam eveniet.	907.940.1710	0.5900435748180026	16
17	8751 Treutel Station, Charoletteburgh, KS 23515-5381	\N	\N	1986-07-01	Ashlie	0	Magni expedita similique iste.	f	1979-04-14	Jast	Vero natus sunt.	(001) 432-6417	0.15904877163384434	17
18	834 Collen Ports, Sanfordfort, AZ 80640	\N	\N	1995-12-26	Blossom	0	Quia ad explicabo voluptatem mollitia laborum.	f	1993-06-10	Dooley	Sed animi ut et error illum sequi aut.	1-971-027-9115	0.2918084489230578	18
19	0987 Wolf Walks, Lake Kennith, GA 09755-4847	\N	\N	1986-05-29	Keenan	0	Aut minima iste quia.	f	1974-04-21	Cruickshank	Qui ipsam ea rerum odio.	1-761-793-2739	0.0945579070580127	19
20	Apt. 490 103 Nicolas Knoll, Boktown, NH 80173-3849	\N	\N	1994-12-02	Leatrice	1	Nostrum voluptas ratione dolor praesentium.	f	1991-05-19	Schinner	Ullam possimus quia quaerat qui vero qui sed.	825-304-3924	0.07376121931424395	20
21	Apt. 270 925 Gus Fields, North Corinnabury, ME 42724	\N	\N	2000-08-09	Nicholas	0	Et debitis sed voluptas dolores.	f	1984-03-10	Senger	Rerum nisi error dignissimos.	(118) 571-9918	0.3720463455303452	21
22	258 Schulist Corners, North Guillermina, MD 90226	\N	\N	1985-10-29	Carrol	1	Sit quas beatae quo eaque cupiditate.	f	2002-08-28	Emmerich	Perspiciatis voluptatibus sint.	970-536-5725	0.7495125538687314	22
23	Apt. 225 4860 Willie Mall, East Wen, IA 83827	\N	\N	2002-03-12	Levi	0	Ullam commodi consequatur fuga officia blanditiis ratione.	f	1963-10-04	Torphy	Sed eum inventore similique quia alias odit consectetur.	1-147-960-4665	0.4930919053857651	23
24	Apt. 422 852 Jovita Lane, East Travis, NJ 29602	\N	\N	1981-12-17	Reina	0	Adipisci qui quidem porro ut velit.	f	1969-10-19	McDermott	Officiis consequuntur repudiandae voluptatem aut et non.	(355) 611-1173	0.9585872423124706	24
25	03744 Russell Fall, New Deann, MA 13066	\N	\N	1962-07-10	Jesusita	0	Quis quasi sunt ut numquam dicta incidunt.	f	1979-09-28	Kshlerin	Et maxime vel.	1-540-919-7910	0.8930176539093423	25
26	Suite 883 06539 Joseph Pine, Farrellhaven, CT 73585-8443	\N	\N	1971-06-27	Rufus	1	Est quia quia quae.	f	1985-08-22	Considine	Et corrupti hic quia perferendis soluta facilis.	992-351-6900	0.5229806043314414	26
27	246 Jacqueline River, West Guadalupe, LA 78262-6460	\N	\N	1974-07-28	Jeffery	0	Non commodi eos et numquam voluptates.	f	1960-10-26	Connelly	Provident asperiores culpa.	732-509-2560	0.2692099933240305	27
28	918 Pfannerstill Stravenue, East Malik, IN 66058	\N	\N	1967-11-19	Israel	0	Exercitationem tempore similique et.	f	2001-11-03	Hermiston	Mollitia aut rerum ea velit voluptatum error consequatur.	779-942-7207	0.910712435693273	28
29	5106 Danica Squares, Rollandmouth, MO 10459-5478	\N	\N	1990-12-23	Edmund	0	Et est fuga veniam incidunt consequatur labore sit.	f	1977-05-11	Considine	Non adipisci ut nesciunt nulla est.	1-943-634-7805	0.9886302973362273	29
30	62551 Christiansen Crescent, Meridethville, VT 63473	\N	\N	1986-03-29	Warren	0	Error est nulla voluptatibus.	f	1972-12-14	Batz	Ut facilis accusantium saepe maiores debitis.	(360) 492-6291	0.15589210062098768	30
31	Apt. 221 21456 Alexia Track, Hermanfurt, LA 67972-4014	\N	\N	1969-07-20	Tricia	0	Totam impedit officiis.	f	1981-02-03	Bayer	Officiis qui autem a vel ut.	173-593-8501	0.020375316646080388	31
32	726 Cronin Rapid, Port Tai, GA 94473-9486	\N	\N	1988-07-16	Renna	0	Aut tenetur quaerat.	f	1988-01-12	Blick	Et repellat sed modi.	(406) 098-6802	0.9761508343273787	32
33	6571 Lang Causeway, East Dariomouth, IL 07970	\N	\N	1993-10-15	Beau	0	Vitae optio porro cum est accusantium unde.	f	1961-03-24	Stracke	Qui sed fuga quis non ab dolorem.	(612) 946-5260	0.9695405163747347	33
34	10581 Sherrie Mount, Port Claudettebury, AL 59263-7089	\N	\N	1997-11-23	Coralie	1	Fugiat veniam sequi sequi culpa.	f	1964-01-22	Flatley	Alias est quo.	155-979-0509	0.9479897823457246	34
35	82148 Marybeth Turnpike, Olivertown, VT 38091	\N	\N	2001-12-07	Damion	1	Vel incidunt voluptatem voluptatem.	f	1973-03-03	Williamson	Eum et numquam vero doloremque inventore doloremque.	362.774.6861	0.6151491287156285	35
36	4297 Kassulke Vista, Langworthport, AL 27693	\N	\N	1991-08-01	Ross	0	Ut repellat expedita beatae aut voluptas.	f	1981-03-24	Lockman	Officia molestiae alias voluptas nihil facere incidunt et.	(405) 492-2607	0.8183262742950171	36
37	7345 Reichel Junction, Strackestad, RI 14336	\N	\N	2004-10-13	Elwood	1	Quia repellat officiis vitae maxime nam.	f	1976-11-11	Friesen	Eos blanditiis distinctio.	1-688-655-2391	0.03832622893773985	37
38	Suite 638 42583 Cyndy Islands, Bechtelarville, WY 07990	\N	\N	1971-09-11	Bea	1	Voluptatem minima aperiam.	f	1994-09-20	Heller	Mollitia voluptas magni quia.	055-039-1767	0.6382391235537677	38
39	Apt. 829 25346 Schmitt Villages, New Juanshire, SC 65319-6161	\N	\N	1966-05-12	Hayden	0	Rerum magnam et aut omnis dolores ut adipisci.	f	1972-05-06	Goodwin	Omnis minima et rem.	(858) 691-4692	0.2606606211507294	39
40	74642 Runolfsdottir Crossroad, Lake Brettborough, IA 41184-5946	\N	\N	1962-02-25	Aldo	1	Voluptas exercitationem aut quo sequi voluptas cum odit.	f	1986-04-02	Leannon	Suscipit commodi natus sit eveniet.	958-740-3578	0.658035652512294	40
41	Suite 507 65671 Desmond Meadows, Chasechester, NE 63068	\N	\N	1998-12-25	Maricruz	1	Modi soluta facilis qui aut tempore qui.	f	1976-12-27	Murray	Magni sed est vitae iure.	380-620-1380	0.4952020469278966	41
42	Apt. 475 2570 Jerrell Walk, South Dusty, DE 01497	\N	\N	1992-02-29	Ervin	1	Sed minus iste minima harum corrupti.	f	1962-03-07	Adams	Rem libero ea officiis aut explicabo.	1-804-523-7943	0.9213314733425716	42
43	409 Marva Oval, West Lasandraside, MN 14958-4114	\N	\N	1998-09-11	Buck	1	Neque vero dolorem eaque.	f	1967-08-13	Nolan	Quia nesciunt voluptatem dolores.	267-136-7926	0.9506234307082019	43
44	Suite 713 7870 Kautzer Circles, North Carolmouth, TN 07302	\N	\N	1995-10-31	Sheryll	0	Eligendi voluptatem beatae reprehenderit modi cumque ab.	f	1972-08-09	Gorczany	Dolor eos incidunt ratione beatae molestiae sequi velit.	120-011-3861	0.3406026282844151	44
45	103 Gerhold Drives, New Xuan, NY 90872-4696	\N	\N	1984-07-13	Elaine	1	Atque saepe totam ut aliquid nam.	f	1996-08-29	Rippin	Eaque pariatur ab eos.	(782) 116-7097	0.4201379962978524	45
46	125 Keebler Canyon, Kozeyport, NY 88740-9406	\N	\N	2003-12-17	Victor	1	Voluptates sapiente error architecto ut aut tempora.	f	1961-04-24	Renner	Minus molestiae iste maxime debitis et id.	141.136.4781	0.48189958896527296	46
47	Suite 419 0304 Cheryl Port, Carlieburgh, MT 30068-0196	\N	\N	1961-05-08	Candra	1	Sed enim velit cum libero.	f	2004-02-20	Hilpert	Officiis aliquam quo.	854.028.1522	0.7038442973667821	47
48	0762 Darren Knoll, West Breann, RI 20843-7949	\N	\N	1991-08-24	Charlie	1	Ducimus magni assumenda aliquid tenetur.	f	1993-06-15	Rau	Labore explicabo totam aut quod tempore.	(127) 826-4777	0.891053129231942	48
49	Suite 198 849 Sawayn Stream, West Ryan, VT 51414	\N	\N	1970-03-25	Britt	0	Possimus qui consequatur.	f	1980-02-09	Schmidt	Autem voluptas quidem amet dignissimos.	(383) 406-9185	0.6326060014584017	49
50	967 Brakus Mill, Jaimebury, KS 99766	\N	\N	1991-02-07	Majorie	0	Natus aliquam pariatur incidunt dolores qui vel.	f	1978-03-18	Little	Vero tenetur non fuga.	(898) 293-2566	0.8362910615913763	50
51	Suite 934 78799 Vonnie Creek, East Tobiasshire, CO 95981	\N	\N	1990-04-03	Thea	1	Aperiam sed earum tempora quia doloremque aliquid ipsum.	f	2002-06-19	Kshlerin	Laborum neque repellendus laboriosam.	(687) 573-0115	0.4493259790731905	51
52	Apt. 351 6886 Bergstrom Drive, Effertzfurt, FL 74699	\N	\N	2004-05-09	Trey	1	Et enim vitae similique consequatur voluptatem.	f	1995-09-11	Doyle	A odit cupiditate dicta blanditiis et.	(251) 223-6839	0.7507387600378904	52
53	55809 Ryan Views, Elliottview, AR 65086	\N	\N	2005-01-22	Devora	1	Reprehenderit ut quasi sit numquam sed accusamus.	f	1963-04-22	Cormier	Est neque et sit.	(508) 928-6297	0.9375998300822882	53
54	567 Roger Garden, Kulaschester, VA 43021-3822	\N	\N	1982-03-14	Brice	0	Mollitia qui recusandae.	f	2003-03-15	Koelpin	Quia sit omnis quia autem.	(336) 862-7844	0.8467045197555559	54
55	999 Launa Cove, East Ulyssesburgh, ME 27318-3016	\N	\N	1990-08-25	Courtney	0	Laborum sunt cupiditate ut nisi.	f	2000-08-06	Strosin	Quo voluptatem rerum rerum accusantium et sed.	(675) 534-4117	0.8655453414107928	55
56	5468 Bauch Forges, Corneliuston, FL 35170-0930	\N	\N	1990-03-02	Cesar	0	Nisi modi alias.	f	1967-01-30	Jacobs	Facilis qui quia distinctio minus.	(587) 056-9183	0.6152743961877447	56
57	Apt. 924 2226 Margarito Plains, Robbiemouth, PA 29216-3216	\N	\N	1987-07-22	Ronnie	0	Alias optio provident earum et consectetur quasi.	f	1977-10-25	Welch	Modi quis dolorem sunt velit non deserunt autem.	1-920-931-1723	0.7663423593118597	57
58	0073 Hyatt Canyon, Williamsonburgh, CA 49377	\N	\N	1965-03-09	Ricarda	0	Soluta rerum minima ex.	f	1988-01-15	Denesik	Illum corrupti aspernatur.	(531) 420-7281	0.08465277184541953	58
59	Suite 007 185 Bryan Lodge, East Lolitaborough, KY 18586-8707	\N	\N	1965-04-19	Flora	1	Ea veritatis laudantium voluptatem et natus.	f	1960-04-21	Ward	Consequatur tempore asperiores tempore et.	(921) 990-6023	0.19807778859628622	59
60	80361 Murray Camp, Nickview, OR 83197-4080	\N	\N	1974-07-12	Gretta	0	Quidem hic sint dolorem distinctio quia.	f	1960-10-21	Wisozk	Corrupti qui voluptas placeat enim nemo.	373-503-2076	0.18282397370433856	60
61	02927 Gregg Spurs, Sawaynhaven, WI 84033	\N	\N	1989-05-29	Lupita	1	Veritatis est eum voluptatum.	f	1994-01-17	Carter	Fugiat excepturi dolor repellat.	614-757-8881	0.8477102360228447	61
62	7193 Abbott Divide, East Noe, AK 22111	\N	\N	1977-04-01	Bessie	1	A est numquam a totam rem.	f	1973-01-02	Pollich	Accusantium ut voluptatem ipsum voluptas aliquam suscipit nam.	(790) 757-0833	0.5558038885488574	62
63	937 Wilkinson Mission, Jasonland, IA 06143	\N	\N	1966-03-08	Drew	0	Odit repellat et explicabo corrupti ab eaque rerum.	f	1965-01-17	Lesch	Dolorem unde ea et rerum minima autem voluptatem.	728.640.1285	0.33953877122972986	63
64	48230 Goodwin Dale, Port Christoperport, TN 78759-1265	\N	\N	1968-12-03	Stanton	0	Ut corporis officia consequuntur quae ea ipsa.	f	1976-06-14	Wintheiser	Sed nulla aut neque beatae saepe sit.	1-093-464-1665	0.4993844314415333	64
65	301 Bechtelar Locks, Lake Ima, VT 28564-2265	\N	\N	1991-07-04	Nelle	0	Consequuntur cum eveniet.	f	1981-02-25	Reilly	Qui rerum ab voluptas ducimus.	(373) 170-9178	0.19852499528444922	65
66	Suite 907 3571 Myra Route, New Wilbert, NH 84256	\N	\N	1981-01-15	Mercedes	1	Quia cumque excepturi.	f	1981-11-17	McLaughlin	Quia dicta nostrum aut.	579.101.3985	0.0016703711083909667	66
67	Suite 526 8584 Laurice Shores, Jaynechester, OR 56086-3110	\N	\N	1965-07-20	Hayden	1	Inventore nihil saepe dolor culpa repellendus quasi quisquam.	f	1966-09-16	Stokes	Quidem accusantium odit.	800.230.3179	0.05710026747657504	67
68	69462 Jast Views, New Jarrett, RI 46920	\N	\N	1982-11-02	Thanh	1	Consequatur eos ea quisquam iure iste.	f	1994-11-27	King	Sit qui ex ut mollitia.	630-007-7223	0.060775581436974035	68
69	0153 Mayer Islands, Champlinchester, WV 76044	\N	\N	1960-07-12	Markus	1	Officiis maiores molestiae quia.	f	1966-07-19	Schaefer	Ut natus ipsa sit ut rerum quam.	339-142-8724	0.751150851620073	69
70	Suite 109 9740 Grady Glen, North Alishamouth, WY 78829	\N	\N	2001-04-05	Sunni	0	Nesciunt aut eum provident quisquam ad enim.	f	1964-11-01	Wuckert	Ea odio voluptatem nulla quaerat accusamus.	(977) 748-1126	0.7224459143591458	70
71	Suite 048 24868 Zina Curve, Claytonfort, DE 63259	\N	\N	1987-12-07	Pasty	1	Repudiandae eligendi aperiam ut.	f	1984-04-15	O'Connell	Unde officia molestias maiores tenetur omnis id quo.	1-535-872-7668	0.19600528502235548	71
72	412 Nikolaus Mountain, South Judithborough, NY 59591	\N	\N	2002-03-31	Fausto	0	Corporis quia incidunt illum iste provident quod.	f	1967-02-17	Berge	Qui eveniet ut minus est iure dolorum.	1-697-743-8312	0.292478221764788	72
73	Apt. 267 4610 Hettinger Lodge, West Cedric, NC 24036-9135	\N	\N	1985-08-30	Sol	1	Qui aut ut ullam et.	f	1962-10-09	Beer	Neque libero cumque ut.	080.939.4438	0.2847341429686895	73
74	Suite 122 28508 Jamila Square, Alitaland, UT 48992	\N	\N	2001-04-09	Karie	0	Aut eveniet et quis impedit delectus.	f	1971-09-18	Rice	Ducimus ad possimus autem sed.	614-622-5652	0.23271710263385292	74
75	670 Cher Square, Constancestad, NC 69748-4194	\N	\N	1958-10-12	Elna	1	Non distinctio eos voluptatem autem.	f	1992-05-21	Johnston	Nihil adipisci repellendus est sint in facere et.	(736) 329-1779	0.09588165404437432	75
76	Apt. 130 226 Kuhn Trafficway, Schadenbury, TX 97947-8273	\N	\N	1976-11-30	Cody	0	Vel quia qui aut quia.	f	1981-04-23	Klein	Ipsa aut at.	(664) 484-2547	0.8758475216055883	76
77	Suite 103 1086 Runolfsdottir Islands, Lake Patty, CO 95324	\N	\N	1965-03-02	Elaina	0	Repellendus modi velit sint voluptate unde labore.	f	1990-07-24	Gerlach	Fugit in deleniti.	1-419-777-1826	0.935676770741305	77
78	26600 Kub Roads, Jameyport, IA 09071	\N	\N	1958-08-11	Allena	0	Mollitia soluta repellendus ratione eos sit asperiores saepe.	f	1989-10-18	Harvey	Et ut placeat quae.	1-738-843-3613	0.5078826776226377	78
79	88460 Anderson Corner, North Dori, NY 61040	\N	\N	1996-03-07	Rodrigo	1	Rerum doloremque eos deserunt et ratione tempora.	f	2004-08-29	Brakus	Placeat sit vero nostrum distinctio facilis.	296.842.5319	0.2886174956839016	79
80	Apt. 290 683 Emmerich Drive, West Valchester, OK 95629-8540	\N	\N	1982-02-14	Marx	0	Officiis dolores aspernatur.	f	1987-12-03	Paucek	Sit quae accusamus impedit inventore quia placeat iusto.	1-197-949-1621	0.44714564144761293	80
81	518 Chong Overpass, Providenciafurt, MD 24259-8620	\N	\N	1987-06-25	Federico	0	Et voluptate quidem.	f	1986-08-15	Davis	In ut provident quo soluta ipsa tempora.	338.937.9176	0.0712057449554917	81
82	99209 Regenia Trafficway, Reynaldoburgh, VA 73583	\N	\N	1971-01-03	Tom	0	Aliquid et ut est ut consequatur ut.	f	1988-09-20	Wiza	Velit esse aut esse odit facilis odio officia.	400.830.2658	0.3200454432457399	82
83	47602 Huels Mount, Lynnaton, OH 38199-5889	\N	\N	1987-07-08	Malcolm	1	Iste aperiam modi ratione necessitatibus.	f	1999-09-03	Grimes	Iusto ratione exercitationem.	1-615-585-0364	0.0013105785953662075	83
84	Suite 592 081 O'Hara Square, New Jeffrey, MD 84550-0281	\N	\N	1973-12-23	Greg	1	Voluptatum neque adipisci.	f	2005-01-07	Bahringer	Et ea id et est harum repellendus quia.	1-065-148-0270	0.46912820837848246	84
85	Apt. 909 6582 Kallie Ports, Dickensborough, MT 81364	\N	\N	1965-07-16	Graig	1	Et ullam omnis aut.	f	1998-06-17	Lindgren	Sit facere architecto rem.	1-071-221-5479	0.764243405265511	85
86	Apt. 549 75886 Reid Loop, Annamariemouth, WY 84046-0525	\N	\N	1977-01-03	Kaley	1	Dignissimos quia repudiandae.	f	2004-06-26	Rogahn	Aut consequatur quam quas autem.	880-169-8820	0.16266351663738632	86
87	Suite 476 8390 Clementine Lane, New Art, CT 19999-3010	\N	\N	1987-12-17	Alonzo	1	Qui autem voluptatem consequuntur recusandae qui.	f	1971-03-26	Abernathy	Rerum et suscipit mollitia repellendus nisi.	1-630-625-1395	0.8850443763518309	87
88	Suite 836 011 Brakus Loop, South Annberg, UT 32695-4143	\N	\N	1984-11-06	Carmelo	0	Amet aliquam aspernatur nemo quod ipsa dolorem.	f	1998-04-17	Christiansen	Autem officiis incidunt consequatur harum nulla itaque.	742-271-3457	0.40675544487949333	88
89	Apt. 796 4647 Ricki Extension, Lake Erin, LA 18030	\N	\N	1990-03-23	Kenny	0	Et eos non autem dolorem natus.	f	1972-04-27	Streich	Et voluptas rerum beatae.	1-511-056-9901	0.472885811081861	89
90	105 Schaefer Ranch, West Marlynberg, SD 83698-6692	\N	\N	1965-06-28	Omer	0	Qui voluptates sed assumenda autem eius consectetur.	f	1959-08-17	Kris	Quas in facilis molestiae assumenda distinctio dolores corrupti.	(854) 799-2308	0.7780744148254451	90
91	Apt. 692 200 Gutmann Mills, Colleenland, TX 15158-7739	\N	\N	1966-11-07	Nathan	1	Itaque minus sit libero.	f	1963-09-17	Grady	Consectetur eos aut pariatur facilis velit et et.	1-731-182-8149	0.6733481098331159	91
92	0060 Estrella Run, Earlemouth, VT 11699-6244	\N	\N	1984-02-15	Waltraud	0	Dolorem quia consequatur voluptatem sapiente nesciunt dicta excepturi.	f	1998-06-23	Gutmann	Enim eos officiis.	(213) 341-8848	0.513277802557359	92
93	Apt. 920 959 Breitenberg Point, Felicamouth, LA 71108	\N	\N	1984-09-24	Shanel	0	Velit quam veritatis rerum dolorem.	f	1980-07-05	Monahan	Quis minima cumque voluptates possimus.	473-382-9139	0.5334896038019492	93
94	Apt. 737 23351 David Ridges, Lake Jaysonfort, GA 42773	\N	\N	1969-11-12	Daren	0	Quos exercitationem dolor quaerat suscipit odit voluptas.	f	2003-08-05	Quigley	Delectus tempora placeat magni.	400-849-6022	0.17644450219792518	94
95	Suite 324 93448 Arthur Run, Wuckertton, ND 92483-9950	\N	\N	1971-08-10	Hobert	0	Voluptatem delectus ad voluptatem.	f	2004-12-17	Simonis	Eos illo nobis tenetur molestias dignissimos eaque.	1-504-272-7825	0.887359705265277	95
96	Apt. 532 50310 Kelly Circle, Mariotown, SD 43432	\N	\N	2000-05-02	Bryce	1	Recusandae enim voluptas.	f	1991-11-01	Lemke	Sunt porro commodi expedita dolorum laborum eum.	1-020-126-9332	0.7834233120480186	96
97	3151 Jim Locks, Fayborough, SC 85684	\N	\N	1985-10-08	Jere	0	Ut quae explicabo officiis fuga occaecati voluptatibus.	f	1972-10-22	Schowalter	Sed ex atque voluptas et impedit ullam fugiat.	026.528.9844	0.08367844834669758	97
98	Apt. 185 04389 Ernser Loop, South Zettaland, MN 26640-1086	\N	\N	1977-10-04	Danae	0	Et quis magni dolores et error dolore ipsa.	f	2003-01-22	Nikolaus	Pariatur magnam eos.	1-992-898-6974	0.29752673830301857	98
99	6313 Berge Squares, Gaylordhaven, WI 69525-7660	\N	\N	1964-03-30	Jeffery	1	Nam expedita repudiandae.	f	1965-04-14	Spencer	Enim et accusantium.	1-618-217-4323	0.7013612134846524	99
\.


--
-- Data for Name: membership_activity_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membership_activity_logs (id, note, period_of_months, type, member_membership_id, payment_id) FROM stdin;
\.


--
-- Data for Name: memberships; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.memberships (id, description, max_num_of_members, monthly_price, name, created_by) FROM stdin;
1	Goi tap luyen giup co the san chac	44	147400	Gói fitness 1 tháng	23
2	Goi tap luyen giup co the san chac	4	134451	Gói fitness 1 tháng	2
3	Goi tap luyen giup co the san chac	40	175732	Gói fitness 1 tháng	22
4	Goi tap luyen giup co the san chac	37	103665	Gói fitness 1 tháng	30
5	Goi tap luyen giup co the san chac	42	122057	Gói fitness 1 tháng	3
6	Goi tap luyen giup co the san chac	45	121241	Gói fitness 1 tháng	8
7	Goi tap luyen giup co the san chac	35	166758	Gói fitness 1 tháng	13
8	Goi tap luyen giup co the san chac	1	158109	Gói fitness 1 tháng	2
9	Goi tap luyen giup co the san chac	37	165623	Gói fitness 1 tháng	14
10	Goi tap luyen giup co the san chac	35	175950	Gói fitness 1 tháng	16
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, amount, invoice_number, method) FROM stdin;
\.


--
-- Data for Name: replies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.replies (id, content, feedback_id, posted_by) FROM stdin;
\.


--
-- Data for Name: staffs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staffs (id, address, avatar, date_of_birth, employment_status, first_name, gender, hired_date, last_name, note, phone_number, "position", salary, user_id) FROM stdin;
1	\N	\N	\N	1	Super	0	\N	Admin	\N	(492) 912-9347	Trainer	3400222	100
2	78881 Cortez Bypass, Goodwinstad, SD 45999-1139	\N	1996-09-04	1	Frankie	1	1962-06-13	Keeling	Aut excepturi natus.	(033) 976-3439	Receptionist	1755459	101
3	04364 Rodrick Stravenue, New Johnie, CA 85596-6347	\N	1988-08-05	3	Jerrell	0	1978-09-07	Dickens	Deserunt minima architecto enim.	908-592-4306	Trainer	4397201	102
4	209 Sauer Fords, Kyleside, NE 63323-3214	\N	1980-07-23	1	Clora	0	1978-03-26	Mosciski	Cum ullam nulla porro voluptate maiores consequatur.	(985) 715-9890	Trainer	1340204	103
5	4057 Alden Parks, Pfannerstillburgh, UT 00563-1779	\N	1981-06-06	1	Cristen	1	2003-05-03	Little	Voluptatum sed blanditiis et nobis aperiam aut.	628.475.1117	Sales	4724223	104
6	Suite 564 2193 Treutel Shoals, Lashonmouth, LA 32552	\N	1987-12-03	3	Lemuel	1	1963-01-29	Larkin	Est sed neque quod non sed.	1-992-150-1479	Sales	3260171	105
7	Apt. 972 479 Corwin Drives, Lake Norah, WV 85330	\N	1989-04-09	1	Harry	1	1961-07-28	McKenzie	Et est ducimus.	384.094.7030	Receptionist	5472378	106
8	6222 Johnston Highway, East Arlenaview, KS 28146-5516	\N	1966-08-01	2	Jefferson	0	1969-02-09	Grant	Temporibus nihil vitae ea veritatis.	586.317.3834	Receptionist	3319096	107
9	Suite 606 59069 Hintz Park, New Brooksbury, VT 63895	\N	1982-02-28	2	Glynda	1	1965-10-04	Kassulke	Itaque voluptas voluptates sunt ipsam ut voluptas sit.	1-475-955-0401	Trainer	3975845	108
10	Apt. 505 9412 Goyette Mount, New Alla, NV 86703-8662	\N	1966-09-02	1	Jonathan	1	1987-01-26	Rippin	Ut autem commodi optio.	(579) 428-5435	Receptionist	3716690	109
11	222 Cassin Island, New Bridgett, VT 81007-9855	\N	2003-03-21	3	Yoko	1	1963-02-19	DuBuque	In error ut voluptatem eligendi deleniti ab.	1-004-273-0997	Trainer	2014511	110
12	Suite 903 1019 Joseph Overpass, Lake Samira, CO 27566	\N	1991-09-06	3	Moshe	0	1980-01-04	Hermann	Et fuga neque inventore voluptas architecto.	1-719-195-1156	Trainer	3762624	111
13	Suite 261 6843 Denesik Field, Bartolettifort, IA 88991-2762	\N	1990-04-26	3	Robby	1	1979-04-06	Herzog	Eos fuga animi numquam.	758-632-6093	Trainer	3711748	112
14	4464 Wallace Pines, Edmundoborough, AZ 22865	\N	1977-12-06	2	Leida	0	1976-07-10	Dare	Iure dolor aut cupiditate saepe adipisci laudantium placeat.	(031) 848-2393	Sales	5840244	113
15	Suite 590 3104 Arden Summit, Port Kenda, VA 16289-0705	\N	1978-11-24	3	Lillie	0	1970-07-31	Bergstrom	Autem quis numquam et blanditiis velit mollitia voluptas.	384.683.4217	Receptionist	1197609	114
16	Apt. 126 870 Natalie Grove, Jorgestad, MT 93597	\N	1973-10-19	2	Mirella	0	1964-11-25	Williamson	Voluptatem ad ea ut.	546.040.8413	Receptionist	2876452	115
17	Apt. 676 6013 Swift Rapid, West Omerland, TN 92190-1904	\N	1983-05-03	2	Beatrice	0	1995-11-30	Kovacek	Nulla exercitationem tempore pariatur.	886-706-2500	Receptionist	3695811	116
18	Apt. 034 3290 Lebsack Neck, Henrietteville, TN 82886-0811	\N	1976-09-10	1	Lillia	0	2004-09-22	Brekke	Quas doloremque quas quo voluptatem.	(670) 977-9161	Sales	3364092	117
19	224 Philip Lakes, West Halport, KS 90183	\N	1987-03-29	3	Jerrie	1	1962-12-24	Abshire	Beatae harum deserunt omnis ut qui fuga quis.	(205) 340-8484	Receptionist	5201268	118
20	Suite 236 217 Price Mountains, Larsonmouth, SD 60177	\N	1963-12-21	3	Aleen	0	1961-09-02	Huels	Non odio incidunt.	(313) 721-6014	Sales	3391412	119
21	Apt. 474 1836 Dixie Village, South Ezekiel, IL 12890-9510	\N	1989-04-12	1	Wilbur	0	1979-09-19	Brakus	Aperiam aut vitae impedit ea et qui delectus.	399-132-6473	Trainer	5807875	120
22	761 Season Avenue, Lake Latonya, MS 49790-5826	\N	1963-12-26	2	Jeffery	1	1991-01-20	O'Hara	Magni assumenda ducimus.	353.159.1836	Trainer	5446317	121
23	Apt. 989 883 Fae Skyway, Lake Tanisha, VA 76554-4496	\N	1981-09-08	3	Janna	1	1959-11-26	Schneider	Doloribus dicta rerum esse magni ab quibusdam.	1-650-532-1477	Sales	3544291	122
24	Apt. 086 30544 Earleen Plaza, Wisokytown, OK 77376-4436	\N	1966-10-02	1	Hiedi	0	1963-09-25	Gorczany	Recusandae delectus dolor.	547.099.7310	Trainer	3491371	123
25	Suite 858 1905 Gerlach Plains, Osinskiton, MA 60951	\N	1998-07-03	1	Cordie	1	1994-05-10	Grant	Ut minus ut aut saepe deserunt temporibus.	933.400.6404	Sales	2498384	124
26	Suite 073 44470 Brendan Road, East Dorseyview, KY 45567	\N	1979-03-01	2	Jewel	0	1976-06-09	Von	Qui et vitae officiis et.	840-772-9305	Trainer	5156983	125
27	15855 Normand Unions, West Karinestad, MO 02475-5994	\N	1971-05-06	2	Tommy	0	1985-11-16	Lakin	Harum porro ullam aut corrupti incidunt commodi.	(551) 571-9491	Trainer	1521918	126
28	Apt. 558 04234 Arletta Flats, Lake Irvinhaven, RI 99008	\N	1989-03-28	1	Kris	1	1987-04-28	Orn	Ut et dolor minima qui corrupti qui autem.	1-538-631-0994	Trainer	2388661	127
29	Apt. 826 79082 Chin Street, West Hilmafort, MS 47185	\N	1987-08-13	1	Brant	1	1969-04-26	Barton	Qui quia eos dolores iure.	626.286.9275	Receptionist	1242245	128
30	Apt. 910 1246 Allene Fork, Shanahanfurt, NY 79559	\N	1982-06-02	3	Erik	0	2003-11-30	Walsh	Vel voluptas ut eos alias.	630.868.9105	Trainer	5567026	129
31	Suite 328 5586 Hansen Lake, New Francis, ND 63716-5879	\N	1959-10-21	1	Andrea	1	1985-09-24	Zulauf	Officiis rerum quis architecto omnis et sed ut.	1-048-809-8103	Sales	2344979	130
\.


--
-- Data for Name: usage_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usage_logs (id, date_time, note, member_membership_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_digest, role) FROM stdin;
1	eliseo.kuvalis@hotmail.com	l3s6589kbqi	3
2	kasie.jakubowski@yahoo.com	fyy4tpry	3
3	brock.hettinger@yahoo.com	bjh2nbj8b	3
4	william.raynor@gmail.com	q858h5oqyv50ht2	3
5	maurice.baumbach@hotmail.com	ylf1ieq4kf24o	3
6	josue.gottlieb@hotmail.com	cqkcriikfcdf	3
7	shirley.stoltenberg@yahoo.com	b1sfbtzshgw	3
8	sebastian.pollich@gmail.com	8f1hn7gl9	3
9	georgette.grady@gmail.com	ih47fcte	3
10	luigi.greenholt@gmail.com	7gjwf2ff2drkl	3
11	arnoldo.mante@hotmail.com	hzr622ua7spr26	3
12	lucien.gleason@yahoo.com	c38w99t6	3
13	reagan.buckridge@hotmail.com	o6k0gdli4xj8ug	3
14	stacie.johns@yahoo.com	u6f6uobpedh7xb	3
15	clyde.schulist@hotmail.com	vf3hjp1ajii9	3
16	chin.kessler@gmail.com	aaqem2s5wtrlce	3
17	laurence.mann@yahoo.com	kostjkpk	3
18	porter.veum@yahoo.com	fhzg5du7o9	3
19	shane.armstrong@gmail.com	8pk6bt0jf	3
20	mabel.rogahn@gmail.com	6ocj0jbirb18	3
21	tarah.gleason@hotmail.com	kd8kgaqcrp	3
22	layla.kris@yahoo.com	ch3wqw2292qp	3
23	kendra.schneider@hotmail.com	qermopbpvjupj	3
24	casey.corwin@yahoo.com	7tsv377oexvdtb	3
25	elden.hermiston@hotmail.com	02vh3in7o	3
26	tracey.kilback@hotmail.com	f3iz4hyh	3
27	adrienne.goyette@yahoo.com	v379uck094kj	3
28	katelyn.moen@yahoo.com	7mlagwkoiae7r6	3
29	oren.wisozk@yahoo.com	4gjvt3t3goflrpv	3
30	joel.gibson@hotmail.com	5440j26sufa8	3
31	patrick.spinka@yahoo.com	ufrwwuiprvtat56	3
32	johnnie.altenwerth@yahoo.com	6yz64t2q925zjk	3
33	julian.hettinger@hotmail.com	at84uf3n	3
34	nila.kuphal@hotmail.com	ztffed1f14u7dh	3
35	nova.romaguera@gmail.com	yr80z8aafb	3
36	rudolf.ullrich@hotmail.com	zmrl35m5g	3
37	willia.rice@yahoo.com	r7h05919	3
38	ayanna.wolff@gmail.com	041nl0fmpwdj7	3
39	mel.oconner@gmail.com	w6qvpi1gkq43s	3
40	orval.ernser@hotmail.com	yerhbb381b4ay	3
41	asa.nolan@gmail.com	cm84ohme5yz	3
42	jessie.cormier@gmail.com	pgynkxd05	3
43	elicia.rath@hotmail.com	uglvk92vjd6	3
44	avelina.little@yahoo.com	choez3ok5exw	3
45	agripina.hettinger@yahoo.com	6am3n0obgt	3
46	adam.frami@hotmail.com	atg3j0yd	3
47	adria.witting@gmail.com	8u8cmi1kby7p	3
48	augustine.borer@hotmail.com	8559zmvvaxxls	3
49	felice.wisoky@gmail.com	4vmiktynp1uvqsv	3
50	verena.mills@yahoo.com	6vrcxqfzvrxycs	3
51	rusty.rippin@yahoo.com	cs7fnws46	3
52	francesco.rodriguez@gmail.com	ar9n4u87gbzl	3
53	tennille.robel@hotmail.com	kdxybbs0	3
54	emmitt.schamberger@yahoo.com	5npt1b9axaq6	3
55	belle.mclaughlin@gmail.com	x0njadv0xonv	3
56	mel.bednar@hotmail.com	52sr4hvzaaqb	3
57	kami.swift@yahoo.com	u8idak8spj	3
58	maris.olson@gmail.com	n0fimgztvbkoq	3
59	dusty.ortiz@hotmail.com	kdmzdmpdq3	3
60	clinton.lemke@hotmail.com	chd8muv2cy	3
61	emil.witting@yahoo.com	0o8gci1l3p	3
62	sunshine.farrell@gmail.com	bg3rjdvvx7rn1b	3
63	brenton.frami@yahoo.com	jzxlv3somuoeum	3
64	virgil.carter@gmail.com	nhzjdlq2t1kg	3
65	marcel.tillman@hotmail.com	8kxd9lx518bk8wq	3
66	julianne.gerlach@yahoo.com	0jnio88p	3
67	trenton.botsford@gmail.com	qiot611e8uwu	3
68	leah.erdman@hotmail.com	g4qfvx3xiy	3
69	dustin.spinka@gmail.com	vudy7f0xksw2	3
70	lillie.kris@yahoo.com	d6a84osouvl	3
71	reed.jacobs@yahoo.com	ke7v8zfnjl048q	3
72	wally.wilkinson@gmail.com	p78e1oa54clm	3
73	toby.brakus@gmail.com	i49lbafh	3
74	kasey.lang@yahoo.com	h5w79mpky	3
75	junko.oconner@hotmail.com	0hjsta0k5dn	3
76	edward.schowalter@hotmail.com	q4tlgumk95m	3
77	damaris.pagac@gmail.com	qq66zohc4	3
78	dorsey.ward@hotmail.com	x9spjb0q21v	3
79	bill.schamberger@gmail.com	xx0brw480s5a	3
80	ricardo.lang@hotmail.com	35io67qk	3
81	hortencia.rempel@yahoo.com	no0bjtw03si4cs6	3
82	marissa.ledner@gmail.com	yxfznpho2huuqkk	3
83	winter.renner@yahoo.com	ccwwky44gtf	3
84	rhett.abbott@yahoo.com	kawwf7n4	3
85	aide.reynolds@gmail.com	37pa81c35nx	3
86	rickey.swaniawski@gmail.com	kwvkh69llw94ze	3
87	stacey.paucek@gmail.com	8u7aml4e24ppk	3
88	maud.satterfield@hotmail.com	4lf7k3h3	3
89	edward.feil@yahoo.com	kc69wa6da	3
90	odette.gleason@hotmail.com	p0t7u8o2itd1e	3
91	alyce.schmitt@gmail.com	cph0nvpqnyuj	3
92	bernie.krajcik@yahoo.com	kuut88o69	3
93	rhett.sanford@gmail.com	fhn2p126bc1c61	3
94	ahmed.cummerata@yahoo.com	0wyytxibvl	3
95	fernanda.macejkovic@hotmail.com	f8gnfbc7gd	3
96	suzan.kuphal@gmail.com	imhi8fuqtkk0l9k	3
97	alisha.bahringer@gmail.com	60zt5ruwovjw	3
98	ed.hagenes@hotmail.com	h442lo3vgxh	3
99	anita.collier@gmail.com	2ihl714xd1	3
100	admin@example.com	123456	1
101	natashia.kris@gmail.com	rete9p8zrawv	2
102	katie.hahn@gmail.com	x1w0rbirn4m	2
103	ty.emard@hotmail.com	ksk9yhlc0ciew	2
104	chris.beatty@yahoo.com	qb5k7r8vopj6v	2
105	kurt.ryan@gmail.com	ho27b5pv9r	2
106	rodrick.langworth@hotmail.com	0ml2ep2o7yy942w	2
107	dante.pagac@gmail.com	j50kh362	2
108	velma.strosin@gmail.com	2jqvf6clqnmj	2
109	inger.pacocha@hotmail.com	fhh685mfax	2
110	lavonia.white@hotmail.com	f0id0dqig4ve6s	2
111	grayce.hettinger@gmail.com	dy95m8gi58	2
112	tora.marquardt@yahoo.com	vdjmbk6e	2
113	concha.green@hotmail.com	x8cvra1i075	2
114	garrett.kassulke@yahoo.com	rv6uhqzuv4wiau	2
115	deangelo.jacobi@hotmail.com	pjs0bj909tyb8s0	2
116	lauryn.mosciski@yahoo.com	xsot4sppj42p	2
117	eldridge.dickinson@gmail.com	c30av8pe	2
118	nigel.anderson@hotmail.com	azegqs9rt0	2
119	brenton.oreilly@gmail.com	9gvegmjoysge1mk	2
120	charlyn.lebsack@gmail.com	clnhmuk6aoti29	2
121	miyoko.daugherty@gmail.com	9i86fv5fzvrd	2
122	amberly.wilderman@yahoo.com	65i6si3v	2
123	sondra.langosh@hotmail.com	ktmmg6f7	2
124	malcom.halvorson@gmail.com	wksuk273rejx	2
125	randi.bechtelar@gmail.com	noccc7jfga	2
126	edwardo.huel@yahoo.com	ulagsb7mzv	2
127	renda.green@gmail.com	zl6mjx7fmt	2
128	glenn.hickle@hotmail.com	k3dx50r9bwkmnt	2
129	bradford.kuhic@hotmail.com	llzfjl3zg7x	2
130	evan.hartmann@yahoo.com	ddt7o87a8lxo	2
\.


--
-- Name: equipments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipments_id_seq', 40, true);


--
-- Name: feedbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feedbacks_id_seq', 100, true);


--
-- Name: gyms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gyms_id_seq', 10, true);


--
-- Name: member_memberships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.member_memberships_id_seq', 100, true);


--
-- Name: members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.members_id_seq', 99, true);


--
-- Name: membership_activity_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membership_activity_logs_id_seq', 1, false);


--
-- Name: memberships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.memberships_id_seq', 10, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: replies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.replies_id_seq', 1, false);


--
-- Name: staffs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.staffs_id_seq', 31, true);


--
-- Name: usage_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usage_logs_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 130, true);


--
-- Name: equipments equipments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipments
    ADD CONSTRAINT equipments_pkey PRIMARY KEY (id);


--
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- Name: gym_equipments gym_equipments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_equipments
    ADD CONSTRAINT gym_equipments_pkey PRIMARY KEY (gym_id, equipment_id);


--
-- Name: gyms gyms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gyms
    ADD CONSTRAINT gyms_pkey PRIMARY KEY (id);


--
-- Name: member_memberships member_memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_memberships
    ADD CONSTRAINT member_memberships_pkey PRIMARY KEY (id);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: membership_activity_logs membership_activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_activity_logs
    ADD CONSTRAINT membership_activity_logs_pkey PRIMARY KEY (id);


--
-- Name: memberships memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: replies replies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_pkey PRIMARY KEY (id);


--
-- Name: staffs staffs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staffs
    ADD CONSTRAINT staffs_pkey PRIMARY KEY (id);


--
-- Name: staffs uk_22xf2k8uqtauv6jjon7g9e069; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staffs
    ADD CONSTRAINT uk_22xf2k8uqtauv6jjon7g9e069 UNIQUE (user_id);


--
-- Name: users uk_6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: members uk_da61ga2jecphdliwvkqyt6sw2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT uk_da61ga2jecphdliwvkqyt6sw2 UNIQUE (user_id);


--
-- Name: membership_activity_logs uk_gj2yfnr0tqq5odwvsbcr9c6qu; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_activity_logs
    ADD CONSTRAINT uk_gj2yfnr0tqq5odwvsbcr9c6qu UNIQUE (payment_id);


--
-- Name: usage_logs usage_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usage_logs
    ADD CONSTRAINT usage_logs_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: usage_logs fk1mspfrd9e0vtnced3h2uf6q8x; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usage_logs
    ADD CONSTRAINT fk1mspfrd9e0vtnced3h2uf6q8x FOREIGN KEY (member_membership_id) REFERENCES public.member_memberships(id);


--
-- Name: member_memberships fk2y5eflnf9q5fwgf95gpvjl6pv; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_memberships
    ADD CONSTRAINT fk2y5eflnf9q5fwgf95gpvjl6pv FOREIGN KEY (member_id) REFERENCES public.members(id);


--
-- Name: feedbacks fk4b4fcmm7e993wry6oenaxaeqt; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT fk4b4fcmm7e993wry6oenaxaeqt FOREIGN KEY (member_id) REFERENCES public.members(id);


--
-- Name: replies fk6kna1v85xxidu1voc102bexrc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT fk6kna1v85xxidu1voc102bexrc FOREIGN KEY (feedback_id) REFERENCES public.feedbacks(id);


--
-- Name: member_memberships fk6lige5bg15cdlmjaphypw2jeu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member_memberships
    ADD CONSTRAINT fk6lige5bg15cdlmjaphypw2jeu FOREIGN KEY (membership_id) REFERENCES public.memberships(id);


--
-- Name: membership_activity_logs fk9sy1asax93ikdu6wa8urhyxg5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_activity_logs
    ADD CONSTRAINT fk9sy1asax93ikdu6wa8urhyxg5 FOREIGN KEY (member_membership_id) REFERENCES public.member_memberships(id);


--
-- Name: staffs fkamgwfug55gkfkjidp88wyaj37; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staffs
    ADD CONSTRAINT fkamgwfug55gkfkjidp88wyaj37 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: gym_equipments fkfepwkibhnlcdo9ou94akrhibd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_equipments
    ADD CONSTRAINT fkfepwkibhnlcdo9ou94akrhibd FOREIGN KEY (gym_id) REFERENCES public.gyms(id);


--
-- Name: feedbacks fkh7l2243vft6m4oqqsam1p06u3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT fkh7l2243vft6m4oqqsam1p06u3 FOREIGN KEY (gym_id) REFERENCES public.gyms(id);


--
-- Name: gym_equipments fki92mgnnpqmv0ck8hcl0c9tuu5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_equipments
    ADD CONSTRAINT fki92mgnnpqmv0ck8hcl0c9tuu5 FOREIGN KEY (equipment_id) REFERENCES public.equipments(id);


--
-- Name: replies fkka8ngwj654ss1lclm0uhj4ifj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT fkka8ngwj654ss1lclm0uhj4ifj FOREIGN KEY (posted_by) REFERENCES public.staffs(id);


--
-- Name: members fkpj3n6wh5muoeakc485whgs3x5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT fkpj3n6wh5muoeakc485whgs3x5 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: memberships fkqh2rfrtcv3otij2iryqk23p1p; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT fkqh2rfrtcv3otij2iryqk23p1p FOREIGN KEY (created_by) REFERENCES public.staffs(id);


--
-- Name: membership_activity_logs fkswnkewcnjiq9anqn9o0j0l3so; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership_activity_logs
    ADD CONSTRAINT fkswnkewcnjiq9anqn9o0j0l3so FOREIGN KEY (payment_id) REFERENCES public.payments(id);


--
-- PostgreSQL database dump complete
--

