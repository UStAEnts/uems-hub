--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.11
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-4)

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

-- Name: xiomi_cas; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE cas;
ALTER DATABASE xiomi_cas OWNER TO cas;

\connect xiomi_cas

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

--
-- Name: enum_ResetDataRequests_type; Type: TYPE; Schema: public; Owner: cas
--

CREATE TYPE public."enum_ResetDataRequests_type" AS ENUM (
    'password',
    'user_pin',
    'email',
    'security_question'
);


ALTER TYPE public."enum_ResetDataRequests_type" OWNER TO cas;

--
-- Name: enum_Users_lockedStatus; Type: TYPE; Schema: public; Owner: cas
--

CREATE TYPE public."enum_Users_lockedStatus" AS ENUM (
    'accessible',
    'auth',
    'admin',
    'registration',
    'two_factor_setup'
);


ALTER TYPE public."enum_Users_lockedStatus" OWNER TO cas;

SET default_tablespace = '';

--
-- Name: IPLockouts; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."IPLockouts" (
    id integer NOT NULL,
    ip text NOT NULL,
    "startTime" timestamp with time zone DEFAULT now() NOT NULL,
    duration integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."IPLockouts" OWNER TO cas;

--
-- Name: IPLockouts_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."IPLockouts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."IPLockouts_id_seq" OWNER TO cas;

--
-- Name: IPLockouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."IPLockouts_id_seq" OWNED BY public."IPLockouts".id;


--
-- Name: JWTTokens; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."JWTTokens" (
    id integer NOT NULL,
    "tokenID" text NOT NULL,
    revoked boolean DEFAULT false NOT NULL,
    assigned timestamp with time zone DEFAULT now() NOT NULL,
    "clientIdentifier" text NOT NULL,
    "userID" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."JWTTokens" OWNER TO cas;

--
-- Name: JWTTokens_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."JWTTokens_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."JWTTokens_id_seq" OWNER TO cas;

--
-- Name: JWTTokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."JWTTokens_id_seq" OWNED BY public."JWTTokens".id;


--
-- Name: Lockouts; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."Lockouts" (
    id integer NOT NULL,
    "userID" integer NOT NULL,
    duration integer NOT NULL,
    reason text,
    "startTime" timestamp with time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Lockouts" OWNER TO cas;

--
-- Name: Lockouts_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."Lockouts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Lockouts_id_seq" OWNER TO cas;

--
-- Name: Lockouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."Lockouts_id_seq" OWNED BY public."Lockouts".id;


--
-- Name: LogAuths; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."LogAuths" (
    id integer NOT NULL,
    source text NOT NULL,
    detail text NOT NULL,
    logged timestamp with time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."LogAuths" OWNER TO cas;

--
-- Name: LogAuths_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."LogAuths_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LogAuths_id_seq" OWNER TO cas;

--
-- Name: LogAuths_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."LogAuths_id_seq" OWNED BY public."LogAuths".id;


--
-- Name: Logins; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."Logins" (
    id integer NOT NULL,
    "userID" integer NOT NULL,
    "ipAddress" text NOT NULL,
    logged timestamp with time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Logins" OWNER TO cas;

--
-- Name: Logins_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."Logins_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Logins_id_seq" OWNER TO cas;

--
-- Name: Logins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."Logins_id_seq" OWNED BY public."Logins".id;


--
-- Name: PermissionGroupInheritances; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."PermissionGroupInheritances" (
    id integer NOT NULL,
    "targetGroupID" integer NOT NULL,
    "inheritsFromID" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PermissionGroupInheritances" OWNER TO cas;

--
-- Name: PermissionGroupInheritances_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."PermissionGroupInheritances_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PermissionGroupInheritances_id_seq" OWNER TO cas;

--
-- Name: PermissionGroupInheritances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."PermissionGroupInheritances_id_seq" OWNED BY public."PermissionGroupInheritances".id;


--
-- Name: PermissionGroupMappings; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."PermissionGroupMappings" (
    id integer NOT NULL,
    "permissionID" integer NOT NULL,
    "permissionGroupID" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PermissionGroupMappings" OWNER TO cas;

--
-- Name: PermissionGroupMappings_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."PermissionGroupMappings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PermissionGroupMappings_id_seq" OWNER TO cas;

--
-- Name: PermissionGroupMappings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."PermissionGroupMappings_id_seq" OWNED BY public."PermissionGroupMappings".id;


--
-- Name: PermissionGroupUserMappings; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."PermissionGroupUserMappings" (
    id integer NOT NULL,
    "permissionGroupID" integer NOT NULL,
    "grantedByUserID" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PermissionGroupUserMappings" OWNER TO cas;

--
-- Name: PermissionGroupUserMappings_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."PermissionGroupUserMappings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PermissionGroupUserMappings_id_seq" OWNER TO cas;

--
-- Name: PermissionGroupUserMappings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."PermissionGroupUserMappings_id_seq" OWNED BY public."PermissionGroupUserMappings".id;


--
-- Name: PermissionGroups; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."PermissionGroups" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    hash text DEFAULT '[nohash]'::text
);


ALTER TABLE public."PermissionGroups" OWNER TO cas;

--
-- Name: PermissionGroups_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."PermissionGroups_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PermissionGroups_id_seq" OWNER TO cas;

--
-- Name: PermissionGroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."PermissionGroups_id_seq" OWNED BY public."PermissionGroups".id;


--
-- Name: PermissionUsersMappings; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."PermissionUsersMappings" (
    id integer NOT NULL,
    "permissionID" integer NOT NULL,
    "grantedByUserID" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PermissionUsersMappings" OWNER TO cas;

--
-- Name: PermissionUsersMappings_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."PermissionUsersMappings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PermissionUsersMappings_id_seq" OWNER TO cas;

--
-- Name: PermissionUsersMappings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."PermissionUsersMappings_id_seq" OWNED BY public."PermissionUsersMappings".id;


--
-- Name: Permissions; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."Permissions" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    hash text DEFAULT '[nohash]'::text
);


ALTER TABLE public."Permissions" OWNER TO cas;

--
-- Name: Permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."Permissions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Permissions_id_seq" OWNER TO cas;

--
-- Name: Permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."Permissions_id_seq" OWNED BY public."Permissions".id;


--
-- Name: RegistrationTokens; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."RegistrationTokens" (
    id integer NOT NULL,
    requested timestamp with time zone DEFAULT now() NOT NULL,
    "userID" integer NOT NULL,
    "userToken" text NOT NULL,
    "resetToken" text NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE public."RegistrationTokens" OWNER TO cas;

--
-- Name: RegistrationTokens_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."RegistrationTokens_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RegistrationTokens_id_seq" OWNER TO cas;

--
-- Name: RegistrationTokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."RegistrationTokens_id_seq" OWNED BY public."RegistrationTokens".id;


--
-- Name: ResetDataRequests; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."ResetDataRequests" (
    id integer NOT NULL,
    requested timestamp with time zone DEFAULT now() NOT NULL,
    "userID" integer NOT NULL,
    "userToken" text NOT NULL,
    "resetToken" text NOT NULL,
    type public."enum_ResetDataRequests_type" NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    "additionalData" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ResetDataRequests" OWNER TO cas;

--
-- Name: ResetDataRequests_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."ResetDataRequests_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ResetDataRequests_id_seq" OWNER TO cas;

--
-- Name: ResetDataRequests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."ResetDataRequests_id_seq" OWNED BY public."ResetDataRequests".id;


--
-- Name: SecurityQuestionMappings; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."SecurityQuestionMappings" (
    id integer NOT NULL,
    "userID" integer NOT NULL,
    "securityQuestionID" integer NOT NULL,
    "additionalData" text,
    "answerHash" text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."SecurityQuestionMappings" OWNER TO cas;

--
-- Name: SecurityQuestionMappings_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."SecurityQuestionMappings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SecurityQuestionMappings_id_seq" OWNER TO cas;

--
-- Name: SecurityQuestionMappings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."SecurityQuestionMappings_id_seq" OWNED BY public."SecurityQuestionMappings".id;


--
-- Name: SecurityQuestions; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."SecurityQuestions" (
    id integer NOT NULL,
    question text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."SecurityQuestions" OWNER TO cas;

--
-- Name: SecurityQuestions_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."SecurityQuestions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SecurityQuestions_id_seq" OWNER TO cas;

--
-- Name: SecurityQuestions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."SecurityQuestions_id_seq" OWNED BY public."SecurityQuestions".id;


--
-- Name: SelfGrantAuthorizationModels; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."SelfGrantAuthorizationModels" (
    id integer NOT NULL,
    "groupID" integer NOT NULL,
    "serviceName" character varying(255) NOT NULL,
    "serviceDescription" character varying(255) NOT NULL,
    "serviceIconURL" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."SelfGrantAuthorizationModels" OWNER TO cas;

--
-- Name: SelfGrantAuthorizationModels_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."SelfGrantAuthorizationModels_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SelfGrantAuthorizationModels_id_seq" OWNER TO cas;

--
-- Name: SelfGrantAuthorizationModels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."SelfGrantAuthorizationModels_id_seq" OWNED BY public."SelfGrantAuthorizationModels".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO cas;

--
-- Name: TwoFactorConfigurations; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."TwoFactorConfigurations" (
    id integer NOT NULL,
    "userID" integer NOT NULL,
    secret text NOT NULL,
    "savedDevices" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "emailOnFail" boolean DEFAULT true
);


ALTER TABLE public."TwoFactorConfigurations" OWNER TO cas;

--
-- Name: TwoFactorConfigurations_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."TwoFactorConfigurations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TwoFactorConfigurations_id_seq" OWNER TO cas;

--
-- Name: TwoFactorConfigurations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."TwoFactorConfigurations_id_seq" OWNED BY public."TwoFactorConfigurations".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: cas
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    full_name text NOT NULL,
    hash text NOT NULL,
    "hashVersion" integer NOT NULL,
    "pinHash" text NOT NULL,
    "pinHashVersion" integer NOT NULL,
    "rotationRequired" boolean DEFAULT false NOT NULL,
    "lastRotation" timestamp with time zone,
    "lockedStatus" public."enum_Users_lockedStatus",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    registered boolean
);


ALTER TABLE public."Users" OWNER TO cas;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: cas
--

CREATE SEQUENCE public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO cas;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cas
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: IPLockouts id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."IPLockouts" ALTER COLUMN id SET DEFAULT nextval('public."IPLockouts_id_seq"'::regclass);


--
-- Name: JWTTokens id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."JWTTokens" ALTER COLUMN id SET DEFAULT nextval('public."JWTTokens_id_seq"'::regclass);


--
-- Name: Lockouts id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Lockouts" ALTER COLUMN id SET DEFAULT nextval('public."Lockouts_id_seq"'::regclass);


--
-- Name: LogAuths id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."LogAuths" ALTER COLUMN id SET DEFAULT nextval('public."LogAuths_id_seq"'::regclass);


--
-- Name: Logins id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Logins" ALTER COLUMN id SET DEFAULT nextval('public."Logins_id_seq"'::regclass);


--
-- Name: PermissionGroupInheritances id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupInheritances" ALTER COLUMN id SET DEFAULT nextval('public."PermissionGroupInheritances_id_seq"'::regclass);


--
-- Name: PermissionGroupMappings id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupMappings" ALTER COLUMN id SET DEFAULT nextval('public."PermissionGroupMappings_id_seq"'::regclass);


--
-- Name: PermissionGroupUserMappings id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupUserMappings" ALTER COLUMN id SET DEFAULT nextval('public."PermissionGroupUserMappings_id_seq"'::regclass);


--
-- Name: PermissionGroups id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroups" ALTER COLUMN id SET DEFAULT nextval('public."PermissionGroups_id_seq"'::regclass);


--
-- Name: PermissionUsersMappings id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionUsersMappings" ALTER COLUMN id SET DEFAULT nextval('public."PermissionUsersMappings_id_seq"'::regclass);


--
-- Name: Permissions id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Permissions" ALTER COLUMN id SET DEFAULT nextval('public."Permissions_id_seq"'::regclass);


--
-- Name: RegistrationTokens id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."RegistrationTokens" ALTER COLUMN id SET DEFAULT nextval('public."RegistrationTokens_id_seq"'::regclass);


--
-- Name: ResetDataRequests id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."ResetDataRequests" ALTER COLUMN id SET DEFAULT nextval('public."ResetDataRequests_id_seq"'::regclass);


--
-- Name: SecurityQuestionMappings id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SecurityQuestionMappings" ALTER COLUMN id SET DEFAULT nextval('public."SecurityQuestionMappings_id_seq"'::regclass);


--
-- Name: SecurityQuestions id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SecurityQuestions" ALTER COLUMN id SET DEFAULT nextval('public."SecurityQuestions_id_seq"'::regclass);


--
-- Name: SelfGrantAuthorizationModels id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SelfGrantAuthorizationModels" ALTER COLUMN id SET DEFAULT nextval('public."SelfGrantAuthorizationModels_id_seq"'::regclass);


--
-- Name: TwoFactorConfigurations id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."TwoFactorConfigurations" ALTER COLUMN id SET DEFAULT nextval('public."TwoFactorConfigurations_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: IPLockouts; Type: TABLE DATA; Schema: public; Owner: cas
--



--
-- Data for Name: JWTTokens; Type: TABLE DATA; Schema: public; Owner: cas
--


--
-- Data for Name: Lockouts; Type: TABLE DATA; Schema: public; Owner: cas
--



--
-- Data for Name: LogAuths; Type: TABLE DATA; Schema: public; Owner: cas
--


--
-- Data for Name: Logins; Type: TABLE DATA; Schema: public; Owner: cas
--


--
-- Data for Name: PermissionGroupInheritances; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."PermissionGroupInheritances" (id, "targetGroupID", "inheritsFromID", "createdAt", "updatedAt") VALUES (53, 1, 3, '2020-05-30 15:48:54.293+00', '2020-05-30 15:48:54.293+00');
INSERT INTO public."PermissionGroupInheritances" (id, "targetGroupID", "inheritsFromID", "createdAt", "updatedAt") VALUES (54, 3, 2, '2020-05-30 15:48:54.294+00', '2020-05-30 15:48:54.294+00');
INSERT INTO public."PermissionGroupInheritances" (id, "targetGroupID", "inheritsFromID", "createdAt", "updatedAt") VALUES (52, 1, 2, '2020-05-28 20:56:56.635+00', '2020-05-28 20:56:56.635+00');


--
-- Data for Name: PermissionGroupMappings; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."PermissionGroupMappings" (id, "permissionID", "permissionGroupID", "createdAt", "updatedAt") VALUES (1, 5, 1, '2020-05-21 01:16:43.989+00', '2020-05-21 01:16:43.989+00');
INSERT INTO public."PermissionGroupMappings" (id, "permissionID", "permissionGroupID", "createdAt", "updatedAt") VALUES (2, 6, 1, '2020-05-21 01:16:43.989+00', '2020-05-21 01:16:43.989+00');
INSERT INTO public."PermissionGroupMappings" (id, "permissionID", "permissionGroupID", "createdAt", "updatedAt") VALUES (3, 1, 2, '2020-05-21 01:16:43.989+00', '2020-05-21 01:16:43.989+00');
INSERT INTO public."PermissionGroupMappings" (id, "permissionID", "permissionGroupID", "createdAt", "updatedAt") VALUES (4, 2, 2, '2020-05-21 01:16:43.989+00', '2020-05-21 01:16:43.989+00');
INSERT INTO public."PermissionGroupMappings" (id, "permissionID", "permissionGroupID", "createdAt", "updatedAt") VALUES (5, 3, 2, '2020-05-21 01:16:43.989+00', '2020-05-21 01:16:43.989+00');
INSERT INTO public."PermissionGroupMappings" (id, "permissionID", "permissionGroupID", "createdAt", "updatedAt") VALUES (6, 4, 2, '2020-05-21 01:16:43.989+00', '2020-05-21 01:16:43.989+00');
INSERT INTO public."PermissionGroupMappings" (id, "permissionID", "permissionGroupID", "createdAt", "updatedAt") VALUES (7, 7, 3, '2020-05-30 15:48:54.712+00', '2020-05-30 15:48:54.712+00');


--
-- Data for Name: PermissionGroupUserMappings; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."PermissionGroupUserMappings" (id, "permissionGroupID", "grantedByUserID", "createdAt", "updatedAt") VALUES (1, 1, 7, '2020-05-21 20:14:43.568+00', '2020-05-21 20:14:48.029+00');
INSERT INTO public."PermissionGroupUserMappings" (id, "permissionGroupID", "grantedByUserID", "createdAt", "updatedAt") VALUES (2, 2, 7, '2020-05-21 20:09:17.11+00', '2020-05-21 20:09:17.11+00');


--
-- Data for Name: PermissionGroups; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."PermissionGroups" (id, name, description, "createdAt", "updatedAt", hash) VALUES (1, 'default', 'The default user permission group allowing basic permissions across the system', '2020-05-21 01:08:47.058+00', '2020-05-21 01:08:47.058+00', '37a8eec1ce19687d132fe29051dca629d164e2c4958ba141d5f4133a33f0688f');
INSERT INTO public."PermissionGroups" (id, name, description, "createdAt", "updatedAt", hash) VALUES (3, 'staff', 'For all staff members, allows access to basic utilities like the email configuration system', '2020-05-30 15:46:58.176+00', '2020-05-30 15:46:58.176+00', '1562206543da764123c21bd524674f0a8aaf49c8a89744c97352fe677f7e4006');
INSERT INTO public."PermissionGroups" (id, name, description, "createdAt", "updatedAt", hash) VALUES (2, 'admin', 'Permissions held by the admin users, allows all functions on the site', '2020-05-21 01:08:47.059+00', '2020-05-21 01:08:47.059+00', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');


--
-- Data for Name: PermissionUsersMappings; Type: TABLE DATA; Schema: public; Owner: cas
--



--
-- Data for Name: Permissions; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."Permissions" (id, name, description, "createdAt", "updatedAt", hash) VALUES (1, 'casvii.permission.grant.other', 'Allows the user to grant permissions to other users', '2020-05-21 01:08:46.898+00', '2020-05-21 01:08:46.898+00', 'adf7118dd623c23f45a368f114a25dd2802a8aec86ead2d56ccc99630d6062c0');
INSERT INTO public."Permissions" (id, name, description, "createdAt", "updatedAt", hash) VALUES (2, 'casvii.permission.grant.self', 'Allows the user to grant permissions to themselves', '2020-05-21 01:08:46.899+00', '2020-05-21 01:08:46.899+00', 'd6673cd3c70f92dda4e6968d4f34b5b17bb3dd2282e7e1149513caf0888e3c34');
INSERT INTO public."Permissions" (id, name, description, "createdAt", "updatedAt", hash) VALUES (3, 'casvii.permission.ungrant.other', 'Allows the user to revoke permissions from other users', '2020-05-21 01:08:46.899+00', '2020-05-21 01:08:46.899+00', 'e010a30428c4df8c7d497c4899546b7928dfbe6568da7b940a7c24839800d694');
INSERT INTO public."Permissions" (id, name, description, "createdAt", "updatedAt", hash) VALUES (4, 'casvii.permission.ungrant.self', 'Allows the user to revoke permissions from themselves', '2020-05-21 01:08:46.899+00', '2020-05-21 01:08:46.899+00', 'b658a8f0b821f1c86f421aa9072e00357464f58eacdf19b9eda13737c408c0d4');
INSERT INTO public."Permissions" (id, name, description, "createdAt", "updatedAt", hash) VALUES (5, 'casvii.permission.self-grant', 'Allows the user to use self grant authorization requests (disables logging into new microsites if not granted)', '2020-05-21 01:08:46.899+00', '2020-05-21 01:08:46.899+00', 'c86e320db9fddde36944c2d8a96c1db24c1002bb5bd3eedc7b755c1b8aecc720');
INSERT INTO public."Permissions" (id, name, description, "createdAt", "updatedAt", hash) VALUES (6, 'casvii.self-serve.password', 'Allows the user to change their own password', '2020-05-21 01:08:46.899+00', '2020-05-21 01:08:46.899+00', '3e86f78720295859f3682eb57a01eb69045f6de2c4cdd58bdcf8ba99d5ded2c7');
INSERT INTO public."Permissions" (id, name, description, "createdAt", "updatedAt", hash) VALUES (7, 'casvii.has-email', 'Allows the user to see the staff email configuration page', '2020-05-30 15:46:58.099+00', '2020-05-30 15:46:58.099+00', 'cfc0a4e6fb055df11dce7918867325c9cf4814ece979dc3afd551130eab945a8');


--
-- Data for Name: RegistrationTokens; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."RegistrationTokens" (id, requested, "userID", "userToken", "resetToken", completed, "createdAt", "updatedAt") VALUES (3, '2020-05-21 18:48:06.795031+00', 7, '9a878781-e55e-40b4-9994-5cd8acf1e211', '9370c85d-bd6c-4286-99d5-9cf46bcc04d0', true, '2020-05-21 18:48:06.511+00', '2020-05-21 18:48:40.095+00');


--
-- Data for Name: ResetDataRequests; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."ResetDataRequests" (id, requested, "userID", "userToken", "resetToken", type, completed, "additionalData", "createdAt", "updatedAt") VALUES (6, '2020-05-21 19:58:43.822976+00', 7, 'ed6751de-2ba1-45ca-af82-70ed684486b2', 'afe2d97b-b1a3-4256-a0df-b8c83563ed70', 'password', true, NULL, '2020-05-21 19:58:43.554+00', '2020-05-21 20:04:01.275+00');


--
-- Data for Name: SecurityQuestionMappings; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."SecurityQuestionMappings" (id, "userID", "securityQuestionID", "additionalData", "answerHash", "createdAt", "updatedAt") VALUES (5, 7, 9, NULL, '0:$argon2id$v=19$m=4096,t=3,p=1$cRSrxAIebhEy0V4oTexjeA$ouiT+mHVZ2TEo3qLGCh/flgedn4M2I8HudPhpkNnulE', '2020-05-21 18:48:06.584+00', '2020-05-21 18:48:06.584+00');
INSERT INTO public."SecurityQuestionMappings" (id, "userID", "securityQuestionID", "additionalData", "answerHash", "createdAt", "updatedAt") VALUES (6, 7, 1, NULL, '0:$argon2id$v=19$m=4096,t=3,p=1$ssJRyFWlaJ71cQHOHwbJgQ$VsF8mTk/u4qPQHCQhZ+AMTVLJMpAqC9wiLZ7TgGoMAU', '2020-05-21 18:48:06.593+00', '2020-05-21 18:48:06.593+00');
INSERT INTO public."SecurityQuestionMappings" (id, "userID", "securityQuestionID", "additionalData", "answerHash", "createdAt", "updatedAt") VALUES (7, 7, 5, NULL, '0:$argon2id$v=19$m=4096,t=3,p=1$bevHWCtER2R72ar3ekDlvQ$l+9NZEiZGfD1lvKMsuPzMmXoeGNGUkVT4Asr7WKFka4', '2020-05-21 18:48:06.594+00', '2020-05-21 18:48:06.594+00');


--
-- Data for Name: SecurityQuestions; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (1, 'What was the house number and street name you lived in as a child?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (2, 'What were the last four digits of your childhood telephone number?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (3, 'What primary school did you attend?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (4, 'In what town or city was your first full time job?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (5, 'In what town or city did you meet your spouse/partner?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (6, 'What is the middle name of your oldest child?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (7, 'What are the last five digits of your driver''s licence number?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (8, 'What is your grandmother''s (on your mother''s side) maiden name?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (9, 'What is your spouse or partner''s mother''s maiden name?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (10, 'In what town or city did your mother and father meet?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (11, 'What time of the day were you born? (hh:mm)', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (12, 'What time of the day was your first child born? (hh:mm)', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (13, 'What is the first name of the person you first kissed?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');
INSERT INTO public."SecurityQuestions" (id, question, "createdAt", "updatedAt") VALUES (14, 'What is the last name of the teacher who gave you your first failing grade?', '2020-01-18 23:14:53.705819+00', '2020-01-18 23:14:53.705819+00');


--
-- Data for Name: SelfGrantAuthorizationModels; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."SelfGrantAuthorizationModels" (id, "groupID", "serviceName", "serviceDescription", "serviceIconURL", "createdAt", "updatedAt") VALUES (1, 2, 'Admin', 'All Admin utilites of CASCore', NULL, '2020-05-21 21:05:37.742+00', '2020-05-21 21:05:42.102+00');


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."SequelizeMeta" (name) VALUES ('00-add-lock-status.migration.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('01-add-registered.migration.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('02-add-table-registration-token.migration.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('03-add-hash-to-permission.migration.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('04-add-hash-to-permission-group.migration.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('05-add-email-to-two-factor-configuration.migration.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('06-add-createdat-to-registration-tokens.migration.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('07-add-table-jwttokens.migration.js');


--
-- Data for Name: TwoFactorConfigurations; Type: TABLE DATA; Schema: public; Owner: cas
--



--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: cas
--

INSERT INTO public."Users" (id, username, email, full_name, hash, "hashVersion", "pinHash", "pinHashVersion", "rotationRequired", "lastRotation", "lockedStatus", "createdAt", "updatedAt", registered) VALUES (7, 'test-floe', 'admin@xiomi.org', 'Test Flow', '$argon2id$v=19$m=4096,t=3,p=1$AyW/CexaBwBe5fKKalh+PQ$6GEJE9j/eWk20LKWzUCGmdkjSDDk4AGIIhZfXyWjNRg', 0, '$argon2id$v=19$m=4096,t=3,p=1$LI4pENHonlCU9ggV3AcSXg$e7IKHr4lamvrpgUnsgr5p40TJdncy+OLWqK0T+wTWGw', 0, false, '2020-05-21 20:04:01.465+00', 'accessible', '2020-05-21 18:48:06.226+00', '2020-05-21 20:04:01.465+00', true);


--
-- Name: IPLockouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."IPLockouts_id_seq"', 1, false);


--
-- Name: JWTTokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."JWTTokens_id_seq"', 2, true);


--
-- Name: Lockouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."Lockouts_id_seq"', 1, false);


--
-- Name: LogAuths_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."LogAuths_id_seq"', 225, true);


--
-- Name: Logins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."Logins_id_seq"', 49, true);


--
-- Name: PermissionGroupInheritances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."PermissionGroupInheritances_id_seq"', 54, true);


--
-- Name: PermissionGroupMappings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."PermissionGroupMappings_id_seq"', 7, true);


--
-- Name: PermissionGroupUserMappings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."PermissionGroupUserMappings_id_seq"', 7, true);


--
-- Name: PermissionGroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."PermissionGroups_id_seq"', 3, true);


--
-- Name: PermissionUsersMappings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."PermissionUsersMappings_id_seq"', 1, false);


--
-- Name: Permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."Permissions_id_seq"', 7, true);


--
-- Name: RegistrationTokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."RegistrationTokens_id_seq"', 5, true);


--
-- Name: ResetDataRequests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."ResetDataRequests_id_seq"', 6, true);


--
-- Name: SecurityQuestionMappings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."SecurityQuestionMappings_id_seq"', 13, true);


--
-- Name: SecurityQuestions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."SecurityQuestions_id_seq"', 14, true);


--
-- Name: SelfGrantAuthorizationModels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."SelfGrantAuthorizationModels_id_seq"', 1, true);


--
-- Name: TwoFactorConfigurations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."TwoFactorConfigurations_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cas
--

SELECT pg_catalog.setval('public."Users_id_seq"', 9, true);


--
-- Name: IPLockouts IPLockouts_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."IPLockouts"
    ADD CONSTRAINT "IPLockouts_pkey" PRIMARY KEY (id);


--
-- Name: JWTTokens JWTTokens_pk; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."JWTTokens"
    ADD CONSTRAINT "JWTTokens_pk" PRIMARY KEY (id);


--
-- Name: Lockouts Lockouts_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Lockouts"
    ADD CONSTRAINT "Lockouts_pkey" PRIMARY KEY (id);


--
-- Name: LogAuths LogAuths_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."LogAuths"
    ADD CONSTRAINT "LogAuths_pkey" PRIMARY KEY (id);


--
-- Name: Logins Logins_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Logins"
    ADD CONSTRAINT "Logins_pkey" PRIMARY KEY (id);


--
-- Name: PermissionGroupInheritances PermissionGroupInheritances_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupInheritances"
    ADD CONSTRAINT "PermissionGroupInheritances_pkey" PRIMARY KEY (id);


--
-- Name: PermissionGroupMappings PermissionGroupMappings_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupMappings"
    ADD CONSTRAINT "PermissionGroupMappings_pkey" PRIMARY KEY (id);


--
-- Name: PermissionGroupUserMappings PermissionGroupUserMappings_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupUserMappings"
    ADD CONSTRAINT "PermissionGroupUserMappings_pkey" PRIMARY KEY (id);


--
-- Name: PermissionGroups PermissionGroups_name_key; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroups"
    ADD CONSTRAINT "PermissionGroups_name_key" UNIQUE (name);


--
-- Name: PermissionGroups PermissionGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroups"
    ADD CONSTRAINT "PermissionGroups_pkey" PRIMARY KEY (id);


--
-- Name: PermissionUsersMappings PermissionUsersMappings_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionUsersMappings"
    ADD CONSTRAINT "PermissionUsersMappings_pkey" PRIMARY KEY (id);


--
-- Name: Permissions Permissions_name_key; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_name_key" UNIQUE (name);


--
-- Name: Permissions Permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Permissions"
    ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY (id);


--
-- Name: RegistrationTokens RegistrationTokens_pk; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."RegistrationTokens"
    ADD CONSTRAINT "RegistrationTokens_pk" PRIMARY KEY (id);


--
-- Name: ResetDataRequests ResetDataRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."ResetDataRequests"
    ADD CONSTRAINT "ResetDataRequests_pkey" PRIMARY KEY (id);


--
-- Name: SecurityQuestionMappings SecurityQuestionMappings_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SecurityQuestionMappings"
    ADD CONSTRAINT "SecurityQuestionMappings_pkey" PRIMARY KEY (id);


--
-- Name: SecurityQuestions SecurityQuestions_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SecurityQuestions"
    ADD CONSTRAINT "SecurityQuestions_pkey" PRIMARY KEY (id);


--
-- Name: SelfGrantAuthorizationModels SelfGrantAuthorizationModels_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SelfGrantAuthorizationModels"
    ADD CONSTRAINT "SelfGrantAuthorizationModels_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: TwoFactorConfigurations TwoFactorConfigurations_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."TwoFactorConfigurations"
    ADD CONSTRAINT "TwoFactorConfigurations_pkey" PRIMARY KEY (id);


--
-- Name: TwoFactorConfigurations TwoFactorConfigurations_userID_key; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."TwoFactorConfigurations"
    ADD CONSTRAINT "TwoFactorConfigurations_userID_key" UNIQUE ("userID");


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: JWTTokens_id_uindex; Type: INDEX; Schema: public; Owner: cas
--

CREATE UNIQUE INDEX "JWTTokens_id_uindex" ON public."JWTTokens" USING btree (id);


--
-- Name: RegistrationTokens_id_uindex; Type: INDEX; Schema: public; Owner: cas
--

CREATE UNIQUE INDEX "RegistrationTokens_id_uindex" ON public."RegistrationTokens" USING btree (id);


--
-- Name: Lockouts Lockouts_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Lockouts"
    ADD CONSTRAINT "Lockouts_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: Logins Logins_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."Logins"
    ADD CONSTRAINT "Logins_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: PermissionGroupInheritances PermissionGroupInheritances_targetGroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupInheritances"
    ADD CONSTRAINT "PermissionGroupInheritances_targetGroupID_fkey" FOREIGN KEY ("targetGroupID") REFERENCES public."PermissionGroups"(id) ON UPDATE CASCADE;


--
-- Name: PermissionGroupMappings PermissionGroupMappings_permissionGroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupMappings"
    ADD CONSTRAINT "PermissionGroupMappings_permissionGroupID_fkey" FOREIGN KEY ("permissionGroupID") REFERENCES public."PermissionGroups"(id) ON UPDATE CASCADE;


--
-- Name: PermissionGroupMappings PermissionGroupMappings_permissionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupMappings"
    ADD CONSTRAINT "PermissionGroupMappings_permissionID_fkey" FOREIGN KEY ("permissionID") REFERENCES public."Permissions"(id) ON UPDATE CASCADE;


--
-- Name: PermissionGroupUserMappings PermissionGroupUserMappings_grantedByUserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupUserMappings"
    ADD CONSTRAINT "PermissionGroupUserMappings_grantedByUserID_fkey" FOREIGN KEY ("grantedByUserID") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: PermissionGroupUserMappings PermissionGroupUserMappings_permissionGroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionGroupUserMappings"
    ADD CONSTRAINT "PermissionGroupUserMappings_permissionGroupID_fkey" FOREIGN KEY ("permissionGroupID") REFERENCES public."PermissionGroups"(id) ON UPDATE CASCADE;


--
-- Name: PermissionUsersMappings PermissionUsersMappings_grantedByUserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionUsersMappings"
    ADD CONSTRAINT "PermissionUsersMappings_grantedByUserID_fkey" FOREIGN KEY ("grantedByUserID") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: PermissionUsersMappings PermissionUsersMappings_permissionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."PermissionUsersMappings"
    ADD CONSTRAINT "PermissionUsersMappings_permissionID_fkey" FOREIGN KEY ("permissionID") REFERENCES public."Permissions"(id) ON UPDATE CASCADE;


--
-- Name: ResetDataRequests ResetDataRequests_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."ResetDataRequests"
    ADD CONSTRAINT "ResetDataRequests_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: SecurityQuestionMappings SecurityQuestionMappings_securityQuestionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SecurityQuestionMappings"
    ADD CONSTRAINT "SecurityQuestionMappings_securityQuestionID_fkey" FOREIGN KEY ("securityQuestionID") REFERENCES public."SecurityQuestions"(id) ON UPDATE CASCADE;


--
-- Name: SecurityQuestionMappings SecurityQuestionMappings_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SecurityQuestionMappings"
    ADD CONSTRAINT "SecurityQuestionMappings_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: SelfGrantAuthorizationModels SelfGrantAuthorizationModels_groupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."SelfGrantAuthorizationModels"
    ADD CONSTRAINT "SelfGrantAuthorizationModels_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES public."PermissionGroups"(id) ON UPDATE CASCADE;


--
-- Name: TwoFactorConfigurations TwoFactorConfigurations_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."TwoFactorConfigurations"
    ADD CONSTRAINT "TwoFactorConfigurations_userID_fkey" FOREIGN KEY ("userID") REFERENCES public."Users"(id) ON UPDATE CASCADE;


--
-- Name: RegistrationTokens registrationtokens_users__fk; Type: FK CONSTRAINT; Schema: public; Owner: cas
--

ALTER TABLE ONLY public."RegistrationTokens"
    ADD CONSTRAINT registrationtokens_users__fk FOREIGN KEY ("userID") REFERENCES public."Users"(id);


--
-- Name: DATABASE xiomi_cas; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON DATABASE xiomi_cas TO cas;
GRANT CONNECT ON DATABASE xiomi_cas TO cas;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA public TO cas;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cas
--

ALTER DEFAULT PRIVILEGES FOR ROLE cas IN SCHEMA public REVOKE ALL ON TABLES  FROM cas;
ALTER DEFAULT PRIVILEGES FOR ROLE cas IN SCHEMA public GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO cas;


--
-- PostgreSQL database dump complete
--

