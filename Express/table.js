-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.



CREATE TABLE IF NOT EXISTS public.collection
(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    picture character varying(40) COLLATE pg_catalog."default",
    youtube_link character varying(60) COLLATE pg_catalog."default",
    collector_id integer
  
);

CREATE TABLE IF NOT EXISTS public.collector
(
    first_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    email character varying(60) COLLATE pg_catalog."default" NOT NULL,
    street character varying(50) COLLATE pg_catalog."default" NOT NULL,
    city character varying(40) COLLATE pg_catalog."default" NOT NULL,
    province character varying(40) COLLATE pg_catalog."default" NOT NULL,
    zip smallint NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    birth_date date,
    sex character(1) COLLATE pg_catalog."default" NOT NULL,
    date_entered timestamp without time zone NOT NULL,
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    country character varying(40) COLLATE pg_catalog."default"
    
);

CREATE TABLE IF NOT EXISTS public.comments
(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    comment character varying(60) COLLATE pg_catalog."default",
    collection_id integer,
    account_id integer
    
);

CREATE TABLE IF NOT EXISTS public.reviews
(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    collection_id integer,
    star_rating integer
    
);

ALTER TABLE IF EXISTS public.collection
    ADD CONSTRAINT collection_collector_id_fkey FOREIGN KEY (collector_id)
    REFERENCES public.collector (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.comments
    ADD CONSTRAINT comments_account_id_fkey FOREIGN KEY (account_id)
    REFERENCES public.collector (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.comments
    ADD CONSTRAINT comments_collection_id_fkey FOREIGN KEY (collection_id)
    REFERENCES public.collection (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.reviews
    ADD CONSTRAINT reviews_collection_id_fkey FOREIGN KEY (collection_id)
    REFERENCES public.collection (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

