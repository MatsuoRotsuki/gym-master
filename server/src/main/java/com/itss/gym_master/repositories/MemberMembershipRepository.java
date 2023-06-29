package com.itss.gym_master.repositories;

import com.itss.gym_master.entities.MemberMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberMembershipRepository extends JpaRepository<MemberMembership, Long> {
}
