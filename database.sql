PGDMP         *                |            baza    15.3 (Debian 15.3-1.pgdg120+1)    15.3 0    `           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            a           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            b           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            c           1262    16389    baza    DATABASE     o   CREATE DATABASE baza WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE baza;
                root    false            �            1259    16664    Car    TABLE     �   CREATE TABLE public."Car" (
    car_id text NOT NULL,
    user_id text NOT NULL,
    car_info_id text NOT NULL,
    active boolean NOT NULL,
    creation_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Car";
       public         heap    root    false            �            1259    16675    Car_info    TABLE     �   CREATE TABLE public."Car_info" (
    car_info_id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    directory_url text NOT NULL,
    avatar_url text NOT NULL
);
    DROP TABLE public."Car_info";
       public         heap    root    false            �            1259    16655    City    TABLE     R   CREATE TABLE public."City" (
    city_id text NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."City";
       public         heap    root    false            �            1259    16693    Photo    TABLE     x   CREATE TABLE public."Photo" (
    photo_id text NOT NULL,
    car_info_id text NOT NULL,
    photo_url text NOT NULL
);
    DROP TABLE public."Photo";
       public         heap    root    false            �            1259    16684 	   Privilege    TABLE     _   CREATE TABLE public."Privilege" (
    privilege_id integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."Privilege";
       public         heap    root    false            �            1259    16683    Privilege_privilege_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Privilege_privilege_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."Privilege_privilege_id_seq";
       public          root    false    223            d           0    0    Privilege_privilege_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Privilege_privilege_id_seq" OWNED BY public."Privilege".privilege_id;
          public          root    false    222            �            1259    16633    User    TABLE     %  CREATE TABLE public."User" (
    user_id text NOT NULL,
    privilege_id integer NOT NULL,
    user_info_id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    enabled boolean NOT NULL,
    creation_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."User";
       public         heap    root    false            �            1259    16651    User_city_info    TABLE     d   CREATE TABLE public."User_city_info" (
    user_info_id text NOT NULL,
    city_id text NOT NULL
);
 $   DROP TABLE public."User_city_info";
       public         heap    root    false            �            1259    16643 	   User_info    TABLE     �   CREATE TABLE public."User_info" (
    user_info_id text NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL
);
    DROP TABLE public."User_info";
       public         heap    root    false            �            1259    16623    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    root    false            �            1259    16671    car_city    TABLE     u   CREATE TABLE public.car_city (
    car_id text NOT NULL,
    city_id text NOT NULL,
    car_city_id text NOT NULL
);
    DROP TABLE public.car_city;
       public         heap    root    false            �           2604    16687    Privilege privilege_id    DEFAULT     �   ALTER TABLE ONLY public."Privilege" ALTER COLUMN privilege_id SET DEFAULT nextval('public."Privilege_privilege_id_seq"'::regclass);
 G   ALTER TABLE public."Privilege" ALTER COLUMN privilege_id DROP DEFAULT;
       public          root    false    222    223    223            X          0    16664    Car 
   TABLE DATA                 public          root    false    219   �6       Z          0    16675    Car_info 
   TABLE DATA                 public          root    false    221   �7       W          0    16655    City 
   TABLE DATA                 public          root    false    218   �8       ]          0    16693    Photo 
   TABLE DATA                 public          root    false    224   O9       \          0    16684 	   Privilege 
   TABLE DATA                 public          root    false    223   ':       T          0    16633    User 
   TABLE DATA                 public          root    false    215   �:       V          0    16651    User_city_info 
   TABLE DATA                 public          root    false    217   �;       U          0    16643 	   User_info 
   TABLE DATA                 public          root    false    216   ,<       S          0    16623    _prisma_migrations 
   TABLE DATA                 public          root    false    214   =       Y          0    16671    car_city 
   TABLE DATA                 public          root    false    220   D?       e           0    0    Privilege_privilege_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Privilege_privilege_id_seq"', 1, false);
          public          root    false    222            �           2606    16761    Car_info Car_info_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public."Car_info"
    ADD CONSTRAINT "Car_info_pkey" PRIMARY KEY (car_info_id);
 D   ALTER TABLE ONLY public."Car_info" DROP CONSTRAINT "Car_info_pkey";
       public            root    false    221            �           2606    16751    Car Car_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "Car_pkey" PRIMARY KEY (car_id);
 :   ALTER TABLE ONLY public."Car" DROP CONSTRAINT "Car_pkey";
       public            root    false    219            �           2606    16769    City City_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_pkey" PRIMARY KEY (city_id);
 <   ALTER TABLE ONLY public."City" DROP CONSTRAINT "City_pkey";
       public            root    false    218            �           2606    16777    Photo Photo_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Photo"
    ADD CONSTRAINT "Photo_pkey" PRIMARY KEY (photo_id);
 >   ALTER TABLE ONLY public."Photo" DROP CONSTRAINT "Photo_pkey";
       public            root    false    224            �           2606    16691    Privilege Privilege_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Privilege"
    ADD CONSTRAINT "Privilege_pkey" PRIMARY KEY (privilege_id);
 F   ALTER TABLE ONLY public."Privilege" DROP CONSTRAINT "Privilege_pkey";
       public            root    false    223            �           2606    16803    User_info User_info_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."User_info"
    ADD CONSTRAINT "User_info_pkey" PRIMARY KEY (user_info_id);
 F   ALTER TABLE ONLY public."User_info" DROP CONSTRAINT "User_info_pkey";
       public            root    false    216            �           2606    16785    User User_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            root    false    215            �           2606    16631 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            root    false    214            �           2606    16862    car_city car_city_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.car_city
    ADD CONSTRAINT car_city_pkey PRIMARY KEY (car_city_id);
 @   ALTER TABLE ONLY public.car_city DROP CONSTRAINT car_city_pkey;
       public            root    false    220            �           1259    16793    User_city_info_user_info_id_key    INDEX     m   CREATE UNIQUE INDEX "User_city_info_user_info_id_key" ON public."User_city_info" USING btree (user_info_id);
 5   DROP INDEX public."User_city_info_user_info_id_key";
       public            root    false    217            �           1259    16749    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            root    false    215            �           2606    16841    Car Car_car_info_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "Car_car_info_id_fkey" FOREIGN KEY (car_info_id) REFERENCES public."Car_info"(car_info_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Car" DROP CONSTRAINT "Car_car_info_id_fkey";
       public          root    false    219    221    3255            �           2606    16836    Car Car_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Car"
    ADD CONSTRAINT "Car_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 B   ALTER TABLE ONLY public."Car" DROP CONSTRAINT "Car_user_id_fkey";
       public          root    false    3244    215    219            �           2606    16856    Photo Photo_car_info_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Photo"
    ADD CONSTRAINT "Photo_car_info_id_fkey" FOREIGN KEY (car_info_id) REFERENCES public."Car_info"(car_info_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Photo" DROP CONSTRAINT "Photo_car_info_id_fkey";
       public          root    false    224    221    3255            �           2606    16831 *   User_city_info User_city_info_city_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User_city_info"
    ADD CONSTRAINT "User_city_info_city_id_fkey" FOREIGN KEY (city_id) REFERENCES public."City"(city_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 X   ALTER TABLE ONLY public."User_city_info" DROP CONSTRAINT "User_city_info_city_id_fkey";
       public          root    false    218    3249    217            �           2606    16826 /   User_city_info User_city_info_user_info_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User_city_info"
    ADD CONSTRAINT "User_city_info_user_info_id_fkey" FOREIGN KEY (user_info_id) REFERENCES public."User_info"(user_info_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY public."User_city_info" DROP CONSTRAINT "User_city_info_user_info_id_fkey";
       public          root    false    3246    217    216            �           2606    16704    User User_privilege_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_privilege_id_fkey" FOREIGN KEY (privilege_id) REFERENCES public."Privilege"(privilege_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_privilege_id_fkey";
       public          root    false    215    3257    223            �           2606    16821    User User_user_info_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_user_info_id_fkey" FOREIGN KEY (user_info_id) REFERENCES public."User_info"(user_info_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_user_info_id_fkey";
       public          root    false    3246    215    216            �           2606    16846    car_city car_city_car_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_city
    ADD CONSTRAINT car_city_car_id_fkey FOREIGN KEY (car_id) REFERENCES public."Car"(car_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.car_city DROP CONSTRAINT car_city_car_id_fkey;
       public          root    false    220    219    3251            �           2606    16851    car_city car_city_city_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_city
    ADD CONSTRAINT car_city_city_id_fkey FOREIGN KEY (city_id) REFERENCES public."City"(city_id) ON UPDATE CASCADE ON DELETE RESTRICT;
 H   ALTER TABLE ONLY public.car_city DROP CONSTRAINT car_city_city_id_fkey;
       public          root    false    220    218    3249            X   �   x�%�͊1����KlIb�I��,qa��J'����2;�Ͽ���+�������N_�gH�6/&��M�4swm�\��/�^/�ܷ2��p�>��½���c��T3�/�z0.V@NK�B$Fspl�ҔJ1���Bp#�)�!��L��l.�6%@	��� �P�U|���0���8��X�������ĥ�m�����B�      Z   �   x�-�Aj�0D�:�''`�(���J�"PR��n͗�EEɸv��,�Q�Pr��P��y3�Sux��x���ٛ����W�6���6��J�һ�|��f��>vc3t���y1���?<*X'�tRg�r�i�%���$і.ߺB�$���c����p�
/Ѽ��X���~4S�!~���) L6j�A&�������N���;�*��j9Z�Ua��Nܖ\��q��8Q��\d��ds����V�      W   o   x���v
Q���W((M��L�Sr�,�TR�HR�):
y����
a�>���
�)�&iI&I����f�&Fff��������f����f�:
��E�U����\\\ _      ]   �   x�����1D����(ؒĞN�'wY]��t�q@TD���]((��ë~��|�M���۳�^L�N��ub��яC����p�wx���yf돟��Lۨ��mR )d��+:��!h;7����qt� JH�s��;���$b� 6D@&���@�;�ֽD�l����\��8GHν�*uP��7�Z�h����4��`m?      \   Y   x���v
Q���W((M��L�S
(�,��IMOUR�(���3St�sS5�}B]�4u�Sr3��5��<)0�hPhqj�.. v�,�      T   �   x����n�0��<ET!�J��E��]Ɓ��M��ݪ��DCS����b�����E�^��P����{)��qD�"kc�I6>�h9�?�NZ�Ý��eo#|����� 4�I���	7�J��YA������6B�-k�X�5	���z>��7�M8NOK	�p^���[*�ˤ�^��G�vo�X&����Q?aW�ɯ�Z�)�;���I�W�BPhD �4�3���yt�e=]@      V   �   x�%��
�0@�~ťKZ�r��ɡCA*�ֵ�DE���kq;����]?ᱸk��rz�����3�[��P-kXyΡ��	5�����b�B��"�m(5%4�&X�I�$Ҭ.29.Z"�R(�V�Ak�W�r��b��(�/�h*�      U   �   x��νj�0��O!�8�X��~��!C�B�d��DM[;H��>}mL��!p���}͡ݿv�9t/�2ُ��m���s?�qC���>�X��|���)���6s��Sڑ���qߒm^j�Q�@���r���9
��B�\�� ��yOK�W3,ͪz�r��_�{0��|w�5��z�±���r-�*��
��a���Oj���+ng�X��W�KTU�U��@�ߚe?�m�g      S     x���MO1�;�bn��Avl烞z����T��Q'0b��3������Q�#�(J�8�#_^�\|��.�o�v�}^���q���p�KӰY��ɠ��<��8�W���a|�ڧi����봪�n���n�\΁���Sj��nz~����0�ǩnǾl���������;9vMcac�͆�z�҈�6[�ݱ�h3��;7G��V%��B��	�1���r�Z5�E�.��5��k ;����@8~x�E� @���4_�]]�Y�[�����~>��pʩ�DT�!�bZ3�do*&�2��� \25t^� Z1?Cr��
Y.Q)�o޺$�*Ŋ.k�����9@��]��?�cL�>�q�I�@1�f^.$f&,��R��B=�O^@Y<VE�J�jD���7IC��iT�.8��I�����1�8��̀�0������O��GV�(���Q�Yy�1�x5��*hxR�
�h@�4�,)�\h��V��������rj�sR�%���$3���ad��ܗ���0�|79z�>:��
�v      Y   �   x�-�1�0F���lm�'i{Iz89t(H[]�K�� ��������x�8��Y�|R���/a�y�룊���f?�O���z8^�I9tB��Pd��q���a�1�T.��k�@�X��Z g: 
�F��E��ꈩ�!	��3PZ{�$:�`P0/�Y�})�4�     