50.times do
  Message.create(
    username: FFaker::Name.first_name,
    body: [FFaker::Lorem.sentence, FFaker::Lorem.word].sample
  )
end
