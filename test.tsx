<Container component="main" maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
  {/* 상단: 태그 + 제목 */}
  <Stack spacing={1.5} sx={{ mb: 2.5 }}>
    <Stack direction="row" spacing={1} flexWrap="wrap" aria-label="공연 태그">
      {data.tags.map((t) => (
        <Chip key={t} label={t} size="small" variant="outlined" />
      ))}
    </Stack>

    <Typography
      component="h1"
      variant="h4"
      sx={{ fontWeight: 800, lineHeight: 1.2 }}
    >
      {data.title}
    </Typography>
  </Stack>

  {/* 본문: 좌측 상세 / 우측 예매 패널 */}
  <Box
    sx={{
      display: { xs: 'block', md: 'grid' },
      gridTemplateColumns: { md: 'minmax(0, 1fr) 360px' },
      gap: { xs: 2, md: 3 },
      alignItems: 'start',
    }}
  >
    {/* LEFT */}
    <Box component="section" aria-label="공연 상세">
      {/* 섹션 A: 포스터 + 기본 정보 */}
      <Paper
        variant="outlined"
        component="section"
        aria-label="포스터 및 기본 정보"
        sx={{ mb: 2 }}
      >
        <Box
          sx={{
            p: { xs: 1.5, md: 2 },
            display: { xs: 'block', sm: 'grid' },
            gridTemplateColumns: { sm: '240px minmax(0,1fr)' },
            gap: 2,
          }}
        >
          {/* 포스터 + 찜/공유 */}
          <Box>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3 / 4',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'grey.100',
              }}
            >
              <Image
                src={data.posterUrl}
                alt={`${data.title} 포스터`}
                fill
                priority
                sizes="(min-width: 900px) 240px, 100vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 1 }}
            >
              <Stack direction="row" spacing={0.5}>
                <IconButton
                  onClick={onToggleWish}
                  aria-pressed={isWished}
                  aria-label={isWished ? '이 공연 찜 취소' : '이 공연 찜하기'}
                >
                  {isWished ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>

                <IconButton onClick={onShare} aria-label="공연 공유">
                  <ShareIcon />
                </IconButton>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                aria-label="찜 개수"
              >
                {wishCount.toLocaleString()}
              </Typography>
            </Stack>
          </Box>

          {/* 핵심 정보 테이블 */}
          <Box>
            <Typography
              component="h2"
              variant="h6"
              sx={{ fontWeight: 800, mb: 1 }}
            >
              핵심 정보
            </Typography>

            <Table size="small" aria-label="공연 핵심 정보">
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ width: 120, color: 'text.secondary' }}
                  >
                    장소
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      href={data.venueHref}
                      variant="text"
                      sx={{
                        px: 0,
                        fontWeight: 700,
                        justifyContent: 'flex-start',
                      }}
                      aria-label="장소 상세 보기"
                    >
                      {data.venueName}
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: 'text.secondary' }}
                  >
                    공연기간
                  </TableCell>
                  <TableCell>{data.dateRange}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: 'text.secondary' }}
                  >
                    공연시간
                  </TableCell>
                  <TableCell>{data.runningTime}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: 'text.secondary' }}
                  >
                    관람연령
                  </TableCell>
                  <TableCell>{data.ageLimit}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: 'text.secondary' }}
                  >
                    가격
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.25}>
                      {data.prices.map((p) => (
                        <Stack key={p.grade} direction="row" spacing={1}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ minWidth: 56 }}
                          >
                            {p.grade}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {p.price.toLocaleString()}원
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Divider sx={{ my: 2 }} />

            {/* 혜택/프로모션/배송/유의사항 등은 “링크형 리스트”로 확장하기 좋음 */}
            <Stack spacing={0.75}>
              <Typography variant="body2" color="text.secondary">
                혜택/프로모션/배송/유의사항 영역은 필요 시 링크/아코디언으로
                확장 가능합니다.
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* 섹션 B: 탭 영역 (공연정보 / 판매정보) */}
      <Paper
        variant="outlined"
        component="section"
        aria-label="탭 정보"
        sx={{ mb: 2 }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          aria-label="상세 탭"
          variant="fullWidth"
        >
          <Tab label="공연정보" value="info" {...a11yTabProps('info')} />
          <Tab label="판매정보" value="sale" {...a11yTabProps('sale')} />
        </Tabs>

        <Box sx={{ px: { xs: 1.5, md: 2 }, pb: { xs: 2, md: 2.5 } }}>
          <TabPanel value="info" current={tab}>
            {/* 공연시간 정보 */}
            <Box component="section" aria-label="공연시간 정보">
              <Typography
                component="h3"
                variant="h6"
                sx={{ fontWeight: 800, mb: 1 }}
              >
                공연시간 정보
              </Typography>

              <Stack spacing={1}>
                {data.schedules.map((s) => (
                  <Box key={s.dateLabel}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {s.dateLabel}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.times.join(' / ')}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* 공지사항 */}
            <Box component="section" aria-label="공지사항">
              <Typography
                component="h3"
                variant="h6"
                sx={{ fontWeight: 800, mb: 1 }}
              >
                공지사항
              </Typography>

              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {data.notices.map((n, idx) => (
                  <Typography
                    key={idx}
                    component="li"
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    {n}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* 공연상세/출연진정보 */}
            <Box component="section" aria-label="공연상세 및 출연진 정보">
              <Typography
                component="h3"
                variant="h6"
                sx={{ fontWeight: 800, mb: 1 }}
              >
                공연상세 / 출연진정보
              </Typography>

              <Stack spacing={2}>
                {data.detailImages.map((src) => (
                  <Box
                    key={src}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 9',
                      borderRadius: 2,
                      overflow: 'hidden',
                      bgcolor: 'grey.100',
                    }}
                  >
                    <Image
                      src={src}
                      alt="공연 상세 이미지"
                      fill
                      sizes="(min-width: 900px) 720px, 100vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* 관련공연 */}
            <Box component="section" aria-label="관련 공연">
              <Typography
                component="h3"
                variant="h6"
                sx={{ fontWeight: 800, mb: 1 }}
              >
                관련공연
              </Typography>

              <Stack spacing={1.5}>
                {data.related.map((r) => (
                  <Card key={r.id} variant="outlined">
                    <CardContent
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '80px minmax(0,1fr)',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: 80,
                          aspectRatio: '3/4',
                          borderRadius: 1.5,
                          overflow: 'hidden',
                          bgcolor: 'grey.100',
                        }}
                      >
                        <Image
                          src={r.posterUrl}
                          alt={`${r.title} 포스터`}
                          fill
                          sizes="80px"
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                        />
                      </Box>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 800 }}
                          noWrap
                        >
                          {r.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {r.dateRange}
                        </Typography>

                        <Button
                          component={Link}
                          href={r.href}
                          size="small"
                          variant="text"
                          sx={{ px: 0, fontWeight: 700 }}
                          aria-label="관련 공연 상세 보기"
                        >
                          상세 보기
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </TabPanel>

          <TabPanel value="sale" current={tab}>
            <Typography variant="body2" color="text.secondary">
              판매정보(예매처별 정책/할인/배송/취소수수료 등)를 여기에
              구성하세요.
            </Typography>
          </TabPanel>
        </Box>
      </Paper>
    </Box>

    {/* RIGHT: Sticky Booking Panel */}
    <Box component="aside" aria-label="예매 패널" sx={{ alignSelf: 'start' }}>
      <Box sx={{ position: { md: 'sticky' }, top: { md: STICKY_TOP } }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              {/* 관람일 */}
              <Box>
                <Typography
                  component="h2"
                  variant="subtitle1"
                  sx={{ fontWeight: 800, mb: 1 }}
                >
                  관람일
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={(v) => v && setSelectedDate(v)}
                    aria-label="관람일 선택 달력"
                  />
                </LocalizationProvider>
              </Box>

              <Divider />

              {/* 회차 */}
              <Box>
                <Typography
                  component="h2"
                  variant="subtitle1"
                  sx={{ fontWeight: 800, mb: 1 }}
                >
                  회차
                </Typography>

                <ToggleButtonGroup
                  exclusive
                  fullWidth
                  value={selectedRound}
                  onChange={(_, v) => v && setSelectedRound(v)}
                  aria-label="회차 선택"
                >
                  <ToggleButton value="1" aria-label="1회 18:00">
                    1회 18:00
                  </ToggleButton>
                  <ToggleButton value="2" aria-label="2회 20:00">
                    2회 20:00
                  </ToggleButton>
                </ToggleButtonGroup>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 1 }}
                >
                  선택한 날짜/회차에 따라 예매 가능 좌석이 달라질 수 있습니다.
                </Typography>
              </Box>

              {/* CTA */}
              <Stack spacing={1}>
                <Button
                  component={Link}
                  href={`/concert/${data.id}/book?date=${selectedDate.format('YYYY-MM-DD')}&round=${selectedRound}`}
                  variant="contained"
                  size="large"
                  fullWidth
                  aria-label="예매하기"
                >
                  예매하기
                </Button>

                <Button
                  component={Link}
                  href={`/concert/${data.id}/booking-info`}
                  variant="outlined"
                  size="large"
                  fullWidth
                  aria-label="예매 및 장소정보"
                >
                  BOOKING / 장소정보
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  </Box>

  {/* 토스트 */}
  <Snackbar
    open={snack.open}
    autoHideDuration={2500}
    onClose={() => setSnack((p) => ({ ...p, open: false }))}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert
      onClose={() => setSnack((p) => ({ ...p, open: false }))}
      severity={snack.severity}
      variant="filled"
      sx={{ width: '100%' }}
    >
      {snack.msg}
    </Alert>
  </Snackbar>
</Container>;
