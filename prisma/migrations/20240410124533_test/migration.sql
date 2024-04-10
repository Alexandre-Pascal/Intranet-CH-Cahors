-- CreateTable
CREATE TABLE "l76aj_assets" (
    "id" BIGSERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL DEFAULT 0,
    "lft" INTEGER NOT NULL DEFAULT 0,
    "rgt" INTEGER NOT NULL DEFAULT 0,
    "level" BIGINT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "rules" VARCHAR(5120) NOT NULL,

    CONSTRAINT "l76aj_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_associations" (
    "id" VARCHAR(50) NOT NULL,
    "context" VARCHAR(50) NOT NULL,
    "key" CHAR(32) NOT NULL,

    CONSTRAINT "l76aj_associations_pkey" PRIMARY KEY ("context","id")
);

-- CreateTable
CREATE TABLE "l76aj_banner_clients" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "contact" VARCHAR(255) NOT NULL DEFAULT '',
    "email" VARCHAR(255) NOT NULL DEFAULT '',
    "extrainfo" TEXT NOT NULL,
    "state" SMALLINT NOT NULL DEFAULT 0,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "metakey" TEXT NOT NULL,
    "own_prefix" SMALLINT NOT NULL DEFAULT 0,
    "metakey_prefix" VARCHAR(255) NOT NULL DEFAULT '',
    "purchase_type" SMALLINT NOT NULL DEFAULT -1,
    "track_clicks" SMALLINT NOT NULL DEFAULT -1,
    "track_impressions" SMALLINT NOT NULL DEFAULT -1,

    CONSTRAINT "l76aj_banner_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_banner_tracks" (
    "track_date" TIMESTAMP(6) NOT NULL,
    "track_type" BIGINT NOT NULL,
    "banner_id" BIGINT NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_banner_tracks_pkey" PRIMARY KEY ("track_date","track_type","banner_id")
);

-- CreateTable
CREATE TABLE "l76aj_banners" (
    "id" SERIAL NOT NULL,
    "cid" INTEGER NOT NULL DEFAULT 0,
    "type" INTEGER NOT NULL DEFAULT 0,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "alias" VARCHAR(255) NOT NULL DEFAULT '',
    "imptotal" INTEGER NOT NULL DEFAULT 0,
    "impmade" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "clickurl" VARCHAR(200) NOT NULL DEFAULT '',
    "state" SMALLINT NOT NULL DEFAULT 0,
    "catid" BIGINT NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "custombannercode" VARCHAR(2048) NOT NULL,
    "sticky" INTEGER NOT NULL DEFAULT 0,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "metakey" TEXT NOT NULL,
    "params" TEXT NOT NULL,
    "own_prefix" SMALLINT NOT NULL DEFAULT 0,
    "metakey_prefix" VARCHAR(255) NOT NULL DEFAULT '',
    "purchase_type" SMALLINT NOT NULL DEFAULT -1,
    "track_clicks" SMALLINT NOT NULL DEFAULT -1,
    "track_impressions" SMALLINT NOT NULL DEFAULT -1,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_up" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_down" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "reset" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "created" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "language" CHAR(7) NOT NULL DEFAULT '',

    CONSTRAINT "l76aj_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_breezingforms_addons_gdata" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL DEFAULT 0,
    "username" VARCHAR(255) NOT NULL DEFAULT '',
    "password" VARCHAR(255) NOT NULL DEFAULT '',
    "enabled" SMALLINT NOT NULL DEFAULT 0,
    "spreadsheet_id" VARCHAR(255) NOT NULL DEFAULT '',
    "worksheet_id" VARCHAR(255) NOT NULL DEFAULT '',
    "fields" TEXT NOT NULL,
    "meta" VARCHAR(255) NOT NULL,
    "debug" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_breezingforms_addons_gdata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_categories" (
    "id" SERIAL NOT NULL,
    "asset_id" BIGINT NOT NULL DEFAULT 0,
    "parent_id" BIGINT NOT NULL DEFAULT 0,
    "lft" INTEGER NOT NULL DEFAULT 0,
    "rgt" INTEGER NOT NULL DEFAULT 0,
    "level" BIGINT NOT NULL DEFAULT 0,
    "path" VARCHAR(255) NOT NULL DEFAULT '',
    "extension" VARCHAR(50) NOT NULL DEFAULT '',
    "title" VARCHAR(255) NOT NULL,
    "alias" VARCHAR(255) NOT NULL DEFAULT '',
    "note" VARCHAR(255) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "access" BIGINT NOT NULL DEFAULT 0,
    "params" TEXT NOT NULL,
    "metadesc" VARCHAR(1024) NOT NULL,
    "metakey" VARCHAR(1024) NOT NULL,
    "metadata" VARCHAR(2048) NOT NULL,
    "created_user_id" BIGINT NOT NULL DEFAULT 0,
    "created_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "modified_user_id" BIGINT NOT NULL DEFAULT 0,
    "modified_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "hits" BIGINT NOT NULL DEFAULT 0,
    "language" CHAR(7) NOT NULL,

    CONSTRAINT "l76aj_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_chronoforms_data_formexpbesoins" (
    "cf_id" SERIAL NOT NULL,
    "cf_uid" VARCHAR(255) NOT NULL,
    "cf_created" TIMESTAMP(6) NOT NULL,
    "cf_modified" TIMESTAMP(6) NOT NULL,
    "cf_created_by" INTEGER NOT NULL,
    "cf_modified_by" INTEGER NOT NULL,
    "cf_ipaddress" VARCHAR(255) NOT NULL,
    "cf_user_id" INTEGER NOT NULL,
    "input_checkbox_group_4" VARCHAR(255) NOT NULL,
    "input_text_1" VARCHAR(255) NOT NULL,
    "input_checkbox_group_23" VARCHAR(255) NOT NULL,
    "input_file_8" VARCHAR(255) NOT NULL,
    "input_submit_10" VARCHAR(255) NOT NULL,
    "back" VARCHAR(255) NOT NULL,
    "chrono_verification" VARCHAR(255) NOT NULL,
    "input_submit_5" VARCHAR(255) NOT NULL,

    CONSTRAINT "l76aj_chronoforms_data_formexpbesoins_pkey" PRIMARY KEY ("cf_id")
);

-- CreateTable
CREATE TABLE "l76aj_ckforms_3" (
    "id" SERIAL NOT NULL,
    "published" SMALLINT,
    "created" TIMESTAMP(6),
    "ipaddress" TEXT,
    "articleid" TEXT,
    "F4" TEXT,
    "F6" TEXT,
    "F7" TEXT,
    "F8" TEXT,
    "F9" TEXT,
    "F10" TEXT,
    "F13" TEXT,
    "F14" TEXT,
    "F15" TEXT,
    "F16" TEXT,
    "F17" TEXT,
    "F18" TEXT,
    "F19" TEXT,
    "F20" TEXT,
    "F21" TEXT,
    "F23" TEXT,
    "F24" TEXT,
    "F26" TEXT,
    "F27" TEXT,

    CONSTRAINT "l76aj_ckforms_3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_contact_details" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "alias" VARCHAR(255) NOT NULL DEFAULT '',
    "con_position" VARCHAR(255),
    "address" TEXT,
    "suburb" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "postcode" VARCHAR(100),
    "telephone" VARCHAR(255),
    "fax" VARCHAR(255),
    "misc" TEXT,
    "image" VARCHAR(255),
    "imagepos" VARCHAR(20),
    "email_to" VARCHAR(255),
    "default_con" INTEGER NOT NULL DEFAULT 0,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "params" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL DEFAULT 0,
    "catid" INTEGER NOT NULL DEFAULT 0,
    "access" BIGINT,
    "mobile" VARCHAR(255) NOT NULL DEFAULT '',
    "webpage" VARCHAR(255) NOT NULL DEFAULT '',
    "sortname1" VARCHAR(255) NOT NULL,
    "sortname2" VARCHAR(255) NOT NULL,
    "sortname3" VARCHAR(255) NOT NULL,
    "language" CHAR(7) NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "created_by" BIGINT NOT NULL DEFAULT 0,
    "created_by_alias" VARCHAR(255) NOT NULL DEFAULT '',
    "modified" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "modified_by" BIGINT NOT NULL DEFAULT 0,
    "metakey" TEXT NOT NULL,
    "metadesc" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "featured" INTEGER NOT NULL DEFAULT 0,
    "xreference" VARCHAR(50) NOT NULL,
    "publish_up" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_down" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,

    CONSTRAINT "l76aj_contact_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_content" (
    "id" BIGSERIAL NOT NULL,
    "asset_id" BIGINT NOT NULL DEFAULT 0,
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "alias" VARCHAR(255) NOT NULL DEFAULT '',
    "title_alias" VARCHAR(255) NOT NULL DEFAULT '',
    "introtext" TEXT NOT NULL,
    "fulltext" TEXT NOT NULL,
    "state" SMALLINT NOT NULL DEFAULT 0,
    "sectionid" BIGINT NOT NULL DEFAULT 0,
    "mask" BIGINT NOT NULL DEFAULT 0,
    "catid" BIGINT NOT NULL DEFAULT 0,
    "created" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "created_by" BIGINT NOT NULL DEFAULT 0,
    "created_by_alias" VARCHAR(255) NOT NULL DEFAULT '',
    "modified" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "modified_by" BIGINT NOT NULL DEFAULT 0,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_up" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_down" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "images" TEXT NOT NULL,
    "urls" TEXT NOT NULL,
    "attribs" VARCHAR(5120) NOT NULL,
    "version" BIGINT NOT NULL DEFAULT 1,
    "parentid" BIGINT NOT NULL DEFAULT 0,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "metakey" TEXT NOT NULL,
    "metadesc" TEXT NOT NULL,
    "access" BIGINT NOT NULL DEFAULT 0,
    "hits" BIGINT NOT NULL DEFAULT 0,
    "metadata" TEXT NOT NULL,
    "featured" INTEGER NOT NULL DEFAULT 0,
    "language" CHAR(7) NOT NULL,
    "xreference" VARCHAR(50) NOT NULL,

    CONSTRAINT "l76aj_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_content_frontpage" (
    "content_id" INTEGER NOT NULL DEFAULT 0,
    "ordering" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_content_frontpage_pkey" PRIMARY KEY ("content_id")
);

-- CreateTable
CREATE TABLE "l76aj_content_rating" (
    "content_id" INTEGER NOT NULL DEFAULT 0,
    "rating_sum" BIGINT NOT NULL DEFAULT 0,
    "rating_count" BIGINT NOT NULL DEFAULT 0,
    "lastip" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "l76aj_content_rating_pkey" PRIMARY KEY ("content_id")
);

-- CreateTable
CREATE TABLE "l76aj_core_log_searches" (
    "search_term" VARCHAR(128) NOT NULL DEFAULT '',
    "hits" BIGINT NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "l76aj_extensions" (
    "extension_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "element" VARCHAR(100) NOT NULL,
    "folder" VARCHAR(100) NOT NULL,
    "client_id" SMALLINT NOT NULL,
    "enabled" SMALLINT NOT NULL DEFAULT 1,
    "access" BIGINT,
    "protected" SMALLINT NOT NULL DEFAULT 0,
    "manifest_cache" TEXT NOT NULL,
    "params" TEXT NOT NULL,
    "custom_data" TEXT NOT NULL,
    "system_data" TEXT NOT NULL,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "ordering" INTEGER DEFAULT 0,
    "state" INTEGER DEFAULT 0,

    CONSTRAINT "l76aj_extensions_pkey" PRIMARY KEY ("extension_id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch" (
    "id" BIGSERIAL NOT NULL,
    "ip" VARCHAR(255),
    "country" VARCHAR(2),
    "browser" VARCHAR(255),
    "referer" VARCHAR(255),
    "username" VARCHAR(255),
    "inactive" INTEGER DEFAULT 1,
    "city" VARCHAR(255),
    "latitude" REAL,
    "longitude" REAL,

    CONSTRAINT "l76aj_extrawatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_blocked" (
    "id" BIGSERIAL NOT NULL,
    "ip" VARCHAR(255),
    "hits" BIGINT,
    "date" INTEGER,
    "reason" VARCHAR(255),
    "country" CHAR(2),
    "badWord" VARCHAR(255) NOT NULL,

    CONSTRAINT "l76aj_extrawatch_blocked_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_cache" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(255),
    "lastUpdate" INTEGER,
    "cache" TEXT,

    CONSTRAINT "l76aj_extrawatch_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_cc2c" (
    "id" SERIAL NOT NULL,
    "cc" CHAR(2) NOT NULL,
    "country" VARCHAR(50) NOT NULL,

    CONSTRAINT "l76aj_extrawatch_cc2c_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_config" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "value" TEXT,

    CONSTRAINT "l76aj_extrawatch_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_dm_counter" (
    "id" SERIAL NOT NULL,
    "did" INTEGER NOT NULL,
    "ddate" DATE NOT NULL,
    "ip" VARCHAR(255),
    "referrerId" INTEGER,
    "timestamp" INTEGER,

    CONSTRAINT "l76aj_extrawatch_dm_counter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_dm_extension" (
    "eid" SERIAL NOT NULL,
    "extname" VARCHAR(25) NOT NULL,

    CONSTRAINT "l76aj_extrawatch_dm_extension_pkey" PRIMARY KEY ("eid")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_dm_paths" (
    "did" SERIAL NOT NULL,
    "dname" VARCHAR(255) NOT NULL,
    "allowedReferrer" VARCHAR(255),
    "addedManually" INTEGER,

    CONSTRAINT "l76aj_extrawatch_dm_paths_pkey" PRIMARY KEY ("did")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_dm_referrer" (
    "id" SERIAL NOT NULL,
    "referrer" VARCHAR(255),

    CONSTRAINT "l76aj_extrawatch_dm_referrer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_flow" (
    "id" SERIAL NOT NULL,
    "from" INTEGER,
    "to" INTEGER,
    "count" INTEGER,

    CONSTRAINT "l76aj_extrawatch_flow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_goals" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "username_inversed" VARCHAR(3),
    "parentId" INTEGER,
    "uri_condition" VARCHAR(255),
    "uri_inversed" VARCHAR(3),
    "get_var" VARCHAR(255),
    "get_condition" VARCHAR(255),
    "get_inversed" VARCHAR(3),
    "post_var" VARCHAR(255),
    "post_condition" VARCHAR(255),
    "post_inversed" VARCHAR(3),
    "title_condition" VARCHAR(255),
    "title_inversed" VARCHAR(3),
    "username_condition" VARCHAR(255),
    "ip_condition" VARCHAR(255),
    "ip_inversed" VARCHAR(3),
    "came_from_condition" VARCHAR(255),
    "came_from_inversed" VARCHAR(3),
    "country_condition" VARCHAR(255),
    "country_inversed" VARCHAR(3),
    "block" VARCHAR(255),
    "redirect" VARCHAR(255),
    "disabled" SMALLINT,
    "clicked_element_xpath_condition" VARCHAR(255),
    "send_email" VARCHAR(3),

    CONSTRAINT "l76aj_extrawatch_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_heatmap" (
    "id" SERIAL NOT NULL,
    "uri2titleId" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "w" INTEGER NOT NULL,
    "h" SMALLINT NOT NULL,
    "ip" VARCHAR(255) NOT NULL,
    "day" INTEGER,
    "timestamp" INTEGER,
    "xpath" VARCHAR(1024) NOT NULL,

    CONSTRAINT "l76aj_extrawatch_heatmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_history" (
    "id" BIGSERIAL NOT NULL,
    "ip" VARCHAR(255),
    "country" VARCHAR(2),
    "browser" VARCHAR(255),
    "referer" VARCHAR(255),
    "username" VARCHAR(255),
    "inactive" INTEGER DEFAULT 1,
    "city" VARCHAR(255),
    "latitude" REAL,
    "longitude" REAL,

    CONSTRAINT "l76aj_extrawatch_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_info" (
    "id" BIGSERIAL NOT NULL,
    "group" INTEGER,
    "date" INTEGER,
    "name" VARCHAR(255),
    "value" BIGINT,

    CONSTRAINT "l76aj_extrawatch_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_internal" (
    "id" SERIAL NOT NULL,
    "from" VARCHAR(255),
    "to" VARCHAR(255),
    "timestamp" INTEGER,

    CONSTRAINT "l76aj_extrawatch_internal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_ip2c_cache" (
    "id" SERIAL NOT NULL,
    "ip" VARCHAR(255) NOT NULL,
    "countryCode" VARCHAR(255) NOT NULL,

    CONSTRAINT "l76aj_extrawatch_ip2c_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_keyphrase" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),

    CONSTRAINT "l76aj_extrawatch_keyphrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_sql_scripts" (
    "id" SERIAL NOT NULL,
    "scriptname" VARCHAR(255),

    CONSTRAINT "l76aj_extrawatch_sql_scripts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_uri" (
    "id" BIGSERIAL NOT NULL,
    "fk" BIGINT,
    "timestamp" BIGINT,
    "uri" VARCHAR(255),
    "title" VARCHAR(255),

    CONSTRAINT "l76aj_extrawatch_uri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_uri2keyphrase" (
    "id" SERIAL NOT NULL,
    "uri2titleId" INTEGER NOT NULL,
    "keyphraseId" INTEGER NOT NULL,

    CONSTRAINT "l76aj_extrawatch_uri2keyphrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_uri2keyphrase_pos" (
    "id" SERIAL NOT NULL,
    "uri2keyphraseId" INTEGER,
    "position" INTEGER,

    CONSTRAINT "l76aj_extrawatch_uri2keyphrase_pos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_uri2title" (
    "id" SERIAL NOT NULL,
    "uri" VARCHAR(255),
    "title" VARCHAR(255),
    "count" INTEGER DEFAULT 0,
    "timestamp" INTEGER,

    CONSTRAINT "l76aj_extrawatch_uri2title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_uri_history" (
    "id" BIGSERIAL NOT NULL,
    "fk" BIGINT,
    "timestamp" BIGINT,
    "uri" VARCHAR(255),
    "title" VARCHAR(255),

    CONSTRAINT "l76aj_extrawatch_uri_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_uri_post" (
    "id" SERIAL NOT NULL,
    "uriid" INTEGER NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "l76aj_extrawatch_uri_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_user_log" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "countryCode" VARCHAR(255),
    "timestamp" INTEGER,
    "ip" VARCHAR(255),
    "alertSent" INTEGER,

    CONSTRAINT "l76aj_extrawatch_user_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_extrawatch_visit2goal" (
    "visitId" INTEGER NOT NULL,
    "goalId" INTEGER NOT NULL,
    "timestamp" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_compmenus" (
    "id" SERIAL NOT NULL,
    "package" VARCHAR(30) NOT NULL DEFAULT '',
    "parent" INTEGER NOT NULL DEFAULT 0,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "img" VARCHAR(255) NOT NULL DEFAULT '',
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "page" INTEGER NOT NULL DEFAULT 1,
    "frame" SMALLINT NOT NULL DEFAULT 0,
    "border" SMALLINT NOT NULL DEFAULT 0,
    "params" TEXT,

    CONSTRAINT "l76aj_facileforms_compmenus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_config" (
    "id" VARCHAR(30) NOT NULL DEFAULT '',
    "value" TEXT,

    CONSTRAINT "l76aj_facileforms_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_elements" (
    "id" SERIAL NOT NULL,
    "form" INTEGER NOT NULL DEFAULT 0,
    "page" INTEGER NOT NULL DEFAULT 1,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "type" VARCHAR(50) NOT NULL DEFAULT '',
    "class1" VARCHAR(30),
    "class2" VARCHAR(30),
    "logging" SMALLINT NOT NULL DEFAULT 1,
    "posx" INTEGER,
    "posxmode" SMALLINT NOT NULL DEFAULT 0,
    "posy" INTEGER,
    "posymode" SMALLINT NOT NULL DEFAULT 0,
    "width" INTEGER,
    "widthmode" SMALLINT NOT NULL DEFAULT 0,
    "height" INTEGER,
    "heightmode" SMALLINT NOT NULL DEFAULT 0,
    "flag1" SMALLINT NOT NULL DEFAULT 0,
    "flag2" SMALLINT NOT NULL DEFAULT 0,
    "data1" TEXT,
    "data2" TEXT,
    "data3" TEXT,
    "script1cond" SMALLINT NOT NULL DEFAULT 0,
    "script1id" INTEGER,
    "script1code" TEXT,
    "script1flag1" SMALLINT NOT NULL DEFAULT 0,
    "script1flag2" SMALLINT NOT NULL DEFAULT 0,
    "script2cond" SMALLINT NOT NULL DEFAULT 0,
    "script2id" INTEGER,
    "script2code" TEXT,
    "script2flag1" SMALLINT NOT NULL DEFAULT 0,
    "script2flag2" SMALLINT NOT NULL DEFAULT 0,
    "script2flag3" SMALLINT NOT NULL DEFAULT 0,
    "script2flag4" SMALLINT NOT NULL DEFAULT 0,
    "script2flag5" SMALLINT NOT NULL DEFAULT 0,
    "script3cond" SMALLINT NOT NULL DEFAULT 0,
    "script3id" INTEGER,
    "script3code" TEXT,
    "script3msg" TEXT,
    "mailback" SMALLINT NOT NULL DEFAULT 0,
    "mailbackfile" TEXT NOT NULL,

    CONSTRAINT "l76aj_facileforms_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_forms" (
    "id" SERIAL NOT NULL,
    "alt_mailfrom" TEXT,
    "alt_fromname" TEXT,
    "mb_alt_mailfrom" TEXT,
    "mb_alt_fromname" TEXT,
    "mailchimp_email_field" VARCHAR(255) NOT NULL DEFAULT '',
    "mailchimp_checkbox_field" VARCHAR(255) NOT NULL DEFAULT '',
    "mailchimp_api_key" VARCHAR(255) NOT NULL DEFAULT '',
    "mailchimp_list_id" VARCHAR(255) NOT NULL DEFAULT '',
    "mailchimp_double_optin" SMALLINT NOT NULL DEFAULT 1,
    "mailchimp_mergevars" TEXT,
    "mailchimp_text_html_mobile_field" VARCHAR(255) NOT NULL DEFAULT '',
    "mailchimp_send_errors" SMALLINT NOT NULL DEFAULT 0,
    "mailchimp_update_existing" SMALLINT NOT NULL DEFAULT 0,
    "mailchimp_replace_interests" SMALLINT NOT NULL DEFAULT 0,
    "mailchimp_send_welcome" SMALLINT NOT NULL DEFAULT 0,
    "mailchimp_default_type" VARCHAR(255) NOT NULL DEFAULT 'text',
    "mailchimp_delete_member" SMALLINT NOT NULL DEFAULT 0,
    "mailchimp_send_goodbye" SMALLINT NOT NULL DEFAULT 1,
    "mailchimp_send_notify" SMALLINT NOT NULL DEFAULT 1,
    "mailchimp_unsubscribe_field" VARCHAR(255) NOT NULL DEFAULT '',
    "salesforce_token" VARCHAR(255) NOT NULL DEFAULT '',
    "salesforce_username" VARCHAR(255) NOT NULL DEFAULT '',
    "salesforce_password" VARCHAR(255) NOT NULL DEFAULT '',
    "salesforce_type" VARCHAR(255) NOT NULL DEFAULT '',
    "salesforce_fields" TEXT,
    "salesforce_enabled" SMALLINT NOT NULL DEFAULT 0,
    "dropbox_email" VARCHAR(255) NOT NULL DEFAULT '',
    "dropbox_password" VARCHAR(255) NOT NULL DEFAULT '',
    "dropbox_folder" TEXT,
    "dropbox_submission_enabled" SMALLINT NOT NULL DEFAULT 0,
    "dropbox_submission_types" VARCHAR(255) NOT NULL DEFAULT 'pdf',
    "package" VARCHAR(30) NOT NULL DEFAULT '',
    "template_code" TEXT NOT NULL,
    "template_code_processed" TEXT NOT NULL,
    "template_areas" TEXT NOT NULL,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "runmode" SMALLINT NOT NULL DEFAULT 0,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "custom_mail_subject" VARCHAR(255) NOT NULL DEFAULT '',
    "mb_custom_mail_subject" VARCHAR(255) NOT NULL DEFAULT '',
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "description" TEXT,
    "class1" VARCHAR(30),
    "class2" VARCHAR(30),
    "width" INTEGER NOT NULL DEFAULT 0,
    "widthmode" SMALLINT NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL DEFAULT 0,
    "heightmode" SMALLINT NOT NULL DEFAULT 0,
    "pages" INTEGER NOT NULL DEFAULT 1,
    "emailntf" SMALLINT NOT NULL DEFAULT 1,
    "mb_emailntf" SMALLINT NOT NULL DEFAULT 1,
    "emaillog" SMALLINT NOT NULL DEFAULT 1,
    "mb_emaillog" SMALLINT NOT NULL DEFAULT 1,
    "emailxml" SMALLINT NOT NULL DEFAULT 0,
    "mb_emailxml" SMALLINT NOT NULL DEFAULT 0,
    "email_type" SMALLINT NOT NULL DEFAULT 0,
    "mb_email_type" SMALLINT NOT NULL DEFAULT 0,
    "email_custom_template" TEXT,
    "mb_email_custom_template" TEXT,
    "email_custom_html" SMALLINT NOT NULL DEFAULT 0,
    "mb_email_custom_html" SMALLINT NOT NULL DEFAULT 0,
    "emailadr" TEXT,
    "dblog" SMALLINT NOT NULL DEFAULT 1,
    "script1cond" SMALLINT NOT NULL DEFAULT 0,
    "script1id" INTEGER,
    "script1code" TEXT,
    "script2cond" SMALLINT NOT NULL DEFAULT 0,
    "script2id" INTEGER,
    "script2code" TEXT,
    "piece1cond" SMALLINT NOT NULL DEFAULT 0,
    "piece1id" INTEGER,
    "piece1code" TEXT,
    "piece2cond" SMALLINT NOT NULL DEFAULT 0,
    "piece2id" INTEGER,
    "piece2code" TEXT,
    "piece3cond" SMALLINT NOT NULL DEFAULT 0,
    "piece3id" INTEGER,
    "piece3code" TEXT,
    "piece4cond" SMALLINT NOT NULL DEFAULT 0,
    "piece4id" INTEGER,
    "piece4code" TEXT,
    "prevmode" SMALLINT NOT NULL DEFAULT 2,
    "prevwidth" INTEGER,

    CONSTRAINT "l76aj_facileforms_forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_integrator_criteria_fixed" (
    "id" SERIAL NOT NULL,
    "rule_id" INTEGER NOT NULL,
    "reference_column" VARCHAR(255) NOT NULL,
    "operator" VARCHAR(255) NOT NULL,
    "fixed_value" TEXT NOT NULL,
    "andor" VARCHAR(3) NOT NULL DEFAULT 'AND',

    CONSTRAINT "l76aj_facileforms_integrator_criteria_fixed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_integrator_criteria_form" (
    "id" SERIAL NOT NULL,
    "rule_id" INTEGER NOT NULL,
    "reference_column" VARCHAR(255) NOT NULL,
    "operator" VARCHAR(255) NOT NULL,
    "element_id" VARCHAR(255) NOT NULL,
    "andor" VARCHAR(3) NOT NULL DEFAULT 'AND',

    CONSTRAINT "l76aj_facileforms_integrator_criteria_form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_integrator_criteria_joomla" (
    "id" SERIAL NOT NULL,
    "rule_id" INTEGER NOT NULL,
    "reference_column" VARCHAR(255) NOT NULL,
    "operator" VARCHAR(255) NOT NULL,
    "joomla_object" VARCHAR(255) NOT NULL,
    "andor" VARCHAR(3) NOT NULL DEFAULT 'AND',

    CONSTRAINT "l76aj_facileforms_integrator_criteria_joomla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_integrator_items" (
    "id" SERIAL NOT NULL,
    "rule_id" INTEGER NOT NULL,
    "element_id" INTEGER NOT NULL,
    "reference_column" VARCHAR(255) NOT NULL,
    "code" TEXT NOT NULL,
    "published" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "l76aj_facileforms_integrator_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_integrator_rules" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "form_id" INTEGER NOT NULL,
    "reference_table" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL DEFAULT 'insert',
    "published" SMALLINT NOT NULL DEFAULT 1,
    "finalize_code" TEXT NOT NULL,

    CONSTRAINT "l76aj_facileforms_integrator_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_packages" (
    "id" VARCHAR(30) NOT NULL DEFAULT '',
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "version" VARCHAR(30) NOT NULL DEFAULT '',
    "created" VARCHAR(20) NOT NULL DEFAULT '',
    "title" VARCHAR(50) NOT NULL DEFAULT '',
    "author" VARCHAR(50) NOT NULL DEFAULT '',
    "email" VARCHAR(50) NOT NULL DEFAULT '',
    "url" VARCHAR(50) NOT NULL DEFAULT '',
    "description" VARCHAR(100) NOT NULL DEFAULT '',
    "copyright" VARCHAR(100) NOT NULL DEFAULT '',

    CONSTRAINT "l76aj_facileforms_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_pieces" (
    "id" SERIAL NOT NULL,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "package" VARCHAR(30) NOT NULL DEFAULT '',
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "description" TEXT,
    "type" VARCHAR(30) NOT NULL DEFAULT '',
    "code" TEXT,

    CONSTRAINT "l76aj_facileforms_pieces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_records" (
    "id" SERIAL NOT NULL,
    "submitted" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "form" INTEGER NOT NULL DEFAULT 0,
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "ip" VARCHAR(30) NOT NULL DEFAULT '',
    "browser" VARCHAR(255) NOT NULL DEFAULT '',
    "opsys" VARCHAR(255) NOT NULL DEFAULT '',
    "provider" VARCHAR(255) NOT NULL DEFAULT '',
    "viewed" SMALLINT NOT NULL DEFAULT 0,
    "exported" SMALLINT NOT NULL DEFAULT 0,
    "archived" SMALLINT NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL DEFAULT 0,
    "username" VARCHAR(255) NOT NULL DEFAULT '',
    "user_full_name" VARCHAR(255) NOT NULL DEFAULT '',
    "paypal_tx_id" VARCHAR(255) NOT NULL DEFAULT '',
    "paypal_payment_date" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "paypal_testaccount" SMALLINT NOT NULL DEFAULT 0,
    "paypal_download_tries" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_facileforms_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_scripts" (
    "id" SERIAL NOT NULL,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "package" VARCHAR(30) NOT NULL DEFAULT '',
    "name" VARCHAR(30) NOT NULL DEFAULT '',
    "title" VARCHAR(50) NOT NULL DEFAULT '',
    "description" TEXT,
    "type" VARCHAR(30) NOT NULL DEFAULT '',
    "code" TEXT,

    CONSTRAINT "l76aj_facileforms_scripts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_facileforms_subrecords" (
    "id" SERIAL NOT NULL,
    "record" INTEGER NOT NULL DEFAULT 0,
    "element" INTEGER NOT NULL DEFAULT 0,
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "type" VARCHAR(255) NOT NULL DEFAULT '',
    "value" TEXT,

    CONSTRAINT "l76aj_facileforms_subrecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_filters" (
    "filter_id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "alias" VARCHAR(255) NOT NULL,
    "state" SMALLINT NOT NULL DEFAULT 1,
    "created" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "created_by" BIGINT NOT NULL,
    "created_by_alias" VARCHAR(255) NOT NULL,
    "modified" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "modified_by" BIGINT NOT NULL DEFAULT 0,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "map_count" BIGINT NOT NULL DEFAULT 0,
    "data" TEXT NOT NULL,
    "params" TEXT,

    CONSTRAINT "l76aj_finder_filters_pkey" PRIMARY KEY ("filter_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links" (
    "link_id" BIGSERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "route" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "indexdate" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "md5sum" VARCHAR(32),
    "published" SMALLINT NOT NULL DEFAULT 1,
    "state" INTEGER DEFAULT 1,
    "access" INTEGER DEFAULT 0,
    "language" VARCHAR(8) NOT NULL,
    "publish_start_date" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_end_date" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "start_date" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "end_date" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "list_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sale_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "type_id" INTEGER NOT NULL,
    "object" BYTEA NOT NULL,

    CONSTRAINT "l76aj_finder_links_pkey" PRIMARY KEY ("link_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms0" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms0_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms1" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms1_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms2" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms2_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms3" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms3_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms4" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms4_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms5" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms5_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms6" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms6_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms7" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms7_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms8" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms8_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_terms9" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_terms9_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_termsa" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_termsa_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_termsb" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_termsb_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_termsc" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_termsc_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_termsd" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_termsd_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_termse" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_termse_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_links_termsf" (
    "link_id" BIGINT NOT NULL,
    "term_id" BIGINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "l76aj_finder_links_termsf_pkey" PRIMARY KEY ("link_id","term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_taxonomy" (
    "id" BIGSERIAL NOT NULL,
    "parent_id" BIGINT NOT NULL DEFAULT 0,
    "title" VARCHAR(255) NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "access" INTEGER NOT NULL DEFAULT 0,
    "ordering" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_finder_taxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_taxonomy_map" (
    "link_id" BIGINT NOT NULL,
    "node_id" BIGINT NOT NULL,

    CONSTRAINT "l76aj_finder_taxonomy_map_pkey" PRIMARY KEY ("link_id","node_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_terms" (
    "term_id" BIGSERIAL NOT NULL,
    "term" VARCHAR(75) NOT NULL,
    "stem" VARCHAR(75) NOT NULL,
    "common" INTEGER NOT NULL DEFAULT 0,
    "phrase" INTEGER NOT NULL DEFAULT 0,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "soundex" VARCHAR(75) NOT NULL,
    "links" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_finder_terms_pkey" PRIMARY KEY ("term_id")
);

-- CreateTable
CREATE TABLE "l76aj_finder_terms_common" (
    "term" VARCHAR(75) NOT NULL,
    "language" VARCHAR(3) NOT NULL
);

-- CreateTable
CREATE TABLE "l76aj_finder_tokens" (
    "term" VARCHAR(75) NOT NULL,
    "stem" VARCHAR(75) NOT NULL,
    "common" INTEGER NOT NULL DEFAULT 0,
    "phrase" INTEGER NOT NULL DEFAULT 0,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "context" INTEGER NOT NULL DEFAULT 2
);

-- CreateTable
CREATE TABLE "l76aj_finder_tokens_aggregate" (
    "term_id" BIGINT NOT NULL,
    "map_suffix" CHAR(1) NOT NULL,
    "term" VARCHAR(75) NOT NULL,
    "stem" VARCHAR(75) NOT NULL,
    "common" INTEGER NOT NULL DEFAULT 0,
    "phrase" INTEGER NOT NULL DEFAULT 0,
    "term_weight" DOUBLE PRECISION NOT NULL,
    "context" INTEGER NOT NULL DEFAULT 2,
    "context_weight" DOUBLE PRECISION NOT NULL,
    "total_weight" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "l76aj_finder_types" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "mime" VARCHAR(100) NOT NULL,

    CONSTRAINT "l76aj_finder_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_languages" (
    "lang_id" BIGSERIAL NOT NULL,
    "lang_code" CHAR(7) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "title_native" VARCHAR(50) NOT NULL,
    "sef" VARCHAR(50) NOT NULL,
    "image" VARCHAR(50) NOT NULL,
    "description" VARCHAR(512) NOT NULL,
    "metakey" TEXT NOT NULL,
    "metadesc" TEXT NOT NULL,
    "sitename" VARCHAR(1024) NOT NULL DEFAULT '',
    "published" INTEGER NOT NULL DEFAULT 0,
    "access" BIGINT NOT NULL DEFAULT 0,
    "ordering" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_languages_pkey" PRIMARY KEY ("lang_id")
);

-- CreateTable
CREATE TABLE "l76aj_menu" (
    "id" SERIAL NOT NULL,
    "menutype" VARCHAR(24) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "alias" VARCHAR(255) NOT NULL,
    "note" VARCHAR(255) NOT NULL DEFAULT '',
    "path" VARCHAR(1024) NOT NULL,
    "link" VARCHAR(1024) NOT NULL,
    "type" VARCHAR(16) NOT NULL,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "parent_id" BIGINT NOT NULL DEFAULT 1,
    "level" BIGINT NOT NULL DEFAULT 0,
    "component_id" BIGINT NOT NULL DEFAULT 0,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "browserNav" SMALLINT NOT NULL DEFAULT 0,
    "access" BIGINT NOT NULL DEFAULT 0,
    "img" VARCHAR(255) NOT NULL,
    "template_style_id" BIGINT NOT NULL DEFAULT 0,
    "params" TEXT NOT NULL,
    "lft" INTEGER NOT NULL DEFAULT 0,
    "rgt" INTEGER NOT NULL DEFAULT 0,
    "home" INTEGER NOT NULL DEFAULT 0,
    "language" CHAR(7) NOT NULL DEFAULT '',
    "client_id" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_menu_types" (
    "id" BIGSERIAL NOT NULL,
    "menutype" VARCHAR(24) NOT NULL,
    "title" VARCHAR(48) NOT NULL,
    "description" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "l76aj_menu_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_messages" (
    "message_id" BIGSERIAL NOT NULL,
    "user_id_from" BIGINT NOT NULL DEFAULT 0,
    "user_id_to" BIGINT NOT NULL DEFAULT 0,
    "folder_id" INTEGER NOT NULL DEFAULT 0,
    "date_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "state" SMALLINT NOT NULL DEFAULT 0,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "subject" VARCHAR(255) NOT NULL DEFAULT '',
    "message" TEXT NOT NULL,

    CONSTRAINT "l76aj_messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "l76aj_messages_cfg" (
    "user_id" BIGINT NOT NULL DEFAULT 0,
    "cfg_name" VARCHAR(100) NOT NULL DEFAULT '',
    "cfg_value" VARCHAR(255) NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "l76aj_modules" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL DEFAULT '',
    "note" VARCHAR(255) NOT NULL DEFAULT '',
    "content" TEXT NOT NULL,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "position" VARCHAR(50) NOT NULL DEFAULT '',
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_up" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_down" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "module" VARCHAR(50),
    "access" BIGINT,
    "showtitle" INTEGER NOT NULL DEFAULT 1,
    "params" TEXT NOT NULL,
    "client_id" SMALLINT NOT NULL DEFAULT 0,
    "language" CHAR(7) NOT NULL,

    CONSTRAINT "l76aj_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_modules_menu" (
    "moduleid" INTEGER NOT NULL DEFAULT 0,
    "menuid" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_modules_menu_pkey" PRIMARY KEY ("moduleid","menuid")
);

-- CreateTable
CREATE TABLE "l76aj_newsfeeds" (
    "catid" INTEGER NOT NULL DEFAULT 0,
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL DEFAULT '',
    "alias" VARCHAR(255) NOT NULL DEFAULT '',
    "link" VARCHAR(200) NOT NULL DEFAULT '',
    "filename" VARCHAR(200),
    "published" SMALLINT NOT NULL DEFAULT 0,
    "numarticles" BIGINT NOT NULL DEFAULT 1,
    "cache_time" BIGINT NOT NULL DEFAULT 3600,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "rtl" SMALLINT NOT NULL DEFAULT 0,
    "access" BIGINT NOT NULL DEFAULT 0,
    "language" CHAR(7) NOT NULL DEFAULT '',
    "params" TEXT NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "created_by" BIGINT NOT NULL DEFAULT 0,
    "created_by_alias" VARCHAR(255) NOT NULL DEFAULT '',
    "modified" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "modified_by" BIGINT NOT NULL DEFAULT 0,
    "metakey" TEXT NOT NULL,
    "metadesc" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "xreference" VARCHAR(50) NOT NULL,
    "publish_up" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_down" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,

    CONSTRAINT "l76aj_newsfeeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_overrider" (
    "id" SERIAL NOT NULL,
    "constant" VARCHAR(255) NOT NULL,
    "string" TEXT NOT NULL,
    "file" VARCHAR(255) NOT NULL,

    CONSTRAINT "l76aj_overrider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_redirect_links" (
    "id" BIGSERIAL NOT NULL,
    "old_url" VARCHAR(255) NOT NULL,
    "new_url" VARCHAR(255) NOT NULL,
    "referer" VARCHAR(150) NOT NULL,
    "comment" VARCHAR(255) NOT NULL,
    "hits" BIGINT NOT NULL DEFAULT 0,
    "published" SMALLINT NOT NULL,
    "created_date" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "modified_date" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,

    CONSTRAINT "l76aj_redirect_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_rsformpro2breezingforms_import" (
    "rsformid" INTEGER NOT NULL,
    "bfformid" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "l76aj_rsformpro2breezingforms_submissions_import" (
    "rsformid" INTEGER NOT NULL,
    "rssubmissionid" INTEGER NOT NULL,
    "bfformid" INTEGER NOT NULL,
    "bfrecordid" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "l76aj_schemas" (
    "extension_id" INTEGER NOT NULL,
    "version_id" VARCHAR(20) NOT NULL,

    CONSTRAINT "l76aj_schemas_pkey" PRIMARY KEY ("extension_id","version_id")
);

-- CreateTable
CREATE TABLE "l76aj_session" (
    "session_id" VARCHAR(200) NOT NULL DEFAULT '',
    "client_id" INTEGER NOT NULL DEFAULT 0,
    "guest" INTEGER DEFAULT 1,
    "time" VARCHAR(14) DEFAULT '',
    "data" TEXT,
    "userid" INTEGER DEFAULT 0,
    "username" VARCHAR(150) DEFAULT '',
    "usertype" VARCHAR(50) DEFAULT '',

    CONSTRAINT "l76aj_session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "l76aj_swmenufree_styles" (
    "id" INTEGER NOT NULL,
    "params" TEXT,

    CONSTRAINT "l76aj_swmenufree_styles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_template_styles" (
    "id" BIGSERIAL NOT NULL,
    "template" VARCHAR(50) NOT NULL DEFAULT '',
    "client_id" INTEGER NOT NULL DEFAULT 0,
    "home" CHAR(7) NOT NULL DEFAULT '0',
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "params" TEXT NOT NULL,

    CONSTRAINT "l76aj_template_styles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_update_categories" (
    "categoryid" SERIAL NOT NULL,
    "name" VARCHAR(20) DEFAULT '',
    "description" TEXT NOT NULL,
    "parent" INTEGER DEFAULT 0,
    "updatesite" INTEGER DEFAULT 0,

    CONSTRAINT "l76aj_update_categories_pkey" PRIMARY KEY ("categoryid")
);

-- CreateTable
CREATE TABLE "l76aj_update_sites" (
    "update_site_id" SERIAL NOT NULL,
    "name" VARCHAR(100) DEFAULT '',
    "type" VARCHAR(20) DEFAULT '',
    "location" TEXT NOT NULL,
    "enabled" INTEGER DEFAULT 0,
    "last_check_timestamp" BIGINT DEFAULT 0,

    CONSTRAINT "l76aj_update_sites_pkey" PRIMARY KEY ("update_site_id")
);

-- CreateTable
CREATE TABLE "l76aj_update_sites_extensions" (
    "update_site_id" INTEGER NOT NULL DEFAULT 0,
    "extension_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_update_sites_extensions_pkey" PRIMARY KEY ("update_site_id","extension_id")
);

-- CreateTable
CREATE TABLE "l76aj_updates" (
    "update_id" SERIAL NOT NULL,
    "update_site_id" INTEGER DEFAULT 0,
    "extension_id" INTEGER DEFAULT 0,
    "categoryid" INTEGER DEFAULT 0,
    "name" VARCHAR(100) DEFAULT '',
    "description" TEXT NOT NULL,
    "element" VARCHAR(100) DEFAULT '',
    "type" VARCHAR(20) DEFAULT '',
    "folder" VARCHAR(20) DEFAULT '',
    "client_id" SMALLINT DEFAULT 0,
    "version" VARCHAR(10) DEFAULT '',
    "data" TEXT NOT NULL,
    "detailsurl" TEXT NOT NULL,
    "infourl" TEXT NOT NULL,

    CONSTRAINT "l76aj_updates_pkey" PRIMARY KEY ("update_id")
);

-- CreateTable
CREATE TABLE "l76aj_user_notes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL DEFAULT 0,
    "catid" BIGINT NOT NULL DEFAULT 0,
    "subject" VARCHAR(100) NOT NULL DEFAULT '',
    "body" TEXT NOT NULL,
    "state" SMALLINT NOT NULL DEFAULT 0,
    "checked_out" BIGINT NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "created_user_id" BIGINT NOT NULL DEFAULT 0,
    "created_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "modified_user_id" BIGINT NOT NULL,
    "modified_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "review_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_up" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_down" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,

    CONSTRAINT "l76aj_user_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_user_profiles" (
    "user_id" INTEGER NOT NULL,
    "profile_key" VARCHAR(100) NOT NULL,
    "profile_value" VARCHAR(255) NOT NULL,
    "ordering" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "l76aj_user_usergroup_map" (
    "user_id" BIGINT NOT NULL DEFAULT 0,
    "group_id" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_user_usergroup_map_pkey" PRIMARY KEY ("user_id","group_id")
);

-- CreateTable
CREATE TABLE "l76aj_usergroups" (
    "id" BIGSERIAL NOT NULL,
    "parent_id" BIGINT NOT NULL DEFAULT 0,
    "lft" INTEGER NOT NULL DEFAULT 0,
    "rgt" INTEGER NOT NULL DEFAULT 0,
    "title" VARCHAR(100) NOT NULL DEFAULT '',

    CONSTRAINT "l76aj_usergroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "username" VARCHAR(150) NOT NULL DEFAULT '',
    "email" VARCHAR(100) NOT NULL DEFAULT '',
    "password" VARCHAR(100) NOT NULL DEFAULT '',
    "usertype" VARCHAR(25) NOT NULL DEFAULT '',
    "block" SMALLINT NOT NULL DEFAULT 0,
    "sendEmail" SMALLINT DEFAULT 0,
    "registerDate" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "lastvisitDate" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "activation" VARCHAR(100) NOT NULL DEFAULT '',
    "params" TEXT NOT NULL,
    "lastResetTime" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "resetCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_viewlevels" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL DEFAULT '',
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "rules" VARCHAR(5120) NOT NULL,

    CONSTRAINT "l76aj_viewlevels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_weblinks" (
    "id" BIGSERIAL NOT NULL,
    "catid" INTEGER NOT NULL DEFAULT 0,
    "sid" INTEGER NOT NULL DEFAULT 0,
    "title" VARCHAR(250) NOT NULL DEFAULT '',
    "alias" VARCHAR(255) NOT NULL DEFAULT '',
    "url" VARCHAR(250) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "hits" INTEGER NOT NULL DEFAULT 0,
    "state" SMALLINT NOT NULL DEFAULT 0,
    "checked_out" INTEGER NOT NULL DEFAULT 0,
    "checked_out_time" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "archived" SMALLINT NOT NULL DEFAULT 0,
    "approved" SMALLINT NOT NULL DEFAULT 1,
    "access" INTEGER NOT NULL DEFAULT 1,
    "params" TEXT NOT NULL,
    "language" CHAR(7) NOT NULL DEFAULT '',
    "created" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "created_by" BIGINT NOT NULL DEFAULT 0,
    "created_by_alias" VARCHAR(255) NOT NULL DEFAULT '',
    "modified" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "modified_by" BIGINT NOT NULL DEFAULT 0,
    "metakey" TEXT NOT NULL,
    "metadesc" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "featured" INTEGER NOT NULL DEFAULT 0,
    "xreference" VARCHAR(50) NOT NULL,
    "publish_up" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "publish_down" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,

    CONSTRAINT "l76aj_weblinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_wf_profiles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "users" TEXT NOT NULL,
    "types" TEXT,
    "components" TEXT NOT NULL,
    "area" SMALLINT NOT NULL,
    "device" VARCHAR(255) NOT NULL,
    "rows" TEXT NOT NULL,
    "plugins" TEXT NOT NULL,
    "published" SMALLINT NOT NULL,
    "ordering" INTEGER NOT NULL,
    "checked_out" SMALLINT NOT NULL,
    "checked_out_time" TIMESTAMP(6) NOT NULL,
    "params" TEXT NOT NULL,

    CONSTRAINT "l76aj_wf_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_widgetkit_widget" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "style" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "created" TIMESTAMP(6) NOT NULL,
    "modified" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "l76aj_widgetkit_widget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_xformsdr_elements" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL DEFAULT 0,
    "reference_id" VARCHAR(255) NOT NULL DEFAULT '',
    "type" VARCHAR(255) NOT NULL,
    "change_type" VARCHAR(255) NOT NULL,
    "options" TEXT NOT NULL,
    "custom_init_script" TEXT NOT NULL,
    "custom_action_script" TEXT NOT NULL,
    "custom_validation_script" TEXT NOT NULL,
    "validation_message" TEXT NOT NULL,
    "default_value" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "list_include" SMALLINT NOT NULL DEFAULT 0,
    "search_include" SMALLINT NOT NULL DEFAULT 1,
    "item_wrapper" TEXT NOT NULL,
    "wordwrap" INTEGER NOT NULL DEFAULT 0,
    "linkable" SMALLINT NOT NULL DEFAULT 1,
    "editable" SMALLINT NOT NULL,
    "published" SMALLINT NOT NULL DEFAULT 1,
    "ordering" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_xformsdr_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_xformsdr_forms" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL DEFAULT '',
    "reference_id" VARCHAR(255) NOT NULL DEFAULT '',
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "title" VARCHAR(255) NOT NULL DEFAULT '',
    "details_template" TEXT NOT NULL,
    "details_prepare" TEXT NOT NULL,
    "editable_template" TEXT NOT NULL,
    "editable_prepare" TEXT NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "modified" TIMESTAMP(6) NOT NULL DEFAULT '-infinity'::timestamp without time zone,
    "created_by" VARCHAR(255) NOT NULL DEFAULT '',
    "modified_by" VARCHAR(255) NOT NULL DEFAULT '',
    "metadata" SMALLINT NOT NULL DEFAULT 1,
    "export_xls" SMALLINT NOT NULL DEFAULT 0,
    "print_button" SMALLINT NOT NULL DEFAULT 1,
    "show_id_column" SMALLINT NOT NULL DEFAULT 0,
    "use_view_name_as_title" SMALLINT NOT NULL DEFAULT 0,
    "display_in" SMALLINT NOT NULL DEFAULT 0,
    "edit_button" SMALLINT NOT NULL,
    "list_state" SMALLINT NOT NULL,
    "list_publish" SMALLINT NOT NULL,
    "select_column" SMALLINT NOT NULL,
    "published_only" SMALLINT NOT NULL DEFAULT 0,
    "own_only" SMALLINT NOT NULL,
    "own_only_fe" SMALLINT NOT NULL,
    "ordering" INTEGER NOT NULL DEFAULT 0,
    "intro_text" TEXT NOT NULL,
    "config" TEXT NOT NULL,
    "published" SMALLINT NOT NULL DEFAULT 0,
    "initial_sort_order" VARCHAR(255) NOT NULL,

    CONSTRAINT "l76aj_xformsdr_forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_xformsdr_list_states" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "published" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "l76aj_xformsdr_list_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "l76aj_xformsdr_records" (
    "id" BIGSERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "record_id" VARCHAR(255) NOT NULL,
    "state_id" INTEGER NOT NULL,
    "reference_id" VARCHAR(255) NOT NULL,
    "published" SMALLINT NOT NULL,

    CONSTRAINT "l76aj_xformsdr_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "main_categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "main_categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "sub_categories" (
    "sub_category_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "sub_category_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("sub_category_id")
);

-- CreateTable
CREATE TABLE "titles" (
    "title_id" SERIAL NOT NULL,
    "sub_category_id" INTEGER NOT NULL,
    "title_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "sub_titles_pkey" PRIMARY KEY ("title_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_assets_name_idx" ON "l76aj_assets"("name");

-- CreateIndex
CREATE INDEX "l76aj_assets_lft_rgt_idx" ON "l76aj_assets"("lft", "rgt");

-- CreateIndex
CREATE INDEX "l76aj_assets_parent_id_idx" ON "l76aj_assets"("parent_id");

-- CreateIndex
CREATE INDEX "l76aj_associations_key_idx" ON "l76aj_associations"("key");

-- CreateIndex
CREATE INDEX "l76aj_banner_clients_metakey_prefix_idx" ON "l76aj_banner_clients"("metakey_prefix");

-- CreateIndex
CREATE INDEX "l76aj_banner_clients_own_prefix_idx" ON "l76aj_banner_clients"("own_prefix");

-- CreateIndex
CREATE INDEX "l76aj_banner_tracks_banner_id_idx" ON "l76aj_banner_tracks"("banner_id");

-- CreateIndex
CREATE INDEX "l76aj_banner_tracks_track_date_idx" ON "l76aj_banner_tracks"("track_date");

-- CreateIndex
CREATE INDEX "l76aj_banner_tracks_track_type_idx" ON "l76aj_banner_tracks"("track_type");

-- CreateIndex
CREATE INDEX "l76aj_banners_catid_idx" ON "l76aj_banners"("catid");

-- CreateIndex
CREATE INDEX "l76aj_banners_language_idx" ON "l76aj_banners"("language");

-- CreateIndex
CREATE INDEX "l76aj_banners_metakey_prefix_idx" ON "l76aj_banners"("metakey_prefix");

-- CreateIndex
CREATE INDEX "l76aj_banners_own_prefix_idx" ON "l76aj_banners"("own_prefix");

-- CreateIndex
CREATE INDEX "l76aj_banners_state_idx" ON "l76aj_banners"("state");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_breezingforms_addons_gdata_form_id_idx" ON "l76aj_breezingforms_addons_gdata"("form_id");

-- CreateIndex
CREATE INDEX "l76aj_breezingforms_addons79077-c4f5-4538-a02d-de6fb5c19849_idx" ON "l76aj_breezingforms_addons_gdata"("form_id", "spreadsheet_id", "worksheet_id");

-- CreateIndex
CREATE INDEX "l76aj_categories_access_idx" ON "l76aj_categories"("access");

-- CreateIndex
CREATE INDEX "l76aj_categories_alias_idx" ON "l76aj_categories"("alias");

-- CreateIndex
CREATE INDEX "l76aj_categories_checked_out_idx" ON "l76aj_categories"("checked_out");

-- CreateIndex
CREATE INDEX "l76aj_categories_extension_published_access_idx" ON "l76aj_categories"("extension", "published", "access");

-- CreateIndex
CREATE INDEX "l76aj_categories_language_idx" ON "l76aj_categories"("language");

-- CreateIndex
CREATE INDEX "l76aj_categories_lft_rgt_idx" ON "l76aj_categories"("lft", "rgt");

-- CreateIndex
CREATE INDEX "l76aj_categories_path_idx" ON "l76aj_categories"("path");

-- CreateIndex
CREATE INDEX "l76aj_contact_details_access_idx" ON "l76aj_contact_details"("access");

-- CreateIndex
CREATE INDEX "l76aj_contact_details_catid_idx" ON "l76aj_contact_details"("catid");

-- CreateIndex
CREATE INDEX "l76aj_contact_details_checked_out_idx" ON "l76aj_contact_details"("checked_out");

-- CreateIndex
CREATE INDEX "l76aj_contact_details_created_by_idx" ON "l76aj_contact_details"("created_by");

-- CreateIndex
CREATE INDEX "l76aj_contact_details_featured_catid_idx" ON "l76aj_contact_details"("featured", "catid");

-- CreateIndex
CREATE INDEX "l76aj_contact_details_language_idx" ON "l76aj_contact_details"("language");

-- CreateIndex
CREATE INDEX "l76aj_contact_details_published_idx" ON "l76aj_contact_details"("published");

-- CreateIndex
CREATE INDEX "l76aj_contact_details_xreference_idx" ON "l76aj_contact_details"("xreference");

-- CreateIndex
CREATE INDEX "l76aj_content_access_idx" ON "l76aj_content"("access");

-- CreateIndex
CREATE INDEX "l76aj_content_catid_idx" ON "l76aj_content"("catid");

-- CreateIndex
CREATE INDEX "l76aj_content_checked_out_idx" ON "l76aj_content"("checked_out");

-- CreateIndex
CREATE INDEX "l76aj_content_created_by_idx" ON "l76aj_content"("created_by");

-- CreateIndex
CREATE INDEX "l76aj_content_featured_catid_idx" ON "l76aj_content"("featured", "catid");

-- CreateIndex
CREATE INDEX "l76aj_content_language_idx" ON "l76aj_content"("language");

-- CreateIndex
CREATE INDEX "l76aj_content_state_idx" ON "l76aj_content"("state");

-- CreateIndex
CREATE INDEX "l76aj_content_xreference_idx" ON "l76aj_content"("xreference");

-- CreateIndex
CREATE INDEX "l76aj_extensions_element_client_id_idx" ON "l76aj_extensions"("element", "client_id");

-- CreateIndex
CREATE INDEX "l76aj_extensions_element_folder_client_id_idx" ON "l76aj_extensions"("element", "folder", "client_id");

-- CreateIndex
CREATE INDEX "l76aj_extensions_type_element_folder_client_id_idx" ON "l76aj_extensions"("type", "element", "folder", "client_id");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_browser_idx" ON "l76aj_extrawatch"("browser");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_country_idx" ON "l76aj_extrawatch"("country");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_ip_idx" ON "l76aj_extrawatch"("ip");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_blocked_date_idx" ON "l76aj_extrawatch_blocked"("date");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_blocked_ip_idx" ON "l76aj_extrawatch_blocked"("ip");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_cache_key_idx" ON "l76aj_extrawatch_cache"("key");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_cc2c_cc_idx" ON "l76aj_extrawatch_cc2c"("cc");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_extrawatch_config_name_idx" ON "l76aj_extrawatch_config"("name");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_dm_counter_ddate_idx" ON "l76aj_extrawatch_dm_counter"("ddate");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_dm_counter_did_idx" ON "l76aj_extrawatch_dm_counter"("did");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_dm_counter_referrerId_idx" ON "l76aj_extrawatch_dm_counter"("referrerId");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_flow_from_idx" ON "l76aj_extrawatch_flow"("from");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_flow_to_idx" ON "l76aj_extrawatch_flow"("to");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_goals_clicked_element_xpath_condition_idx" ON "l76aj_extrawatch_goals"("clicked_element_xpath_condition");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_heatmap_day_idx" ON "l76aj_extrawatch_heatmap"("day");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_heatmap_uri2titleId_idx" ON "l76aj_extrawatch_heatmap"("uri2titleId");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_history_browser_idx" ON "l76aj_extrawatch_history"("browser");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_history_country_idx" ON "l76aj_extrawatch_history"("country");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_history_ip_idx" ON "l76aj_extrawatch_history"("ip");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_info_date_idx" ON "l76aj_extrawatch_info"("date");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_info_group_idx" ON "l76aj_extrawatch_info"("group");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_info_name_idx" ON "l76aj_extrawatch_info"("name");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_internal_from_idx" ON "l76aj_extrawatch_internal"("from");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_internal_to_idx" ON "l76aj_extrawatch_internal"("to");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_ip2c_cache_ip_idx" ON "l76aj_extrawatch_ip2c_cache"("ip");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_uri_fk_idx" ON "l76aj_extrawatch_uri"("fk");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_uri_timestamp_idx" ON "l76aj_extrawatch_uri"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_extrawatch_uri2title_uri_idx" ON "l76aj_extrawatch_uri2title"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_extrawatch_uri2title_uri_title_idx" ON "l76aj_extrawatch_uri2title"("uri", "title");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_uri_history_fk_idx" ON "l76aj_extrawatch_uri_history"("fk");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_uri_history_timestamp_idx" ON "l76aj_extrawatch_uri_history"("timestamp");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_uri_post_type_idx" ON "l76aj_extrawatch_uri_post"("type");

-- CreateIndex
CREATE INDEX "l76aj_extrawatch_uri_post_uriid_idx" ON "l76aj_extrawatch_uri_post"("uriid");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_md5sum_idx" ON "l76aj_finder_links"("md5sum");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_publish2f7a7-2289-4d4a-ac30-b984df7f06b6_idx" ON "l76aj_finder_links"("published", "state", "access", "publish_start_date", "publish_end_date", "list_price");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_publish4f6ca-cf74-44cb-a6bf-560a4a85d09b_idx" ON "l76aj_finder_links"("published", "state", "access", "publish_start_date", "publish_end_date", "sale_price");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_title_idx" ON "l76aj_finder_links"("title");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_type_id_idx" ON "l76aj_finder_links"("type_id");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_url_idx" ON "l76aj_finder_links"("url");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms0_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms0"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms0_term_id_weight_idx" ON "l76aj_finder_links_terms0"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms1_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms1"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms1_term_id_weight_idx" ON "l76aj_finder_links_terms1"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms2_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms2"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms2_term_id_weight_idx" ON "l76aj_finder_links_terms2"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms3_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms3"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms3_term_id_weight_idx" ON "l76aj_finder_links_terms3"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms4_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms4"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms4_term_id_weight_idx" ON "l76aj_finder_links_terms4"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms5_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms5"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms5_term_id_weight_idx" ON "l76aj_finder_links_terms5"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms6_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms6"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms6_term_id_weight_idx" ON "l76aj_finder_links_terms6"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms7_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms7"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms7_term_id_weight_idx" ON "l76aj_finder_links_terms7"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms8_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms8"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms8_term_id_weight_idx" ON "l76aj_finder_links_terms8"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms9_link_id_term_id_weight_idx" ON "l76aj_finder_links_terms9"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_terms9_term_id_weight_idx" ON "l76aj_finder_links_terms9"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsa_link_id_term_id_weight_idx" ON "l76aj_finder_links_termsa"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsa_term_id_weight_idx" ON "l76aj_finder_links_termsa"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsb_link_id_term_id_weight_idx" ON "l76aj_finder_links_termsb"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsb_term_id_weight_idx" ON "l76aj_finder_links_termsb"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsc_link_id_term_id_weight_idx" ON "l76aj_finder_links_termsc"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsc_term_id_weight_idx" ON "l76aj_finder_links_termsc"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsd_link_id_term_id_weight_idx" ON "l76aj_finder_links_termsd"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsd_term_id_weight_idx" ON "l76aj_finder_links_termsd"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termse_link_id_term_id_weight_idx" ON "l76aj_finder_links_termse"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termse_term_id_weight_idx" ON "l76aj_finder_links_termse"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsf_link_id_term_id_weight_idx" ON "l76aj_finder_links_termsf"("link_id", "term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_links_termsf_term_id_weight_idx" ON "l76aj_finder_links_termsf"("term_id", "weight");

-- CreateIndex
CREATE INDEX "l76aj_finder_taxonomy_access_idx" ON "l76aj_finder_taxonomy"("access");

-- CreateIndex
CREATE INDEX "l76aj_finder_taxonomy_ordering_idx" ON "l76aj_finder_taxonomy"("ordering");

-- CreateIndex
CREATE INDEX "l76aj_finder_taxonomy_parent_id_idx" ON "l76aj_finder_taxonomy"("parent_id");

-- CreateIndex
CREATE INDEX "l76aj_finder_taxonomy_parent_id_state_access_idx" ON "l76aj_finder_taxonomy"("parent_id", "state", "access");

-- CreateIndex
CREATE INDEX "l76aj_finder_taxonomy_state_idx" ON "l76aj_finder_taxonomy"("state");

-- CreateIndex
CREATE INDEX "l76aj_finder_taxonomy_map_link_id_idx" ON "l76aj_finder_taxonomy_map"("link_id");

-- CreateIndex
CREATE INDEX "l76aj_finder_taxonomy_map_node_id_idx" ON "l76aj_finder_taxonomy_map"("node_id");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_finder_terms_term_idx" ON "l76aj_finder_terms"("term");

-- CreateIndex
CREATE INDEX "l76aj_finder_terms_soundex_phrase_idx" ON "l76aj_finder_terms"("soundex", "phrase");

-- CreateIndex
CREATE INDEX "l76aj_finder_terms_stem_phrase_idx" ON "l76aj_finder_terms"("stem", "phrase");

-- CreateIndex
CREATE INDEX "l76aj_finder_terms_term_phrase_idx" ON "l76aj_finder_terms"("term", "phrase");

-- CreateIndex
CREATE INDEX "l76aj_finder_terms_common_language_idx" ON "l76aj_finder_terms_common"("language");

-- CreateIndex
CREATE INDEX "l76aj_finder_terms_common_term_language_idx" ON "l76aj_finder_terms_common"("term", "language");

-- CreateIndex
CREATE INDEX "l76aj_finder_tokens_context_idx" ON "l76aj_finder_tokens" USING HASH ("context");

-- CreateIndex
CREATE INDEX "l76aj_finder_tokens_term_idx" ON "l76aj_finder_tokens" USING HASH ("term");

-- CreateIndex
CREATE INDEX "l76aj_finder_tokens_aggregate_term_id_idx" ON "l76aj_finder_tokens_aggregate" USING HASH ("term_id");

-- CreateIndex
CREATE INDEX "l76aj_finder_tokens_aggregate_term_idx" ON "l76aj_finder_tokens_aggregate" USING HASH ("term");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_finder_types_title_idx" ON "l76aj_finder_types"("title");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_languages_lang_code_idx" ON "l76aj_languages"("lang_code");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_languages_sef_idx" ON "l76aj_languages"("sef");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_languages_image_idx" ON "l76aj_languages"("image");

-- CreateIndex
CREATE INDEX "l76aj_languages_access_idx" ON "l76aj_languages"("access");

-- CreateIndex
CREATE INDEX "l76aj_languages_ordering_idx" ON "l76aj_languages"("ordering");

-- CreateIndex
CREATE INDEX "l76aj_menu_alias_idx" ON "l76aj_menu"("alias");

-- CreateIndex
CREATE INDEX "l76aj_menu_component_id_menutype_published_access_idx" ON "l76aj_menu"("component_id", "menutype", "published", "access");

-- CreateIndex
CREATE INDEX "l76aj_menu_language_idx" ON "l76aj_menu"("language");

-- CreateIndex
CREATE INDEX "l76aj_menu_lft_rgt_idx" ON "l76aj_menu"("lft", "rgt");

-- CreateIndex
CREATE INDEX "l76aj_menu_menutype_idx" ON "l76aj_menu"("menutype");

-- CreateIndex
CREATE INDEX "l76aj_menu_path_idx" ON "l76aj_menu"("path");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_menu_client_id_parent_id_alias_language_idx" ON "l76aj_menu"("client_id", "parent_id", "alias", "language");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_menu_types_menutype_idx" ON "l76aj_menu_types"("menutype");

-- CreateIndex
CREATE INDEX "l76aj_messages_user_id_to_state_idx" ON "l76aj_messages"("user_id_to", "state");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_messages_cfg_user_id_cfg_name_idx" ON "l76aj_messages_cfg"("user_id", "cfg_name");

-- CreateIndex
CREATE INDEX "l76aj_modules_language_idx" ON "l76aj_modules"("language");

-- CreateIndex
CREATE INDEX "l76aj_modules_module_published_idx" ON "l76aj_modules"("module", "published");

-- CreateIndex
CREATE INDEX "l76aj_modules_published_access_idx" ON "l76aj_modules"("published", "access");

-- CreateIndex
CREATE INDEX "l76aj_newsfeeds_access_idx" ON "l76aj_newsfeeds"("access");

-- CreateIndex
CREATE INDEX "l76aj_newsfeeds_catid_idx" ON "l76aj_newsfeeds"("catid");

-- CreateIndex
CREATE INDEX "l76aj_newsfeeds_checked_out_idx" ON "l76aj_newsfeeds"("checked_out");

-- CreateIndex
CREATE INDEX "l76aj_newsfeeds_created_by_idx" ON "l76aj_newsfeeds"("created_by");

-- CreateIndex
CREATE INDEX "l76aj_newsfeeds_language_idx" ON "l76aj_newsfeeds"("language");

-- CreateIndex
CREATE INDEX "l76aj_newsfeeds_published_idx" ON "l76aj_newsfeeds"("published");

-- CreateIndex
CREATE INDEX "l76aj_newsfeeds_xreference_idx" ON "l76aj_newsfeeds"("xreference");

-- CreateIndex
CREATE INDEX "l76aj_redirect_links_modified_date_idx" ON "l76aj_redirect_links"("modified_date");

-- CreateIndex
CREATE INDEX "l76aj_rsformpro2breezingforms_import_rsformid_bfformid_idx" ON "l76aj_rsformpro2breezingforms_import"("rsformid", "bfformid");

-- CreateIndex
CREATE INDEX "l76aj_rsformpro2breezingfo56d7e-a32b-4b2a-8a01-f158a94f0b19_idx" ON "l76aj_rsformpro2breezingforms_submissions_import"("rssubmissionid", "bfrecordid");

-- CreateIndex
CREATE INDEX "l76aj_rsformpro2breezingfo7da84-bd6b-4ada-8eab-5eef718bf15f_idx" ON "l76aj_rsformpro2breezingforms_submissions_import"("rsformid", "bfformid");

-- CreateIndex
CREATE INDEX "l76aj_session_guest_usertype_idx" ON "l76aj_session"("guest", "usertype");

-- CreateIndex
CREATE INDEX "l76aj_session_time_idx" ON "l76aj_session"("time");

-- CreateIndex
CREATE INDEX "l76aj_session_userid_idx" ON "l76aj_session"("userid");

-- CreateIndex
CREATE INDEX "l76aj_template_styles_home_idx" ON "l76aj_template_styles"("home");

-- CreateIndex
CREATE INDEX "l76aj_template_styles_template_idx" ON "l76aj_template_styles"("template");

-- CreateIndex
CREATE INDEX "l76aj_user_notes_catid_idx" ON "l76aj_user_notes"("catid");

-- CreateIndex
CREATE INDEX "l76aj_user_notes_user_id_idx" ON "l76aj_user_notes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_user_profiles_user_id_profile_key_idx" ON "l76aj_user_profiles"("user_id", "profile_key");

-- CreateIndex
CREATE INDEX "l76aj_usergroups_lft_rgt_idx" ON "l76aj_usergroups"("lft", "rgt");

-- CreateIndex
CREATE INDEX "l76aj_usergroups_parent_id_idx" ON "l76aj_usergroups"("parent_id");

-- CreateIndex
CREATE INDEX "l76aj_usergroups_title_idx" ON "l76aj_usergroups"("title");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_usergroups_parent_id_title_idx" ON "l76aj_usergroups"("parent_id", "title");

-- CreateIndex
CREATE INDEX "l76aj_users_block_idx" ON "l76aj_users"("block");

-- CreateIndex
CREATE INDEX "l76aj_users_email_idx" ON "l76aj_users"("email");

-- CreateIndex
CREATE INDEX "l76aj_users_name_idx" ON "l76aj_users"("name");

-- CreateIndex
CREATE INDEX "l76aj_users_username_idx" ON "l76aj_users"("username");

-- CreateIndex
CREATE INDEX "l76aj_users_usertype_idx" ON "l76aj_users"("usertype");

-- CreateIndex
CREATE UNIQUE INDEX "l76aj_viewlevels_title_idx" ON "l76aj_viewlevels"("title");

-- CreateIndex
CREATE INDEX "l76aj_weblinks_access_idx" ON "l76aj_weblinks"("access");

-- CreateIndex
CREATE INDEX "l76aj_weblinks_catid_idx" ON "l76aj_weblinks"("catid");

-- CreateIndex
CREATE INDEX "l76aj_weblinks_checked_out_idx" ON "l76aj_weblinks"("checked_out");

-- CreateIndex
CREATE INDEX "l76aj_weblinks_created_by_idx" ON "l76aj_weblinks"("created_by");

-- CreateIndex
CREATE INDEX "l76aj_weblinks_featured_catid_idx" ON "l76aj_weblinks"("featured", "catid");

-- CreateIndex
CREATE INDEX "l76aj_weblinks_language_idx" ON "l76aj_weblinks"("language");

-- CreateIndex
CREATE INDEX "l76aj_weblinks_state_idx" ON "l76aj_weblinks"("state");

-- CreateIndex
CREATE INDEX "l76aj_weblinks_xreference_idx" ON "l76aj_weblinks"("xreference");

-- CreateIndex
CREATE INDEX "l76aj_xformsdr_elements_form_id_reference_id_idx" ON "l76aj_xformsdr_elements"("form_id", "reference_id");

-- CreateIndex
CREATE INDEX "l76aj_xformsdr_elements_reference_id_idx" ON "l76aj_xformsdr_elements"("reference_id");

-- CreateIndex
CREATE INDEX "l76aj_xformsdr_forms_reference_id_idx" ON "l76aj_xformsdr_forms"("reference_id");

-- CreateIndex
CREATE INDEX "l76aj_xformsdr_records_form_id_record_id_state_id_idx" ON "l76aj_xformsdr_records"("form_id", "record_id", "state_id");

-- AddForeignKey
ALTER TABLE "l76aj_extrawatch_uri" ADD CONSTRAINT "l76aj_extrawatch_uri_fk_fkey" FOREIGN KEY ("fk") REFERENCES "l76aj_extrawatch"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "main_categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "titles" ADD CONSTRAINT "sub_titles_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("sub_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
