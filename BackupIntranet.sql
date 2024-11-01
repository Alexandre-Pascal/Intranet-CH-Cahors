PGDMP          	            |           verceldb    16.3    16.2 *    /           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            0           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            1           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            2           1262    16389    verceldb    DATABASE     j   CREATE DATABASE verceldb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE verceldb;
                default    false            3           0    0    DATABASE verceldb    ACL     2   GRANT ALL ON DATABASE verceldb TO neon_superuser;
                   default    false    3378                        2615    19900    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                default    false            4           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   default    false    5            5           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   default    false    5            �            1259    81954    datas_articles    TABLE     �  CREATE TABLE public.datas_articles (
    title character varying(255),
    id character varying(255) GENERATED ALWAYS AS (lower(regexp_replace(replace(replace(translate((title)::text, 'áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜ'::text, 'aeiouAEIOUaeiouAEIOUaeiouAEIOUaeiouAEIOU'::text), ''''::text, '-'::text), ' '::text, '-'::text), '[^a-zA-Z0-9_-]'::text, ''::text, 'g'::text))) STORED NOT NULL,
    content text
);
 "   DROP TABLE public.datas_articles;
       public         heap    default    false    5            �            1259    32785    titles    TABLE     �   CREATE TABLE public.titles (
    title_id integer NOT NULL,
    sub_category_id integer NOT NULL,
    title_name character varying(100) NOT NULL,
    title_url text,
    title_order integer NOT NULL
);
    DROP TABLE public.titles;
       public         heap    default    false    5            �            1259    32788    sub_titles_sub_title_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sub_titles_sub_title_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.sub_titles_sub_title_id_seq;
       public          default    false    5    219            6           0    0    sub_titles_sub_title_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.sub_titles_sub_title_id_seq OWNED BY public.titles.title_id;
          public          default    false    220            �            1259    32777    main_categories    TABLE     �   CREATE TABLE public.main_categories (
    category_id integer DEFAULT nextval('public.sub_titles_sub_title_id_seq'::regclass) NOT NULL,
    category_name character varying(100) NOT NULL,
    category_order integer NOT NULL
);
 #   DROP TABLE public.main_categories;
       public         heap    default    false    220    5            �            1259    32780    main_categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.main_categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.main_categories_category_id_seq;
       public          default    false    5    215            7           0    0    main_categories_category_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.main_categories_category_id_seq OWNED BY public.main_categories.category_id;
          public          default    false    216            �            1259    114688    roles    TABLE     �   CREATE TABLE public.roles (
    name character varying(255) NOT NULL,
    pages character varying(255)[],
    access integer[]
);
    DROP TABLE public.roles;
       public         heap    default    false    5            �            1259    32781    sub_categories    TABLE     �   CREATE TABLE public.sub_categories (
    sub_category_id integer NOT NULL,
    category_id integer NOT NULL,
    sub_category_name character varying(100) NOT NULL,
    sub_category_url text,
    sub_category_order integer NOT NULL
);
 "   DROP TABLE public.sub_categories;
       public         heap    default    false    5            �            1259    32784 "   sub_categories_sub_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sub_categories_sub_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.sub_categories_sub_category_id_seq;
       public          default    false    5    217            8           0    0 "   sub_categories_sub_category_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.sub_categories_sub_category_id_seq OWNED BY public.sub_categories.sub_category_id;
          public          default    false    218            �            1259    98305    users    TABLE     �   CREATE TABLE public.users (
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255)
);
    DROP TABLE public.users;
       public         heap    default    false    5            �           2604    32790    sub_categories sub_category_id    DEFAULT     �   ALTER TABLE ONLY public.sub_categories ALTER COLUMN sub_category_id SET DEFAULT nextval('public.sub_categories_sub_category_id_seq'::regclass);
 M   ALTER TABLE public.sub_categories ALTER COLUMN sub_category_id DROP DEFAULT;
       public          default    false    218    217            �           2604    32791    titles title_id    DEFAULT     z   ALTER TABLE ONLY public.titles ALTER COLUMN title_id SET DEFAULT nextval('public.sub_titles_sub_title_id_seq'::regclass);
 >   ALTER TABLE public.titles ALTER COLUMN title_id DROP DEFAULT;
       public          default    false    220    219            *          0    81954    datas_articles 
   TABLE DATA           8   COPY public.datas_articles (title, content) FROM stdin;
    public          default    false    221   �0       $          0    32777    main_categories 
   TABLE DATA           U   COPY public.main_categories (category_id, category_name, category_order) FROM stdin;
    public          default    false    215   �;       ,          0    114688    roles 
   TABLE DATA           4   COPY public.roles (name, pages, access) FROM stdin;
    public          default    false    223   l<       &          0    32781    sub_categories 
   TABLE DATA              COPY public.sub_categories (sub_category_id, category_id, sub_category_name, sub_category_url, sub_category_order) FROM stdin;
    public          default    false    217   �>       (          0    32785    titles 
   TABLE DATA           _   COPY public.titles (title_id, sub_category_id, title_name, title_url, title_order) FROM stdin;
    public          default    false    219   SA       +          0    98305    users 
   TABLE DATA           <   COPY public.users (name, email, password, role) FROM stdin;
    public          default    false    222   D       9           0    0    main_categories_category_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.main_categories_category_id_seq', 6, true);
          public          default    false    216            :           0    0 "   sub_categories_sub_category_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.sub_categories_sub_category_id_seq', 174, true);
          public          default    false    218            ;           0    0    sub_titles_sub_title_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.sub_titles_sub_title_id_seq', 223, true);
          public          default    false    220            �           2606    81961 "   datas_articles datas_articles_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.datas_articles
    ADD CONSTRAINT datas_articles_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.datas_articles DROP CONSTRAINT datas_articles_pkey;
       public            default    false    221            �           2606    32793 $   main_categories main_categories_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.main_categories
    ADD CONSTRAINT main_categories_pkey PRIMARY KEY (category_id);
 N   ALTER TABLE ONLY public.main_categories DROP CONSTRAINT main_categories_pkey;
       public            default    false    215            �           2606    114694    roles roles_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (name);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            default    false    223            �           2606    32795 "   sub_categories sub_categories_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_pkey PRIMARY KEY (sub_category_id);
 L   ALTER TABLE ONLY public.sub_categories DROP CONSTRAINT sub_categories_pkey;
       public            default    false    217            �           2606    32797    titles sub_titles_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.titles
    ADD CONSTRAINT sub_titles_pkey PRIMARY KEY (title_id);
 @   ALTER TABLE ONLY public.titles DROP CONSTRAINT sub_titles_pkey;
       public            default    false    219            �           2606    106499    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            default    false    222            �           2606    57344 .   sub_categories sub_categories_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.main_categories(category_id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.sub_categories DROP CONSTRAINT sub_categories_category_id_fkey;
       public          default    false    217    3207    215            �           2606    57349 &   titles sub_titles_sub_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.titles
    ADD CONSTRAINT sub_titles_sub_category_id_fkey FOREIGN KEY (sub_category_id) REFERENCES public.sub_categories(sub_category_id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.titles DROP CONSTRAINT sub_titles_sub_category_id_fkey;
       public          default    false    219    217    3209            �           2606    114695    users users_role_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_fkey FOREIGN KEY (role) REFERENCES public.roles(name) NOT VALID;
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_role_fkey;
       public          default    false    3217    222    223                       826    24577     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     {   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false    5                       826    24576    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false    5            *     x��ZKo�H>G�����`d�%+kH2N6g N�Ȧ���t7ǧ�)s�x{������n��dɢ7�`[q�GuUu=��&%������R����?m'Sw�>ճ�x�K�u�|��m2_�ac1�9�s��X�������������qXpOC�\�f(�i�R{��i(���-Q���i�։i�)gM#�L��r=bJ��9�ڙ��|.�/��\[��J%�p���g�S*؏����lKŴdK��Q��YG��q�Ȱ����O],���a<ȕj@&�t����\�|k�wuue)/ !J�ٍ�5�?�x|������{����BQ,x)��K�,��0����8��8M�Q��������'|)���u£�f��T��8�:�s������V�J\�V�������-Ml)�νӶ~�6t������)��E�uu���6v�9�XХ�|�����:_��Uȣa�$��A��^<f�޾x�^����>��|qyy鴴������io/��̘)6_��K.##"�l�&I��MK�M���Db�$�L� (O��Q���$�k°:i�Z9\��8}迒��a(�au���3~v�ĆP(��B
�+`(6���gi$�\�6n��i�5�i���3
�6b���^�7�F�a����/���G�{���|nx�#��Ys��s~���Y��	��j����ԗ+G`>% ���Pn��1�3�M��������8��+�yu� ���0sD��a�Ĵݔ﷫U��LY�B5�F�P-��3����¹P���h �0j|�L��W^m�I�R�J<^oR��߷)����7Pb����WW�@3�4��o�߿�u�)G�����	�d�(|��ZQ}j�;��?�oV�Q�ve��U&���(��x��X��k0�U,��Q0��Ш��[,�={��]�c<~�����x4<�w&��r�{-��8�QK �n�������^����Cr�%��^q˛���Igۋ��xD���Y��a���ng0�{��Nk�Q�{\J5�[�!xO���ysί�SG�`�����/Zi���Nz��Ng+7���x3��u�����d8�Kۿ2��_o��mӺ���}	��� �=F�\�\#u���ɰ?���{��5F8w�5ܼ����?,j8@������DD{����0 �`<:,�/W�z6[��n�QnNz�ɤ7�~Q��� ;v��5Ps0����n�w�9����O���4��,�S�V���(Ԉ���E�$2
}�YӨT4����݂w���8���'Z���Zty-��"ym+'�:^&�77��W��N���)��?�F�R����k28��@w4,2�A��"�\�h�<a�``�����F���,6'�Z~����n���
�p��Nu�;���^�Eo�:�O�Ao2����]		7��i��O���8�O�S}�����P���X�k��#�m�5��6lG�1?e&�	��dGR���z�.���`{��柂��Qڌ{h�����)���s����9�Nj/�rI-8��͝���i���
�b9}Ğڼ!c���d+�c�l��Dٍ�n@�؋�L�vy,Ƚ �>c6�<��H#Ied4���'m��K���4�D��0;���G��Wl�yx̾qo���)O�Po�����)hVXVK�k��?��u�Oh��\��)_�J˼'$��J�g7?�2�%&�H|���H���(&�k�FI��R�A��~�u=�z��0:=��4ʛ����B���],=Ix"T�KJOQ�aHJ+of�6 ��ڬ�F¾T����{��1S�Ƶ�=	���E���{ɳm�4����F�.��i����e�5���3�޻����t�㸟�Z8go��q��,�2��5��C	.���lk	O�-
O,)���ēD���.��}JUhx���[���\%N��f�r��p��#��Hj-R�V�����z�߻�P/�*�i��]�2\�V'Qج��[*�:�"/^���HaVJ���sJyP,��i��[�V ]H�t³M� 2TŮ���?~�w^������"E�Z��@S䣶�O�BD�b	r�Ʀ�]��L*!���b�0l�!,.W��YYlD:��J�a�<R��C@;�ٿ��:U+aF�>��\q	�[���^�H��*��ip�t^�����j~���Z���������.��U�Z&?2B)J�y͖�η�%��o��,9�U�<�q�X��"�z��0������
����aՉ�8@H��z�Q��&�a�Q\�*�"��:γ����DH�"K�����0.d �4�=D��$)���J�-*�B��Ğ�WRKC��VBi{	鹒���D�&�g����WB!���4���$4�!;�9_K��d��������Ix�SnF��`�ݟR4[�Er��[�����GşK�1����c�IaۇT�S,>�7Y��I���@λ��״W^�o��[-�(u�Y9؆��]�`��<b��ϐ�^nkz��s���_XĲ�ь�xqJ�����n�����	w����~;���I�7X5�u�u�ݲ�9�ZDz�%m��]J`��q�v�hQ� ���l�6'Y�$B �Ɍd�
���ȅ���ɀĻ�D��Z�JF^/����1�y9�4�h�"�FK�8`s�-	�dLG��`�DHXmUЍ�(KP�8w�T�$��5�6n�����A����oZ̴��Cمr76����M-/�7�nЏm�/e
�a����+�����R�7�|ѓˋsz�\�S������ǍF㿮�      $   �   x�%�K
�0 ���)r���u��iLRWnJ)��%rϑ�Yq��I)AO��=״��ǜ^�}�=V��0�^Elǒm�^
P��a�G�XC a�i��~3C�`��$J�'>�-v8Rc�_��u��_��&      ,   ^  x���n1���),_zq#B��ZXH�hz���0�צ�7j�� }�f�}�}����*�!��d����f<�ϧ��v^�F��Pڣ��tYԕ5���k+�5�X�M�1z`�=X���ԋE�c�^*.�98�F��de�K��E[�2�� ��s�H�:����Bz�R�6^���4��R^W����tF�J�0�{\�m<�ĸ��O_>��{C6�+UW䐡>ƣ4�],��K
R�UXO�z�a&�y��Y}�H��`���d���0�s��;��X���i��aI����!�f�=O��(vo16����+:�������m�"�TҮSa�27\��!�JG�;7�����8	��6�h{WO��e�nZle-$ɓѨK�d������(u�5�P����	>�gTč�lIӾ���Ԩ0�h��҆��l��T�͒��p^�����ݴē�m��c���c)������8��~Q�<�#Ñ�2���>��>���р�4j��R�뺊�Fz���8�*yAǻp���07�6��v��V��Gx#���s�W��D�Δ�Qu57�-B<�e�|G<�W<�����mk��OǍF�'ݿ��      &   i  x��RAv�0\[�ЎU�Jv�MZ �h(6����'KF�[8'��s_��m�Vxe�I3��Hnu�mo!��yqj�:*��b�������a\�F�:9�?I�������+�
lT�C��}"Y��+k�'$e"kA�������}�h�����=���t�ˑ����1t�%F��C��@؜]&2��^�f�,Ԯ�5�P6�����@����͆�ڳi��Ph;���ڮ��,��l�
���<�yK�Qt���J�>�ީHi�cި=AS&2�N���3�{�b�؝.��o]u�?w��BN{�b�Q�y��膄�L�t�2��.�o�����{�E�K&�dg����Ղq���C���]�F�����ЇE�-%�Ȣ	�P�=)<�n�2I9������D�d���UYi�C�݀��v����"���;�'�ڞ�p���#v��R��)焭�}��WKWU���X9K/����l���
������o�q0�'a�%�8X^�Ƈ^_��n���R�f�5(tM�^o�!gh�^��bq�������H&�^�vr��GʱD�ypM��=%�||��60򪮝��F��h�˘1�eh5�      (   �  x��S�n�0<�_�[O�L���'M
4�=��H��D�|8A�����cݕd�n�֠/�����Y�2v�38������:�B�?&���˙6���%�j��� ���'mt��$���$OO	���U��"�	kn��&e㉿V������<����A�Uײ�;��9��[�^��4����AU'EJk�
�V�h*������hcH��%[��1�Q�N�"F|W� ���䫿B/�*��Ph�T|5=:�kD��+%ahXN1t��Q�K�Ҍ��|z^�`�S���L)����*5�r�Qn���7^<E�����c���ip���^�nOJ�Y��)(��ڪ���		2�rA���ke��V�kQ� .�=@�趌 6W��Zr������#؊�5��oQ� ڒQW�y:�pg��Q�^�)OQ�9����A�4��ֺ@;��Z�s�`�]�h�-"W&7J�B�v�+�d%Qw-m����$?�Q��6��Ts~�mM%�m`,]b�TF�N���'��ԽW��%���݊�;���?"ZD����5
�b���筮lx��IE�2I�K�G��ȑ&K)s]�Q�>X$�(x\~�E6��9݁��G����p�5�bk����x�����j4)E K��3�G�\�9Z?)	<)&G�I'w<@g|�~�鐏���4�u���qYx|o�������=      +   x  x�e�M��0�1�c�RfR�j��:5	!T�$h �n��k����w��~���%R~��@��?��B�%��:�kj?Ls:�A�֍W�5��@D˅�� ����^
m��o�%n�K%3�����F�ˋ�p���-I���{���*f��-2^`g���$BO�$��W���ю�,�Ǳ�6pl;  �=%�g2& �3�R�x��m�|���U��j�䟦�RK�(���Ϛ&:��[	�� ���m~�9�J1��߃)zZ]|���δ��cH��u(��9W<�{�n�n4	ab�b����+`z�G�u��S�����P�v�f�3��Y;Qb�ަW�&�[����yk�姫�����{��@�"���Ӵ     